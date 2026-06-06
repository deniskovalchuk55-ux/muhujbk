Онлайн • відповідає миттєво
            </div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:"12px" }}>
          {messages.map((msg,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:msg.role==="user"?"flex-end":"flex-start", gap:"8px", alignItems:"flex-end", animation:"fadeUp 0.25s ease" }}>
              {msg.role==="assistant"&&<div style={{ width:"28px", height:"28px", borderRadius:"10px", background:"linear-gradient(135deg,#ff8c00,#ff6b00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", flexShrink:0 }}>🤖</div>}
              <div style={{ maxWidth:"80%", padding:"12px 16px", borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", background:msg.role==="user"?"linear-gradient(135deg,#ff8c00,#ff6b00)":"rgba(255,255,255,0.06)", color:"#fff", fontSize:"14px", lineHeight:"1.6", border:msg.role==="assistant"?"1px solid rgba(255,255,255,0.08)":"none", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>{msg.content}</div>
            </div>
          ))}
          {loading&&(
            <div style={{ display:"flex", gap:"8px", alignItems:"flex-end" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"10px", background:"linear-gradient(135deg,#ff8c00,#ff6b00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px" }}>🤖</div>
              <div style={{ padding:"14px 18px", borderRadius:"18px 18px 18px 4px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", gap:"5px", alignItems:"center" }}>
                {[0,1,2].map(i=><span key={i} style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#ff8c00", animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`, display:"inline-block" }}/>)}
              </div>
            </div>
          )}
          {messages.length===1&&!loading&&(
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginTop:"8px" }}>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px", paddingLeft:"4px" }}>Популярні питання</div>
              {SUGGESTIONS.map((s,i)=><button key={i} onClick={()=>sendMessage(s)} style={{ background:"rgba(255,140,0,0.08)", border:"1px solid rgba(255,140,0,0.2)", borderRadius:"12px", padding:"10px 14px", color:"#ff8c00", fontSize:"13px", fontWeight:500, cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>{s}</button>)}
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
        <div style={{ padding:"16px", borderTop:"1px solid rgba(255,255,255,0.06)", background:"#111", display:"flex", gap:"10px", alignItems:"flex-end" }}>
          <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder="Напишіть питання..." rows={1}
            style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"14px", padding:"12px 16px", color:"#fff", fontSize:"14px", fontFamily:"inherit", resize:"none", outline:"none", lineHeight:"1.5" }}/>
          <button onClick={()=>sendMessage()} disabled={!input.trim()||loading}
            style={{ width:"44px", height:"44px", borderRadius:"14px", background:input.trim()&&!loading?"linear-gradient(135deg,#ff8c00,#ff6b00)":"rgba(255,255,255,0.06)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0 }}>➤</button>
        </div>
      </div>
    </div>
  );
}
