(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const $={name:"APX Manager",company:"Apex Prime X",version:"1.0.0",environment:"Local",storageKeys:{appState:"apx-manager:app-state",authUsers:"apx-manager:auth-users",authSession:"apx-manager:auth-session",authRecovery:"apx-manager:auth-recovery",theme:"apx-manager:theme"}},Z=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),Pt=e=>(e==null?void 0:e.mode)==="demo"?"Visitante APX":(e==null?void 0:e.email)==="admin@apx.com"?"Admin APX":(e==null?void 0:e.name)??"Usuario APX",Ua=(e="")=>e.trim().split(/\s+/).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"AP",Za=e=>e==="dark"?`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      </svg>
    `:`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
      </svg>
    `,Ga=`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    <path d="M10 21h4" />
  </svg>
`,Ka=e=>{var t;return(t=e==null?void 0:e.items)!=null&&t.length?e.items.map(a=>`
        <article class="notification-item notification-item--${Z(a.tone)}">
          <span class="notification-item__indicator">${Z(a.count)}</span>
          <div>
            <strong>${Z(a.label)}</strong>
            <span>${Z(a.detail)}</span>
          </div>
        </article>
      `).join(""):`
      <div class="notifications-empty">
        <strong>No hay notificaciones pendientes.</strong>
      </div>
    `},Xa=({isSidebarOpen:e=!1,session:t=null,isUserMenuOpen:a=!1,isNotificationsOpen:s=!1,theme:r="light",notifications:o={total:0,items:[]}}={})=>`
  <header class="app-header">
    <button
      class="sidebar-toggle"
      type="button"
      data-sidebar-toggle
      aria-label="${e?"Cerrar menu":"Abrir menu"}"
      aria-expanded="${e?"true":"false"}"
    >
      <span aria-hidden="true">&#9776;</span>
    </button>

    <div class="app-brand" aria-label="${$.name}">
      <span class="app-brand__logo">APX</span>
      <div class="app-brand__text">
        <p class="app-brand__name">${$.name}</p>
        <p class="app-brand__company">${$.company}</p>
      </div>
    </div>

    ${(t==null?void 0:t.mode)==="demo"?'<span class="demo-mode-badge">Modo demo</span>':""}

    <div class="app-header__actions">
      ${t?`
            <div class="notifications-menu${s?" notifications-menu--open":""}">
              <button
                class="notifications-menu__button"
                type="button"
                data-notifications-toggle
                aria-label="Abrir notificaciones"
                aria-expanded="${s?"true":"false"}"
              >
                ${Ga}
                ${o.total>0?`<span class="notifications-menu__badge">${Z(o.total)}</span>`:""}
              </button>

              <div class="notifications-menu__dropdown" role="menu" aria-label="Notificaciones del sistema">
                <div class="notifications-menu__header">
                  <strong>Notificaciones</strong>
                  <span>${Z(o.total)} alerta${o.total===1?"":"s"}</span>
                </div>
                <div class="notifications-menu__list">
                  ${Ka(o)}
                </div>
              </div>
            </div>

            <button
              class="theme-toggle"
              type="button"
              data-theme-toggle
              aria-label="${r==="dark"?"Cambiar a modo claro":"Cambiar a modo oscuro"}"
              title="${r==="dark"?"Modo claro":"Modo oscuro"}"
            >
              ${Za(r)}
            </button>

            <div class="user-menu${a?" user-menu--open":""}">
              <button
                class="user-menu__avatar"
                type="button"
                data-user-menu-toggle
                aria-label="Abrir menu de usuario"
                aria-expanded="${a?"true":"false"}"
              >
                ${Z(Ua(Pt(t)))}
              </button>

              <div class="user-menu__dropdown" role="menu" aria-label="Menu de usuario">
                <div class="user-menu__details">
                  <p><span>Usuario</span><strong>${Z(Pt(t))}</strong></p>
                  <p><span>Correo</span><strong>${Z(t.email)}</strong></p>
                  <p><span>Rol</span><strong>${Z(t.role??"Administrador")}</strong></p>
                  ${t.mode==="demo"?"<p><span>Modo</span><strong>Solo lectura</strong></p>":""}
                </div>
                <div class="user-menu__dev-tools" aria-label="Herramientas de desarrollo">
                  <span>Datos demo</span>
                  <button type="button" data-seed-load>Cargar datos demo</button>
                  <button type="button" data-seed-clear>Limpiar datos demo</button>
                </div>
                <button class="user-menu__logout" type="button" data-auth-logout role="menuitem">
                  Cerrar sesión
                </button>
              </div>
            </div>
          `:""}
    </div>
  </header>
`,Et=[{key:"dashboard",label:"Dashboard",description:"Vista general de indicadores operativos y financieros."},{key:"sales",label:"Ventas",description:"Gestión de ventas, ingresos y seguimiento comercial."},{key:"expenses",label:"Gastos",description:"Control de egresos, categorías y flujo operativo."},{key:"customers",label:"Clientes",description:"Administración de clientes, historial y datos de contacto."},{key:"services",label:"Servicios",description:"Catálogo interno de servicios y condiciones operativas."},{key:"orders",label:"Órdenes",description:"Seguimiento de órdenes de trabajo y estados de atención."},{key:"equipment",label:"Equipos",description:"Registro de equipos recibidos, diagnóstico y entrega."},{key:"support",label:"Soporte",description:"Gestión de casos de soporte técnico y prioridades."},{key:"reports",label:"Reportes",description:"Reportes empresariales para análisis y toma de decisiones."}],_a="dashboard",ut={clientes:{key:"clientes",prefix:"CLI"},servicios:{key:"servicios",prefix:"SER"},ventas:{key:"ventas",prefix:"VEN"},gastos:{key:"gastos",prefix:"GAS"},ordenes:{key:"ordenes",prefix:"ORD"},equipos:{key:"equipos",prefix:"EQP"},soporte:{key:"soporte",prefix:"SOP"}},Ya=Object.keys(ut),je=()=>typeof window>"u"||!window.localStorage?null:window.localStorage,mt=(e=je())=>{if(!e)return!1;try{const t="__apx_storage_test__";return e.setItem(t,t),e.removeItem(t),!0}catch{return!1}},Rt=e=>`apx-manager:${e}`,Wa=e=>{if(!e)return[];try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}},kt=e=>{if(!Ya.includes(e))throw new Error(`Coleccion no registrada: ${e}`)},Nt=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("El registro debe ser un objeto valido.");return e},Ja=(e,t)=>{const{prefix:a}=ut[e],s=t.reduce((r,o)=>{if(!(o!=null&&o.id)||typeof o.id!="string")return r;const[,l]=o.id.split("-"),i=Number(l);return Number.isInteger(i)?Math.max(r,i):r},0)+1;return`${a}-${String(s).padStart(5,"0")}`},Qa=(e=je())=>{const t=()=>{if(!mt(e))throw new Error("LocalStorage no esta disponible.")},a=n=>(kt(n),t(),Wa(e.getItem(Rt(n)))),s=(n,c)=>{if(kt(n),t(),!Array.isArray(c))throw new Error("saveAll requiere un arreglo de registros.");return e.setItem(Rt(n),JSON.stringify(c)),c},r=(n,c)=>a(n).find(d=>d.id===c)??null;return{create:(n,c)=>{const d=a(n),u=new Date().toISOString(),b=Nt(c),w={...b,id:b.id??Ja(n,d),createdAt:b.createdAt??u,updatedAt:u};return s(n,[...d,w]),w},read:(n,c)=>r(n,c),update:(n,c,d)=>{const u=a(n),b=Nt(d);let w=null;const k=u.map(j=>j.id!==c?j:(w={...j,...b,id:j.id,updatedAt:new Date().toISOString()},w));return w?(s(n,k),w):null},delete:(n,c)=>{const d=a(n),u=d.filter(b=>b.id!==c);return u.length===d.length?!1:(s(n,u),!0)},findById:r,getAll:a,saveAll:s}},P=Qa(),ze=e=>{const t=je();if(!mt(t))return null;const a=t.getItem(e);if(!a)return null;try{return JSON.parse(a)}catch{return null}},Ve=(e,t)=>{const a=je();mt(a)&&a.setItem(e,JSON.stringify(t))},Ea=e=>{const t=je();mt(t)&&t.removeItem(e)},es=()=>({appName:$.name,version:$.version,environment:$.environment,initializedAt:new Date().toISOString()}),gt=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),qt=()=>new Intl.DateTimeFormat("es-PE",{weekday:"short",day:"2-digit",month:"short",year:"numeric"}).format(new Date),ts=()=>new Date().toISOString().slice(0,10),as=()=>{try{const e=ts(),t=P.getAll("ventas").filter(o=>o.fecha===e),a=P.getAll("gastos").filter(o=>o.fecha===e),s=t.reduce((o,l)=>o+Number(l.montoTotal||0),0),r=a.reduce((o,l)=>o+Number(l.monto||0),0);return{fecha:qt(),ingresosDia:s,gastosDia:r,utilidadDia:s-r}}catch{return{fecha:qt(),ingresosDia:0,gastosDia:0,utilidadDia:0}}},Ot={dashboard:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13h6v7H4v-7Z"></path>
      <path d="M14 4h6v16h-6V4Z"></path>
      <path d="M4 4h6v5H4V4Z"></path>
    </svg>
  `,sales:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h2l2.2 10.5a2 2 0 0 0 2 1.5h6.9a2 2 0 0 0 1.9-1.4L21 9H7"></path>
      <path d="M10 21h.01"></path>
      <path d="M18 21h.01"></path>
    </svg>
  `,expenses:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v12H4V7Z"></path>
      <path d="M16 7V5H6v2"></path>
      <path d="M16 13h4"></path>
    </svg>
  `,customers:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 19a4 4 0 0 0-8 0"></path>
      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
      <path d="M21 19a3 3 0 0 0-4-2.8"></path>
      <path d="M17 6.2a2.5 2.5 0 0 1 0 4.6"></path>
    </svg>
  `,services:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3 2.4-2.4Z"></path>
    </svg>
  `,orders:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8l1 2h3v14H4V6h3l1-2Z"></path>
      <path d="M8 11h8"></path>
      <path d="M8 15h6"></path>
    </svg>
  `,equipment:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v10H5V5Z"></path>
      <path d="M3 19h18"></path>
      <path d="M9 15v4"></path>
      <path d="M15 15v4"></path>
    </svg>
  `,support:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 5.5a4 4 0 0 0 4 4L8.8 19.2a2.1 2.1 0 0 1-3-3L15.5 6.5a4 4 0 0 0-1-1Z"></path>
      <path d="M6 18l-1 1"></path>
    </svg>
  `,reports:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V5"></path>
      <path d="M4 19h16"></path>
      <path d="M8 15l3-3 3 2 5-6"></path>
    </svg>
  `},Ge={date:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"></path>
    </svg>
  `,income:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17 10 11l4 4 6-8"></path>
      <path d="M16 7h4v4"></path>
    </svg>
  `,expense:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v12H4V7Z"></path>
      <path d="M16 7V5H6v2"></path>
      <path d="m9 12 3 3 3-3"></path>
    </svg>
  `,profit:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z"></path>
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8"></path>
      <path d="M20 12c0 2.76-3.58 5-8 5s-8-2.24-8-5"></path>
    </svg>
  `},ss=()=>{const e=as();return`
    <section class="sidebar-summary" aria-label="Resumen rápido">
      <div class="sidebar-summary__header">
        <span>Resumen rápido</span>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--date">
        <span class="sidebar-summary__icon">${Ge.date}</span>
        <div>
          <span>Fecha actual</span>
          <strong>${e.fecha}</strong>
        </div>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--income">
        <span class="sidebar-summary__icon">${Ge.income}</span>
        <div>
          <span>Ingresos del día</span>
          <strong>${gt(e.ingresosDia)}</strong>
        </div>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--expense">
        <span class="sidebar-summary__icon">${Ge.expense}</span>
        <div>
          <span>Gastos del día</span>
          <strong>${gt(e.gastosDia)}</strong>
        </div>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--profit">
        <span class="sidebar-summary__icon">${Ge.profit}</span>
        <div>
          <span>Utilidad del día</span>
          <strong>${gt(e.utilidadDia)}</strong>
        </div>
      </div>
    </section>
  `},rs=e=>`
  <aside class="sidebar" aria-label="Navegacion principal">
    <nav class="sidebar__nav">
      ${Et.map(t=>`
          <button
            class="sidebar__link${t.key===e?" sidebar__link--active":""}"
            type="button"
            data-module-key="${t.key}"
            aria-current="${t.key===e?"page":"false"}"
            aria-label="Abrir ${t.label}"
            title="${t.label}"
          >
            <span class="sidebar__icon">${Ot[t.key]??Ot.dashboard}</span>
            <span class="sidebar__label">${t.label}</span>
          </button>
        `).join("")}
    </nav>
    ${ss()}
  </aside>
`,Dt={id:"USR-ADMIN",name:"Admin APX",email:"admin@apx.com",password:"admin123",role:"Administrador"},Sa=()=>{const e=ze($.storageKeys.authUsers);return Array.isArray(e)?e:[]},St=e=>{Ve($.storageKeys.authUsers,Array.isArray(e)?e:[])},os=()=>{const e=Sa();if(e.some(s=>s.email===Dt.email))return e;const a=[Dt,...e];return St(a),a},ns=()=>ze($.storageKeys.authSession),wa=e=>{Ve($.storageKeys.authSession,e)},cs=()=>{Ea($.storageKeys.authSession)},ls=()=>ze($.storageKeys.authRecovery),is=e=>{Ve($.storageKeys.authRecovery,e)},xt=()=>{Ea($.storageKeys.authRecovery)},ds=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,Ia=6,ps=15*60*1e3,te=e=>String(e??"").trim().toLowerCase(),Ma=e=>String(e??"").trim(),wt=e=>ds.test(te(e)),us=e=>{const t=e.reduce((a,s)=>{const[,r]=String(s.id??"").split("-"),o=Number(r);return Number.isInteger(o)?Math.max(a,o):a},0)+1;return`USR-${String(t).padStart(5,"0")}`},ms=()=>String(Math.floor(1e5+Math.random()*9e5)),He=()=>os(),It=()=>(He(),ns()),hs=({email:e,password:t,rememberSession:a})=>{const s=He(),r=te(e),o=s.find(i=>te(i.email)===r);if(!wt(r))return{ok:!1,error:"Ingresa un correo válido."};if(!o||o.password!==String(t??""))return{ok:!1,error:"Correo o contraseña incorrectos."};const l={name:o.name,email:o.email,role:o.role,mode:"authenticated",userId:o.id,rememberSession:a==="on"||a===!0,startedAt:new Date().toISOString()};return wa(l),{ok:!0,session:l}},vs=()=>{const e={name:"Visitante APX",email:"demo@apx.local",role:"Visitante",mode:"demo",startedAt:new Date().toISOString()};return wa(e),{ok:!0,session:e}},bs=({name:e,email:t,password:a,confirmPassword:s})=>{const r=He(),o=Ma(e),l=te(t),i=String(a??"");if(!o)return{ok:!1,error:"Ingresa tu nombre."};if(!wt(l))return{ok:!1,error:"Ingresa un correo válido."};if(i.length<Ia)return{ok:!1,error:"La contraseña debe tener al menos 6 caracteres."};if(i!==String(s??""))return{ok:!1,error:"Las contraseñas no coinciden."};if(r.some(n=>te(n.email)===l))return{ok:!1,error:"Ya existe una cuenta registrada con ese correo."};const p={id:us(r),name:o,email:l,password:i,role:"Usuario",createdAt:new Date().toISOString()};return St([...r,p]),{ok:!0,user:p,message:"Cuenta creada correctamente. Ya puedes iniciar sesión."}},gs=({email:e})=>{const t=He(),a=te(e),s=t.find(l=>te(l.email)===a);if(!wt(a))return{ok:!1,error:"Ingresa un correo válido."};if(!s)return{ok:!1,error:"No existe una cuenta registrada con ese correo."};const r=ms(),o={email:a,code:r,createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+ps).toISOString()};return is(o),console.log(`[APX Manager] Código de recuperación para ${a}: ${r}`),{ok:!0,code:r,message:"Código enviado al correo registrado."}},fs=({code:e,password:t,confirmPassword:a})=>{const s=ls(),r=String(t??""),o=Ma(e);if(!s)return{ok:!1,error:"Solicita un código de recuperación primero."};if(new Date(s.expiresAt).getTime()<Date.now())return xt(),{ok:!1,error:"El código expiró. Solicita uno nuevo."};if(o!==s.code)return{ok:!1,error:"El código ingresado no es correcto."};if(r.length<Ia)return{ok:!1,error:"La contraseña debe tener al menos 6 caracteres."};if(r!==String(a??""))return{ok:!1,error:"Las contraseñas no coinciden."};const i=Sa().map(p=>te(p.email)===te(s.email)?{...p,password:r,updatedAt:new Date().toISOString()}:p);return St(i),xt(),{ok:!0,message:"Contraseña actualizada. Inicia sesión con tus nuevos datos."}},ys=()=>{cs()},ft=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),Ft={login:{eyebrow:"Acceso seguro",title:"Bienvenido de nuevo",description:"Ingresa para gestionar clientes, ventas, soporte y reportes internos."},register:{eyebrow:"Nueva cuenta",title:"Crea tu acceso APX",description:"Registra un usuario local para trabajar dentro del entorno de pruebas."},recovery:{eyebrow:"Recuperación",title:"Recupera tu contraseña",description:"Generaremos un código temporal de seis dígitos para validar tu cuenta."},verify:{eyebrow:"Verificación",title:"Actualiza tu contraseña",description:"Ingresa el código recibido y define una nueva contraseña segura."}},$s=({error:e="",message:t="",recoveryCode:a=""})=>`
  ${e?`<p class="auth-message auth-message--error" role="alert">${ft(e)}</p>`:""}
  ${t?`<p class="auth-message auth-message--success" role="status">${ft(t)}</p>`:""}
  ${a?`<p class="auth-message auth-message--code" role="note">Código de prueba: <strong>${ft(a)}</strong></p>`:""}
`,_s=()=>`
  <form class="auth-form" data-login-form>
    <label class="auth-field">
      <span>Correo</span>
      <input name="email" type="email" autocomplete="username" placeholder="admin@apx.com" required />
    </label>

    <label class="auth-field">
      <span>Contraseña</span>
      <input name="password" type="password" autocomplete="current-password" placeholder="Ingresa tu contraseña" required />
    </label>

    <div class="auth-form__row">
      <label class="auth-check">
        <input name="rememberSession" type="checkbox" />
        <span>Mantener sesión</span>
      </label>
      <button class="auth-link" type="button" data-auth-view="recovery">¿Olvidaste tu contraseña?</button>
    </div>

    <button class="auth-submit" type="submit">Iniciar sesión</button>
    <button class="auth-submit auth-submit--secondary" type="button" data-demo-login>Visualizar sistema</button>
    <p class="auth-switch">¿No tienes cuenta? <button type="button" data-auth-view="register">Crear cuenta</button></p>
  </form>
`,jt=e=>`
  <button
    class="auth-password-toggle"
    type="button"
    data-register-password-toggle="${e}"
    aria-label="Mostrar contraseña"
    title="Mostrar contraseña"
  >
    <svg class="auth-password-toggle__icon auth-password-toggle__icon--show" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
    <svg class="auth-password-toggle__icon auth-password-toggle__icon--hide" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" />
      <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c6 0 9.5 7 9.5 7a16.7 16.7 0 0 1-3.2 4.1" />
      <path d="M6.6 6.8C4 8.5 2.5 12 2.5 12s3.5 7 9.5 7a10 10 0 0 0 4-.8" />
    </svg>
  </button>
`,Es=()=>`
  <form class="auth-form" data-register-form>
    <label class="auth-field">
      <span>Nombre</span>
      <input name="name" type="text" autocomplete="name" placeholder="Nombre completo" required />
    </label>

    <label class="auth-field">
      <span>Correo</span>
      <input name="email" type="email" autocomplete="email" placeholder="usuario@apx.com" required />
    </label>

    <label class="auth-field">
      <span>Contraseña</span>
      <span class="auth-password-field">
        <input name="password" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" required />
        ${jt("password")}
      </span>
    </label>

    <label class="auth-field">
      <span>Confirmar contraseña</span>
      <span class="auth-password-field">
        <input name="confirmPassword" type="password" autocomplete="new-password" placeholder="Repite tu contraseña" required />
        ${jt("confirmPassword")}
      </span>
    </label>

    <button class="auth-submit" type="submit">Crear cuenta</button>
    <p class="auth-switch">¿Ya tienes cuenta? <button type="button" data-auth-view="login">Iniciar sesión</button></p>
  </form>
`,Ss=()=>`
  <form class="auth-form" data-recovery-form>
    <label class="auth-field">
      <span>Correo registrado</span>
      <input name="email" type="email" autocomplete="email" placeholder="admin@apx.com" required />
    </label>

    <button class="auth-submit" type="submit">Enviar código</button>
    <p class="auth-switch">¿Recordaste tu contraseña? <button type="button" data-auth-view="login">Volver al login</button></p>
  </form>
`,ws=()=>`
  <form class="auth-form" data-verify-form>
    <label class="auth-field">
      <span>Código recibido</span>
      <input name="code" type="text" inputmode="numeric" maxlength="6" placeholder="000000" required />
    </label>

    <label class="auth-field">
      <span>Nueva contraseña</span>
      <input name="password" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" required />
    </label>

    <label class="auth-field">
      <span>Confirmar nueva contraseña</span>
      <input name="confirmPassword" type="password" autocomplete="new-password" placeholder="Repite tu contraseña" required />
    </label>

    <button class="auth-submit" type="submit">Actualizar contraseña</button>
    <p class="auth-switch"><button type="button" data-auth-view="recovery">Solicitar otro código</button></p>
  </form>
`,Is=e=>e==="register"?Es():e==="recovery"?Ss():e==="verify"?ws():_s(),Ms=({screen:e="login",error:t="",message:a="",recoveryCode:s=""}={})=>{const r=Ft[e]?e:"login",o=Ft[r];return`
    <main class="auth-screen" aria-label="Autenticación APX">
      <section class="auth-layout">
        <aside class="auth-visual" aria-label="Resumen APX Manager">
          <div class="auth-visual__orb auth-visual__orb--one" aria-label="Logo APX">APX</div>
          <div class="auth-visual__orb auth-visual__orb--two"></div>
          <div class="auth-visual__content">
            <span class="auth-visual__tag">APX v${$.version}</span>
            <h2>Gestión empresarial clara, modular y lista para crecer.</h2>
            <p>Controla operaciones, finanzas y soporte técnico desde un entorno interno diseñado para Apex Prime X.</p>
            <div class="auth-visual__metrics" aria-label="Módulos principales">
              <span>Clientes</span>
              <span>Ventas</span>
              <span>Soporte</span>
              <span>Reportes</span>
            </div>
          </div>
        </aside>

        <section class="auth-card">
          <div class="auth-brand" aria-label="${$.name}">
            <span class="auth-brand__logo">APX</span>
            <div>
              <h1>${$.name}</h1>
              <p>${$.company}</p>
            </div>
          </div>

          <div class="auth-card__intro">
            <p class="auth-card__eyebrow">${o.eyebrow}</p>
            <h2>${o.title}</h2>
            <p>${o.description}</p>
          </div>

          ${$s({error:t,message:a,recoveryCode:s})}
          ${Is(r)}
        </section>
      </section>
    </main>
  `},As=["Pendiente","En proceso"],Cs=["Entregado","Sin solución","Sin soluciÃ³n","Sin solucion"],Bs=()=>new Date().toISOString().slice(0,10),zt=(e,t)=>e.reduce((a,s)=>a+Number(s[t]||0),0),Ts=()=>{const e=Bs(),t=P.getAll("ordenes"),a=P.getAll("soporte"),s=P.getAll("gastos"),r=P.getAll("ventas"),o=t.filter(c=>As.includes(c.estado)),l=a.filter(c=>!Cs.includes(c.estado)),i=s.filter(c=>c.fecha===e),p=r.filter(c=>c.fecha===e),n=[{key:"orders",label:"Órdenes pendientes",count:o.length,detail:`${o.length} orden${o.length===1?"":"es"} abierta${o.length===1?"":"s"}`,tone:"warning"},{key:"support",label:"Equipos en soporte",count:l.length,detail:`${l.length} caso${l.length===1?"":"s"} técnico${l.length===1?"":"s"} activo${l.length===1?"":"s"}`,tone:"info"},{key:"expenses",label:"Gastos del día",count:i.length,detail:`Total registrado: ${new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(zt(i,"monto"))}`,tone:"danger"},{key:"sales",label:"Ventas registradas hoy",count:p.length,detail:`Total registrado: ${new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(zt(p,"montoTotal"))}`,tone:"success"}];return{total:n.reduce((c,d)=>c+d.count,0),items:n.filter(c=>c.count>0)}},f=e=>typeof e=="string"?e.trim().length>0:e!=null,Ls=e=>f(e)?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e):!1,we="clientes",We=["Activo","Inactivo","Prospecto"],Je=["Empresa","Persona","Gobierno","Otro"],Vt=e=>{var t,a,s,r,o;return{nombre:((t=e.nombre)==null?void 0:t.trim())??"",telefono:((a=e.telefono)==null?void 0:a.trim())??"",correo:((s=e.correo)==null?void 0:s.trim())??"",direccion:((r=e.direccion)==null?void 0:r.trim())??"",tipoCliente:e.tipoCliente??Je[0],fechaRegistro:e.fechaRegistro||new Date().toISOString().slice(0,10),estado:e.estado??We[0],observaciones:((o=e.observaciones)==null?void 0:o.trim())??""}},Ht=e=>{const t={};return f(e.nombre)||(t.nombre="El nombre es obligatorio."),f(e.telefono)||(t.telefono="El telefono es obligatorio."),f(e.correo)&&!Ls(e.correo)&&(t.correo="El correo no tiene un formato valido."),Je.includes(e.tipoCliente)||(t.tipoCliente="El tipo de cliente no es valido."),We.includes(e.estado)||(t.estado="El estado no es valido."),t},Ps=(e=P)=>{const t=()=>e.getAll(we).sort((i,p)=>i.nombre.localeCompare(p.nombre));return{createCliente:i=>{const p=Vt(i),n=Ht(p);return Object.keys(n).length>0?{ok:!1,errors:n}:{ok:!0,data:e.create(we,p)}},deleteCliente:i=>e.delete(we,i),findClienteById:i=>e.findById(we,i),getClientes:t,searchClientes:(i="")=>{const p=i.trim().toLowerCase();return p?t().filter(n=>[n.id,n.nombre,n.telefono,n.correo,n.tipoCliente,n.estado].filter(Boolean).some(c=>String(c).toLowerCase().includes(p))):t()},updateCliente:(i,p)=>{const n=Vt(p),c=Ht(n);return Object.keys(c).length>0?{ok:!1,errors:c}:{ok:!0,data:e.update(we,i,n)}}}},ye=Ps(),Rs=ye.createCliente,ks=ye.deleteCliente,Ns=ye.findClienteById,qs=ye.getClientes,Os=ye.searchClientes,Ds=ye.updateCliente,xs=e=>`v${e}`,J=(e,t="es-PE")=>{const a=new Date(e);return Number.isNaN(a.getTime())?"":new Intl.DateTimeFormat(t,{year:"numeric",month:"2-digit",day:"2-digit"}).format(a)},_=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),G={users:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 19a4 4 0 0 0-8 0" />
      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M21 19a3.5 3.5 0 0 0-4-3.45" />
      <path d="M17 4.2a2.8 2.8 0 0 1 0 5.6" />
      <path d="M3 19a3.5 3.5 0 0 1 4-3.45" />
      <path d="M7 4.2a2.8 2.8 0 0 0 0 5.6" />
    </svg>
  `,userPlus:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 19a5 5 0 0 0-10 0" />
      <path d="M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M19 8v6M16 11h6" />
    </svg>
  `,check:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,building:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
      <path d="M9 21v-4h3v4M8 7h1M12 7h1M8 11h1M12 11h1M19 21V11h-2" />
    </svg>
  `,person:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 21a7 7 0 0 0-14 0" />
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
  `,edit:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.5 4 4-.5L19 8.5 15.5 5 4 16.5Z" />
      <path d="m14 6.5 3.5 3.5" />
    </svg>
  `,trash:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `},Ut=(e,t)=>e.map(a=>`
        <option value="${_(a)}"${a===t?" selected":""}>
          ${_(a)}
        </option>
      `).join(""),Ie=(e,t)=>t[e]?`<small class="field-error">${_(t[e])}</small>`:"",Fs=(e="")=>(e.trim().split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0]).join("")||"CL").toUpperCase(),js=e=>e==="Activo"?"customer-status-badge--active":"customer-status-badge--inactive",zs=e=>e==="Empresa"?"customer-type-badge--company":e==="Persona"?"customer-type-badge--person":"customer-type-badge--other",Vs=(e={})=>`
  <div class="customers-summary" aria-label="Resumen de clientes">
    <article class="customers-summary-card customers-summary-card--primary">
      <span class="customers-summary-card__icon">${G.users}</span>
      <div>
        <span class="customers-summary-card__label">Total de clientes</span>
        <strong class="customers-summary-card__value">${Number(e.total)||0}</strong>
        <span class="customers-summary-card__helper">Base comercial registrada</span>
      </div>
    </article>

    <article class="customers-summary-card customers-summary-card--success">
      <span class="customers-summary-card__icon">${G.check}</span>
      <div>
        <span class="customers-summary-card__label">Clientes activos</span>
        <strong class="customers-summary-card__value">${Number(e.active)||0}</strong>
        <span class="customers-summary-card__helper">Listos para seguimiento</span>
      </div>
    </article>

    <article class="customers-summary-card customers-summary-card--purple">
      <span class="customers-summary-card__icon">${G.building}</span>
      <div>
        <span class="customers-summary-card__label">Clientes empresa</span>
        <strong class="customers-summary-card__value">${Number(e.companies)||0}</strong>
        <span class="customers-summary-card__helper">Cuentas corporativas</span>
      </div>
    </article>

    <article class="customers-summary-card customers-summary-card--info">
      <span class="customers-summary-card__icon">${G.person}</span>
      <div>
        <span class="customers-summary-card__label">Clientes persona</span>
        <strong class="customers-summary-card__value">${Number(e.people)||0}</strong>
        <span class="customers-summary-card__helper">Contactos individuales</span>
      </div>
    </article>
  </div>
`,Hs=e=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="8">
          <span class="empty-state__icon customers-empty-icon">${G.users}</span>
          <strong>No hay clientes registrados.</strong>
          <span>Agrega tu primer cliente para comenzar a construir tu historial comercial.</span>
        </td>
      </tr>
    `:e.map(t=>`
        <tr>
          <td>${_(t.id)}</td>
          <td>
            <div class="customer-cell">
              <span class="customer-avatar" aria-hidden="true">${_(Fs(t.nombre))}</span>
              <div>
                <strong>${_(t.nombre)}</strong>
                <span>${_(t.direccion||"Sin dirección")}</span>
              </div>
            </div>
          </td>
          <td>${_(t.telefono)}</td>
          <td>${_(t.correo||"Sin correo")}</td>
          <td>
            <span class="customer-type-badge ${zs(t.tipoCliente)}">
              ${_(t.tipoCliente)}
            </span>
          </td>
          <td>${J(t.fechaRegistro)}</td>
          <td>
            <span class="customer-status-badge ${js(t.estado)}">
              ${_(t.estado)}
            </span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost customers-action customers-action--edit" type="button" data-cliente-edit="${_(t.id)}" title="Editar cliente" aria-label="Editar cliente ${_(t.id)}">
                ${G.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger customers-action customers-action--delete" type="button" data-cliente-delete="${_(t.id)}" title="Eliminar cliente" aria-label="Eliminar cliente ${_(t.id)}">
                ${G.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `).join(""),Us=({clientes:e,summary:t,editingCliente:a=null,searchTerm:s="",errors:r={}})=>{const o=a?"Editar cliente":"Nuevo cliente",l=a?"Actualizar cliente":"Crear cliente";return`
    <section class="module-view module-view--clientes" aria-label="Clientes">
      ${Vs(t)}

      <div class="clientes-layout">
        <form class="panel cliente-form customers-form-card" data-clientes-form>
          <input type="hidden" name="id" value="${_((a==null?void 0:a.id)??"")}" />

          <div class="panel__header">
            <h3><span class="section-icon customers-section-icon">${G.userPlus}</span>${o}</h3>
            ${a?'<button class="button button--ghost" type="button" data-clientes-cancel>Cancelar</button>':""}
          </div>

          <div class="form-grid">
            <label class="field">
              <span>Nombre</span>
              <input name="nombre" type="text" value="${_((a==null?void 0:a.nombre)??"")}" autocomplete="name" />
              ${Ie("nombre",r)}
            </label>

            <label class="field">
              <span>Teléfono</span>
              <input name="telefono" type="tel" value="${_((a==null?void 0:a.telefono)??"")}" autocomplete="tel" />
              ${Ie("telefono",r)}
            </label>

            <label class="field">
              <span>Correo</span>
              <input name="correo" type="email" value="${_((a==null?void 0:a.correo)??"")}" autocomplete="email" />
              ${Ie("correo",r)}
            </label>

            <label class="field">
              <span>Fecha de registro</span>
              <input name="fechaRegistro" type="date" value="${_((a==null?void 0:a.fechaRegistro)??new Date().toISOString().slice(0,10))}" />
            </label>

            <label class="field">
              <span>Tipo de cliente</span>
              <select name="tipoCliente">
                ${Ut(Je,(a==null?void 0:a.tipoCliente)??Je[0])}
              </select>
              ${Ie("tipoCliente",r)}
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${Ut(We,(a==null?void 0:a.estado)??We[0])}
              </select>
              ${Ie("estado",r)}
            </label>

            <label class="field field--full">
              <span>Dirección</span>
              <input name="direccion" type="text" value="${_((a==null?void 0:a.direccion)??"")}" autocomplete="street-address" />
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${_((a==null?void 0:a.observaciones)??"")}</textarea>
            </label>
          </div>

          <button class="button button--primary customers-submit" type="submit">
            ${G.userPlus}
            <span>${l}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel customers-table-card" aria-label="Listado de clientes">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon customers-section-icon">${G.users}</span>Listado de clientes</h3>
              <p>${e.length} registro${e.length===1?"":"s"}</p>
            </div>
            <label class="search-field customers-search-field">
              <span>Buscar cliente</span>
              <input
                name="clienteSearch"
                type="search"
                value="${_(s)}"
                placeholder="Nombre, teléfono, correo o estado"
                data-clientes-search
              />
            </label>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th>Registro</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${Hs(e)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `},B={searchTerm:"",editingClienteId:null,errors:{}},Zs=e=>Object.fromEntries(new FormData(e).entries()),Gs=()=>Os(B.searchTerm),Ks=()=>{const e=qs();return{total:e.length,active:e.filter(t=>t.estado==="Activo").length,companies:e.filter(t=>t.tipoCliente==="Empresa").length,people:e.filter(t=>t.tipoCliente==="Persona").length}},Aa=()=>Us({clientes:Gs(),summary:Ks(),editingCliente:B.editingClienteId?Ns(B.editingClienteId):null,searchTerm:B.searchTerm,errors:B.errors}),Xs=e=>{const t=()=>{e.innerHTML=Aa()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-clientes-form]");if(!s)return;a.preventDefault();const r=Zs(s),o=r.id?Ds(r.id,r):Rs(r);if(!o.ok){B.errors=o.errors,t();return}B.editingClienteId=null,B.errors={},t()}),e.addEventListener("input",a=>{const s=a.target.closest("[data-clientes-search]");if(!s)return;B.searchTerm=s.value,t();const r=e.querySelector("[data-clientes-search]");r==null||r.focus(),r==null||r.setSelectionRange(B.searchTerm.length,B.searchTerm.length)}),e.addEventListener("click",a=>{const s=a.target.closest("[data-cliente-edit]"),r=a.target.closest("[data-cliente-delete]"),o=a.target.closest("[data-clientes-cancel]");if(s){B.editingClienteId=s.dataset.clienteEdit,B.errors={},t();return}if(r){const l=r.dataset.clienteDelete;ks(l),B.editingClienteId===l&&(B.editingClienteId=null),B.errors={},t();return}o&&(B.editingClienteId=null,B.errors={},t())})},Ys=(e=new Date)=>e.toISOString().slice(0,10),Ws=(e=new Date)=>e.toISOString().slice(0,7),Js=e=>{const t=Number(e);return Number.isFinite(t)?t:0},Ke=(e,t)=>e.reduce((a,s)=>a+Js(s[t]),0),Zt=e=>[...e].sort((t,a)=>{const s=`${t.fecha??""}T${t.createdAt??"00:00:00"}`;return`${a.fecha??""}T${a.createdAt??"00:00:00"}`.localeCompare(s)}),Qs=(e=P,t=new Date)=>{const a=Ys(t),s=Ws(t),r=()=>e.getAll("clientes"),o=()=>e.getAll("ventas"),l=()=>e.getAll("gastos"),i=n=>r().find(c=>c.id===n)??null;return{getDashboardData:()=>{const n=r(),c=o(),d=l(),u=c.filter(ie=>ie.fecha===a),b=d.filter(ie=>ie.fecha===a),w=c.filter(ie=>{var Se;return(Se=ie.fecha)==null?void 0:Se.startsWith(s)}),k=d.filter(ie=>{var Se;return(Se=ie.fecha)==null?void 0:Se.startsWith(s)}),j=Ke(u,"montoTotal"),z=Ke(b,"monto"),Ze=Ke(w,"montoTotal"),Lt=Ke(k,"monto");return{metrics:{ingresosDia:j,gastosDia:z,utilidadDia:j-z,ingresosMes:Ze,gastosMes:Lt,gananciaMensual:Ze-Lt,clientesRegistrados:n.length,ventasRegistradas:c.length},latestVentas:Zt(c).slice(0,5),latestGastos:Zt(d).slice(0,5),findClienteById:i}}}},er=Qs(),tr=er.getDashboardData,V=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),Mt=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),ar=e=>e.type==="currency"?Mt(e.value):String(e.value),sr=e=>[{label:"Ingresos del dia",value:e.ingresosDia,type:"currency",tone:"success",icon:"$",helper:"Ventas registradas hoy"},{label:"Gastos del dia",value:e.gastosDia,type:"currency",tone:"danger",icon:"-",helper:"Egresos operativos hoy"},{label:"Utilidad del dia",value:e.utilidadDia,type:"currency",tone:"primary",icon:"+",helper:"Balance neto diario"},{label:"Ingresos del mes",value:e.ingresosMes,type:"currency",tone:"purple",icon:"M",helper:"Ventas acumuladas"},{label:"Gastos del mes",value:e.gastosMes,type:"currency",tone:"warning",icon:"G",helper:"Costos acumulados"},{label:"Ganancia mensual",value:e.gananciaMensual,type:"currency",tone:"info",icon:"N",helper:"Resultado mensual"},{label:"Clientes registrados",value:e.clientesRegistrados,type:"number",tone:"indigo",icon:"C",helper:"Base comercial"},{label:"Ventas registradas",value:e.ventasRegistradas,type:"number",tone:"teal",icon:"V",helper:"Operaciones totales"}].map(a=>`
        <article class="metric-card dashboard-card dashboard-card--${a.tone}">
          <span class="dashboard-card__icon">${V(a.icon)}</span>
          <span class="metric-card__label">${V(a.label)}</span>
          <strong class="metric-card__value">${V(ar(a))}</strong>
          <span class="dashboard-card__helper">${V(a.helper)}</span>
        </article>
      `).join(""),rr=(e,t)=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="5">
          <span class="empty-state__icon">◇</span>
          <strong>No hay ventas registradas.</strong>
          <span>Registra tu primera venta para empezar a medir ingresos.</span>
        </td>
      </tr>
    `:e.map(a=>{const s=t(a.clienteId);return`
        <tr>
          <td>${V(a.id)}</td>
          <td>${J(a.fecha)}</td>
          <td>
            <strong>${V((s==null?void 0:s.nombre)??"Cliente no encontrado")}</strong>
            <span>${V(a.descripcion||a.clienteId)}</span>
          </td>
          <td>${V(a.estadoPago)}</td>
          <td><strong>${Mt(a.montoTotal)}</strong></td>
        </tr>
      `}).join(""),or=e=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="5">
          <span class="empty-state__icon">◇</span>
          <strong>No hay gastos registrados.</strong>
          <span>Agrega tu primer gasto para controlar tus finanzas.</span>
        </td>
      </tr>
    `:e.map(t=>`
        <tr>
          <td>${V(t.id)}</td>
          <td>${J(t.fecha)}</td>
          <td>
            <strong>${V(t.concepto)}</strong>
            <span>${V(t.comprobante||"Sin comprobante")}</span>
          </td>
          <td>${V(t.categoria)}</td>
          <td><strong>${Mt(t.monto)}</strong></td>
        </tr>
      `).join(""),nr=({metrics:e,latestVentas:t,latestGastos:a,findClienteById:s})=>`
  <section class="module-view module-view--dashboard" aria-label="Dashboard">
    <div class="dashboard-grid" aria-label="Resumen de indicadores">
      ${sr(e)}
    </div>

    <div class="dashboard-tables">
      <section class="panel dashboard-table-panel" aria-label="Ultimas ventas">
        <div class="panel__header">
          <h3><span class="section-icon">↗</span> Ultimas ventas</h3>
          <button class="button button--ghost" type="button" data-module-key="sales">Ver todas</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table data-table--compact">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${rr(t,s)}
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel dashboard-table-panel" aria-label="Ultimos gastos">
        <div class="panel__header">
          <h3><span class="section-icon">↘</span> Ultimos gastos</h3>
          <button class="button button--ghost" type="button" data-module-key="expenses">Ver todos</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table data-table--compact">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Categoria</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              ${or(a)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
`,cr=()=>nr(tr()),Me="equipos",Qe=["Laptop","Desktop","Servidor","Impresora","Red","Movil","Otro"],et=["Bueno","Regular","Dañado","Incompleto"],Gt=e=>{var t,a,s,r,o,l;return{fechaRecepcion:e.fechaRecepcion||new Date().toISOString().slice(0,10),clienteId:e.clienteId??"",tipoEquipo:e.tipoEquipo??Qe[0],marca:((t=e.marca)==null?void 0:t.trim())??"",modelo:((a=e.modelo)==null?void 0:a.trim())??"",serie:((s=e.serie)==null?void 0:s.trim())??"",accesorios:((r=e.accesorios)==null?void 0:r.trim())??"",estadoFisico:e.estadoFisico??et[0],problemaReportado:((o=e.problemaReportado)==null?void 0:o.trim())??"",observaciones:((l=e.observaciones)==null?void 0:l.trim())??""}},Kt=e=>{const t={};return f(e.fechaRecepcion)||(t.fechaRecepcion="La fecha de recepcion es obligatoria."),f(e.clienteId)||(t.clienteId="Selecciona un cliente."),Qe.includes(e.tipoEquipo)||(t.tipoEquipo="El tipo de equipo no es valido."),f(e.marca)||(t.marca="La marca es obligatoria."),f(e.modelo)||(t.modelo="El modelo es obligatorio."),f(e.serie)||(t.serie="La serie es obligatoria."),et.includes(e.estadoFisico)||(t.estadoFisico="El estado fisico no es valido."),f(e.problemaReportado)||(t.problemaReportado="El problema reportado es obligatorio."),t},lr=(e=P)=>{const t=()=>e.getAll("clientes").sort((n,c)=>n.nombre.localeCompare(c.nombre)),a=n=>t().find(c=>c.id===n)??null,s=()=>e.getAll(Me).sort((n,c)=>new Date(c.fechaRecepcion)-new Date(n.fechaRecepcion));return{createEquipo:n=>{const c=Gt(n),d=Kt(c);return Object.keys(d).length>0?{ok:!1,errors:d}:{ok:!0,data:e.create(Me,c)}},deleteEquipo:n=>e.delete(Me,n),findClienteById:a,findEquipoById:n=>e.findById(Me,n),getClientes:t,getEquipos:s,searchEquipos:(n="")=>{const c=n.trim().toLowerCase();return c?s().filter(d=>{const u=a(d.clienteId);return[d.serie,d.clienteId,u==null?void 0:u.nombre,u==null?void 0:u.telefono,u==null?void 0:u.correo].filter(Boolean).some(b=>String(b).toLowerCase().includes(c))}):s()},updateEquipo:(n,c)=>{const d=Gt(c),u=Kt(d);return Object.keys(u).length>0?{ok:!1,errors:u}:{ok:!0,data:e.update(Me,n,d)}}}},ce=lr(),ir=ce.createEquipo,dr=ce.deleteEquipo,pr=ce.findClienteById,ur=ce.findEquipoById,mr=ce.getClientes,hr=ce.getEquipos,vr=ce.searchEquipos,br=ce.updateEquipo,m=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),O={monitor:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H4V5Z" />
      <path d="M9 21h6M12 16v5" />
    </svg>
  `,laptop:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h12v10H6V5Z" />
      <path d="M3 19h18l-2-4H5l-2 4Z" />
    </svg>
  `,desktop:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h11v10H4V5Z" />
      <path d="M18 7h2v12h-5v-2h3V7Z" />
      <path d="M8 19h5M10.5 15v4" />
    </svg>
  `,printer:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8V4h10v4" />
      <path d="M6 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1" />
      <path d="M7 14h10v6H7v-6Z" />
    </svg>
  `,plus:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H4V5Z" />
      <path d="M9 21h6M12 16v5M12 8v5M9.5 10.5h5" />
    </svg>
  `,alert:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 4.3 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
    </svg>
  `,check:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,edit:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.5 4 4-.5L19 8.5 15.5 5 4 16.5Z" />
      <path d="m14 6.5 3.5 3.5" />
    </svg>
  `,trash:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `},Xt=(e,t)=>e.map(a=>`
        <option value="${m(a)}"${a===t?" selected":""}>
          ${m(tt(a))}
        </option>
      `).join(""),gr=(e,t)=>e.map(a=>`
        <option value="${m(a.id)}"${a.id===t?" selected":""}>
          ${m(a.nombre)}
        </option>
      `).join(""),re=(e,t)=>t[e]?`<small class="field-error">${m(t[e])}</small>`:"",tt=e=>String(e??"").replace("DaÃ±ado","Dañado"),Ca=e=>String(tt(e)||"otro").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),fr=(e="")=>(e.trim().split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0]).join("")||"CL").toUpperCase(),yr=(e="")=>{const t=Ca(e);return t.includes("laptop")||t.includes("movil")?O.laptop:t.includes("desktop")||t.includes("servidor")||t.includes("red")?O.desktop:t.includes("impresora")?O.printer:O.monitor},$r=(e={})=>`
  <div class="equipment-summary" aria-label="Resumen de equipos">
    <article class="equipment-summary-card equipment-summary-card--primary">
      <span class="equipment-summary-card__icon">${O.monitor}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos recibidos</span>
        <strong class="equipment-summary-card__value">${Number(e.total)||0}</strong>
        <span class="equipment-summary-card__helper">Registros técnicos activos</span>
      </div>
    </article>

    <article class="equipment-summary-card equipment-summary-card--info">
      <span class="equipment-summary-card__icon">${O.alert}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos pendientes</span>
        <strong class="equipment-summary-card__value">${Number(e.pending)||0}</strong>
        <span class="equipment-summary-card__helper">Requieren revisión técnica</span>
      </div>
    </article>

    <article class="equipment-summary-card equipment-summary-card--teal">
      <span class="equipment-summary-card__icon">${O.check}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos entregados</span>
        <strong class="equipment-summary-card__value">${Number(e.delivered)||0}</strong>
        <span class="equipment-summary-card__helper">En buen estado físico</span>
      </div>
    </article>

    <article class="equipment-summary-card equipment-summary-card--dark">
      <span class="equipment-summary-card__icon">${O.laptop}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos en reparación</span>
        <strong class="equipment-summary-card__value">${Number(e.repairing)||0}</strong>
        <span class="equipment-summary-card__helper">Con condición por atender</span>
      </div>
    </article>
  </div>
`,_r=({equipos:e,getClienteName:t})=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="9">
          <span class="empty-state__icon equipment-empty-icon">${O.monitor}</span>
          <strong>No hay equipos recibidos registrados.</strong>
          <span>Registra un equipo para iniciar su seguimiento técnico.</span>
        </td>
      </tr>
    `:e.map(a=>{const s=t(a.clienteId);return`
        <tr>
          <td>${m(a.id)}</td>
          <td>${J(a.fechaRecepcion)}</td>
          <td>
            <div class="equipment-client-cell">
              <span class="equipment-client-avatar" aria-hidden="true">${m(fr(s))}</span>
              <div>
                <strong>${m(s)}</strong>
                <span>${m(a.clienteId)}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="equipment-type-badge">
              ${yr(a.tipoEquipo)}
              ${m(tt(a.tipoEquipo))}
            </span>
          </td>
          <td>
            <strong>${m(a.marca)} ${m(a.modelo)}</strong>
            <span>Serie: ${m(a.serie)}</span>
          </td>
          <td>${m(a.accesorios||"Sin accesorios")}</td>
          <td>
            <span class="equipment-condition-badge equipment-condition-badge--${Ca(a.estadoFisico)}">
              ${m(tt(a.estadoFisico))}
            </span>
          </td>
          <td>
            <strong class="equipment-problem">${m(a.problemaReportado)}</strong>
            <span>${m(a.observaciones||"Sin observaciones")}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost equipment-action equipment-action--edit" type="button" data-equipo-edit="${m(a.id)}" title="Editar equipo" aria-label="Editar equipo ${m(a.id)}">
                ${O.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger equipment-action equipment-action--delete" type="button" data-equipo-delete="${m(a.id)}" title="Eliminar equipo" aria-label="Eliminar equipo ${m(a.id)}">
                ${O.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),Er=({equipos:e,summary:t,clientes:a,editingEquipo:s=null,searchTerm:r="",errors:o={},getClienteName:l})=>{const i=s?"Editar equipo":"Registrar equipo",p=s?"Actualizar equipo":"Registrar equipo",n=a.length>0;return`
    <section class="module-view module-view--equipos" aria-label="Equipos Recibidos">
      ${$r(t)}

      <div class="clientes-layout">
        <form class="panel cliente-form equipment-form-card" data-equipos-form>
          <input type="hidden" name="id" value="${m((s==null?void 0:s.id)??"")}" />

          <div class="panel__header">
            <h3><span class="section-icon equipment-section-icon">${O.plus}</span>${i}</h3>
            ${s?'<button class="button button--ghost" type="button" data-equipos-cancel>Cancelar</button>':""}
          </div>

          ${n?'<p class="equipment-info">Registra los datos técnicos del equipo para mantener trazabilidad de recepción, diagnóstico y entrega.</p>':'<p class="dependency-warning">Registra al menos un cliente antes de recibir equipos.</p>'}

          <div class="form-grid">
            <label class="field">
              <span>Fecha recepción</span>
              <input name="fechaRecepcion" type="date" value="${m((s==null?void 0:s.fechaRecepcion)??new Date().toISOString().slice(0,10))}" />
              ${re("fechaRecepcion",o)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${gr(a,s==null?void 0:s.clienteId)}
              </select>
              ${re("clienteId",o)}
            </label>

            <label class="field">
              <span>Tipo de equipo</span>
              <select name="tipoEquipo">
                ${Xt(Qe,(s==null?void 0:s.tipoEquipo)??Qe[0])}
              </select>
              ${re("tipoEquipo",o)}
            </label>

            <label class="field">
              <span>Estado físico</span>
              <select name="estadoFisico">
                ${Xt(et,(s==null?void 0:s.estadoFisico)??et[0])}
              </select>
              ${re("estadoFisico",o)}
            </label>

            <label class="field">
              <span>Marca</span>
              <input name="marca" type="text" value="${m((s==null?void 0:s.marca)??"")}" />
              ${re("marca",o)}
            </label>

            <label class="field">
              <span>Modelo</span>
              <input name="modelo" type="text" value="${m((s==null?void 0:s.modelo)??"")}" />
              ${re("modelo",o)}
            </label>

            <label class="field field--full">
              <span>Serie</span>
              <input name="serie" type="text" value="${m((s==null?void 0:s.serie)??"")}" />
              ${re("serie",o)}
            </label>

            <label class="field field--full">
              <span>Accesorios</span>
              <input name="accesorios" type="text" value="${m((s==null?void 0:s.accesorios)??"")}" />
            </label>

            <label class="field field--full">
              <span>Problema reportado</span>
              <textarea name="problemaReportado" rows="3">${m((s==null?void 0:s.problemaReportado)??"")}</textarea>
              ${re("problemaReportado",o)}
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${m((s==null?void 0:s.observaciones)??"")}</textarea>
            </label>
          </div>

          <button class="button button--primary equipment-submit" type="submit"${n?"":" disabled"}>
            ${O.plus}
            <span>${p}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel equipment-table-card" aria-label="Listado de equipos recibidos">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon equipment-section-icon">${O.monitor}</span>Listado de equipos</h3>
              <p>${e.length} registro${e.length===1?"":"s"}</p>
            </div>
            <label class="search-field equipment-search-field">
              <span>Buscar por cliente o serie</span>
              <input
                name="equipoSearch"
                type="search"
                value="${m(r)}"
                placeholder="Cliente, teléfono, correo, ID o serie"
                data-equipos-search
              />
            </label>
          </div>

          <div class="table-wrapper">
            <table class="data-table data-table--wide">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Recepción</th>
                  <th>Cliente</th>
                  <th>Tipo</th>
                  <th>Equipo</th>
                  <th>Accesorios</th>
                  <th>Estado</th>
                  <th>Problema</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${_r({equipos:e,getClienteName:l})}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `},T={searchTerm:"",editingEquipoId:null,errors:{}},Sr=e=>Object.fromEntries(new FormData(e).entries()),wr=e=>{var t;return((t=pr(e))==null?void 0:t.nombre)??"Cliente no encontrado"},Ir=()=>vr(T.searchTerm),Mr=()=>{const e=hr(),t=a=>["Regular","DaÃ±ado","Incompleto","Dañado"].includes(a.estadoFisico);return{total:e.length,pending:e.filter(t).length,delivered:e.filter(a=>a.estadoFisico==="Bueno").length,repairing:e.filter(t).length}},Ba=()=>Er({equipos:Ir(),summary:Mr(),clientes:mr(),editingEquipo:T.editingEquipoId?ur(T.editingEquipoId):null,searchTerm:T.searchTerm,errors:T.errors,getClienteName:wr}),Ar=e=>{const t=()=>{e.innerHTML=Ba()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-equipos-form]");if(!s)return;a.preventDefault();const r=Sr(s),o=r.id?br(r.id,r):ir(r);if(!o.ok){T.errors=o.errors,t();return}T.editingEquipoId=null,T.errors={},t()}),e.addEventListener("input",a=>{const s=a.target.closest("[data-equipos-search]");if(!s)return;T.searchTerm=s.value,t();const r=e.querySelector("[data-equipos-search]");r==null||r.focus(),r==null||r.setSelectionRange(T.searchTerm.length,T.searchTerm.length)}),e.addEventListener("click",a=>{const s=a.target.closest("[data-equipo-edit]"),r=a.target.closest("[data-equipo-delete]"),o=a.target.closest("[data-equipos-cancel]");if(s){T.editingEquipoId=s.dataset.equipoEdit,T.errors={},t();return}if(r){const l=r.dataset.equipoDelete;dr(l),T.editingEquipoId===l&&(T.editingEquipoId=null),T.errors={},t();return}o&&(T.editingEquipoId=null,T.errors={},t())})},Ae="gastos",qe=["Materiales","Internet","Software","Transporte","Equipos","Publicidad","Mantenimiento","Otros"],at=["Efectivo","Transferencia","Tarjeta","Yape/Plin","Credito"],Ta=e=>{const t=Number(e);return Number.isFinite(t)?t:0},Yt=e=>{var t,a,s;return{fecha:e.fecha||new Date().toISOString().slice(0,10),concepto:((t=e.concepto)==null?void 0:t.trim())??"",categoria:e.categoria??qe[0],monto:Ta(e.monto),metodoPago:e.metodoPago??at[0],comprobante:((a=e.comprobante)==null?void 0:a.trim())??"",observaciones:((s=e.observaciones)==null?void 0:s.trim())??""}},Wt=e=>{const t={};return f(e.fecha)||(t.fecha="La fecha es obligatoria."),f(e.concepto)||(t.concepto="El concepto es obligatorio."),qe.includes(e.categoria)||(t.categoria="La categoria no es valida."),Ta(e.monto)<=0&&(t.monto="El monto debe ser mayor a cero."),at.includes(e.metodoPago)||(t.metodoPago="El metodo de pago no es valido."),t},Cr=(e=P)=>{const t=()=>e.getAll(Ae).sort((i,p)=>new Date(p.fecha)-new Date(i.fecha));return{createGasto:i=>{const p=Yt(i),n=Wt(p);return Object.keys(n).length>0?{ok:!1,errors:n}:{ok:!0,data:e.create(Ae,p)}},deleteGasto:i=>e.delete(Ae,i),filterGastos:({fecha:i="",categoria:p=""}={})=>t().filter(n=>{const c=i?n.fecha===i:!0,d=p?n.categoria===p:!0;return c&&d}),findGastoById:i=>e.findById(Ae,i),getGastos:t,updateGasto:(i,p)=>{const n=Yt(p),c=Wt(n);return Object.keys(c).length>0?{ok:!1,errors:c}:{ok:!0,data:e.update(Ae,i,n)}}}},$e=Cr(),Br=$e.createGasto,Tr=$e.deleteGasto,Lr=$e.filterGastos,Pr=$e.findGastoById,Rr=$e.getGastos,kr=$e.updateGasto,E=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),Xe=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),K={wallet:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v2.25h-4.25a3.25 3.25 0 0 0 0 6.5H20V17a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M15.75 10.75H21v3.5h-5.25a1.75 1.75 0 1 1 0-3.5Z" />
    </svg>
  `,receipt:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h10a2 2 0 0 1 2 2v16l-3-1.5-2 1.5-2-1.5-2 1.5-2-1.5L5 21V5a2 2 0 0 1 2-2Z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  `,tag:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5V5h7.5L20 13.5 13.5 20 4 12.5Z" />
      <path d="M8.5 8.5h.01" />
    </svg>
  `,calendar:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  `,edit:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.5 4 4-.5L19 8.5 15.5 5 4 16.5Z" />
      <path d="m14 6.5 3.5 3.5" />
    </svg>
  `,trash:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `},yt=(e,t)=>e.map(a=>`
        <option value="${E(a)}"${a===t?" selected":""}>
          ${E(a)}
        </option>
      `).join(""),Ce=(e,t)=>t[e]?`<small class="field-error">${E(t[e])}</small>`:"",Nr=e=>`expense-category-badge--${String(e??"otros").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`,qr=(e={})=>`
  <div class="expenses-summary" aria-label="Resumen de gastos">
    <article class="expenses-summary-card expenses-summary-card--danger">
      <span class="expenses-summary-card__icon">${K.wallet}</span>
      <div>
        <span class="expenses-summary-card__label">Gastos del día</span>
        <strong class="expenses-summary-card__value">${Xe(e.gastosDia)}</strong>
        <span class="expenses-summary-card__helper">Egresos registrados hoy</span>
      </div>
    </article>

    <article class="expenses-summary-card expenses-summary-card--warning">
      <span class="expenses-summary-card__icon">${K.calendar}</span>
      <div>
        <span class="expenses-summary-card__label">Gastos del mes</span>
        <strong class="expenses-summary-card__value">${Xe(e.gastosMes)}</strong>
        <span class="expenses-summary-card__helper">Total acumulado mensual</span>
      </div>
    </article>

    <article class="expenses-summary-card expenses-summary-card--purple">
      <span class="expenses-summary-card__icon">${K.tag}</span>
      <div>
        <span class="expenses-summary-card__label">Categoría más usada</span>
        <strong class="expenses-summary-card__value">${E(e.categoriaMasUsada??"Sin datos")}</strong>
        <span class="expenses-summary-card__helper">Según registros actuales</span>
      </div>
    </article>

    <article class="expenses-summary-card expenses-summary-card--info">
      <span class="expenses-summary-card__icon">${K.receipt}</span>
      <div>
        <span class="expenses-summary-card__label">Último gasto registrado</span>
        <strong class="expenses-summary-card__value">${Xe(e.ultimoGasto)}</strong>
        <span class="expenses-summary-card__helper">Registro más reciente</span>
      </div>
    </article>
  </div>
`,Or=e=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="8">
          <span class="empty-state__icon expenses-empty-icon">${K.receipt}</span>
          <strong>No hay gastos registrados.</strong>
          <span>Agrega tu primer gasto para controlar mejor tus egresos.</span>
        </td>
      </tr>
    `:e.map(t=>`
        <tr>
          <td>${E(t.id)}</td>
          <td>${J(t.fecha)}</td>
          <td>
            <strong>${E(t.concepto)}</strong>
            <span>${E(t.observaciones||"Sin observaciones")}</span>
          </td>
          <td>
            <span class="expense-category-badge ${Nr(t.categoria)}">
              ${E(t.categoria)}
            </span>
          </td>
          <td><strong class="expense-amount">${Xe(t.monto)}</strong></td>
          <td><span class="expense-payment-badge">${E(t.metodoPago)}</span></td>
          <td>${E(t.comprobante||"Sin comprobante")}</td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost expenses-action expenses-action--edit" type="button" data-gasto-edit="${E(t.id)}" title="Editar gasto" aria-label="Editar gasto ${E(t.id)}">
                ${K.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger expenses-action expenses-action--delete" type="button" data-gasto-delete="${E(t.id)}" title="Eliminar gasto" aria-label="Eliminar gasto ${E(t.id)}">
                ${K.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `).join(""),Dr=({gastos:e,summary:t,editingGasto:a=null,filters:s,errors:r={}})=>{const o=a?"Editar gasto":"Registrar gasto",l=a?"Actualizar gasto":"Registrar gasto";return`
    <section class="module-view module-view--gastos" aria-label="Gastos">
      ${qr(t)}

      <div class="clientes-layout">
        <form class="panel cliente-form expenses-form-card" data-gastos-form>
          <input type="hidden" name="id" value="${E((a==null?void 0:a.id)??"")}" />

          <div class="panel__header">
            <h3><span class="section-icon expenses-section-icon">${K.wallet}</span>${o}</h3>
            ${a?'<button class="button button--ghost" type="button" data-gastos-cancel>Cancelar</button>':""}
          </div>

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${E((a==null?void 0:a.fecha)??new Date().toISOString().slice(0,10))}" />
              ${Ce("fecha",r)}
            </label>

            <label class="field">
              <span>Categoría</span>
              <select name="categoria">
                ${yt(qe,(a==null?void 0:a.categoria)??qe[0])}
              </select>
              ${Ce("categoria",r)}
            </label>

            <label class="field field--full">
              <span>Concepto</span>
              <input name="concepto" type="text" value="${E((a==null?void 0:a.concepto)??"")}" />
              ${Ce("concepto",r)}
            </label>

            <label class="field">
              <span>Monto</span>
              <input name="monto" type="number" min="0" step="0.01" value="${E((a==null?void 0:a.monto)??0)}" />
              ${Ce("monto",r)}
            </label>

            <label class="field">
              <span>Método de pago</span>
              <select name="metodoPago">
                ${yt(at,(a==null?void 0:a.metodoPago)??at[0])}
              </select>
              ${Ce("metodoPago",r)}
            </label>

            <label class="field field--full">
              <span>Comprobante</span>
              <input name="comprobante" type="text" value="${E((a==null?void 0:a.comprobante)??"")}" placeholder="Factura, boleta, recibo o referencia" />
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${E((a==null?void 0:a.observaciones)??"")}</textarea>
            </label>
          </div>

          <button class="button button--primary expenses-submit" type="submit">
            ${K.receipt}
            <span>${l}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel expenses-table-card" aria-label="Listado de gastos">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon expenses-section-icon">${K.receipt}</span>Listado de gastos</h3>
              <p>${e.length} registro${e.length===1?"":"s"}</p>
            </div>
            <div class="filters-row">
              <label class="search-field">
                <span>Filtrar por fecha</span>
                <input name="gastoFecha" type="date" value="${E(s.fecha)}" data-gastos-date-filter />
              </label>
              <label class="search-field">
                <span>Filtrar por categoría</span>
                <select name="gastoCategoria" data-gastos-category-filter>
                  <option value="">Todas</option>
                  ${yt(qe,s.categoria)}
                </select>
              </label>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th>Categoria</th>
                  <th>Monto</th>
                  <th>Pago</th>
                  <th>Comprobante</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${Or(e)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `},R={filters:{fecha:"",categoria:""},editingGastoId:null,errors:{}},xr=e=>Object.fromEntries(new FormData(e).entries()),Jt=()=>{window.dispatchEvent(new CustomEvent("apx:sidebar-summary-change"))},Fr=()=>Lr(R.filters),jr=()=>{var i,p;const e=Rr(),t=new Date().toISOString().slice(0,10),a=t.slice(0,7),s=e.filter(n=>n.fecha===t),r=e.filter(n=>{var c;return(c=n.fecha)==null?void 0:c.startsWith(a)}),o=e.reduce((n,c)=>(n[c.categoria]=(n[c.categoria]??0)+1,n),{}),l=((i=Object.entries(o).sort((n,c)=>c[1]-n[1])[0])==null?void 0:i[0])??"Sin datos";return{gastosDia:s.reduce((n,c)=>n+Number(c.monto||0),0),gastosMes:r.reduce((n,c)=>n+Number(c.monto||0),0),categoriaMasUsada:l,ultimoGasto:((p=e[0])==null?void 0:p.monto)??0}},La=()=>Dr({gastos:Fr(),summary:jr(),editingGasto:R.editingGastoId?Pr(R.editingGastoId):null,filters:R.filters,errors:R.errors}),zr=e=>{const t=()=>{e.innerHTML=La()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-gastos-form]");if(!s)return;a.preventDefault();const r=xr(s),o=r.id?kr(r.id,r):Br(r);if(!o.ok){R.errors=o.errors,t();return}R.editingGastoId=null,R.errors={},t(),Jt()}),e.addEventListener("change",a=>{const s=a.target.closest("[data-gastos-date-filter]"),r=a.target.closest("[data-gastos-category-filter]");if(s){R.filters.fecha=s.value,t();return}r&&(R.filters.categoria=r.value,t())}),e.addEventListener("click",a=>{const s=a.target.closest("[data-gasto-edit]"),r=a.target.closest("[data-gasto-delete]"),o=a.target.closest("[data-gastos-cancel]");if(s){R.editingGastoId=s.dataset.gastoEdit,R.errors={},t(),Jt();return}if(r){const l=r.dataset.gastoDelete;Tr(l),R.editingGastoId===l&&(R.editingGastoId=null),R.errors={},t();return}o&&(R.editingGastoId=null,R.errors={},t())})},Be="ordenes",Oe=["Pendiente","En proceso","Terminado","Entregado","Cancelado"],st=["Baja","Media","Alta","Urgente"],he=e=>{const t=Number(e);return Number.isFinite(t)?t:0},Vr=(e,t)=>he(e)-he(t),Qt=e=>{var s,r,o;const t=he(e.montoEstimado),a=he(e.adelanto);return{fecha:e.fecha||new Date().toISOString().slice(0,10),clienteId:e.clienteId??"",tipoServicio:((s=e.tipoServicio)==null?void 0:s.trim())??"",descripcionTrabajo:((r=e.descripcionTrabajo)==null?void 0:r.trim())??"",montoEstimado:t,adelanto:a,saldo:Vr(t,a),fechaEntrega:e.fechaEntrega??"",estado:e.estado??Oe[0],prioridad:e.prioridad??st[1],observaciones:((o=e.observaciones)==null?void 0:o.trim())??""}},ea=e=>{const t={};return f(e.fecha)||(t.fecha="La fecha es obligatoria."),f(e.clienteId)||(t.clienteId="Selecciona un cliente."),f(e.tipoServicio)||(t.tipoServicio="El tipo de servicio es obligatorio."),f(e.descripcionTrabajo)||(t.descripcionTrabajo="La descripcion del trabajo es obligatoria."),he(e.montoEstimado)<0&&(t.montoEstimado="El monto estimado no puede ser negativo."),he(e.adelanto)<0&&(t.adelanto="El adelanto no puede ser negativo."),Oe.includes(e.estado)||(t.estado="El estado no es valido."),st.includes(e.prioridad)||(t.prioridad="La prioridad no es valida."),t},Hr=(e=P)=>{const t=()=>e.getAll("clientes").sort((n,c)=>n.nombre.localeCompare(c.nombre)),a=n=>t().find(c=>c.id===n)??null,s=()=>e.getAll(Be).sort((n,c)=>new Date(c.fecha)-new Date(n.fecha));return{createOrden:n=>{const c=Qt(n),d=ea(c);return Object.keys(d).length>0?{ok:!1,errors:d}:{ok:!0,data:e.create(Be,c)}},deleteOrden:n=>e.delete(Be,n),filterOrdenes:({estado:n=""}={})=>s().filter(c=>n?c.estado===n:!0),findClienteById:a,findOrdenById:n=>e.findById(Be,n),getClientes:t,getOrdenes:s,updateOrden:(n,c)=>{const d=Qt(c),u=ea(d);return Object.keys(u).length>0?{ok:!1,errors:u}:{ok:!0,data:e.update(Be,n,d)}}}},le=Hr(),Ur=le.createOrden,Zr=le.deleteOrden,Gr=le.filterOrdenes,Kr=le.findClienteById,Xr=le.findOrdenById,Yr=le.getClientes,Wr=le.getOrdenes,Jr=le.updateOrden,g=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),$t=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),X={clipboard:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
      <path d="M9 4h6v4H9V4ZM8 12h8M8 16h6" />
    </svg>
  `,clipboardPlus:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
      <path d="M9 4h6v4H9V4ZM12 12v6M9 15h6" />
    </svg>
  `,clock:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  `,check:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,edit:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.5 4 4-.5L19 8.5 15.5 5 4 16.5Z" />
      <path d="m14 6.5 3.5 3.5" />
    </svg>
  `,trash:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `},_t=(e,t)=>e.map(a=>`
        <option value="${g(a)}"${a===t?" selected":""}>
          ${g(a)}
        </option>
      `).join(""),Qr=(e,t)=>e.map(a=>`
        <option value="${g(a.id)}"${a.id===t?" selected":""}>
          ${g(a.nombre)}
        </option>
      `).join(""),oe=(e,t)=>t[e]?`<small class="field-error">${g(t[e])}</small>`:"",eo=(e="")=>(e.trim().split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0]).join("")||"CL").toUpperCase(),to=e=>`order-status-badge--${String(e??"pendiente").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`,ao=e=>`order-priority-badge--${String(e??"media").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`,so=e=>Number(e)>0?"order-balance--pending":"order-balance--settled",ro=(e={})=>`
  <div class="orders-summary" aria-label="Resumen de órdenes">
    <article class="orders-summary-card orders-summary-card--primary">
      <span class="orders-summary-card__icon">${X.clipboard}</span>
      <div>
        <span class="orders-summary-card__label">Total de órdenes</span>
        <strong class="orders-summary-card__value">${Number(e.total)||0}</strong>
        <span class="orders-summary-card__helper">Flujo operativo completo</span>
      </div>
    </article>

    <article class="orders-summary-card orders-summary-card--warning">
      <span class="orders-summary-card__icon">${X.clock}</span>
      <div>
        <span class="orders-summary-card__label">Pendientes</span>
        <strong class="orders-summary-card__value">${Number(e.pending)||0}</strong>
        <span class="orders-summary-card__helper">Requieren atención inicial</span>
      </div>
    </article>

    <article class="orders-summary-card orders-summary-card--info">
      <span class="orders-summary-card__icon">${X.clipboardPlus}</span>
      <div>
        <span class="orders-summary-card__label">En proceso</span>
        <strong class="orders-summary-card__value">${Number(e.inProgress)||0}</strong>
        <span class="orders-summary-card__helper">Trabajo operativo activo</span>
      </div>
    </article>

    <article class="orders-summary-card orders-summary-card--teal">
      <span class="orders-summary-card__icon">${X.check}</span>
      <div>
        <span class="orders-summary-card__label">Entregadas</span>
        <strong class="orders-summary-card__value">${Number(e.delivered)||0}</strong>
        <span class="orders-summary-card__helper">Cerradas con entrega</span>
      </div>
    </article>
  </div>
`,oo=({ordenes:e,getClienteName:t})=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="10">
          <span class="empty-state__icon orders-empty-icon">${X.clipboard}</span>
          <strong>No hay órdenes de trabajo registradas.</strong>
          <span>Crea una orden para dar seguimiento operativo.</span>
        </td>
      </tr>
    `:e.map(a=>{const s=t(a.clienteId);return`
        <tr>
          <td>${g(a.id)}</td>
          <td>${J(a.fecha)}</td>
          <td>
            <div class="order-client-cell">
              <span class="order-client-avatar" aria-hidden="true">${g(eo(s))}</span>
              <div>
                <strong>${g(s)}</strong>
                <span>${g(a.clienteId)}</span>
              </div>
            </div>
          </td>
          <td>
            <strong>${g(a.tipoServicio)}</strong>
            <span>${g(a.descripcionTrabajo)}</span>
          </td>
          <td><strong class="order-amount">${$t(a.montoEstimado)}</strong></td>
          <td><strong class="order-advance">${$t(a.adelanto)}</strong></td>
          <td><strong class="order-balance ${so(a.saldo)}">${$t(a.saldo)}</strong></td>
          <td>${a.fechaEntrega?J(a.fechaEntrega):"Sin fecha"}</td>
          <td>
            <span class="order-status-badge ${to(a.estado)}">${g(a.estado)}</span>
            <span class="order-priority-badge ${ao(a.prioridad)}">${g(a.prioridad)}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost orders-action orders-action--edit" type="button" data-orden-edit="${g(a.id)}" title="Editar orden" aria-label="Editar orden ${g(a.id)}">
                ${X.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger orders-action orders-action--delete" type="button" data-orden-delete="${g(a.id)}" title="Eliminar orden" aria-label="Eliminar orden ${g(a.id)}">
                ${X.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),no=({ordenes:e,summary:t,clientes:a,editingOrden:s=null,filters:r,errors:o={},getClienteName:l})=>{const i=s?"Editar orden":"Nueva orden",p=s?"Actualizar orden":"Crear orden",n=a.length>0;return`
    <section class="module-view module-view--ordenes" aria-label="Órdenes de Trabajo">
      ${ro(t)}

      <div class="clientes-layout">
        <form class="panel cliente-form orders-form-card" data-ordenes-form>
          <input type="hidden" name="id" value="${g((s==null?void 0:s.id)??"")}" />

          <div class="panel__header">
            <h3><span class="section-icon orders-section-icon">${X.clipboardPlus}</span>${i}</h3>
            ${s?'<button class="button button--ghost" type="button" data-ordenes-cancel>Cancelar</button>':""}
          </div>

          ${n?"":'<p class="dependency-warning">Registra al menos un cliente antes de crear órdenes.</p>'}

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${g((s==null?void 0:s.fecha)??new Date().toISOString().slice(0,10))}" />
              ${oe("fecha",o)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${Qr(a,s==null?void 0:s.clienteId)}
              </select>
              ${oe("clienteId",o)}
            </label>

            <label class="field field--full">
              <span>Tipo de servicio</span>
              <input name="tipoServicio" type="text" value="${g((s==null?void 0:s.tipoServicio)??"")}" />
              ${oe("tipoServicio",o)}
            </label>

            <label class="field field--full">
              <span>Descripción del trabajo</span>
              <textarea name="descripcionTrabajo" rows="3">${g((s==null?void 0:s.descripcionTrabajo)??"")}</textarea>
              ${oe("descripcionTrabajo",o)}
            </label>

            <label class="field">
              <span>Monto estimado</span>
              <input name="montoEstimado" type="number" min="0" step="0.01" value="${g((s==null?void 0:s.montoEstimado)??0)}" />
              ${oe("montoEstimado",o)}
            </label>

            <label class="field">
              <span>Adelanto</span>
              <input name="adelanto" type="number" min="0" step="0.01" value="${g((s==null?void 0:s.adelanto)??0)}" />
              ${oe("adelanto",o)}
            </label>

            <label class="field">
              <span>Fecha de entrega</span>
              <input name="fechaEntrega" type="date" value="${g((s==null?void 0:s.fechaEntrega)??"")}" />
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${_t(Oe,(s==null?void 0:s.estado)??Oe[0])}
              </select>
              ${oe("estado",o)}
            </label>

            <label class="field">
              <span>Prioridad</span>
              <select name="prioridad">
                ${_t(st,(s==null?void 0:s.prioridad)??st[1])}
              </select>
              ${oe("prioridad",o)}
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${g((s==null?void 0:s.observaciones)??"")}</textarea>
            </label>
          </div>

          <button class="button button--primary orders-submit" type="submit"${n?"":" disabled"}>
            ${X.clipboardPlus}
            <span>${p}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel orders-table-card" aria-label="Listado de órdenes">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon orders-section-icon">${X.clipboard}</span>Listado de órdenes</h3>
              <p>${e.length} registro${e.length===1?"":"s"}</p>
            </div>
            <div class="filters-row orders-filters-row">
              <label class="search-field orders-status-filter">
                <span>Filtrar por estado</span>
                <select name="ordenEstado" data-ordenes-status-filter>
                  <option value="">Todos</option>
                  ${_t(Oe,r.estado)}
                </select>
              </label>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table data-table--wide">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Trabajo</th>
                  <th>Estimado</th>
                  <th>Adelanto</th>
                  <th>Saldo</th>
                  <th>Entrega</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${oo({ordenes:e,getClienteName:l})}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `},N={filters:{estado:""},editingOrdenId:null,errors:{}},co=e=>Object.fromEntries(new FormData(e).entries()),lo=e=>{var t;return((t=Kr(e))==null?void 0:t.nombre)??"Cliente no encontrado"},io=()=>Gr(N.filters),po=()=>{const e=Wr();return{total:e.length,pending:e.filter(t=>t.estado==="Pendiente").length,inProgress:e.filter(t=>t.estado==="En proceso").length,delivered:e.filter(t=>t.estado==="Entregado").length}},Pa=()=>no({ordenes:io(),summary:po(),clientes:Yr(),editingOrden:N.editingOrdenId?Xr(N.editingOrdenId):null,filters:N.filters,errors:N.errors,getClienteName:lo}),uo=e=>{const t=()=>{e.innerHTML=Pa()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-ordenes-form]");if(!s)return;a.preventDefault();const r=co(s),o=r.id?Jr(r.id,r):Ur(r);if(!o.ok){N.errors=o.errors,t();return}N.editingOrdenId=null,N.errors={},t()}),e.addEventListener("change",a=>{const s=a.target.closest("[data-ordenes-status-filter]");s&&(N.filters.estado=s.value,t())}),e.addEventListener("click",a=>{const s=a.target.closest("[data-orden-edit]"),r=a.target.closest("[data-orden-delete]"),o=a.target.closest("[data-ordenes-cancel]");if(s){N.editingOrdenId=s.dataset.ordenEdit,N.errors={},t();return}if(r){const l=r.dataset.ordenDelete;Zr(l),N.editingOrdenId===l&&(N.editingOrdenId=null),N.errors={},t();return}o&&(N.editingOrdenId=null,N.errors={},t())})},Ra=["Entregado","Sin solución","Sin solucion"],ve=e=>{const t=Number(e);return Number.isFinite(t)?t:0},mo=({fechaInicio:e="",fechaFin:t=""}={})=>({fechaInicio:e,fechaFin:t}),ta=(e,t)=>!(!e||t.fechaInicio&&e<t.fechaInicio||t.fechaFin&&e>t.fechaFin),aa=(e,t)=>e.reduce((a,s)=>a+ve(s[t]),0),sa=(e,t)=>{const a=new Map;return e.forEach(s=>{const r=a.get(s.fecha)??0;a.set(s.fecha,r+ve(s[t]))}),[...a.entries()].map(([s,r])=>({fecha:s,total:r})).sort((s,r)=>r.fecha.localeCompare(s.fecha))},ra=(e,t)=>{const a=new Map;return e.forEach(s=>{var l;const r=(l=s.fecha)==null?void 0:l.slice(0,7);if(!r)return;const o=a.get(r)??0;a.set(r,o+ve(s[t]))}),[...a.entries()].map(([s,r])=>({mes:s,total:r})).sort((s,r)=>r.mes.localeCompare(s.mes))},oa=({primaryRows:e,secondaryRows:t,keyName:a})=>[...new Set([...e.map(r=>r[a]),...t.map(r=>r[a])])].map(r=>{const o=e.find(i=>i[a]===r),l=t.find(i=>i[a]===r);return{[a]:r,total:((o==null?void 0:o.total)??0)-((l==null?void 0:l.total)??0)}}).sort((r,o)=>o[a].localeCompare(r[a])),ht=(e,t,a,s)=>{var r;return((r=e.find(o=>o.id===t))==null?void 0:r[a])??s},ho=(e,t)=>{const a=new Map;return e.forEach(s=>{const r=a.get(s.servicioId)??{servicioId:s.servicioId,nombre:ht(t,s.servicioId,"nombreServicio","Servicio no encontrado"),cantidad:0,total:0};a.set(s.servicioId,{...r,cantidad:r.cantidad+ve(s.cantidad),total:r.total+ve(s.montoTotal)})}),[...a.values()].sort((s,r)=>r.cantidad-s.cantidad||r.total-s.total).slice(0,5)},vo=(e,t)=>{const a=new Map;return e.forEach(s=>{const r=a.get(s.clienteId)??{clienteId:s.clienteId,nombre:ht(t,s.clienteId,"nombre","Cliente no encontrado"),ventas:0,total:0};a.set(s.clienteId,{...r,ventas:r.ventas+1,total:r.total+ve(s.montoTotal)})}),[...a.values()].sort((s,r)=>r.ventas-s.ventas||r.total-s.total).slice(0,5)},bo=(e,t)=>e.filter(a=>["Pendiente","En proceso"].includes(a.estado)).map(a=>({...a,clienteNombre:ht(t,a.clienteId,"nombre","Cliente no encontrado")})).sort((a,s)=>a.fecha.localeCompare(s.fecha)).slice(0,8),go=(e,t,a)=>e.filter(s=>!Ra.includes(s.estado)).map(s=>{const r=t.find(o=>o.id===s.equipoId);return{...s,clienteNombre:ht(a,s.clienteId,"nombre","Cliente no encontrado"),equipoNombre:r?`${r.tipoEquipo} ${r.marca} ${r.modelo} (${r.serie})`:"Equipo no encontrado"}}).sort((s,r)=>r.fecha.localeCompare(s.fecha)).slice(0,8),fo=(e=P)=>({getReportesData:(a={})=>{const s=mo(a),r=e.getAll("clientes"),o=e.getAll("servicios"),l=e.getAll("ventas").filter(z=>ta(z.fecha,s)),i=e.getAll("gastos").filter(z=>ta(z.fecha,s)),p=e.getAll("ordenes"),n=e.getAll("equipos"),c=e.getAll("soporte"),d=sa(l,"montoTotal"),u=sa(i,"monto"),b=ra(l,"montoTotal"),w=ra(i,"monto"),k=aa(l,"montoTotal"),j=aa(i,"monto");return{filters:s,resumen:{ingresosTotal:k,gastosTotal:j,utilidadTotal:k-j,ordenesPendientes:p.filter(z=>["Pendiente","En proceso"].includes(z.estado)).length,equiposEnSoporte:c.filter(z=>!Ra.includes(z.estado)).length},ingresosPorDia:d,gastosPorDia:u,utilidadDiaria:oa({primaryRows:d,secondaryRows:u,keyName:"fecha"}),ingresosPorMes:b,gastosPorMes:w,gananciaMensual:oa({primaryRows:b,secondaryRows:w,keyName:"mes"}),serviciosMasVendidos:ho(l,o),clientesFrecuentes:vo(l,r),ordenesPendientes:bo(p,r),equiposEnSoporte:go(c,n,r)}}}),yo=fo(),$o=yo.getReportesData,S=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),me=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),M={chart:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19h16" />
      <path d="M7 16V9M12 16V5M17 16v-7" />
    </svg>
  `,filter:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />
    </svg>
  `,coinUp:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z" />
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8" />
      <path d="m9 17 3-3 3 3" />
    </svg>
  `,walletDown:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v2.25h-4.25a3.25 3.25 0 0 0 0 6.5H20V17a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M15.75 10.75H21v3.5h-5.25a1.75 1.75 0 1 1 0-3.5Z" />
      <path d="m9 11 3 3 3-3" />
    </svg>
  `,trending:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17 10 11l4 4 6-8" />
      <path d="M16 7h4v4" />
    </svg>
  `,clipboard:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
      <path d="M9 4h6v4H9V4ZM8 12h8M8 16h6" />
    </svg>
  `,monitor:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H4V5Z" />
      <path d="M9 21h6M12 16v5" />
    </svg>
  `,refresh:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6v5h-5" />
      <path d="M4 18v-5h5" />
      <path d="M18.5 9A7 7 0 0 0 6.1 6.1L4 8M5.5 15a7 7 0 0 0 12.4 2.9L20 16" />
    </svg>
  `,document:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7V3Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  `},_o=e=>[{className:"reports-summary-card--income",icon:M.coinUp,label:"Ingresos filtrados",value:me(e.ingresosTotal),helper:"Ventas dentro del rango"},{className:"reports-summary-card--expense",icon:M.walletDown,label:"Gastos filtrados",value:me(e.gastosTotal),helper:"Egresos dentro del rango"},{className:"reports-summary-card--profit",icon:M.trending,label:"Utilidad filtrada",value:me(e.utilidadTotal),helper:"Ingresos menos gastos"},{className:"reports-summary-card--orders",icon:M.clipboard,label:"Órdenes pendientes",value:e.ordenesPendientes,helper:"Pendientes o en proceso"},{className:"reports-summary-card--equipment",icon:M.monitor,label:"Equipos en soporte",value:e.equiposEnSoporte,helper:"Casos técnicos activos"}].map(a=>`
        <article class="reports-summary-card ${a.className}">
          <span class="reports-summary-card__icon">${a.icon}</span>
          <div>
            <span class="reports-summary-card__label">${S(a.label)}</span>
            <strong class="reports-summary-card__value">${S(a.value)}</strong>
            <span class="reports-summary-card__helper">${S(a.helper)}</span>
          </div>
        </article>
      `).join(""),Ue=({title:e,helper:t,colspan:a})=>`
  <tr>
    <td class="empty-state reports-empty-state" colspan="${a}">
      <span class="empty-state__icon reports-empty-icon">${M.document}</span>
      <strong>${S(e)}</strong>
      <span>${S(t)}</span>
    </td>
  </tr>
`,ue=({rows:e,labelField:t,emptyTitle:a,emptyHelper:s})=>e.length===0?Ue({title:a,helper:s,colspan:2}):e.slice(0,8).map(r=>`
        <tr>
          <td>${S(r[t])}</td>
          <td><strong class="reports-money">${me(r.total)}</strong></td>
        </tr>
      `).join(""),Eo=e=>e.length===0?Ue({title:"No hay servicios vendidos.",helper:"Registra ventas para ver el ranking.",colspan:3}):e.map(t=>`
        <tr>
          <td>${S(t.nombre)}</td>
          <td>${S(t.cantidad)}</td>
          <td><strong class="reports-money">${me(t.total)}</strong></td>
        </tr>
      `).join(""),So=e=>e.length===0?Ue({title:"No hay clientes frecuentes.",helper:"Las ventas registradas alimentan este reporte.",colspan:3}):e.map(t=>`
        <tr>
          <td>${S(t.nombre)}</td>
          <td>${S(t.ventas)}</td>
          <td><strong class="reports-money">${me(t.total)}</strong></td>
        </tr>
      `).join(""),wo=e=>e.length===0?Ue({title:"No hay órdenes pendientes.",helper:"Las órdenes abiertas aparecerán aquí.",colspan:4}):e.map(t=>`
        <tr>
          <td>${S(t.id)}</td>
          <td>${J(t.fecha)}</td>
          <td>${S(t.clienteNombre)}</td>
          <td><span class="reports-status-badge">${S(t.estado)}</span></td>
        </tr>
      `).join(""),Io=e=>e.length===0?Ue({title:"No hay equipos en soporte.",helper:"Los casos activos se mostrarán en esta tabla.",colspan:4}):e.map(t=>`
        <tr>
          <td>${S(t.id)}</td>
          <td>${S(t.clienteNombre)}</td>
          <td>${S(t.equipoNombre)}</td>
          <td><span class="reports-status-badge">${S(t.estado)}</span></td>
        </tr>
      `).join(""),U=({title:e,icon:t,headers:a,body:s,variant:r=""})=>`
  <section class="panel dashboard-table-panel reports-table-panel ${r}">
    <div class="panel__header">
      <h3><span class="section-icon reports-section-icon">${t}</span>${S(e)}</h3>
    </div>
    <div class="table-wrapper">
      <table class="data-table data-table--compact">
        <thead>
          <tr>${a.map(o=>`<th>${S(o)}</th>`).join("")}</tr>
        </thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  </section>
`,Mo=e=>`
  <section class="module-view module-view--reportes" aria-label="Reportes">
    <form class="panel report-filters reports-filter-card" data-reportes-filters>
      <div class="reports-filter-card__header">
        <h3><span class="section-icon reports-section-icon">${M.filter}</span>Filtros</h3>
      </div>
      <label class="field reports-date-field">
        <span>Fecha inicio</span>
        <input name="fechaInicio" type="date" value="${S(e.filters.fechaInicio)}" />
      </label>
      <label class="field reports-date-field">
        <span>Fecha fin</span>
        <input name="fechaFin" type="date" value="${S(e.filters.fechaFin)}" />
      </label>
      <button class="button button--primary report-filters__button reports-apply-button" type="submit">
        ${M.chart}
        <span>Aplicar filtros</span>
      </button>
      <button class="button button--ghost reports-clear-button" type="button" data-reportes-clear>
        ${M.refresh}
        <span>Limpiar</span>
      </button>
    </form>

    <div class="reports-summary" aria-label="Resumen de reportes">
      ${_o(e.resumen)}
    </div>

    <div class="reports-grid">
      ${U({title:"Ingresos por día",icon:M.coinUp,headers:["Fecha","Ingresos"],variant:"reports-table-panel--income",body:ue({rows:e.ingresosPorDia,labelField:"fecha",emptyTitle:"No hay ingresos en el rango.",emptyHelper:"Ajusta el filtro o registra ventas para generar el reporte."})})}
      ${U({title:"Gastos por día",icon:M.walletDown,headers:["Fecha","Gastos"],variant:"reports-table-panel--expense",body:ue({rows:e.gastosPorDia,labelField:"fecha",emptyTitle:"No hay gastos en el rango.",emptyHelper:"Ajusta el filtro o registra gastos para generar el reporte."})})}
      ${U({title:"Utilidad diaria",icon:M.trending,headers:["Fecha","Utilidad"],body:ue({rows:e.utilidadDiaria,labelField:"fecha",emptyTitle:"No hay utilidad diaria en el rango.",emptyHelper:"Ajusta el filtro para analizar la utilidad."})})}
      ${U({title:"Ingresos por mes",icon:M.coinUp,headers:["Mes","Ingresos"],body:ue({rows:e.ingresosPorMes,labelField:"mes",emptyTitle:"No hay ingresos mensuales.",emptyHelper:"Registra ventas para generar el reporte mensual."})})}
      ${U({title:"Gastos por mes",icon:M.walletDown,headers:["Mes","Gastos"],body:ue({rows:e.gastosPorMes,labelField:"mes",emptyTitle:"No hay gastos mensuales.",emptyHelper:"Registra gastos para generar el reporte mensual."})})}
      ${U({title:"Ganancia mensual",icon:M.trending,headers:["Mes","Ganancia"],body:ue({rows:e.gananciaMensual,labelField:"mes",emptyTitle:"No hay ganancia mensual.",emptyHelper:"Ajusta el rango o registra movimientos."})})}
      ${U({title:"Servicios más vendidos",icon:M.chart,headers:["Servicio","Cantidad","Total"],body:Eo(e.serviciosMasVendidos)})}
      ${U({title:"Clientes frecuentes",icon:M.chart,headers:["Cliente","Ventas","Total"],body:So(e.clientesFrecuentes)})}
      ${U({title:"Órdenes pendientes",icon:M.clipboard,headers:["ID","Fecha","Cliente","Estado"],body:wo(e.ordenesPendientes)})}
      ${U({title:"Equipos en soporte",icon:M.monitor,headers:["ID","Cliente","Equipo","Estado"],body:Io(e.equiposEnSoporte)})}
    </div>
  </section>
`,Ne={filters:{fechaInicio:"",fechaFin:""}},Ao=e=>Object.fromEntries(new FormData(e).entries()),ka=()=>Mo($o(Ne.filters)),Co=e=>{const t=()=>{e.innerHTML=ka()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-reportes-filters]");s&&(a.preventDefault(),Ne.filters={...Ne.filters,...Ao(s)},t())}),e.addEventListener("click",a=>{a.target.closest("[data-reportes-clear]")&&(Ne.filters.fechaInicio="",Ne.filters.fechaFin="",t())})},Te="servicios",rt=["Activo","Inactivo"],ot=["Tecnico","Instalacion","Mantenimiento","Consultoria","Otro"],be=e=>{const t=Number(e);return Number.isFinite(t)?t:0},Bo=(e,t)=>be(e)-be(t),na=e=>{var s,r;const t=be(e.precioBase),a=be(e.costoEstimado);return{nombreServicio:((s=e.nombreServicio)==null?void 0:s.trim())??"",categoria:e.categoria??ot[0],descripcion:((r=e.descripcion)==null?void 0:r.trim())??"",precioBase:t,costoEstimado:a,gananciaEstimada:Bo(t,a),estado:e.estado??rt[0]}},ca=e=>{const t={};return f(e.nombreServicio)||(t.nombreServicio="El nombre del servicio es obligatorio."),ot.includes(e.categoria)||(t.categoria="La categoria no es valida."),be(e.precioBase)<0&&(t.precioBase="El precio base no puede ser negativo."),be(e.costoEstimado)<0&&(t.costoEstimado="El costo estimado no puede ser negativo."),rt.includes(e.estado)||(t.estado="El estado no es valido."),t},To=(e=P)=>{const t=()=>e.getAll(Te).sort((i,p)=>i.nombreServicio.localeCompare(p.nombreServicio));return{createServicio:i=>{const p=na(i),n=ca(p);return Object.keys(n).length>0?{ok:!1,errors:n}:{ok:!0,data:e.create(Te,p)}},deleteServicio:i=>e.delete(Te,i),findServicioById:i=>e.findById(Te,i),getServicios:t,searchServicios:(i="")=>{const p=i.trim().toLowerCase();return p?t().filter(n=>[n.id,n.nombreServicio,n.categoria,n.descripcion,n.estado].filter(Boolean).some(c=>String(c).toLowerCase().includes(p))):t()},updateServicio:(i,p)=>{const n=na(p),c=ca(n);return Object.keys(c).length>0?{ok:!1,errors:c}:{ok:!0,data:e.update(Te,i,n)}}}},_e=To(),Lo=_e.createServicio,Po=_e.deleteServicio,Ro=_e.findServicioById,ko=_e.getServicios,No=_e.searchServicios,qo=_e.updateServicio,A=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),De=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),Y={tag:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5V5h7.5L20 13.5 13.5 20 4 12.5Z" />
      <path d="M8.5 8.5h.01" />
    </svg>
  `,tools:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m14 7 3-3 3 3-3 3-3-3Z" />
      <path d="M5 19 15.5 8.5" />
      <path d="m4 14 6 6" />
      <path d="M7 11 3 7l4-4 4 4" />
    </svg>
  `,plusTag:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5V5h7.5L20 13.5 13.5 20 4 12.5Z" />
      <path d="M8 9h5M10.5 6.5v5" />
    </svg>
  `,coin:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z" />
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8" />
      <path d="M20 12c0 2.76-3.58 5-8 5s-8-2.24-8-5" />
    </svg>
  `,chart:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19h16" />
      <path d="m6 15 4-4 3 3 5-7" />
      <path d="M15 7h3v3" />
    </svg>
  `,check:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,edit:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.5 4 4-.5L19 8.5 15.5 5 4 16.5Z" />
      <path d="m14 6.5 3.5 3.5" />
    </svg>
  `,trash:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `},la=(e,t)=>e.map(a=>`
        <option value="${A(a)}"${a===t?" selected":""}>
          ${A(a)}
        </option>
      `).join(""),Le=(e,t)=>t[e]?`<small class="field-error">${A(t[e])}</small>`:"",Oo=(e="")=>(e.trim()[0]||"S").toUpperCase(),Do=e=>e==="Activo"?"service-status-badge--active":"service-status-badge--inactive",xo=e=>Number(e)>=0?"service-profit--positive":"service-profit--negative",Fo=e=>`service-category-badge--${String(e??"otro").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`,jo=(e={})=>`
  <div class="services-summary" aria-label="Resumen de servicios">
    <article class="services-summary-card services-summary-card--primary">
      <span class="services-summary-card__icon">${Y.tag}</span>
      <div>
        <span class="services-summary-card__label">Total de servicios</span>
        <strong class="services-summary-card__value">${Number(e.total)||0}</strong>
        <span class="services-summary-card__helper">Catálogo operativo actual</span>
      </div>
    </article>

    <article class="services-summary-card services-summary-card--info">
      <span class="services-summary-card__icon">${Y.check}</span>
      <div>
        <span class="services-summary-card__label">Servicios activos</span>
        <strong class="services-summary-card__value">${Number(e.active)||0}</strong>
        <span class="services-summary-card__helper">Disponibles para venta</span>
      </div>
    </article>

    <article class="services-summary-card services-summary-card--dark">
      <span class="services-summary-card__icon">${Y.coin}</span>
      <div>
        <span class="services-summary-card__label">Precio promedio</span>
        <strong class="services-summary-card__value">${De(e.averagePrice)}</strong>
        <span class="services-summary-card__helper">Promedio del catálogo</span>
      </div>
    </article>

    <article class="services-summary-card services-summary-card--teal">
      <span class="services-summary-card__icon">${Y.chart}</span>
      <div>
        <span class="services-summary-card__label">Ganancia estimada</span>
        <strong class="services-summary-card__value">${De(e.estimatedProfit)}</strong>
        <span class="services-summary-card__helper">Precio base menos costo</span>
      </div>
    </article>
  </div>
`,zo=e=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="8">
          <span class="empty-state__icon services-empty-icon">${Y.tools}</span>
          <strong>No hay servicios registrados.</strong>
          <span>Agrega tu primer servicio para construir tu catálogo comercial.</span>
        </td>
      </tr>
    `:e.map(t=>`
        <tr>
          <td>${A(t.id)}</td>
          <td>
            <div class="service-cell">
              <span class="service-avatar" aria-hidden="true">${A(Oo(t.nombreServicio))}</span>
              <div>
                <strong>${A(t.nombreServicio)}</strong>
                <span>${A(t.descripcion||"Sin descripción")}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="service-category-badge ${Fo(t.categoria)}">
              ${A(t.categoria)}
            </span>
          </td>
          <td><strong class="service-price">${De(t.precioBase)}</strong></td>
          <td><span class="service-cost">${De(t.costoEstimado)}</span></td>
          <td><strong class="service-profit ${xo(t.gananciaEstimada)}">${De(t.gananciaEstimada)}</strong></td>
          <td>
            <span class="service-status-badge ${Do(t.estado)}">
              ${A(t.estado)}
            </span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost services-action services-action--edit" type="button" data-servicio-edit="${A(t.id)}" title="Editar servicio" aria-label="Editar servicio ${A(t.id)}">
                ${Y.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger services-action services-action--delete" type="button" data-servicio-delete="${A(t.id)}" title="Eliminar servicio" aria-label="Eliminar servicio ${A(t.id)}">
                ${Y.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `).join(""),Vo=({servicios:e,summary:t,editingServicio:a=null,searchTerm:s="",errors:r={}})=>{const o=a?"Editar servicio":"Nuevo servicio",l=a?"Actualizar servicio":"Crear servicio";return`
    <section class="module-view module-view--servicios" aria-label="Servicios">
      ${jo(t)}

      <div class="clientes-layout">
        <form class="panel cliente-form services-form-card" data-servicios-form>
          <input type="hidden" name="id" value="${A((a==null?void 0:a.id)??"")}" />

          <div class="panel__header">
            <h3><span class="section-icon services-section-icon">${Y.plusTag}</span>${o}</h3>
            ${a?'<button class="button button--ghost" type="button" data-servicios-cancel>Cancelar</button>':""}
          </div>

          <div class="form-grid">
            <label class="field field--full">
              <span>Nombre del servicio</span>
              <input name="nombreServicio" type="text" value="${A((a==null?void 0:a.nombreServicio)??"")}" />
              ${Le("nombreServicio",r)}
            </label>

            <label class="field">
              <span>Categoría</span>
              <select name="categoria">
                ${la(ot,(a==null?void 0:a.categoria)??ot[0])}
              </select>
              ${Le("categoria",r)}
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${la(rt,(a==null?void 0:a.estado)??rt[0])}
              </select>
              ${Le("estado",r)}
            </label>

            <label class="field">
              <span>Precio base</span>
              <input name="precioBase" type="number" min="0" step="0.01" value="${A((a==null?void 0:a.precioBase)??0)}" />
              ${Le("precioBase",r)}
            </label>

            <label class="field">
              <span>Costo estimado</span>
              <input name="costoEstimado" type="number" min="0" step="0.01" value="${A((a==null?void 0:a.costoEstimado)??0)}" />
              ${Le("costoEstimado",r)}
            </label>

            <label class="field field--full">
              <span>Descripción</span>
              <textarea name="descripcion" rows="4">${A((a==null?void 0:a.descripcion)??"")}</textarea>
            </label>
          </div>

          <button class="button button--primary services-submit" type="submit">
            ${Y.plusTag}
            <span>${l}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel services-table-card" aria-label="Listado de servicios">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon services-section-icon">${Y.tools}</span>Listado de servicios</h3>
              <p>${e.length} registro${e.length===1?"":"s"}</p>
            </div>
            <label class="search-field services-search-field">
              <span>Buscar servicio</span>
              <input
                name="servicioSearch"
                type="search"
                value="${A(s)}"
                placeholder="Nombre, categoría, descripción o estado"
                data-servicios-search
              />
            </label>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Servicio</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Costo</th>
                  <th>Ganancia</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${zo(e)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `},L={searchTerm:"",editingServicioId:null,errors:{}},Ho=e=>Object.fromEntries(new FormData(e).entries()),Uo=()=>No(L.searchTerm),Zo=()=>{const e=ko(),t=e.reduce((s,r)=>s+Number(r.precioBase||0),0),a=e.reduce((s,r)=>s+Number(r.gananciaEstimada||0),0);return{total:e.length,active:e.filter(s=>s.estado==="Activo").length,averagePrice:e.length>0?t/e.length:0,estimatedProfit:a}},Na=()=>Vo({servicios:Uo(),summary:Zo(),editingServicio:L.editingServicioId?Ro(L.editingServicioId):null,searchTerm:L.searchTerm,errors:L.errors}),Go=e=>{const t=()=>{e.innerHTML=Na()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-servicios-form]");if(!s)return;a.preventDefault();const r=Ho(s),o=r.id?qo(r.id,r):Lo(r);if(!o.ok){L.errors=o.errors,t();return}L.editingServicioId=null,L.errors={},t()}),e.addEventListener("input",a=>{const s=a.target.closest("[data-servicios-search]");if(!s)return;L.searchTerm=s.value,t();const r=e.querySelector("[data-servicios-search]");r==null||r.focus(),r==null||r.setSelectionRange(L.searchTerm.length,L.searchTerm.length)}),e.addEventListener("click",a=>{const s=a.target.closest("[data-servicio-edit]"),r=a.target.closest("[data-servicio-delete]"),o=a.target.closest("[data-servicios-cancel]");if(s){L.editingServicioId=s.dataset.servicioEdit,L.errors={},t();return}if(r){const l=r.dataset.servicioDelete;Po(l),L.editingServicioId===l&&(L.editingServicioId=null),L.errors={},t();return}o&&(L.editingServicioId=null,L.errors={},t())})},Pe="soporte",nt=["Recibido","Diagnosticado","En reparación","Listo","Entregado","Sin solución"],ct=["Sin garantia","Con garantia"],Ko={"En reparacion":"En reparación","Sin solucion":"Sin solución"},ge=e=>{const t=Number(e);return Number.isFinite(t)?t:0},Xo=(e,t)=>ge(e)+ge(t),ia=e=>{var s,r,o,l;const t=ge(e.costoServicio),a=ge(e.costoRepuestos);return{fecha:e.fecha||new Date().toISOString().slice(0,10),clienteId:e.clienteId??"",equipoId:e.equipoId??"",diagnostico:((s=e.diagnostico)==null?void 0:s.trim())??"",solucionAplicada:((r=e.solucionAplicada)==null?void 0:r.trim())??"",costoServicio:t,costoRepuestos:a,total:Xo(t,a),estado:Ko[e.estado]??e.estado??nt[0],tecnicoResponsable:((o=e.tecnicoResponsable)==null?void 0:o.trim())??"",garantia:e.garantia??ct[0],observaciones:((l=e.observaciones)==null?void 0:l.trim())??""}},da=e=>{const t={};return f(e.fecha)||(t.fecha="La fecha es obligatoria."),f(e.clienteId)||(t.clienteId="Selecciona un cliente."),f(e.equipoId)||(t.equipoId="Selecciona un equipo."),f(e.diagnostico)||(t.diagnostico="El diagnostico es obligatorio."),ge(e.costoServicio)<0&&(t.costoServicio="El costo de servicio no puede ser negativo."),ge(e.costoRepuestos)<0&&(t.costoRepuestos="El costo de repuestos no puede ser negativo."),nt.includes(e.estado)||(t.estado="El estado no es valido."),f(e.tecnicoResponsable)||(t.tecnicoResponsable="El tecnico responsable es obligatorio."),ct.includes(e.garantia)||(t.garantia="La garantia no es valida."),t},Yo=(e=P)=>{const t=()=>e.getAll("clientes").sort((c,d)=>c.nombre.localeCompare(d.nombre)),a=()=>e.getAll("equipos").sort((c,d)=>new Date(d.fechaRecepcion)-new Date(c.fechaRecepcion));return{createSoporte:c=>{const d=ia(c),u=da(d);return Object.keys(u).length>0?{ok:!1,errors:u}:{ok:!0,data:e.create(Pe,d)}},deleteSoporte:c=>e.delete(Pe,c),findClienteById:c=>t().find(d=>d.id===c)??null,findEquipoById:c=>a().find(d=>d.id===c)??null,findSoporteById:c=>e.findById(Pe,c),getClientes:t,getEquipos:a,getSoportes:()=>e.getAll(Pe).sort((c,d)=>new Date(d.fecha)-new Date(c.fecha)),updateSoporte:(c,d)=>{const u=ia(d),b=da(u);return Object.keys(b).length>0?{ok:!1,errors:b}:{ok:!0,data:e.update(Pe,c,u)}}}},se=Yo(),Wo=se.createSoporte,Jo=se.deleteSoporte,Qo=se.findClienteById,en=se.findEquipoById,tn=se.findSoporteById,an=se.getClientes,sn=se.getEquipos,qa=se.getSoportes,rn=se.updateSoporte,v=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),Ye=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),H={wrench:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.8 2.8-2-2 2.8-2.8Z" />
    </svg>
  `,wrenchPlus:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.8 2.8-2-2 2.8-2.8Z" />
      <path d="M19 15v5M16.5 17.5h5" />
    </svg>
  `,headset:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2ZM20 13v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
      <path d="M15 20h-3a2 2 0 0 1-2-2" />
    </svg>
  `,laptop:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h12v10H6V5Z" />
      <path d="M3 19h18l-2-4H5l-2 4Z" />
    </svg>
  `,check:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,coin:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z" />
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8" />
      <path d="M20 12c0 2.76-3.58 5-8 5s-8-2.24-8-5" />
    </svg>
  `,edit:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.5 4 4-.5L19 8.5 15.5 5 4 16.5Z" />
      <path d="m14 6.5 3.5 3.5" />
    </svg>
  `,trash:`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `},lt=e=>String(e??"").replace("En reparaciÃ³n","En reparación").replace("Sin soluciÃ³n","Sin solución").replace("garantia","garantía"),on=e=>lt(e).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),pa=(e,t)=>e.map(a=>`
        <option value="${v(a)}"${a===t?" selected":""}>
          ${v(lt(a))}
        </option>
      `).join(""),nn=(e,t)=>e.map(a=>`
        <option value="${v(a.id)}"${a.id===t?" selected":""}>
          ${v(a.nombre)}
        </option>
      `).join(""),cn=(e,t)=>e.map(a=>`
        <option value="${v(a.id)}"${a.id===t?" selected":""}>
          ${v(`${a.tipoEquipo} ${a.marca} ${a.modelo} - ${a.serie}`)}
        </option>
      `).join(""),ee=(e,t)=>t[e]?`<small class="field-error">${v(t[e])}</small>`:"",ln=(e="")=>(e.trim().split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0]).join("")||"ST").toUpperCase(),dn=(e={})=>`
  <div class="support-summary" aria-label="Resumen de soporte técnico">
    <article class="support-summary-card support-summary-card--primary">
      <span class="support-summary-card__icon">${H.headset}</span>
      <div>
        <span class="support-summary-card__label">Casos de soporte</span>
        <strong class="support-summary-card__value">${Number(e.totalCases)||0}</strong>
        <span class="support-summary-card__helper">Casos técnicos registrados</span>
      </div>
    </article>

    <article class="support-summary-card support-summary-card--warning">
      <span class="support-summary-card__icon">${H.wrench}</span>
      <div>
        <span class="support-summary-card__label">En reparación</span>
        <strong class="support-summary-card__value">${Number(e.repairing)||0}</strong>
        <span class="support-summary-card__helper">Trabajo técnico activo</span>
      </div>
    </article>

    <article class="support-summary-card support-summary-card--teal">
      <span class="support-summary-card__icon">${H.check}</span>
      <div>
        <span class="support-summary-card__label">Listos para entrega</span>
        <strong class="support-summary-card__value">${Number(e.ready)||0}</strong>
        <span class="support-summary-card__helper">Casos preparados</span>
      </div>
    </article>

    <article class="support-summary-card support-summary-card--dark">
      <span class="support-summary-card__icon">${H.coin}</span>
      <div>
        <span class="support-summary-card__label">Total servicios técnicos</span>
        <strong class="support-summary-card__value">${Ye(e.technicalTotal)}</strong>
        <span class="support-summary-card__helper">Servicios y repuestos</span>
      </div>
    </article>
  </div>
`,pn=({soportes:e,getClienteName:t,getEquipoName:a})=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="10">
          <span class="empty-state__icon support-empty-icon">${H.headset}</span>
          <strong>No hay casos de soporte técnico registrados.</strong>
          <span>Crea un caso para documentar diagnóstico, solución y costos.</span>
        </td>
      </tr>
    `:e.map(s=>{const r=t(s.clienteId);return`
        <tr>
          <td>${v(s.id)}</td>
          <td>${J(s.fecha)}</td>
          <td>
            <div class="support-client-cell">
              <span class="support-client-avatar" aria-hidden="true">${v(ln(r))}</span>
              <div>
                <strong>${v(r)}</strong>
                <span class="support-equipment-line">${H.laptop}${v(a(s.equipoId))}</span>
              </div>
            </div>
          </td>
          <td>
            <strong class="support-diagnosis">${v(s.diagnostico)}</strong>
            <span>${v(s.tecnicoResponsable||"Sin técnico")}</span>
          </td>
          <td>${v(s.solucionAplicada||"Pendiente")}</td>
          <td><strong class="support-service-cost">${Ye(s.costoServicio)}</strong></td>
          <td><span class="support-parts-cost">${Ye(s.costoRepuestos)}</span></td>
          <td><strong class="support-total">${Ye(s.total)}</strong></td>
          <td>
            <span class="support-status-badge support-status-badge--${on(s.estado)}">${v(lt(s.estado))}</span>
            <span class="support-warranty-badge">${v(lt(s.garantia))}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost support-action support-action--edit" type="button" data-soporte-edit="${v(s.id)}" title="Editar soporte" aria-label="Editar soporte ${v(s.id)}">
                ${H.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger support-action support-action--delete" type="button" data-soporte-delete="${v(s.id)}" title="Eliminar soporte" aria-label="Eliminar soporte ${v(s.id)}">
                ${H.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),un=({soportes:e,summary:t,clientes:a,equipos:s,editingSoporte:r=null,errors:o={},getClienteName:l,getEquipoName:i})=>{const p=r?"Editar soporte":"Nuevo soporte",n=r?"Actualizar soporte":"Registrar soporte",c=a.length>0&&s.length>0;return`
    <section class="module-view module-view--soporte" aria-label="Soporte Técnico">
      ${dn(t)}

      <div class="clientes-layout">
        <form class="panel cliente-form support-form-card" data-soporte-form>
          <input type="hidden" name="id" value="${v((r==null?void 0:r.id)??"")}" />

          <div class="panel__header">
            <h3><span class="section-icon support-section-icon">${H.wrenchPlus}</span>${p}</h3>
            ${r?'<button class="button button--ghost" type="button" data-soporte-cancel>Cancelar</button>':""}
          </div>

          ${c?'<p class="support-info">Documenta diagnóstico, solución, repuestos y costos para mantener trazabilidad técnica completa.</p>':'<p class="dependency-warning">Registra al menos un cliente y un equipo recibido antes de crear soporte.</p>'}

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${v((r==null?void 0:r.fecha)??new Date().toISOString().slice(0,10))}" />
              ${ee("fecha",o)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${nn(a,r==null?void 0:r.clienteId)}
              </select>
              ${ee("clienteId",o)}
            </label>

            <label class="field field--full">
              <span>Equipo</span>
              <select name="equipoId">
                <option value="">Seleccionar equipo</option>
                ${cn(s,r==null?void 0:r.equipoId)}
              </select>
              ${ee("equipoId",o)}
            </label>

            <label class="field field--full">
              <span>Diagnóstico</span>
              <textarea name="diagnostico" rows="3">${v((r==null?void 0:r.diagnostico)??"")}</textarea>
              ${ee("diagnostico",o)}
            </label>

            <label class="field field--full">
              <span>Solución aplicada</span>
              <textarea name="solucionAplicada" rows="3">${v((r==null?void 0:r.solucionAplicada)??"")}</textarea>
            </label>

            <label class="field">
              <span>Costo servicio</span>
              <input name="costoServicio" type="number" min="0" step="0.01" value="${v((r==null?void 0:r.costoServicio)??0)}" />
              ${ee("costoServicio",o)}
            </label>

            <label class="field">
              <span>Costo repuestos</span>
              <input name="costoRepuestos" type="number" min="0" step="0.01" value="${v((r==null?void 0:r.costoRepuestos)??0)}" />
              ${ee("costoRepuestos",o)}
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${pa(nt,(r==null?void 0:r.estado)??nt[0])}
              </select>
              ${ee("estado",o)}
            </label>

            <label class="field">
              <span>Garantía</span>
              <select name="garantia">
                ${pa(ct,(r==null?void 0:r.garantia)??ct[0])}
              </select>
              ${ee("garantia",o)}
            </label>

            <label class="field field--full">
              <span>Técnico responsable</span>
              <input name="tecnicoResponsable" type="text" value="${v((r==null?void 0:r.tecnicoResponsable)??"")}" />
              ${ee("tecnicoResponsable",o)}
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${v((r==null?void 0:r.observaciones)??"")}</textarea>
            </label>
          </div>

          <button class="button button--primary support-submit" type="submit"${c?"":" disabled"}>
            ${H.wrenchPlus}
            <span>${n}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel support-table-card" aria-label="Listado de soporte técnico">
          <div class="panel__header">
            <div>
              <h3><span class="section-icon support-section-icon">${H.headset}</span>Listado de soporte</h3>
              <p>${e.length} registro${e.length===1?"":"s"}</p>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table data-table--wide">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente / Equipo</th>
                  <th>Diagnóstico</th>
                  <th>Solución</th>
                  <th>Servicio</th>
                  <th>Repuestos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${pn({soportes:e,getClienteName:l,getEquipoName:i})}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `},D={editingSoporteId:null,errors:{}},mn=e=>Object.fromEntries(new FormData(e).entries()),hn=e=>{var t;return((t=Qo(e))==null?void 0:t.nombre)??"Cliente no encontrado"},vn=e=>{const t=en(e);return t?`${t.tipoEquipo} ${t.marca} ${t.modelo} (${t.serie})`:"Equipo no encontrado"},bn=()=>{const e=qa();return{totalCases:e.length,repairing:e.filter(t=>["En reparación","En reparaciÃ³n","En reparacion"].includes(t.estado)).length,ready:e.filter(t=>t.estado==="Listo").length,technicalTotal:e.reduce((t,a)=>t+Number(a.total||0),0)}},Oa=()=>un({soportes:qa(),summary:bn(),clientes:an(),equipos:sn(),editingSoporte:D.editingSoporteId?tn(D.editingSoporteId):null,errors:D.errors,getClienteName:hn,getEquipoName:vn}),gn=e=>{const t=()=>{e.innerHTML=Oa()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-soporte-form]");if(!s)return;a.preventDefault();const r=mn(s),o=r.id?rn(r.id,r):Wo(r);if(!o.ok){D.errors=o.errors,t();return}D.editingSoporteId=null,D.errors={},t()}),e.addEventListener("click",a=>{const s=a.target.closest("[data-soporte-edit]"),r=a.target.closest("[data-soporte-delete]"),o=a.target.closest("[data-soporte-cancel]");if(s){D.editingSoporteId=s.dataset.soporteEdit,D.errors={},t();return}if(r){const l=r.dataset.soporteDelete;Jo(l),D.editingSoporteId===l&&(D.editingSoporteId=null),D.errors={},t();return}o&&(D.editingSoporteId=null,D.errors={},t())})},Re="ventas",it=["Efectivo","Transferencia","Tarjeta","Yape/Plin","Credito"],dt=["Pendiente","Pagado","Parcial","Anulado"],fe=e=>{const t=Number(e);return Number.isFinite(t)?t:0},fn=(e,t)=>fe(e)*fe(t),ua=e=>{var s,r;const t=fe(e.cantidad),a=fe(e.precioUnitario);return{fecha:e.fecha||new Date().toISOString().slice(0,10),clienteId:e.clienteId??"",servicioId:e.servicioId??"",descripcion:((s=e.descripcion)==null?void 0:s.trim())??"",cantidad:t,precioUnitario:a,montoTotal:fn(t,a),metodoPago:e.metodoPago??it[0],estadoPago:e.estadoPago??dt[0],observaciones:((r=e.observaciones)==null?void 0:r.trim())??""}},ma=e=>{const t={};return f(e.fecha)||(t.fecha="La fecha es obligatoria."),f(e.clienteId)||(t.clienteId="Selecciona un cliente."),f(e.servicioId)||(t.servicioId="Selecciona un servicio."),fe(e.cantidad)<=0&&(t.cantidad="La cantidad debe ser mayor a cero."),fe(e.precioUnitario)<0&&(t.precioUnitario="El precio unitario no puede ser negativo."),it.includes(e.metodoPago)||(t.metodoPago="El metodo de pago no es valido."),dt.includes(e.estadoPago)||(t.estadoPago="El estado de pago no es valido."),t},yn=(e=P)=>{const t=()=>e.getAll("clientes").sort((d,u)=>d.nombre.localeCompare(u.nombre)),a=()=>e.getAll("servicios").sort((d,u)=>d.nombreServicio.localeCompare(u.nombreServicio)),s=d=>t().find(u=>u.id===d)??null,r=d=>a().find(u=>u.id===d)??null,o=()=>e.getAll(Re).sort((d,u)=>new Date(u.fecha)-new Date(d.fecha));return{createVenta:d=>{const u=ua(d),b=ma(u);return Object.keys(b).length>0?{ok:!1,errors:b}:{ok:!0,data:e.create(Re,u)}},deleteVenta:d=>e.delete(Re,d),filterVentas:({fecha:d="",clienteSearch:u=""}={})=>{const b=u.trim().toLowerCase();return o().filter(w=>{const k=s(w.clienteId),j=d?w.fecha===d:!0,z=b?[w.clienteId,k==null?void 0:k.nombre,k==null?void 0:k.telefono,k==null?void 0:k.correo].filter(Boolean).some(Ze=>String(Ze).toLowerCase().includes(b)):!0;return j&&z})},findClienteById:s,findServicioById:r,findVentaById:d=>e.findById(Re,d),getClientes:t,getServicios:a,getVentas:o,updateVenta:(d,u)=>{const b=ua(u),w=ma(b);return Object.keys(w).length>0?{ok:!1,errors:w}:{ok:!0,data:e.update(Re,d,b)}}}},Q=yn(),$n=Q.createVenta,_n=Q.deleteVenta,En=Q.filterVentas,Sn=Q.findClienteById,wn=Q.findServicioById,In=Q.findVentaById,Da=Q.getClientes,Mn=Q.getServicios,An=Q.getVentas,Cn=Q.updateVenta,h=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),xe=e=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(Number(e)||0),ha=(e,t)=>e.map(a=>`
        <option value="${h(a)}"${a===t?" selected":""}>
          ${h(a)}
        </option>
      `).join(""),Bn=(e,t)=>e.map(a=>`
        <option value="${h(a.id)}"${a.id===t?" selected":""}>
          ${h(a.nombre)}
        </option>
      `).join(""),Tn=(e,t)=>e.map(a=>`
        <option
          value="${h(a.id)}"
          data-precio-base="${h(a.precioBase??0)}"
          ${a.id===t?" selected":""}
        >
          ${h(a.nombreServicio)}
        </option>
      `).join(""),de=(e,t)=>t[e]?`<small class="field-error">${h(t[e])}</small>`:"",Ln=e=>{const t=String(e??"").toLowerCase();return t==="pagado"?"status-tag--success":t==="pendiente"?"status-tag--warning":t==="parcial"?"status-tag--info":t==="anulado"?"status-tag--danger":""},Pn=e=>`
    <div class="sales-summary" aria-label="Resumen de ventas">
      ${[{label:"Ventas del dia",value:xe(e.ventasDia),helper:"Ingresos registrados hoy",tone:"success",icon:"↗"},{label:"Ventas del mes",value:xe(e.ventasMes),helper:"Ingresos acumulados",tone:"primary",icon:"◆"},{label:"Clientes activos",value:e.clientesActivos,helper:"Clientes disponibles",tone:"purple",icon:"C"},{label:"Ticket promedio",value:xe(e.ticketPromedio),helper:"Promedio por venta",tone:"info",icon:"T"}].map(a=>`
            <article class="sales-summary-card sales-summary-card--${a.tone}">
              <span class="sales-summary-card__icon">${h(a.icon)}</span>
              <div>
                <span class="sales-summary-card__label">${h(a.label)}</span>
                <strong class="sales-summary-card__value">${h(a.value)}</strong>
                <span class="sales-summary-card__helper">${h(a.helper)}</span>
              </div>
            </article>
          `).join("")}
    </div>
  `,Rn=({ventas:e,getClienteName:t,getServicioName:a})=>e.length===0?`
      <tr>
        <td class="empty-state" colspan="10">
          <span class="empty-state__icon">◇</span>
          <strong>No hay ventas registradas.</strong>
          <span>Registra tu primera venta para comenzar a controlar tus ingresos.</span>
        </td>
      </tr>
    `:e.map(s=>`
        <tr>
          <td>${h(s.id)}</td>
          <td>${J(s.fecha)}</td>
          <td>
            <strong>${h(t(s.clienteId))}</strong>
            <span>${h(s.clienteId)}</span>
          </td>
          <td>${h(a(s.servicioId))}</td>
          <td>${h(s.cantidad)}</td>
          <td>${xe(s.precioUnitario)}</td>
          <td><strong class="sales-total">${xe(s.montoTotal)}</strong></td>
          <td>${h(s.metodoPago)}</td>
          <td><span class="status-tag ${Ln(s.estadoPago)}">${h(s.estadoPago)}</span></td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost sales-action sales-action--edit" type="button" data-venta-edit="${h(s.id)}">
                <span aria-hidden="true">✎</span> Editar
              </button>
              <button class="button button--danger sales-action sales-action--delete" type="button" data-venta-delete="${h(s.id)}">
                <span aria-hidden="true">×</span> Eliminar
              </button>
            </div>
          </td>
        </tr>
      `).join(""),kn=({ventas:e,clientes:t,servicios:a,summary:s,editingVenta:r=null,filters:o,errors:l={},getClienteName:i,getServicioName:p})=>{const n=r?"Editar venta":"Registrar venta",c=r?"Actualizar venta":"Registrar venta",d=t.length>0&&a.length>0;return`
    <section class="module-view module-view--ventas" aria-label="Ventas">
      ${Pn(s)}

      <div class="clientes-layout">
        <form class="panel cliente-form sales-form-card" data-ventas-form>
          <input type="hidden" name="id" value="${h((r==null?void 0:r.id)??"")}" />

          <div class="panel__header">
            <h3><span class="section-icon sales-section-icon">+</span>${n}</h3>
            ${r?'<button class="button button--ghost" type="button" data-ventas-cancel>Cancelar</button>':""}
          </div>

          ${d?"":'<p class="dependency-warning">Registra al menos un cliente y un servicio activo antes de crear ventas.</p>'}

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${h((r==null?void 0:r.fecha)??new Date().toISOString().slice(0,10))}" />
              ${de("fecha",l)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${Bn(t,r==null?void 0:r.clienteId)}
              </select>
              ${de("clienteId",l)}
            </label>

            <label class="field">
              <span>Servicio</span>
              <select name="servicioId" data-venta-servicio-select>
                <option value="">Seleccionar servicio</option>
                ${Tn(a,r==null?void 0:r.servicioId)}
              </select>
              ${de("servicioId",l)}
            </label>

            <label class="field">
              <span>Cantidad</span>
              <input name="cantidad" type="number" min="1" step="1" value="${h((r==null?void 0:r.cantidad)??1)}" />
              ${de("cantidad",l)}
            </label>

            <label class="field">
              <span>Precio unitario</span>
              <input name="precioUnitario" type="number" min="0" step="0.01" value="${h((r==null?void 0:r.precioUnitario)??0)}" />
              ${de("precioUnitario",l)}
            </label>

            <label class="field">
              <span>Metodo de pago</span>
              <select name="metodoPago">
                ${ha(it,(r==null?void 0:r.metodoPago)??it[0])}
              </select>
              ${de("metodoPago",l)}
            </label>

            <label class="field">
              <span>Estado de pago</span>
              <select name="estadoPago">
                ${ha(dt,(r==null?void 0:r.estadoPago)??dt[0])}
              </select>
              ${de("estadoPago",l)}
            </label>

            <label class="field field--full">
              <span>Descripcion</span>
              <input name="descripcion" type="text" value="${h((r==null?void 0:r.descripcion)??"")}" />
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${h((r==null?void 0:r.observaciones)??"")}</textarea>
            </label>
          </div>

          <button class="button button--primary sales-submit" type="submit"${d?"":" disabled"}>
            <span aria-hidden="true">✓</span>${c}
          </button>
        </form>

        <section class="panel clientes-table-panel sales-table-card" aria-label="Listado de ventas">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon sales-section-icon">≡</span>Listado de ventas</h3>
              <p>${e.length} registro${e.length===1?"":"s"}</p>
            </div>
            <div class="filters-row">
              <label class="search-field">
                <span>Filtrar por fecha</span>
                <input name="ventaFecha" type="date" value="${h(o.fecha)}" data-ventas-date-filter />
              </label>
              <label class="search-field">
                <span>Buscar por cliente</span>
                <input
                  name="ventaClienteSearch"
                  type="search"
                  value="${h(o.clienteSearch)}"
                  placeholder="Nombre, telefono, correo o ID"
                  data-ventas-client-search
                />
              </label>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table data-table--wide">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Cant.</th>
                  <th>P. unitario</th>
                  <th>Total</th>
                  <th>Pago</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${Rn({ventas:e,getClienteName:i,getServicioName:p})}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `},I={filters:{fecha:"",clienteSearch:""},editingVentaId:null,errors:{}},Nn=e=>Object.fromEntries(new FormData(e).entries()),va=()=>{window.dispatchEvent(new CustomEvent("apx:sidebar-summary-change"))},qn=e=>{var t;return((t=Sn(e))==null?void 0:t.nombre)??"Cliente no encontrado"},On=e=>{var t;return((t=wn(e))==null?void 0:t.nombreServicio)??"Servicio no encontrado"},Dn=()=>En(I.filters),xn=()=>{const e=An(),t=Da(),a=new Date().toISOString().slice(0,10),s=a.slice(0,7),r=e.filter(i=>i.fecha===a),o=e.filter(i=>{var p;return(p=i.fecha)==null?void 0:p.startsWith(s)}),l=e.reduce((i,p)=>i+Number(p.montoTotal||0),0);return{ventasDia:r.reduce((i,p)=>i+Number(p.montoTotal||0),0),ventasMes:o.reduce((i,p)=>i+Number(p.montoTotal||0),0),clientesActivos:t.filter(i=>i.estado==="Activo").length,ticketPromedio:e.length>0?l/e.length:0}},xa=()=>kn({ventas:Dn(),clientes:Da(),servicios:Mn(),summary:xn(),editingVenta:I.editingVentaId?In(I.editingVentaId):null,filters:I.filters,errors:I.errors,getClienteName:qn,getServicioName:On}),Fn=e=>{const t=()=>{e.innerHTML=xa()};e.addEventListener("submit",a=>{const s=a.target.closest("[data-ventas-form]");if(!s)return;a.preventDefault();const r=Nn(s),o=r.id?Cn(r.id,r):$n(r);if(!o.ok){I.errors=o.errors,t();return}I.editingVentaId=null,I.errors={},t(),va()}),e.addEventListener("change",a=>{const s=a.target.closest("[data-venta-servicio-select]"),r=a.target.closest("[data-ventas-date-filter]");if(s){const o=s.selectedOptions[0],l=e.querySelector('[name="precioUnitario"]');l&&(o!=null&&o.dataset.precioBase)&&(l.value=o.dataset.precioBase);return}r&&(I.filters.fecha=r.value,t())}),e.addEventListener("input",a=>{const s=a.target.closest("[data-ventas-client-search]");if(!s)return;I.filters.clienteSearch=s.value,t();const r=e.querySelector("[data-ventas-client-search]");r==null||r.focus(),r==null||r.setSelectionRange(I.filters.clienteSearch.length,I.filters.clienteSearch.length)}),e.addEventListener("click",a=>{const s=a.target.closest("[data-venta-edit]"),r=a.target.closest("[data-venta-delete]"),o=a.target.closest("[data-ventas-cancel]");if(s){I.editingVentaId=s.dataset.ventaEdit,I.errors={},t(),va();return}if(r){const l=r.dataset.ventaDelete;_n(l),I.editingVentaId===l&&(I.editingVentaId=null),I.errors={},t();return}o&&(I.editingVentaId=null,I.errors={},t())})},Fa="isDemoData",ae=(e=0)=>{const t=new Date;return t.setDate(t.getDate()+e),t.toISOString().slice(0,10)},pe=(e,t=0)=>({...e,[Fa]:!0,createdAt:new Date(`${ae(t)}T09:00:00`).toISOString(),updatedAt:new Date(`${ae(t)}T09:00:00`).toISOString()}),F=(e,t)=>`${e}-${String(t).padStart(5,"0")}`,jn=[["Apex Retail SAC","987654321","contacto@apexretail.pe","Av. Javier Prado 1240, Lima","Empresa","Activo"],["Lucia Fernandez","956321478","lucia.fernandez@mail.com","Calle Los Cedros 245, Surco","Persona","Activo"],["NovaTech Peru","944785632","soporte@novatech.pe","Av. Arequipa 3450, San Isidro","Empresa","Activo"],["Municipalidad San Borja","014785632","sistemas@sanborja.gob.pe","Av. Joaquin Madrid 200, San Borja","Gobierno","Activo"],["Carlos Mendoza","965874123","carlos.mendoza@mail.com","Jr. Las Flores 310, Lince","Persona","Prospecto"],["Innova Print SAC","933214587","operaciones@innovaprint.pe","Av. Colonial 1800, Callao","Empresa","Activo"],["Mariana Torres","977441258","mariana.torres@mail.com","Calle Las Gardenias 520, Miraflores","Persona","Activo"],["DataCorp Solutions","922658741","admin@datacorp.pe","Av. La Marina 2300, Pueblo Libre","Empresa","Activo"],["Colegio Horizonte","014444555","ti@colegiohorizonte.edu.pe","Av. Brasil 1320, Jesus Maria","Otro","Activo"],["Raul Paredes","988774411","raul.paredes@mail.com","Jr. Amazonas 840, Lima","Persona","Inactivo"]].map(([e,t,a,s,r,o],l)=>pe({id:F("CLI",l+1),nombre:e,telefono:t,correo:a,direccion:s,tipoCliente:r,fechaRegistro:ae(-18+l),estado:o,observaciones:"Registro demo para pruebas visuales."},-18+l)),pt=[["Mantenimiento preventivo PC","Mantenimiento","Limpieza, optimizacion y revision general.",120,35,"Activo"],["Formateo e instalacion Windows","Tecnico","Instalacion de sistema operativo y drivers.",150,45,"Activo"],["Instalacion de red local","Instalacion","Cableado, configuracion basica y pruebas.",480,180,"Activo"],["Soporte remoto mensual","Consultoria","Bolsa de soporte remoto para incidencias.",350,80,"Activo"],["Reparacion de laptop","Tecnico","Diagnostico y reparacion de fallas comunes.",220,90,"Activo"],["Configuracion de impresora","Instalacion","Conexion, drivers y pruebas de impresion.",95,20,"Activo"],["Auditoria tecnologica","Consultoria","Evaluacion de equipos, red y seguridad.",650,180,"Activo"],["Backup y recuperacion","Mantenimiento","Respaldo, restauracion y validacion de datos.",280,70,"Activo"],["Instalacion de software","Tecnico","Instalacion y configuracion de aplicaciones.",90,18,"Activo"],["Servicio express","Otro","Atencion prioritaria para incidencias urgentes.",180,55,"Inactivo"]].map(([e,t,a,s,r,o],l)=>pe({id:F("SER",l+1),nombreServicio:e,categoria:t,descripcion:a,precioBase:s,costoEstimado:r,gananciaEstimada:s-r,estado:o},-15+l)),ba=["Efectivo","Yape/Plin","Transferencia","Tarjeta","Efectivo"],ga=["Pagado","Pendiente","Parcial","Pagado","Pagado"],zn=Array.from({length:10},(e,t)=>{const a=t%3===0?2:1,s=pt[t],r=s.precioBase;return pe({id:F("VEN",t+1),fecha:ae(t<3?0:-t),clienteId:F("CLI",t%10+1),servicioId:F("SER",t%10+1),descripcion:`Venta demo: ${s.nombreServicio}`,cantidad:a,precioUnitario:r,montoTotal:a*r,metodoPago:ba[t%ba.length],estadoPago:ga[t%ga.length],observaciones:"Venta generada para pruebas."},-t)}),Vn=[["Compra de cable UTP","Materiales",145,"Efectivo","B001-102"],["Pago de internet oficina","Internet",189,"Transferencia","F001-221"],["Licencia antivirus","Software",260,"Tarjeta","F002-118"],["Movilidad tecnica","Transporte",48,"Yape/Plin","S/N"],["Memoria RAM DDR4","Equipos",220,"Transferencia","B001-140"],["Campana redes sociales","Publicidad",180,"Tarjeta","F003-081"],["Mantenimiento herramientas","Mantenimiento",95,"Efectivo","B002-210"],["Adaptadores HDMI","Materiales",72,"Yape/Plin","S/N"],["Hosting mensual","Software",110,"Transferencia","F004-333"],["Otros insumos","Otros",65,"Efectivo","S/N"]].map(([e,t,a,s,r],o)=>pe({id:F("GAS",o+1),fecha:ae(o<2?0:-o),concepto:e,categoria:t,monto:a,metodoPago:s,comprobante:r,observaciones:"Gasto demo para validacion."},-o)),fa=["Pendiente","En proceso","Terminado","Entregado","Cancelado"],ya=["Baja","Media","Alta","Urgente"],Hn=Array.from({length:10},(e,t)=>{const a=[220,350,480,150,650,280,120,390,180,520][t],s=[50,100,180,0,300,80,40,150,60,200][t];return pe({id:F("ORD",t+1),fecha:ae(-t),clienteId:F("CLI",t%10+1),tipoServicio:pt[t].nombreServicio,descripcionTrabajo:`Orden demo para ${pt[t].nombreServicio.toLowerCase()}.`,montoEstimado:a,adelanto:s,saldo:a-s,fechaEntrega:ae(t+2),estado:fa[t%fa.length],prioridad:ya[t%ya.length],observaciones:"Seguimiento operativo demo."},-t)}),Un=["Laptop","Desktop","Impresora","Servidor","Red","Movil","Laptop","Desktop","Impresora","Otro"],Zn=["Bueno","Regular","Dañado","Incompleto","Bueno","Regular","Bueno","Dañado","Regular","Bueno"],Gn=Array.from({length:10},(e,t)=>pe({id:F("EQP",t+1),fechaRecepcion:ae(-t),clienteId:F("CLI",t%10+1),tipoEquipo:Un[t],marca:["Lenovo","HP","Epson","Dell","TP-Link","Samsung","Asus","Acer","Canon","Generico"][t],modelo:["ThinkPad E14","ProDesk 400","L3250","PowerEdge T40","Archer C6","Galaxy A54","VivoBook","Aspire TC","G3110","POS-100"][t],serie:`APX-DEMO-${String(t+1).padStart(4,"0")}`,accesorios:["Cargador","Cable poder","Cable USB","Cable red","Adaptador","Funda","Mouse","Teclado","Cable poder","Base"][t],estadoFisico:Zn[t],problemaReportado:["Equipo lento y con ruido.","No enciende correctamente.","No imprime a color.","Requiere revision de disco.","Perdida intermitente de senal.","Pantalla con fallas tactiles.","Actualizacion y limpieza.","Fuente con falla.","Atasco frecuente de papel.","Revision general."][t],observaciones:"Equipo demo recibido para seguimiento."},-t)),$a=["Recibido","Diagnosticado","En reparación","Listo","Entregado","Sin solución"],Kn=Array.from({length:10},(e,t)=>{const a=[90,120,75,160,220,130,95,180,110,150][t],s=[35,0,45,80,120,0,25,150,60,40][t];return pe({id:F("SOP",t+1),fecha:ae(-t),clienteId:F("CLI",t%10+1),equipoId:F("EQP",t%10+1),diagnostico:"Diagnostico demo registrado para pruebas.",solucionAplicada:t%3===0?"Limpieza, ajustes y pruebas finales.":"Pendiente de validacion tecnica.",costoServicio:a,costoRepuestos:s,total:a+s,estado:$a[t%$a.length],tecnicoResponsable:["Diego Ruiz","Ana Salas","Marco Vega","Patricia Leon"][t%4],garantia:t%2===0?"Sin garantia":"Con garantia",observaciones:"Caso demo para control tecnico."},-t)}),Xn={clientes:jn,servicios:pt,ventas:zn,gastos:Vn,ordenes:Hn,equipos:Gn,soporte:Kn},ja=e=>P.getAll(e).filter(t=>(t==null?void 0:t[Fa])!==!0),Yn=()=>{Object.keys(ut).forEach(e=>{const t=ja(e);P.saveAll(e,[...t,...Xn[e]])})},Wn=()=>{Object.keys(ut).forEach(e=>{P.saveAll(e,ja(e))})},C=document.querySelector("#app");let At=_a,W=!1,q=!1,x=!1,Ee="login",Ct="",Bt="",vt="",Fe="light";const ke="Disponible solo con cuenta",za=["[data-clientes-form]","[data-servicios-form]","[data-ventas-form]","[data-gastos-form]","[data-ordenes-form]","[data-equipos-form]","[data-soporte-form]"].join(", "),Va=["[data-cliente-edit]","[data-cliente-delete]","[data-servicio-edit]","[data-servicio-delete]","[data-venta-edit]","[data-venta-delete]","[data-gasto-edit]","[data-gasto-delete]","[data-orden-edit]","[data-orden-delete]","[data-equipo-edit]","[data-equipo-delete]","[data-soporte-edit]","[data-soporte-delete]","[data-clientes-cancel]","[data-servicios-cancel]","[data-ventas-cancel]","[data-gastos-cancel]","[data-ordenes-cancel]","[data-equipos-cancel]","[data-soporte-cancel]"].join(", "),Jn=()=>{const e=ze($.storageKeys.theme);return e==="dark"||e==="light"?e:"light"},Tt=e=>{Fe=e==="dark"?"dark":"light",document.documentElement.dataset.theme=Fe},Qn=()=>{const e=ze($.storageKeys.appState);if(e)return e;const t=es();return Ve($.storageKeys.appState,t),t},ec=e=>Et.find(t=>t.key===e)??Et[0],tc=e=>`
  <div class="module-grid" aria-label="Resumen del modulo">
    <article class="metric-card">
      <span class="metric-card__label">Estado</span>
      <strong class="metric-card__value">Base lista</strong>
    </article>
    <article class="metric-card">
      <span class="metric-card__label">Persistencia</span>
      <strong class="metric-card__value">LocalStorage</strong>
    </article>
    <article class="metric-card">
      <span class="metric-card__label">Arquitectura</span>
      <strong class="metric-card__value">Modular</strong>
    </article>
  </div>
`,ac=e=>`
  <section class="module-heading" aria-label="Modulo actual">
    <p class="module-heading__version">${xs($.version)}</p>
    <h1 class="module-heading__title">${e.label}</h1>
    <p class="module-heading__description">${e.description}</p>
  </section>
`,sc=e=>(e==null?void 0:e.mode)==="demo"?`
      <aside class="demo-readonly-notice" role="status">
        Estás visualizando el sistema. Regístrate o inicia sesión para usar todas las funcionalidades.
      </aside>
    `:"",rc=e=>`
  ${e.key==="customers"?Aa():e.key==="dashboard"?cr():e.key==="services"?Na():e.key==="sales"?xa():e.key==="expenses"?La():e.key==="orders"?Pa():e.key==="equipment"?Ba():e.key==="support"?Oa():e.key==="reports"?ka():`<section class="module-view" aria-label="${e.label}">${tc()}</section>`}
`,bt=()=>{Ee="login",Ct="",Bt="",vt="",At=_a,W=!1,q=!1,x=!1},ne=({error:e="",message:t="",recoveryCode:a=""}={})=>{Ct=e,Bt=t,vt=a},oc=()=>{var e;return((e=It())==null?void 0:e.mode)==="demo"},nc=e=>{if((e==null?void 0:e.mode)!=="demo")return;const t=document.querySelector("#main-content");t&&(t.querySelectorAll(za).forEach(a=>{a.classList.add("demo-locked-form"),a.setAttribute("title",ke),a.querySelectorAll("button[type='submit'], .button--primary").forEach(s=>{s.disabled=!0,s.setAttribute("title",ke),s.setAttribute("aria-label",ke)})}),t.querySelectorAll(Va).forEach(a=>{a.disabled=!0,a.classList.add("demo-locked-action"),a.setAttribute("title",ke),a.setAttribute("aria-label",ke)}))},y=()=>{Tt(Fe),He();const e=It();if(!e){C.innerHTML=Ms({screen:Ee,error:Ct,message:Bt,recoveryCode:vt});return}Qn();const t=ec(At),a=Ts();C.innerHTML=`
    <div class="app-shell${W?" sidebar-open":""}">
      <div class="sidebar-backdrop${W?" sidebar-backdrop--visible":""}" data-sidebar-backdrop></div>
      ${rs(t.key)}
      <div class="workspace">
        ${Xa({isSidebarOpen:W,session:e,isUserMenuOpen:q,isNotificationsOpen:x,theme:Fe,notifications:a})}
        <main class="main-content" id="main-content">
          ${ac(t)}
          ${sc(e)}
          ${rc(t)}
        </main>
      </div>
    </div>
  `,t.key==="customers"&&Xs(document.querySelector("#main-content")),t.key==="services"&&Go(document.querySelector("#main-content")),t.key==="sales"&&Fn(document.querySelector("#main-content")),t.key==="expenses"&&zr(document.querySelector("#main-content")),t.key==="orders"&&uo(document.querySelector("#main-content")),t.key==="equipment"&&Ar(document.querySelector("#main-content")),t.key==="support"&&gn(document.querySelector("#main-content")),t.key==="reports"&&Co(document.querySelector("#main-content")),nc(e)},cc=e=>{const t=e.target.closest("[data-login-form]");if(!t)return;e.preventDefault();const a=Object.fromEntries(new FormData(t).entries()),s=hs(a);if(!s.ok){ne({error:s.error}),y();return}bt(),y()},lc=e=>{const t=e.target.closest("[data-register-form]");if(!t)return;e.preventDefault();const a=bs(Object.fromEntries(new FormData(t).entries()));if(!a.ok){ne({error:a.error}),y();return}Ee="login",ne({message:a.message}),y()},ic=e=>{e.target.closest("[data-demo-login]")&&(vs(),bt(),y())},dc=e=>{const t=e.target.closest("[data-recovery-form]");if(!t)return;e.preventDefault();const a=gs(Object.fromEntries(new FormData(t).entries()));if(!a.ok){ne({error:a.error}),y();return}Ee="verify",ne({message:a.message,recoveryCode:a.code}),y()},pc=e=>{const t=e.target.closest("[data-verify-form]");if(!t)return;e.preventDefault();const a=fs(Object.fromEntries(new FormData(t).entries()));if(!a.ok){ne({error:a.error,recoveryCode:vt}),y();return}Ee="login",ne({message:a.message}),y()},uc=e=>{const t=e.target.closest("[data-auth-view]");t&&(Ee=t.dataset.authView,ne(),y())},mc=e=>{const t=e.target.closest("[data-register-password-toggle]");if(!t)return;const a=t.dataset.registerPasswordToggle,s=t.closest("[data-register-form]"),r=s==null?void 0:s.querySelector(`input[name="${a}"]`);if(!r)return;const o=r.type==="password";r.type=o?"text":"password",t.classList.toggle("auth-password-toggle--visible",o),t.setAttribute("aria-label",o?"Ocultar contraseña":"Mostrar contraseña"),t.setAttribute("title",o?"Ocultar contraseña":"Mostrar contraseña")},Ha=e=>{var s,r,o,l;if(!oc())return;const t=(r=(s=e.target).closest)==null?void 0:r.call(s,za),a=(l=(o=e.target).closest)==null?void 0:l.call(o,Va);!t&&!a||(e.preventDefault(),e.stopImmediatePropagation())},hc=e=>{e.target.closest("[data-seed-load]")&&window.confirm("¿Cargar datos demo en clientes, servicios, ventas, gastos, órdenes, equipos y soporte?")&&(Yn(),q=!1,y(),window.alert("Datos de prueba cargados correctamente."))},vc=e=>{e.target.closest("[data-seed-clear]")&&window.confirm("¿Limpiar únicamente los datos demo? Los usuarios y la sesión se mantendrán.")&&(Wn(),q=!1,y(),window.alert("Datos demo limpiados correctamente."))},bc=e=>{e.target.closest("[data-auth-logout]")&&(ys(),bt(),y())},gc=e=>{const t=e.target.closest("[data-user-menu-toggle]"),a=e.target.closest(".user-menu__dropdown");if(t){q=!q,x=!1,y();return}!a&&q&&(q=!1,y())},fc=e=>{const t=e.target.closest("[data-notifications-toggle]"),a=e.target.closest(".notifications-menu__dropdown");if(t){x=!x,q=!1,y();return}!a&&x&&(x=!1,y())},yc=e=>{if(!e.target.closest("[data-theme-toggle]"))return;const a=Fe==="dark"?"light":"dark";Ve($.storageKeys.theme,a),q=!1,x=!1,Tt(a),y()},$c=e=>{const t=e.target.closest("[data-module-key]");t&&(At=t.dataset.moduleKey,W=!1,q=!1,x=!1,y())},_c=e=>{const t=e.target.closest("[data-sidebar-toggle]"),a=e.target.closest("[data-sidebar-backdrop]");if(t){W=!W,q=!1,x=!1,y();return}a&&(W=!1,q=!1,x=!1,y())},Ec=e=>{e.key!=="Escape"||!W&&!q&&!x||(W=!1,q=!1,x=!1,y())},Sc=()=>{It()&&y()},wc=e=>{e.key!==$.storageKeys.authSession&&e.key!==null||(bt(),y())};C.addEventListener("submit",Ha,!0);C.addEventListener("click",Ha,!0);C.addEventListener("submit",cc);C.addEventListener("submit",lc);C.addEventListener("submit",dc);C.addEventListener("submit",pc);C.addEventListener("click",bc);C.addEventListener("click",ic);C.addEventListener("click",uc);C.addEventListener("click",mc);C.addEventListener("click",hc);C.addEventListener("click",vc);C.addEventListener("click",gc);C.addEventListener("click",fc);C.addEventListener("click",yc);C.addEventListener("click",$c);C.addEventListener("click",_c);document.addEventListener("keydown",Ec);window.addEventListener("apx:sidebar-summary-change",Sc);window.addEventListener("storage",wc);Tt(Jn());y();
