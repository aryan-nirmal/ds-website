import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";
import { Code2, BookOpen } from "lucide-react";

const VercelAnalyticsGuide = () => {
  return (
    <main className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-card">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="heading-display text-foreground mb-6">
              VERCEL WEB <span className="text-accent">ANALYTICS GUIDE</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get started with Vercel Web Analytics on your project. Learn how to enable it, add the package,
              deploy your app, and view your data in the dashboard.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Prerequisites */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Prerequisites"
            subtitle="What you'll need before getting started"
          />

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-card border border-border p-6 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0 rounded-full">
                  <BookOpen size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg tracking-wide mb-2">Vercel Account</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You'll need a Vercel account. If you don't have one, you can{" "}
                    <a href="https://vercel.com/signup" className="text-accent hover:underline">
                      sign up for free
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0 rounded-full">
                  <BookOpen size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg tracking-wide mb-2">Vercel Project</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You'll need a Vercel project. If you don't have one, you can{" "}
                    <a href="https://vercel.com/new" className="text-accent hover:underline">
                      create a new project
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0 rounded-full">
                  <Code2 size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg tracking-wide mb-2">Vercel CLI</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Install the Vercel CLI using your preferred package manager:
                  </p>
                  <div className="bg-background p-4 rounded-lg overflow-x-auto">
                    <code className="text-xs text-muted-foreground font-mono">
                      # pnpm
                      <br />
                      pnpm i vercel
                      <br />
                      <br />
                      # yarn
                      <br />
                      yarn i vercel
                      <br />
                      <br />
                      # npm
                      <br />
                      npm i vercel
                      <br />
                      <br />
                      # bun
                      <br />
                      bun i vercel
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Enable Analytics */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Enable Web Analytics in Vercel"
            subtitle="Step 1: Set up analytics in your Vercel dashboard"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-background border border-border p-8 rounded-3xl">
              <ol className="space-y-6 list-decimal list-inside">
                <li className="text-muted-foreground leading-relaxed">
                  Go to your{" "}
                  <a href="/dashboard" className="text-accent hover:underline">
                    Vercel dashboard
                  </a>
                </li>
                <li className="text-muted-foreground leading-relaxed">
                  Select your Project
                </li>
                <li className="text-muted-foreground leading-relaxed">
                  Click the <strong>Analytics</strong> tab
                </li>
                <li className="text-muted-foreground leading-relaxed">
                  Click <strong>Enable</strong> from the dialog
                </li>
              </ol>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>💡 Note:</strong> Enabling Web Analytics will add new routes (scoped at{" "}
                  <code className="bg-background px-2 py-1 rounded text-accent">/_vercel/insights/*</code>)
                  after your next deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Add Package */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Add @vercel/analytics to your project"
            subtitle="Step 2: Install the analytics package"
          />

          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-6">
              Using the package manager of your choice, add the <code className="bg-card px-2 py-1 rounded">@vercel/analytics</code> package to your project:
            </p>

            <div className="bg-card border border-border p-8 rounded-3xl">
              <div className="bg-background p-6 rounded-lg overflow-x-auto">
                <code className="text-xs text-muted-foreground font-mono">
                  # pnpm
                  <br />
                  pnpm i @vercel/analytics
                  <br />
                  <br />
                  # yarn
                  <br />
                  yarn i @vercel/analytics
                  <br />
                  <br />
                  # npm
                  <br />
                  npm i @vercel/analytics
                  <br />
                  <br />
                  # bun
                  <br />
                  bun i @vercel/analytics
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Framework Integration */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Framework-Specific Integration"
            subtitle="Step 3: Add Analytics component to your app"
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {/* React Example */}
            <div className="bg-background border border-border p-8 rounded-3xl">
              <h3 className="font-heading text-xl tracking-wide mb-4">React (Vite)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For React applications, import the Analytics component and add it to your root component:
              </p>
              <div className="bg-card p-6 rounded-lg overflow-x-auto">
                <pre className="text-xs text-muted-foreground font-mono">
{`import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}`}
                </pre>
              </div>
            </div>

            {/* Next.js Example */}
            <div className="bg-background border border-border p-8 rounded-3xl">
              <h3 className="font-heading text-xl tracking-wide mb-4">Next.js (App Router)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For Next.js with the App Router, add the Analytics component to your root layout:
              </p>
              <div className="bg-card p-6 rounded-lg overflow-x-auto">
                <pre className="text-xs text-muted-foreground font-mono">
{`import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}`}
                </pre>
              </div>
            </div>

            {/* Vue Example */}
            <div className="bg-background border border-border p-8 rounded-3xl">
              <h3 className="font-heading text-xl tracking-wide mb-4">Vue</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For Vue applications, import the Analytics component in your App.vue:
              </p>
              <div className="bg-card p-6 rounded-lg overflow-x-auto">
                <pre className="text-xs text-muted-foreground font-mono">
{`<script setup>
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>`}
                </pre>
              </div>
            </div>

            {/* Plain HTML Example */}
            <div className="bg-background border border-border p-8 rounded-3xl">
              <h3 className="font-heading text-xl tracking-wide mb-4">Plain HTML</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For plain HTML sites, add this script to your HTML files:
              </p>
              <div className="bg-card p-6 rounded-lg overflow-x-auto">
                <pre className="text-xs text-muted-foreground font-mono">
{`<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>`}
                </pre>
              </div>
              <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>💡 Note:</strong> When using the HTML implementation, there is no need to install the
                  @vercel/analytics package. However, there is no route support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Deployment */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Deploy Your App"
            subtitle="Step 4: Deploy to Vercel"
          />

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-card border border-border p-8 rounded-3xl">
              <p className="text-muted-foreground mb-6">
                Deploy your app using the Vercel CLI:
              </p>
              <div className="bg-background p-6 rounded-lg overflow-x-auto mb-6">
                <code className="text-xs text-muted-foreground font-mono">
                  vercel deploy
                </code>
              </div>

              <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg mb-6">
                <p className="text-sm text-foreground">
                  <strong>Tip:</strong> We recommend connecting your project's Git repository to enable automatic
                  deployments of your latest commits.
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Once your app is deployed, it will start tracking visitors and page views automatically.
                If everything is set up properly, you should be able to see a Fetch/XHR request in your
                browser's Network tab from <code className="bg-card px-2 py-1 rounded">/_vercel/insights/view</code> when
                you visit any page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Viewing Data */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="View Your Analytics Data"
            subtitle="Step 5: Monitor your website metrics"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-background border border-border p-8 rounded-3xl">
              <ol className="space-y-6 list-decimal list-inside">
                <li className="text-muted-foreground leading-relaxed">
                  Once your app is deployed and users have visited your site, go to your{" "}
                  <a href="/dashboard" className="text-accent hover:underline">
                    Vercel dashboard
                  </a>
                </li>
                <li className="text-muted-foreground leading-relaxed">
                  Select your Project
                </li>
                <li className="text-muted-foreground leading-relaxed">
                  Click the <strong>Analytics</strong> tab
                </li>
              </ol>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>💡 Note:</strong> After a few days of visitors, you'll be able to start exploring your data by
                  viewing and filtering the analytics panels. Users on Pro and Enterprise plans can also add custom events
                  to track user interactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Next Steps */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Next Steps"
            subtitle="Learn more about Vercel Web Analytics"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border p-8 rounded-3xl">
              <p className="text-muted-foreground mb-6">
                Now that you have Vercel Web Analytics set up, explore these topics to learn more:
              </p>
              <ul className="space-y-3">
                <li className="text-muted-foreground">
                  <span className="text-accent">•</span> Learn how to use the @vercel/analytics package
                </li>
                <li className="text-muted-foreground">
                  <span className="text-accent">•</span> Set up custom events to track user interactions
                </li>
                <li className="text-muted-foreground">
                  <span className="text-accent">•</span> Learn about filtering and analyzing data
                </li>
                <li className="text-muted-foreground">
                  <span className="text-accent">•</span> Read about privacy and compliance standards
                </li>
                <li className="text-muted-foreground">
                  <span className="text-accent">•</span> Explore pricing and limits
                </li>
                <li className="text-muted-foreground">
                  <span className="text-accent">•</span> Check troubleshooting guides
                </li>
              </ul>

              <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-sm text-foreground">
                  Learn more about how Vercel supports privacy and data compliance standards with Vercel Web Analytics
                  to ensure your website visitors' data is protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VercelAnalyticsGuide;
