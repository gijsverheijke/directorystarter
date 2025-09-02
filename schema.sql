-- Create test_directory table
CREATE TABLE IF NOT EXISTS public.test_directory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    title VARCHAR(255) NOT NULL,
    blurb TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    external_url VARCHAR(500) NOT NULL,
    logo_url VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'approved'::character varying,
    is_featured BOOLEAN DEFAULT false,
    user_id UUID
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_test_directory_status ON public.test_directory(status);
CREATE INDEX IF NOT EXISTS idx_test_directory_category ON public.test_directory(category);
CREATE INDEX IF NOT EXISTS idx_test_directory_slug ON public.test_directory(slug);
CREATE INDEX IF NOT EXISTS idx_test_directory_is_featured ON public.test_directory(is_featured);
CREATE INDEX IF NOT EXISTS idx_test_directory_created_at ON public.test_directory(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_directory_user_id ON public.test_directory(user_id);

-- Create GIN index for tags JSONB for efficient tag queries
CREATE INDEX IF NOT EXISTS idx_test_directory_tags ON public.test_directory USING GIN(tags);

-- Create full-text search index for title, blurb, and description
CREATE INDEX IF NOT EXISTS idx_test_directory_search ON public.test_directory USING GIN(
    to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(blurb, '') || ' ' || COALESCE(description, ''))
);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_test_directory_updated_at
    BEFORE UPDATE ON public.test_directory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraints
ALTER TABLE public.test_directory ADD CONSTRAINT IF NOT EXISTS test_directory_slug_unique UNIQUE (slug);
ALTER TABLE public.test_directory ADD CONSTRAINT IF NOT EXISTS test_directory_status_check 
    CHECK (status IN ('pending', 'approved', 'rejected'));

-- Row Level Security (RLS) policies
ALTER TABLE public.test_directory ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved listings
CREATE POLICY "Anyone can view approved listings" ON public.test_directory
    FOR SELECT USING (status = 'approved');

-- Policy: Authenticated users can insert listings (they will be pending by default)
CREATE POLICY "Authenticated users can insert listings" ON public.test_directory
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Users can update their own listings
CREATE POLICY "Users can update own listings" ON public.test_directory
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can view their own listings regardless of status
CREATE POLICY "Users can view own listings" ON public.test_directory
    FOR SELECT USING (auth.uid() = user_id);
