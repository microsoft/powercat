 const cardList = document.getElementById("card-list");
        const drawCardButton = document.getElementById("draw-card-centred");

        const categoryIcons = {
            "Stakeholders": 'stakeholder.svg',
            "Objectives": "objective.svg",
            "Challenges": "challenge.svg",
            "Outcomes": "outcome.svg",
            "Wildcard": "wildcard.svg"
        }

        const placedCards = {
            "Stakeholders": [],
            "Objectives": [],
            "Challenges": [],
            "Outcomes": [],
            "Wildcard": [],
            "Not Relevant": []
        };

        const cards = [
        {
            title: "Data Quality Issues",
            description: "Incomplete, outdated, or inconsistent data can affect system performance and accuracy.",
            category: "Challenges"
        },
        {
            title: "User Adoption Resistance",
            description: "Employees or customers may be hesitant to trust or use new technologies.",
            category: "Challenges"
        },
        {
            title: "Integration Complexity",
            description: "Difficulty in connecting the solution with existing systems and workflows.",
            category: "Challenges"
        },
        {
            title: "Data Privacy",
            description: "Ensuring sensitive information is protected.",
            category: "Challenges"
        },
        {
            title: "Skills Gap",
            description: "Addressing the need for upskilling employees.",
            category: "Challenges"
        },
        {
            title: "Resource Contraints",
            description: "Working with financial, people, or other resource contraints to implement the solution.",
            category: "Challenges"
        },
        {
            title: "Unclear success critieria",
            description: "Uncertainty about the project's goals and/or success measurement criteria.",
            category: "Challenges"
        },
        {
            title: "Explanability gaps",
            description: "Users report difficulty understanding how AI decisions are made.",
            category: "Challenges"
        },
        {
            title: "Improve Efficiency",
            description: "Streamline processes to save time.",
            category: "Objectives"
        },
        {
            title: "Enhance User Experience",
            description: "Improve usability and accessibility to ensure a seamless interaction for users.",
            category: "Objectives"
        },
        {
            title: "Reduce Costs",
            description: "Lower operational expenses by optimizing resources and automating processes.",
            category: "Objectives"
        },
        {
            title: "Ensure Compliance",
            description: "Meet regulatory and policy requirements to mitigate legal and security risks.",
            category: "Objectives"
        },
        {
            title: "Increase Revenue",
            description: "Drive growth through better decision-making, new opportunities, and improved customer engagement.",
            category: "Objectives"
        },
        {
            title: "Improve Collaboration",
            description: "Enhance communication and coordination across teams and departments.",
            category: "Objectives"
        },
        {
            title: "Scale Operations",
            description: "Enable business growth by creating adaptable and scalable solutions.",
            category: "Objectives"
        },
        {
            title: "Improved Employee Satisfaction",
            description: "Employees feel supported and engaged.",
            category: "Outcomes"
        },
        {
            title: "Automate repetitive tasks",
            description: "Automation streamlines operations and frees up employee time.",
            category: "Outcomes"
        },
        {
            title: "Reduce response times",
            description: "Common queries and requests are managed faster, allowing teams to focus on strategic initiatives.",
            category: "Outcomes"
        },
        {
            title: "Optimize workflow",
            description: "Agent optimizes workflow, increasing scale and accuracy.",
            category: "Outcomes"
        },
        {
            title: "Cost Savings",
            description: "Automation reduces operational expenses.",
            category: "Outcomes"
        },
        {
            title: "Improved resource allocation",
            description: "Employees are able to support larger and/or more complex workloads.",
            category: "Outcomes"
        },
        {
            title: "Enhanced decision making",
            description: "Users gain better insights through improved data analysis.",
            category: "Outcomes"
        },
        {
            title: "Increased process resilience",
            description: "Sustems or processes are more robust and adaptable to unexpected challenges.",
            category: "Outcomes"
        },
        {
            title: "Improved user trust",
            description: "Users feel confident in the system's fairness, transparency, and reliability.",
            category: "Outcomes"
        },
        {
            title: "Increased revenue streams",
            description: "The system identifies or unlocks new opportunities for generating income.",
            category: "Outcomes"
        },
        {
            title: "Higher customer satisfaction",
            description: "Improved services lead to happier customers and greater lifetime customer value.",
            category: "Outcomes"
        },
        {
            title: "Manager",
            description: "Oversees operations and ensures alignment with goals.",
            category: "Stakeholders"
        },
        {
            title: "IT Administrator",
            description: "Maintains technical infrastructure and ensures system security.",
            category: "Stakeholders"
        },
        {
            title: "Change Manager",
            description: "Leads initiatives for smooth transitions to new processes.",
            category: "Stakeholders"
        },
        {
            title: "Customer/Client",
            description: "Provides feedback on product usability and satisfaction.",
            category: "Stakeholders"
        },
        {
            title: "Partner/Supplier",
            description: "Supplies goods or services critical to operations.",
            category: "Stakeholders"
        },
        {
            title: "End User",
            description: "Interacts with the system daily and relies on its functionality.",
            category: "Stakeholders"
        },
        {
            title: "Process Owner",
            description: "Responsible for key workflows and their efficiency.",
            category: "Stakeholders"
        },
        {
            title: "Compliance Officer",
            description: "Ensures organizational processes meet legal and regulatory requirements",
            category: "Stakeholders"
        },
        {
            title: "Responsible AI Group",
            description: "Provides insights and/or approval on ethical, fair, and accountable use of AI technologies.",
            category: "Stakeholders"
        },
        {
            title: "Director",
            description: "Sets departmental strategies and ensures resources are allocated effectively.",
            category: "Stakeholders"
        },
        {
            title: "Executive",
            description: "Defines organizational vision and strategy, approves high-level decisions.",
            category: "Stakeholders"
        },
        {
            title: "Compliance regulation update",
            description: "New legal requirements force adjustments to the system for compliance.",
            category: "Wildcard"
        },
        {
            title: "Bias in AI outputs",
            description: "The agent system is found to unfairly show favor certain employee groups",
            category: "Wildcard"
        },
        {
            title: "Upstream service downtime",
            description: "Temporary technical glitches in a dependant service cause reliability and/or availability issues.",
            category: "Wildcard"
        },
        {
            title: "Employee Mistrust",
            description: "Concerns arise about the transparency of the AI solution.",
            category: "Wildcard"
        },
        {
            title: "Competition Launches AI",
            description: "A competitor launches a similar AI solution.",
            category: "Wildcard"
        },
        {
            title: "High Staff Turnover",
            description: "Key staff leaving creates resource gaps.",
            category: "Wildcard"
        }
    ];


        // Minimum word count for validation
        const minWordCount = 20;        

        // Function to count words in a string
        function countWords(text) {
                return text.trim().split(/\s+/).filter(word => word.length > 0).length;
            }

        function drawCard() {
            if (cards.length === 0) {
                alert("No more cards to draw.");
                return;
            }
            const card = cards.shift(); // remove card from deck

            // adding in priority for GPT integration
            const priorityLevels = {
                "Stakeholders": "Critical",
                "Objectives": "Primary",
                "Challenges": "High Impact",
                "Outcomes": "Essential",
                "Wildcard": "Low Priority"
            };
            
            const priority = priorityLevels[card.category] || "No priority provided"; // Default if not categorized

            // Disable the draw button to prevent multiple cards being drawn
            drawCardButton.disabled = true;
            // crete card element
            const cardElement = document.createElement("div");
            cardElement.className = `card ${card.category}`;
            cardElement.draggable = true;
            // create icon element
            const icon = document.createElement("img");
            icon.src = categoryIcons[card.category];
            icon.alt = `${card.category} Icon`;
            icon.className = "card-icon";
            // setting card priority and classification - 10 feb
            cardElement.setAttribute("data-priority", priorityLevels[card.category] || "No priority provided");
            // add content inside the card
            cardElement.innerHTML = `
                <div class="card-header">
                    ${icon.outerHTML}
                    <strong>${card.title}</strong>
                </div>
                <p>${card.description}</p>
            `;
            
            cardElement.dataset.category = card.category;
            // adding card priority 10th Feb
            cardElement.dataset.priority = priority; // Store priority/classification!
            // adding card draggable event 
            cardElement.draggable = true;
            // Make the card draggable 10th Feb update
            cardElement.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", JSON.stringify({
                    title: card.title,
                    description: card.description,
                    category: card.category,
                    priority: priority // Ensure priority gets dragged along
                }));
            });
            cardList.appendChild(cardElement);

            // related to Phils ask for redragging - do not count redragging as  new card being dropped
            // Update remaining cards count
            remainingCards = cards.length; // Update to match the remaining cards in the deck
            document.getElementById("remaining-count").textContent = remainingCards;
            console.log(card);
        }

        drawCardButton.addEventListener("click", drawCard);

document.querySelectorAll(".nested-zone, .zone.NotRelevant").forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); // allows dropping
    });

    const zonePriorityMapping = {
        "Stakeholders-Critical": "Critical",
        "Stakeholders-Influential": "Influential",
        "Objectives-Primary": "Primary",
        "Objectives-Secondary": "Secondary",
        "Challenges-HighImpact": "High Impact",
        "Challenges-Manageable": "Manageable",
        "Outcomes-Essential": "Essential",
        "Outcomes-Beneficial": "Beneficial",
        "Wildcard-Critical": "Critical",
        "Wildcard-Manageable": "Manageable",
    };

    zone.addEventListener("drop", (e) => {
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData("text/plain"));
            const zoneId = zone.id; // get the ID of the drop zone - yahoo
            const newPriority = zonePriorityMapping[zoneId] || "No priority provided"; // get priority for zone

            const category = data.category;
            const priority = data.priority || "No priority provided"; // Ensure priority is carried over 10th Frb
            const zoneCategory = zone.closest(".zone").dataset.category; // zone category
            const maxCardsPerZone = 3; // limit can be adjusted - set for card limit in nested zones.

            // 1. Remove the card from all other categories first
            Object.keys(placedCards).forEach(category => {
                placedCards[category] = placedCards[category].filter(card => card.title !== data.title);
                console.log('removed card - "${data.title}"from all categories');
            });

            // 2. Remove card from all DOM zones (both "Not Relevant" and nested zones)
            document.querySelectorAll(".nested-zone .card, .zone.NotRelevant .card").forEach(existingCard => {
                if (existingCard.textContent.trim() === data.title) {
                    existingCard.remove();
                }
            });

            // Ensure we are dropping in a valid zone
            if (zone.closest('.zone').dataset.category != null || zone.classList.contains("NotRelevant")) {
                
                // phils request of limiting to three primary/ essential careds
                const restrictedZones = [
                    "Stakeholders-Critical",
                    "Objectives-Primary",
                    "Challenges-HighImpact",
                    "Outcomes-Essential" 
                ]

                // Skip the limit check for the "Not Relevant" zone, we dont care how many cards end up here.
                if (!zone.classList.contains("NotRelevant")) {
                    // Count current cards in the zone
                    const currentCardCount = zone.querySelectorAll(".card").length;

                    if (currentCardCount >= maxCardsPerZone) {
                        alert(`This zone can only hold up to ${maxCardsPerZone} cards.`);
                        return; // Prevent dropping the card
                    }
                }
                
                if (zone.classList.contains("NotRelevant")) {
                    
                    if (!placedCards["Not Relevant"]) {
                        placedCards["Not Relevant"] = [];
                    }
                    // Add card to "Not Relevant" if it doesn't already exist
                    if (!placedCards["Not Relevant"].some((card) => card.title === data.title)) {
                        placedCards["Not Relevant"].push(data);
                    }
                  
                // per Phils ask for redragging - kill orginal card
                document.querySelectorAll(".nested-zone .card").forEach(existingCard => {
                    if (existingCard.textContent.trim() === data.title) {
                        console.log(`Removing card from previous zone: ${existingCard.textContent.trim()}`);
                        existingCard.parentNode.removeChild(existingCard);
                    }
                });
                // end of that bit :D (thankfully)

        // Remove existing card from other zones (if moved from "Not Relevant")
        document.querySelectorAll(".nested-zone .card, .zone .card").forEach(existingCard => {
            if (existingCard.textContent.trim() === data.title) {
                existingCard.remove();
            }
        });

    const categoryBorderColors = {
        "Stakeholders": "#007bff",
        "Objectives": "#28a745",
        "Challenges": "#ffcc00",
        "Outcomes": "#dc3545",
        "Wildcard": "red"
    };

    // Create a visible card inside Not Relevant
    const cardElement = document.createElement("div");
    cardElement.className = `card ${data.category} dropped-card`;
    cardElement.innerHTML = `<strong>${data.title}</strong>`;
    cardElement.setAttribute("data-priority", newPriority); // set priority
    cardElement.draggable = true;
    // Apply category-based left border color - juicy wide border. note** having to insert rule into stylesheet as JS being overridden. :()
    console.log(`Applying border color for category: ${category}, color: ${categoryBorderColors[category] || "black"}`);
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`.card.${data.category} { border-left: 10px solid ${categoryBorderColors[data.category] || "black"} !important; }`, styleSheet.cssRules.length);
    

    // Attach dragstart event to make the card re-draggable
    cardElement.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(data));
    });

    // Append the card to the Not Relevant zone
    zone.appendChild(cardElement);

    // Remove the card from the main card list (deck)
    const originalCard = Array.from(cardList.children).find(card => card.textContent.includes(data.title));
    if (originalCard) {
        cardList.removeChild(originalCard);
        console.log(`Card "${data.title}" removed from the deck.`);
    }
 
}

    if (!placedCards[category].find(card => card.title === data.title)) {
        placedCards[category].push(data);
    }
    // end temp
    const cardElement = document.createElement("div");
    cardElement.className = `card ${data.category} dropped-card`;
    cardElement.innerHTML = `<strong style="margin-top:0px">${data.title}</strong>`;
    cardElement.setAttribute("data-priority", newPriority); // set priority
    cardElement.draggable = true;
    // Ensure "Not Relevant" category is initialized before using it
    if (zone.classList.contains("NotRelevant")) {
        // Ensure "Not Relevant" category is initialized
    if (!placedCards["Not Relevant"]) {
        placedCards["Not Relevant"] = [];
    }

// Remove the card from all other categories first
Object.keys(placedCards).forEach(category => {
    placedCards[category] = placedCards[category].filter(card => card.title !== data.title);
});

        // Add the card only if it isn't already in "Not Relevant"
        if (!placedCards["Not Relevant"].some(card => card.title === data.title)) {
            placedCards["Not Relevant"].push(data);
        }

        // Remove existing card from other zones (if moved from "Not Relevant")
        document.querySelectorAll(".nested-zone .card, .zone .card").forEach(existingCard => {
            if (existingCard.textContent.trim() === data.title) {
                existingCard.remove();
            }
        });

        // Create a visible card inside Not Relevant
        const cardElement = document.createElement("div");
        cardElement.className = `card ${data.category} dropped-card`;
        cardElement.setAttribute("data-priority", newPriority); // set priority
        cardElement.innerHTML = `<strong>${data.title}</strong>`;
        cardElement.draggable = true;

        // Attach dragstart event to make the card re-draggable
        cardElement.addEventListener("dragstart", (e) => {
           // e.dataTransfer.setData("text/plain", JSON.stringify(data));
           e.dataTransfer.setData("text/plain", JSON.stringify({
            title: data.title,
            description: data.description,
            category: data.category,
            priority: newPriority // Ensure priority persists when dragged again
        }));
        });

        // Append the card to the Not Relevant zone
        zone.appendChild(cardElement);

        // Remove the card from the main card list (deck)
        const originalCard = Array.from(cardList.children).find(card => card.textContent.includes(data.title));
        if (originalCard) {
            cardList.removeChild(originalCard);
            console.log(`Card "${data.title}" removed from the deck.`);
        }

            // RE-ENABLE THE DRAW BUTTON AFTER DROPPING
            drawCardButton.disabled = false; // <-- Fix applied here

                return; // Stop further processing
            } 
            // Append card to drop zone
            zone.appendChild(cardElement);
            // as per Phil's comments, adding in redragging and dropping:
            // Attach dragstart event to make the card re-draggable
            cardElement.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", JSON.stringify(data));
            });
            // Ensure the original card is removed from the card list
            const originalCard = Array.from(cardList.children).find(card => card.textContent.includes(data.title));
            if (originalCard) cardList.removeChild(originalCard);
            // Re-enable the draw button after dropping the card
            drawCardButton.disabled = false;
            }
                
        });
    });

        function startCountdown(duration) {
            let timerDisplay = document.getElementById("countdown-timer");
            let timeRemaining = duration; // in seconds

            let countdownInterval = setInterval(() => {
                let minutes = Math.floor(timeRemaining / 60);
                let seconds = timeRemaining % 60;
                seconds = seconds < 10 ? "0" + seconds : seconds; // Format as MM:SS

                timerDisplay.textContent = `${minutes}:${seconds}`;

                // If less than 5 minutes, change color to red
                if (timeRemaining <= 300) {
                    timerDisplay.classList.add("warning");
                }

                if (timeRemaining <= 0) {
                    clearInterval(countdownInterval);
                    timerDisplay.textContent = "TIME'S UP!";
                    alert("Time is up! The session has ended.");
                }

                timeRemaining--;
            }, 1000);
        }

        // Start the timer when the page loads
        startCountdown(30 * 60); // 30 minutes in seconds

        let remainingCards = cards.length; // Set based on the total number of cards

        // Display initial card count
        document.getElementById("remaining-count").textContent = remainingCards;

        function checkAllCardsPlaced() {
            // Count total placed cards
            let totalPlacedCards = 0;
            Object.values(placedCards).forEach(category => {
                totalPlacedCards += category.length;
            });

            console.log(`Placed Cards: ${totalPlacedCards} / Total Drawn: ${cards.length}`);

            // Transition only if all cards have been drawn AND placed
            if (cards.length === 0 && totalPlacedCards === Object.keys(placedCards).reduce((sum, cat) => sum + placedCards[cat].length, 0)) {
                console.log("All cards placed! Transitioning to playbook.");
                switchToPlaybook();
            }
        }

        // switching and loading
        function switchToPlaybook() {
            const gameContainer = document.getElementById("game-container");
            const gameBoard = document.getElementById("game-board");
            const playbook = document.getElementById("playbook-section");
            const drawCardButton = document.getElementById("draw-card");
            
            // Fade out the game board
            gameBoard.style.opacity = "0";
            setTimeout(() => {
                gameBoard.style.display = "none"; // Hide game board
                playbook.style.display = "block"; // Show playbook
                populatePlaybook();
                setTimeout(() => {
                    playbook.style.opacity = "1"; // Fade in playbook
                }, 200);
            }, 500);
        }

        // Attach checkAllCardsPlaced() to all drop events
        document.querySelectorAll(".nested-zone, .zone.NotRelevant").forEach(zone => {
            zone.addEventListener("drop", (e) => {
            setTimeout(() => {
                console.log("Checking all cards placed...");
                checkAllCardsPlaced();
            }, 500); // Ensures it runs after the drop event
        });
            
        });

        function getColorForPriority(priority) {
            switch (priority) {
                case "Primary":
                    return "3px solid #007bff"; // Blue
                case "Secondary":
                    return "3px solid #28a745"; // Green
                case "Critical":
                    return "3px solid #dc3545"; // Red
                case "Influential":
                    return "3px solid #ffcc00"; // Yellow
                default:
                    return "5px solid #ccc"; // Default Gray
            }
        }

        // playbook zone
        function populatePlaybook() {
            const categoryMappings = {
                "Stakeholders": "stakeholders-cards",
                "Objectives": "objectives-cards",
                "Challenges": "challenges-cards",
                "Outcomes": "outcomes-cards",
                "Wildcard": "wildcard-cards"
            };
        
            Object.keys(placedCards).forEach(category => {
                console.log(`category: ${category}`); // Log category keys
                //console.log(`Card: ${card}`); // log priority keys
                if (category === "Not Relevant") return; // Skip "Not Relevant" cards
                
                const playbookList = document.getElementById(categoryMappings[category]);

                if (!playbookList) {
                    console.warn(`Playbook list for ${category} not found.`);
                    return;
                }

            // Clear previous cards in Playbook before adding new ones
            playbookList.innerHTML = "";

            placedCards[category].forEach(card => {
                console.log(`Card for playbook: ${card}`);
                // get the priority from the card
                const priority = card.priority || "No priority assigned";
                // update the card, before adding to the playbook
                card.input = priority;
            // Create a new card container
            const cardWrapper = document.createElement("div");
            cardWrapper.className = `card-wrapper ${category.toLowerCase()}`;

            const cardElement = document.createElement("div");
            cardElement.className = `card ${category.toLowerCase()} playbook-card`;
            cardElement.style.borderLeft = getColorForPriority(priority);
            cardElement.setAttribute("data-priority", priority || "No priority provided"); // Add priority
            cardElement.innerHTML = `<strong>${card.title}</strong>`;

            // Add dropdown only for Outcomes cards
            if (category === "Outcomes") {
                const measurementDropdown = document.createElement("select");
                measurementDropdown.className = "measurement-dropdown";
                measurementDropdown.innerHTML = `
                    <option value="">Select measurement method</option>
                    <option value="analytics">Analytics</option>
                    <option value="surveys">Surveys</option>
                    <option value="interviews">Interviews</option>
                    <option value="user-feedback">User Feedback</option>
                    <option value="A/B-testing">A/B Testing</option>
                    <option value="financial-metrics">Financial Metrics</option>
                    <option value="performance-reports">Performance Reports</option>
                `;

                // Append both card and dropdown into a wrapper
                cardWrapper.appendChild(cardElement);
                cardWrapper.appendChild(measurementDropdown);
                playbookList.appendChild(cardWrapper);
            } else {
                // Normal behavior for other categories
                playbookList.appendChild(cardElement);
        }

    console.log("Created card:", card.title);
    attachInputListeners();
});
    // Add a text input field for user reflections (EXCLUDE "Outcomes")
    if (category !== "Outcomes") {
        const textBox = document.createElement("textarea");
        textBox.className = "comment-box";
        //textBox.placeholder = `Your thoughts on ${category.toLowerCase()}...`;
        playbookList.appendChild(textBox);
    }
    });
    // Show Playbook
    document.getElementById("playbook-section").style.display = "block";
        setTimeout(() => {
            document.getElementById("playbook-section").style.opacity = "1";
            
            console.log("called playbookPopulater");
        }, 200);
    }

    // finalisation zone and minumum word count 
    document.addEventListener("DOMContentLoaded", () => {
    const textAreas = document.querySelectorAll("#playbook-section textarea");
    const proceedButton = document.getElementById("proceed-to-finalization");
    const finalizationSection = document.getElementById("finalization-section");
    const playbookSection = document.getElementById("playbook-section");

    // Function to check if all inputs meet the word count requirement
    function checkInputs() {
        let allValid = true;

        textAreas.forEach((textarea) => {
            const wordCount = countWords(textarea.value);
            if (wordCount < minWordCount) {
                allValid = false;
            }
        });

        // Show or hide the proceed button
        proceedButton.style.display = allValid ? "block" : "none";
    }

    // Add event listeners to text areas for input validation
    textAreas.forEach((textarea) => {
        textarea.addEventListener("input", checkInputs);
    });

    // Handle click event on the proceed button
    proceedButton.addEventListener("click", () => {
        // Hide playbook section and show finalization section
        playbookSection.style.display = "none";
        finalizationSection.style.display = "block";
    });

    // Handle the final submit button click
    document.getElementById("submit-scenario").addEventListener("click", () => {
        const scenarioDescription = document.getElementById("scenario-description").value.trim();

        if (scenarioDescription.length === 0) {
            alert("Please describe the scenario before submitting.");
            return;
        }

        // Placeholder for further processing of the data
        alert("Scenario submitted successfully!");
        console.log("Scenario Description:", scenarioDescription);

        // Optionally redirect or perform further actions
    });
});

function checkInputs() {
    const textAreas = document.querySelectorAll("#playbook-section textarea");
    let allValid = true;

    textAreas.forEach((textarea) => {
        const wordCount = countWords(textarea.value);
        if (wordCount < minWordCount) {
            allValid = false;
        }
    });

    document.getElementById("proceed-to-finalization").style.display = allValid ? "block" : "none";
}

// Re-attach listeners when playbook updates
function attachInputListeners() {
    const textAreas = document.querySelectorAll("#playbook-section textarea");
    textAreas.forEach((textarea) => {
        textarea.addEventListener("input", checkInputs);
    });
}
// gpt integration

const businessCaseData = {
    stakeholders: [],
    objectives: [],
    challenges: [],
    outcomes: [],
    finalization: ""
};

function collectPlaybookData() {

    // adding in data to accommodate priority/ classification
    businessCaseData.stakeholders = [];
    businessCaseData.objectives = [];
    businessCaseData.challenges = [];
    businessCaseData.outcomes = [];

    document.querySelectorAll("#stakeholders-cards .card").forEach(card => {
        const priority = card.getAttribute("data-priority") || "No priority provided"; // Capture priority
        businessCaseData.stakeholders.push({ 
            title: card.textContent.trim(), 
            input: priority  // 10th feb update to add prioiritization
        });
    });

   // Collect Objectives (with Priority)
    document.querySelectorAll("#objectives-cards .card").forEach(card => {
        const priority = card.getAttribute("data-priority") || "No priority provided";
        businessCaseData.objectives.push({ 
            title: card.textContent.trim(), 
            input: priority  // 10th feb update to add prioiritization
        });
    });

    // Collect Challenges (with Classification)
    document.querySelectorAll("#challenges-cards .card").forEach(card => {
        const classification = card.getAttribute("data-priority") || "No classification provided";
        businessCaseData.challenges.push({ 
            title: card.textContent.trim(), 
            input: classification  // Correctly use classification instead of undefined priority
        });
    });

    // Collect Outcomes (with Measurement and Classification)
    document.querySelectorAll("#outcomes-cards .card-wrapper").forEach(wrapper => {
        const card = wrapper.querySelector(".card");
        const measurement = wrapper.querySelector(".measurement-dropdown")?.value || "Not specified";
        const classification = card.getAttribute("data-priority") || "No classification provided"; // Optional classification

        businessCaseData.outcomes.push({
            title: card.textContent.trim(),
            measurement: measurement,
            classification: classification // Add classification explicitly
        });
        
    });

    // Collect Finalization Text
    const finalizationInput = document.getElementById("scenario-description")?.value || "";
    businessCaseData.finalization = finalizationInput.trim();

    console.log("Collected Data:", businessCaseData); // Debugging
    console.log("Collected Data for Outcomes:", businessCaseData.outcomes);
}

function constructPrompt(data) {
    return `
Generate a business case based on the following details:

Stakeholders:
${data.stakeholders.map(s => `- ${s.title}: ${s.input}`).join("\n")}

Objectives:
${data.objectives.map(o => `- ${o.title}: ${o.input}`).join("\n")}

Challenges:
${data.challenges.map(c => `- ${c.title}: ${c.input}`).join("\n")}

Outcomes:
${data.outcomes.map(o => `- ${o.title}: ${o.input} (Measured using ${o.measurement})`).join("\n")}

Scenario Description:
${data.finalization}

Format the business case with the following structure:
1. Executive Summary
2. Stakeholder Impact
3. Objectives and Their Importance
4. Challenges and Mitigation Strategies
5. Expected Outcomes and Measurement Methods
6. Conclusion
    
Focus on professionalism and accuracy, expand on missed opportunities and how the use case can drive the organization forward strategically.
The business case should be around 5000 words.
**please only respond with ONLY ONE section at a time.
** Start with the executive summary, and indicate 'Next section: ' at the end.
Only return HTML, not the head metadata. Do not use makrdown, and remove all backticks.
`;
}

function collectPrompt() {
    const playbookData = {
        stakeholders: [],
        objectives: [],
        challenges: [],
        outcomes: [],
        finalization: ""
    };

    // Collect Stakeholders
    const stakeholderCards = document.querySelectorAll("#stakeholders-cards .card");
    stakeholderCards.forEach(card => {
        playbookData.stakeholders.push(card.textContent.trim());
    });

    // Collect Objectives
    const objectiveCards = document.querySelectorAll("#objectives-cards .card");
    objectiveCards.forEach(card => {
        playbookData.objectives.push(card.textContent.trim());
    });

    // Collect Challenges
    const challengeCards = document.querySelectorAll("#challenges-cards .card");
    challengeCards.forEach(card => {
        playbookData.challenges.push(card.textContent.trim());
    });

    // Collect Outcomes
    const outcomeCards = document.querySelectorAll("#outcomes-cards .card-wrapper");
    outcomeCards.forEach(wrapper => {
        const title = wrapper.querySelector(".card strong").textContent.trim();
        const measurement = wrapper.querySelector(".measurement-dropdown").value.trim();
        playbookData.outcomes.push({ title, measurement });
    });

    // Collect Finalization Text
    const finalizationTextarea = document.getElementById("scenario-description");
    if (finalizationTextarea) {
        playbookData.finalization = finalizationTextarea.value.trim();
    }

    const prompt = `
        ### **Scenario Description**  
        ${businessCaseData.finalization || "**No scenario provided**"}  

        ### **Stakeholders & Criticality**  
        ${businessCaseData.stakeholders.length > 0 
            ? businessCaseData.stakeholders.map(s => `- ${s.title} (**Priority: ${s.input}**)`).join("\n") 
            : "**None provided**"}

        ### **Objectives & Priority**  
        ${businessCaseData.objectives.length > 0 
            ? businessCaseData.objectives.map(o => `- ${o.title} (**Priority: ${o.input}**)`).join("\n") 
            : "**None provided**"}

        ### **Challenges & Severity**  
        ${businessCaseData.challenges.length > 0 
            ? businessCaseData.challenges.map(c => `- ${c.title} (**Severity: ${c.input}**)`).join("\n") 
            : "**None provided**"}

        ### **Outcomes & Measurement Methods**  
        ${businessCaseData.outcomes.length > 0 
            ? businessCaseData.outcomes.map(o => `- ${o.title} (**Measurement: ${o.measurement}**, **Classification: ${o.input}**)`).join("\n") 
            : "**None provided**"}

        ---
        ### **Instructions**  
        - Write the section titled **"${section}"**.
        - **Strictly use the provided data.**  
        - **Include prioritization/classification** where applicable.  
        - If a **priority level or classification** is missing, state that explicitly.  
        `;

    return prompt;
}

const testKey = ""

async function fetchBusinessCase() {
    const apiKey = testKey;
    const endpoint = "https://api.openai.com/v1/chat/completions";

    collectPlaybookData(); // Ensure we have the latest data
    console.log("Collected Business Case Data:", businessCaseData);
    let sections = [
        "Executive Summary",
        "Stakeholder Impact",
        "Objectives and Their Importance",
        "Challenges and Mitigation Strategies",
        "Expected Outcomes and Measurement Methods",
        "Conclusion"
    ];

    let fullBusinessCase = ""; 
    const outputDiv = document.getElementById("business-case-output"); 
    outputDiv.innerHTML = "<h2>Generating Business Case...</h2>";

    for (let section of sections) {
        const prompt = `
        You are a business analyst creating a **structured business case** based on the provided data.  
        **DO NOT infer missing information**—use only what is provided. 
        Only return HTML, not the head metadata. Do not use makrdown, and remove all backticks.
        Write an introduction that states the business case is generated by AI and should be reviewed for accuracy.

        ---
        ### **Scenario Description**  
        ${businessCaseData.finalization || "**No scenario provided**"}  

        ### **Stakeholders & Criticality**  
        ${businessCaseData.stakeholders.length > 0 
            ? businessCaseData.stakeholders.map(s => `- ${s.title} (**Priority: ${s.input}**)`).join("\n") 
            : "**None provided**"}

        ### **Objectives & Priority**  
        ${businessCaseData.objectives.length > 0 
            ? businessCaseData.objectives.map(o => `- ${o.title} (**Priority: ${o.input}**)`).join("\n") 
            : "**None provided**"}

        ### **Challenges & Severity**  
        ${businessCaseData.challenges.length > 0 
            ? businessCaseData.challenges.map(c => `- ${c.title} (**Severity: ${c.input}**)`).join("\n") 
            : "**None provided**"}

        ### **Outcomes & Measurement Methods**  
        ${businessCaseData.outcomes.length > 0 
            ? businessCaseData.outcomes.map(o => `- ${o.title} (**Measurement: ${o.measurement}**, **Classification: ${o.input}**)`).join("\n") 
            : "**None provided**"}

        ---
        ### **Instructions**  
        - Write the section titled **"${section}"**.
        - **Strictly use the provided data.**  
        - **Include prioritization/classification** where applicable.  
        - If a **priority level or classification** is missing, state that explicitly.  
        - Do not include an H@ heading for the section title since it is already being displayed in the UI.

        **Begin response below:**  
        `;

        console.log(`Sending Prompt for Section: ${section}\n`, prompt); // Debugging

        const body = {
            model: "gpt-4o",
            messages: [{ "role": "user", "content": prompt }],
            max_tokens: 2048, 
            temperature: 0.2, 
            top_p: 0.8 
        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (!result.choices || !result.choices[0] || !result.choices[0].message) {
                throw new Error("Unexpected API response format.");
            }

            let sectionResponse = result.choices[0].message.content.trim();
            sectionRepsonse = sectionResponse.replace(/```html|```|---/g, "").trim();
            // commenting out to try and override markdown::: fullBusinessCase += `\n### ${section} ###\n${sectionResponse}\n`;
            fullBusinessCase += `
                <div class="business-section">
                    
                    <p>${sectionResponse}</p>
                </div>
            `;
           // <h2>${section}</h2>
            outputDiv.innerHTML = `
                <div class="business-case-container">
                    ${fullBusinessCase}
                </div>
            `;

        } catch (error) {
            console.error("Error fetching business case:", error);
            outputDiv.innerHTML = `<p style="color: red;">Error generating the business case. Please try again.</p>`;
        }
    }

    alert("Business Case Generation Complete!");
}

// wire up submit button to generate business case
document.getElementById("submit-scenario").addEventListener("click", () => {
    //generateBusinessCase();
    fetchBusinessCase();
});

// PDF download
document.getElementById("download-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    // Ensure the business case output section exists before trying to read it
    const contentDiv = document.querySelector(".modal-content"); 

    if (!contentDiv) {
        alert("Error: The business case content is missing. Please generate the report before downloading.");
        return;
    }

    let pdfWidth = 190; // Adjust width for A4 format
    let marginLeft = 10;
    let marginTop = 10;
    let lineHeight = 10;
    let cursorY = marginTop; 

    // Extract text content safely
    let textContent = contentDiv.innerText || contentDiv.textContent || "No content available.";

    let textLines = doc.splitTextToSize(textContent, pdfWidth);

    // Add formatted text line-by-line
    textLines.forEach(line => {
        if (cursorY + lineHeight > 280) { 
            doc.addPage();
            cursorY = marginTop;
        }
        doc.text(line, marginLeft, cursorY);
        cursorY += lineHeight;
    });

    // Ensure the download button appears at the bottom
    cursorY += 10;
    if (cursorY > 280) {
        doc.addPage();
        cursorY = marginTop;
    }
    doc.text("Generated Business Case", marginLeft, cursorY);

    doc.save("Business_Case.pdf");
});

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit-scenario");
    const modal = document.getElementById("business-case-modal");
    const closeModal = document.querySelector(".close-btn");

    // Ensure modal is hidden initially
    modal.style.display = "none";

    // Open Modal on Submission
    submitButton.addEventListener("click", async () => {
        const scenarioDescription = document.getElementById("scenario-description").value.trim();
        if (scenarioDescription.length === 0) {
            alert("Please describe the scenario before submitting.");
            return;
        }

        // Ensure business case is generated before showing modal
        await fetchBusinessCase();

        // Show Modal only after content is ready
        modal.style.display = "flex";
    });

    // Close Modal when clicking the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close Modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Close Modal when pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });
});