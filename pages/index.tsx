import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { mentalModels } from "./../lib/mental-models.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showNoun, setShowNoun] = useState(false);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<any>(null);
  const [chosenGroupIndex, setChosenGroupIndex] = useState(0);

  return (
    <>
      <Head>
        <title>MentalModel AI</title>
        <meta name="description" content="Mental Model AI Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-24 text-white bg-black">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">MentalModel AI</h1>
          <p className="text-md max-w-xl mx-auto">
            Mental models are frameworks for thinking. They simplify complex situations, allowing you to reason through them and make better decisions. MentalModel AI helps you apply these powerful models to everyday problems and decisions.
          </p>
          <br></br>
          <p className="text-md max-w-xl mx-auto">
            For more information, please visit <a href="https://fs.blog/mental-models/#general_thinking_concepts" className="text-blue-500">Farnam Street Blog</a>.
          </p>
        </header>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white mb-2">Decision Assistance</h2>
          <p className="text-sm text-gray-300 mb-4">
            Please describe a situation where you need to make a decision. Our AI will help identify relevant mental model categories for you to consider.
          </p>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <textarea
              rows={5}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              className="text-black w-1/2 mx-auto"
              placeholder="Describe your situation here..."
            ></textarea>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button
              onClick={async () => {
                setLoading(true);
                const response = await fetch("/api/example", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ question: question }),
                });
                let resultJson = await response.json();
                console.log(resultJson.result);
                setResult(resultJson.result);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
            >
              Click here to find out which mental models are relevant to your situation! 
            </button>
          </div>
        </div>
        
        <div className="p-8 border-2 rounded-md">
          {loading ? (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          ) : (
            <div>
              {result ? (
                <div className="bg-gray-800 p-4 rounded-md">
                  <h3 className="text-lg text-white mb-4"><strong><span style={{ fontSize: "2rem" }}>Decision Assistance Results</span></strong></h3>
                  {result.length > 0 ? (
                    result.map((group: any, index: number) => (
                      <div key={index} className="mb-4">
                        <h4 className="text-md text-white font-semibold">{group.group_name}</h4>
                        <p className="text-sm text-gray-300">Group Index: {group.index}</p>
                        <p className="text-sm text-gray-300">Suggestions: {group.models.length}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-300">No results found for the given query.</p>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-300">Your results will appear here.</p>
              )}
            </div>
          )}
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-2">Explore Mental Models</h3>
          <p className="text-sm text-gray-300 mb-4">
            Below are various mental model categories. Explore them to gain insights and perspectives that can aid in your decision-making process.
          </p>
        </div>
        <div className="flex flex-row space-x-4 overflow-x-auto w-full border-2">
          {mentalModels.map((group: any, index: number) => {
            let isRec = false;
            if (result) {
              isRec = result.some((obj: any) => obj.index === index);
            }
            return (
              <div
                key={index}
                className={
                  "p-4 border rounded-md shrink-0 " +
                  (isRec ? "p-4 border rounded-md shrink-0 bg-green-900 " : " ") +
                  (index === chosenGroupIndex ? "border-orange-500 " : "")
                }
                onClick={() => {
                  setChosenGroupIndex(index);
                }}
                style={{ borderColor: index === chosenGroupIndex ? "orange" : undefined, color: index === chosenGroupIndex ? "orange" : undefined }}
              >
                <div>{group.group_name}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col space-y-4">
          {mentalModels[chosenGroupIndex].models.map((model: any, index: number) => {
            let isGroupRec = false;
            if (result) {
              isGroupRec = result.some((obj: any) => obj.index === chosenGroupIndex);
            }
            let isRec = false;
            let reasons = [];
            if (isGroupRec) {
              if (result) {
                let indexOfChosen = result.findIndex((x: any) => x.index === chosenGroupIndex);
                console.log(indexOfChosen);
                let recArray = result[indexOfChosen];
                isRec = recArray.models.some((obj: any) => obj.index === index);
                if (isRec) {
                  let indexOfModel = recArray.models.findIndex((x: any) => x.index === index);
                  reasons = recArray.models[indexOfModel].reasons;
                }
              }
            }
            return (
              <div
                key={index}
                className={
                  isRec
                    ? "p-4 border rounded-md shrink-0 bg-green-900"
                    : "p-4 border rounded-md shrink-0"
                }
              >
                <div>{model.title}</div>
                <div>{model.description}</div>
                <br></br>
                <div className="text-xl bg-gray-800 p-4">
                  {isRec && reasons.join(" --- ")}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
