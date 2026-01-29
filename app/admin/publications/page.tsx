"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleTab from "@/components/publicationsection/Article-tab";
import NewsletterTab from "@/components/publicationsection/Newsletter-tab";
import { OfficialLettersTab } from "@/components/publicationsection/Officialletters-tab";
import { PodcastsTab } from "@/components/publicationsection/Podcast-tab";

export default function PublicationsPage() {
  return (
    <>
      <div className="space-y-6 mt-20 font-mono">
        <div>
          <h1 className="text-3xl font-bold text-main">Publications</h1>
          <p className="text-black mt-1">
            Manage all Acusa content in one place
          </p>
        </div>
        <Tabs defaultValue="article" className="w-full ">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto  lg:inline-grid">
            <TabsTrigger value="article" className="">
              Articles
            </TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="official-letters">Official Letters</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          </TabsList>

          <TabsContent value="article" className="mt-6">
            <ArticleTab />
          </TabsContent>

          <TabsContent value="newsletter" className="mt-6">
            <NewsletterTab />
          </TabsContent>

          <TabsContent value="official-letters" className="mt-6">
            <OfficialLettersTab />
          </TabsContent>

          <TabsContent value="podcasts" className="mt-6">
            <PodcastsTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
