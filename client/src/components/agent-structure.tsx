import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Network, 
  Settings, 
  FileText, 
  Database, 
  Wrench, 
  GitBranch, 
  Link, 
  MessageCircle, 
  Bell,
  Users,
  Cog,
  RotateCcw,
  Download
} from "lucide-react";

interface AgentStructureProps {
  onRestart: () => void;
  onExport: () => void;
}

const coreComponents = [
  {
    icon: FileText,
    title: "Instructions",
    description: "Define agent behavior, personality, and response guidelines",
    color: "blue"
  },
  {
    icon: Database,
    title: "Knowledge Base",
    description: "Document sources, data connections, and information repositories",
    color: "green"
  },
  {
    icon: Wrench,
    title: "Tools & Functions",
    description: "APIs, plugins, and external service integrations",
    color: "orange"
  },
  {
    icon: GitBranch,
    title: "Conversation Flows",
    description: "Dialog management and conversation pathways",
    color: "purple"
  }
];

const integrationComponents = [
  {
    icon: Link,
    title: "Connectors",
    description: "System integrations and data source connections",
    color: "blue"
  },
  {
    icon: MessageCircle,
    title: "Channels",
    description: "Deployment targets and user interaction points",
    color: "green"
  },
  {
    icon: Bell,
    title: "Triggers",
    description: "Event-based activation and automation rules",
    color: "orange"
  }
];

const agentTypes = [
  {
    icon: Users,
    title: "Conversational Agent",
    features: [
      "Interactive dialog-based responses",
      "User-initiated conversations",
      "Question-answer patterns",
      "Context-aware interactions"
    ],
    color: "blue"
  },
  {
    icon: Cog,
    title: "Autonomous Agent",
    features: [
      "Proactive task execution",
      "Event-driven automation",
      "Background processing",
      "Scheduled operations"
    ],
    color: "green"
  }
];

export function AgentStructure({ onRestart, onExport }: AgentStructureProps) {
  return (
    <div className="fade-in">
      <Card>
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center flex items-center justify-center">
            <Network className="text-primary mr-3" />
            Agent Structure Planning
          </h2>
          
          <div className="grid gap-6">
            {/* Core Components */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-accent-foreground mb-4 flex items-center">
                <Settings className="text-primary mr-2" />
                Core Components
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {coreComponents.map((component, index) => (
                  <div key={index} className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <component.icon className={`text-${component.color}-500 mr-2`} size={20} />
                      {component.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{component.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration & Deployment */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-accent-foreground mb-4 flex items-center">
                <Link className="text-primary mr-2" />
                Integration & Deployment
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {integrationComponents.map((component, index) => (
                  <div key={index} className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <component.icon className={`text-${component.color}-500 mr-2`} size={20} />
                      {component.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{component.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Type Selection */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-accent-foreground mb-4 flex items-center">
                <Users className="text-primary mr-2" />
                Agent Type & Behavior
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {agentTypes.map((type, index) => (
                  <div key={index} className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <type.icon className={`text-${type.color}-500 mr-2`} size={20} />
                      {type.title}
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center">
            <Button 
              variant="secondary" 
              onClick={onRestart} 
              className="mr-4"
              data-testid="button-restart"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button onClick={onExport} data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
