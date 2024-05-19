import { Inter } from "next/font/google";
import React, { useState, useEffect, use } from "react";
const inter = Inter({ subsets: ["latin"] });
import { Textarea, colors } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { color, m } from "framer-motion";
import { Image } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { Card, CardFooter } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
export default function Home() {
  const [Mood, setMood] = useState<string | null>(null);
  const [Feeling, setFeeling] = useState<{ score: number } | null>(null); // Update the type of Feeling
  const Sentiment = require("sentiment");
  const sentiment = new Sentiment();
  const [BackgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [gradient, setGradient] = useState<string>("");
  const [FROM, setFrom] = useState<string>("");
  const [TO, setTo] = useState<string>("");
  const path = require("path");
  const getColors = require("get-image-colors");
  const [Memos, setMemos] = useState<string[]>([]);
  const [TodaysMemo, setTodaysMemo] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");
  const [Analytics, setAnalytics] = useState(false);
  const [CreatedAnalytics, setCreatedAnalytics] = useState<any[][]>([]);
  let colorStrings;

  const analyzeSentiment = async () => {
    const result = sentiment.analyze(Mood);
    console.log(result.positive);

    if (result.score > 0) {
      alert("You're feeling good today! Keep it up!");
      setFeeling(result.positive[0]);
    } else if (result.score < 0) {
      alert(`You're feeling down today. Remember, it's okay to not be okay.`);
      setFeeling(result.negative[0]);
      console.log(result);
    } else {
      alert("You're feeling neutral today. That's alright!");
      setFeeling(result.neutral[0]);
    }

    setBackgroundImage("https://source.unsplash.com/random/1080x1080/?nature");
  };

  const createAnalytics = () => {
    setAnalytics(true);
    let data = [];
    for (let i = 0; i < Memos.length; i++) {
      const result = sentiment.analyze(Memos[i].split(":")[1]);
      let positive = result.positive;
      while (positive.includes("feeling"))
      {
        positive = String(positive).replace("feeling", "");
      }
      positive = String(positive.replace(",", "")).trim();
      while (positive.includes("  "))
      {
        positive = String(positive).replace("  ", " ");
      }
      while (positive.includes(",,"))
      {
      positive = String(positive).replace(",,", ",");
      }
      positive = positive.charAt(0).toUpperCase() + positive.slice(1);

      data.push([Memos[i].split(":")[0], positive, result.score]);
    }
    isOpen ? onClose() : onOpen();

    setCreatedAnalytics(data);
  }

  const saveMemo = (e: any) => {
    const savedMemos = localStorage.getItem("memos");
    console.log("HELLO ARE YOU WORKING!?!??!!?" + savedMemos);
    if (savedMemos !== null) {
      console.log("Saved memos found.");
      setMemos(JSON.parse(savedMemos));
    } else if (savedMemos === null) {
      setMemos([]);
      console.log("No saved memos found.");
      console.log(Memos);
    } else {
      console.log("No saved memos found.");
    }

    // I need to save the date of the memo as well
    const date = new Date();
    const dateString = date.toDateString();
    e = dateString + ": " + e;
    const newMemos = [...Memos, e];
    console.log(e);
    console.log(newMemos);
    console.log(Memos);
    localStorage.setItem("memos", JSON.stringify(newMemos));
    setMemos(newMemos);
  };

  useEffect(() => {
    const savedMemos = localStorage.getItem("memos");
    console.log("HELLO ARE YOU WORKING!?!??!!?" + savedMemos);
    if (savedMemos !== null) {
      console.log("Saved memos found.");
      setMemos(JSON.parse(savedMemos));
    } else if (savedMemos === null) {
      setMemos([]);
      console.log("No saved memos found.");
      console.log(Memos);
    } else {
      console.log("No saved memos found.");
    }
  }, []);

  useEffect(() => {
    if (BackgroundImage) {
      const options = {
        count: 3,
      };
      getColors(BackgroundImage, options).then((colors: any) => {
        colorStrings = colors.map((color: { hex: () => any }) => color.hex());
        console.log(colorStrings);
        console.log(colorStrings[0]);
        console.log(colorStrings[2]);
        setFrom(colorStrings[1]);
        setTo(colorStrings[2]);
      });
    }
  }, [BackgroundImage]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className} bg-[#F9DEC9]`}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {!Feeling && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Textarea
              label="Moodscape"
              placeholder="How are you feeling today?"
              className="w-96 shadow-xl rounded-xl border-[#F6C5AF] border-2"
              onChange={(e) => setMood(e.target.value)}
            />
            <Button
              color="primary"
              variant="bordered"
              className="border-[#F6C5AF] text-[#5E3023]"
              onClick={analyzeSentiment}
            >
              Submit
            </Button>
          </div>
        )}
        {Feeling && (
          <div className="flex flex-row space-x-5">
            <div className="flex flex-col">
              <div
                style={{
                  backgroundImage: `linear-gradient(to top, ${FROM}, ${TO})`,
                }}
                className={`flex flex-row items-center justify-center space-y-4 space-x-20 h-[512px] w-[1020px] rounded-2xl shadow-lg`}
              >
                <div className="flex flex-row ">
                  <Image
                    isBlurred
                    width={350}
                    height={350}
                    src={BackgroundImage || undefined}
                    alt="Moodscape Image"
                    className="m-2"
                  />
                </div>
                <Textarea
                  label="Moodscape"
                  placeholder="Write about how you are doing today"
                  value={TodaysMemo ?? ""}
                  className="w-96 shadow-xl rounded-xl border-[#F6C5AF] border-2"
                  onChange={(e) => setTodaysMemo(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                {Memos?.map((memo, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-center space-y-5 m-5 overflow-hidden"
                  >
                    <Card isFooterBlurred radius="lg" className="border-none">
                      <Image
                        alt="Memo"
                        className="object-cover bg-[#F9DEC9]"
                        height={100}
                        src="/TransparentMemoIcon.png"
                        width={100}
                        onClick={() => {
                          setTodaysMemo(memo.split(":")[1]);
                        }}
                      />
                      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p
                          onClick={() => {
                            setTodaysMemo(memo.split(":")[1]);
                          }}
                          className="text-tiny text-[#5E3023]/80"
                        >
                          {memo.split(":")[0]}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-5">
              <Tooltip
                placement="right"
                className="bg-[#F9DEC9] text-[#5E3023]"
                content="Help"
              >
                <Button
                  color="primary"
                  isIconOnly
                  variant="bordered"
                  className="border-[#F6C5AF] text-[#5E3023]"
                  onClick={() => {
                    isOpen ? onClose() : onOpen();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </Button>
              </Tooltip>
              <Tooltip
                placement="right"
                className="bg-[#F9DEC9] text-[#5E3023]"
                content="Save"
              >
                <Button
                  color="primary"
                  isIconOnly
                  variant="bordered"
                  className="border-[#F6C5AF] text-[#5E3023]"
                  onClick={() => {
                    saveMemo(TodaysMemo);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </Button>
              </Tooltip>
              <Tooltip
                placement="right"
                className="bg-[#F9DEC9] text-[#5E3023]"
                content="Analytics"
              >
                <Button
                  color="primary"
                  isIconOnly
                  variant="bordered"
                  className="border-[#F6C5AF] text-[#5E3023]"
                  onClick={() => {
                    createAnalytics();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </div>

            <Modal
              backdrop={"blur"}
              isOpen={isOpen}
              onClose={onClose}
              className="bg-[#F9DEC9]"
            >
              {!Analytics && (
                <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-[#5E3023] font-bold">
                      Need help with ideas?
                    </ModalHeader>
                    <ModalBody className="text-[#5E3023]">
                      <p>Write a short story or poem about your day.</p>
                      <p>
                        Describe a moment today when you felt{" "}
                        {Feeling.toString()}.
                      </p>
                      <p>
                        Write a letter to yourself about how you're feeling
                        today.
                      </p>
                      <p>Make a list of your pits and peaks of the day.</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
              )}
              {Analytics && (
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-[#5E3023] font-bold">
                        Analytics
                      </ModalHeader>
                      <ModalBody className="text-[#5E3023]">
                        <Table>
                          <TableHeader>
                            <TableColumn>Memo</TableColumn>
                            <TableColumn>Emotion</TableColumn>
                            <TableColumn>Sentiment Score</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {CreatedAnalytics.map((memo, index) => (
                              <TableRow key={index}>
                                <TableCell>{memo[0]}</TableCell>
                                <TableCell>{memo[1]}</TableCell>
                                <TableCell>{memo[2]}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose} onClick={() => (setAnalytics(false))}>
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              )}
              
            </Modal>
          </div>
        )}
      </div>
    </main>
  );
}
