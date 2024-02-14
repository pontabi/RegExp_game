import React from "react";
import sanitizeHtml from "sanitize-html";

type Quiz = {
  text: string;
  answer: string;
};

function getReplacedText(text: string, answer: string) {
  try {
    const regex = new RegExp(answer, "g");
    const replacedText = text.replace(regex, "<span>$&</span>");
    return replacedText;
  } catch (error) {
    return text;
  }
}

const parser = new DOMParser();

export default function Quiz() {
  const [quizState, setQuizState] = React.useState<Quiz>({
    text: `電話：03(1234)5678
電話：090-1234-5678
電話：0795(12)3456
電話：04992-1-2345`,
    answer: "",
  });
  const replacedText = getReplacedText(quizState.text, quizState.answer);
  const el = parser.parseFromString(replacedText, "text/html");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuizState((prev) => ({
      ...prev,
      answer: e.target.value,
    }));
  }

  return (
    <div className="my-6 mx-auto max-w-lg">
      <p className="text-4xl flex items-center mb-4">
        <span className="-translate-y-1">/&nbsp;</span>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-xl rounded-sm outline-none p-1 font-mono font-bold text-gray-600 inline-block w-full"
          value={quizState.answer}
          onChange={handleChange}
        />
        <span className="-translate-y-1">&nbsp;/</span>
      </p>
      <pre
        className="bg-white p-8"
        id="displayed-text"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(el.body.innerHTML) }}
      ></pre>
    </div>
  );
}
