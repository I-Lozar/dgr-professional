"use client";

export default function AiBlock({ machine }) {
  
  const AI_DATA = {
    dash: {
      title: "SPARK DASH",
      img: "/images/spark-dash/hero/main.png"
    },
    strike: {
      title: "SPARK STRIKE",
      img: "/images/spark-strike/hero/main.png"
    },
    zero: {
      title: "SPARK ZERO",
      img: "/images/spark-zero/hero/main.png"
    },
    storm: {
      title: "SPARK STORM",
      img: "/images/spark-storm/hero/main.png"
    }
  };

  const data = AI_DATA[machine] || AI_DATA["dash"];

  return (
    <section className="ai-wrap">
      <div className="ai-max">
        <h2 className="ai-title">
          <span className="ai-word">{data.title}</span><br />
          PROFESSIONAL SERIES
        </h2>

        <figure className="ai-hero">
          <img className="ai-phone" src={data.img} alt={data.title} />
        </figure>
      </div>
    </section>
  );
}
