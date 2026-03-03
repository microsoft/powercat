const questions = [
        {
          id: "primaryPurpose",
          title: "What is your primary purpose for the AI agent?",
          subtitle:
            "This helps determine which platform aligns with your core objectives",
          options: [
            {
              id: "organizational",
              label: "Organizational knowledge and simple tasks",
              description:
                "Handle internal FAQs, specialized queries, or basic integrations for your organization",
            },
            {
              id: "business_process",
              label: "Custom business process automation",
              description:
                "Specific workflow automation with conversational interfaces, autonomous triggers, orchestration, and action-taking capabilities",
            },
            {
              id: "enterprise_ai",
              label: "Enterprise AI/ML platform capabilities",
              description:
                "Bespoke AI solutions, model training, complex multi-step agents, and advanced analytics",
            },
          ],
        },
        {
          id: "complexityLevel",
          title: "What level of complexity does your use case require?",
          subtitle:
            "Consider development effort, customization, and technical requirements",
          options: [
            {
              id: "low",
              label: "Low - Configure with your content",
              description: "Use templates to get started quickly, add knowledge sources with guided setup process",
            },
            {
              id: "moderate",
              label: "Moderate - Custom workflows and logic",
              description:
                "Build with multi-step workflows, automated triggers, custom behaviors, integrations, orchestration, and business logic",
            },
            {
              id: "highest",
              label: "Highest - Full software development",
              description:
                "Custom architecture, fine-tune models, vector indexes, custom orchestration, and enterprise-grade development",
            },
          ],
        },
        {
          id: "integrationScope",
          title: "What are your integration requirements?",
          subtitle: "Consider your data sources and system connectivity needs",
          options: [
            {
              id: "extended_microsoft",
              label: "Extended Microsoft ecosystem",
              description:
                "Microsoft Graph + some internal knowledge bases and limited plugins",
            },
            {
              id: "power_platform",
              label: "Extended integrations with enterprise systems",
              description:
                "1400+ services through prebuilt connectors, Dataverse, REST APIs and workflows for process automation",
            },
            {
              id: "unlimited",
              label: "Unlimited integration freedom",
              description:
                "Any data source, API, database, or system that can be coded",
            },
          ],
        },
        {
          id: "deploymentOptions",
          title: "Where and how do you want users to access your AI agent?",
          subtitle: "Consider deployment channels and user access patterns",
          options: [
            {
              id: "copilot_chat",
              label: "Within Microsoft 365 Copilot and applications only",
              description:
                "Access directly within Microsoft 365 apps through the Copilot chat interfaces",
            },
            {
              id: "multiple_channels",
              label: "Wide range of internal and external channels",
              description:
                "Microsoft 365 Copilot, Microsoft Teams, SharePoint, websites, portals, mobile apps, Azure Bot Service channels, custom channels via APIs and connectors",
            },
            {
              id: "custom_applications",
              label: "Custom applications and anywhere access",
              description:
                "On-premises options for enterprise solutions, web applications, mobile apps, enterprise software, internal systems, and any platform that can call APIs",
            },
          ],
        },
      ];

      const platformOptions = {
        microsoft365copilot: {
          id: "microsoft365copilot",
          name: "Microsoft 365 Copilot",
          icon: "users",
          color: "blue",
          description:
            "Built-in productivity assistant across Microsoft 365 apps.",
          benefits: [
            "Immediate deployment",
            "No development required",
            "Works with existing Microsoft 365 data",
            "Standard security & compliance",
          ],
          reasoning: [],
        },
        agentbuilder: {
          id: "agentbuilder",
          name: "Agent Builder",
          icon: "wrench",
          color: "green",
          description:
            "Extend Microsoft 365 Copilot with custom organizational knowledge and company-specific capabilities",
          benefits: [
            "Templates with design guidelines and best practices to get you started quickly",
            "Lightweight customization without code for needs beyond 1st party agents",
            "Organizational Q&A from custom knowledge bases and internal documents",
            "Simple task execution through plugins and flows",
            "Stays within familiar Copilot UI for users",
            "Connect SharePoint libraries, internal systems, and specialized FAQ documents",
          ],
          reasoning: [],
        },
        copilotstudio: {
          id: "copilotstudio",
          name: "Copilot Studio",
          icon: "paint-brush",
          color: "purple",
          description:
            "Intuitive, natural language building experience for creating custom conversational and autonomous agents with advanced workflows and multi-channel deployment",
          benefits: [
            "Full conversational agent capabilities with branching dialogues",
            "Access to 1400+ connectors",
            "Multi-channel deployment (Teams, custom websites & portals, SharePoint)",
            "Action-taking capabilities through Power Automate",
            "Visual conversation design and custom prompt engineering",
            "Generative AI to coordinate and manage multiple tools, knowledge, agents, or workflows",
          ],
          reasoning: [],
        },
        azureai: {
          id: "azureai",
          name: "Microsoft Foundry",
          icon: "cloud",
          color: "indigo",
          description:
            "Enterprise AI/ML platform for building bespoke AI solutions with complete development control and advanced capabilities",
          benefits: [
            "Unlimited integration freedom with any data source or system",
            "Custom model training, fine-tuning, and deployment",
            "Advanced features like RAG, custom decision logic, and autonomous agents",
            "Enterprise-grade scalability with comprehensive monitoring",
            "Full software development flexibility and control",
          ],
          reasoning: [],
        },
      };

      const implementationChecklists = {
        microsoft365copilot: {
          predev: [
            "Verify Microsoft 365 Copilot licensing for target users",
            "Identify which of the 11+ 1st party agents match your use case (Sales, Finance, HR, etc.)",
            "Review data access permissions and Microsoft Graph connectivity",
            "Enable Bing integration if web search capabilities are needed",
            "Configure approved SharePoint sites and data sources for specialized agents",
            "Plan user onboarding and training for Office app and specialized agent integration",
          ],
          postdev: [
            "Monitor Copilot and specialized agent usage analytics within Microsoft 365 admin center",
            "Track adoption of specific 1st party agents (Sales, Service, Finance, HR, etc.)",
            "Collect user feedback on productivity improvements across specialized agents",
            "Ensure data governance policies are being followed for all agent types",
            "Provide ongoing support for users learning Copilot and specialized agent features",
          ],
        },
        agentbuilder: {
          predev: [
            "Define organizational knowledge sources and FAQ content",
            "Identify internal SharePoint libraries and document sources",
            "Plan Graph Connector setup for external knowledge bases",
            "Design simple conversation flows for company-specific queries",
            "Configure permissions for organizational data access",
          ],
          postdev: [
            "Deploy agent capabilities within Copilot Chat experience",
            "Monitor organizational query patterns and response accuracy",
            "Update knowledge sources and refine agent responses",
            "Measure user satisfaction with company-specific AI assistance",
            "Scale to additional departments based on success metrics",
          ],
        },
        copilotstudio: {
          predev: [
            "Map out conversational flows and user journey scenarios",
            "Identify required connectors (from 1400+ available)",
            "Design agent personality, tone, and response patterns",
            "Plan integration with Dataverse, APIs, and business systems",
            "Set up your environments and align with admin, compliance, and security policies",
            "Validate monitoring, logging, licensing, and integration requirements before deployment",
            "Get approval from governance leads if sensitive data is involved",
          ],
          postdev: [
            "Deploy to Teams, SharePoint, or web channels as planned",
            "Implement comprehensive analytics and conversation tracking",
            "Monitor connector performance and system integrations",
            "Continuously optimize conversation flows based on user interactions",
            "Plan expansion to additional channels and use cases",
          ],
        },
        azureai: {
          predev: [
            "Design AI architecture including RAG, custom models, and data pipelines",
            "Plan Azure infrastructure, compute resources, and cost management",
            "Architect data integration patterns for enterprise systems",
            "Establish MLOps pipelines for model training and deployment",
            "Create comprehensive security, monitoring, and governance frameworks",
          ],
          postdev: [
            "Deploy to production with full observability and alerting",
            "Implement model performance monitoring and retraining pipelines",
            "Establish CI/CD for continuous integration and deployment",
            "Monitor costs, performance metrics, and resource utilization",
            "Maintain model accuracy and implement feedback loops for improvement",
          ],
        },
      };

      // Application State
      let currentStep = 0;
      let currentQuestionIndex = 0;
      let answers = {};
      let recommendedPlatform = null;
      let structurePlanningData = {};

      // 1st Party Copilot Agents - Available out-of-the-box
      const firstPartyCopilots = {
        sales_crm: {
          name: "Copilot for Sales",
          description:
            "Integrates with Dynamics 365 and Salesforce to assist with CRM tasks",
        },
        customer_service: {
          name: "Copilot for Service",
          description:
            "Supports customer service workflows and case resolution",
        },
        finance_reporting: {
          name: "Copilot for Finance",
          description: "Helps with financial reporting and analysis",
        },
        research_content: {
          name: "Researcher Agent",
          description: "Synthesizes information and drafts content",
        },
        data_analysis: {
          name: "Analyst Agent",
          description: "Transforms data into insights and visualizations",
        },
        meeting_facilitation: {
          name: "Facilitator Agent",
          description: "Manages Teams meetings, notes, and moderation",
        },
        hr_it_selfservice: {
          name: "Employee Self-Service Agent",
          description:
            "Handles HR and IT tasks like PTO requests and helpdesk tickets",
        },
        sharepoint_access: {
          name: "SharePoint Agents",
          description: "Provide natural language access to SharePoint content",
        },
        interpretation: {
          name: "Interpreter Agent",
          description:
            "Enables real-time speech-to-speech interpretation in Teams",
        },
        project_management: {
          name: "Project Manager Agent",
          description: "Automate project management tasks in Planner",
        },
        skills_expertise: {
          name: "Skills Agent",
          description: "Explore organizational skills and find expertise",
        },
      };

      // Platform-specific structure planning content
      const platformStructures = {
        microsoft365copilot: {
          title: "Microsoft 365 Copilot Structure",
          sections: [
            {
              title: "Agent Selection & Setup",
              icon: "🤖",
              components: [
                {
                  title: "License Verification",
                  icon: "📋",
                  color: "#3b82f6",
                  description:
                    "Verify Microsoft 365 Copilot licensing for target users and roles",
                },
                {
                  title: "Agent Enablement",
                  icon: "⚡",
                  color: "#22c55e",
                  description:
                    "Enable specific 1st party agents (Sales, Finance, HR, etc.) based on user needs",
                },
                {
                  title: "Data Permissions",
                  icon: "🔐",
                  color: "#f97316",
                  description:
                    "Configure Microsoft Graph permissions and data access for specialized agents",
                },
                {
                  title: "SharePoint Integration",
                  icon: "📚",
                  color: "#a855f7",
                  description:
                    "Connect SharePoint sites and document libraries for agent knowledge sources",
                },
              ],
            },
            {
              title: "Usage & Deployment",
              icon: "🚀",
              components: [
                {
                  title: "User Training",
                  icon: "👥",
                  color: "#3b82f6",
                  description:
                    "Plan training for Office apps integration and specialized agent features",
                },
                {
                  title: "Governance Policies",
                  icon: "⚖️",
                  color: "#22c55e",
                  description:
                    "Establish data governance and usage policies across all agent types",
                },
                {
                  title: "Analytics Setup",
                  icon: "📊",
                  color: "#f97316",
                  description:
                    "Configure Microsoft 365 admin center monitoring for agent usage and adoption",
                },
              ],
            },
          ],
        },
        agentbuilder: {
          title: "Agent Builder Agent Structure",
          sections: [
            {
              title: "Knowledge & Data Sources",
              icon: "📚",
              components: [
                {
                  title: "Organizational Knowledge",
                  icon: "🏢",
                  color: "#3b82f6",
                  description:
                    "Define internal FAQ content and organizational-specific information",
                },
                {
                  title: "SharePoint Libraries",
                  icon: "📁",
                  color: "#22c55e",
                  description:
                    "Connect to internal SharePoint document libraries and knowledge bases",
                },
                {
                  title: "Microsoft Graph APIs",
                  icon: "🔗",
                  color: "#f97316",
                  description:
                    "Configure Graph API connections for calendar, email, and team data",
                },
                {
                  title: "Custom Data Sources",
                  icon: "🗄️",
                  color: "#a855f7",
                  description:
                    "Integrate external systems and databases through approved connectors",
                },
              ],
            },
            {
              title: "Agent Behavior & Deployment",
              icon: "⚙️",
              components: [
                {
                  title: "Response Templates",
                  icon: "📝",
                  color: "#3b82f6",
                  description:
                    "Design standardized response patterns and organizational tone",
                },
                {
                  title: "Access Controls",
                  icon: "🔒",
                  color: "#22c55e",
                  description:
                    "Set user permissions and data access levels within Microsoft 365 ecosystem",
                },
                {
                  title: "Testing & Validation",
                  icon: "🧪",
                  color: "#f97316",
                  description:
                    "Test agent responses with organizational stakeholders before deployment",
                },
              ],
            },
          ],
        },
        copilotstudio: {
          title: "Copilot Studio Agent Structure",
          sections: [
            {
              title: "Conversation Design",
              icon: "💬",
              components: [
                {
                  title: "Topics & Intents",
                  icon: "🎯",
                  color: "#3b82f6",
                  description:
                    "Identify the main use cases your agent will cover, and break them down into user intents (what people are trying to achieve)",
                },
                {
                  title: "Dialog Flows",
                  icon: "🌊",
                  color: "#22c55e",
                  description:
                    "Map out conversation pathways and decision trees",
                },
              ],
            },
            {
              title: "Connect & Configure",
              icon: "🔌",
              color: "#a855f7",
              components: [
                {
                  title: "Knowledge Sources",
                  icon: "📚",
                  color: "#3b82f6",
                  description:
                    "Add organizational knowledge bases, documents, websites, AI services, Dataverse",
                },
                {
                  title: "Triggers",
                  icon: "🚦",
                  color: "#22c55e",
                  description:
                    "List user & event-based triggers that trigger your agent's actions",
                },
                {
                  title: "Integrations/Tools",
                  icon: "🛠️",
                  color: "#f97316",
                  description:
                    "Add any pre-built connectors, REST APIs, and business logic that you need to incorporate",
                },
                {
                  title: "Multi-channel Deployment",
                  icon: "📡",
                  color: "#22c55e",
                  description:
                    "Configure your agent for deployment across multiple channels, including Teams, SharePoint, web chat, Outlook, or other apps",
                },
                {
                  title: "Authentication and Access",
                  icon: "🔐",
                  color: "#f97316",
                  description:
                    "Decide between end-user authentication (Copilot auth) vs. agent/service authentication, list access controls, role-based permissions, and auditing needs",
                },
              ],
            },
          ],
        },
        azureai: {
          title: "AI Foundry Agent Structure",
          sections: [
            {
              title: "AI & ML Components",
              icon: "🤖",
              components: [
                {
                  title: "Model Selection",
                  icon: "🧠",
                  color: "#3b82f6",
                  description:
                    "Choose appropriate Azure OpenAI models and configure custom fine-tuning",
                },
                {
                  title: "RAG Pipeline",
                  icon: "🔍",
                  color: "#22c55e",
                  description:
                    "Design retrieval-augmented generation with Azure AI Search integration",
                },
                {
                  title: "Vector Databases",
                  icon: "🗄️",
                  color: "#f97316",
                  description:
                    "Configure Azure Cosmos DB for vector storage and similarity search",
                },
                {
                  title: "Custom Models",
                  icon: "⚙️",
                  color: "#a855f7",
                  description:
                    "Plan custom model training pipelines using Azure Machine Learning",
                },
              ],
            },
            {
              title: "Enterprise Infrastructure",
              icon: "🏗️",
              components: [
                {
                  title: "Security & Compliance",
                  icon: "🔒",
                  color: "#3b82f6",
                  description:
                    "Implement enterprise security policies and regulatory compliance",
                },
                {
                  title: "Scalability Design",
                  icon: "📈",
                  color: "#22c55e",
                  description:
                    "Plan auto-scaling policies and resource management strategies",
                },
                {
                  title: "Monitoring & Logging",
                  icon: "📊",
                  color: "#f97316",
                  description:
                    "Set up Application Insights and custom performance dashboards",
                },
                {
                  title: "CI/CD Pipelines",
                  icon: "🔄",
                  color: "#a855f7",
                  description:
                    "Establish MLOps workflows for continuous integration and deployment",
                },
              ],
            },
          ],
        },
      };

      // Check if user needs are covered by 1st party agents
      function checkFirstPartyAgentCoverage(answers) {
        const coveredUseCase = {
          isFirstPartyCovered: false,
          matchingAgent: null,
          reason: "",
        };

        // Check if the primary purpose aligns with existing 1st party agents
        if (answers.primaryPurpose === "productivity") {
          // Most productivity use cases are covered by out-of-the-box Copilot or 1st party agents
          coveredUseCase.isFirstPartyCovered = true;
          coveredUseCase.reason =
            "Personal productivity is comprehensively covered by Microsoft 365 Copilot and specialized 1st party agents";
        }

        return coveredUseCase;
      }

      // Platform determination logic - "Highest requirement wins" approach
      function determinePlatform(answers) {
        // Platform capability levels (from lowest to highest)
        const platformLevels = {
          microsoft365copilot: 1,
          agentbuilder: 2,
          copilotstudio: 3,
          azureai: 4,
        };

        // Map each answer to platforms it could indicate
        const indicatedPlatforms = new Set();

        // Primary Purpose mapping
        if (answers.primaryPurpose === "productivity") {
          indicatedPlatforms.add("microsoft365copilot");
        } else if (answers.primaryPurpose === "organizational") {
          indicatedPlatforms.add("agentbuilder");
        } else if (answers.primaryPurpose === "business_process") {
          indicatedPlatforms.add("copilotstudio");
        } else if (answers.primaryPurpose === "enterprise_ai") {
          indicatedPlatforms.add("azureai");
        }

        // Target Audience mapping removed

        // Complexity Level mapping
        if (answers.complexityLevel === "lowest") {
          indicatedPlatforms.add("microsoft365copilot");
        } else if (answers.complexityLevel === "low") {
          indicatedPlatforms.add("agentbuilder");
        } else if (answers.complexityLevel === "moderate") {
          indicatedPlatforms.add("copilotstudio");
        } else if (answers.complexityLevel === "highest") {
          indicatedPlatforms.add("azureai");
        }

        // Integration Scope mapping
        if (answers.integrationScope === "microsoft_graph") {
          indicatedPlatforms.add("microsoft365copilot");
        } else if (answers.integrationScope === "extended_microsoft") {
          indicatedPlatforms.add("agentbuilder");
        } else if (answers.integrationScope === "power_platform") {
          indicatedPlatforms.add("copilotstudio");
        } else if (answers.integrationScope === "unlimited") {
          indicatedPlatforms.add("azureai");
        }

        // Deployment Options mapping
        if (answers.deploymentOptions === "microsoft365_apps") {
          indicatedPlatforms.add("microsoft365copilot");
        } else if (answers.deploymentOptions === "copilot_chat") {
          indicatedPlatforms.add("agentbuilder");
        } else if (answers.deploymentOptions === "multiple_channels") {
          indicatedPlatforms.add("copilotstudio");
        } else if (answers.deploymentOptions === "custom_applications") {
          indicatedPlatforms.add("azureai");
        }

        // Find the highest capability platform from indicated platforms
        let highestPlatform = "microsoft365copilot"; // default fallback
        let highestLevel = 0;

        for (const platform of indicatedPlatforms) {
          if (platformLevels[platform] > highestLevel) {
            highestLevel = platformLevels[platform];
            highestPlatform = platform;
          }
        }

        // Get the platform configuration
        const bestMatch = { ...platformOptions[highestPlatform] };

        // Generate reasoning based on the selected platform and user answers
        const firstPartyCheck = checkFirstPartyAgentCoverage(answers);

        switch (highestPlatform) {
          case "microsoft365copilot":
            bestMatch.reasoning = [
              "Personal productivity focus aligns with Copilot's core purpose",
              "End-users benefit from zero-effort AI integration in Office apps",
              "Lowest complexity matches out-of-the-box functionality",
            ];
            if (answers.deploymentOptions === "microsoft365_apps") {
              bestMatch.reasoning.push(
                "Perfect fit for deployment within Microsoft 365 apps where users already work"
              );
            }
            if (firstPartyCheck.isFirstPartyCovered) {
              bestMatch.reasoning.push(
                "Your use case is likely covered by existing 1st party Copilot agents"
              );
            }
            break;

          case "agentbuilder":
            bestMatch.reasoning = [
              "Organizational needs require custom knowledge extension",
              "Business users benefit from custom AI capabilities within familiar Copilot UI",
              "Extended Microsoft ecosystem integration capabilities",
            ];
            if (answers.deploymentOptions === "copilot_chat") {
              bestMatch.reasoning.push(
                "Seamlessly integrates custom capabilities within existing Copilot Chat experience"
              );
            }
            break;

          case "copilotstudio":
            bestMatch.reasoning = [
              "Business process automation requires Copilot Studio's advanced capabilities",
              "Moderate complexity needs visual conversation design tools",
              "Connectors provide extensive integration options",
            ];
            if (answers.deploymentOptions === "multiple_channels") {
              bestMatch.reasoning.push(
                "Multi-channel deployment capabilities support Teams, SharePoint, and web integration"
              );
            }
            break;

          case "azureai":
            bestMatch.reasoning = [
              "Enterprise AI requirements need Microsoft Foundry's full capabilities",
              "Developer audience requires complete control and customization",
              "Highest complexity demands comprehensive development platform",
              "Unlimited integration scope requires enterprise-grade flexibility",
            ];
            if (answers.deploymentOptions === "custom_applications") {
              bestMatch.reasoning.push(
                "Complete deployment flexibility supports custom applications and unlimited integration scenarios"
              );
            }
            break;
        }

        return bestMatch;
      }

      // DOM manipulation functions
      function showSection(sectionId) {
        document.querySelectorAll('[id$="-section"]').forEach((section) => {
          section.classList.add("hidden");
        });
        document.getElementById(sectionId).classList.remove("hidden");

        // Always scroll to top when navigating to a new section
        // Use setTimeout to ensure scroll happens after DOM updates
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 10);
      }

      function updateProgressIndicator() {
        const steps = document.querySelectorAll(".step-circle");
        steps.forEach((step, index) => {
          const stepNum = parseInt(step.getAttribute("data-step"));
          step.className = "step-circle";

          if (stepNum < currentStep) {
            step.classList.add("completed");
            step.innerHTML = "✓";
          } else if (stepNum === currentStep) {
            step.classList.add("active");
            step.innerHTML = stepNum + 1;
          } else {
            step.classList.add("pending");
            step.innerHTML = stepNum + 1;
          }
        });
      }

      function renderQuestion() {
        const question = questions[currentQuestionIndex];
        document.getElementById("question-title").textContent = question.title;
        document.getElementById("question-subtitle").textContent =
          question.subtitle;
        document.getElementById("current-question").textContent =
          currentQuestionIndex + 1;
        document.getElementById("total-questions").textContent =
          questions.length;

        // Always scroll to top when navigating between questions
        // Use setTimeout to ensure scroll happens after DOM updates
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 10);

        const optionsList = document.getElementById("options-list");
        optionsList.innerHTML = "";

        question.options.forEach((option) => {
          const optionElement = document.createElement("div");
          optionElement.className = `option-card ${
            answers[question.id] === option.id ? "selected" : ""
          }`;
          optionElement.setAttribute("data-testid", `option-${option.id}`);

          optionElement.innerHTML = `
                    <input type="radio" 
                           name="${question.id}" 
                           value="${option.id}" 
                           class="option-radio"
                           data-testid="radio-${option.id}"
                           ${
                             answers[question.id] === option.id ? "checked" : ""
                           }>
                    <div class="option-content">
                        <h4 class="option-label">${option.label}</h4>
                        <p class="option-description">${option.description}</p>
                    </div>
                `;

          optionElement.addEventListener("click", () =>
            selectOption(question.id, option.id)
          );
          optionsList.appendChild(optionElement);
        });

        // Update navigation buttons
        document.getElementById("prev-btn").disabled = false;
        document.getElementById("next-btn").disabled = !answers[question.id];
        document.getElementById("next-btn").textContent =
          currentQuestionIndex === questions.length - 1
            ? "Get Recommendation ▶"
            : "Next ▶";
      }

      function selectOption(questionId, optionId) {
        answers[questionId] = optionId;
        renderQuestion();
      }

      function renderRecommendation() {
        recommendedPlatform = determinePlatform(answers);

        // Platform icon mappings to match preview icons
        const platformIcons = {
          microsoft365copilot:
            "../images/m365-copilot-logo.png",
          agentbuilder:
            "../images/copilot.png",
          copilotstudio:
            "../images/copilot-studio.png",
          azureai: "../images/ai-foundry.png",
        };

        const iconUrl = platformIcons[recommendedPlatform.id];
        document.getElementById(
          "platform-icon-large"
        ).innerHTML = `<img src="${iconUrl}" alt="${recommendedPlatform.name} Icon" style="width: 48px; height: 48px;"/>`;
        document.getElementById("platform-name").textContent =
          recommendedPlatform.name;
        document.getElementById("platform-description").textContent =
          recommendedPlatform.description;

        const benefitsList = document.getElementById("benefits-list");
        benefitsList.innerHTML = "";
        recommendedPlatform.benefits.forEach((benefit) => {
          const li = document.createElement("li");
          li.className = "benefit-item";
          li.innerHTML = `<span class="check-icon">✅</span><span class="benefit-text">${benefit}</span>`;
          benefitsList.appendChild(li);
        });

        // Show 1st party agents if Microsoft 365 Copilot is recommended
        const firstPartySection = document.getElementById("first-party-agents");
        if (recommendedPlatform.id === "microsoft365copilot") {
          firstPartySection.classList.remove("hidden");
          const agentsGrid = document.getElementById("agents-grid");
          agentsGrid.innerHTML = "";

          Object.values(firstPartyCopilots).forEach((agent) => {
            const agentCard = document.createElement("div");
            agentCard.style.cssText =
              "background-color: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 12px;";
            agentCard.innerHTML = `
                        <h5 style="font-weight: 600; color: hsl(var(--foreground)); margin-bottom: 4px; font-size: 14px;">${agent.name}</h5>
                        <p style="font-size: 12px; color: hsl(var(--muted-foreground)); margin: 0;">${agent.description}</p>
                    `;
            agentsGrid.appendChild(agentCard);
          });
        } else {
          firstPartySection.classList.add("hidden");
        }

        const reasoningList = document.getElementById("reasoning-list");
        reasoningList.innerHTML = "";
        recommendedPlatform.reasoning.forEach((reason) => {
          const li = document.createElement("li");
          li.className = "reasoning-item";
          li.innerHTML = `<span class="check-icon">✅</span><span class="reasoning-text">${reason}</span>`;
          reasoningList.appendChild(li);
        });
      }

      function renderStructure() {
        const platformStructure = platformStructures[recommendedPlatform.id];

        // Update the structure section title
        document.querySelector(
          ".structure-title"
        ).innerHTML = `${platformStructure.title}`;

        const structureContainer = document.getElementById(
          "platform-specific-structure"
        );
        structureContainer.innerHTML = "";

        platformStructure.sections.forEach((section) => {
          const sectionDiv = document.createElement("div");
          sectionDiv.className = "structure-section";
          sectionDiv.innerHTML = `
                    <h3 class="structure-section-title">
                        <span class="icon">${section.icon}</span> ${
            section.title
          }
                    </h3>
                    <div class="component-grid">
                        ${section.components
                          .map(
                            (component, componentIndex) => `
                            <div class="component-card">
                                <h4 class="component-title">
                                    <span class="icon" style="color: ${
                                      component.color
                                    };">${component.icon}</span> ${
                              component.title
                            }
                                </h4>
                                <p class="component-description">${
                                  component.description
                                }</p>
                                <div class="component-controls">
                                    <div class="component-checkbox">
                                        <input type="checkbox" id="component-${section.title
                                          .replace(/\s+/g, "-")
                                          .toLowerCase()}-${componentIndex}" 
                                               data-section="${
                                                 section.title
                                               }" data-component="${
                              component.title
                            }"
                                               onchange="updateStructureData(this)">
                                        <label for="component-${section.title
                                          .replace(/\s+/g, "-")
                                          .toLowerCase()}-${componentIndex}">Include in plan</label>
                                    </div>
                                    <textarea class="component-textarea" 
                                              placeholder="Add your specific implementation notes, decisions, or requirements for this component..."
                                              data-section="${
                                                section.title
                                              }" data-component="${
                              component.title
                            }"
                                              onchange="updateStructureData(this)"></textarea>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                        <!-- Other Option -->
                        <div class="component-card">
                            <h4 class="component-title">
                                <span class="icon" style="color: #6b7280;">✏️</span> Other
                            </h4>
                            <p class="component-description">Add your own custom component for this section</p>
                            <div class="component-controls">
                                <div class="component-checkbox">
                                    <input type="checkbox" id="component-${section.title
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}-other" 
                                           data-section="${
                                             section.title
                                           }" data-component="Other"
                                           onchange="updateStructureData(this)">
                                    <label for="component-${section.title
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}-other">Include in plan</label>
                                </div>
                                <input type="text" class="component-text-input" 
                                       placeholder="Enter your custom component name..."
                                       data-section="${
                                         section.title
                                       }" data-component="Other" data-field="customName"
                                       onchange="updateStructureData(this)">
                                <textarea class="component-textarea" 
                                          placeholder="Add your specific implementation notes, decisions, or requirements for this component..."
                                          data-section="${
                                            section.title
                                          }" data-component="Other" data-field="notes"
                                          onchange="updateStructureData(this)"></textarea>
                            </div>
                        </div>
                    </div>
                `;
          structureContainer.appendChild(sectionDiv);
        });
      }

      function updateStructureData(element) {
        const section = element.getAttribute("data-section");
        const component = element.getAttribute("data-component");
        const field = element.getAttribute("data-field");

        if (!structurePlanningData[section]) {
          structurePlanningData[section] = {};
        }
        if (!structurePlanningData[section][component]) {
          structurePlanningData[section][component] = {
            selected: false,
            notes: "",
            customName: "",
          };
        }

        if (element.type === "checkbox") {
          structurePlanningData[section][component].selected = element.checked;
        } else if (element.tagName === "TEXTAREA") {
          if (field === "notes") {
            structurePlanningData[section][component].notes = element.value;
          } else {
            // Default behavior for regular textareas without data-field
            structurePlanningData[section][component].notes = element.value;
          }
        } else if (element.type === "text" && field === "customName") {
          structurePlanningData[section][component].customName = element.value;
        }
      }

      function renderImplementation() {
        const checklist = implementationChecklists[recommendedPlatform.id];

        const predevList = document.getElementById("predev-checklist");
        predevList.innerHTML = "";
        checklist.predev.forEach((item, index) => {
          const li = document.createElement("li");
          li.className = "checklist-item";
          li.innerHTML = `<span class="checklist-item-text" data-testid="predev-item-${index}">${item}</span>`;
          predevList.appendChild(li);
        });

        const postdevList = document.getElementById("postdev-checklist");
        postdevList.innerHTML = "";
        checklist.postdev.forEach((item, index) => {
          const li = document.createElement("li");
          li.className = "checklist-item";
          li.innerHTML = `<span class="checklist-item-text" data-testid="postdev-item-${index}">${item}</span>`;
          postdevList.appendChild(li);
        });
      }

      function exportPlan() {
        const questionTitles = {
          primaryPurpose: "Primary Purpose",
          integrationScope: "Integration Scope",
          complexityLevel: "Complexity Level",
          deploymentOptions: "Deployment Options",
        };

        // Create RTF content for Word compatibility
        let rtf =
          "{\\rtf1\\ansi\\deff0\\nouicompat{\\fonttbl{\\f0\\fswiss\\fcharset0 Arial;}}";
        rtf += "{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue255;}";
        rtf += "\\viewkind4\\uc1\\pard\\f0\\fs24";

        // Title
        rtf +=
          "\\qc\\b\\fs32 MICROSOFT AI AGENT PLATFORM PLAN\\b0\\fs24\\par\\par";
        rtf += `\\qc\\i Generated on: ${new Date().toLocaleDateString()}\\i0\\par\\par`;
        rtf += "\\ql"; // Left align for body text

        // Recommended Platform
        rtf += "\\b\\fs28 1. RECOMMENDED PLATFORM\\b0\\fs24\\par";
        rtf += "\\line";
        rtf += `\\b Platform: \\b0 ${recommendedPlatform.name}\\par\\par`;
        rtf += `\\b Description: \\b0 ${recommendedPlatform.description}\\par\\par`;

        // Questionnaire Results
        rtf += "\\b\\fs28 2. ASSESSMENT RESULTS\\b0\\fs24\\par";
        rtf += "\\line";
        Object.entries(answers).forEach(([key, value]) => {
          rtf += `\\b ${questionTitles[key] || key}: \\b0 ${value
            .replace(/_/g, " ")
            .toUpperCase()}\\par`;
        });
        rtf += "\\par";

        // Reasoning
        rtf += "\\b\\fs28 3. WHY THIS RECOMMENDATION?\\b0\\fs24\\par";
        rtf += "\\line";
        recommendedPlatform.reasoning.forEach((reason, index) => {
          rtf += `${index + 1}. ${reason}\\par`;
        });
        rtf += "\\par";

        // Structure Planning (if any data captured)
        if (Object.keys(structurePlanningData).length > 0) {
          rtf += "\\b\\fs28 4. AGENT STRUCTURE PLANNING\\b0\\fs24\\par";
          rtf += "\\line";

          Object.entries(structurePlanningData).forEach(
            ([sectionTitle, components]) => {
              rtf += `\\par\\b\\fs26 ${sectionTitle.toUpperCase()}\\b0\\fs24\\par`;

              Object.entries(components).forEach(([componentTitle, data]) => {
                if (data.selected || data.notes) {
                  rtf += `${
                    data.selected ? "\\u9745?" : "\\u9744?"
                  } ${componentTitle}\\par`;
                  if (data.notes) {
                    rtf += `\\tab\\i Notes: ${data.notes}\\i0\\par`;
                  }
                }
              });
            }
          );
          rtf += "\\par";
        }

        // Implementation Checklist
        const checklist = implementationChecklists[recommendedPlatform.id];
        const sectionNumber =
          Object.keys(structurePlanningData).length > 0 ? "5" : "4";
        rtf += `\\b\\fs28 ${sectionNumber}. IMPLEMENTATION CHECKLIST\\b0\\fs24\\par`;
        rtf += "\\line";

        // Pre-development
        rtf += "\\par\\b\\fs26 PRE-DEVELOPMENT TASKS\\b0\\fs24\\par";
        checklist.predev.forEach((item, index) => {
          rtf += `\\u9744? ${index + 1}. ${item}\\par`;
        });

        // Post-development
        rtf += "\\par\\b\\fs26 POST-DEVELOPMENT TASKS\\b0\\fs24\\par";
        checklist.postdev.forEach((item, index) => {
          rtf += `\\u9744? ${index + 1}. ${item}\\par`;
        });

        rtf += "\\par\\line\\par";
        rtf +=
          "\\qc\\i This plan was generated by Agent Platform Advisor https://aka.ms/AgentPlatformAdvisor\\i0\\par";
        rtf += "}";

        // Create and download RTF file
        const blob = new Blob([rtf], { type: "application/rtf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `agent-platform-plan-${
          new Date().toISOString().split("T")[0]
        }.rtf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      function restart() {
        currentStep = 0;
        currentQuestionIndex = 0;
        answers = {};
        recommendedPlatform = null;
        structurePlanningData = {};
        updateProgressIndicator();
        showSection("welcome-section");
      }

      // Event Listeners
      document.addEventListener("DOMContentLoaded", function () {
        // Initialize
        updateProgressIndicator();

        // Welcome section
        document
          .getElementById("start-assessment")
          .addEventListener("click", function () {
            showSection("prebuilt-agents-section");
          });

        // Pre-built agents section
        document
          .getElementById("prebuilt-yes-btn")
          .addEventListener("click", function () {
            // Directly recommend Microsoft 365 Copilot
            recommendedPlatform = platformOptions["microsoft365copilot"];
            currentStep = 2;
            updateProgressIndicator();
            renderRecommendation();
            showSection("recommendation-section");
          });

        document
          .getElementById("prebuilt-no-btn")
          .addEventListener("click", function () {
            currentStep = 1;
            currentQuestionIndex = 0;
            updateProgressIndicator();
            renderQuestion();
            showSection("assessment-section");
          });

        // Questionnaire navigation
        document
          .getElementById("prev-btn")
          .addEventListener("click", function () {
            if (currentQuestionIndex > 0) {
              currentQuestionIndex--;
              renderQuestion();
            } else {
              // Go back to pre-built agents section
              currentStep = 0;
              updateProgressIndicator();
              showSection("prebuilt-agents-section");
            }
          });

        document
          .getElementById("next-btn")
          .addEventListener("click", function () {
            if (currentQuestionIndex < questions.length - 1) {
              currentQuestionIndex++;
              renderQuestion();
            } else {
              // Questionnaire complete
              currentStep = 2;
              updateProgressIndicator();
              renderRecommendation();
              showSection("recommendation-section");
            }
          });

        // Recommendation section
        document
          .getElementById("view-structure")
          .addEventListener("click", function () {
            currentStep = 3;
            updateProgressIndicator();
            renderStructure();
            showSection("structure-section");
          });

        // Structure section
        document
          .getElementById("structure-to-implementation")
          .addEventListener("click", function () {
            currentStep = 4;
            updateProgressIndicator();
            renderImplementation();
            showSection("implementation-section");
          });

        // Back button handlers
        document
          .getElementById("back-to-assessment")
          .addEventListener("click", function () {
            currentStep = 0;
            updateProgressIndicator();
            showSection("prebuilt-agents-section");
          });

        document
          .getElementById("back-to-recommendation")
          .addEventListener("click", function () {
            currentStep = 2;
            updateProgressIndicator();
            showSection("recommendation-section");
          });

        document
          .getElementById("back-to-structure")
          .addEventListener("click", function () {
            currentStep = 3;
            updateProgressIndicator();
            showSection("structure-section");
          });

        // Final section buttons
        document
          .getElementById("restart-btn")
          .addEventListener("click", restart);
        document
          .getElementById("export-btn")
          .addEventListener("click", exportPlan);
      });