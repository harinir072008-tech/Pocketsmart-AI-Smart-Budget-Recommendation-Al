import React, { useEffect, useState } from "react";
import HowItWorks from "./pages/HowItWorks";
import History from "./pages/History";
import JewelryRecommendations from "./pages/JewelryRecommendations";
import { getMe, registerUser, loginUser, savePlanner } from "./api";

function App() {
  const [page, setPage] = useState("home");
  const [scenario, setScenario] = useState("");
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("pocketsmart_user")) || null; } catch { return null; } });

  const openPlanner = (type) => {
    setScenario(type);
    setPage("planner");
  };

  const handleAuth = (auth) => {
    localStorage.setItem("pocketsmart_token", auth.token);
    localStorage.setItem("pocketsmart_user", JSON.stringify(auth.user));
    setUser(auth.user);
    setPage("profile");
  };

  const logout = () => {
    localStorage.removeItem("pocketsmart_token");
    localStorage.removeItem("pocketsmart_user");
    setUser(null);
    setPage("home");
  };

  const goHome = () => {
    setPage("home");
    setScenario("");
  };

  return (
    <div style={styles.app}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>

        <div style={styles.logo} onClick={goHome}>
          💰 PocketSmart <span style={styles.ai}>AI</span>
        </div>

        <div style={styles.navLinks}>

          <button
            style={styles.navButton}
            onClick={goHome}
          >
            Home ^_^
          </button>

          <button
            style={styles.navButton}
            onClick={() => openPlanner("Interior")}
          >
            Interior 🏡
          </button>

          <button
            style={styles.navButton}
            onClick={() => openPlanner("Party")}
          >
            Party 🎉
          </button>

          <button
            style={styles.navButton}
            onClick={() => openPlanner("Jewelry")}
          >
            Jewelry 💎
          </button>

          <button
            style={styles.navButton}
            onClick={() => setPage("howitworks")}
          >
            How It Works 👩🏻‍🏫
          </button>

          <button
            style={styles.navButton}
            onClick={() => setPage("history")}
          >
            History 📜
          </button>

          {user ? (
            <button style={styles.signupButton} onClick={() => setPage("profile")}>
              👤 {user.name.split(" ")[0]}
            </button>
          ) : (
            <button style={styles.signupButton} onClick={() => setPage("signup")}>
              Sign in
            </button>
          )}

        </div>
      </nav>


      {/* PAGE */}

      {page === "home" && (
        <HomePage openPlanner={openPlanner} />
      )}

      {page === "planner" && (
        <PlannerPage
          scenario={scenario}
          goHome={goHome}
        />
      )}

      {page === "signup" && (
        <SignUpPage goHome={goHome} onAuth={handleAuth} />
      )}

      {page === "profile" && user && (
        <ProfilePage user={user} onLogout={logout} onHistory={() => setPage("history")} goHome={goHome} />
      )}

      {page === "howitworks" && (
        <HowItWorks goHome={goHome} />
      )}

      {page === "history" && (
        <History goHome={goHome} />
      )}


      {/* FOOTER */}

      <footer style={styles.footer}>
        <h3>💰 PocketSmart AI</h3>

        <p>
          Smart Budget Planning & Personalized Recommendations
        </p>

        <small>
          © 2026 PocketSmart AI
        </small>
      </footer>

    </div>
  );
}


/* =====================================================
   HOME PAGE
===================================================== */

function HomePage({ openPlanner }) {
  return (
    <div>

      {/* HERO */}

      <section style={styles.hero}>

        <div style={styles.heroContent}>

          <div style={styles.badge}>
            🤖 GENERATIVE AI BUDGET ASSISTANT
          </div>

          <h1 style={styles.heroTitle}>
            KNOW YOUR BUDGET. CONTROL YOUR SPENDING
            <br />
            <span style={styles.purple}>
              REACH YOUR GOALS
            </span>
          </h1>

          <p style={styles.heroText}>
            PocketSmart AI transforms everyday financial planning
            into a smarter, more personalized experience. Using
            intelligent AI-driven recommendations, it helps you
            create practical budgets based on your goals,
            priorities, and spending needs.
          </p>

          <button
            style={styles.primaryButton}
            onClick={() => openPlanner("Interior")}
          >
            Start Planning →
          </button>

        </div>

      </section>


      {/* SCENARIOS */}

      <section style={styles.section}>

        <h2 style={styles.sectionTitle}>
          Choose Your Planning Category
        </h2>

        <p style={styles.sectionText}>
          Select a category and create your personalized budget plan.
        </p>

        <div style={styles.cardGrid}>

          <ScenarioCard
            icon="🏡"
            title="Home Interior"
            text="Plan furniture, decoration, lighting and other interior needs."
            button="Plan Interior"
            onClick={() => openPlanner("Interior")}
          />

          <ScenarioCard
            icon="🎉"
            title="Party Budget"
            text="Plan food, venue, decoration and entertainment expenses."
            button="Plan Party"
            onClick={() => openPlanner("Party")}
          />

          <ScenarioCard
            icon="💎"
            title="Jewelry Budget"
            text="Get jewelry suggestions according to your budget and occasion."
            button="Plan Jewelry"
            onClick={() => openPlanner("Jewelry")}
          />

        </div>

      </section>


      {/* MEMBERSHIP */}

      <section style={styles.membershipSection}>

        <h2 style={styles.sectionTitle}>
          Membership Plans
        </h2>

        <p style={styles.sectionText}>
          Choose a plan for your budget planning needs.
        </p>

        <div style={styles.cardGrid}>

          <MembershipCard
            icon="🥈"
            title="Silver"
            price="Free"
            features={[
              "Basic Budget Planner",
              "Interior Planning",
              "Party Planning",
              "Jewelry Planning"
            ]}
          />

          <MembershipCard
            icon="🏆"
            title="Gold"
            price="₹199 / Month"
            features={[
              "Advanced Budget Planner",
              "Personalized Suggestions",
              "Detailed Budget Breakdown",
              "More Recommendations"
            ]}
          />

          <MembershipCard
            icon="💎"
            title="Diamond"
            price="₹399 / Month"
            features={[
              "AI Budget Planning",
              "Personalized Recommendations",
              "Advanced Features",
              "Priority Planning"
            ]}
          />

        </div>

      </section>

    </div>
  );
}


/* =====================================================
   SCENARIO CARD
===================================================== */

function ScenarioCard({
  icon,
  title,
  text,
  button,
  onClick
}) {
  return (
    <div style={styles.card}>

      <div style={styles.cardIcon}>
        {icon}
      </div>

      <h3 style={styles.cardTitle}>
        {title}
      </h3>

      <p style={styles.cardText}>
        {text}
      </p>

      <button
        style={styles.cardButton}
        onClick={onClick}
      >
        {button} →
      </button>

    </div>
  );
}


/* =====================================================
   MEMBERSHIP CARD
===================================================== */

function MembershipCard({
  icon,
  title,
  price,
  features
}) {
  return (
    <div style={styles.membershipCard}>

      <div style={styles.membershipIcon}>
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <h2 style={styles.price}>
        {price}
      </h2>

      <div style={styles.features}>

        {features.map((feature, index) => (
          <p key={index}>
            ✓ {feature}
          </p>
        ))}

      </div>

      <button style={styles.chooseButton}>
        Choose {title}
      </button>

    </div>
  );
}


/* =====================================================
   SIGN IN PAGE
===================================================== */

function SignUpPage({ goHome, onAuth }) {
  const [mode, setMode] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (mode === "register" && password !== confirmPassword) return alert("Passwords do not match.");
    if (!email || !password || (mode === "register" && !name)) return alert("Please fill all required fields.");
    try {
      setLoading(true);
      const auth = mode === "register"
        ? await registerUser({ name, email, password })
        : await loginUser({ email, password });
      onAuth(auth);
    } catch (error) { alert(error.message); }
    finally { setLoading(false); }
  };

  return <main style={styles.signupPage}><div style={styles.signupCard}>
    <div style={styles.signupIcon}>💰</div>
    <h1 style={styles.signupTitle}>{mode === "register" ? "Create Account" : "Welcome Back"}</h1>
    <p style={styles.signupText}>{mode === "register" ? "Create your PocketSmart account to save your plans." : "Sign in to open your personal PocketSmart page."}</p>
    <form onSubmit={submit}>
      {mode === "register" && <><label style={styles.label}>Full Name</label><input value={name} onChange={e=>setName(e.target.value)} style={styles.input} placeholder="Enter your name" /></>}
      <label style={styles.label}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={styles.input} placeholder="Enter your email" />
      <label style={styles.label}>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={styles.input} placeholder="Enter password" />
      {mode === "register" && <><label style={styles.label}>Confirm Password</label><input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} style={styles.input} placeholder="Confirm password" /></>}
      <button type="submit" style={styles.signupSubmit}>{loading ? "Please wait..." : mode === "register" ? "Create Account →" : "Sign In →"}</button>
    </form>
    <button onClick={()=>setMode(mode === "register" ? "login" : "register")} style={styles.backButton}>{mode === "register" ? "Already have an account? Sign in" : "New user? Create account"}</button>
    <button onClick={goHome} style={styles.backButton}>← Back to Home</button>
  </div></main>;
}

function ProfilePage({ user, onLogout, onHistory, goHome }) {
  return <main style={styles.signupPage}><div style={styles.signupCard}>
    <div style={{fontSize:55}}>👤</div><h1 style={styles.signupTitle}>My PocketSmart</h1>
    <p style={styles.signupText}>Welcome, <strong>{user.name}</strong>!</p>
    <div style={{textAlign:"left",background:"#f7f3fa",padding:18,borderRadius:14,margin:"18px 0"}}>
      <p><strong>Name:</strong> {user.name}</p><p><strong>Email:</strong> {user.email}</p>
    </div>
    <button style={styles.signupSubmit} onClick={onHistory}>📜 My Saved Plans</button>
    <button style={styles.backButton} onClick={goHome}>🏠 Home</button>
    <button style={styles.backButton} onClick={onLogout}>Sign Out</button>
  </div></main>;
}

/* =====================================================
   PLANNER PAGE
===================================================== */

function PlannerPage({ scenario, goHome }) {

  const [budget, setBudget] = useState("");
  const [requirements, setRequirements] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");
  const [style, setStyle] = useState("");

  const [rooms, setRooms] = useState([]);
  const [partyNeeds, setPartyNeeds] = useState([]);

  const [showRooms, setShowRooms] = useState(false);
  const [showPartyNeeds, setShowPartyNeeds] = useState(false);

  const [result, setResult] = useState([]);


  /* ROOM OPTIONS */

  const roomOptions = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Dining Room",
    "Bathroom",
    "Extra Room"
  ];


  /* PARTY NEED OPTIONS */

  const partyNeedOptions = [
    "Catering",
    "Decoration",
    "Entertainment",
    "Venue",
    "Photography",
    "Music"
  ];


  /* SELECT ROOM */

  const toggleRoom = (room) => {

    if (rooms.includes(room)) {

      setRooms(
        rooms.filter((item) => item !== room)
      );

    } else {

      setRooms(
        [...rooms, room]
      );

    }
  };


  /* SELECT PARTY NEED */

  const togglePartyNeed = (need) => {

    if (partyNeeds.includes(need)) {

      setPartyNeeds(
        partyNeeds.filter((item) => item !== need)
      );

    } else {

      setPartyNeeds(
        [...partyNeeds, need]
      );

    }
  };


  /* GENERATE PLAN */

  const generatePlan = () => {

    if (budget === "") {
      alert("Please enter your budget.");
      return;
    }

    const amount = Number(budget);

    let plan = [];


    /* INTERIOR */

    if (scenario === "Interior") {

      plan = [
        {
          name: "Furniture",
          percent: 40
        },
        {
          name: "Decoration",
          percent: 25
        },
        {
          name: "Lighting",
          percent: 15
        },
        {
          name: "Storage",
          percent: 10
        },
        {
          name: "Extra",
          percent: 10
        }
      ];

    }


    /* PARTY */

    if (scenario === "Party") {

      plan = [
        {
          name: "Food",
          percent: 40
        },
        {
          name: "Venue",
          percent: 25
        },
        {
          name: "Decoration",
          percent: 15
        },
        {
          name: "Entertainment",
          percent: 10
        },
        {
          name: "Extra",
          percent: 10
        }
      ];

    }


    /* JEWELRY */

    if (scenario === "Jewelry") {

      plan = [
        {
          name: "Main Jewelry",
          percent: 50
        },
        {
          name: "Matching Jewelry",
          percent: 20
        },
        {
          name: "Accessories",
          percent: 15
        },
        {
          name: "Customization",
          percent: 10
        },
        {
          name: "Extra",
          percent: 5
        }
      ];

    }


    const finalPlan = plan.map((item) => {

      return {
        ...item,
        amount:
          amount * item.percent / 100
      };

    });


    setResult(finalPlan);

  };

  const saveCurrentPlan = async () => {
    if (!localStorage.getItem("pocketsmart_token")) {
      alert("Please sign in first. Your saved plans are linked to your account.");
      return;
    }
    try {
      await savePlanner({
        scenario,
        title: `${scenario} Budget Plan`,
        inputs: { budget, requirements, guests, occasion, style, rooms, partyNeeds },
        result
      });
      alert("Plan saved successfully! You can open it from My Saved Plans anytime.");
    } catch (error) { alert(error.message); }
  };


  return (

    <main style={styles.plannerPage}>

      {/* BACK BUTTON */}

      <button
        onClick={goHome}
        style={styles.backHome}
      >
        ← Back to Home
      </button>


      {/* HEADER */}

      <div style={styles.plannerHeader}>

        <div style={styles.plannerIcon}>

          {scenario === "Interior" && "🏡"}

          {scenario === "Party" && "🎉"}

          {scenario === "Jewelry" && "💎"}

        </div>

        <h1 style={styles.plannerTitle}>
          {scenario} Budget Planner
        </h1>

        <p>
          Enter your details and create your budget plan.
        </p>

      </div>


      <div style={styles.plannerGrid}>


        {/* ================================
            FORM
        ================================= */}

        <div style={styles.formCard}>

          <h2>
            Budget Details
          </h2>


          {/* BUDGET */}

          <label style={styles.label}>
            Total Budget (₹)
          </label>

          <input
            type="number"
            placeholder="Example: 50000"
            value={budget}
            onChange={(event) =>
              setBudget(event.target.value)
            }
            style={styles.input}
          />


          {/* =================================
              INTERIOR OPTIONS
          ================================= */}

          {scenario === "Interior" && (

            <>

              <h3 style={styles.subHeading}>
                Fixtures & Furniture
              </h3>


              {/* CEILING FANS */}

              <label style={styles.label}>
                Number of Ceiling Fans
              </label>

              <input
                type="number"
                placeholder="Example: 3"
                style={styles.input}
              />


              {/* DINING SETS */}

              <label style={styles.label}>
                Dining Sets
              </label>

              <input
                type="number"
                placeholder="Example: 1"
                style={styles.input}
              />


              {/* ROOMS DROPDOWN */}

              <label style={styles.label}>
                Rooms to Include
              </label>

              <div style={styles.dropdownBox}>

                <button
                  type="button"
                  style={styles.dropdownHeader}
                  onClick={() =>
                    setShowRooms(!showRooms)
                  }
                >

                  <span>
                    {rooms.length === 0
                      ? "Select Rooms"
                      : `${rooms.length} room(s) selected`
                    }
                  </span>

                  <span style={styles.arrow}>
                    {showRooms ? "▲" : "▼"}
                  </span>

                </button>


                {showRooms && (

                  <div style={styles.dropdownOptions}>

                    {roomOptions.map((room) => (

                      <label
                        key={room}
                        style={styles.optionRow}
                      >

                        <input
                          type="checkbox"
                          checked={rooms.includes(room)}
                          onChange={() =>
                            toggleRoom(room)
                          }
                        />

                        <span>
                          {room}
                        </span>

                      </label>

                    ))}

                  </div>

                )}

              </div>

            </>

          )}


          {/* =================================
              PARTY OPTIONS
          ================================= */}

          {scenario === "Party" && (

            <>

              <h3 style={styles.subHeading}>
                Basic Information
              </h3>


              {/* GUESTS */}

              <label style={styles.label}>
                Number of Guests
              </label>

              <input
                type="number"
                placeholder="Example: 50"
                value={guests}
                onChange={(event) =>
                  setGuests(event.target.value)
                }
                style={styles.input}
              />


              {/* PARTY TYPE */}

              <label style={styles.label}>
                Party Type
              </label>

              <select
                style={styles.input}
                defaultValue=""
              >

                <option value="">
                  Select Party Type
                </option>

                <option>
                  Birthday
                </option>

                <option>
                  Wedding
                </option>

                <option>
                  Anniversary
                </option>

                <option>
                  Engagement
                </option>

                <option>
                  Family Function
                </option>

              </select>


              {/* VENUE */}

              <label style={styles.label}>
                Venue Type
              </label>

              <select
                style={styles.input}
                defaultValue=""
              >

                <option value="">
                  Select Venue
                </option>

                <option>
                  Home
                </option>

                <option>
                  Hall
                </option>

                <option>
                  Hotel
                </option>

                <option>
                  Outdoor
                </option>

              </select>


              {/* PARTY NEEDS DROPDOWN */}

              <label style={styles.label}>
                Party Needs
              </label>

              <div style={styles.dropdownBox}>

                <button
                  type="button"
                  style={styles.dropdownHeader}
                  onClick={() =>
                    setShowPartyNeeds(!showPartyNeeds)
                  }
                >

                  <span>
                    {partyNeeds.length === 0
                      ? "Select Party Needs"
                      : `${partyNeeds.length} option(s) selected`
                    }
                  </span>

                  <span style={styles.arrow}>
                    {showPartyNeeds ? "▲" : "▼"}
                  </span>

                </button>


                {showPartyNeeds && (

                  <div style={styles.dropdownOptions}>

                    {partyNeedOptions.map((need) => (

                      <label
                        key={need}
                        style={styles.optionRow}
                      >

                        <input
                          type="checkbox"
                          checked={partyNeeds.includes(need)}
                          onChange={() =>
                            togglePartyNeed(need)
                          }
                        />

                        <span>
                          {need}
                        </span>

                      </label>

                    ))}

                  </div>

                )}

              </div>

            </>

          )}


          {/* =================================
              JEWELRY OPTIONS
          ================================= */}

          {scenario === "Jewelry" && (

            <>

              <h3 style={styles.subHeading}>
                Occasion & Preferences
              </h3>


              <label style={styles.label}>
                Occasion
              </label>

              <select
                value={occasion}
                onChange={(event) =>
                  setOccasion(event.target.value)
                }
                style={styles.input}
              >

                <option value="">
                  Select Occasion
                </option>

                <option>
                  Birthday
                </option>

                <option>
                  Wedding
                </option>

                <option>
                  Party
                </option>

                <option>
                  Festival
                </option>

                <option>
                  Engagement
                </option>

              </select>


              <label style={styles.label}>
                Style Preferences
              </label>

              <textarea
                placeholder="Describe your style preferences, materials, colors, etc."
                value={style}
                onChange={(event) =>
                  setStyle(event.target.value)
                }
                style={styles.textarea}
              />


              <label style={styles.label}>
                Upload Outfit Image
              </label>

              <input
                type="file"
                accept="image/*"
                style={styles.fileInput}
              />

            </>

          )}


          {/* ADDITIONAL INFORMATION */}

          <label style={styles.label}>
            Additional Information
          </label>

          <textarea
            placeholder="Special requirements or preferences..."
            value={requirements}
            onChange={(event) =>
              setRequirements(event.target.value)
            }
            style={styles.textarea}
          />


          {/* GENERATE BUTTON */}

          <button
            onClick={generatePlan}
            style={styles.generateButton}
          >
            🤖 Generate Recommendations
          </button>

          <button onClick={saveCurrentPlan} style={{...styles.generateButton, background:"#111827", marginTop:10}}>
            💾 Save {result.length > 0 ? "This Plan" : "My Details"}
          </button>

        </div>


        {/* =================================
            RESULT
        ================================= */}

        <div style={styles.resultCard}>

          <h2>
            🤖 AI Recommendation
          </h2>


          {result.length === 0 ? (

            <div style={styles.emptyResult}>

              <div style={styles.emptyIcon}>
                💡
              </div>

              <h3>
                Your budget plan will appear here.
              </h3>

              <p>
                Enter your budget and click
                "Generate Recommendations".
              </p>

            </div>

          ) : (

            <div>

              <h3>
                Suggested Budget Allocation
              </h3>

              <p>
                Total Budget: ₹
                {Number(budget).toLocaleString("en-IN")}
              </p>


              {result.map((item, index) => (

                <div
                  key={index}
                  style={styles.resultItem}
                >

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <p style={styles.smallText}>
                      {item.percent}% of budget
                    </p>

                  </div>

                  <strong>
                    ₹
                    {Math.round(
                      item.amount
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

              ))}


              <div style={styles.advice}>

                <h3>
                  💡 Recommendation
                </h3>

                <p>
                  Keep your spending within the
                  planned budget and reserve some
                  amount for unexpected expenses.
                </p>


                {rooms.length > 0 && (

                  <p>
                    <strong>
                      Rooms:
                    </strong>{" "}
                    {rooms.join(", ")}
                  </p>

                )}


                {partyNeeds.length > 0 && (

                  <p>
                    <strong>
                      Party Needs:
                    </strong>{" "}
                    {partyNeeds.join(", ")}
                  </p>

                )}


                {requirements && (

                  <p>
                    <strong>
                      Requirements:
                    </strong>{" "}
                    {requirements}
                  </p>

                )}


                {guests && (

                  <p>
                    <strong>
                      Guests:
                    </strong>{" "}
                    {guests}
                  </p>

                )}


                {occasion && (

                  <p>
                    <strong>
                      Occasion:
                    </strong>{" "}
                    {occasion}
                  </p>

                )}

              </div>

            </div>

          )}

        </div>

      </div>

      {scenario === "Jewelry" && result.length > 0 && (
        <JewelryRecommendations budget={budget} occasion={occasion} style={style} />
      )}

    </main>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {

  app: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    color: "#06070a",
    backgroundColor: "#af4ca2"
  },


  /* NAVBAR */

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 7%",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#da6dd4",
    flexWrap: "wrap",
    gap: "15px"
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  ai: {
    color: "#7c3aed"
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap"
  },

  navButton: {
    border: "none",
    backgroundColor: "rgb(84, 65, 88)",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px"
  },

  signupButton: {
    border: "none",
    backgroundColor: "rgb(227, 149, 233)",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  },


  /* HERO */

  hero: {
    padding: "90px 20px",
    textAlign: "center",
    backgroundColor: "#f5f3ff"
  },

  heroContent: {
    maxWidth: "800px",
    margin: "auto"
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    backgroundColor: "#ede9fe",
    color: "#bd24b0",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "20px"
  },

  heroTitle: {
    fontSize: "50px",
    lineHeight: "1.1",
    margin: "0 0 20px"
  },

  purple: {
    color: "#641737"
  },

  heroText: {
    color: "#110c13",
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "30px"
  },

  primaryButton: {
    border: "none",
    backgroundColor: "#bc72be",
    color: "#ffffff",
    padding: "14px 25px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
  },


  /* SECTIONS */

  section: {
    padding: "70px 7%",
    textAlign: "center"
  },

  sectionTitle: {
    fontSize: "32px",
    marginBottom: "10px"
  },

  sectionText: {
    color: "#0f050d",
    marginBottom: "40px"
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    maxWidth: "1100px",
    margin: "auto"
  },


  /* SCENARIO CARD */

  card: {
    padding: "30px",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    textAlign: "left",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.05)"
  },

  cardIcon: {
    fontSize: "45px",
    marginBottom: "15px"
  },

  cardTitle: {
    fontSize: "21px"
  },

  cardText: {
    color: "#18191b",
    lineHeight: "1.6",
    minHeight: "70px"
  },

  cardButton: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ac2d9b",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold"
  },


  /* MEMBERSHIP */

  membershipSection: {
    padding: "70px 7%",
    textAlign: "center",
    backgroundColor: "#f9fafb"
  },

  membershipCard: {
    padding: "30px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px"
  },

  membershipIcon: {
    fontSize: "45px"
  },

  price: {
    color: "#c978b7"
  },

  features: {
    textAlign: "left",
    color: "#13171b",
    lineHeight: "1.8"
  },

  chooseButton: {
    width: "100%",
    padding: "12px",
    border: "1px solid #111827",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold"
  },


  /* SIGN UP */

  signupPage: {
    minHeight: "650px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: "40px 20px"
  },

  signupCard: {
    width: "100%",
    maxWidth: "430px",
    padding: "35px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 5px 25px rgba(0,0,0,0.08)"
  },

  signupIcon: {
    textAlign: "center",
    fontSize: "45px"
  },

  signupTitle: {
    textAlign: "center"
  },

  signupText: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "25px"
  },

  label: {
    display: "block",
    marginTop: "15px",
    marginBottom: "7px",
    fontWeight: "600"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px"
  },

  textarea: {
    width: "100%",
    minHeight: "110px",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "20px",
    resize: "vertical"
  },

  signupSubmit: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: "#b413b4",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "20px"
  },

  backButton: {
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: "#6b7280"
  },


  /* PLANNER */

  plannerPage: {
    minHeight: "700px",
    padding: "40px 7%",
    backgroundColor: "#f9fafb"
  },

  backHome: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "25px"
  },

  plannerHeader: {
    textAlign: "center",
    marginBottom: "40px"
  },

  plannerIcon: {
    fontSize: "50px"
  },

  plannerTitle: {
    fontSize: "35px",
    margin: "10px 0"
  },

  plannerGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
    margin: "auto"
  },

  formCard: {
    backgroundColor: "#ecb0e9",
    padding: "30px",
    borderRadius: "18px",
    border: "1px solid #e5e7eb"
  },

  resultCard: {
    backgroundColor: "#fdf9f9",
    padding: "30px",
    borderRadius: "18px",
    border: "1px solid #e5e7eb"
  },

  formSectionTitle: {
    marginTop: "25px",
    marginBottom: "10px",
    fontSize: "25px",
    color: "#4c1d4f"
  },


  /* =====================================================
     ROOM SCROLL RACK
  ===================================================== */

  roomSelector: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    width: "100%",
    marginTop: "8px",
    marginBottom: "20px"
  },

  roomScroll: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    flex: 1,
    padding: "5px 2px",
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  },

  roomOption: {
    minWidth: "135px",
    padding: "12px 14px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "500",
    whiteSpace: "nowrap",
    flexShrink: 0
  },

  roomOptionSelected: {
    backgroundColor: "#f1d5f3",
    border: "2px solid #b413b4",
    fontWeight: "bold"
  },

  scrollArrow: {
    width: "36px",
    height: "40px",
    flexShrink: 0,
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#b413b4",
    color: "#ffffff",
    fontSize: "28px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },


  /* PARTY NEEDS */

  partyNeeds: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
    marginBottom: "15px"
  },

  partyNeed: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "11px 14px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "24px"
  },

  partyNeedSelected: {
    backgroundColor: "#f1d5f3",
    border: "2px solid #b413b4",
    fontWeight: "bold"
  },


  /* BUTTON */

  generateButton: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: "#b413b4",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "20px"
  },


  /* RESULT */

  emptyResult: {
    textAlign: "center",
    padding: "50px 20px",
    color: "#6b7280"
  },

  emptyIcon: {
    fontSize: "50px"
  },

  resultItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #e5e7eb"
  },

  smallText: {
    margin: "5px 0 0",
    color: "#6b7280",
    fontSize: "16px"
  },

  advice: {
    marginTop: "25px",
    padding: "18px",
    borderRadius: "10px",
    backgroundColor: "#f5f3ff",
    lineHeight: "1.6"
  },


  /* FOOTER */

  footer: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#111827",
    color: "#ffffff"
  }

};


export default App;