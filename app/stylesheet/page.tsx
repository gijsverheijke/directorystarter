"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function StylesheetPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <h1 className="heading-1 mb-2">Design System Showcase</h1>
          <p className="body-text-large text-muted-foreground">
            A comprehensive demonstration of our design tokens and component library
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-12">
        
        {/* Color Palette Section */}
        <section>
          <h2 className="heading-2 mb-6">Color Palette</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Primary Colors</CardTitle>
                <CardDescription>Main brand colors for primary actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-primary border"></div>
                  <div>
                    <div className="font-medium">Primary</div>
                    <div className="text-sm text-muted-foreground">Main brand color</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-primary-foreground border"></div>
                  <div>
                    <div className="font-medium">Primary Foreground</div>
                    <div className="text-sm text-muted-foreground">Text on primary</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Secondary Colors</CardTitle>
                <CardDescription>Supporting colors for secondary actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary border"></div>
                  <div>
                    <div className="font-medium">Secondary</div>
                    <div className="text-sm text-muted-foreground">Secondary background</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary-foreground border"></div>
                  <div>
                    <div className="font-medium">Secondary Foreground</div>
                    <div className="text-sm text-muted-foreground">Text on secondary</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accent & Muted Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Accent & Muted</CardTitle>
                <CardDescription>Accent and muted color variations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-accent border"></div>
                  <div>
                    <div className="font-medium">Accent</div>
                    <div className="text-sm text-muted-foreground">Accent background</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-muted border"></div>
                  <div>
                    <div className="font-medium">Muted</div>
                    <div className="text-sm text-muted-foreground">Muted background</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Surface Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Surface Colors</CardTitle>
                <CardDescription>Background and surface colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-background border-2"></div>
                  <div>
                    <div className="font-medium">Background</div>
                    <div className="text-sm text-muted-foreground">Main background</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-card border"></div>
                  <div>
                    <div className="font-medium">Card</div>
                    <div className="text-sm text-muted-foreground">Card background</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Status Colors</CardTitle>
                <CardDescription>Status and feedback colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-destructive border"></div>
                  <div>
                    <div className="font-medium">Destructive</div>
                    <div className="text-sm text-muted-foreground">Error/danger color</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-border border-2"></div>
                  <div>
                    <div className="font-medium">Border</div>
                    <div className="text-sm text-muted-foreground">Border color</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Chart Colors</CardTitle>
                <CardDescription>Data visualization color palette</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-5 gap-2">
                  <div className="w-full h-8 rounded bg-chart-1 border"></div>
                  <div className="w-full h-8 rounded bg-chart-2 border"></div>
                  <div className="w-full h-8 rounded bg-chart-3 border"></div>
                  <div className="w-full h-8 rounded bg-chart-4 border"></div>
                  <div className="w-full h-8 rounded bg-chart-5 border"></div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Five distinct colors for charts and data visualization
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="heading-2 mb-6">Typography</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Text Styles</CardTitle>
              <CardDescription>Predefined typography classes from our design system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h1 className="heading-1 mb-2">Heading 1</h1>
                <p className="caption">Class: <code className="code">.heading-1</code> - Used for main page titles</p>
              </div>
              
              <div>
                <h2 className="heading-2 mb-2">Heading 2</h2>
                <p className="caption">Class: <code className="code">.heading-2</code> - Used for section headers</p>
              </div>
              
              <div>
                <h3 className="heading-3 mb-2">Heading 3</h3>
                <p className="caption">Class: <code className="code">.heading-3</code> - Used for subsection headers</p>
              </div>

              <div>
                <h4 className="heading-4 mb-2">Heading 4</h4>
                <p className="caption">Class: <code className="code">.heading-4</code> - Used for smaller headings</p>
              </div>
              
              <div>
                <p className="body-text-large mb-2">
                  Large Body Text - This is larger body text for emphasis or introductory content.
                </p>
                <p className="caption">Class: <code className="code">.body-text-large</code> - Emphasized body text</p>
              </div>
              
              <div>
                <p className="body-text mb-2">
                  Body Text - This is the standard body text used throughout the application. 
                  It should be readable and comfortable for extended reading.
                </p>
                <p className="caption">Class: <code className="code">.body-text</code> - Primary body text</p>
              </div>
              
              <div>
                <p className="body-text-small mb-2">
                  Small Body Text - Used for secondary information that needs to be readable.
                </p>
                <p className="caption">Class: <code className="code">.body-text-small</code> - Secondary body text</p>
              </div>

              <div>
                <p className="caption mb-2">
                  Caption Text - Used for captions, help text, and subtle information.
                </p>
                <p className="caption">Class: <code className="code">.caption</code> - Captions and help text</p>
              </div>

              <div>
                <label className="label mb-2 block">Label Text</label>
                <p className="caption">Class: <code className="code">.label</code> - Form labels and identifiers</p>
              </div>

              <div>
                <p className="body-text mb-2">
                  Inline code example: <code className="code">const example = &quot;code&quot;;</code>
                </p>
                <p className="caption">Class: <code className="code">.code</code> - Inline code styling</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Button Components */}
        <section>
          <h2 className="heading-2 mb-6">Button Components</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Button Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles for various use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </CardContent>
            </Card>

            {/* Button Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Various button sizes for different contexts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">⚙️</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badge Components */}
        <section>
          <h2 className="heading-2 mb-6">Badge Components</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Status indicators and labels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Components */}
        <section>
          <h2 className="heading-2 mb-6">Form Components</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Input Components</CardTitle>
              <CardDescription>Form inputs and controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="label">Email</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              
              <div className="space-y-2">
                <label className="label">Password</label>
                <Input type="password" placeholder="Enter your password" />
              </div>
              
              <div className="space-y-2">
                <label className="label">Disabled Input</label>
                <Input disabled placeholder="Disabled input" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit Form</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Card Layouts */}
        <section>
          <h2 className="heading-2 mb-6">Card Layouts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>A basic card with title and description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This is a simple card layout with header content and a basic description.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Card with action buttons in footer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This card includes a footer section with action buttons.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Card</CardTitle>
                <CardDescription>Highlighting a key feature or metric</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">42</div>
                <p className="caption">
                  Active users this month
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dark Mode Toggle Section */}
        <section>
          <h2 className="heading-2 mb-6">Theme Variations</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Dark Mode Support</CardTitle>
              <CardDescription>
                All components automatically adapt to dark mode using CSS custom properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg border bg-muted/50">
                <p className="caption mb-3">
                  Toggle your system&rsquo;s dark mode to see all components adapt automatically.
                </p>
                <div className="flex items-center gap-3">
                  <Badge>Auto-adapting</Badge>
                  <Badge variant="outline">CSS Variables</Badge>
                  <Badge variant="secondary">System Theme</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}
