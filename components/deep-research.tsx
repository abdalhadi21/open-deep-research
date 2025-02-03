import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DeepResearchProps {
  isActive: boolean;
  onToggle: () => void;
  isLoading?: boolean;
  activity?: Array<{
    type: 'search' | 'extract' | 'analyze';
    status: 'pending' | 'complete' | 'error';
    message: string;
    timestamp: string;
  }>;
  sources?: Array<{
    url: string;
    title: string;
    relevance: number;
  }>;
}

export function DeepResearch({
  isLoading,
  activity = [],
  sources = [],
}: DeepResearchProps) {
  if (!isLoading || (activity.length === 0 && sources.length === 0)) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 w-80 bg-background border rounded-lg shadow-lg p-4">
      <Tabs defaultValue="activity">
        <TabsList className="w-full">
          <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
          <TabsTrigger value="sources" className="flex-1">Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="mt-4">
          <div className="space-y-4">
            {activity.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <div className={cn(
                  "mt-1 size-2 rounded-full",
                  item.status === 'pending' && "bg-yellow-500",
                  item.status === 'complete' && "bg-green-500",
                  item.status === 'error' && "bg-red-500"
                )} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sources" className="mt-4">
          <div className="space-y-4">
            {sources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1"
              >
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                >
                  {source.title}
                </a>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    {new URL(source.url).hostname}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Relevance: {Math.round(source.relevance * 100)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 