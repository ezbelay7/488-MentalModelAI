import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "", // Insert API key from Final Report Here
});

export default async function handler(req, res) {
    try {
        const { question } = req.body;
        let problem = question;

        const data = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `
            
            here is my problem:
            ${problem}

            Mental models are frameworks or lenses through which we can view complex situations to make better decisions. They help in simplifying and understanding the complexities of the world.
            i have a list of groups, and each group has a list of mental models:
            index 0 - core (
                The Map is Not the Territory, 
                Circle of Competence, 
                First Principles Thinking, 
                Thought Experiment, 
                Second-Order Thinking, 
                Probabilistic Thinking, 
                Inversion, 
                Occam’s Razor, 
                Hanlon’s Razor
            )
            index 1 - Physics and Chemistry (
                Relativity, 
                Reciprocity, 
                Thermodynamics, 
                Inertia, 
                Friction and Viscosity, 
                Velocity, 
                Leverage, 
                Activation Energy, 
                Catalysts, 
                Alloying
            )
            index 2 - Biology (
                Evolution Part One: Natural Selection and Extinction, 
                Evolution Part Two:  Adaptation and The Red Queen Effect
                Ecosystems, 
                Niches, 
                Self-Preservation
                Replication
                Cooperation
                Hierarchical Organization
                Incentives
                Tendency to Minimize Energy Output (Mental and physical)
            )
            index 3 - Systems Thinking (
                Feedback Loops
                Equilibrium
                Bottlenecks
                Scale
                Margin of Safety
                Churn
                Algorithms
                Critical mass
                Emergence
                Irreducibility
                Law of Diminishing Returns
            )
            index 4 - Numeracy (
                Distributions
                Compounding
                Sampling
                Randomness
                Regression to the Mean
                Multiplying by Zero
                Equivalence
                Surface Area
                Global and Local Maxima
            )
            index 5 - Microeconomics (
                Opportunity Costs
                Creative Destruction
                Comparative Advantage
                Specialization (Pin Factory)
                Seizing the Middle
                (Trademarks, Patents, and Copyrights)
                Double-Entry Bookkeeping
                (Utility (Marginal, Diminishing, Increasing))
                Bribery
                Arbitrage
                Supply and Demand
                Scarcity
                Mr. Market
            )
            index 6 - Military and War (
                Seeing the Front
                Asymmetric Warfare
                Two-Front War
                Counterinsurgency
                Mutually Assured Destruction
            )
            index 7 - Human Nature and Judgment (
                Trust, 
                Bias from Incentives, 
                Pavlovian Association, 
                Tendency to Feel Envy & Jealousy, 
                (Tendency to Distort Due to Liking/Loving or Disliking/Hating), 
                Denial, 
                Availability Heuristic, 
                Representativeness Heuristic, 
                Social Proof (Safety in Numbers), 
                Narrative Instinct, 
                Curiosity Instinct, 
                Language Instinct, 
                First-Conclusion Bias,  
                Tendency to Overgeneralize from Small Samples, 
                Relative Satisfaction/Misery Tendencies, 
                Commitment & Consistency Bias, 
                Hindsight Bias, 
                Sensitivity to Fairness, 
                (Tendency to Overestimate Consistency of Behavior (Fundamental Attribution Error)), 
                Influence of Stress (Including Breaking Points(), 
                Survivorship Bias, 
                (Tendency to Want to Do Something (Fight/Flight, Intervention, Demonstration of Value, etc.)),
                Falsification / Confirmation Bias
            )

            Based on the problem i have (${problem}), CHOOSE JUST 3 groups to recommend, and 3 models for each group.
            For each model, write a reason why i should consult that model based on this problem (${problem}). make sure to reference the problem in the reason.

            format it in array like this
            for group_name, write the group name
            for models, fill with list of models, and for each, title is just the name of the model

            
            [
                {
                    group_name: '',
                    index: 0,
                    models: [
                        {
                            title: '',
                            index: 1,
                            reasons: [""]
                        },
                        
                    ]
                },
            ]

            return just a json list, just the array, dont write anything else but the code.
            for example, just return:

            [
                // array code inside
            ]


            `,
                },
            ],
            model: "gpt-3.5-turbo",
        });

        console.log(data);
        console.log(data.choices[0].message.content);
        let jsonResult = JSON.parse(data.choices[0].message.content);
        console.log(jsonResult);

        // Send a response with the data
        res.status(200).json({
            result: jsonResult,
        });
    } catch (error) {
        // Handle any errors that occur during the asynchronous operation
        res.status(500).json({ error: "An error occurred" });
    }
}
