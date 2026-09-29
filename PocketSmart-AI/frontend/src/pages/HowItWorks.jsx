function HowItWorks({ goHome }) {
  const steps = [
    {
      number: "01",
      icon: "💰",
      title: "Enter Your Budget",
      text: "Set your available budget and tell PocketSmart AI about your essential spending needs."
    },
    {
      number: "02",
      icon: "🤖",
      title: "AI Analysis",
      text: "Our AI evaluates your budget, priorities, and requirements to build a practical spending plan."
    },
    {
      number: "03",
      icon: "✨",
      title: "Get Recommendations",
      text: "Receive personalized suggestions, category-wise allocations, and smarter ways to manage your money."
    }
  ];

  return (
    <div
      className="how-it-works-page"
      style={{
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        padding: "70px 30px",
        textAlign: "center",
        background: "#8b3e72"
      }}
    >

      {/* HERO SECTION */}
      <div
        className="how-hero"
        style={{
          maxWidth: "850px",
          margin: "0 auto 65px"
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 18px",
            borderRadius: "30px",
            background: "#E8F1FF",
            color: "#981da3",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "18px"
          }}
        >
          POCKETSMART AI
        </div>

        <h1
          style={{
            margin: "0 0 18px",
            color: "#f3f5fa",
            fontSize: "42px",
            fontWeight: "800",
            letterSpacing: "-1px"
          }}
        >
          How PocketSmart AI Works
        </h1>

        <p
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            color: "#dfb7d9",
            fontSize: "20px",
            lineHeight: "1.8"
          }}
        >
          Plan your finances with clarity and confidence.
          Set your budget, let AI understand your priorities,
          and receive personalized recommendations designed
          around your spending goals.
        </p>
      </div>


      {/* STEPS */}
      <div
        className="steps-grid"
        style={{
          width: "100%",
          maxWidth: "1150px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "28px",
          position: "relative"
        }}
      >

        {steps.map((step, index) => (
          <div
            key={step.number}
            className="step-card"
            style={{
              position: "relative",
              background: "#a378c0",
              border: "1px solid #E2E8F0",
              borderRadius: "22px",
              padding: "34px 28px 32px",
              minHeight: "300px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              boxShadow: "0 12px 35px rgba(190, 122, 179, 0.08)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 20px 45px hsla(293, 64%, 74%, 0.15)";
              e.currentTarget.style.borderColor = "#B8D2F0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 35px rgba(30, 64, 175, 0.08)";
              e.currentTarget.style.borderColor = "#E2E8F0";
            }}
          >

            {/* NUMBER */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "22px",
                fontSize: "13px",
                fontWeight: "800",
                color: "#f6f7fa",
                letterSpacing: "1px"
              }}
            >
              {step.number}
            </div>


            {/* ICON */}
            <div
              style={{
                width: "70px",
                height: "70px",
                marginTop: "18px",
                marginBottom: "22px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #E8F1FF, #DCEBFF)",
                fontSize: "32px",
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.12)"
              }}
            >
              {step.icon}
            </div>


            {/* TITLE */}
            <h2
              style={{
                margin: "0 0 13px",
                color: "#110510",
                fontSize: "21px",
                fontWeight: "800"
              }}
            >
              {step.title}
            </h2>


            {/* DESCRIPTION */}
            <p
              style={{
                margin: "0",
                maxWidth: "290px",
                color: "#faf5fa",
                fontSize: "14px",
                lineHeight: "1.75"
              }}
            >
              {step.text}
            </p>


            {/* BOTTOM ACCENT */}
            <div
              style={{
                width: "45px",
                height: "4px",
                borderRadius: "10px",
                background:
                  "linear-gradient(90deg, #af10af, #b9a4b5)",
                marginTop: "24px"
              }}
            />

          </div>
        ))}
      </div>


      {/* FOOTER */}
      <div
        style={{
          marginTop: "70px",
          textAlign: "center"
        }}
      >
        <h2
          style={{
            margin: "0 0 18px",
            color: "#f5ebf5",
            fontSize: "25px",
            fontWeight: "800"
          }}
        >
          Ready to plan smarter?
        </h2>

        <p
          style={{
            margin: "0 0 22px",
            color: "#eeb8ee",
            fontSize: "14px"
          }}
        >
          Take control of your spending with PocketSmart AI.
        </p>

        <button
          className="start-button"
          onClick={goHome}
          style={{
            border: "none",
            borderRadius: "30px",
            padding: "13px 26px",
            background:
              "linear-gradient(90deg, #be27c4, #ce1ace)",
            color: "#251a1a",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(146, 94, 133, 0.2)"
          }}
        >
          ← Back to Home
        </button>
      </div>

    </div>
  );
}

export default HowItWorks;