"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function PublicationsPage() { 
    return (
        <>
             <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Publications</h1>
            <p className="text-slate-600 mt-1">Manage all your content in one place</p>
                </div>


                <Tabs defaultValue="article"  className="w-full">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="articles">Articles</TabsTrigger>
                        <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                        <TabsTrigger value="official-letters">Official Letters</TabsTrigger>
                          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="articles" className="mt-6">

                    </TabsContent>

                    <TabsContent value="newsletter" className="mt-6">

                    </TabsContent>

                    <TabsContent value="official-letters" className="mt-6">

                    </TabsContent>

                    <TabsContent value="podcasts" className="mt-6">

                    </TabsContent>
                </Tabs>
                </div>
        </>
    )
}