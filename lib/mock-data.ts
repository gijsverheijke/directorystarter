// In a real app, this would be coming from a database

import { Listing } from "@/types/listing";

export const mockListings: Listing[] = [
  {
    title: "NetForensicMCP",
    blurb: "NetForensicMCP V2.1 is a Model Context Protocol (MCP) server designed for network forensics and analysis. It provides tools for investigating network traffic, identifying security threats, and extracting valuable insights from network data.",
    description: "A comprehensive Model Context Protocol server specifically built for network forensics professionals. NetForensicMCP offers advanced packet analysis capabilities, threat detection algorithms, and detailed reporting features. Perfect for cybersecurity teams, network administrators, and digital forensics investigators who need deep network visibility and analysis tools.",
    externalUrl: "https://github.com/netforensic/mcp",
    logo: "https://avatars.githubusercontent.com/u/example1",
    category: "Security",
    tags: ["forensics", "network", "security", "mcp", "analysis"],
    isFeatured: true
  },
  {
    title: "DataViz Pro",
    blurb: "Advanced data visualization platform that transforms complex datasets into beautiful, interactive charts and dashboards. Built for analysts and data scientists who need powerful visualization tools.",
    description: "DataViz Pro is a cutting-edge data visualization platform that empowers users to create stunning, interactive visualizations from complex datasets. With support for real-time data streaming, custom chart types, and collaborative features, it's the perfect tool for data analysts, business intelligence teams, and researchers who need to communicate insights effectively.",
    externalUrl: "https://datavizpro.com",
    logo: "https://avatars.githubusercontent.com/u/example2",
    category: "Analytics",
    tags: ["visualization", "charts", "analytics", "dashboard", "data"],
    isFeatured: false
  },
  {
    title: "CloudSync Manager",
    blurb: "Seamlessly synchronize files across multiple cloud storage providers with advanced conflict resolution and real-time monitoring. Perfect for teams managing distributed workflows.",
    description: "CloudSync Manager revolutionizes how teams handle file synchronization across different cloud platforms. With intelligent conflict resolution, real-time sync monitoring, and support for major cloud providers including AWS S3, Google Drive, Dropbox, and OneDrive, it ensures your files are always up-to-date and accessible wherever you work.",
    externalUrl: "https://cloudsync.manager",
    logo: "https://avatars.githubusercontent.com/u/example3",
    category: "Productivity",
    tags: ["cloud", "sync", "storage", "files", "collaboration"],
    isFeatured: false
  },
  {
    title: "AI Code Assistant",
    blurb: "Intelligent code completion and refactoring tool powered by advanced machine learning models. Supports 20+ programming languages and integrates with popular IDEs.",
    description: "AI Code Assistant leverages state-of-the-art machine learning models to provide intelligent code suggestions, automated refactoring, and bug detection. With support for over 20 programming languages and seamless integration with VS Code, IntelliJ, and other popular IDEs, it accelerates development workflow and improves code quality.",
    externalUrl: "https://ai-code-assistant.dev",
    logo: "https://avatars.githubusercontent.com/u/example4",
    category: "Development",
    tags: ["ai", "code", "assistant", "ide", "programming", "ml"],
    isFeatured: false
  },
  {
    title: "SecureAuth Gateway",
    blurb: "Enterprise-grade authentication and authorization service with multi-factor authentication, SSO support, and comprehensive audit logging for modern applications.",
    description: "SecureAuth Gateway provides robust authentication and authorization services for enterprise applications. Features include multi-factor authentication, single sign-on (SSO), OAuth 2.0/OpenID Connect support, role-based access control, and detailed audit logging. Designed for scalability and security compliance in enterprise environments.",
    externalUrl: "https://secureauth.gateway",
    logo: "https://avatars.githubusercontent.com/u/example5",
    category: "Security",
    tags: ["authentication", "security", "sso", "oauth", "enterprise", "mfa"],
    isFeatured: false
  },
  {
    title: "WebCrawler Pro",
    blurb: "High-performance web scraping and crawling framework with JavaScript rendering, proxy rotation, and distributed processing capabilities for large-scale data extraction.",
    description: "WebCrawler Pro is a sophisticated web scraping framework designed for enterprise-scale data extraction. It features JavaScript rendering through headless browsers, intelligent proxy rotation, rate limiting, and distributed processing across multiple nodes. Perfect for market research, competitive analysis, and data aggregation projects.",
    externalUrl: "https://webcrawler.pro",
    logo: "https://avatars.githubusercontent.com/u/example6",
    category: "Data",
    tags: ["scraping", "crawling", "data-extraction", "automation", "javascript"],
    isFeatured: false
  },
  {
    title: "TaskFlow Orchestrator",
    blurb: "Workflow automation platform that connects your favorite tools and services. Create complex automation workflows with a visual drag-and-drop interface.",
    description: "TaskFlow Orchestrator simplifies workflow automation by providing a visual, drag-and-drop interface for creating complex automation sequences. Connect hundreds of popular services including Slack, Gmail, Trello, GitHub, and more. Features include conditional logic, error handling, scheduling, and real-time monitoring of workflow executions.",
    externalUrl: "https://taskflow.orchestrator",
    logo: "https://avatars.githubusercontent.com/u/example7",
    category: "Productivity",
    tags: ["automation", "workflow", "integration", "productivity", "no-code"],
    isFeatured: false
  },
  {
    title: "ApiDoc Generator",
    blurb: "Automatically generate beautiful, interactive API documentation from your code comments and OpenAPI specifications. Supports multiple output formats and themes.",
    description: "ApiDoc Generator transforms your API specifications and code comments into stunning, interactive documentation. Supports OpenAPI/Swagger, JSDoc, and custom annotations. Generate static sites, PDF exports, or integrate with popular documentation platforms. Features include code examples, try-it-out functionality, and customizable themes.",
    externalUrl: "https://apidoc.generator",
    logo: "https://avatars.githubusercontent.com/u/example8",
    category: "Development",
    tags: ["documentation", "api", "openapi", "swagger", "generator", "docs"],
    isFeatured: false
  }
];