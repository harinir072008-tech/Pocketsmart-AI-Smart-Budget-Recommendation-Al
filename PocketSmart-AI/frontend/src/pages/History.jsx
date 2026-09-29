import React, { useEffect, useState } from "react";
import { getSavedPlanners, deleteSavedPlanner } from "../api";

export default function History({ goHome }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setPlans(await getSavedPlanners()); }
    catch (error) { alert(error.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this saved plan?")) return;
    try { await deleteSavedPlanner(id); setPlans(plans.filter(p => p.id !== id)); }
    catch (error) { alert(error.message); }
  };

  return <div style={{minHeight:"100vh",background:"#8b3e72",padding:"45px 20px 60px"}}>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{background:"#211521",color:"white",borderRadius:18,padding:"30px 28px",marginBottom:28}}>
        <h1 style={{margin:"0 0 8px"}}>📜 My Saved Plans</h1>
        <p style={{margin:0}}>Your saved PocketSmart plans stay connected to your account so you can check them another day.</p>
      </div>

      {loading ? <div style={{background:"white",padding:30,borderRadius:15}}>Loading your saved plans...</div> : plans.length === 0 ? (
        <div style={{background:"white",padding:40,borderRadius:15,textAlign:"center"}}><div style={{fontSize:50}}>💾</div><h2>No saved plans yet</h2><p>Generate a Home Interior, Party, or Jewellery plan and press “Save This Plan”.</p></div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
          {plans.map(plan => <div key={plan.id} style={{background:"#f8def5",borderRadius:15,padding:20,boxShadow:"0 5px 16px rgba(0,0,0,.1)"}}>
            <div style={{fontSize:28}}>{plan.scenario === "Jewelry" ? "💎" : plan.scenario === "Party" ? "🎉" : "🏡"}</div>
            <h3>{plan.title}</h3>
            <small>{new Date(plan.created_at).toLocaleString()}</small>
            <div style={{margin:"15px 0",background:"white",borderRadius:12,padding:14}}>
              <strong>Budget: ₹{Number(plan.inputs?.budget || 0).toLocaleString("en-IN")}</strong>
              {plan.inputs?.occasion && <p>Occasion: {plan.inputs.occasion}</p>}
              {plan.inputs?.guests && <p>Guests: {plan.inputs.guests}</p>}
              {plan.inputs?.rooms?.length > 0 && <p>Rooms: {plan.inputs.rooms.join(", ")}</p>}
              {plan.inputs?.partyNeeds?.length > 0 && <p>Needs: {plan.inputs.partyNeeds.join(", ")}</p>}
            </div>
            {plan.result?.map((item,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #eee"}}><span>{item.name}</span><strong>₹{Math.round(item.amount).toLocaleString("en-IN")}</strong></div>)}
            <button onClick={()=>remove(plan.id)} style={{marginTop:16,width:"100%",padding:10,border:0,borderRadius:8,background:"#8b2f72",color:"white",fontWeight:700}}>Delete Plan</button>
          </div>)}
        </div>
      )}

      <div style={{textAlign:"center",marginTop:35}}><button onClick={goHome} style={{padding:"12px 25px",border:0,borderRadius:8,background:"#b46eab",color:"white",fontWeight:700}}>← Back to Home</button></div>
    </div>
  </div>;
}
