var ef=Object.defineProperty;var ah=(i,t,e)=>()=>{if(e)throw e[0];try{return i&&(t=i(i=0)),t}catch(n){throw e=[n],n}};var nf=(i,t)=>{for(var e in t)ef(i,e,{get:t[e],enumerable:!0})};function hd(i="untitled"){return{schema:"sbim/0.1",name:i,grids:[],stories:[],sections:[],members:[],nextId:1}}function Dn(i){return[...i.stories].sort((t,e)=>t.level-e.level)}function zr(i,t,e){return i.grids.find(n=>n.axis===t&&n.name===e)}function Fs(i,t,e){if(typeof e=="number")return e;let n=zr(i,t,e);if(n)return n.pos;throw new Error(`\u901A\u308A\u82AF ${e} \u304C\u3042\u308A\u307E\u305B\u3093\uFF08${t}\u65B9\u5411\uFF09`)}function Ii(i,t){return{x:Fs(i,"X",t.x),y:Fs(i,"Y",t.y)}}function hn(i,t){return i.stories.find(e=>e.name===t)}function Ic(i,t){let e=Dn(i),n=e.findIndex(s=>s.name===t);return n>=0?e[n+1]:void 0}function Ji(i,t,e){return i.sections.find(n=>n.mark===t&&n.story===e)??i.sections.find(n=>n.mark===t&&n.story==="*")}function Q_(i){return i.type==="RC_RECT"?{w:i.b,h:i.d}:{w:i.b,h:i.h}}function Bs(i){return i.type==="RC_RECT"?`${i.b}x${i.d}`:i.type==="S_H"?`H-${i.h}x${i.b}x${i.tw}x${i.tf}`:`\u25A1-${i.h}x${i.b}x${i.t}`}function un(i,t){let e=hn(i,t.story);if(!e)throw new Error(`\u968E ${t.story} \u304C\u3042\u308A\u307E\u305B\u3093`);let n=Ji(i,t.mark,t.story),s=t.size?{w:t.size[0],h:t.size[1]}:n?Q_(n.shape):{w:300,h:300};if(t.kind==="column"){let c=Ii(i,t.at),l=Ic(i,t.story);if(!l)throw new Error(`\u67F1 ${t.id} \u306E\u968E ${t.story} \u3088\u308A\u4E0A\u306E\u968E\u304C\u3042\u308A\u307E\u305B\u3093\uFF08\u67F1\u306F\u4E0A\u306E\u968E\u306EFL\u307E\u3067\uFF09`);let u=l.level;return{member:t,section:n,p0:[c.x,c.y,e.level],p1:[c.x,c.y,u],w:s.w,h:s.h}}let r=Ii(i,t.from),o=Ii(i,t.to),a=e.level+(t.dz??0);return{member:t,section:n,p0:[r.x,r.y,a],p1:[o.x,o.y,a],w:s.w,h:s.h}}var li=ah(()=>{"use strict"});var Fd={};nf(Fd,{export3dm:()=>fx});function fx(i,t){let e=new i.File3dm;e.settings().modelUnitSystem=i.UnitSystem.Millimeters;let n={};for(let u of["column","girder","beam","grid"])n[u]=e.layers().addLayer(`SBIM_${u}`,dx[u]);let s=(u,p)=>{let d=new i.ObjectAttributes;d.layerIndex=n[u];for(let[f,m]of Object.entries(p))d.setUserString(f,m);return d};for(let u of t.members){let p=un(t,u),[d,f,m]=p.p0,[x,g,h]=p.p1,y=Math.hypot(x-d,g-f,h-m),E=[(x-d)/y,(g-f)/y,(h-m)/y],M,T,w;u.kind==="column"?(M=[1,0,0],T=[0,1,0],w=[d,f,m]):(M=[-E[1],E[0],0],T=[0,0,1],w=[d,f,m-p.h/2]);let _=p.w/2,b=p.h/2,U=(G,B)=>[0,1,2].map(tt=>w[tt]+M[tt]*G+T[tt]*B),P=[U(-_,-b),U(_,-b),U(_,b),U(-_,b),U(-_,-b)],N=new i.PolylineCurve(P),C=i.Extrusion.create(N,y,!0),D=C.getBoundingBox(),R=[(D.min[0]+D.max[0])/2,(D.min[1]+D.max[1])/2,(D.min[2]+D.max[2])/2],z=[0,1,2].map(G=>(p.p0[G]+p.p1[G])/2+(u.kind==="column"?0:G===2?-p.h/2:0));Math.hypot(R[0]-z[0],R[1]-z[1],R[2]-z[2])>1&&(C=i.Extrusion.create(N,-y,!0)),e.objects().addExtrusion(C,s(u.kind,{sbim_id:u.id,mark:u.mark,story:u.story,kind:u.kind,section:p.section?Bs(p.section.shape):"(\u672A\u5B9A\u7FA9)",dz:String(u.dz??0)}))}let r=t.stories.map(u=>u.level),o=r.length?Math.min(...r):0,a=t.grids.filter(u=>u.axis==="X").map(u=>u.pos),c=t.grids.filter(u=>u.axis==="Y").map(u=>u.pos),l=2e3;for(let u of a.length&&c.length?t.grids:[]){let[p,d]=u.axis==="X"?[[u.pos,Math.min(...c)-l,o],[u.pos,Math.max(...c)+l,o]]:[[Math.min(...a)-l,u.pos,o],[Math.max(...a)+l,u.pos,o]];e.objects().addLine(p,d,s("grid",{sbim_id:u.id,grid:u.name}))}return e.toByteArray()}var dx,Bd=ah(()=>{"use strict";li();dx={column:{r:200,g:60,b:60},girder:{r:60,g:110,b:200},beam:{r:60,g:170,b:120},grid:{r:150,g:150,b:150}}});var cn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Uh=0,Fl=1,Fh=2;var Ar=1,Bh=2,Cs=3,Ri=0,$e=1,Hn=2,$i=0,Is=1,Bl=2,kl=3,zl=4,kh=5;var Xi=100,zh=101,Hh=102,Gh=103,Vh=104,Wh=200,$h=201,Xh=202,Yh=203,Hl=204,Gl=205,qh=206,Zh=207,Jh=208,Kh=209,jh=210,Qh=211,tu=212,eu=213,nu=214,To=0,Ao=1,wo=2,xs=3,Ro=4,Co=5,Io=6,Do=7,Vl=0,iu=1,su=2,Gn=0,Wl=1,$l=2,Xl=3,Yl=4,ql=5,Zl=6,Jl=7;var Kl=300,Yi=301,Ds=302,ia=303,sa=304,Po=1e3,Bn=1001,Lo=1002,Pe=1003,ru=1004;var wr=1005;var We=1006,ra=1007;var ri=1008;var Ze=1009,jl=1010,Ql=1011,Ps=1012,oa=1013,wn=1014,Rn=1015,Cn=1016,aa=1017,la=1018,qi=1020,tc=35902,ec=35899,nc=1021,ic=1022,In=1023,ti=1026,oi=1027,sc=1028,ca=1029,Ci=1030,ha=1031;var ua=1033,Rr=33776,Cr=33777,Ir=33778,Dr=33779,da=35840,fa=35841,pa=35842,ma=35843,ga=36196,_a=37492,xa=37496,ya=37488,Sa=37489,Pr=37490,va=37491,Ma=37808,ba=37809,Ea=37810,Ta=37811,Aa=37812,wa=37813,Ra=37814,Ca=37815,Ia=37816,Da=37817,Pa=37818,La=37819,Na=37820,Oa=37821,Ua=36492,Fa=36494,Ba=36495,ka=36283,za=36284,Lr=36285,Ha=36286;var sr=2300,No=2301,bo=2302,Cl=2303,Il=2400,Dl=2401,Pl=2402;var ou=3200;var Ga=0,au=1,ai="",en="srgb",rr="srgb-linear",or="linear",Qt="srgb";var Eo=7680;var lu=519,cu=512,hu=513,uu=514,rc=515,du=516,fu=517,oc=518,ac=519,pu=35044;var lc="300 es",yn=2e3,ys=2001;function sf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function rf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mu(){let i=ar("canvas");return i.style.display="block",i}var lh={},Ss=null;function cc(...i){let t="THREE."+i.shift();Ss?Ss("log",t,...i):console.log(t,...i)}function gu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=gu(i);let t="THREE."+i.shift();if(Ss)Ss("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Pt(...i){i=gu(i);let t="THREE."+i.shift();if(Ss)Ss("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function er(...i){let t=i.join(" ");t in lh||(lh[t]=!0,It(...i))}function _u(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var xu={[To]:To,[wo]:Io,[Ro]:Ro,[xs]:Co,[Ao]:Ao,[Io]:wo,[Do]:Do,[Co]:xs},An=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ch=1234567,nr=Math.PI/180,vs=180/Math.PI;function Ls(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function hc(i,t){return(i%t+t)%t}function of(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function af(i,t,e){return i!==t?(e-i)/(t-i):0}function ir(i,t,e){return(1-e)*i+e*t}function lf(i,t,e,n){return ir(i,t,1-Math.exp(-e*n))}function cf(i,t=1){return t-Math.abs(hc(i,t*2)-t)}function hf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function uf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function df(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ff(i,t){return i+Math.random()*(t-i)}function pf(i){return i*(.5-Math.random())}function mf(i){i!==void 0&&(ch=i);let t=ch+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gf(i){return i*nr}function _f(i){return i*vs}function xf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function yf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function uc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Sf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),p=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*p,c*d,a*l);break;case"YZY":i.set(c*d,a*u,c*p,a*l);break;case"ZXZ":i.set(c*p,c*d,a*u,a*l);break;case"XZX":i.set(a*u,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*u,a*l);break;default:It("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function dc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function yu(i,t){if(t.constructor===Float32Array)return i;let e=dc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Su(i,t){if(t.constructor===Float32Array)return i;let e=dc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var fc={DEG2RAD:nr,RAD2DEG:vs,generateUUID:Ls,clamp:Gt,euclideanModulo:hc,mapLinear:of,inverseLerp:af,lerp:ir,damp:lf,pingpong:cf,smoothstep:hf,smootherstep:uf,randInt:df,randFloat:ff,randFloatSpread:pf,seededRandom:mf,degToRad:gf,radToDeg:_f,isPowerOfTwo:xf,ceilPowerOfTwo:yf,floorPowerOfTwo:uc,setQuaternionFromProperEuler:Sf,normalize:Su,denormalize:yu},wt=class{static{this.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},sn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],p=n[s+3],d=r[o+0],f=r[o+1],m=r[o+2],x=r[o+3];if(p!==x||c!==d||l!==f||u!==m){let g=c*d+l*f+u*m+p*x;g<0&&(d=-d,f=-f,m=-m,x=-x,g=-g);let h=1-a;if(g<.9995){let y=Math.acos(g),E=Math.sin(y);h=Math.sin(h*y)/E,a=Math.sin(a*y)/E,c=c*h+d*a,l=l*h+f*a,u=u*h+m*a,p=p*h+x*a}else{c=c*h+d*a,l=l*h+f*a,u=u*h+m*a,p=p*h+x*a;let y=1/Math.sqrt(c*c+l*l+u*u+p*p);c*=y,l*=y,u*=y,p*=y}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],p=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+u*p+c*f-l*d,t[e+1]=c*m+u*d+l*p-a*f,t[e+2]=l*m+u*f+a*d-c*p,t[e+3]=u*m-a*p-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),p=a(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*u*p+l*f*m,this._y=l*f*p-d*u*m,this._z=l*u*m+d*f*p,this._w=l*u*p-d*f*m;break;case"YXZ":this._x=d*u*p+l*f*m,this._y=l*f*p-d*u*m,this._z=l*u*m-d*f*p,this._w=l*u*p+d*f*m;break;case"ZXY":this._x=d*u*p-l*f*m,this._y=l*f*p+d*u*m,this._z=l*u*m+d*f*p,this._w=l*u*p-d*f*m;break;case"ZYX":this._x=d*u*p-l*f*m,this._y=l*f*p+d*u*m,this._z=l*u*m-d*f*p,this._w=l*u*p+d*f*m;break;case"YZX":this._x=d*u*p+l*f*m,this._y=l*f*p+d*u*m,this._z=l*u*m-d*f*p,this._w=l*u*p-d*f*m;break;case"XZY":this._x=d*u*p-l*f*m,this._y=l*f*p-d*u*m,this._z=l*u*m+d*f*p,this._w=l*u*p+d*f*m;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],p=e[10],d=n+a+p;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>p){let f=2*Math.sqrt(1+n-a-p);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>p){let f=2*Math.sqrt(1+a-n-p);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+p-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class{static{this.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+c*l+o*p-a*u,this.y=n+c*u+a*l-r*p,this.z=s+c*p+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ll.copy(this).projectOnVector(t),this.sub(ll)}reflect(t){return this.sub(ll.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ll=new F,hh=new sn,Lt=class{static{this.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],p=n[7],d=n[2],f=n[5],m=n[8],x=s[0],g=s[3],h=s[6],y=s[1],E=s[4],M=s[7],T=s[2],w=s[5],_=s[8];return r[0]=o*x+a*y+c*T,r[3]=o*g+a*E+c*w,r[6]=o*h+a*M+c*_,r[1]=l*x+u*y+p*T,r[4]=l*g+u*E+p*w,r[7]=l*h+u*M+p*_,r[2]=d*x+f*y+m*T,r[5]=d*g+f*E+m*w,r[8]=d*h+f*M+m*_,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],p=u*o-a*l,d=a*c-u*r,f=l*r-o*c,m=e*p+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return t[0]=p*x,t[1]=(s*l-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return er("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(cl.makeScale(t,e)),this}rotate(t){return er("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(cl.makeRotation(-t)),this}translate(t,e){return er("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(cl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},cl=new Lt,uh=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dh=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vf(){let i={enabled:!0,workingColorSpace:rr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Qt&&(s.r=Qn(s.r),s.g=Qn(s.g),s.b=Qn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Qt&&(s.r=_s(s.r),s.g=_s(s.g),s.b=_s(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ai?or:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[rr]:{primaries:t,whitePoint:n,transfer:or,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:t,whitePoint:n,transfer:Qt,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),i}var Xt=vf();function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ss,Oo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ss===void 0&&(ss=ar("canvas")),ss.width=t.width,ss.height=t.height;let s=ss.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ss}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ar("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Qn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qn(e[n]/255)*255):e[n]=Qn(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Mf=0,Ms=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(hl(s[o].image)):r.push(hl(s[o]))}else r=hl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function hl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Oo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}var bf=0,ul=new F,qe=class i extends An{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Bn,s=Bn,r=We,o=ri,a=In,c=Ze,l=i.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=Ls(),this.name="",this.source=new Ms(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ul).x}get height(){return this.source.getSize(ul).y}get depth(){return this.source.getSize(ul).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Po:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case Lo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Po:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case Lo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=Kl;qe.DEFAULT_ANISOTROPY=1;var ue=class{static{this.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],p=c[8],d=c[1],f=c[5],m=c[9],x=c[2],g=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(p-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(p+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(l+1)/2,M=(f+1)/2,T=(h+1)/2,w=(u+d)/4,_=(p+x)/4,b=(m+g)/4;return E>M&&E>T?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=_/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=b/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=_/r,s=b/r),this.set(n,s,r,e),this}let y=Math.sqrt((g-m)*(g-m)+(p-x)*(p-x)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(p-x)/y,this.z=(d-u)/y,this.w=Math.acos((l+f+h-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Uo=class extends An{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new qe({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:We,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ms(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},rn=class extends Uo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},lr=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fo=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ee=class i{static{this.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,u,p,d,f,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,p,d,f,m,x,g)}set(t,e,n,s,r,o,a,c,l,u,p,d,f,m,x,g){let h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=p,h[14]=d,h[3]=f,h[7]=m,h[11]=x,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/rs.setFromMatrixColumn(t,0).length(),r=1/rs.setFromMatrixColumn(t,1).length(),o=1/rs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let d=o*u,f=o*p,m=a*u,x=a*p;e[0]=c*u,e[4]=-c*p,e[8]=l,e[1]=f+m*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*u,f=c*p,m=l*u,x=l*p;e[0]=d+x*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*p,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*u,f=c*p,m=l*u,x=l*p;e[0]=d-x*a,e[4]=-o*p,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*u,f=o*p,m=a*u,x=a*p;e[0]=c*u,e[4]=m*l-f,e[8]=d*l+x,e[1]=c*p,e[5]=x*l+d,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,f=o*l,m=a*c,x=a*l;e[0]=c*u,e[4]=x-d*p,e[8]=m*p+f,e[1]=p,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=f*p+m,e[10]=d-x*p}else if(t.order==="XZY"){let d=o*c,f=o*l,m=a*c,x=a*l;e[0]=c*u,e[4]=-p,e[8]=l*u,e[1]=d*p+x,e[5]=o*u,e[9]=f*p-m,e[2]=m*p-f,e[6]=a*u,e[10]=x*p+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ef,t,Tf)}lookAt(t,e,n){let s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),mi.crossVectors(n,Qe),mi.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),mi.crossVectors(n,Qe)),mi.normalize(),to.crossVectors(Qe,mi),s[0]=mi.x,s[4]=to.x,s[8]=Qe.x,s[1]=mi.y,s[5]=to.y,s[9]=Qe.y,s[2]=mi.z,s[6]=to.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],p=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],h=n[14],y=n[3],E=n[7],M=n[11],T=n[15],w=s[0],_=s[4],b=s[8],U=s[12],P=s[1],N=s[5],C=s[9],D=s[13],R=s[2],z=s[6],G=s[10],B=s[14],tt=s[3],W=s[7],K=s[11],j=s[15];return r[0]=o*w+a*P+c*R+l*tt,r[4]=o*_+a*N+c*z+l*W,r[8]=o*b+a*C+c*G+l*K,r[12]=o*U+a*D+c*B+l*j,r[1]=u*w+p*P+d*R+f*tt,r[5]=u*_+p*N+d*z+f*W,r[9]=u*b+p*C+d*G+f*K,r[13]=u*U+p*D+d*B+f*j,r[2]=m*w+x*P+g*R+h*tt,r[6]=m*_+x*N+g*z+h*W,r[10]=m*b+x*C+g*G+h*K,r[14]=m*U+x*D+g*B+h*j,r[3]=y*w+E*P+M*R+T*tt,r[7]=y*_+E*N+M*z+T*W,r[11]=y*b+E*C+M*G+T*K,r[15]=y*U+E*D+M*B+T*j,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],p=t[6],d=t[10],f=t[14],m=t[3],x=t[7],g=t[11],h=t[15],y=c*f-l*d,E=a*f-l*p,M=a*d-c*p,T=o*f-l*u,w=o*d-c*u,_=o*p-a*u;return e*(x*y-g*E+h*M)-n*(m*y-g*T+h*w)+s*(m*E-x*T+h*_)-r*(m*M-x*w+g*_)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-n*(r*u-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],p=t[9],d=t[10],f=t[11],m=t[12],x=t[13],g=t[14],h=t[15],y=e*a-n*o,E=e*c-s*o,M=e*l-r*o,T=n*c-s*a,w=n*l-r*a,_=s*l-r*c,b=u*x-p*m,U=u*g-d*m,P=u*h-f*m,N=p*g-d*x,C=p*h-f*x,D=d*h-f*g,R=y*D-E*C+M*N+T*P-w*U+_*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/R;return t[0]=(a*D-c*C+l*N)*z,t[1]=(s*C-n*D-r*N)*z,t[2]=(x*_-g*w+h*T)*z,t[3]=(d*w-p*_-f*T)*z,t[4]=(c*P-o*D-l*U)*z,t[5]=(e*D-s*P+r*U)*z,t[6]=(g*M-m*_-h*E)*z,t[7]=(u*_-d*M+f*E)*z,t[8]=(o*C-a*P+l*b)*z,t[9]=(n*P-e*C-r*b)*z,t[10]=(m*w-x*M+h*y)*z,t[11]=(p*M-u*w-f*y)*z,t[12]=(a*U-o*N-c*b)*z,t[13]=(e*N-n*U+s*b)*z,t[14]=(x*E-m*T-g*y)*z,t[15]=(u*T-p*E+d*y)*z,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,p=a+a,d=r*l,f=r*u,m=r*p,x=o*u,g=o*p,h=a*p,y=c*l,E=c*u,M=c*p,T=n.x,w=n.y,_=n.z;return s[0]=(1-(x+h))*T,s[1]=(f+M)*T,s[2]=(m-E)*T,s[3]=0,s[4]=(f-M)*w,s[5]=(1-(d+h))*w,s[6]=(g+y)*w,s[7]=0,s[8]=(m+E)*_,s[9]=(g-y)*_,s[10]=(1-(d+x))*_,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=rs.set(s[0],s[1],s[2]).length(),a=rs.set(s[4],s[5],s[6]).length(),c=rs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),bn.copy(this);let l=1/o,u=1/a,p=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=p,bn.elements[9]*=p,bn.elements[10]*=p,e.setFromRotationMatrix(bn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=yn,c=!1){let l=this.elements,u=2*r/(e-t),p=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),m,x;if(c)m=r/(o-r),x=o*r/(o-r);else if(a===yn)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===ys)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=p,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=yn,c=!1){let l=this.elements,u=2/(e-t),p=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s),m,x;if(c)m=1/(o-r),x=o/(o-r);else if(a===yn)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===ys)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=p,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},rs=new F,bn=new ee,Ef=new F(0,0,0),Tf=new F(1,1,1),mi=new F,to=new F,Qe=new F,fh=new ee,ph=new sn,ei=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],p=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Gt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ph.setFromEuler(this),this.setFromQuaternion(ph,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ei.DEFAULT_ORDER="XYZ";var bs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Af=0,mh=new F,os=new sn,Yn=new ee,eo=new F,Js=new F,wf=new F,Rf=new sn,gh=new F(1,0,0),_h=new F(0,1,0),xh=new F(0,0,1),yh={type:"added"},Cf={type:"removed"},as={type:"childadded",child:null},dl={type:"childremoved",child:null},be=class i extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new ei,n=new sn,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new Lt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(gh,t)}rotateY(t){return this.rotateOnAxis(_h,t)}rotateZ(t){return this.rotateOnAxis(xh,t)}translateOnAxis(t,e){return mh.copy(t).applyQuaternion(this.quaternion),this.position.add(mh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gh,t)}translateY(t){return this.translateOnAxis(_h,t)}translateZ(t){return this.translateOnAxis(xh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?eo.copy(t):eo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Js,eo,this.up):Yn.lookAt(eo,Js,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Yn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Pt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(yh),as.child=t,this.dispatchEvent(as),as.child=null):Pt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cf),dl.child=t,this.dispatchEvent(dl),dl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(yh),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,t,wf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,Rf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let p=c[l];r(t.shapes,p)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),p=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};be.DEFAULT_UP=new F(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jn=class extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}},If={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let g=e.getJointPose(x,n),h=this._getHandJoint(l,x);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.quaternion,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}let u=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],d=u.position.distanceTo(p.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(If)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new jn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},no={h:0,s:0,l:0};function fl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=en){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=hc(t,1),e=Gt(e,0,1),n=Gt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=fl(o,r,t+1/3),this.g=fl(o,r,t),this.b=fl(o,r,t-1/3)}return Xt.colorSpaceToWorking(this,s),this}setStyle(t,e=en){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=en){let n=vu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=en){return Xt.workingToColorSpace(Be.copy(this),t),Math.round(Gt(Be.r*255,0,255))*65536+Math.round(Gt(Be.g*255,0,255))*256+Math.round(Gt(Be.b*255,0,255))}getHexString(t=en){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(Be.copy(this),e);let n=Be.r,s=Be.g,r=Be.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let p=o-a;switch(l=u<=.5?p/(o+a):p/(2-o-a),o){case n:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-n)/p+2;break;case r:c=(n-s)/p+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=en){Xt.workingToColorSpace(Be.copy(this),t);let e=Be.r,n=Be.g,s=Be.b;return t!==en?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(gi),this.setHSL(gi.h+t,gi.s+e,gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(gi),t.getHSL(no);let n=ir(gi.h,no.h,e),s=ir(gi.s,no.s,e),r=ir(gi.l,no.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new kt;kt.NAMES=vu;var cr=class extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},En=new F,qn=new F,pl=new F,Zn=new F,ls=new F,cs=new F,Sh=new F,ml=new F,gl=new F,_l=new F,xl=new ue,yl=new ue,Sl=new ue,Si=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),En.subVectors(t,e),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){En.subVectors(s,e),qn.subVectors(n,e),pl.subVectors(t,e);let o=En.dot(En),a=En.dot(qn),c=En.dot(pl),l=qn.dot(qn),u=qn.dot(pl),p=o*l-a*a;if(p===0)return r.set(0,0,0),null;let d=1/p,f=(l*c-a*u)*d,m=(o*u-a*c)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return xl.setScalar(0),yl.setScalar(0),Sl.setScalar(0),xl.fromBufferAttribute(t,e),yl.fromBufferAttribute(t,n),Sl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(xl,r.x),o.addScaledVector(yl,r.y),o.addScaledVector(Sl,r.z),o}static isFrontFacing(t,e,n,s){return En.subVectors(n,e),qn.subVectors(t,e),En.cross(qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),En.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ls.subVectors(s,n),cs.subVectors(r,n),ml.subVectors(t,n);let c=ls.dot(ml),l=cs.dot(ml);if(c<=0&&l<=0)return e.copy(n);gl.subVectors(t,s);let u=ls.dot(gl),p=cs.dot(gl);if(u>=0&&p<=u)return e.copy(s);let d=c*p-u*l;if(d<=0&&c>=0&&u<=0&&c-u>0)return o=c/(c-u),e.copy(n).addScaledVector(ls,o);_l.subVectors(t,r);let f=ls.dot(_l),m=cs.dot(_l);if(m>=0&&f<=m)return e.copy(r);let x=f*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(cs,a);let g=u*m-f*p;if(g<=0&&p-u>=0&&f-m>=0)return Sh.subVectors(r,s),a=(p-u)/(p-u+(f-m)),e.copy(s).addScaledVector(Sh,a);let h=1/(g+x+d);return o=x*h,a=d*h,e.copy(n).addScaledVector(ls,o).addScaledVector(cs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},vi=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),io.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),io.copy(n.boundingBox)),io.applyMatrix4(t.matrixWorld),this.union(io)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ks),so.subVectors(this.max,Ks),hs.subVectors(t.a,Ks),us.subVectors(t.b,Ks),ds.subVectors(t.c,Ks),_i.subVectors(us,hs),xi.subVectors(ds,us),Bi.subVectors(hs,ds);let e=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Bi.z,Bi.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Bi.z,0,-Bi.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Bi.y,Bi.x,0];return!vl(e,hs,us,ds,so)||(e=[1,0,0,0,1,0,0,0,1],!vl(e,hs,us,ds,so))?!1:(ro.crossVectors(_i,xi),e=[ro.x,ro.y,ro.z],vl(e,hs,us,ds,so))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Jn=[new F,new F,new F,new F,new F,new F,new F,new F],Tn=new F,io=new vi,hs=new F,us=new F,ds=new F,_i=new F,xi=new F,Bi=new F,Ks=new F,so=new F,ro=new F,ki=new F;function vl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ki.fromArray(i,r);let a=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),c=t.dot(ki),l=e.dot(ki),u=n.dot(ki);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Se=new F,oo=new wt,Df=0,kn=class extends An{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Df++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=pu,this.updateRanges=[],this.gpuType=Rn,this.version=0,this._normalizationScale=t!==void 0?dc(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)oo.fromBufferAttribute(this,e),oo.applyMatrix3(t),this.setXY(e,oo.x,oo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):yu(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Su(t,this.array)}};var hr=class extends kn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ur=class extends kn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ke=class extends kn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Pf=new vi,js=new F,Ml=new F,Gi=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Pf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;js.subVectors(t,this.center);let e=js.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(js,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ml.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(js.copy(t.center).add(Ml)),this.expandByPoint(js.copy(t.center).sub(Ml))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Lf=0,xn=new ee,bl=new be,fs=new F,tn=new vi,Qs=new vi,De=new F,on=class i extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sf(t)?ur:hr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Lt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,e,n){return xn.makeTranslation(t,e,n),this.applyMatrix4(xn),this}scale(t,e,n){return xn.makeScale(t,e,n),this.applyMatrix4(xn),this}lookAt(t){return bl.lookAt(t),bl.updateMatrix(),this.applyMatrix4(bl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ke(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Qs.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(tn.min,Qs.min),tn.expandByPoint(De),De.addVectors(tn.max,Qs.max),tn.expandByPoint(De)):(tn.expandByPoint(Qs.min),tn.expandByPoint(Qs.max))}tn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)De.fromBufferAttribute(a,l),c&&(fs.fromBufferAttribute(t,l),De.add(fs)),s=Math.max(s,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new kn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(n.count);for(let U=0;U<n.count;U++)a[U]=new F,c[U]=new F;let u=new F,p=new F,d=new F,f=new wt,m=new wt,x=new wt,g=new F,h=new F;function y(U,P,N){l[U]=l[P]=l[N]=1,u.fromBufferAttribute(n,U),p.fromBufferAttribute(n,P),d.fromBufferAttribute(n,N),f.fromBufferAttribute(r,U),m.fromBufferAttribute(r,P),x.fromBufferAttribute(r,N),p.sub(u),d.sub(u),m.sub(f),x.sub(f);let C=1/(m.x*x.y-x.x*m.y);isFinite(C)&&(g.copy(p).multiplyScalar(x.y).addScaledVector(d,-m.y).multiplyScalar(C),h.copy(d).multiplyScalar(m.x).addScaledVector(p,-x.x).multiplyScalar(C),a[U].add(g),a[P].add(g),a[N].add(g),c[U].add(h),c[P].add(h),c[N].add(h))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let U=0,P=E.length;U<P;++U){let N=E[U],C=N.start,D=N.count;for(let R=C,z=C+D;R<z;R+=3)y(t.getX(R+0),t.getX(R+1),t.getX(R+2))}let M=new F,T=new F,w=new F,_=new F;function b(U){w.fromBufferAttribute(s,U),_.copy(w);let P=a[U];M.copy(P),M.sub(w.multiplyScalar(w.dot(P))).normalize(),T.crossVectors(_,P);let C=T.dot(c[U])<0?-1:1;o.setXYZW(U,M.x,M.y,M.z,C)}for(let U=0,P=n.count;U<P;++U)l[U]&&b(U);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new kn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,u=new F,p=new F;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),x=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(u),c.add(u),l.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,p=a.normalized,d=new l.constructor(c.length*u),f=0,m=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let h=0;h<u;h++)d[m++]=l[f++]}return new kn(d,u,p)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,p=l.length;u<p;u++){let d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let p=0,d=l.length;p<d;p++){let f=l[p];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],p=r[l];for(let d=0,f=p.length;d<f;d++)u.push(p[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let p=o[l];this.addGroup(p.start,p.count,p.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var El=new F,Nf=new F,Of=new Lt,nn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=El.subVectors(n,e).cross(Nf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(El),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Of.getNormalMatrix(t),s=this.coplanarPoint(El).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Uf=0,ni=class extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Ls(),this.name="",this.type="Material",this.blending=Is,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hl,this.blendDst=Gl,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Eo,this.stencilZFail=Eo,this.stencilZPass=Eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new nn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new wt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new wt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Kn=new F,Tl=new F,ao=new F,lo=new F,Mi=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Tl.copy(t).add(e).multiplyScalar(.5),ao.copy(e).sub(t).normalize(),lo.copy(this.origin).sub(Tl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ao),a=lo.dot(this.direction),c=-lo.dot(ao),l=lo.lengthSq(),u=Math.abs(1-o*o),p,d,f,m;if(u>0)if(p=o*c-a,d=o*a-c,m=r*u,p>=0)if(d>=-m)if(d<=m){let x=1/u;p*=x,d*=x,f=p*(p+o*d+2*a)+d*(o*p+d+2*c)+l}else d=r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*c)+l;else d=-r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*c)+l;else d<=-m?(p=Math.max(0,-(-o*r+a)),d=p>0?-r:Math.min(Math.max(-r,-c),r),f=-p*p+d*(d+2*c)+l):d<=m?(p=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(p=Math.max(0,-(o*r+a)),d=p>0?r:Math.min(Math.max(-r,-c),r),f=-p*p+d*(d+2*c)+l);else d=o>0?-r:r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Tl).addScaledVector(ao,d),f}intersectSphere(t,e){if(t.radius<0)return null;Kn.subVectors(t.center,this.origin);let n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-d.z)*p,c=(t.max.z-d.z)*p):(a=(t.max.z-d.z)*p,c=(t.min.z-d.z)*p),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,p=t.x-o.x,d=t.y-o.y,f=t.z-o.z,m=e.x-o.x,x=e.y-o.y,g=e.z-o.z,h=n.x-o.x,y=n.y-o.y,E=n.z-o.z,M=Math.abs(c),T=Math.abs(l),w=Math.abs(u),_,b,U,P,N,C,D,R,z,G,B,tt;if(M>=T&&M>=w?(U=c,C=p,z=m,tt=h,c>=0?(_=l,b=u,P=d,N=f,D=x,R=g,G=y,B=E):(_=u,b=l,P=f,N=d,D=g,R=x,G=E,B=y)):T>=w?(U=l,C=d,z=x,tt=y,l>=0?(_=u,b=c,P=f,N=p,D=g,R=m,G=E,B=h):(_=c,b=u,P=p,N=f,D=m,R=g,G=h,B=E)):(U=u,C=f,z=g,tt=E,u>=0?(_=c,b=l,P=p,N=d,D=m,R=x,G=h,B=y):(_=l,b=c,P=d,N=p,D=x,R=m,G=y,B=h)),U===0)return null;let W=_/U,K=b/U,j=1/U,pt=P-W*C,Rt=N-K*C,Y=D-W*z,ft=R-K*z,xt=G-W*tt,Et=B-K*tt,ut=xt*ft-Et*Y,Dt=pt*Et-Rt*xt,de=Y*Rt-ft*pt;if(s){if(ut<0||Dt<0||de<0)return null}else if((ut<0||Dt<0||de<0)&&(ut>0||Dt>0||de>0))return null;let At=ut+Dt+de;if(At===0)return null;let Jt=j*(ut*C+Dt*z+de*tt);return(At>0?Jt<0:Jt>0)?null:this.at(Jt/At,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ts=class extends ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},vh=new ee,zi=new Mi,co=new Gi,Mh=new F,ho=new F,uo=new F,fo=new F,Al=new F,po=new F,bh=new F,mo=new F,an=class extends be{constructor(t=new on,e=new Ts){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){po.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],p=r[c];u!==0&&(Al.fromBufferAttribute(p,t),o?po.addScaledVector(Al,u):po.addScaledVector(Al.sub(e),u))}e.add(po)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(r),zi.copy(t.ray).recast(t.near),!(co.containsPoint(zi.origin)===!1&&(zi.intersectSphere(co,Mh)===null||zi.origin.distanceToSquared(Mh)>(t.far-t.near)**2))&&(vh.copy(r).invert(),zi.copy(t.ray).applyMatrix4(vh),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){let g=d[m],h=o[g.materialIndex],y=Math.max(g.start,f.start),E=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let M=y,T=E;M<T;M+=3){let w=a.getX(M),_=a.getX(M+1),b=a.getX(M+2);s=go(this,h,t,n,l,u,p,w,_,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,h=x;g<h;g+=3){let y=a.getX(g),E=a.getX(g+1),M=a.getX(g+2);s=go(this,o,t,n,l,u,p,y,E,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){let g=d[m],h=o[g.materialIndex],y=Math.max(g.start,f.start),E=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let M=y,T=E;M<T;M+=3){let w=M,_=M+1,b=M+2;s=go(this,h,t,n,l,u,p,w,_,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let g=m,h=x;g<h;g+=3){let y=g,E=g+1,M=g+2;s=go(this,o,t,n,l,u,p,y,E,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Ff(i,t,e,n,s,r,o,a){let c;if(t.side===$e?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Ri,a),c===null)return null;mo.copy(a),mo.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(mo);return l<e.near||l>e.far?null:{distance:l,point:mo.clone(),object:i}}function go(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,ho),i.getVertexPosition(c,uo),i.getVertexPosition(l,fo);let u=Ff(i,t,e,n,ho,uo,fo,bh);if(u){let p=new F;Si.getBarycoord(bh,ho,uo,fo,p),s&&(u.uv=Si.getInterpolatedAttribute(s,a,c,l,p,new wt)),r&&(u.uv1=Si.getInterpolatedAttribute(r,a,c,l,p,new wt)),o&&(u.normal=Si.getInterpolatedAttribute(o,a,c,l,p,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new F,materialIndex:0};Si.getNormal(ho,uo,fo,d.normal),u.face=d,u.barycoord=p}return u}var Bo=class extends qe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Pe,u=Pe,p,d){super(null,o,a,c,l,u,s,r,p,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hi=new Gi,Bf=new wt(.5,.5),_o=new F,bi=class{constructor(t=new nn,e=new nn,n=new nn,s=new nn,r=new nn,o=new nn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=yn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],p=r[5],d=r[6],f=r[7],m=r[8],x=r[9],g=r[10],h=r[11],y=r[12],E=r[13],M=r[14],T=r[15];if(s[0].setComponents(l-o,f-u,h-m,T-y).normalize(),s[1].setComponents(l+o,f+u,h+m,T+y).normalize(),s[2].setComponents(l+a,f+p,h+x,T+E).normalize(),s[3].setComponents(l-a,f-p,h-x,T-E).normalize(),n)s[4].setComponents(c,d,g,M).normalize(),s[5].setComponents(l-c,f-d,h-g,T-M).normalize();else if(s[4].setComponents(l-c,f-d,h-g,T-M).normalize(),e===yn)s[5].setComponents(l+c,f+d,h+g,T+M).normalize();else if(e===ys)s[5].setComponents(c,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(t){Hi.center.set(0,0,0);let e=Bf.distanceTo(t.center);return Hi.radius=.7071067811865476+e,Hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(_o.x=s.normal.x>0?t.max.x:t.min.x,_o.y=s.normal.y>0?t.max.y:t.min.y,_o.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_o)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Eh=new ee,ko=class i{constructor(){this.coordinateSystem=yn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Eh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new bi),n[s].setFromProjectionMatrix(Eh,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new bi),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var Vi=class extends ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},zo=new F,Ho=new F,Th=new ee,tr=new Mi,xo=new Gi,wl=new F,Ah=new F,As=class extends be{constructor(t=new on,e=new Vi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)zo.fromBufferAttribute(e,s-1),Ho.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=zo.distanceTo(Ho);t.setAttribute("lineDistance",new ke(n,1))}else It("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xo.copy(n.boundingSphere),xo.applyMatrix4(s),xo.radius+=r,t.ray.intersectsSphere(xo)===!1)return;Th.copy(s).invert(),tr.copy(t.ray).applyMatrix4(Th);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=l){let h=u.getX(x),y=u.getX(x+1),E=yo(this,t,tr,c,h,y,x);E&&e.push(E)}if(this.isLineLoop){let x=u.getX(m-1),g=u.getX(f),h=yo(this,t,tr,c,x,g,m-1);h&&e.push(h)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=l){let h=yo(this,t,tr,c,x,x+1,x);h&&e.push(h)}if(this.isLineLoop){let x=yo(this,t,tr,c,m-1,f,m-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function yo(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(zo.fromBufferAttribute(a,s),Ho.fromBufferAttribute(a,r),e.distanceSqToSegment(zo,Ho,wl,Ah)>n)return;wl.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(wl);if(!(l<t.near||l>t.far))return{distance:l,point:Ah.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var dr=class extends qe{constructor(t=[],e=Yi,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var ii=class extends qe{constructor(t,e,n=wn,s,r,o,a=Pe,c=Pe,l,u=ti,p=1){if(u!==ti&&u!==oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:p};super(d,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ms(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},fr=class extends ii{constructor(t,e=wn,n=Yi,s,r,o=Pe,a=Pe,c,l=ti){let u={width:t,height:t,depth:1},p=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},pr=class extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},si=class i extends on{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],p=[],d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(p,2));function m(x,g,h,y,E,M,T,w,_,b,U){let P=M/_,N=T/b,C=M/2,D=T/2,R=w/2,z=_+1,G=b+1,B=0,tt=0,W=new F;for(let K=0;K<G;K++){let j=K*N-D;for(let pt=0;pt<z;pt++){let Rt=pt*P-C;W[x]=Rt*y,W[g]=j*E,W[h]=R,l.push(W.x,W.y,W.z),W[x]=0,W[g]=0,W[h]=w>0?1:-1,u.push(W.x,W.y,W.z),p.push(pt/_),p.push(1-K/b),B+=1}}for(let K=0;K<b;K++)for(let j=0;j<_;j++){let pt=d+j+z*K,Rt=d+j+z*(K+1),Y=d+(j+1)+z*(K+1),ft=d+(j+1)+z*K;c.push(pt,Rt,ft),c.push(Rt,Y,ft),tt+=6}a.addGroup(f,tt,U),f+=tt,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var mr=class i extends on{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,p=t/a,d=e/c,f=[],m=[],x=[],g=[];for(let h=0;h<u;h++){let y=h*d-o;for(let E=0;E<l;E++){let M=E*p-r;m.push(M,-y,0),x.push(0,0,1),g.push(E/a),g.push(1-h/c)}}for(let h=0;h<c;h++)for(let y=0;y<a;y++){let E=y+l*h,M=y+l*(h+1),T=y+1+l*(h+1),w=y+1+l*h;f.push(E,M,w),f.push(M,T,w)}this.setIndex(f),this.setAttribute("position",new ke(m,3)),this.setAttribute("normal",new ke(x,3)),this.setAttribute("uv",new ke(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},gr=class i extends on{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],u=[],p=t,d=(e-t)/s,f=new F,m=new wt;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let h=r+g/n*o;f.x=p*Math.cos(h),f.y=p*Math.sin(h),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,u.push(m.x,m.y)}p+=d}for(let x=0;x<s;x++){let g=x*(n+1);for(let h=0;h<n;h++){let y=h+g,E=y,M=y+n+1,T=y+n+2,w=y+1;a.push(E,M,w),a.push(M,T,w)}}this.setIndex(a),this.setAttribute("position",new ke(c,3)),this.setAttribute("normal",new ke(l,3)),this.setAttribute("uv",new ke(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};function Zi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(wh(s))s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(wh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function ze(i){let t={};for(let e=0;e<i.length;e++){let n=Zi(i[e]);for(let s in n)t[s]=n[s]}return t}function wh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function kf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function pc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}var Mu={clone:Zi,merge:ze},zf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zn=class extends ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zf,this.fragmentShader=Hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=kf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new kt().setHex(s.value);break;case"v2":this.uniforms[n].value=new wt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ue().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ee().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Go=class extends zn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},_r=class extends ni{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ga,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Vo=class extends ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Wo=class extends ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};var xr=class extends Vi{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function ps(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function So(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ei=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},$o=class extends Ei{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Il,endingEnd:Il}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Dl:r=t,a=2*e-n;break;case Pl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Dl:o=t,c=2*n-e;break;case Pl:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),x=m*m,g=x*m,h=-d*g+2*d*x-d*m,y=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,E=(-1-f)*g+(1.5+f)*x+.5*m,M=f*g-f*x;for(let T=0;T!==a;++T)r[T]=h*o[u+T]+y*o[l+T]+E*o[c+T]+M*o[p+T];return r}},Xo=class extends Ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(s-e),p=1-u;for(let d=0;d!==a;++d)r[d]=o[l+d]*p+o[c+d]*u;return r}},Yo=class extends Ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},qo=class extends Ei{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,p=this.outTangents;if(!u||!p){let m=(n-e)/(s-e),x=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*x+o[c+g]*m;return r}let d=a*2,f=t-1;for(let m=0;m!==a;++m){let x=o[l+m],g=o[c+m],h=f*d+m*2,y=p[h],E=p[h+1],M=t*d+m*2,T=u[M],w=u[M+1],_=Vf(n,e,y,T,s);r[m]=bu(_,x,E,w,g)}return r}};function bu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Gf(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Vf(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=bu(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Gf(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var ln=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ps(e,this.TimeBufferType),this.values=ps(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ps(t.times,Array),values:ps(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),So(t.settings)&&(n.settings={inTangents:ps(t.settings.inTangents,Array),outTangents:ps(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Yo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Xo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new $o(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new qo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case sr:e=this.InterpolantFactoryMethodDiscrete;break;case No:e=this.InterpolantFactoryMethodLinear;break;case bo:e=this.InterpolantFactoryMethodSmooth;break;case Cl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return It("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return sr;case this.InterpolantFactoryMethodLinear:return No;case this.InterpolantFactoryMethodSmooth:return bo;case this.InterpolantFactoryMethodBezier:return Cl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;So(this.settings)&&(Rh(this.settings.inTangents,t),Rh(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;So(this.settings)&&(Ch(this.settings.inTangents,t),Ch(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Pt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Pt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Pt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Pt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&rf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Pt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===bo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{let p=a*n,d=p-n,f=p+n;for(let m=0;m!==n;++m){let x=e[p+m];if(x!==e[d+m]||x!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let p=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[p+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,So(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Rh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function Ch(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=No;var Ti=class extends ln{constructor(t,e,n){super(t,e,n)}};Ti.prototype.ValueTypeName="bool";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=sr;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends ln{constructor(t,e,n,s){super(t,e,n,s)}};Zo.prototype.ValueTypeName="color";var Jo=class extends ln{constructor(t,e,n,s){super(t,e,n,s)}};Jo.prototype.ValueTypeName="number";var Ko=class extends Ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let u=l+a;l!==u;l+=4)sn.slerpFlat(r,0,o,l-a,o,l,c);return r}},yr=class extends ln{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ko(this.times,this.values,this.getValueSize(),t)}};yr.prototype.ValueTypeName="quaternion";yr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends ln{constructor(t,e,n){super(t,e,n)}};Ai.prototype.ValueTypeName="string";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=sr;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var jo=class extends ln{constructor(t,e,n,s){super(t,e,n,s)}};jo.prototype.ValueTypeName="vector";var Qo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,p){return l.push(u,p),this},this.removeHandler=function(u){let p=l.indexOf(u);return p!==-1&&l.splice(p,2),this},this.getHandler=function(u){for(let p=0,d=l.length;p<d;p+=2){let f=l[p],m=l[p+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Eu=new Qo,ta=class{constructor(t){this.manager=t!==void 0?t:Eu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ta.DEFAULT_MATERIAL_NAME="__DEFAULT";var Sr=class extends be{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},vr=class extends Sr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Rl=new ee,Ih=new F,Dh=new F,ea=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.mapType=Ze,this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bi,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Ih.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ih),Dh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Rl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Rl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===ys||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Rl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},vo=new F,Mo=new sn,Fn=new F,Mr=class extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(vo,Mo,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vo,Mo,Fn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(vo,Mo,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vo,Mo,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new F,Ph=new wt,Lh=new wt,Ve=class extends Mr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(nr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yi.x,yi.y).multiplyScalar(-t/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-t/yi.z)}getViewSize(t,e){return this.getViewBounds(t,Ph,Lh),e.subVectors(Lh,Ph)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(nr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Wi=class extends Mr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ll=class extends ea{constructor(){super(new Wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},br=class extends Sr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new Ll}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var ms=-90,gs=1,ws=class extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ve(ms,gs,t,e);s.layers=this.layers,this.add(s);let r=new Ve(ms,gs,t,e);r.layers=this.layers,this.add(r);let o=new Ve(ms,gs,t,e);o.layers=this.layers,this.add(o);let a=new Ve(ms,gs,t,e);a.layers=this.layers,this.add(a);let c=new Ve(ms,gs,t,e);c.layers=this.layers,this.add(c);let l=new Ve(ms,gs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,p=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=x,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(p,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},na=class extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var mc="\\[\\]\\.:\\/",Wf=new RegExp("["+mc+"]","g"),gc="[^"+mc+"]",$f="[^"+mc.replace("\\.","")+"]",Xf=/((?:WC+[\/:])*)/.source.replace("WC",gc),Yf=/(WCOD+)?/.source.replace("WCOD",$f),qf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gc),Zf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gc),Jf=new RegExp("^"+Xf+Yf+qf+Zf+"$"),Kf=["material","materials","bones","map"],Nl=class{constructor(t,e,n){let s=n||le.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},le=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Wf,"")}static parseTrackName(t){let e=Jf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Kf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Pt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Pt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Pt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Pt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Pt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;Pt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};le.Composite=Nl;le.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};le.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};le.prototype.GetterByBindingType=[le.prototype._getValue_direct,le.prototype._getValue_array,le.prototype._getValue_arrayElement,le.prototype._getValue_toArray];le.prototype.SetterByBindingTypeAndVersioning=[[le.prototype._setValue_direct,le.prototype._setValue_direct_setNeedsUpdate,le.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[le.prototype._setValue_array,le.prototype._setValue_array_setNeedsUpdate,le.prototype._setValue_array_setMatrixWorldNeedsUpdate],[le.prototype._setValue_arrayElement,le.prototype._setValue_arrayElement_setNeedsUpdate,le.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[le.prototype._setValue_fromArray,le.prototype._setValue_fromArray_setNeedsUpdate,le.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var bx=new Float32Array(1);var Nh=new ee,Er=class{constructor(t,e,n=0,s=1/0){this.ray=new Mi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new bs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Pt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Nh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nh),this}intersectObject(t,e=!0,n=[]){return Ol(t,this,n,e),n.sort(Oh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ol(t[s],this,n,e);return n.sort(Oh),n}};function Oh(i,t){return i.distance-t.distance}function Ol(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Ol(r[o],t,e,!0)}}var Rs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Gt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Gt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ul=class{static{this.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};var Tr=class extends An{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function _c(i,t,e,n){let s=jf(n);switch(e){case nc:return i*t;case sc:return i*t/s.components*s.byteLength;case ca:return i*t/s.components*s.byteLength;case Ci:return i*t*2/s.components*s.byteLength;case ha:return i*t*2/s.components*s.byteLength;case ic:return i*t*3/s.components*s.byteLength;case In:return i*t*4/s.components*s.byteLength;case ua:return i*t*4/s.components*s.byteLength;case Rr:case Cr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ir:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fa:case ma:return Math.max(i,16)*Math.max(t,8)/4;case da:case pa:return Math.max(i,8)*Math.max(t,8)/2;case ga:case _a:case ya:case Sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case xa:case Pr:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ba:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case wa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Oa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ua:case Fa:case Ba:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ka:case za:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Lr:case Ha:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jf(i){switch(i){case Ze:case jl:return{byteLength:1,components:1};case Ps:case Ql:case Cn:return{byteLength:2,components:1};case aa:case la:return{byteLength:2,components:4};case wn:case oa:case Rn:return{byteLength:4,components:1};case tc:case ec:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Xu(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function tp(i){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,p=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,c,l){let u=c.array,p=c.updateRanges;if(i.bindBuffer(l,a),p.length===0)i.bufferSubData(l,0,u);else{p.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<p.length;f++){let m=p[d],x=p[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,p[d]=x)}p.length=d+1;for(let f=0,m=p.length;f<m;f++){let x=p[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,np=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,op=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ap=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,hp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,up=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ep=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ip="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Op=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Gp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$p=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Xp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Qp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,em=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,om=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,am=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,um=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pm=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ym=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,bm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Em=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Am=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Im=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Om=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,km=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$m=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ym=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,t0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i0=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,a0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,l0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,c0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,u0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,f0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,p0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,m0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,y0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,v0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,M0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,T0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,C0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,P0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,L0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:ep,alphahash_pars_fragment:np,alphamap_fragment:ip,alphamap_pars_fragment:sp,alphatest_fragment:rp,alphatest_pars_fragment:op,aomap_fragment:ap,aomap_pars_fragment:lp,batching_pars_vertex:cp,batching_vertex:hp,begin_vertex:up,beginnormal_vertex:dp,bsdfs:fp,iridescence_fragment:pp,bumpmap_pars_fragment:mp,clipping_planes_fragment:gp,clipping_planes_pars_fragment:_p,clipping_planes_pars_vertex:xp,clipping_planes_vertex:yp,color_fragment:Sp,color_pars_fragment:vp,color_pars_vertex:Mp,color_vertex:bp,common:Ep,defaultnormal_vertex:Tp,displacementmap_pars_vertex:Ap,displacementmap_vertex:wp,emissivemap_fragment:Rp,emissivemap_pars_fragment:Cp,colorspace_fragment:Ip,colorspace_pars_fragment:Dp,envmap_fragment:Pp,envmap_common_pars_fragment:Lp,envmap_pars_fragment:Np,envmap_pars_vertex:Op,envmap_physical_pars_fragment:Xp,envmap_vertex:Up,fog_vertex:Fp,fog_pars_vertex:Bp,fog_fragment:kp,fog_pars_fragment:zp,gradientmap_pars_fragment:Hp,lightmap_pars_fragment:Gp,lights_lambert_fragment:Vp,lights_lambert_pars_fragment:Wp,lights_pars_begin:$p,lights_toon_fragment:Yp,lights_toon_pars_fragment:qp,lights_phong_fragment:Zp,lights_phong_pars_fragment:Jp,lights_physical_fragment:Kp,lights_physical_pars_fragment:jp,lights_fragment_begin:Qp,lights_fragment_maps:tm,lights_fragment_end:em,lightprobes_pars_fragment:nm,logdepthbuf_fragment:im,logdepthbuf_pars_fragment:sm,logdepthbuf_pars_vertex:rm,logdepthbuf_vertex:om,map_fragment:am,map_pars_fragment:lm,map_particle_fragment:cm,map_particle_pars_fragment:hm,metalnessmap_fragment:um,metalnessmap_pars_fragment:dm,morphinstance_vertex:fm,morphcolor_vertex:pm,morphnormal_vertex:mm,morphtarget_pars_vertex:gm,morphtarget_vertex:_m,normal_fragment_begin:xm,normal_fragment_maps:ym,normal_pars_fragment:Sm,normal_pars_vertex:vm,normal_vertex:Mm,normalmap_pars_fragment:bm,clearcoat_normal_fragment_begin:Em,clearcoat_normal_fragment_maps:Tm,clearcoat_pars_fragment:Am,iridescence_pars_fragment:wm,opaque_fragment:Rm,packing:Cm,premultiplied_alpha_fragment:Im,project_vertex:Dm,dithering_fragment:Pm,dithering_pars_fragment:Lm,roughnessmap_fragment:Nm,roughnessmap_pars_fragment:Om,shadowmap_pars_fragment:Um,shadowmap_pars_vertex:Fm,shadowmap_vertex:Bm,shadowmask_pars_fragment:km,skinbase_vertex:zm,skinning_pars_vertex:Hm,skinning_vertex:Gm,skinnormal_vertex:Vm,specularmap_fragment:Wm,specularmap_pars_fragment:$m,tonemapping_fragment:Xm,tonemapping_pars_fragment:Ym,transmission_fragment:qm,transmission_pars_fragment:Zm,uv_pars_fragment:Jm,uv_pars_vertex:Km,uv_vertex:jm,worldpos_vertex:Qm,background_vert:t0,background_frag:e0,backgroundCube_vert:n0,backgroundCube_frag:i0,cube_vert:s0,cube_frag:r0,depth_vert:o0,depth_frag:a0,distance_vert:l0,distance_frag:c0,equirect_vert:h0,equirect_frag:u0,linedashed_vert:d0,linedashed_frag:f0,meshbasic_vert:p0,meshbasic_frag:m0,meshlambert_vert:g0,meshlambert_frag:_0,meshmatcap_vert:x0,meshmatcap_frag:y0,meshnormal_vert:S0,meshnormal_frag:v0,meshphong_vert:M0,meshphong_frag:b0,meshphysical_vert:E0,meshphysical_frag:T0,meshtoon_vert:A0,meshtoon_frag:w0,points_vert:R0,points_frag:C0,shadow_vert:I0,shadow_frag:D0,sprite_vert:P0,sprite_frag:L0},gt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Wn={basic:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new kt(0)},envMapIntensity:{value:1}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:ze([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:ze([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new kt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:ze([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:ze([gt.points,gt.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:ze([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:ze([gt.common,gt.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:ze([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:ze([gt.sprite,gt.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distance:{uniforms:ze([gt.common,gt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distance_vert,fragmentShader:zt.distance_frag},shadow:{uniforms:ze([gt.lights,gt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};Wn.physical={uniforms:ze([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var Va={r:0,b:0,g:0},N0=new ee,Yu=new Lt;Yu.set(-1,0,0,0,1,0,0,0,1);function O0(i,t,e,n,s,r){let o=new kt(0),a=s===!0?0:1,c,l,u=null,p=0,d=null;function f(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){let M=y.backgroundBlurriness>0;E=t.get(E,M)}return E}function m(y){let E=!1,M=f(y);M===null?g(o,a):M&&M.isColor&&(g(M,1),E=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,E){let M=f(E);M&&M.isCubeTexture?(l===void 0&&(l=new an(new si(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:Zi(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(N0.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Yu),l.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Qt,(u!==M||p!==M.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,p=M.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new an(new mr(2,2),new zn({name:"BackgroundMaterial",uniforms:Zi(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Qt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||p!==M.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,p=M.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function g(y,E){y.getRGB(Va,pc(i)),e.buffers.color.setClear(Va.r,Va.g,Va.b,E,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,E=1){o.set(y),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,g(o,a)},render:m,addToRenderList:x,dispose:h}}function U0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(N,C,D,R,z){let G=!1,B=p(N,R,D,C);r!==B&&(r=B,l(r.object)),G=f(N,R,D,z),G&&m(N,R,D,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,M(N,C,D,R),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function u(N){return i.deleteVertexArray(N)}function p(N,C,D,R){let z=R.wireframe===!0,G=n[C.id];G===void 0&&(G={},n[C.id]=G);let B=N.isInstancedMesh===!0?N.id:0,tt=G[B];tt===void 0&&(tt={},G[B]=tt);let W=tt[D.id];W===void 0&&(W={},tt[D.id]=W);let K=W[z];return K===void 0&&(K=d(c()),W[z]=K),K}function d(N){let C=[],D=[],R=[];for(let z=0;z<e;z++)C[z]=0,D[z]=0,R[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:D,attributeDivisors:R,object:N,attributes:{},index:null}}function f(N,C,D,R){let z=r.attributes,G=C.attributes,B=0,tt=D.getAttributes();for(let W in tt)if(tt[W].location>=0){let j=z[W],pt=G[W];if(pt===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(pt=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(pt=N.instanceColor)),j===void 0||j.attribute!==pt||pt&&j.data!==pt.data)return!0;B++}return r.attributesNum!==B||r.index!==R}function m(N,C,D,R){let z={},G=C.attributes,B=0,tt=D.getAttributes();for(let W in tt)if(tt[W].location>=0){let j=G[W];j===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(j=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(j=N.instanceColor));let pt={};pt.attribute=j,j&&j.data&&(pt.data=j.data),z[W]=pt,B++}r.attributes=z,r.attributesNum=B,r.index=R}function x(){let N=r.newAttributes;for(let C=0,D=N.length;C<D;C++)N[C]=0}function g(N){h(N,0)}function h(N,C){let D=r.newAttributes,R=r.enabledAttributes,z=r.attributeDivisors;D[N]=1,R[N]===0&&(i.enableVertexAttribArray(N),R[N]=1),z[N]!==C&&(i.vertexAttribDivisor(N,C),z[N]=C)}function y(){let N=r.newAttributes,C=r.enabledAttributes;for(let D=0,R=C.length;D<R;D++)C[D]!==N[D]&&(i.disableVertexAttribArray(D),C[D]=0)}function E(N,C,D,R,z,G,B){B===!0?i.vertexAttribIPointer(N,C,D,z,G):i.vertexAttribPointer(N,C,D,R,z,G)}function M(N,C,D,R){x();let z=R.attributes,G=D.getAttributes(),B=C.defaultAttributeValues;for(let tt in G){let W=G[tt];if(W.location>=0){let K=z[tt];if(K===void 0&&(tt==="instanceMatrix"&&N.instanceMatrix&&(K=N.instanceMatrix),tt==="instanceColor"&&N.instanceColor&&(K=N.instanceColor)),K!==void 0){let j=K.normalized,pt=K.itemSize,Rt=t.get(K);if(Rt===void 0)continue;let Y=Rt.buffer,ft=Rt.type,xt=Rt.bytesPerElement,Et=ft===i.INT||ft===i.UNSIGNED_INT||K.gpuType===oa;if(K.isInterleavedBufferAttribute){let ut=K.data,Dt=ut.isInterleavedBuffer===!0?ut.stride:ut.itemSize,de=K.offset;if(ut.isInstancedInterleavedBuffer||ut.isInstancedBufferAttribute){for(let At=0;At<W.locationSize;At++)h(W.location+At,ut.meshPerAttribute);N.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let At=0;At<W.locationSize;At++)g(W.location+At);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let At=0;At<W.locationSize;At++)E(W.location+At,pt/W.locationSize,ft,j,Dt*xt,(de+pt/W.locationSize*At)*xt,Et)}else{if(K.isInstancedBufferAttribute){for(let ut=0;ut<W.locationSize;ut++)h(W.location+ut,K.meshPerAttribute);N.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ut=0;ut<W.locationSize;ut++)g(W.location+ut);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let ut=0;ut<W.locationSize;ut++)E(W.location+ut,pt/W.locationSize,ft,j,pt*xt,pt/W.locationSize*ut*xt,Et)}}else if(B!==void 0){let j=B[tt];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(W.location,j);break;case 3:i.vertexAttrib3fv(W.location,j);break;case 4:i.vertexAttrib4fv(W.location,j);break;default:i.vertexAttrib1fv(W.location,j)}}}}y()}function T(){U();for(let N in n){let C=n[N];for(let D in C){let R=C[D];for(let z in R){let G=R[z];for(let B in G)u(G[B].object),delete G[B];delete R[z]}}delete n[N]}}function w(N){if(n[N.id]===void 0)return;let C=n[N.id];for(let D in C){let R=C[D];for(let z in R){let G=R[z];for(let B in G)u(G[B].object),delete G[B];delete R[z]}}delete n[N.id]}function _(N){for(let C in n){let D=n[C];for(let R in D){let z=D[R];if(z[N.id]===void 0)continue;let G=z[N.id];for(let B in G)u(G[B].object),delete G[B];delete z[N.id]}}}function b(N){for(let C in n){let D=n[C],R=N.isInstancedMesh===!0?N.id:0,z=D[R];if(z!==void 0){for(let G in z){let B=z[G];for(let tt in B)u(B[tt].object),delete B[tt];delete z[G]}delete D[R],Object.keys(D).length===0&&delete n[C]}}}function U(){P(),o=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:b,releaseStatesOfProgram:_,initAttributes:x,enableAttribute:g,disableUnusedAttributes:y}}function F0(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let d=0;for(let f=0;f<u;f++)d+=l[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function B0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let _=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==In&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){let b=_===Cn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==Ze&&_!==Rn&&!b&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(It("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&p===!1;e.reversedDepthBuffer===!0&&p===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&p===!0&&It("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:M,maxSamples:T,samples:w}}function k0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new nn,a=new Lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){let f=p.length!==0||d||n!==0||s;return s=d,n=p.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,d){e=u(p,d,0)},this.setState=function(p,d,f){let m=p.clippingPlanes,x=p.clipIntersection,g=p.clipShadows,h=i.get(p);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{let y=r?0:n,E=y*4,M=h.clippingState||null;c.value=M,M=u(m,d,E,f);for(let T=0;T!==E;++T)M[T]=e[T];h.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,d,f,m){let x=p!==null?p.length:0,g=null;if(x!==0){if(g=c.value,m!==!0||g===null){let h=f+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<h)&&(g=new Float32Array(h));for(let E=0,M=f;E!==x;++E,M+=4)o.copy(p[E]).applyMatrix4(y,a),o.normal.toArray(g,M),g[M+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}var Ur=class extends rn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new dr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new si(5,5,5),r=new zn({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:$i});r.uniforms.tEquirect.value=e;let o=new an(s,r),a=e.minFilter;return e.minFilter===ri&&(e.minFilter=We),new ws(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Tu=256,z0=3,H0=20,qu=256,Zu=16,G0=3,V0=new F,W0=new kt,$a=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ws(1,10,null),this._boxMesh=new an(new si(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=V0}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);let p=c.autoClear,d=c.autoClearColor,f=c.autoClearDepth,m=c.autoClearStencil,x=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(t.background=c.getClearColor(W0));let g=new ws(n,s,u);return g.position.copy(a),g.update(c,t),c.autoClear=p,c.autoClearColor=d,c.autoClearDepth=f,c.autoClearStencil=m,t.background=x,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Tu,uc(t))}_fromTexture(t,e){t.mapping===Yi||t.mapping===Ds?this._setSize(t.image.length===0?Tu:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Au(t,!1,!1),n=Math.log2(t)-z0;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Au(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Yi||t.mapping===Ds?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ru()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=wu()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=$0(),this._integrationMaterial=X0());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Zu);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-G0)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let c=a>0?Math.log2(e)+.5*Math.log2(6/(qu*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Y0());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Au(i,t,e){return new Ur(i,{minFilter:ri,generateMipmaps:t,type:Cn,colorSpace:rr,depthBuffer:e})}function Fr(i,t,e){return new zn({name:i,uniforms:t,vertexShader:zt.cube_vert,fragmentShader:e,side:$e,blending:$i,depthTest:!1,depthWrite:!1})}function $0(){return Fr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${qu}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function X0(){return Fr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Zu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Y0(){return Fr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${H0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function wu(){return Fr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Ru(){return Fr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function q0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===ia||f===sa)if(t.has(d)){let m=t.get(d).texture;return a(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let x=new Ur(m.height);return x.fromEquirectangularTexture(i,d),t.set(d,x),d.addEventListener("dispose",l),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,m=f===ia||f===sa,x=f===Yi||f===Ds;if(m||x){let g=e.get(d),h=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return n===null&&(n=new $a(i)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{let y=d.image;return m&&y&&y.height>0||x&&y&&c(y)?(n===null&&(n=new $a(i)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function a(d,f){return f===ia?d.mapping=Yi:f===sa&&(d.mapping=Ds),d}function c(d){let f=0,m=6;for(let x=0;x<m;x++)d[x]!==void 0&&f++;return f===m}function l(d){let f=d.target;f.removeEventListener("dispose",l);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function u(d){let f=d.target;f.removeEventListener("dispose",u);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function Z0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&er("WebGLRenderer: "+n+" extension not supported."),s}}}function J0(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(m=>delete s[m]);function a(m){c(m.target)}function c(m){m.index!==null&&t.remove(m.index);for(let g in m.attributes)t.remove(m.attributes[g]);m.removeEventListener("dispose",a),delete s[m.id],o.unregister(m);let x=r.get(m);x&&(t.remove(x),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function l(m,x){return s[x.id]!==void 0||(x.addEventListener("dispose",a),s[x.id]=new WeakRef(x),o.register(x,x.id,x),e.memory.geometries++),x}function u(m){let x=m.attributes;for(let g in x)t.update(x[g],i.ARRAY_BUFFER)}function p(m){let x=m.index,g=m.attributes.position,h=0;if(g===void 0)return;let y=x!==null?x.array.length:g.array.length/3-1,E=g.count>=65535?ur:hr,M=new E(Math.ceil(y/3)*6,1),T=M.array;if(x!==null){let _=x.array;h=x.version;for(let b=0,U=0;b<y;b+=3){let P=_[b+0],N=_[b+1],C=_[b+2];T[U++]=P,T[U++]=N,T[U++]=N,T[U++]=C,T[U++]=C,T[U++]=P}}else{h=g.version;for(let _=0,b=0;_<y;_+=3){let U=_+0,P=_+1,N=_+2;T[b++]=U,T[b++]=P,T[b++]=P,T[b++]=N,T[b++]=N,T[b++]=U}}M.version=h;let w=r.get(m);w&&t.remove(w),r.set(m,M)}function d(m){let x=r.get(m);if(x){let g=m.index;g!==null&&x.version<g.version&&p(m)}else p(m);return r.get(m)}function f(){for(let m in s){let x=s[m].deref();x!==void 0&&c(x)}}return{get:l,update:u,getWireframeAttribute:d,dispose:f}}function K0(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,d){i.drawElements(n,d,r,p*o),e.update(d,n,1)}function l(p,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,p*o,f),e.update(d,n,f))}function u(p,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,p,0,f);let x=0;for(let g=0;g<f;g++)x+=d[g];e.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function j0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Pt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Q0(i,t,e){let n=new WeakMap,s=new ue;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==p){let U=function(){_.dispose(),n.delete(a),a.removeEventListener("dispose",U)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],E=0;f===!0&&(E=1),m===!0&&(E=2),x===!0&&(E=3);let M=a.attributes.position.count*E,T=1;M>t.maxTextureSize&&(T=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let w=new Float32Array(M*T*4*p),_=new lr(w,M,T,p);_.type=Rn,_.needsUpdate=!0;let b=E*4;for(let P=0;P<p;P++){let N=g[P],C=h[P],D=y[P],R=M*T*4*P;for(let z=0;z<N.count;z++){let G=z*b;f===!0&&(s.fromBufferAttribute(N,z),w[R+G+0]=s.x,w[R+G+1]=s.y,w[R+G+2]=s.z,w[R+G+3]=0),m===!0&&(s.fromBufferAttribute(C,z),w[R+G+4]=s.x,w[R+G+5]=s.y,w[R+G+6]=s.z,w[R+G+7]=0),x===!0&&(s.fromBufferAttribute(D,z),w[R+G+8]=s.x,w[R+G+9]=s.y,w[R+G+10]=s.z,w[R+G+11]=D.itemSize===4?s.w:1)}}d={count:p,texture:_,size:new wt(M,T)},n.set(a,d),a.addEventListener("dispose",U)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function tg(i,t,e,n,s){let r=new WeakMap;function o(l){let u=s.render.frame,p=l.geometry,d=t.get(l,p);if(r.get(d)!==u&&(t.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function a(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var eg={[Wl]:"LINEAR_TONE_MAPPING",[$l]:"REINHARD_TONE_MAPPING",[Xl]:"CINEON_TONE_MAPPING",[Yl]:"ACES_FILMIC_TONE_MAPPING",[Zl]:"AGX_TONE_MAPPING",[Jl]:"NEUTRAL_TONE_MAPPING",[ql]:"CUSTOM_TONE_MAPPING"};function ng(i,t,e,n,s,r){let o=new rn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,u=new on;u.setAttribute("position",new ke([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new ke([0,2,0,0,2,0],2));let p=new Go({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new an(u,p),f=new Wi(-1,1,1,-1,0,1),m=null,x=null,g=!1,h,y=null,E=[],M=!1;this.setSize=function(T,w){o.setSize(T,w),a!==null&&a.setSize(T,w),c!==null&&c.setSize(T,w);for(let _=0;_<E.length;_++){let b=E[_];b.setSize&&b.setSize(T,w)}},this.setEffects=function(T){E=T,M=E.length>0&&E[0].isRenderPass===!0;let w=o.width,_=o.height;E.length>0&&a===null&&(a=new rn(w,_,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),c=new rn(w,_,{type:Cn,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&E.some(U=>U.needsDepthTexture===!0);b!==(o.depthTexture!==null)&&(b===!0&&l===null&&(l=new ii(w,_),r===!0&&(l.format=oi,l.type=qi)),o.dispose(),o.depthTexture=b?l:null,o.resolveDepthBuffer=b,o.storeMultisampledDepthBuffer=b);for(let U=0;U<E.length;U++){let P=E[U];P.setSize&&P.setSize(w,_),b&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(l)}},this.begin=function(T,w){if(g||T.toneMapping===Gn&&E.length===0)return!1;if(y=w,w!==null){let _=w.width,b=w.height;(o.width!==_||o.height!==b)&&this.setSize(_,b)}return M===!1&&T.setRenderTarget(o),h=T.toneMapping,T.toneMapping=Gn,!0},this.hasRenderPass=function(){return M},this.end=function(T,w){T.toneMapping=h,g=!0;let _=o,b=a;for(let U=0;U<E.length;U++){let P=E[U];P.enabled!==!1&&(P.render(T,b,_,w),P.needsSwap!==!1&&(_=b,b=b===a?c:a))}if(m!==T.outputColorSpace||x!==T.toneMapping){m=T.outputColorSpace,x=T.toneMapping,p.defines={},Xt.getTransfer(m)===Qt&&(p.defines.SRGB_TRANSFER="");let U=eg[x];U&&(p.defines[U]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=_.texture,T.setRenderTarget(y),T.render(d,f),y=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),u.dispose(),p.dispose()}}var Ju=new qe,Ku=new ii(1,1),ju=new fr(1),Qu=new lr,td=new Fo,ed=new dr,Cu=[],Iu=[],Du=new Float32Array(16),Pu=new Float32Array(9),Lu=new Float32Array(4);function Os(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Cu[s];if(r===void 0&&(r=new Float32Array(s),Cu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ya(i,t){let e=Iu[t];e===void 0&&(e=new Int32Array(t),Iu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function ig(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function sg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function rg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function og(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function ag(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Lu.set(n),i.uniformMatrix2fv(this.addr,!1,Lu),Te(e,n)}}function lg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Pu.set(n),i.uniformMatrix3fv(this.addr,!1,Pu),Te(e,n)}}function cg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Du.set(n),i.uniformMatrix4fv(this.addr,!1,Du),Te(e,n)}}function hg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function dg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function fg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function pg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function _g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function qa(i){return i.version===0&&(i.compareFunction=ac,i.needsUpdate=!0),i}function xg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=qa(Ku):r=Ju,e.setTexture2D(t||r,s)}function yg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||td,s)}function Sg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=qa(ju):r=ed,e.setTextureCube(t||r,s)}function vg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Qu,s)}function Mg(i){switch(i){case 5126:return ig;case 35664:return sg;case 35665:return rg;case 35666:return og;case 35674:return ag;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return hg;case 35667:case 35671:return ug;case 35668:case 35672:return dg;case 35669:case 35673:return fg;case 5125:return pg;case 36294:return mg;case 36295:return gg;case 36296:return _g;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return vg}}function bg(i,t){i.uniform1fv(this.addr,t)}function Eg(i,t){let e=Os(t,this.size,2);i.uniform2fv(this.addr,e)}function Tg(i,t){let e=Os(t,this.size,3);i.uniform3fv(this.addr,e)}function Ag(i,t){let e=Os(t,this.size,4);i.uniform4fv(this.addr,e)}function wg(i,t){let e=Os(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Rg(i,t){let e=Os(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Cg(i,t){let e=Os(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ig(i,t){i.uniform1iv(this.addr,t)}function Dg(i,t){i.uniform2iv(this.addr,t)}function Pg(i,t){i.uniform3iv(this.addr,t)}function Lg(i,t){i.uniform4iv(this.addr,t)}function Ng(i,t){i.uniform1uiv(this.addr,t)}function Og(i,t){i.uniform2uiv(this.addr,t)}function Ug(i,t){i.uniform3uiv(this.addr,t)}function Fg(i,t){i.uniform4uiv(this.addr,t)}function Bg(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=qa(Ku):o=Ju;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function kg(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||td,r[o])}function zg(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=qa(ju):o=ed;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function Hg(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Qu,r[o])}function Gg(i){switch(i){case 5126:return bg;case 35664:return Eg;case 35665:return Tg;case 35666:return Ag;case 35674:return wg;case 35675:return Rg;case 35676:return Cg;case 5124:case 35670:return Ig;case 35667:case 35671:return Dg;case 35668:case 35672:return Pg;case 35669:case 35673:return Lg;case 5125:return Ng;case 36294:return Og;case 36295:return Ug;case 36296:return Fg;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return kg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Hg}}var Sc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Mg(e.type)}},vc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gg(e.type)}},Mc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},xc=/(\w+)(\])?(\[|\.)?/g;function Nu(i,t){i.seq.push(t),i.map[t.id]=t}function Vg(i,t,e){let n=i.name,s=n.length;for(xc.lastIndex=0;;){let r=xc.exec(n),o=xc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Nu(e,l===void 0?new Sc(a,i,t):new vc(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new Mc(a),Nu(e,p)),e=p}}}var Ns=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);Vg(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Ou(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Wg=37297,$g=0;function Xg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Uu=new Lt;function Yg(i){Xt._getMatrix(Uu,Xt.workingColorSpace,i);let t=`mat3( ${Uu.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case or:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Fu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Xg(i.getShaderSource(t),a)}else return r}function qg(i,t){let e=Yg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Zg={[Wl]:"Linear",[$l]:"Reinhard",[Xl]:"Cineon",[Yl]:"ACESFilmic",[Zl]:"AgX",[Jl]:"Neutral",[ql]:"Custom"};function Jg(i,t){let e=Zg[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Wa=new F;function Kg(){Xt.getLuminanceCoefficients(Wa);let i=Wa.x.toFixed(4),t=Wa.y.toFixed(4),e=Wa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Or).join(`
`)}function Qg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function t_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Or(i){return i!==""}function Bu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function ku(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var e_=/^[ \t]*#include +<([\w\d./]+)>/gm;function bc(i){return i.replace(e_,n_)}function n_(i,t){let e=zt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return bc(e)}var i_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zu(i){return i.replace(i_,s_)}function s_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var r_={[Ar]:"SHADOWMAP_TYPE_PCF",[Cs]:"SHADOWMAP_TYPE_VSM"};function o_(i){return r_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var a_={[Ds]:"ENVMAP_MODE_REFRACTION"};function l_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":a_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var c_={[Vl]:"ENVMAP_BLENDING_MULTIPLY",[iu]:"ENVMAP_BLENDING_MIX",[su]:"ENVMAP_BLENDING_ADD"};function h_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":c_[i.combine]||"ENVMAP_BLENDING_NONE"}function u_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=o_(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=l_(e),p=h_(e),d=jg(e),f=Qg(r),m=s.createProgram(),x,g,h=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Or).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Or).join(`
`),g.length>0&&(g+=`
`)):(x=[Hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Or).join(`
`),g=[Hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?zt.tonemapping_pars_fragment:"",e.toneMapping!==Gn?Jg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,qg("linearToOutputTexel",e.outputColorSpace),Kg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Or).join(`
`)),o=bc(o),o=Bu(o,e),o=ku(o,e),a=bc(a),a=Bu(a,e),a=ku(a,e),o=zu(o),a=zu(a),e.isRawShaderMaterial!==!0&&(h=`#version 300 es
`,x=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",e.glslVersion===lc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=h+x+o,E=h+g+a,M=Ou(s,s.VERTEX_SHADER,y),T=Ou(s,s.FRAGMENT_SHADER,E);s.attachShader(m,M),s.attachShader(m,T),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function w(P){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(m)||"",C=s.getShaderInfoLog(M)||"",D=s.getShaderInfoLog(T)||"",R=N.trim(),z=C.trim(),G=D.trim(),B=!0,tt=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,M,T);else{let W=Fu(s,M,"vertex"),K=Fu(s,T,"fragment");Pt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+R+`
`+W+`
`+K)}else R!==""?It("WebGLProgram: Program Info Log:",R):(z===""||G==="")&&(tt=!1);tt&&(P.diagnostics={runnable:B,programLog:R,vertexShader:{log:z,prefix:x},fragmentShader:{log:G,prefix:g}})}s.deleteShader(M),s.deleteShader(T),_=new Ns(s,m),b=t_(s,m)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(m,Wg)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$g++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=T,this}var d_=0,Ec=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Tc(t),e.set(t,n)),n}},Tc=class{constructor(t){this.id=d_++,this.code=t,this.usedTimes=0}};function f_(i){return i===Ci||i===Pr||i===Lr}function p_(i,t,e,n,s,r){let o=new bs,a=new Ec,c=new Set,l=[],u=new Map,p=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,b,U,P,N,C){let D=P.fog,R=N.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,B=t.get(_.envMap||z,G),tt=d[_.type],W=n.precision;_.precision!==null&&(W=n.getMaxPrecision(_.precision),W!==_.precision&&It("WebGLProgram.getParameters:",_.precision,"not supported, using",W,"instead."));let K=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,j=K!==void 0?K.length:0,pt=0;R.morphAttributes.position!==void 0&&(pt=1),R.morphAttributes.normal!==void 0&&(pt=2),R.morphAttributes.color!==void 0&&(pt=3);let Rt,Y,ft,xt;if(tt){let mt=Wn[tt];Rt=mt.vertexShader,Y=mt.fragmentShader}else{Rt=_.vertexShader,Y=_.fragmentShader;let mt=a.getVertexShaderStage(_),te=a.getFragmentShaderStage(_);a.update(_,mt,te),ft=mt.id,xt=te.id}let Et=i.getRenderTarget(),ut=i.state.buffers.depth.getReversed(),Dt=N.isInstancedMesh===!0,de=N.isBatchedMesh===!0,At=!!_.map,Jt=!!_.matcap,ne=!!B,Ft=ne&&B.isPMREMTexture===!0,Le=!!_.aoMap,ve=!!_.lightMap,Ye=!!_.bumpMap&&_.wireframe===!1,fe=!!_.normalMap,Un=!!_.displacementMap,Re=!!_.emissiveMap,pn=!!_.metalnessMap,mn=!!_.roughnessMap,gn=_.anisotropy>0,O=_.clearcoat>0,_n=_.diffuseRoughness>0,ce=_.dispersion>0,he=_.retroreflectivity>0,dt=_.iridescence>0,Me=_.sheen>0,Ct=_.transmission>0,Nt=gn&&!!_.anisotropyMap,A=O&&!!_.clearcoatMap,S=O&&!!_.clearcoatNormalMap,H=O&&!!_.clearcoatRoughnessMap,et=_n&&!!_.diffuseRoughnessMap,Q=dt&&!!_.iridescenceMap,st=dt&&!!_.iridescenceThicknessMap,ct=Me&&!!_.sheenColorMap,q=Me&&!!_.sheenRoughnessMap,Z=!!_.specularMap,ot=!!_.specularColorMap,I=!!_.specularIntensityMap,J=Ct&&!!_.transmissionMap,X=Ct&&!!_.thicknessMap,at=!!_.gradientMap,it=!!_.alphaMap,rt=_.alphaTest>0,bt=!!_.alphaHash,Bt=!!_.extensions,nt=Gn;_.toneMapped&&(Et===null||Et.isXRRenderTarget===!0)&&(nt=i.toneMapping);let Tt=Ft?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,Ut={shaderID:tt,shaderType:_.type,shaderName:_.name,vertexShader:Rt,fragmentShader:Y,defines:_.defines,customVertexShaderID:ft,customFragmentShaderID:xt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:W,batching:de,batchingColor:de&&N._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&N.instanceColor!==null,instancingMorph:Dt&&N.morphTexture!==null,outputColorSpace:Et===null?i.outputColorSpace:Et.isXRRenderTarget===!0?Et.texture.colorSpace:Xt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:At,matcap:Jt,envMap:ne,envMapMode:ne&&B.mapping,envMapPMREM:Ft,envMapMaxLod:Ft?Tt.length-1:null,envMapSize:Ft?Tt[0].width:null,aoMap:Le,lightMap:ve,bumpMap:Ye,normalMap:fe,displacementMap:Un,emissiveMap:Re,normalMapObjectSpace:fe&&_.normalMapType===au,normalMapTangentSpace:fe&&_.normalMapType===Ga,packedNormalMap:fe&&_.normalMapType===Ga&&f_(_.normalMap.format),metalnessMap:pn,roughnessMap:mn,anisotropy:gn,anisotropyMap:Nt,clearcoat:O,clearcoatMap:A,clearcoatNormalMap:S,clearcoatRoughnessMap:H,diffuseRoughness:_n,diffuseRoughnessMap:et,dispersion:ce,retroreflection:he,iridescence:dt,iridescenceMap:Q,iridescenceThicknessMap:st,sheen:Me,sheenColorMap:ct,sheenRoughnessMap:q,specularMap:Z,specularColorMap:ot,specularIntensityMap:I,transmission:Ct,transmissionMap:J,thicknessMap:X,gradientMap:at,opaque:_.transparent===!1&&_.blending===Is&&_.alphaToCoverage===!1,alphaMap:it,alphaTest:rt,alphaHash:bt,combine:_.combine,mapUv:At&&f(_.map.channel),aoMapUv:Le&&f(_.aoMap.channel),lightMapUv:ve&&f(_.lightMap.channel),bumpMapUv:Ye&&f(_.bumpMap.channel),normalMapUv:fe&&f(_.normalMap.channel),displacementMapUv:Un&&f(_.displacementMap.channel),emissiveMapUv:Re&&f(_.emissiveMap.channel),metalnessMapUv:pn&&f(_.metalnessMap.channel),roughnessMapUv:mn&&f(_.roughnessMap.channel),anisotropyMapUv:Nt&&f(_.anisotropyMap.channel),clearcoatMapUv:A&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:S&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&f(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:et&&f(_.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:st&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:q&&f(_.sheenRoughnessMap.channel),specularMapUv:Z&&f(_.specularMap.channel),specularColorMapUv:ot&&f(_.specularColorMap.channel),specularIntensityMapUv:I&&f(_.specularIntensityMap.channel),transmissionMapUv:J&&f(_.transmissionMap.channel),thicknessMapUv:X&&f(_.thicknessMap.channel),alphaMapUv:it&&f(_.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(fe||gn),vertexNormals:!!R.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!R.attributes.uv&&(At||it),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||R.attributes.normal===void 0&&fe===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ut,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:R.attributes.position!==void 0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:pt,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:C.filter(mt=>mt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:nt,decodeVideoTexture:At&&_.map.isVideoTexture===!0&&Xt.getTransfer(_.map.colorSpace)===Qt,decodeVideoTextureEmissive:Re&&_.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(_.emissiveMap.colorSpace)===Qt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Hn,flipSided:_.side===$e,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Bt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&_.extensions.multiDraw===!0||de)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function x(_){let b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(let U in _.defines)b.push(U),b.push(_.defines[U]);return _.isRawShaderMaterial===!1&&(g(b,_),h(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function g(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapPMREM),_.push(b.envMapMaxLod),_.push(b.envMapSize),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.diffuseRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.numLightProbeGrids),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function h(_,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.diffuseRoughness&&o.enable(25),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function y(_){let b=d[_.type],U;if(b){let P=Wn[b];U=Mu.clone(P.uniforms)}else U=_.uniforms;return U}function E(_,b){let U=u.get(b);return U!==void 0?++U.usedTimes:(U=new u_(i,b,_,s),l.push(U),u.set(b,U)),U}function M(_){if(--_.usedTimes===0){let b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){a.remove(_)}function w(){a.dispose()}return{getParameters:m,getProgramCacheKey:x,getUniforms:y,acquireProgram:E,releaseProgram:M,releaseShaderCache:T,programs:l,dispose:w}}function m_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function g_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Gu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Vu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,x,g,h){let y=i[t];return y===void 0?(y={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:g,group:h},i[t]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=m,y.materialVariant=o(d),y.groupOrder=x,y.renderOrder=d.renderOrder,y.z=g,y.group=h),t++,y}function c(d,f,m,x,g,h,y){y.reversedDepth===!0&&(g=-g);let E=a(d,f,m,x,g,h);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):e.push(E)}function l(d,f,m,x,g,h){let y=a(d,f,m,x,g,h);m.transmission>0?n.unshift(y):m.transparent===!0?s.unshift(y):e.unshift(y)}function u(d,f){e.length>1&&e.sort(d||g_),n.length>1&&n.sort(f||Gu),s.length>1&&s.sort(f||Gu)}function p(){for(let d=t,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:p,sort:u}}function __(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Vu,i.set(n,[o])):s>=r.length?(o=new Vu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function x_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new F,color:new kt};break;case"SpotLight":e={position:new F,direction:new F,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function y_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var S_=0;function v_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function M_(i){let t=new x_,e=y_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);let s=new F,r=new ee,o=new ee;function a(l){let u=0,p=0,d=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let f=0,m=0,x=0,g=0,h=0,y=0,E=0,M=0,T=0,w=0,_=0,b=0,U=0,P=0;l.sort(v_);for(let C=0,D=l.length;C<D;C++){let R=l[C],z=R.color,G=R.intensity,B=R.distance,tt=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Ci?tt=R.shadow.map.texture:tt=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=z.r*G,p+=z.g*G,d+=z.b*G;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],G);P++}else if(R.isSunLight){let W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let K=R.shadow,j=e.get(R);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[m]=j,n.sunShadowMap[m]=tt;let pt=K.getViewportCount();for(let Rt=0;Rt<pt;Rt++)n.sunShadowMatrix[x+Rt]=K.getMatrix(Rt),n.sunShadowCascade[x+Rt]=K._cascadeData[Rt];x+=pt,m++}n.sun[f]=W,f++}else if(R.isDirectionalLight){let W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let K=R.shadow,j=e.get(R);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,n.directionalShadow[g]=j,n.directionalShadowMap[g]=tt,n.directionalShadowMatrix[g]=R.shadow.matrix,T++}n.directional[g]=W,g++}else if(R.isSpotLight){let W=t.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(z).multiplyScalar(G),W.distance=B,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[y]=W;let K=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,K.updateMatrices(R),R.castShadow&&U++),n.spotLightMatrix[y]=K.matrix,R.castShadow){let j=e.get(R);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,n.spotShadow[y]=j,n.spotShadowMap[y]=tt,_++}y++}else if(R.isRectAreaLight){let W=t.get(R);W.color.copy(z).multiplyScalar(G),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[E]=W,E++}else if(R.isPointLight){let W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){let K=R.shadow,j=e.get(R);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,j.shadowCameraNear=K.camera.near,j.shadowCameraFar=K.camera.far,n.pointShadow[h]=j,n.pointShadowMap[h]=tt,n.pointShadowMatrix[h]=R.shadow.matrix,w++}n.point[h]=W,h++}else if(R.isHemisphereLight){let W=t.get(R);W.skyColor.copy(R.color).multiplyScalar(G),W.groundColor.copy(R.groundColor).multiplyScalar(G),n.hemi[M]=W,M++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=d;let N=n.hash;(N.sunLength!==f||N.directionalLength!==g||N.pointLength!==h||N.spotLength!==y||N.rectAreaLength!==E||N.hemiLength!==M||N.numSunShadows!==m||N.numDirectionalShadows!==T||N.numPointShadows!==w||N.numSpotShadows!==_||N.numSpotMaps!==b||N.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=g,n.spot.length=y,n.rectArea.length=E,n.point.length=h,n.hemi.length=M,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+b-U,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=P,N.sunLength=f,N.directionalLength=g,N.pointLength=h,N.spotLength=y,N.rectAreaLength=E,N.hemiLength=M,N.numSunShadows=m,N.numDirectionalShadows=T,N.numPointShadows=w,N.numSpotShadows=_,N.numSpotMaps=b,N.numLightProbes=P,n.version=S_++)}function c(l,u){let p=0,d=0,f=0,m=0,x=0,g=0,h=u.matrixWorldInverse;for(let y=0,E=l.length;y<E;y++){let M=l[y];if(M.isSunLight){let T=n.sun[p];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(h),p++}else if(M.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(h),d++}else if(M.isSpotLight){let T=n.spot[m];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(h),T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(h),m++}else if(M.isRectAreaLight){let T=n.rectArea[x];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(h),o.identity(),r.copy(M.matrixWorld),r.premultiply(h),o.extractRotation(r),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(h),f++}else if(M.isHemisphereLight){let T=n.hemi[g];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(h),g++}}}return{setup:a,setupView:c,state:n}}function Wu(i){let t=new M_(i),e=[],n=[],s=[];function r(p){u.camera=p,e.length=0,n.length=0,s.length=0}function o(p){p.isLightProbeGrid?s.push(p):e.push(p)}function a(p){n.push(p)}function c(){t.setup(e),s.sort((p,d)=>p.priority-d.priority||p.id-d.id)}function l(p){t.setupView(e,p)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function b_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Wu(i),t.set(s,[a])):r>=o.length?(a=new Wu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var E_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,A_=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],w_=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],$u=new ee,Nr=new F,yc=new F;function R_(i,t,e){let n=new bi,s=new wt,r=new wt,o=new ue,a=new Vo,c=new Wo,l={},u=e.maxTextureSize,p={[Ri]:$e,[$e]:Ri,[Hn]:Hn},d=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:E_,fragmentShader:T_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new on;m.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new an(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ar;let h=this.type;this.render=function(w,_,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Bh&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ar);let U=i.getRenderTarget(),P=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),C=i.state;C.setBlending($i),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);let D=h!==this.type;D&&_.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(z=>z.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,z=w.length;R<z;R++){let G=w[R],B=G.shadow;if(B===void 0){It("WebGLShadowMap:",G,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);let tt=B.getFrameExtents();s.multiply(tt),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/tt.x),s.x=r.x*tt.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/tt.y),s.y=r.y*tt.y,B.mapSize.y=r.y));let W=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=W,B.map===null||D===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Cs){if(G.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new rn(s.x,s.y,{format:Ci,type:Cn,minFilter:We,magFilter:We,generateMipmaps:!1}),B.map.texture.name=G.name+".shadowMap",B.map.depthTexture=new ii(s.x,s.y,Rn),B.map.depthTexture.name=G.name+".shadowMapDepth",B.map.depthTexture.format=ti,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Pe,B.map.depthTexture.magFilter=Pe}else G.isPointLight?(B.map=new Ur(s.x),B.map.depthTexture=new fr(s.x,wn)):(B.map=new rn(s.x,s.y),B.map.depthTexture=new ii(s.x,s.y,wn)),B.map.depthTexture.name=G.name+".shadowMap",B.map.depthTexture.format=ti,this.type===Ar?(B.map.depthTexture.compareFunction=W?oc:rc,B.map.depthTexture.minFilter=We,B.map.depthTexture.magFilter=We):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Pe,B.map.depthTexture.magFilter=Pe);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==s.x||B.map.height!==s.y)&&B.map.setSize(s.x,s.y);let K=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();G.isPointLight!==!0&&B.updateMatrices(G,b);let j=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:b.layers;for(let pt=0;pt<K;pt++){let Rt=B.getCamera(pt);if(G.isPointLight){let Y=B.camera,ft=B.matrix,xt=G.distance||Y.far;xt!==Y.far&&(Y.far=xt,Y.updateProjectionMatrix()),Nr.setFromMatrixPosition(G.matrixWorld),Y.position.copy(Nr),yc.copy(Y.position),yc.add(A_[pt]),Y.up.copy(w_[pt]),Y.lookAt(yc),Y.updateMatrixWorld(),ft.makeTranslation(-Nr.x,-Nr.y,-Nr.z),$u.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),B._frustum.setFromProjectionMatrix($u,Y.coordinateSystem,Y.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,pt),i.clear();else{pt===0&&(i.setRenderTarget(B.map),i.clear());let Y=B.getViewport(pt);o.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),C.viewport(o)}n=B.getFrustum(pt),M(_,b,Rt,G,j,this.type)}B.isPointLightShadow!==!0&&this.type===Cs&&y(B,b),B.needsUpdate=!1}h=this.type,g.needsUpdate=!1,i.setRenderTarget(U,P,N)};function y(w,_){let b=t.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new rn(s.x,s.y,{format:Ci,type:Cn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(_,null,b,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(_,null,b,f,x,null)}function E(w,_,b,U){let P=null,N=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)P=N;else if(P=b.isPointLight===!0?c:a,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let C=P.uuid,D=_.uuid,R=l[C];R===void 0&&(R={},l[C]=R);let z=R[D];z===void 0&&(z=P.clone(),R[D]=z,_.addEventListener("dispose",T)),P=z}if(P.visible=_.visible,P.wireframe=_.wireframe,U===Cs?P.side=_.shadowSide!==null?_.shadowSide:_.side:P.side=_.shadowSide!==null?_.shadowSide:p[_.side],P.alphaMap=_.alphaMap,P.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,P.map=_.map,P.clipShadows=_.clipShadows,P.clippingPlanes=_.clippingPlanes,P.clipIntersection=_.clipIntersection,P.displacementMap=_.displacementMap,P.displacementScale=_.displacementScale,P.displacementBias=_.displacementBias,P.wireframeLinewidth=_.wireframeLinewidth,P.linewidth=_.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let C=i.properties.get(P);C.light=b}return P}function M(w,_,b,U,P,N){if(w.visible===!1)return;if(w.layers.test(P)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&N===Cs)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);let R=t.update(w),z=w.material;if(Array.isArray(z)){let G=R.groups;for(let B=0,tt=G.length;B<tt;B++){let W=G[B],K=z[W.materialIndex];if(K&&K.visible){let j=E(w,K,U,N);w.onBeforeShadow(i,w,_,b,R,j,W),i.renderBufferDirect(b,null,R,j,w,W),w.onAfterShadow(i,w,_,b,R,j,W)}}}else if(z.visible){let G=E(w,z,U,N);w.onBeforeShadow(i,w,_,b,R,G,null),i.renderBufferDirect(b,null,R,G,w,null),w.onAfterShadow(i,w,_,b,R,G,null)}}let D=w.children;for(let R=0,z=D.length;R<z;R++)M(D[R],_,b,U,P,N)}function T(w){w.target.removeEventListener("dispose",T);for(let b in l){let U=l[b],P=w.target.uuid;P in U&&(U[P].dispose(),delete U[P])}}}function C_(i,t){function e(){let I=!1,J=new ue,X=null,at=new ue(0,0,0,0);return{setMask:function(it){X!==it&&!I&&(i.colorMask(it,it,it,it),X=it)},setLocked:function(it){I=it},setClear:function(it,rt,bt,Bt,nt){nt===!0&&(it*=Bt,rt*=Bt,bt*=Bt),J.set(it,rt,bt,Bt),at.equals(J)===!1&&(i.clearColor(it,rt,bt,Bt),at.copy(J))},reset:function(){I=!1,X=null,at.set(-1,0,0,0)}}}function n(){let I=!1,J=!1,X=null,at=null,it=null;return{setReversed:function(rt){if(J!==rt){let bt=t.get("EXT_clip_control");rt?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),J=rt;let Bt=it;it=null,this.setClear(Bt)}},getReversed:function(){return J},setTest:function(rt){rt?ut(i.DEPTH_TEST):Dt(i.DEPTH_TEST)},setMask:function(rt){X!==rt&&!I&&(i.depthMask(rt),X=rt)},setFunc:function(rt){if(J&&(rt=xu[rt]),at!==rt){switch(rt){case To:i.depthFunc(i.NEVER);break;case Ao:i.depthFunc(i.ALWAYS);break;case wo:i.depthFunc(i.LESS);break;case xs:i.depthFunc(i.LEQUAL);break;case Ro:i.depthFunc(i.EQUAL);break;case Co:i.depthFunc(i.GEQUAL);break;case Io:i.depthFunc(i.GREATER);break;case Do:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}at=rt}},setLocked:function(rt){I=rt},setClear:function(rt){it!==rt&&(it=rt,J&&(rt=1-rt),i.clearDepth(rt))},reset:function(){I=!1,X=null,at=null,it=null,J=!1}}}function s(){let I=!1,J=null,X=null,at=null,it=null,rt=null,bt=null,Bt=null,nt=null;return{setTest:function(Tt){I||(Tt?ut(i.STENCIL_TEST):Dt(i.STENCIL_TEST))},setMask:function(Tt){J!==Tt&&!I&&(i.stencilMask(Tt),J=Tt)},setFunc:function(Tt,Ut,mt){(X!==Tt||at!==Ut||it!==mt)&&(i.stencilFunc(Tt,Ut,mt),X=Tt,at=Ut,it=mt)},setOp:function(Tt,Ut,mt){(rt!==Tt||bt!==Ut||Bt!==mt)&&(i.stencilOp(Tt,Ut,mt),rt=Tt,bt=Ut,Bt=mt)},setLocked:function(Tt){I=Tt},setClear:function(Tt){nt!==Tt&&(i.clearStencil(Tt),nt=Tt)},reset:function(){I=!1,J=null,X=null,at=null,it=null,rt=null,bt=null,Bt=null,nt=null}}}let r=new e,o=new n,a=new s,c={},l=new WeakMap,u={},p={},d={},f=new WeakMap,m=[],x=null,g=!1,h=null,y=null,E=null,M=null,T=null,w=null,_=null,b=new kt(0,0,0),U=0,P=!1,N=null,C=null,D=null,R=null,z=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,tt=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(W)[1]),B=tt>=1):W.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),B=tt>=2);let K=null,j={},pt=i.getParameter(i.SCISSOR_BOX),Rt=i.getParameter(i.VIEWPORT),Y=new ue().fromArray(pt),ft=new ue().fromArray(Rt);function xt(I,J,X,at){let it=new Uint8Array(4),rt=i.createTexture();i.bindTexture(I,rt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<X;bt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(J,0,i.RGBA,1,1,at,0,i.RGBA,i.UNSIGNED_BYTE,it):i.texImage2D(J+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,it);return rt}let Et={};Et[i.TEXTURE_2D]=xt(i.TEXTURE_2D,i.TEXTURE_2D,1),Et[i.TEXTURE_CUBE_MAP]=xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[i.TEXTURE_2D_ARRAY]=xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Et[i.TEXTURE_3D]=xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ut(i.DEPTH_TEST),o.setFunc(xs),Ye(!1),fe(Fl),ut(i.CULL_FACE),Le($i);function ut(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function Dt(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function de(I,J){return d[I]!==J?(i.bindFramebuffer(I,J),d[I]=J,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=J),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=J),!0):!1}function At(I,J){let X=m,at=!1;if(I){X=f.get(J),X===void 0&&(X=[],f.set(J,X));let it=I.textures;if(X.length!==it.length||X[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,bt=it.length;rt<bt;rt++)X[rt]=i.COLOR_ATTACHMENT0+rt;X.length=it.length,at=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,at=!0);at&&i.drawBuffers(X)}function Jt(I){return x!==I?(i.useProgram(I),x=I,!0):!1}let ne={[Xi]:i.FUNC_ADD,[zh]:i.FUNC_SUBTRACT,[Hh]:i.FUNC_REVERSE_SUBTRACT};ne[Gh]=i.MIN,ne[Vh]=i.MAX;let Ft={[Wh]:i.ZERO,[$h]:i.ONE,[Xh]:i.SRC_COLOR,[Hl]:i.SRC_ALPHA,[jh]:i.SRC_ALPHA_SATURATE,[Jh]:i.DST_COLOR,[qh]:i.DST_ALPHA,[Yh]:i.ONE_MINUS_SRC_COLOR,[Gl]:i.ONE_MINUS_SRC_ALPHA,[Kh]:i.ONE_MINUS_DST_COLOR,[Zh]:i.ONE_MINUS_DST_ALPHA,[Qh]:i.CONSTANT_COLOR,[tu]:i.ONE_MINUS_CONSTANT_COLOR,[eu]:i.CONSTANT_ALPHA,[nu]:i.ONE_MINUS_CONSTANT_ALPHA};function Le(I,J,X,at,it,rt,bt,Bt,nt,Tt){if(I===$i){g===!0&&(Dt(i.BLEND),g=!1);return}if(g===!1&&(ut(i.BLEND),g=!0),I!==kh){if(I!==h||Tt!==P){if((y!==Xi||T!==Xi)&&(i.blendEquation(i.FUNC_ADD),y=Xi,T=Xi),Tt)switch(I){case Is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bl:i.blendFunc(i.ONE,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pt("WebGLState: Invalid blending: ",I);break}else switch(I){case Is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kl:Pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:Pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pt("WebGLState: Invalid blending: ",I);break}E=null,M=null,w=null,_=null,b.set(0,0,0),U=0,h=I,P=Tt}return}it=it||J,rt=rt||X,bt=bt||at,(J!==y||it!==T)&&(i.blendEquationSeparate(ne[J],ne[it]),y=J,T=it),(X!==E||at!==M||rt!==w||bt!==_)&&(i.blendFuncSeparate(Ft[X],Ft[at],Ft[rt],Ft[bt]),E=X,M=at,w=rt,_=bt),(Bt.equals(b)===!1||nt!==U)&&(i.blendColor(Bt.r,Bt.g,Bt.b,nt),b.copy(Bt),U=nt),h=I,P=!1}function ve(I,J){I.side===Hn?Dt(i.CULL_FACE):ut(i.CULL_FACE);let X=I.side===$e;J&&(X=!X),Ye(X),I.blending===Is&&I.transparent===!1?Le($i):Le(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);let at=I.stencilWrite;a.setTest(at),at&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Re(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ut(i.SAMPLE_ALPHA_TO_COVERAGE):Dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(I){N!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),N=I)}function fe(I){I!==Uh?(ut(i.CULL_FACE),I!==C&&(I===Fl?i.cullFace(i.BACK):I===Fh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Dt(i.CULL_FACE),C=I}function Un(I){I!==D&&(B&&i.lineWidth(I),D=I)}function Re(I,J,X){I?(ut(i.POLYGON_OFFSET_FILL),(R!==J||z!==X)&&(R=J,z=X,o.getReversed()&&(J=-J,X=-X),i.polygonOffset(J,X))):Dt(i.POLYGON_OFFSET_FILL)}function pn(I){I?ut(i.SCISSOR_TEST):Dt(i.SCISSOR_TEST)}function mn(I){I===void 0&&(I=i.TEXTURE0+G-1),K!==I&&(i.activeTexture(I),K=I)}function gn(I,J,X){X===void 0&&(K===null?X=i.TEXTURE0+G-1:X=K);let at=j[X];at===void 0&&(at={type:void 0,texture:void 0},j[X]=at),(at.type!==I||at.texture!==J)&&(K!==X&&(i.activeTexture(X),K=X),i.bindTexture(I,J||Et[I]),at.type=I,at.texture=J)}function O(){let I=j[K];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _n(){try{i.compressedTexImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function ce(){try{i.compressedTexImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function he(){try{i.texSubImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function dt(){try{i.texSubImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function Me(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function Ct(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function Nt(){try{i.texStorage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function A(){try{i.texStorage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function S(){try{i.texImage2D(...arguments)}catch(I){Pt("WebGLState:",I)}}function H(){try{i.texImage3D(...arguments)}catch(I){Pt("WebGLState:",I)}}function et(I){return p[I]!==void 0?p[I]:i.getParameter(I)}function Q(I,J){p[I]!==J&&(i.pixelStorei(I,J),p[I]=J)}function st(I){Y.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Y.copy(I))}function ct(I){ft.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),ft.copy(I))}function q(I,J){let X=l.get(J);X===void 0&&(X=new WeakMap,l.set(J,X));let at=X.get(I);at===void 0&&(at=i.getUniformBlockIndex(J,I.name),i.uniformBlockBinding(J,at,at),X.set(I,at))}function Z(I,J,X){let it=l.get(J).get(I);c[it]!==X&&(i.bindBufferBase(i.UNIFORM_BUFFER,it,X),c[it]=X)}function ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},p={},K=null,j={},d={},c={},f=new WeakMap,m=[],x=null,g=!1,h=null,y=null,E=null,M=null,T=null,w=null,_=null,b=new kt(0,0,0),U=0,P=!1,N=null,C=null,D=null,R=null,z=null,Y.set(0,0,i.canvas.width,i.canvas.height),ft.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ut,disable:Dt,bindFramebuffer:de,drawBuffers:At,useProgram:Jt,setBlending:Le,setMaterial:ve,setFlipSided:Ye,setCullFace:fe,setLineWidth:Un,setPolygonOffset:Re,setScissorTest:pn,activeTexture:mn,bindTexture:gn,unbindTexture:O,compressedTexImage2D:_n,compressedTexImage3D:ce,texImage2D:S,texImage3D:H,pixelStorei:Q,getParameter:et,updateUBOMapping:q,uniformBlockBinding:Z,texStorage2D:Nt,texStorage3D:A,texSubImage2D:he,texSubImage3D:dt,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ct,scissor:st,viewport:ct,reset:ot}}function I_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new wt,u=new WeakMap,p=new Set,d,f=new WeakMap,m=new Set,x=new FinalizationRegistry(A=>m.delete(A)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function h(A,S){return g?new OffscreenCanvas(A,S):ar("canvas")}function y(A,S,H){let et=1,Q=Nt(A);if((Q.width>H||Q.height>H)&&(et=H/Math.max(Q.width,Q.height)),et<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let st=Math.floor(et*Q.width),ct=Math.floor(et*Q.height);d===void 0&&(d=h(st,ct));let q=S?h(st,ct):d;return q.width=st,q.height=ct,q.getContext("2d").drawImage(A,0,0,st,ct),It("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+st+"x"+ct+")."),q}else return"data"in A&&It("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function E(A){return A.generateMipmaps}function M(A){i.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(A,S,H,et,Q,st=!1){if(A!==null){if(i[A]!==void 0)return i[A];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ct;et&&(ct=t.get("EXT_texture_norm16"),ct||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=S;if(S===i.RED&&(H===i.FLOAT&&(q=i.R32F),H===i.HALF_FLOAT&&(q=i.R16F),H===i.UNSIGNED_BYTE&&(q=i.R8),H===i.UNSIGNED_SHORT&&ct&&(q=ct.R16_EXT),H===i.SHORT&&ct&&(q=ct.R16_SNORM_EXT)),S===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.R8UI),H===i.UNSIGNED_SHORT&&(q=i.R16UI),H===i.UNSIGNED_INT&&(q=i.R32UI),H===i.BYTE&&(q=i.R8I),H===i.SHORT&&(q=i.R16I),H===i.INT&&(q=i.R32I)),S===i.RG&&(H===i.FLOAT&&(q=i.RG32F),H===i.HALF_FLOAT&&(q=i.RG16F),H===i.UNSIGNED_BYTE&&(q=i.RG8),H===i.UNSIGNED_SHORT&&ct&&(q=ct.RG16_EXT),H===i.SHORT&&ct&&(q=ct.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.RG8UI),H===i.UNSIGNED_SHORT&&(q=i.RG16UI),H===i.UNSIGNED_INT&&(q=i.RG32UI),H===i.BYTE&&(q=i.RG8I),H===i.SHORT&&(q=i.RG16I),H===i.INT&&(q=i.RG32I)),S===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.RGB8UI),H===i.UNSIGNED_SHORT&&(q=i.RGB16UI),H===i.UNSIGNED_INT&&(q=i.RGB32UI),H===i.BYTE&&(q=i.RGB8I),H===i.SHORT&&(q=i.RGB16I),H===i.INT&&(q=i.RGB32I)),S===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),H===i.UNSIGNED_INT&&(q=i.RGBA32UI),H===i.BYTE&&(q=i.RGBA8I),H===i.SHORT&&(q=i.RGBA16I),H===i.INT&&(q=i.RGBA32I)),S===i.RGB&&(H===i.UNSIGNED_SHORT&&ct&&(q=ct.RGB16_EXT),H===i.SHORT&&ct&&(q=ct.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),S===i.RGBA){let Z=st?or:Xt.getTransfer(Q);H===i.FLOAT&&(q=i.RGBA32F),H===i.HALF_FLOAT&&(q=i.RGBA16F),H===i.UNSIGNED_BYTE&&(q=Z===Qt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&ct&&(q=ct.RGBA16_EXT),H===i.SHORT&&ct&&(q=ct.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function _(A,S){let H;return A?S===null||S===wn||S===qi?H=i.DEPTH24_STENCIL8:S===Rn?H=i.DEPTH32F_STENCIL8:S===Ps&&(H=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===wn||S===qi?H=i.DEPTH_COMPONENT24:S===Rn?H=i.DEPTH_COMPONENT32F:S===Ps&&(H=i.DEPTH_COMPONENT16),H}function b(A,S){return E(A)===!0||A.isFramebufferTexture&&A.minFilter!==Pe&&A.minFilter!==We?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function U(A){let S=new WeakRef(A);n.get(A).__ref=S,m.add(S),x.register(A,S,S)}function P(A){let S=n.get(A).__ref;S!==void 0&&(m.delete(S),x.unregister(S))}function N(A){D(A.target)}function C(A){R(A.target)}function D(A){A.removeEventListener("dispose",N),P(A),G(A),A.isVideoTexture&&u.delete(A),A.isHTMLTexture&&p.delete(A)}function R(A){A.removeEventListener("dispose",C),P(A),tt(A)}function z(){for(let A of m){let S=A.deref();S!==void 0&&(S.isRenderTarget===!0?R(S):D(S))}m.clear(),p.clear()}function G(A){let S=n.get(A);if(S.__webglInit===void 0)return;let H=A.source,et=f.get(H);if(et){let Q=et[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&B(A),Object.keys(et).length===0&&f.delete(H)}n.remove(A)}function B(A){let S=n.get(A);i.deleteTexture(S.__webglTexture);let H=A.source,et=f.get(H);delete et[S.__cacheKey],o.memory.textures--}function tt(A){let S=n.get(A);S.__depthDisposeCallback&&S.__depthDisposeCallback();let H=A.depthTexture;if(H&&H.renderTarget===A&&D(H),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(S.__webglFramebuffer[Q]))for(let st=0;st<S.__webglFramebuffer[Q].length;st++)i.deleteFramebuffer(S.__webglFramebuffer[Q][st]);else i.deleteFramebuffer(S.__webglFramebuffer[Q]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Q])}else{if(Array.isArray(S.__webglFramebuffer))for(let Q=0;Q<S.__webglFramebuffer.length;Q++)i.deleteFramebuffer(S.__webglFramebuffer[Q]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Q=0;Q<S.__webglColorRenderbuffer.length;Q++)S.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Q]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let et=A.textures;for(let Q=0,st=et.length;Q<st;Q++){let ct=n.get(et[Q]);ct.__webglTexture&&(i.deleteTexture(ct.__webglTexture),o.memory.textures--),n.remove(et[Q])}n.remove(A)}let W=0;function K(){W=0}function j(){return W}function pt(A){W=A}function Rt(){let A=W;return A>=s.maxTextures&&It("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),W+=1,A}function Y(A){let S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.mipmapsAutoUpdate),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function ft(A,S){let H=n.get(A);if(A.isVideoTexture&&Me(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&H.__version!==A.version){let et=A.image;if(et===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{ve(H,A,S);return}}else A.isExternalTexture&&(H.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+S)}function xt(A,S){let H=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){ve(H,A,S);return}else A.isExternalTexture&&(H.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+S)}function Et(A,S){let H=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){ve(H,A,S);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+S)}function ut(A,S){let H=n.get(A);if(A.version>0&&H.__version!==A.version){Ye(H,A,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+S)}let Dt={[Po]:i.REPEAT,[Bn]:i.CLAMP_TO_EDGE,[Lo]:i.MIRRORED_REPEAT},de={[Pe]:i.NEAREST,[ru]:i.NEAREST_MIPMAP_NEAREST,[wr]:i.NEAREST_MIPMAP_LINEAR,[We]:i.LINEAR,[ra]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},At={[cu]:i.NEVER,[ac]:i.ALWAYS,[hu]:i.LESS,[rc]:i.LEQUAL,[uu]:i.EQUAL,[oc]:i.GEQUAL,[du]:i.GREATER,[fu]:i.NOTEQUAL};function Jt(A,S){if(S.type===Rn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===We||S.magFilter===ra||S.magFilter===wr||S.magFilter===ri||S.minFilter===We||S.minFilter===ra||S.minFilter===wr||S.minFilter===ri)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Dt[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Dt[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Dt[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,de[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,de[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,At[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Pe||S.minFilter!==wr&&S.minFilter!==ri||S.type===Rn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ne(A,S){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",N),U(S));let et=S.source,Q=f.get(et);Q===void 0&&(Q={},f.set(et,Q));let st=Y(S);if(st!==A.__cacheKey){Q[st]===void 0&&(Q[st]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),Q[st].usedTimes++;let ct=Q[A.__cacheKey];ct!==void 0&&(Q[A.__cacheKey].usedTimes--,ct.usedTimes===0&&B(S)),A.__cacheKey=st,A.__webglTexture=Q[st].texture}return H}function Ft(A,S,H){return Math.floor(Math.floor(A/H)/S)}function Le(A,S,H,et){let st=A.updateRanges;if(st.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,H,et,S.data);else{st.sort((I,J)=>I.start-J.start);let ct=0;for(let I=1;I<st.length;I++){let J=st[ct],X=st[I],at=J.start+J.count,it=Ft(X.start,S.width,4),rt=Ft(J.start,S.width,4);X.start<=at+1&&it===rt&&Ft(X.start+X.count-1,S.width,4)===it?J.count=Math.max(J.count,X.start+X.count-J.start):(++ct,st[ct]=X)}st.length=ct+1;let q=e.getParameter(i.UNPACK_ROW_LENGTH),Z=e.getParameter(i.UNPACK_SKIP_PIXELS),ot=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let I=0,J=st.length;I<J;I++){let X=st[I],at=Math.floor(X.start/4),it=Math.ceil(X.count/4),rt=at%S.width,bt=Math.floor(at/S.width),Bt=it,nt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(i.UNPACK_SKIP_ROWS,bt),e.texSubImage2D(i.TEXTURE_2D,0,rt,bt,Bt,nt,H,et,S.data)}A.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(i.UNPACK_SKIP_ROWS,ot)}}function ve(A,S,H){let et=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(et=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(et=i.TEXTURE_3D);let Q=ne(A,S),st=S.source;e.bindTexture(et,A.__webglTexture,i.TEXTURE0+H);let ct=n.get(st);if(st.version!==ct.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let nt=Xt.getPrimaries(Xt.workingColorSpace),Tt=S.colorSpace===ai?null:Xt.getPrimaries(S.colorSpace),Ut=S.colorSpace===ai||nt===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ut)}e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let Z=y(S.image,!1,s.maxTextureSize);Z=Ct(S,Z);let ot=r.convert(S.format,S.colorSpace),I=r.convert(S.type),J=w(S.internalFormat,ot,I,S.normalized,S.colorSpace,S.isVideoTexture);Jt(et,S);let X,at=S.mipmaps,it=S.isVideoTexture!==!0,rt=ct.__version===void 0||Q===!0,bt=st.dataReady,Bt=b(S,Z);if(S.isDepthTexture)J=_(S.format===oi,S.type),rt&&(it?e.texStorage2D(i.TEXTURE_2D,1,J,Z.width,Z.height):e.texImage2D(i.TEXTURE_2D,0,J,Z.width,Z.height,0,ot,I,null));else if(S.isDataTexture)if(at.length>0){it&&rt&&e.texStorage2D(i.TEXTURE_2D,Bt,J,at[0].width,at[0].height);for(let nt=0,Tt=at.length;nt<Tt;nt++)X=at[nt],it?bt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,X.width,X.height,ot,I,X.data):e.texImage2D(i.TEXTURE_2D,nt,J,X.width,X.height,0,ot,I,X.data);S.generateMipmaps=!1}else it?(rt&&e.texStorage2D(i.TEXTURE_2D,Bt,J,Z.width,Z.height),bt&&Le(S,Z,ot,I)):e.texImage2D(i.TEXTURE_2D,0,J,Z.width,Z.height,0,ot,I,Z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){it&&rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,J,at[0].width,at[0].height,Z.depth);for(let nt=0,Tt=at.length;nt<Tt;nt++)if(X=at[nt],S.format!==In)if(ot!==null)if(it){if(bt)if(S.layerUpdates.size>0){let Ut=_c(X.width,X.height,S.format,S.type);for(let mt of S.layerUpdates){let te=X.data.subarray(mt*Ut/X.data.BYTES_PER_ELEMENT,(mt+1)*Ut/X.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,mt,X.width,X.height,1,ot,te)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,X.width,X.height,Z.depth,ot,X.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,nt,J,X.width,X.height,Z.depth,0,X.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else it?bt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,X.width,X.height,Z.depth,ot,I,X.data):e.texImage3D(i.TEXTURE_2D_ARRAY,nt,J,X.width,X.height,Z.depth,0,ot,I,X.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{it&&rt&&e.texStorage2D(i.TEXTURE_2D,Bt,J,at[0].width,at[0].height);for(let nt=0,Tt=at.length;nt<Tt;nt++)X=at[nt],S.format!==In?ot!==null?it?bt&&e.compressedTexSubImage2D(i.TEXTURE_2D,nt,0,0,X.width,X.height,ot,X.data):e.compressedTexImage2D(i.TEXTURE_2D,nt,J,X.width,X.height,0,X.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?bt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,X.width,X.height,ot,I,X.data):e.texImage2D(i.TEXTURE_2D,nt,J,X.width,X.height,0,ot,I,X.data)}else if(S.isDataArrayTexture)if(it){if(rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,J,Z.width,Z.height,Z.depth),bt)if(S.layerUpdates.size>0){let nt=_c(Z.width,Z.height,S.format,S.type);for(let Tt of S.layerUpdates){let Ut=Z.data.subarray(Tt*nt/Z.data.BYTES_PER_ELEMENT,(Tt+1)*nt/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Tt,Z.width,Z.height,1,ot,I,Ut)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ot,I,Z.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,J,Z.width,Z.height,Z.depth,0,ot,I,Z.data);else if(S.isData3DTexture)it?(rt&&e.texStorage3D(i.TEXTURE_3D,Bt,J,Z.width,Z.height,Z.depth),bt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ot,I,Z.data)):e.texImage3D(i.TEXTURE_3D,0,J,Z.width,Z.height,Z.depth,0,ot,I,Z.data);else if(S.isFramebufferTexture){if(rt)if(it)e.texStorage2D(i.TEXTURE_2D,Bt,J,Z.width,Z.height);else{let nt=Z.width,Tt=Z.height;for(let Ut=0;Ut<Bt;Ut++)e.texImage2D(i.TEXTURE_2D,Ut,J,nt,Tt,0,ot,I,null),nt>>=1,Tt>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){let nt=i.canvas;if(nt.hasAttribute("layoutsubtree")||nt.setAttribute("layoutsubtree","true"),Z.parentNode!==nt){nt.appendChild(Z),p.add(S),nt.onpaint=Tt=>{let Ut=Tt.changedElements;for(let mt of p)Ut.includes(mt.image)&&(mt.needsUpdate=!0)},nt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Z);else{let Ut=i.RGBA,mt=i.RGBA,te=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ut,mt,te,Z)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(at.length>0){if(it&&rt){let nt=Nt(at[0]);e.texStorage2D(i.TEXTURE_2D,Bt,J,nt.width,nt.height)}for(let nt=0,Tt=at.length;nt<Tt;nt++)X=at[nt],it?bt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,ot,I,X):e.texImage2D(i.TEXTURE_2D,nt,J,ot,I,X);S.generateMipmaps=!1}else if(it){if(rt){let nt=Nt(Z);e.texStorage2D(i.TEXTURE_2D,Bt,J,nt.width,nt.height)}bt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot,I,Z)}else e.texImage2D(i.TEXTURE_2D,0,J,ot,I,Z);E(S)&&S.mipmapsAutoUpdate===!0&&M(et),ct.__version=st.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Ye(A,S,H){if(S.image.length!==6)return;let et=ne(A,S),Q=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+H);let st=n.get(Q);if(Q.version!==st.__version||et===!0){e.activeTexture(i.TEXTURE0+H);let ct=Xt.getPrimaries(Xt.workingColorSpace),q=S.colorSpace===ai?null:Xt.getPrimaries(S.colorSpace),Z=S.colorSpace===ai||ct===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let ot=S.isCompressedTexture||S.image[0].isCompressedTexture,I=S.image[0]&&S.image[0].isDataTexture,J=[];for(let mt=0;mt<6;mt++)!ot&&!I?J[mt]=y(S.image[mt],!0,s.maxCubemapSize):J[mt]=I?S.image[mt].image:S.image[mt],J[mt]=Ct(S,J[mt]);let X=J[0],at=r.convert(S.format,S.colorSpace),it=r.convert(S.type),rt=w(S.internalFormat,at,it,S.normalized,S.colorSpace),bt=S.isVideoTexture!==!0,Bt=st.__version===void 0||et===!0,nt=Q.dataReady,Tt=b(S,X);Jt(i.TEXTURE_CUBE_MAP,S);let Ut;if(S.isDepthTexture){if(rt=_(S.format===oi,S.type),Bt)if(bt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,rt,X.width,X.height);else for(let mt=0;mt<6;mt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,rt,X.width,X.height,0,at,it,null)}else if(ot){bt&&Bt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,rt,X.width,X.height);for(let mt=0;mt<6;mt++){Ut=J[mt].mipmaps;for(let te=0;te<Ut.length;te++){let Ce=Ut[te];S.format!==In?at!==null?bt?nt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te,0,0,Ce.width,Ce.height,at,Ce.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te,rt,Ce.width,Ce.height,0,Ce.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te,0,0,Ce.width,Ce.height,at,it,Ce.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te,rt,Ce.width,Ce.height,0,at,it,Ce.data)}}}else{if(Ut=S.mipmaps,bt&&Bt){Ut.length>0&&Tt++;let mt=Nt(J[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,rt,mt.width,mt.height)}for(let mt=0;mt<6;mt++)if(I){bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,J[mt].width,J[mt].height,at,it,J[mt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,rt,J[mt].width,J[mt].height,0,at,it,J[mt].data);for(let te=0;te<Ut.length;te++){let fi=Ut[te].image[mt].image;bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te+1,0,0,fi.width,fi.height,at,it,fi.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te+1,rt,fi.width,fi.height,0,at,it,fi.data)}}else{bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,at,it,J[mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,rt,at,it,J[mt]);for(let te=0;te<Ut.length;te++){let Ce=Ut[te];bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te+1,0,0,at,it,Ce.image[mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,te+1,rt,at,it,Ce.image[mt])}}}E(S)&&S.mipmapsAutoUpdate===!0&&M(i.TEXTURE_CUBE_MAP),st.__version=Q.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function fe(A,S,H,et,Q,st){let ct=r.convert(H.format,H.colorSpace),q=r.convert(H.type),Z=w(H.internalFormat,ct,q,H.normalized,H.colorSpace),ot=n.get(S),I=n.get(H);if(I.__renderTarget=S,!ot.__hasExternalTextures){let J=Math.max(1,S.width>>st),X=Math.max(1,S.height>>st);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,st,Z,J,X,S.depth,0,ct,q,null):e.texImage2D(Q,st,Z,J,X,0,ct,q,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),dt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,Q,I.__webglTexture,0,he(S)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,et,Q,I.__webglTexture,st),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Un(A,S,H){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){let et=S.depthTexture,Q=et&&et.isDepthTexture?et.type:null,st=_(S.stencilBuffer,Q),ct=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;dt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he(S),st,S.width,S.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,he(S),st,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,st,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,A)}else{let et=S.textures;for(let Q=0;Q<et.length;Q++){let st=et[Q],ct=r.convert(st.format,st.colorSpace),q=r.convert(st.type),Z=w(st.internalFormat,ct,q,st.normalized,st.colorSpace);dt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he(S),Z,S.width,S.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,he(S),Z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Z,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Re(A,S,H){let et=S.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(S.depthTexture);Q.__renderTarget=S;let st=et?S.depthTexture.image[0]:S.depthTexture.image;(!Q.__webglTexture||st.width!==S.width||st.height!==S.height)&&(st.width=S.width,st.height=S.height,S.depthTexture.needsUpdate=!0),et?ut(S.depthTexture,0):ft(S.depthTexture,0);let ct=Q.__webglTexture,q=he(S),Z=et?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,ot=S.depthTexture.format===oi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===ti)dt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,Z,ct,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,ot,Z,ct,0);else if(S.depthTexture.format===oi)dt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,Z,ct,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,ot,Z,ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function pn(A){let S=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){let et=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),et){let Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,et.removeEventListener("dispose",Q)};et.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=et}if(A.depthTexture&&!S.__autoAllocateDepthBuffer)if(H)for(let et=0;et<6;et++)Re(S.__webglFramebuffer[et],A,et);else A.texture.mipmaps.length>0?Re(S.__webglFramebuffer[0],A,0):Re(S.__webglFramebuffer,A,0);else if(H){S.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[et]),S.__webglDepthbuffer[et]===void 0)S.__webglDepthbuffer[et]=i.createRenderbuffer(),Un(S.__webglDepthbuffer[et],A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=S.__webglDepthbuffer[et];i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,st)}}else if(A.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Un(S.__webglDepthbuffer,A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,st)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function mn(A,S,H){let et=n.get(A);S!==void 0&&fe(et.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&pn(A)}function gn(A){let S=A.texture,H=n.get(A),et=n.get(S);A.addEventListener("dispose",C),U(A);let Q=A.textures,st=A.isWebGLCubeRenderTarget===!0,ct=Q.length>1;if(ct||(et.__webglTexture===void 0&&(et.__webglTexture=i.createTexture()),et.__version=S.version,o.memory.textures++),st){H.__webglFramebuffer=[];for(let q=0;q<6;q++)if(S.mipmaps.length>0){H.__webglFramebuffer[q]=[];for(let Z=0;Z<S.mipmaps.length;Z++)H.__webglFramebuffer[q][Z]=i.createFramebuffer()}else H.__webglFramebuffer[q]=i.createFramebuffer()}else{if(S.mipmaps.length>0){H.__webglFramebuffer=[];for(let q=0;q<S.mipmaps.length;q++)H.__webglFramebuffer[q]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(ct)for(let q=0,Z=Q.length;q<Z;q++){let ot=n.get(Q[q]);ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&dt(A)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let q=0;q<Q.length;q++){let Z=Q[q];H.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[q]);let ot=r.convert(Z.format,Z.colorSpace),I=r.convert(Z.type),J=w(Z.internalFormat,ot,I,Z.normalized,Z.colorSpace,A.isXRRenderTarget===!0),X=he(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,X,J,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,H.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Un(H.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),Jt(i.TEXTURE_CUBE_MAP,S);for(let q=0;q<6;q++)if(S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)fe(H.__webglFramebuffer[q][Z],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,Z);else fe(H.__webglFramebuffer[q],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);E(S)?M(i.TEXTURE_CUBE_MAP):S.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),e.unbindTexture()}else if(ct){for(let q=0,Z=Q.length;q<Z;q++){let ot=Q[q],I=n.get(ot),J=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(J,I.__webglTexture),Jt(J,ot),fe(H.__webglFramebuffer,A,ot,i.COLOR_ATTACHMENT0+q,J,0),E(ot)&&M(J)}e.unbindTexture()}else{let q=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(q=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(q,et.__webglTexture),Jt(q,S),S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)fe(H.__webglFramebuffer[Z],A,S,i.COLOR_ATTACHMENT0,q,Z);else fe(H.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,q,0);E(S)?M(q):S.mipmaps.length>0&&i.texParameteri(q,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),e.unbindTexture()}A.depthBuffer&&pn(A)}function O(A){let S=A.textures;for(let H=0,et=S.length;H<et;H++){let Q=S[H];if(E(Q)&&Q.mipmapsAutoUpdate===!0){let st=T(A),ct=n.get(Q).__webglTexture;e.bindTexture(st,ct),M(st),e.unbindTexture()}}}let _n=[];function ce(A){if(A.samples>0){if(dt(A)===!1){let S=A.textures,H=A.width,et=A.height,Q=i.COLOR_BUFFER_BIT,st=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=n.get(A),q=S.length>1;if(q)for(let ot=0;ot<S.length;ot++)e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let ot=0;ot<S.length;ot++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ct.__webglColorRenderbuffer[ot]);let I=n.get(S[ot]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,I,0)}i.blitFramebuffer(0,0,H,et,0,0,H,et,Q,i.NEAREST),c===!0&&(_n.length=0,_n.push(i.COLOR_ATTACHMENT0+ot),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&_n.push(st),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_n))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let ot=0;ot<S.length;ot++){e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,ct.__webglColorRenderbuffer[ot]);let I=n.get(S[ot]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,I,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function he(A){return Math.min(s.maxSamples,A.samples)}function dt(A){let S=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Me(A){let S=o.render.frame;u.get(A)!==S&&(u.set(A,S),A.update())}function Ct(A,S){let H=A.colorSpace,et=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==rr&&H!==ai&&(Xt.getTransfer(H)===Qt?(et!==In||Q!==Ze)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pt("WebGLTextures: Unsupported texture color space:",H)),S}function Nt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=Rt,this.resetTextureUnits=K,this.getTextureUnits=j,this.setTextureUnits=pt,this.setTexture2D=ft,this.setTexture2DArray=xt,this.setTexture3D=Et,this.setTextureCube=ut,this.rebindTextures=mn,this.setupRenderTarget=gn,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=pn,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=dt,this.dispose=z}function D_(i,t){function e(n,s=ai){let r,o=Xt.getTransfer(s);if(n===Ze)return i.UNSIGNED_BYTE;if(n===aa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===la)return i.UNSIGNED_SHORT_5_5_5_1;if(n===tc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ec)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===jl)return i.BYTE;if(n===Ql)return i.SHORT;if(n===Ps)return i.UNSIGNED_SHORT;if(n===oa)return i.INT;if(n===wn)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===Cn)return i.HALF_FLOAT;if(n===nc)return i.ALPHA;if(n===ic)return i.RGB;if(n===In)return i.RGBA;if(n===ti)return i.DEPTH_COMPONENT;if(n===oi)return i.DEPTH_STENCIL;if(n===sc)return i.RED;if(n===ca)return i.RED_INTEGER;if(n===Ci)return i.RG;if(n===ha)return i.RG_INTEGER;if(n===ua)return i.RGBA_INTEGER;if(n===Rr||n===Cr||n===Ir||n===Dr)if(o===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===da||n===fa||n===pa||n===ma)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===da)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ga||n===_a||n===xa||n===ya||n===Sa||n===Pr||n===va)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ga||n===_a)return o===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ya)return r.COMPRESSED_R11_EAC;if(n===Sa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Pr)return r.COMPRESSED_RG11_EAC;if(n===va)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ma||n===ba||n===Ea||n===Ta||n===Aa||n===wa||n===Ra||n===Ca||n===Ia||n===Da||n===Pa||n===La||n===Na||n===Oa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ma)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ba)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ea)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ta)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Aa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ra)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ca)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ia)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Da)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===La)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Na)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ua||n===Fa||n===Ba)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ua)return o===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ba)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ka||n===za||n===Lr||n===Ha)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ka)return r.COMPRESSED_RED_RGTC1_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ha)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var P_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ac=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new pr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new zn({vertexShader:P_,fragmentShader:L_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new an(new mr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wc=class extends An{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,p=null,d=null,f=null,m=null,x=typeof XRWebGLBinding<"u",g=new Ac,h={},y=e.getContextAttributes(),E=null,M=null,T=[],w=[],_=new wt,b=null,U=null,P=new Ve;P.viewport=new ue;let N=new Ve;N.viewport=new ue;let C=[P,N],D=new na,R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ft=T[Y];return ft===void 0&&(ft=new Es,T[Y]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(Y){let ft=T[Y];return ft===void 0&&(ft=new Es,T[Y]=ft),ft.getGripSpace()},this.getHand=function(Y){let ft=T[Y];return ft===void 0&&(ft=new Es,T[Y]=ft),ft.getHandSpace()};function G(Y){let ft=w.indexOf(Y.inputSource);if(ft===-1)return;let xt=T[ft];xt!==void 0&&(xt.update(Y.inputSource,Y.frame,l||o),xt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function B(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",tt);for(let Y=0;Y<T.length;Y++){let ft=w[Y];ft!==null&&(w[Y]=null,T[Y].disconnect(ft))}R=null,z=null,g.reset();for(let Y in h)delete h[Y];if(t.setRenderTarget(E),f=null,d=null,p=null,s=null,M=null,Rt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(_.width,_.height,!1),U!==null){let Y=U.camera;Y.fov=U.fov,Y.zoom=U.zoom,Y.updateProjectionMatrix(),U=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return p===null&&x&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",B),s.addEventListener("inputsourceschange",tt),y.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(_),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Et=null,ut=null;y.depth&&(ut=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=y.stencil?oi:ti,Et=y.stencil?qi:wn);let Dt={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};p=this.getBinding(),d=p.createProjectionLayer(Dt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new rn(d.textureWidth,d.textureHeight,{format:In,type:Ze,depthTexture:new ii(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let xt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new rn(f.framebufferWidth,f.framebufferHeight,{format:In,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Rt.setContext(s),Rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function tt(Y){for(let ft=0;ft<Y.removed.length;ft++){let xt=Y.removed[ft],Et=w.indexOf(xt);Et>=0&&(w[Et]=null,T[Et].disconnect(xt))}for(let ft=0;ft<Y.added.length;ft++){let xt=Y.added[ft],Et=w.indexOf(xt);if(Et===-1){for(let Dt=0;Dt<T.length;Dt++)if(Dt>=w.length){w.push(xt),Et=Dt;break}else if(w[Dt]===null){w[Dt]=xt,Et=Dt;break}if(Et===-1)break}let ut=T[Et];ut&&ut.connect(xt)}}function W(Y,ft){ft===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ft.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ft=Y.near,xt=Y.far;g.texture!==null&&(g.depthNear>0&&(ft=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),D.near=N.near=P.near=ft,D.far=N.far=P.far=xt,(R!==D.near||z!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),R=D.near,z=D.far),D.layers.mask=Y.layers.mask|6,P.layers.mask=D.layers.mask&-5,N.layers.mask=D.layers.mask&-3;let Et=Y.parent,ut=D.cameras;W(D,Et);for(let Dt=0;Dt<ut.length;Dt++)W(ut[Dt],Et);D.projectionMatrix.copy(P.projectionMatrix),D.projectionMatrixInverse.copy(P.projectionMatrixInverse),U===null&&Y.isPerspectiveCamera&&(U={camera:Y,fov:Y.fov,zoom:Y.zoom}),K(Y,D,Et)};function K(Y,ft,xt){xt===null?Y.matrix.copy(ft.matrixWorld):(Y.matrix.copy(xt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ft.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ft.projectionMatrix),Y.projectionMatrixInverse.copy(ft.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=vs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(Y){return h[Y]};let j=null;function pt(Y,ft){if(u=ft.getViewerPose(l||o),m=ft,u!==null){let xt=u.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Et=!1;xt.length!==D.cameras.length&&(D.cameras.length=0,Et=!0);for(let At=0;At<xt.length;At++){let Jt=xt[At],ne=null;if(f!==null)ne=f.getViewport(Jt);else{let Le=p.getViewSubImage(d,Jt);ne=Le.viewport,At===0&&(t.setRenderTargetTextures(M,Le.colorTexture,Le.depthStencilTexture),t.setRenderTarget(M))}let Ft=C[At];Ft===void 0&&(Ft=new Ve,Ft.layers.enable(At),Ft.viewport=new ue,C[At]=Ft),Ft.matrix.fromArray(Jt.transform.matrix),Ft.matrix.decompose(Ft.position,Ft.quaternion,Ft.scale),Ft.projectionMatrix.fromArray(Jt.projectionMatrix),Ft.projectionMatrixInverse.copy(Ft.projectionMatrix).invert(),Ft.viewport.set(ne.x,ne.y,ne.width,ne.height),At===0&&(D.matrix.copy(Ft.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Et===!0&&D.cameras.push(Ft)}let ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){p=n.getBinding();let At=p.getDepthInformation(xt[0]);At&&At.isValid&&At.texture&&g.init(At,s.renderState)}if(ut&&ut.includes("camera-access")&&x){t.state.unbindTexture(),p=n.getBinding();for(let At=0;At<xt.length;At++){let Jt=xt[At].camera;if(Jt){let ne=h[Jt];ne||(ne=new pr,h[Jt]=ne);let Ft=p.getCameraImage(Jt);ne.sourceTexture=Ft}}}}for(let xt=0;xt<T.length;xt++){let Et=w[xt],ut=T[xt];Et!==null&&ut!==void 0&&ut.update(Et,ft,l||o)}j&&j(Y,ft),ft.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ft}),m=null}let Rt=new Xu;Rt.setAnimationLoop(pt),this.setAnimationLoop=function(Y){j=Y},this.dispose=function(){}}},N_=new ee,nd=new Lt;nd.set(-1,0,0,0,1,0,0,0,1);function O_(i,t){function e(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function n(g,h){h.color.getRGB(g.fogColor.value,pc(i)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function s(g,h,y,E,M){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(g,h):h.isMeshLambertMaterial?(r(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(g,h),p(g,h)):h.isMeshPhongMaterial?(r(g,h),u(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(g,h),d(g,h),h.isMeshPhysicalMaterial&&f(g,h,M)):h.isMeshMatcapMaterial?(r(g,h),m(g,h)):h.isMeshDepthMaterial?r(g,h):h.isMeshDistanceMaterial?(r(g,h),x(g,h)):h.isMeshNormalMaterial?r(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?c(g,h,y,E):h.isSpriteMaterial?l(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,e(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,e(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,e(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===$e&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,e(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===$e&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,e(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,e(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);let y=t.get(h),E=y.envMap,M=y.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(N_.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(nd),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,e(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function c(g,h,y,E){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*y,g.scale.value=E*.5,h.map&&(g.map.value=h.map,e(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,e(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function l(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,e(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,e(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function u(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function p(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function d(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function f(g,h,y){g.ior.value=h.ior,h.diffuseRoughness>0&&(g.diffuseRoughness.value=h.diffuseRoughness,h.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=h.diffuseRoughnessMap,e(h.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===$e&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.retroreflectivity>0&&(g.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=h.iridescenceThicknessMaximum,h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,h){h.matcap&&(g.matcap.value=h.matcap)}function x(g,h){let y=t.get(h).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function U_(i,t,e,n){let s={},r={};function o(y,E){let M=E.program;n.uniformBlockBinding(y,M,s[y.id])}function a(y,E){let M=s[y.id];M===void 0&&(m(y),M=c(y),s[y.id]=M,y.addEventListener("dispose",g));let T=E.program;n.updateUBOMapping(y,T);let w=t.render.frame;r[y.id]!==w&&(l(y),r[y.id]=w)}function c(y){let E=i.createBuffer(),M=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,M,T),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function l(y){let E=s[y.id],M=y.uniforms,T=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,_=M.length;w<_;w++){let b=M[w];if(Array.isArray(b))for(let U=0,P=b.length;U<P;U++)u(b[U],w,U,T);else u(b,w,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(y,E,M,T){if(d(y,E,M,T)===!0){let w=y.__offset,_=y.value;if(Array.isArray(_)){let b=0;for(let U=0;U<_.length;U++){let P=_[U],N=x(P,!0);p(P,y.__data,b),b+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else p(_,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,y.__data)}}function p(y,E,M){typeof y=="number"||typeof y=="boolean"?E[M]=y:y.isMatrix3?(E[M]=y.elements[0],E[M+1]=y.elements[1],E[M+2]=y.elements[2],E[M+3]=0,E[M+4]=y.elements[3],E[M+5]=y.elements[4],E[M+6]=y.elements[5],E[M+7]=0,E[M+8]=y.elements[6],E[M+9]=y.elements[7],E[M+10]=y.elements[8],E[M+11]=0):ArrayBuffer.isView(y)?E.set(y.subarray(0,E.length-M),M):y.toArray(E,M)}function d(y,E,M,T){let w=y.value,_=E+"_"+M;if(Array.isArray(w)){T[_]===void 0&&(T[_]=[]);let b=T[_],U=!1;for(let P=0;P<w.length;P++)f(w[P],b,P)===!0&&(U=!0);return U}return f(w,T,_)}function f(y,E,M){if(E[M]===void 0)return typeof y=="number"||typeof y=="boolean"?E[M]=y:ArrayBuffer.isView(y)?E[M]=y.slice():E[M]=y.clone(),!0;{let T=E[M];if(typeof y=="number"||typeof y=="boolean"){if(T!==y)return E[M]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(T.equals(y)===!1)return T.copy(y),!0}}return!1}function m(y){let E=y.uniforms,M=0,T=16;for(let _=0,b=E.length;_<b;_++){let U=Array.isArray(E[_])?E[_]:[E[_]];for(let P=0,N=U.length;P<N;P++){let C=U[P],D=Array.isArray(C.value)?C.value:[C.value],R=Array.isArray(E[_])||Array.isArray(C.value),z=M;for(let B=0,tt=D.length;B<tt;B++){let W=D[B],K=x(W,R),j=M%T,pt=j%K.boundary,Rt=j+pt;M+=pt,Rt!==0&&T-Rt<K.storage&&(M+=T-Rt),B===0&&(z=M),M+=K.storage}let G=C.type==="int"?Int32Array:C.type==="uint"?Uint32Array:Float32Array;C.__data=new G((M-z)/Float32Array.BYTES_PER_ELEMENT),C.__offset=z}}let w=M%T;return w>0&&(M+=T-w),y.__size=M,y.__cache={},this}function x(y,E){let M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=16,M.storage=48):y.isMatrix4?(M.boundary=16,M.storage=64):y.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(M.boundary=16,M.storage=y.byteLength):It("WebGLRenderer: Unsupported uniform value type.",y),E===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function g(y){let E=y.target;E.removeEventListener("dispose",g),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function h(){for(let y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:o,update:a,dispose:h}}var F_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vn=null;function B_(){return Vn===null&&(Vn=new Bo(F_,16,16,Ci,Cn),Vn.name="DFG_LUT",Vn.minFilter=We,Vn.magFilter=We,Vn.wrapS=Bn,Vn.wrapT=Bn,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}var Xa=class{constructor(t={}){let{canvas:e=mu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Ze}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let x=f,g=new Set([ua,ha,ca]),h=new Set([Ze,wn,Ps,qi,aa,la]),y=new Uint32Array(4),E=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},T=null,w=null,_=[],b=[],U=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,N=!1,C=null,D=null,R=null,z=null;this._outputColorSpace=en;let G=0,B=0,tt=null,W=-1,K=null,j=new ue,pt=new ue,Rt=null,Y=new kt(0),ft=0,xt=e.width,Et=e.height,ut=1,Dt=null,de=null,At=new ue(0,0,xt,Et),Jt=new ue(0,0,xt,Et),ne=!1,Ft=new bi,Le=new ko,ve=!1,Ye=!1,fe=new ee,Un=new F,Re=new ue,pn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mn=!1;function gn(){return tt===null?ut:1}let O=n;function _n(v,L){return e.getContext(v,L)}let ce,he,dt,Me,Ct,Nt,A,S,H,et,Q,st,ct,q,Z,ot,I,J,X,at,it,rt,bt;try{let v={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Tt,!1),e.addEventListener("webglcontextrestored",Ut,!1),e.addEventListener("webglcontextcreationerror",mt,!1),O===null){let L="webgl2";if(O=_n(L,v),O===null)throw _n(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Bt()}catch(v){throw e.removeEventListener("webglcontextlost",Tt,!1),e.removeEventListener("webglcontextrestored",Ut,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),Pt("WebGLRenderer: "+v.message),v}function Bt(){ce=new Z0(O),ce.init(),it=new D_(O,ce),he=new B0(O,ce,t,it),dt=new C_(O,ce),he.reversedDepthBuffer&&d&&dt.buffers.depth.setReversed(!0),D=O.createFramebuffer(),R=O.createFramebuffer(),z=O.createFramebuffer(),Me=new j0(O),Ct=new m_,Nt=new I_(O,ce,dt,Ct,he,it,Me),A=new q0(P),S=new tp(O),rt=new U0(O,S),H=new J0(O,S,Me,rt),et=new tg(O,H,S,rt,Me),J=new Q0(O,he,Nt),Z=new k0(Ct),Q=new p_(P,A,ce,he,rt,Z),st=new O_(P,Ct),ct=new __,q=new b_(ce),I=new O0(P,A,dt,et,m,c),ot=new R_(P,et,he),bt=new U_(O,Me,he,dt),X=new F0(O,ce,Me),at=new K0(O,ce,Me),Me.programs=Q.programs,P.capabilities=he,P.extensions=ce,P.properties=Ct,P.renderLists=ct,P.shadowMap=ot,P.state=dt,P.info=Me}x!==Ze&&(U=new ng(x,e.width,e.height,a,s,r));let nt=new wc(P,O);this.xr=nt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let v=ce.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=ce.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ut},this.setPixelRatio=function(v){v!==void 0&&(ut=v,this.setSize(xt,Et,!1))},this.getSize=function(v){return v.set(xt,Et)},this.setSize=function(v,L,$=!0){if(nt.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}xt=v,Et=L,e.width=Math.floor(v*ut),e.height=Math.floor(L*ut),$===!0&&(e.style.width=v+"px",e.style.height=L+"px"),U!==null&&U.setSize(e.width,e.height),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(xt*ut,Et*ut).floor()},this.setDrawingBufferSize=function(v,L,$){xt=v,Et=L,ut=$,e.width=Math.floor(v*$),e.height=Math.floor(L*$),this.setViewport(0,0,v,L)},this.setEffects=function(v){if(x===Ze){Pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let L=0;L<v.length;L++)if(v[L].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(j)},this.getViewport=function(v){return v.copy(At)},this.setViewport=function(v,L,$,k){v.isVector4?At.set(v.x,v.y,v.z,v.w):At.set(v,L,$,k),dt.viewport(j.copy(At).multiplyScalar(gn()).round())},this.getScissor=function(v){return v.copy(Jt)},this.setScissor=function(v,L,$,k){v.isVector4?Jt.set(v.x,v.y,v.z,v.w):Jt.set(v,L,$,k),dt.scissor(pt.copy(Jt).multiplyScalar(gn()).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(v){dt.setScissorTest(ne=v)},this.setOpaqueSort=function(v){Dt=v},this.setTransparentSort=function(v){de=v},this.getClearColor=function(v){return v.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,$=!0){let k=0;if(v){let V=!1;if(tt!==null){let ht=tt.texture.format;V=g.has(ht)}if(V){let ht=tt.texture.type,yt=h.has(ht),lt=I.getClearColor(),_t=I.getClearAlpha(),Mt=lt.r,Ot=lt.g,Wt=lt.b;yt?(y[0]=Mt,y[1]=Ot,y[2]=Wt,y[3]=_t,O.clearBufferuiv(O.COLOR,0,y)):(E[0]=Mt,E[1]=Ot,E[2]=Wt,E[3]=_t,O.clearBufferiv(O.COLOR,0,E))}else k|=O.COLOR_BUFFER_BIT}L&&(k|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(k|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&O.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),C=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Tt,!1),e.removeEventListener("webglcontextrestored",Ut,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),I.dispose(),ct.dispose(),q.dispose(),Nt.dispose(),Ct.dispose(),A.dispose(),et.dispose(),H.dispose(),rt.dispose(),bt.dispose(),Q.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",Kc),nt.removeEventListener("sessionend",jc),Oi.stop()};function Tt(v){v.preventDefault(),cc("WebGLRenderer: Context Lost."),N=!0}function Ut(){cc("WebGLRenderer: Context Restored."),N=!1;let v=Me.autoReset,L=ot.enabled,$=ot.autoUpdate,k=ot.needsUpdate,V=ot.type;Bt(),Me.autoReset=v,ot.enabled=L,ot.autoUpdate=$,ot.needsUpdate=k,ot.type=V}function mt(v){Pt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function te(v){let L=v.target;L.removeEventListener("dispose",te),Ce(L)}function Ce(v){fi(v),Ct.remove(v)}function fi(v){let L=Ct.get(v).programs;L!==void 0&&(L.forEach(function($){Q.releaseProgram($)}),v.isShaderMaterial&&Q.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,$,k,V,ht){L===null&&(L=pn);let yt=V.isMesh&&V.matrixWorld.determinantAffine()<0,lt=jd(v,L,$,k,V);dt.setMaterial(k,yt);let _t=$.index,Mt=1;if(k.wireframe===!0){if(_t=H.getWireframeAttribute($),_t===void 0)return;Mt=2}let Ot=$.drawRange,Wt=$.attributes.position,St=Ot.start*Mt,$t=(Ot.start+Ot.count)*Mt;ht!==null&&(St=Math.max(St,ht.start*Mt),$t=Math.min($t,(ht.start+ht.count)*Mt)),_t!==null?(St=Math.max(St,0),$t=Math.min($t,_t.count)):Wt!=null&&(St=Math.max(St,0),$t=Math.min($t,Wt.count));let ye=$t-St;if(ye<0||ye===1/0)return;rt.setup(V,k,lt,$,_t);let re,ie=X;if(_t!==null&&(re=S.get(_t),ie=at,ie.setIndex(re)),V.isMesh)k.wireframe===!0?(dt.setLineWidth(k.wireframeLinewidth*gn()),ie.setMode(O.LINES)):ie.setMode(O.TRIANGLES);else if(V.isLine){let Oe=k.linewidth;Oe===void 0&&(Oe=1),dt.setLineWidth(Oe*gn()),V.isLineSegments?ie.setMode(O.LINES):V.isLineLoop?ie.setMode(O.LINE_LOOP):ie.setMode(O.LINE_STRIP)}else V.isPoints?ie.setMode(O.POINTS):V.isSprite&&ie.setMode(O.TRIANGLES);if(V.isBatchedMesh)if(ce.get("WEBGL_multi_draw"))ie.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Oe=V._multiDrawStarts,vt=V._multiDrawCounts,Ge=V._multiDrawCount,Kt=_t?S.get(_t).bytesPerElement:1,Ui=Ct.get(k).currentProgram.getUniforms();for(let Ue=0;Ue<Ge;Ue++)Ui.setValue(O,"_gl_DrawID",Ue),ie.render(Oe[Ue]/Kt,vt[Ue])}else if(V.isInstancedMesh)ie.renderInstances(St,ye,V.count);else if($.isInstancedBufferGeometry){let Oe=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,vt=Math.min($.instanceCount,Oe);ie.renderInstances(St,ye,vt)}else ie.render(St,ye)};function Jc(v,L,$,k){C!==null&&v.isNodeMaterial&&C.setObject(k,v),ve===!0&&Z.setState(v,$,!1),v.transparent===!0&&v.side===Hn&&v.forceSinglePass===!1?(v.side=$e,v.needsUpdate=!0,Zs(v,L,k),v.side=Ri,v.needsUpdate=!0,Zs(v,L,k),v.side=Hn):Zs(v,L,k)}this.compile=function(v,L,$=null){$===null&&($=v),C!==null&&C.renderStart(v,L,$),w=q.get($),w.init(L),b.push(w),$.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),v!==$&&v.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights(),C!==null&&C.updateLights(w.state.lightsArray),Ye=this.localClippingEnabled,ve=Z.init(this.clippingPlanes,Ye),ve===!0&&Z.setGlobalState(this.clippingPlanes,L),C!==null&&ot.render(w.state.shadowsArray,$,L);let k=new Set;return v.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let ht=V.material;if(ht)if(Array.isArray(ht))for(let yt=0;yt<ht.length;yt++){let lt=ht[yt];Jc(lt,$,L,V),k.add(lt)}else Jc(ht,$,L,V),k.add(ht)}),w=b.pop(),C!==null&&C.renderEnd(),k},this.compileAsync=function(v,L,$=null){let k=this.compile(v,L,$);return new Promise(V=>{function ht(){if(k.forEach(function(yt){let _t=Ct.get(yt).currentProgram;(_t===void 0||_t.isReady())&&k.delete(yt)}),k.size===0){V(v);return}setTimeout(ht,10)}ce.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let ol=null;function Jd(v){ol&&ol(v)}function Kc(){Oi.stop()}function jc(){Oi.start()}let Oi=new Xu;Oi.setAnimationLoop(Jd),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(v){ol=v,nt.setAnimationLoop(v),v===null?Oi.stop():Oi.start()},nt.addEventListener("sessionstart",Kc),nt.addEventListener("sessionend",jc),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){Pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;C!==null&&C.renderStart(v,L);let $=nt.enabled===!0&&nt.isPresenting===!0,k=U!==null&&(tt===null||$)&&U.begin(P,tt);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(L),L=nt.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,L,tt),w=q.get(v,b.length),w.init(L),w.state.textureUnits=Nt.getTextureUnits(),b.push(w),fe.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?Le.setFromArrayCamera(L):Ft.setFromProjectionMatrix(fe,yn,L.reversedDepth),Ye=this.localClippingEnabled,ve=Z.init(this.clippingPlanes,Ye),T=ct.get(v,_.length),T.init(),_.push(T),this.info.render.frame++,nt.enabled===!0&&nt.isPresenting===!0){let yt=P.xr.getDepthSensingMesh();yt!==null&&al(yt,L,-1/0,P.sortObjects)}al(v,L,0,P.sortObjects),T.finish(),C!==null&&C.updateLights(w.state.lightsArray),P.sortObjects===!0&&T.sort(Dt,de),mn=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,mn&&I.addToRenderList(T,v),this.info.autoReset===!0&&this.info.reset(),ve===!0&&Z.beginShadows();let V=w.state.shadowsArray;if(ot.render(V,v,L),ve===!0&&Z.endShadows(),(k&&U.hasRenderPass())===!1){let yt=T.opaque,lt=T.transmissive;if(w.setupLights(),L.isArrayCamera){let _t=L.cameras;if(lt.length>0)for(let Mt=0,Ot=_t.length;Mt<Ot;Mt++){let Wt=_t[Mt];th(yt,lt,v,Wt)}mn&&I.render(v);for(let Mt=0,Ot=_t.length;Mt<Ot;Mt++){let Wt=_t[Mt];Qc(T,v,Wt,Wt.viewport)}}else lt.length>0&&th(yt,lt,v,L),mn&&I.render(v),Qc(T,v,L)}tt!==null&&B===0&&(Nt.updateMultisampleRenderTarget(tt),Nt.updateRenderTargetMipmap(tt)),k&&U.end(P),v.isScene===!0&&v.onAfterRender(P,v,L),rt.resetDefaultState(),W=-1,K=null,b.pop(),b.length>0?(w=b[b.length-1],Nt.setTextureUnits(w.state.textureUnits),ve===!0&&Z.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,_.pop(),_.length>0?T=_[_.length-1]:T=null,C!==null&&C.renderEnd()};function al(v,L,$,k){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)$=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)w.pushLight(v),v.castShadow&&w.pushShadow(v);else if(v.isSprite){let yt=L.isArrayCamera?Le:Ft;if(!v.frustumCulled||v.intersectsFrustum(yt)){k&&Re.setFromMatrixPosition(v.matrixWorld).applyMatrix4(fe);let lt=et.update(v),_t=v.material;_t.visible&&T.push(v,lt,_t,$,Re.z,null,L)}}else if(v.isMesh||v.isLine||v.isPoints){let yt=L.isArrayCamera?Le:Ft;if(!v.frustumCulled||v.intersectsFrustum(yt)){let lt=et.update(v),_t=v.material;if(k&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Re.copy(v.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Re.copy(lt.boundingSphere.center)),Re.applyMatrix4(v.matrixWorld).applyMatrix4(fe)),Array.isArray(_t)){let Mt=lt.groups;for(let Ot=0,Wt=Mt.length;Ot<Wt;Ot++){let St=Mt[Ot],$t=_t[St.materialIndex];$t&&$t.visible&&T.push(v,lt,$t,$,Re.z,St,L)}}else _t.visible&&T.push(v,lt,_t,$,Re.z,null,L)}}}let ht=v.children;for(let yt=0,lt=ht.length;yt<lt;yt++)al(ht[yt],L,$,k)}function Qc(v,L,$,k){let{opaque:V,transmissive:ht,transparent:yt}=v;w.setupLightsView($),ve===!0&&Z.setGlobalState(P.clippingPlanes,$),k&&dt.viewport(j.copy(k)),V.length>0&&jr(V,L,$),ht.length>0&&jr(ht,L,$),yt.length>0&&jr(yt,L,$),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function th(v,L,$,k){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){let St=ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new rn(1,1,{generateMipmaps:!0,type:St?Cn:Ze,minFilter:ri,samples:Math.max(4,he.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Xt.workingColorSpace})}let ht=w.state.transmissionRenderTarget[k.id],yt=k.viewport||j;ht.setSize(yt.z*P.transmissionResolutionScale,yt.w*P.transmissionResolutionScale);let lt=P.getRenderTarget(),_t=P.getActiveCubeFace(),Mt=P.getActiveMipmapLevel();P.setRenderTarget(ht),P.getClearColor(Y),ft=P.getClearAlpha(),ft<1&&P.setClearColor(16777215,.5),P.clear(),mn&&I.render($);let Ot=P.toneMapping;P.toneMapping=Gn;let Wt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),ve===!0&&Z.setGlobalState(P.clippingPlanes,k),jr(v,$,k),Nt.updateMultisampleRenderTarget(ht),Nt.updateRenderTargetMipmap(ht),ce.has("WEBGL_multisampled_render_to_texture")===!1){let St=!1;for(let $t=0,ye=L.length;$t<ye;$t++){let re=L[$t],{object:ie,geometry:Oe,material:vt,group:Ge}=re;if(vt.side===Hn&&ie.layers.test(k.layers)){let Kt=vt.side;vt.side=$e,vt.needsUpdate=!0,eh(ie,$,k,Oe,vt,Ge),vt.side=Kt,vt.needsUpdate=!0,St=!0}}St===!0&&(Nt.updateMultisampleRenderTarget(ht),Nt.updateRenderTargetMipmap(ht))}P.setRenderTarget(lt,_t,Mt),P.setClearColor(Y,ft),Wt!==void 0&&(k.viewport=Wt),P.toneMapping=Ot}function jr(v,L,$){let k=L.isScene===!0?L.overrideMaterial:null;for(let V=0,ht=v.length;V<ht;V++){let yt=v[V],{object:lt,geometry:_t,group:Mt}=yt,Ot=yt.material;Ot.allowOverride===!0&&k!==null&&(Ot=k),lt.layers.test($.layers)&&eh(lt,L,$,_t,Ot,Mt)}}function eh(v,L,$,k,V,ht){C!==null&&V.isNodeMaterial&&C.setObject(v,V),v.onBeforeRender(P,L,$,k,V,ht),v.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),V.onBeforeRender(P,L,$,k,v,ht),V.transparent===!0&&V.side===Hn&&V.forceSinglePass===!1?(V.side=$e,V.needsUpdate=!0,P.renderBufferDirect($,L,k,V,v,ht),V.side=Ri,V.needsUpdate=!0,P.renderBufferDirect($,L,k,V,v,ht),V.side=Hn):P.renderBufferDirect($,L,k,V,v,ht),v.onAfterRender(P,L,$,k,V,ht)}function nh(v){let L=0;for(let $ of v)$.texture!==null&&L++;return L}function Zs(v,L,$){L.isScene!==!0&&(L=pn);let k=Ct.get(v),V=w.state.lights,ht=w.state.shadowsArray,yt=V.state.version,lt=Q.getParameters(v,V.state,ht,L,$,w.state.lightProbeGridArray),_t=Q.getProgramCacheKey(lt),Mt=k.programs;k.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,k.fog=L.fog;let Ot=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;k.envMap=A.get(v.envMap||k.environment,Ot),k.envMapRotation=k.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Mt===void 0&&(v.addEventListener("dispose",te),Mt=new Map,k.programs=Mt,k.programVariants=new Map);let Wt=Mt.get(_t);if(Wt!==void 0){if(k.currentProgram===Wt&&k.lightsStateVersion===yt)return sh(v,lt),Wt}else lt.uniforms=Q.getUniforms(v),C!==null&&v.isNodeMaterial&&C.build(v,$,lt),v.onBeforeCompile(lt,P),Wt=Q.acquireProgram(lt,_t),Mt.set(_t,Wt),k.uniforms=lt.uniforms;let St=k.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(St.clippingPlanes=Z.uniform),sh(v,lt),k.needsLights=tf(v),k.lightsStateVersion=yt,k.needsLights&&(St.ambientLightColor.value=V.state.ambient,St.lightProbe.value=V.state.probe,St.sunLights.value=V.state.sun,St.sunLightShadows.value=V.state.sunShadow,St.directionalLights.value=V.state.directional,St.directionalLightShadows.value=V.state.directionalShadow,St.spotLights.value=V.state.spot,St.spotLightShadows.value=V.state.spotShadow,St.rectAreaLights.value=V.state.rectArea,St.ltc_1.value=V.state.rectAreaLTC1,St.ltc_2.value=V.state.rectAreaLTC2,St.pointLights.value=V.state.point,St.pointLightShadows.value=V.state.pointShadow,St.hemisphereLights.value=V.state.hemi,St.sunShadowMatrix.value=V.state.sunShadowMatrix,St.sunShadowCascade.value=V.state.sunShadowCascade,St.directionalShadowMatrix.value=V.state.directionalShadowMatrix,St.spotLightMatrix.value=V.state.spotLightMatrix,St.spotLightMap.value=V.state.spotLightMap,St.pointShadowMatrix.value=V.state.pointShadowMatrix),k.numLightProbeGrids=nh(w.state.lightProbeGridArray),k.currentProgram=Wt,k.uniformsList=null,Wt}function Kd(v,L,$,k,V){let ht=Ct.get(v),yt=ht.currentProgram.id+","+k+","+V,lt=ht.programVariants.get(yt);return lt===void 0?(lt=Zs(v,L,$),ht.programVariants.set(yt,lt)):(ht.currentProgram=lt,ht.uniformsList=null,ht.outputColorSpace=k,ht.toneMapping=V),lt}function ih(v){if(v.uniformsList===null){let L=v.currentProgram.getUniforms();v.uniformsList=Ns.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function sh(v,L){let $=Ct.get(v);$.outputColorSpace=L.outputColorSpace,$.batching=L.batching,$.batchingColor=L.batchingColor,$.instancing=L.instancing,$.instancingColor=L.instancingColor,$.instancingMorph=L.instancingMorph,$.skinning=L.skinning,$.morphTargets=L.morphTargets,$.morphNormals=L.morphNormals,$.morphColors=L.morphColors,$.morphTargetsCount=L.morphTargetsCount,$.numClippingPlanes=L.numClippingPlanes,$.numIntersection=L.numClipIntersection,$.vertexAlphas=L.vertexAlphas,$.vertexTangents=L.vertexTangents,$.toneMapping=L.toneMapping}function jd(v,L,$,k,V){L.isScene!==!0&&(L=pn),Nt.resetTextureUnits();let ht=L.fog,yt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?L.environment:null,lt=tt===null?P.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Xt.workingColorSpace,_t=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Mt=A.get(k.envMap||yt,_t),Ot=k.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Wt=!!$.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),St=!!$.morphAttributes.position,$t=!!$.morphAttributes.normal,ye=!!$.morphAttributes.color,re=Gn;k.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(re=P.toneMapping);let ie=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Oe=ie!==void 0?ie.length:0,vt=Ct.get(k),Ge=w.state.lights;if(ve===!0&&(Ye===!0||v!==K)){let pe=v===K&&k.id===W;Z.setState(k,v,pe)}let Kt=!1,Ui=!1;k.version===vt.__version?vt.needsLights&&vt.lightsStateVersion!==Ge.state.version||V.isBatchedMesh&&vt.batching===!1||!V.isBatchedMesh&&vt.batching===!0||V.isBatchedMesh&&vt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&vt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&vt.instancing===!1||!V.isInstancedMesh&&vt.instancing===!0||V.isSkinnedMesh&&vt.skinning===!1||!V.isSkinnedMesh&&vt.skinning===!0||V.isInstancedMesh&&vt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&vt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&vt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&vt.instancingMorph===!1&&V.morphTexture!==null||vt.envMap!==Mt||k.fog===!0&&vt.fog!==ht||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==Z.numPlanes||vt.numIntersection!==Z.numIntersection)||vt.vertexAlphas!==Ot||vt.vertexTangents!==Wt||vt.morphTargets!==St||vt.morphNormals!==$t||vt.morphColors!==ye||vt.morphTargetsCount!==Oe||vt.numLightProbeGrids!==nh(w.state.lightProbeGridArray)?Kt=!0:(vt.outputColorSpace!==lt||vt.toneMapping!==re)&&(Ui=!0):(Kt=!0,vt.__version=k.version);let Ue=vt.currentProgram;(Kt===!0||Ui===!0)&&(Ue=Ui===!0?Kd(k,L,V,lt,re):Zs(k,L,V),C&&k.isNodeMaterial&&C.onUpdateProgram(k,Ue,vt));let Qr=!1,pi=!1,Fi=!1,qt=Ue.getUniforms(),Ne=vt.uniforms;if(dt.useProgram(Ue.program)&&(Qr=!0,pi=!0,Fi=!0),k.id!==W&&(W=k.id,pi=!0),Qr||K!==v){dt.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),qt.setValue(O,"projectionMatrix",v.projectionMatrix),qt.setValue(O,"viewMatrix",v.matrixWorldInverse);let Ie=qt.map.cameraPosition;Ie!==void 0&&Ie.setValue(O,Un.setFromMatrixPosition(v.matrixWorld)),he.logarithmicDepthBuffer&&qt.setValue(O,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&qt.setValue(O,"isOrthographic",v.isOrthographicCamera===!0),K!==v&&(K=v,pi=!0,Fi=!0)}if(vt.needsLights&&(Ge.state.sunShadowMap.length>0&&qt.setValue(O,"sunShadowMap",Ge.state.sunShadowMap,Nt),Ge.state.directionalShadowMap.length>0&&qt.setValue(O,"directionalShadowMap",Ge.state.directionalShadowMap,Nt),Ge.state.spotShadowMap.length>0&&qt.setValue(O,"spotShadowMap",Ge.state.spotShadowMap,Nt),Ge.state.pointShadowMap.length>0&&qt.setValue(O,"pointShadowMap",Ge.state.pointShadowMap,Nt)),V.isSkinnedMesh){qt.setOptional(O,V,"bindMatrix"),qt.setOptional(O,V,"bindMatrixInverse");let pe=V.skeleton;pe&&(pe.boneTexture===null&&pe.computeBoneTexture(),qt.setValue(O,"boneTexture",pe.boneTexture,Nt))}V.isBatchedMesh&&(qt.setOptional(O,V,"batchingTexture"),qt.setValue(O,"batchingTexture",V._matricesTexture,Nt),qt.setOptional(O,V,"batchingIdTexture"),qt.setValue(O,"batchingIdTexture",V._indirectTexture,Nt),qt.setOptional(O,V,"batchingColorTexture"),V._colorsTexture!==null&&qt.setValue(O,"batchingColorTexture",V._colorsTexture,Nt));let Mn=$.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&J.update(V,$,Ue),(pi||vt.receiveShadow!==V.receiveShadow)&&(vt.receiveShadow=V.receiveShadow,qt.setValue(O,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&L.environment!==null&&(Ne.envMapIntensity.value=L.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=B_()),pi){if(qt.setValue(O,"toneMappingExposure",P.toneMappingExposure),vt.needsLights&&Qd(Ne,Fi),ht&&k.fog===!0&&st.refreshFogUniforms(Ne,ht),st.refreshMaterialUniforms(Ne,k,ut,Et,w.state.transmissionRenderTarget[v.id]),vt.needsLights&&vt.numLightProbeGrids>0){let pe=M,Ie=0;for(let Xn of w.state.lightProbeGridArray)Xn.texture!==null&&(pe.textures[Ie]=Xn.texture,pe.min[Ie]=Xn.boundingBox.min,pe.max[Ie]=Xn.boundingBox.max,pe.resolution[Ie]=Xn.resolution,Ie++);for(let Xn in pe)pe[Xn].length=Ie;Ne.probesSH.value=pe.textures,Ne.probesMin.value=pe.min,Ne.probesMax.value=pe.max,Ne.probesResolution.value=pe.resolution}Ns.upload(O,ih(vt),Ne,Nt)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ns.upload(O,ih(vt),Ne,Nt),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&qt.setValue(O,"center",V.center),qt.setValue(O,"modelViewMatrix",V.modelViewMatrix),qt.setValue(O,"normalMatrix",V.normalMatrix),qt.setValue(O,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){let pe=k.uniformsGroups;for(let Ie=0,Xn=pe.length;Ie<Xn;Ie++){let oh=pe[Ie];bt.update(oh,Ue),bt.bind(oh,Ue)}}return Ue}function Qd(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.sunLights.needsUpdate=L,v.sunLightShadows.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function tf(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return tt},this.setRenderTargetTextures=function(v,L,$){let k=Ct.get(v);k.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Ct.get(v.texture).__webglTexture=L,Ct.get(v.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:$,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){let $=Ct.get(v);$.__webglFramebuffer=L,$.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,$=0){tt=v,G=L,B=$;let k=null,V=!1,ht=!1;if(v){let lt=Ct.get(v);if(lt.__useDefaultFramebuffer!==void 0){dt.bindFramebuffer(O.FRAMEBUFFER,lt.__webglFramebuffer),j.copy(v.viewport),pt.copy(v.scissor),Rt=v.scissorTest,dt.viewport(j),dt.scissor(pt),dt.setScissorTest(Rt),W=-1;return}else if(lt.__webglFramebuffer===void 0)Nt.setupRenderTarget(v);else if(lt.__hasExternalTextures)Nt.rebindTextures(v,Ct.get(v.texture).__webglTexture,Ct.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Ot=v.depthTexture;if(lt.__boundDepthTexture!==Ot){if(Ot!==null&&Ct.has(Ot)&&(v.width!==Ot.image.width||v.height!==Ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Nt.setupDepthRenderbuffer(v)}}let _t=v.texture;(_t.isData3DTexture||_t.isDataArrayTexture||_t.isCompressedArrayTexture)&&(ht=!0);let Mt=Ct.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Mt[L])?k=Mt[L][$]:k=Mt[L],V=!0):v.samples>0&&Nt.useMultisampledRTT(v)===!1?k=Ct.get(v).__webglMultisampledFramebuffer:Array.isArray(Mt)?k=Mt[$]:k=Mt,j.copy(v.viewport),pt.copy(v.scissor),Rt=v.scissorTest}else j.copy(At).multiplyScalar(ut).floor(),pt.copy(Jt).multiplyScalar(ut).floor(),Rt=ne;if($!==0&&(k=D),dt.bindFramebuffer(O.FRAMEBUFFER,k)&&dt.drawBuffers(v,k),dt.viewport(j),dt.scissor(pt),dt.setScissorTest(Rt),V){let lt=Ct.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+L,lt.__webglTexture,$)}else if(ht){let lt=L;for(let _t=0;_t<v.textures.length;_t++){let Mt=Ct.get(v.textures[_t]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+_t,Mt.__webglTexture,$,lt)}}else if(v!==null&&$!==0){let lt=Ct.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,lt.__webglTexture,$)}W=-1};function rh(v){let L=Ct.get(v);return(L.__readFormat!==v.format||L.__readType!==v.type)&&(L.__readFormat=v.format,L.__readType=v.type,L.__formatReadable=he.textureFormatReadable(v.format),L.__typeReadable=he.textureTypeReadable(v.type)),L}this.readRenderTargetPixels=function(v,L,$,k,V,ht,yt,lt=0){if(!(v&&v.isWebGLRenderTarget)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Ct.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&yt!==void 0&&(_t=_t[yt],Array.isArray(_t)&&(_t=_t[0])),_t){dt.bindFramebuffer(O.FRAMEBUFFER,_t);try{let Mt=v.textures[lt],Ot=Mt.format,Wt=Mt.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+lt);let St=rh(Mt);if(St.__formatReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(St.__typeReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-k&&$>=0&&$<=v.height-V&&O.readPixels(L,$,k,V,it.convert(Ot),it.convert(Wt),ht)}finally{let Mt=tt!==null?Ct.get(tt).__webglFramebuffer:null;dt.bindFramebuffer(O.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(v,L,$,k,V,ht,yt,lt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Ct.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&yt!==void 0&&(_t=_t[yt],Array.isArray(_t)&&(_t=_t[0])),_t)if(L>=0&&L<=v.width-k&&$>=0&&$<=v.height-V){dt.bindFramebuffer(O.FRAMEBUFFER,_t);let Mt=v.textures[lt],Ot=Mt.format,Wt=Mt.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+lt);let St=rh(Mt);if(St.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(St.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let $t=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,$t),O.bufferData(O.PIXEL_PACK_BUFFER,ht.byteLength,O.STREAM_READ),O.readPixels(L,$,k,V,it.convert(Ot),it.convert(Wt),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let ye=tt!==null?Ct.get(tt).__webglFramebuffer:null;dt.bindFramebuffer(O.FRAMEBUFFER,ye);let re=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await _u(O,re,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,$t),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ht),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer($t),O.deleteSync(re),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,$=0){let k=Math.pow(2,-$),V=Math.floor(v.image.width*k),ht=Math.floor(v.image.height*k),yt=L!==null?L.x:0,lt=L!==null?L.y:0;Nt.setTexture2D(v,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,yt,lt,V,ht),dt.unbindTexture()},this.copyTextureToTexture=function(v,L,$=null,k=null,V=0,ht=0){let yt,lt,_t,Mt,Ot,Wt,St,$t,ye,re=v.isCompressedTexture?v.mipmaps[ht]:v.image;if($!==null)yt=$.max.x-$.min.x,lt=$.max.y-$.min.y,_t=$.isBox3?$.max.z-$.min.z:1,Mt=$.min.x,Ot=$.min.y,Wt=$.isBox3?$.min.z:0;else{let qt=Math.pow(2,-V);yt=Math.floor(re.width*qt),lt=Math.floor(re.height*qt),v.isDataArrayTexture?_t=re.depth:v.isData3DTexture?_t=Math.floor(re.depth*qt):_t=1,Mt=0,Ot=0,Wt=0}k!==null?(St=k.x,$t=k.y,ye=k.z):(St=0,$t=0,ye=0);let ie=it.convert(L.format),Oe=it.convert(L.type),vt;L.isData3DTexture?(Nt.setTexture3D(L,0),vt=O.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Nt.setTexture2DArray(L,0),vt=O.TEXTURE_2D_ARRAY):(Nt.setTexture2D(L,0),vt=O.TEXTURE_2D),dt.activeTexture(O.TEXTURE0),dt.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,L.flipY),dt.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),dt.pixelStorei(O.UNPACK_ALIGNMENT,L.unpackAlignment);let Ge=dt.getParameter(O.UNPACK_ROW_LENGTH),Kt=dt.getParameter(O.UNPACK_IMAGE_HEIGHT),Ui=dt.getParameter(O.UNPACK_SKIP_PIXELS),Ue=dt.getParameter(O.UNPACK_SKIP_ROWS),Qr=dt.getParameter(O.UNPACK_SKIP_IMAGES);dt.pixelStorei(O.UNPACK_ROW_LENGTH,re.width),dt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,re.height),dt.pixelStorei(O.UNPACK_SKIP_PIXELS,Mt),dt.pixelStorei(O.UNPACK_SKIP_ROWS,Ot),dt.pixelStorei(O.UNPACK_SKIP_IMAGES,Wt);let pi=v.isDataArrayTexture||v.isData3DTexture,Fi=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){let qt=Ct.get(v),Ne=Ct.get(L),Mn=Ct.get(qt.__renderTarget),pe=Ct.get(Ne.__renderTarget);dt.bindFramebuffer(O.READ_FRAMEBUFFER,Mn.__webglFramebuffer),dt.bindFramebuffer(O.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let Ie=0;Ie<_t;Ie++)pi&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ct.get(v).__webglTexture,V,Wt+Ie),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ct.get(L).__webglTexture,ht,ye+Ie)),O.blitFramebuffer(Mt,Ot,Mt+yt,Ot+lt,St,$t,St+yt,$t+lt,O.DEPTH_BUFFER_BIT,O.NEAREST);dt.bindFramebuffer(O.READ_FRAMEBUFFER,null),dt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(V!==0||v.isRenderTargetTexture||Ct.has(v)){let qt=Ct.get(v),Ne=Ct.get(L);dt.bindFramebuffer(O.READ_FRAMEBUFFER,R),dt.bindFramebuffer(O.DRAW_FRAMEBUFFER,z);for(let Mn=0;Mn<_t;Mn++)pi?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,qt.__webglTexture,V,Wt+Mn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,qt.__webglTexture,V),Fi?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ne.__webglTexture,ht,ye+Mn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ne.__webglTexture,ht),V!==0?O.blitFramebuffer(Mt,Ot,Mt+yt,Ot+lt,St,$t,St+yt,$t+lt,O.COLOR_BUFFER_BIT,O.NEAREST):Fi?O.copyTexSubImage3D(vt,ht,St,$t,ye+Mn,Mt,Ot,yt,lt):O.copyTexSubImage2D(vt,ht,St,$t,Mt,Ot,yt,lt);dt.bindFramebuffer(O.READ_FRAMEBUFFER,null),dt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Fi?v.isDataTexture||v.isData3DTexture?O.texSubImage3D(vt,ht,St,$t,ye,yt,lt,_t,ie,Oe,re.data):L.isCompressedArrayTexture?O.compressedTexSubImage3D(vt,ht,St,$t,ye,yt,lt,_t,ie,re.data):O.texSubImage3D(vt,ht,St,$t,ye,yt,lt,_t,ie,Oe,re):v.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ht,St,$t,yt,lt,ie,Oe,re.data):v.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ht,St,$t,re.width,re.height,ie,re.data):O.texSubImage2D(O.TEXTURE_2D,ht,St,$t,yt,lt,ie,Oe,re);dt.pixelStorei(O.UNPACK_ROW_LENGTH,Ge),dt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Kt),dt.pixelStorei(O.UNPACK_SKIP_PIXELS,Ui),dt.pixelStorei(O.UNPACK_SKIP_ROWS,Ue),dt.pixelStorei(O.UNPACK_SKIP_IMAGES,Qr),ht===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&O.generateMipmap(vt),dt.unbindTexture()},this.initRenderTarget=function(v){Ct.get(v).__webglFramebuffer===void 0&&Nt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Nt.setTextureCube(v,0):v.isData3DTexture?Nt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Nt.setTexture2DArray(v,0):Nt.setTexture2D(v,0),dt.unbindTexture()},this.resetState=function(){G=0,B=0,tt=null,dt.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}};var id={type:"change"},Cc={type:"start"},rd={type:"end"},Za=new Mi,sd=new nn,z_=Math.cos(70*fc.DEG2RAD),Ae=new F,Je=2*Math.PI,jt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Rc=1e-6,Br=class extends Tr{constructor(t,e=null){super(t,e),this.state=jt.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:cn.ROTATE,MIDDLE:cn.DOLLY,RIGHT:cn.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new sn,this._lastTargetPosition=new F,this._quat=new sn().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Rs,this._sphericalDelta=new Rs,this._scale=1,this._panOffset=new F,this._rotateStart=new wt,this._rotateEnd=new wt,this._rotateDelta=new wt,this._panStart=new wt,this._panEnd=new wt,this._panDelta=new wt,this._dollyStart=new wt,this._dollyEnd=new wt,this._dollyDelta=new wt,this._dollyDirection=new F,this._mouse=new wt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=G_.bind(this),this._onPointerDown=H_.bind(this),this._onPointerUp=V_.bind(this),this._onContextMenu=J_.bind(this),this._onMouseWheel=X_.bind(this),this._onKeyDown=Y_.bind(this),this._onTouchStart=q_.bind(this),this._onTouchMove=Z_.bind(this),this._onMouseDown=W_.bind(this),this._onMouseMove=$_.bind(this),this._interceptControlDown=K_.bind(this),this._interceptControlUp=j_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=jt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(id),this.update(),this.state=jt.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===jt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Je:n>Math.PI&&(n-=Je),s<-Math.PI?s+=Je:s>Math.PI&&(s-=Je),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ae.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Za.origin.copy(this.object.position),Za.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Za.direction))<z_?this.object.lookAt(this.target):(sd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Za.intersectPlane(sd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Rc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Rc||this._lastTargetPosition.distanceToSquared(this.target)>Rc?(this.dispatchEvent(id),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Je/60*this.autoRotateSpeed*t:Je/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new wt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function H_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function G_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function V_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rd),this.state=jt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function W_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case cn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=jt.DOLLY;break;case cn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=jt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=jt.ROTATE}break;case cn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=jt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=jt.PAN}break;default:this.state=jt.NONE}this.state!==jt.NONE&&this.dispatchEvent(Cc)}function $_(i){switch(this.state){case jt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case jt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case jt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function X_(i){this.enabled===!1||this.enableZoom===!1||this.state!==jt.NONE||(i.preventDefault(),this.dispatchEvent(Cc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(rd))}function Y_(i){this.enabled!==!1&&this._handleKeyDown(i)}function q_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case wi.ROTATE:if(this.enableRotate===!1){this.state=jt.NONE;break}this._handleTouchStartRotate(i),this.state=jt.TOUCH_ROTATE;break;case wi.PAN:if(this.enablePan===!1){this.state=jt.NONE;break}this._handleTouchStartPan(i),this.state=jt.TOUCH_PAN;break;default:this.state=jt.NONE}break;case 2:switch(this.touches.TWO){case wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=jt.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=jt.TOUCH_DOLLY_ROTATE;break;default:this.state=jt.NONE}break;default:this.state=jt.NONE}this.state!==jt.NONE&&this.dispatchEvent(Cc)}function Z_(i){switch(this._trackPointer(i),this.state){case jt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case jt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case jt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case jt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=jt.NONE}}function J_(i){this.enabled!==!1&&i.preventDefault()}function K_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function j_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var kr=class extends be{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new wt(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this.rotation2D=t.rotation2D,this}},Us=new F,od=new ee,ad=new ee,ld=new F,cd=new F,Ja=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:n,height:s}},this.render=function(m,x){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),od.copy(x.matrixWorldInverse),ad.multiplyMatrices(x.projectionMatrix,od),u(m,m,x),this.sortObjects&&f(m)},this.setSize=function(m,x){n=m,s=x,r=n/2,o=s/2,c.style.width=m+"px",c.style.height=x+"px"};function l(m){m.isCSS2DObject&&(m.element.style.display="none");for(let x=0,g=m.children.length;x<g;x++)l(m.children[x])}function u(m,x,g){if(m.visible===!1){l(m);return}if(m.isCSS2DObject){Us.setFromMatrixPosition(m.matrixWorld),Us.applyMatrix4(ad);let h=Us.z>=-1&&Us.z<=1&&m.layers.test(g.layers)===!0,y=m.element;if(y.style.display=h===!0?"":"none",h===!0){m.onBeforeRender(e,x,g);let M=100*m.center.x,T=100*m.center.y;y.style.transformOrigin=`${M}% ${T}%`;let w=-m.rotation2D,_=Us.x*r+r,b=-Us.y*o+o;y.style.transform=`translate(${-M}%, ${-T}%) translate(${_}px, ${b}px) rotate(${w}rad)`,y.parentNode!==c&&c.appendChild(y),m.onAfterRender(e,x,g)}let E={distanceToCameraSquared:p(g,m)};a.objects.set(m,E)}for(let h=0,y=m.children.length;h<y;h++)u(m.children[h],x,g)}function p(m,x){return ld.setFromMatrixPosition(m.matrixWorld),cd.setFromMatrixPosition(x.matrixWorld),ld.distanceToSquared(cd)}function d(m){let x=[];return m.traverseVisible(function(g){g.isCSS2DObject&&x.push(g)}),x}function f(m){let x=d(m).sort(function(h,y){if(h.renderOrder!==y.renderOrder)return y.renderOrder-h.renderOrder;let E=a.objects.get(h).distanceToCameraSquared,M=a.objects.get(y).distanceToCameraSquared;return E-M}),g=x.length;for(let h=0,y=x.length;h<y;h++)x[h].element.style.zIndex=g-h}}};li();function Hr(i,t){return`${t}${i.nextId++}`}function ci(i,...t){for(let e of t)if(i[e]===void 0||i[e]===null||i[e]==="")throw new Error(`\u5F15\u6570 ${e} \u304C\u3042\u308A\u307E\u305B\u3093`)}function Ka(i,t){if(!hn(i,t))throw new Error(`\u968E ${t} \u304C\u3042\u308A\u307E\u305B\u3093`)}function Ki(i,t){let e=typeof i=="string"&&i.trim()===""?NaN:Number(i);if(i==null||!Number.isFinite(e))throw new Error(`${t} \u306F\u6570\u5024\u306B\u3057\u3066\u304F\u3060\u3055\u3044\uFF08\u53D7\u3051\u53D6\u3063\u305F\u5024: ${JSON.stringify(i)}\uFF09`);return e}function ks(i,t,e){if(!t||typeof t!="object"||t.x===void 0||t.y===void 0)throw new Error(`${e} \u306E\u5EA7\u6A19\u304C\u3042\u308A\u307E\u305B\u3093\uFF08{x, y}\uFF09`);let n=(s,r)=>{if(typeof r=="number")return Ki(r,`${e}.${s.toLowerCase()}`);let o=String(r);if(zr(i,s,o))return o;if(/^-?\d+(\.\d+)?$/.test(o))return Number(o);throw new Error(`\u901A\u308A\u82AF ${o} \u304C\u3042\u308A\u307E\u305B\u3093\uFF08${s}\u65B9\u5411\uFF09`)};return{x:n("X",t.x),y:n("Y",t.y)}}function Pc(i,t,e,n){let s=Ii(i,e);return i.members.find(r=>r.id!==n&&r.kind==="column"&&r.story===t&&r.at&&(()=>{let o=Ii(i,r.at);return o.x===s.x&&o.y===s.y})())}function Lc(i,t){if(!Ic(i,t))throw new Error(`${t} \u306F\u6700\u4E0A\u968E\u3067\u3059\u3002\u67F1\u306F\u4E0A\u306E\u968E\u306EFL\u307E\u3067\u4F38\u3073\u308B\u306E\u3067\u3001\u6700\u4E0A\u968E\u306B\u306F\u7F6E\u3051\u307E\u305B\u3093`)}function ud(i){for(let t of i.members)if(t.kind==="column"){Lc(i,t.story);let e=Pc(i,t.story,t.at,t.id);if(e)throw new Error(`\u5909\u66F4\u3059\u308B\u3068 ${t.story} \u3067\u67F1 ${t.id} \u3068 ${e.id} \u304C\u540C\u3058\u4F4D\u7F6E\u306B\u306A\u308A\u307E\u3059`)}else t.from&&t.to&&Nc(i,t.from,t.to)}function Nc(i,t,e){let n=Ii(i,t),s=Ii(i,e);if(n.x===s.x&&n.y===s.y)throw new Error("\u59CB\u70B9\u3068\u7D42\u70B9\u304C\u540C\u3058\u3067\u3059")}var ja=["column","girder","beam"];function dd(i){if(!i||typeof i!="object")throw new Error("shape \u304C\u3042\u308A\u307E\u305B\u3093");let t=e=>{if(!(Number(i[e])>0))throw new Error(`shape.${e} \u306F\u6B63\u306E\u6570\u306B\u3057\u3066\u304F\u3060\u3055\u3044`);return Number(i[e])};if(i.type==="RC_RECT")return{type:"RC_RECT",b:t("b"),d:t("d")};if(i.type==="S_H")return{type:"S_H",h:t("h"),b:t("b"),tw:t("tw"),tf:t("tf")};if(i.type==="S_BOX")return{type:"S_BOX",h:t("h"),b:t("b"),t:t("t")};throw new Error(`shape.type ${i.type} \u306F\u672A\u5BFE\u5FDC\uFF08RC_RECT / S_H / S_BOX\uFF09`)}var Dc={"grid.add":{help:"\u901A\u308A\u82AF\u3092\u8FFD\u52A0 {axis:'X'|'Y', name, pos}",run(i,t){ci(t,"axis","name","pos");let e=String(t.axis).toUpperCase();if(e!=="X"&&e!=="Y")throw new Error("axis \u306F X \u304B Y");if(zr(i,e,t.name))throw new Error(`\u901A\u308A\u82AF ${t.name} \u306F\u65E2\u306B\u3042\u308A\u307E\u3059`);let n=Hr(i,"g");return i.grids.push({id:n,axis:e,name:String(t.name),pos:Ki(t.pos,"pos")}),[n]}},"story.add":{help:"\u968E\u3092\u8FFD\u52A0 {name, level}",run(i,t){if(ci(t,"name","level"),hn(i,t.name))throw new Error(`\u968E ${t.name} \u306F\u65E2\u306B\u3042\u308A\u307E\u3059`);let e=Ki(t.level,"level"),n=i.stories.find(r=>r.level===e);if(n)throw new Error(`FL ${e} \u306B\u306F\u65E2\u306B\u968E ${n.name} \u304C\u3042\u308A\u307E\u3059`);let s=Hr(i,"s");return i.stories.push({id:s,name:String(t.name),level:e}),[s]}},"grid.set":{help:"\u901A\u308A\u82AF\u3092\u5909\u66F4 {id, name?, pos?}\uFF08\u90E8\u6750\u306F\u901A\u308A\u540D\u3067\u53C2\u7167\u3057\u3066\u3044\u308B\u306E\u3067\u8FFD\u5F93\u3059\u308B\uFF09",run(i,t){ci(t,"id");let e=i.grids.find(n=>n.id===t.id);if(!e)throw new Error(`\u901A\u308A\u82AF ${t.id} \u304C\u3042\u308A\u307E\u305B\u3093`);if(t.pos!==void 0&&(e.pos=Ki(t.pos,"pos")),t.name!==void 0&&t.name!==e.name){if(t.name===null)throw new Error("name \u304C\u7A7A\u3067\u3059");let n=String(t.name).trim();if(!n)throw new Error("name \u304C\u7A7A\u3067\u3059");if(zr(i,e.axis,n))throw new Error(`\u901A\u308A\u82AF ${n} \u306F\u65E2\u306B\u3042\u308A\u307E\u3059`);for(let s of i.members)for(let r of[s.at,s.from,s.to])r&&(e.axis==="X"&&r.x===e.name&&(r.x=n),e.axis==="Y"&&r.y===e.name&&(r.y=n));for(let s of i.views??[])s.line===e.name&&s.axis===e.axis&&(s.line=n);e.name=n}return ud(i),[e.id]}},"story.set":{help:"\u968E\u3092\u5909\u66F4 {id, name?, level?}",run(i,t){ci(t,"id");let e=i.stories.find(n=>n.id===t.id);if(!e)throw new Error(`\u968E ${t.id} \u304C\u3042\u308A\u307E\u305B\u3093`);if(t.level!==void 0){let n=Ki(t.level,"level"),s=i.stories.find(r=>r.level===n&&r.id!==e.id);if(s)throw new Error(`FL ${n} \u306B\u306F\u65E2\u306B\u968E ${s.name} \u304C\u3042\u308A\u307E\u3059`);e.level=n}if(t.name!==void 0&&t.name!==e.name){if(t.name===null)throw new Error("name \u304C\u7A7A\u3067\u3059");let n=String(t.name).trim();if(!n)throw new Error("name \u304C\u7A7A\u3067\u3059");if(hn(i,n))throw new Error(`\u968E ${n} \u306F\u65E2\u306B\u3042\u308A\u307E\u3059`);for(let s of[...i.members,...i.sections,...i.slabs??[],...i.walls??[]])s.story===e.name&&(s.story=n);for(let s of i.views??[])s.story===e.name&&(s.story=n),s.opts?.columnStory===e.name&&(s.opts.columnStory=n);e.name=n}return ud(i),[e.id]}},"section.add":{help:"\u65AD\u9762\u3092\u8FFD\u52A0\u30FB\u4E0A\u66F8\u304D {mark, kind, story?='*', shape}",run(i,t){if(ci(t,"mark","kind","shape"),!ja.includes(t.kind))throw new Error(`kind \u306F ${ja.join("/")}`);let e=t.story??"*";e!=="*"&&Ka(i,e);let n=dd(t.shape),s=i.sections.find(o=>o.mark===t.mark&&o.story===e);if(s)return s.kind=t.kind,s.shape=n,[s.id];let r=Hr(i,"sec");return i.sections.push({id:r,mark:String(t.mark),kind:t.kind,story:e,shape:n}),[r]}},"column.add":{help:"\u67F1\u3092\u8FFD\u52A0 {mark, story, at:{x,y}}\uFF08x,y \u306F\u901A\u308A\u540D\u304B\u6570\u5024mm\uFF09",run(i,t){ci(t,"mark","story","at"),Ka(i,t.story),Lc(i,t.story);let e=ks(i,t.at,"at"),n=Pc(i,t.story,e);if(n)throw new Error(`${t.story} \u306E\u540C\u3058\u4F4D\u7F6E\u306B\u67F1 ${n.mark}\uFF08${n.id}\uFF09\u304C\u3042\u308A\u307E\u3059`);let s=Hr(i,"m");return i.members.push({id:s,kind:"column",mark:String(t.mark),story:t.story,at:e}),[s]}},"beam.add":{help:"\u6881\u3092\u8FFD\u52A0 {mark, story, from:{x,y}, to:{x,y}, kind?='girder'|'beam', dz?}",run(i,t){ci(t,"mark","story","from","to"),Ka(i,t.story);let e=ks(i,t.from,"from"),n=ks(i,t.to,"to");Nc(i,e,n);let s=t.kind==="beam"?"beam":"girder",r=Hr(i,"m"),o={id:r,kind:s,mark:String(t.mark),story:t.story,from:e,to:n};if(t.dz!==void 0&&t.dz!==null&&t.dz!==""){let a=Ki(t.dz,"dz");a&&(o.dz=a)}return i.members.push(o),[r]}},"member.set":{help:"\u90E8\u6750\u3092\u5909\u66F4 {id, mark?, story?, dz?, at?(\u67F1), from?/to?(\u6881)}",run(i,t){ci(t,"id");let e=i.members.find(r=>r.id===t.id);if(!e)throw new Error(`\u90E8\u6750 ${t.id} \u304C\u3042\u308A\u307E\u305B\u3093`);let n=e.kind==="column";if(n&&(t.from!==void 0||t.to!==void 0||t.dz!==void 0))throw new Error("\u67F1\u306B\u306F from/to/dz \u306F\u4F7F\u3048\u307E\u305B\u3093\uFF08at \u3092\u4F7F\u3046\uFF09");if(!n&&t.at!==void 0)throw new Error("\u6881\u306B\u306F at \u306F\u4F7F\u3048\u307E\u305B\u3093\uFF08from/to \u3092\u4F7F\u3046\uFF09");let s=t.story!==void 0?String(t.story):e.story;if(Ka(i,s),n){Lc(i,s);let r=t.at!==void 0?ks(i,t.at,"at"):e.at,o=Pc(i,s,r,e.id);if(o)throw new Error(`${s} \u306E\u540C\u3058\u4F4D\u7F6E\u306B\u67F1 ${o.mark}\uFF08${o.id}\uFF09\u304C\u3042\u308A\u307E\u3059`);e.at=r}else{let r=t.from!==void 0?ks(i,t.from,"from"):e.from,o=t.to!==void 0?ks(i,t.to,"to"):e.to;if(Nc(i,r,o),e.from=r,e.to=o,t.dz!==void 0){let a=Ki(t.dz,"dz");a?e.dz=a:delete e.dz}}if(e.story=s,t.mark!==void 0){if(String(t.mark).trim()==="")throw new Error("mark \u304C\u7A7A\u3067\u3059");e.mark=String(t.mark)}return[e.id]}},delete:{help:"\u524A\u9664 {ids:[...]}\uFF08\u90E8\u6750\u30FB\u901A\u308A\u82AF\u30FB\u968E\u30FB\u65AD\u9762\uFF09",run(i,t){if(ci(t,"ids"),!Array.isArray(t.ids)||!t.ids.length)throw new Error('ids \u306F id \u306E\u914D\u5217\u306B\u3057\u3066\u304F\u3060\u3055\u3044\uFF08\u4F8B: ["m3"]\uFF09');let e=t.ids.map(String),n=new Set([...i.members,...i.grids,...i.sections,...i.stories].map(o=>o.id)),s=e.filter(o=>!n.has(o));if(s.length)throw new Error(`id \u304C\u3042\u308A\u307E\u305B\u3093: ${s.join(", ")}`);for(let o of e){let a=i.stories.find(l=>l.id===o);if(a){let l=i.members.find(u=>u.story===a.name&&!e.includes(u.id))??i.sections.find(u=>u.story===a.name&&!e.includes(u.id));if(l)throw new Error(`\u968E ${a.name} \u306F ${l.id} \u304C\u53C2\u7167\u3057\u3066\u3044\u307E\u3059\u3002\u5148\u306B\u305D\u306E\u968E\u306E\u90E8\u6750\u30FB\u65AD\u9762\u3092\u6D88\u3057\u3066\u304F\u3060\u3055\u3044`)}let c=i.grids.find(l=>l.id===o);if(c){let l=i.members.find(u=>[u.at,u.from,u.to].some(p=>p&&(p.x===c.name||p.y===c.name))&&!e.includes(u.id));if(l)throw new Error(`\u901A\u308A\u82AF ${c.name} \u306F\u90E8\u6750 ${l.id} \u304C\u53C2\u7167\u3057\u3066\u3044\u307E\u3059`)}}let r=new Set(e);return i.members=i.members.filter(o=>!r.has(o.id)),i.grids=i.grids.filter(o=>!r.has(o.id)),i.sections=i.sections.filter(o=>!r.has(o.id)),i.stories=i.stories.filter(o=>!r.has(o.id)),e}}},ji=class i{model;undoStack=[];redoStack=[];listeners=[];log=[];constructor(t){this.model=t?i.validate(t):hd()}static validate(t){if(!t||t.schema!=="sbim/0.1"&&t.schema!=="sbim/0.2")throw new Error("sbim/0.1\u30FB0.2 \u5F62\u5F0F\u306EJSON\u3067\u306F\u3042\u308A\u307E\u305B\u3093");for(let n of["grids","stories","sections","members"])if(!Array.isArray(t[n]))throw new Error(`${n} \u304C\u914D\u5217\u3067\u306F\u3042\u308A\u307E\u305B\u3093`);if(!Number.isFinite(t.nextId))throw new Error("nextId \u304C\u4E0D\u6B63\u3067\u3059");let e=n=>typeof n=="string";for(let n of t.grids)if(!e(n.id)||!e(n.name)||n.axis!=="X"&&n.axis!=="Y"||!Number.isFinite(n.pos))throw new Error(`\u901A\u308A\u82AF\u30C7\u30FC\u30BF\u304C\u4E0D\u6B63: ${JSON.stringify(n)}`);for(let n of t.stories)if(!e(n.id)||!e(n.name)||!Number.isFinite(n.level))throw new Error(`\u968E\u30C7\u30FC\u30BF\u304C\u4E0D\u6B63: ${JSON.stringify(n)}`);for(let n of t.sections){if(!e(n.id)||!e(n.mark)||!e(n.story)||!ja.includes(n.kind))throw new Error(`\u65AD\u9762\u30C7\u30FC\u30BF\u304C\u4E0D\u6B63: ${JSON.stringify(n)}`);dd(n.shape)}for(let n of t.members)if(!e(n.id)||!e(n.mark)||!e(n.story)||!ja.includes(n.kind))throw new Error(`\u90E8\u6750\u30C7\u30FC\u30BF\u304C\u4E0D\u6B63: ${JSON.stringify(n)}`);return e(t.name)||(t.name="untitled"),t}on(t){this.listeners.push(t)}emit(){for(let t of this.listeners)t(this.model)}run(t,e={}){let n;if(t==="undo"||t==="redo"){let o=t==="undo"?this.undoStack:this.redoStack,a=t==="undo"?this.redoStack:this.undoStack,c=o.pop();return c?(a.push(JSON.stringify(this.model)),this.model=JSON.parse(c),n={ok:!0},this.emit()):n={ok:!1,error:t==="undo"?"\u53D6\u308A\u6D88\u3059\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093":"\u3084\u308A\u76F4\u3059\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093"},this.log.push({cmd:t,args:e,result:n}),n}let s=JSON.stringify(this.model),r=JSON.parse(s);try{let o;if(t==="batch")o=[],(e.commands??[]).forEach((a,c)=>{let l=Dc[a.cmd];if(!l)throw new Error(`${c+1}\u4EF6\u76EE: \u30B3\u30DE\u30F3\u30C9 ${a.cmd} \u306F\u3042\u308A\u307E\u305B\u3093`);try{o.push(...l.run(r,a.args??{}))}catch(u){throw new Error(`${c+1}\u4EF6\u76EE ${a.cmd}: ${u.message}`)}});else{let a=Dc[t];if(!a)throw new Error(`\u30B3\u30DE\u30F3\u30C9 ${t} \u306F\u3042\u308A\u307E\u305B\u3093\u3002\u4F7F\u3048\u308B\u3082\u306E: ${Object.keys(Dc).join(", ")}, batch, undo, redo`);o=a.run(r,e)}this.undoStack.push(s),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[],this.model=r,n={ok:!0,ids:o},this.emit()}catch(o){n={ok:!1,error:o.message}}return this.log.push({cmd:t,args:e,result:n}),n}clearHistory(){this.undoStack=[],this.redoStack=[]}load(t){this.model=i.validate(t),this.undoStack=[],this.redoStack=[],this.emit()}};var fd=["grid X <\u540D\u524D> <\u4F4D\u7F6Emm>        \u4F8B: grid X X1 0 \uFF0F grid Y Y1 0","story <\u540D\u524D> <FL\u9AD8\u3055mm>       \u4F8B: story 2F 4200","section <\u7B26\u53F7> <column|girder|beam> <\u65AD\u9762> [\u968E]   \u65AD\u9762\u4F8B: 600x700, H-400x200x8x13, BOX-300x300x12","column <\u7B26\u53F7> <X\u901A\u308A> <Y\u901A\u308A> [\u968E]                 \u4F8B: column C1 X1 Y1","beam <\u7B26\u53F7> <X> <Y> <X> <Y> [\u5929\u7AEFdz]               \u4F8B: beam G1 X1 Y1 X2 Y1 -150","sbeam <\u7B26\u53F7> <X> <Y> <X> <Y> [\u5929\u7AEFdz]              \u5C0F\u6881","delete <id> ...   undo   redo   help",'JSON\u3067: {"cmd":"grid.set","args":{"id":"g2","pos":6500}} / {"cmd":"story.set","args":{"id":"s2","name":"2F","level":4200}}',"\u8868\uFF08table\uFF09\u3067\u901A\u308A\u82AF\u30FB\u968E\u30FB\u65AD\u9762\u30FB\u90E8\u6750\u3092\u76F4\u63A5\u7DE8\u96C6\u3002\u56F3\u9762\u4E00\u5F0F: export set",'JSON\u3067\u3082\u53EF: {"cmd":"column.add","args":{...}}'];function tx(i){let t=i.match(/^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/i);if(t)return{type:"RC_RECT",b:+t[1],d:+t[2]};if(t=i.match(/^H-?(\d+)x(\d+)x(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/i),t)return{type:"S_H",h:+t[1],b:+t[2],tw:+t[3],tf:+t[4]};if(t=i.match(/^(?:BOX|□)-?(\d+)x(\d+)x(\d+(?:\.\d+)?)$/i),t)return{type:"S_BOX",h:+t[1],b:+t[2],t:+t[3]};throw new Error(`\u65AD\u9762 ${i} \u3092\u8AAD\u3081\u307E\u305B\u3093\uFF08\u4F8B: 600x700, H-400x200x8x13, BOX-300x300x12\uFF09`)}var zs=i=>i;function Hs(i,t={}){let e=i.trim();if(e.startsWith("{")){let a=JSON.parse(e);return{cmd:a.cmd,args:a.args??{}}}let[n,...s]=e.split(/\s+/),r=(n??"").toLowerCase(),o=a=>s[a]??t.story;switch(r){case"grid":return{cmd:"grid.add",args:{axis:s[0],name:s[1],pos:s[2]}};case"story":return{cmd:"story.add",args:{name:s[0],level:s[1]}};case"section":return{cmd:"section.add",args:{mark:s[0],kind:s[1],shape:tx(s[2]??""),story:s[3]??"*"}};case"column":return{cmd:"column.add",args:{mark:s[0],at:{x:zs(s[1]),y:zs(s[2])},story:o(3)}};case"beam":case"sbeam":return{cmd:"beam.add",args:{kind:r==="sbeam"?"beam":"girder",mark:s[0],from:{x:zs(s[1]),y:zs(s[2])},to:{x:zs(s[3]),y:zs(s[4])},dz:s[5]?Number(s[5]):void 0,story:t.story}};case"delete":return{cmd:"delete",args:{ids:s}};case"undo":case"redo":return{cmd:r,args:{}};default:return{cmd:n,args:{}}}}var ex=["grid X X1 0","grid X X2 6000","grid X X3 12000","grid X X4 18000","grid Y Y1 0","grid Y Y2 7000","grid Y Y3 14000","story 1F 0","story 2F 4000","story 3F 7600","story RF 11200","section C1 column 700x700","section C2 column 600x600","section G1 girder 450x800","section G2 girder 400x700","section B1 beam 300x600"];function Qa(){let i=new ji;i.model.name="\u30B5\u30F3\u30D7\u30EB\uFF08\u67B6\u7A7A\u30C7\u30FC\u30BF\uFF09";let t=ex.map(r=>Hs(r)),e=["X1","X2","X3","X4"],n=["Y1","Y2","Y3"];for(let r of["1F","2F","3F"])for(let o of e)for(let a of n)t.push({cmd:"column.add",args:{mark:o==="X1"||o==="X4"?"C2":"C1",story:r,at:{x:o,y:a}}});for(let r of["2F","3F","RF"]){for(let o of n)for(let a=0;a<3;a++)t.push({cmd:"beam.add",args:{mark:"G1",story:r,from:{x:e[a],y:o},to:{x:e[a+1],y:o}}});for(let o of e)for(let a=0;a<2;a++)t.push({cmd:"beam.add",args:{mark:"G2",story:r,from:{x:o,y:n[a]},to:{x:o,y:n[a+1]}}});for(let o=0;o<3;o++)for(let a=0;a<2;a++)t.push({cmd:"beam.add",args:{kind:"beam",mark:"B1",story:r,from:{x:6e3*o+3e3,y:n[a]},to:{x:6e3*o+3e3,y:n[a+1]},dz:r==="RF"?0:-150}})}let s=i.run("batch",{commands:t});if(!s.ok)throw new Error(s.error);return i.clearHistory(),i}li();li();var Ke=i=>i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),_e=i=>String(Math.round(i*1e3)/1e3);function Oc(i,t="StructBIM Web"){let e=Dn(i),n=[],s=(_,b,U)=>`${_e(_)},${_e(b)},${_e(U)}`,r=new Map,o=(_,b,U,P)=>{let N=s(_,b,U),C=r.get(N);return C===void 0&&(C=n.length+1,n.push({id:C,x:_,y:b,z:U,kind:P}),r.set(N,C)),C},a=new Map,c=[],l=[],u=new Set,p=1,d=(_,b,U)=>{let P=`${_.id}|${b}|${U}`;if(a.has(P))return a.get(P);let N=p++;a.set(P,N);let C=_.shape;if(C.type!=="RC_RECT"){let D=C.type==="S_H"?`H-${C.h}x${C.b}x${C.tw}x${C.tf}`:`BOX-${C.h}x${C.b}x${C.t}`;u.has(D)||(u.add(D),l.push(C.type==="S_H"?`<StbSecBuild-H name="${D}" A="${_e(C.h)}" B="${_e(C.b)}" t1="${_e(C.tw)}" t2="${_e(C.tf)}"/>`:`<StbSecBuild-BOX name="${D}" A="${_e(C.h)}" B="${_e(C.b)}" t1="${_e(C.t)}" t2="${_e(C.t)}"/>`));let R=`shape="${D}" strength_main="SN490B"`;return c.push(b==="column"?`<StbSecColumn_S id="${N}" name="${Ke(_.mark)}" floor="${Ke(U)}" kind_column="COLUMN"><StbSecSteelFigureColumn_S><StbSecSteelColumn_S_Same ${R}/></StbSecSteelFigureColumn_S></StbSecColumn_S>`:`<StbSecBeam_S id="${N}" name="${Ke(_.mark)}" floor="${Ke(U)}" kind_beam="${b==="girder"?"GIRDER":"BEAM"}" isCanti="false" isOutin="false"><StbSecSteelFigureBeam_S><StbSecSteelBeam_S_Straight ${R}/></StbSecSteelFigureBeam_S></StbSecBeam_S>`),N}return b==="column"?c.push(`<StbSecColumn_RC id="${N}" name="${Ke(_.mark)}" floor="${Ke(U)}" kind_column="COLUMN"><StbSecFigureColumn_RC><StbSecColumn_RC_Rect width_X="${_e(C.b)}" width_Y="${_e(C.d)}"/></StbSecFigureColumn_RC></StbSecColumn_RC>`):c.push(`<StbSecBeam_RC id="${N}" name="${Ke(_.mark)}" floor="${Ke(U)}" kind_beam="${b==="girder"?"GIRDER":"BEAM"}" isFoundation="false" isCanti="false" isOutin="false"><StbSecFigureBeam_RC><StbSecBeam_RC_Straight depth="${_e(C.d)}" width="${_e(C.b)}"/></StbSecFigureBeam_RC></StbSecBeam_RC>`),N},f=[],m=[],x=[],g=1,h=[];for(let _ of i.members){let b=un(i,_),U=Ji(i,_.mark,_.story);if(!U){h.push(`${_.mark}(${_.story})`);continue}let P=g++;if(_.kind==="column"){let N=e.find(z=>z.level===b.p1[2]),C=o(b.p0[0],b.p0[1],b.p0[2],"ON_COLUMN"),D=o(b.p1[0],b.p1[1],b.p1[2],"ON_COLUMN"),R=d(U,"column",_.story);f.push(`<StbColumn id="${P}" name="${Ke(_.mark)}" id_node_bottom="${C}" id_node_top="${D}" rotate="0" id_section="${R}" kind_structure="${U.shape.type==="RC_RECT"?"RC":"S"}" offset_bottom_X="0" offset_bottom_Y="0" offset_top_X="0" offset_top_Y="0" condition_bottom="FIX" condition_top="FIX"/>`)}else{let N=e.find(B=>B.name===_.story),C=o(b.p0[0],b.p0[1],N.level,"ON_BEAM"),D=o(b.p1[0],b.p1[1],N.level,"ON_BEAM"),R=d(U,_.kind,_.story),z=_e(_.dz??0),G=`id="${P}" name="${Ke(_.mark)}" id_node_start="${C}" id_node_end="${D}" rotate="0" id_section="${R}" kind_structure="${U.shape.type==="RC_RECT"?"RC":"S"}" isFoundation="false" offset_start_Z="${z}" offset_end_Z="${z}"`;(_.kind==="girder"?m:x).push(_.kind==="girder"?`<StbGirder ${G}/>`:`<StbBeam ${G}/>`)}}if(!i.members.length)throw new Error("\u90E8\u6750\u304C\u3042\u308A\u307E\u305B\u3093\u3002STB\u306B\u66F8\u304D\u51FA\u3059\u524D\u306B\u67F1\u30FB\u6881\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");if(h.length)throw new Error(`\u65AD\u9762\u304C\u672A\u5B9A\u7FA9\u306E\u90E8\u6750\u304C\u3042\u308A\u307E\u3059: ${[...new Set(h)].join(", ")}`);let y=_=>{let b=i.grids.filter(P=>P.axis===_).sort((P,N)=>P.pos-N.pos);if(!b.length)return"";let U=b.map((P,N)=>{let C=n.filter(D=>Math.abs((_==="X"?D.x:D.y)-P.pos)<.5).map(D=>`<StbNodeId id="${D.id}"/>`).join("");return`<StbParallelAxis id="${(_==="X"?1e3:2e3)+N+1}" name="${Ke(P.name)}" distance="${_e(P.pos)}">${C?`<StbNodeIdList>${C}</StbNodeIdList>`:""}</StbParallelAxis>`}).join("");return`<StbParallelAxes group_name="${_}" X="0" Y="0" angle="${_==="X"?270:0}">${U}</StbParallelAxes>`},E=e.map((_,b)=>{let U=n.filter(P=>Math.abs(P.z-_.level)<.5).map(P=>`<StbNodeId id="${P.id}"/>`).join("");return`<StbStory id="${b+1}" name="${Ke(_.name)}" height="${_e(_.level)}" kind="GENERAL">${U?`<StbNodeIdList>${U}</StbNodeIdList>`:""}</StbStory>`}).join(""),M=n.map(_=>`<StbNode id="${_.id}" X="${_e(_.x)}" Y="${_e(_.y)}" Z="${_e(_.z)}" kind="${_.kind}"/>`).join(`
`),T=[f.length?`<StbColumns>${f.join(`
`)}</StbColumns>`:"",m.length?`<StbGirders>${m.join(`
`)}</StbGirders>`:"",x.length?`<StbBeams>${x.join(`
`)}</StbBeams>`:""].join(`
`),w=y("X")+y("Y");return`<?xml version="1.0" encoding="utf-8"?>
<ST_BRIDGE xmlns="https://www.building-smart.or.jp/dl" version="2.0.1">
<StbCommon project_name="${Ke(i.name)}" app_name="${Ke(t)}"/>
<StbModel>
${n.length?`<StbNodes>
${M}
</StbNodes>`:""}
${w?`<StbAxes>${w}</StbAxes>`:""}
${e.length?`<StbStories>${E}</StbStories>`:""}
${i.members.length?`<StbMembers>
${T}
</StbMembers>`:""}
${c.length?`<StbSections>
${ix(c).join(`
`)}${l.length?`
<StbSecSteel>${[...l].sort((_,b)=>Number(_.startsWith("<StbSecBuild-BOX"))-Number(b.startsWith("<StbSecBuild-BOX"))).join("")}</StbSecSteel>`:""}
</StbSections>`:""}
</StbModel>
</ST_BRIDGE>
`}var nx=["StbSecColumn_RC","StbSecColumn_S","StbSecBeam_RC","StbSecBeam_S"];function ix(i){let t=e=>nx.indexOf(e.slice(1,e.search(/[\s>]/)));return[...i].sort((e,n)=>t(e)-t(n))}li();var pd=i=>(Math.round(i*1e4)/1e4).toString();function sx(i){let t="";for(let e of i){let n=e.codePointAt(0);t+=n<128?e:n>65535?"?":`\\U+${n.toString(16).toUpperCase().padStart(4,"0")}`}return t}var tl=class{ents=[];layers;linetypes;styles;ltscale;constructor(t,e,n,s=1){this.layers=t,this.linetypes=e,this.styles=n,this.ltscale=s}g(...t){let e=[];for(let n=0;n<t.length;n+=2)e.push(String(t[n]),typeof t[n+1]=="number"?pd(t[n+1]):String(t[n+1]));this.ents.push(e.join(`
`))}line(t,e,n){this.g(0,"LINE",8,t,10,e[0],20,e[1],30,0,11,n[0],21,n[1],31,0)}polyline(t,e,n=!1){this.g(0,"POLYLINE",8,t,66,1,70,n?1:0,10,0,20,0,30,0);for(let s of e)this.g(0,"VERTEX",8,t,10,s[0],20,s[1],30,0);this.g(0,"SEQEND",8,t)}rect(t,e,n,s,r){this.polyline(t,[[e,n],[s,n],[s,r],[e,r]],!0)}solidRect(t,e,n,s,r){this.g(0,"SOLID",8,t,10,e,20,n,30,0,11,s,21,n,31,0,12,e,22,r,32,0,13,s,23,r,33,0)}circle(t,e,n){this.g(0,"CIRCLE",8,t,10,e[0],20,e[1],30,0,40,n)}text(t,e,n,s,r,o={}){let a={left:0,center:1,right:2}[o.h??"left"],c={base:0,bottom:1,middle:2,top:3}[o.v??"base"],l=[0,"TEXT",8,t,10,s[0],20,s[1],30,0,40,n,1,sx(r),7,e];o.rot&&l.push(50,o.rot),o.width&&o.width!==1&&l.push(41,o.width),(a||c)&&l.push(72,a,11,s[0],21,s[1],31,0,73,c),this.g(...l)}toString(){let t=[],e=(...s)=>{for(let r of s)t.push(typeof r=="number"?pd(r):r)};e("0","SECTION","2","HEADER","9","$ACADVER","1","AC1009","9","$DWGCODEPAGE","3","ANSI_932","9","$LTSCALE","40",this.ltscale,"0","ENDSEC"),e("0","SECTION","2","TABLES"),e("0","TABLE","2","LTYPE","70",String(this.linetypes.length));for(let s of this.linetypes){let r=s.pattern.reduce((o,a)=>o+Math.abs(a),0);e("0","LTYPE","2",s.name,"70","0","3",s.description,"72","65","73",String(s.pattern.length),"40",r);for(let o of s.pattern)e("49",o)}e("0","ENDTAB");let n=[{name:"0",color:7,linetype:"CONTINUOUS"},...this.layers.filter(s=>s.name!=="0")];e("0","TABLE","2","LAYER","70",String(n.length));for(let s of n)e("0","LAYER","2",s.name,"70","0","62",String(s.color),"6",s.linetype);e("0","ENDTAB"),e("0","TABLE","2","STYLE","70",String(this.styles.length));for(let s of this.styles)e("0","STYLE","2",s.name,"70","0","40",s.height,"41",s.width,"50","0","71","0","42","2.5","3",s.font,"4","");return e("0","ENDTAB","0","ENDSEC"),e("0","SECTION","2","ENTITIES"),t.push(...this.ents),e("0","ENDSEC","0","EOF"),(t.join(`
`)+`
`).replace(/\n/g,`\r
`)}};var md=[{name:"CONTINUOUS",description:"Solid line",pattern:[]},{name:"JIS_08_15",description:"1SASEN15 ____ _ ____ _",pattern:[15,-.75,.75,-.75]},{name:"JIS_08_11",description:"1SASEN11 ___ _ ___ _",pattern:[11,-.6,.6,-.6]},{name:"VW-01____",description:"hidden",pattern:[.20828,-.20828]}],Uc={grid:{name:"0.05_base",color:5,linetype:"JIS_08_15"},hidden:{name:"0.05_D",color:1,linetype:"VW-01____"},thin:{name:"0.05",color:1,linetype:"CONTINUOUS"},outline:{name:"0.10",color:7,linetype:"CONTINUOUS"},medium:{name:"0.15",color:4,linetype:"CONTINUOUS"},thick:{name:"0.20",color:3,linetype:"CONTINUOUS"},heavy:{name:"0.30",color:2,linetype:"CONTINUOUS"},noplot:{name:"0.00",color:8,linetype:"CONTINUOUS"},text:{name:"001_Text",color:7,linetype:"CONTINUOUS"}},He={gridLine:"grid",gridBubble:"outline",column:"outline",beamRC:"hidden",beamS:"outline",text:"text",dim:"text",frame:"outline"};function Gr(i,t){return`${i}pt 1 ${t}`}function gd(i){let t=i/200;return{mark:{style:Gr(4.5,i),h:315*t},title:{style:Gr(4.5,i),h:315*t},note:{style:Gr(5,100),h:353*t},bubbleR:582*t}}var _d=i=>[{name:"STANDARD",height:0,width:1,font:"msgothic.ttc"},{name:Gr(4.5,i),height:0,width:1,font:"msgothic.ttc"},{name:Gr(5,100),height:0,width:1,font:"msgothic.ttc"}];var me=i=>Uc[i].name,rx=i=>Math.round(i).toLocaleString("en-US");function Fc(i,t,e={}){let n=e.scale??200,s=hn(i,t);if(!s)throw new Error(`\u968E ${t} \u304C\u3042\u308A\u307E\u305B\u3093`);let r=gd(n),o=new tl(Object.values(Uc),md,_d(n),n),a=i.grids.filter(C=>C.axis==="X").sort((C,D)=>C.pos-D.pos),c=i.grids.filter(C=>C.axis==="Y").sort((C,D)=>C.pos-D.pos);if(!a.length||!c.length)throw new Error("X\u30FBY\u4E21\u65B9\u5411\u306E\u901A\u308A\u82AF\u304C\u5FC5\u8981\u3067\u3059");let l=a[0].pos,u=a[a.length-1].pos,p=c[0].pos,d=c[c.length-1].pos,f=1500*n/200,m=r.bubbleR;for(let C of a){o.line(me(He.gridLine),[C.pos,p-f-4*m],[C.pos,d+f]);let D=[C.pos,p-f-5*m];o.circle(me(He.gridBubble),D,m),o.text(me("text"),r.mark.style,r.mark.h,D,C.name,{h:"center",v:"middle"})}for(let C of c){o.line(me(He.gridLine),[l-f-4*m,C.pos],[u+f,C.pos]);let D=[l-f-5*m,C.pos];o.circle(me(He.gridBubble),D,m),o.text(me("text"),r.mark.style,r.mark.h,D,C.name,{h:"center",v:"middle"})}let x=150*n/200,g=(C,D,R,z)=>{let G=[[R,D]];z&&D.length>2&&G.push([R-800*n/200,[D[0],D[D.length-1]]]);for(let[B,tt]of G){let W=tt[0],K=tt[tt.length-1];C==="X"?o.line(me(He.dim),[W,B],[K,B]):o.line(me(He.dim),[B,W],[B,K]),tt.forEach((j,pt)=>{if(C==="X"?o.line(me(He.dim),[j-x,B-x],[j+x,B+x]):o.line(me(He.dim),[B-x,j-x],[B+x,j+x]),pt===0)return;let Rt=(tt[pt-1]+j)/2,Y=rx(j-tt[pt-1]);C==="X"?o.text(me(He.text),r.mark.style,r.mark.h,[Rt,B+80],Y,{h:"center",v:"bottom"}):o.text(me(He.text),r.mark.style,r.mark.h,[B-80,Rt],Y,{h:"center",v:"bottom",rot:90})})}};g("X",a.map(C=>C.pos),p-f-1.5*m,!0),g("Y",c.map(C=>C.pos),l-f-1.5*m,!0);let h=[],y=new Set;for(let C of i.members.filter(D=>D.kind==="column")){let D=un(i,C);if(D.p1[2]!==s.level&&D.p0[2]!==s.level)continue;let R=`${D.p0[0]},${D.p0[1]}`;y.has(R)||(y.add(R),h.push(D))}let E=new Map;for(let C of h){let[D,R]=[C.p0[0],C.p0[1]];E.set(`${D},${R}`,C),o.solidRect(me(He.column),D-C.w/2,R-C.h/2,D+C.w/2,R+C.h/2),o.rect(me(He.column),D-C.w/2,R-C.h/2,D+C.w/2,R+C.h/2)}for(let C of h)o.text(me("text"),r.mark.style,r.mark.h,[C.p0[0]-C.w/2-100,C.p0[1]+C.h/2+100],C.member.mark,{h:"right",v:"bottom"});for(let C of i.members.filter(D=>D.kind!=="column"&&D.story===t)){let D=un(i,C),R=D.section&&D.section.shape.type!=="RC_RECT",z=me(R?He.beamS:He.beamRC),[G,B]=[D.p0[0],D.p0[1]],[tt,W]=[D.p1[0],D.p1[1]],K=Math.hypot(tt-G,W-B),j=(tt-G)/K,pt=(W-B)/K,Rt=E.get(`${G},${B}`),Y=E.get(`${tt},${W}`),ft=Ft=>Ft?Math.abs(j)>Math.abs(pt)?Ft.w/2:Ft.h/2:0,xt=ft(Rt),Et=ft(Y);G+=j*xt,B+=pt*xt,tt-=j*Et,W-=pt*Et;let ut=-pt*D.w/2,Dt=j*D.w/2;o.line(z,[G+ut,B+Dt],[tt+ut,W+Dt]),o.line(z,[G-ut,B-Dt],[tt-ut,W-Dt]);let de=C.dz?`${C.mark}(${C.dz>0?"+":""}${C.dz})`:C.mark,At=(G+tt)/2,Jt=(B+W)/2;Math.abs(j)>=Math.abs(pt)?o.text(me("text"),r.mark.style,r.mark.h,[At,Jt+D.w/2+80],de,{h:"center",v:"bottom"}):o.text(me("text"),r.mark.style,r.mark.h,[At-D.w/2-80,Jt],de,{h:"center",v:"bottom",rot:90})}let M=p-f-5*m-2500*n/200,T=e.title??`${t}\u4F0F\u56F3 S=1/${n}`;o.text(me("text"),r.title.style,r.title.h,[(l+u)/2,M],T,{h:"center",v:"middle"});let w=(T.length+2)*r.title.h;o.rect(me("outline"),(l+u)/2-w/2,M-r.title.h,(l+u)/2+w/2,M+r.title.h),["<\u7279\u8A18\u4E8B\u9805>","\u30FB\u6881\u7B26\u53F7\u4E2D\uFF08 \uFF09\u5185\u306E\u5024\u306FFL\u304B\u3089\u306E\u5929\u7AEF\u30EC\u30D9\u30EB\u3092\u793A\u3059","\u30FB\u7279\u8A18\u306A\u304D\u6881\u5929\u7AEF\u30EC\u30D9\u30EB\u306FFL\u3068\u3059\u308B"].forEach((C,D)=>o.text(me("text"),r.note.style,r.note.h,[u+f+1500,d-D*r.note.h*1.8],C));let b=420*n,U=297*n,P=(l+u)/2+3e3*n/200,N=(p+d)/2-1500*n/200;return o.rect(me(He.frame),P-b/2+20*n,N-U/2+10*n,P+b/2-10*n,N+U/2-10*n),o.text(me("text"),r.title.style,r.title.h,[P+b/2-15*n,N-U/2+15*n],`${i.name}  ${t}\u4F0F\u56F3  S=1/${n} (A3)`,{h:"right"}),o.toString()}var xd=`9
$ACADVER
1
AC1015
9
$ACADMAINTVER
70
6
9
$DWGCODEPAGE
3
ANSI_1252
9
$INSBASE
10
0.0
20
0.0
30
0.0
9
$EXTMIN
10
1e+20
20
1e+20
30
1e+20
9
$EXTMAX
10
-1e+20
20
-1e+20
30
-1e+20
9
$LIMMIN
10
0.0
20
0.0
9
$LIMMAX
10
420.0
20
297.0
9
$ORTHOMODE
70
0
9
$REGENMODE
70
1
9
$FILLMODE
70
1
9
$QTEXTMODE
70
0
9
$MIRRTEXT
70
1
9
$LTSCALE
40
1.0
9
$ATTMODE
70
1
9
$TEXTSIZE
40
2.5
9
$TRACEWID
40
1.0
9
$TEXTSTYLE
7
Standard
9
$CLAYER
8
0
9
$CELTYPE
6
ByLayer
9
$CECOLOR
62
256
9
$CELTSCALE
40
1.0
9
$DISPSILH
70
0
9
$DIMSCALE
40
1.0
9
$DIMASZ
40
2.5
9
$DIMEXO
40
0.625
9
$DIMDLI
40
3.75
9
$DIMRND
40
0.0
9
$DIMDLE
40
0.0
9
$DIMEXE
40
1.25
9
$DIMTP
40
0.0
9
$DIMTM
40
0.0
9
$DIMTXT
40
2.5
9
$DIMCEN
40
2.5
9
$DIMTSZ
40
0.0
9
$DIMTOL
70
0
9
$DIMLIM
70
0
9
$DIMTIH
70
0
9
$DIMTOH
70
0
9
$DIMSE1
70
0
9
$DIMSE2
70
0
9
$DIMTAD
70
1
9
$DIMZIN
70
8
9
$DIMBLK
1

9
$DIMASO
70
1
9
$DIMSHO
70
1
9
$DIMPOST
1

9
$DIMAPOST
1

9
$DIMALT
70
0
9
$DIMALTD
70
3
9
$DIMALTF
40
0.03937007874
9
$DIMLFAC
40
1.0
9
$DIMTOFL
70
1
9
$DIMTVP
40
0.0
9
$DIMTIX
70
0
9
$DIMSOXD
70
0
9
$DIMSAH
70
0
9
$DIMBLK1
1

9
$DIMBLK2
1

9
$DIMSTYLE
2
ISO-25
9
$DIMCLRD
70
0
9
$DIMCLRE
70
0
9
$DIMCLRT
70
0
9
$DIMTFAC
40
1.0
9
$DIMGAP
40
0.625
9
$DIMJUST
70
0
9
$DIMSD1
70
0
9
$DIMSD2
70
0
9
$DIMTOLJ
70
0
9
$DIMTZIN
70
8
9
$DIMALTZ
70
0
9
$DIMALTTZ
70
0
9
$DIMUPT
70
0
9
$DIMDEC
70
2
9
$DIMTDEC
70
2
9
$DIMALTU
70
2
9
$DIMALTTD
70
3
9
$DIMTXSTY
7
Standard
9
$DIMAUNIT
70
0
9
$DIMADEC
70
0
9
$DIMALTRND
40
0.0
9
$DIMAZIN
70
0
9
$DIMDSEP
70
44
9
$DIMATFIT
70
3
9
$DIMFRAC
70
0
9
$DIMLDRBLK
1

9
$DIMLUNIT
70
2
9
$DIMLWD
70
-2
9
$DIMLWE
70
-2
9
$DIMTMOVE
70
0
9
$LUNITS
70
2
9
$LUPREC
70
4
9
$SKETCHINC
40
1.0
9
$FILLETRAD
40
10.0
9
$AUNITS
70
0
9
$AUPREC
70
2
9
$MENU
1
.
9
$ELEVATION
40
0.0
9
$PELEVATION
40
0.0
9
$THICKNESS
40
0.0
9
$LIMCHECK
70
0
9
$CHAMFERA
40
0.0
9
$CHAMFERB
40
0.0
9
$CHAMFERC
40
0.0
9
$CHAMFERD
40
0.0
9
$SKPOLY
70
0
9
$TDCREATE
40
2461363.715451389
9
$TDUCREATE
40
2458532.153996898
9
$TDUPDATE
40
2461363.715451389
9
$TDUUPDATE
40
2458532.1544311
9
$TDINDWG
40
0.0
9
$TDUSRTIMER
40
0.0
9
$USRTIMER
70
1
9
$ANGBASE
50
0.0
9
$ANGDIR
70
0
9
$PDMODE
70
0
9
$PDSIZE
40
0.0
9
$PLINEWID
40
0.0
9
$SPLFRAME
70
0
9
$SPLINETYPE
70
6
9
$SPLINESEGS
70
8
9
$HANDSEED
5
33
9
$SURFTAB1
70
6
9
$SURFTAB2
70
6
9
$SURFTYPE
70
6
9
$SURFU
70
6
9
$SURFV
70
6
9
$UCSBASE
2

9
$UCSNAME
2

9
$UCSORG
10
0.0
20
0.0
30
0.0
9
$UCSXDIR
10
1.0
20
0.0
30
0.0
9
$UCSYDIR
10
0.0
20
1.0
30
0.0
9
$UCSORTHOREF
2

9
$UCSORTHOVIEW
70
0
9
$UCSORGTOP
10
0.0
20
0.0
30
0.0
9
$UCSORGBOTTOM
10
0.0
20
0.0
30
0.0
9
$UCSORGLEFT
10
0.0
20
0.0
30
0.0
9
$UCSORGRIGHT
10
0.0
20
0.0
30
0.0
9
$UCSORGFRONT
10
0.0
20
0.0
30
0.0
9
$UCSORGBACK
10
0.0
20
0.0
30
0.0
9
$PUCSBASE
2

9
$PUCSNAME
2

9
$PUCSORG
10
0.0
20
0.0
30
0.0
9
$PUCSXDIR
10
1.0
20
0.0
30
0.0
9
$PUCSYDIR
10
0.0
20
1.0
30
0.0
9
$PUCSORTHOREF
2

9
$PUCSORTHOVIEW
70
0
9
$PUCSORGTOP
10
0.0
20
0.0
30
0.0
9
$PUCSORGBOTTOM
10
0.0
20
0.0
30
0.0
9
$PUCSORGLEFT
10
0.0
20
0.0
30
0.0
9
$PUCSORGRIGHT
10
0.0
20
0.0
30
0.0
9
$PUCSORGFRONT
10
0.0
20
0.0
30
0.0
9
$PUCSORGBACK
10
0.0
20
0.0
30
0.0
9
$USERI1
70
0
9
$USERI2
70
0
9
$USERI3
70
0
9
$USERI4
70
0
9
$USERI5
70
0
9
$USERR1
40
0.0
9
$USERR2
40
0.0
9
$USERR3
40
0.0
9
$USERR4
40
0.0
9
$USERR5
40
0.0
9
$WORLDVIEW
70
1
9
$SHADEDGE
70
3
9
$SHADEDIF
70
70
9
$TILEMODE
70
1
9
$MAXACTVP
70
64
9
$PINSBASE
10
0.0
20
0.0
30
0.0
9
$PLIMCHECK
70
0
9
$PEXTMIN
10
1e+20
20
1e+20
30
1e+20
9
$PEXTMAX
10
-1e+20
20
-1e+20
30
-1e+20
9
$PLIMMIN
10
0.0
20
0.0
9
$PLIMMAX
10
420.0
20
297.0
9
$UNITMODE
70
0
9
$VISRETAIN
70
1
9
$PLINEGEN
70
0
9
$PSLTSCALE
70
1
9
$TREEDEPTH
70
3020
9
$CMLSTYLE
2
Standard
9
$CMLJUST
70
0
9
$CMLSCALE
40
20.0
9
$PROXYGRAPHICS
70
1
9
$MEASUREMENT
70
1
9
$CELWEIGHT
370
-1
9
$ENDCAPS
280
0
9
$JOINSTYLE
280
0
9
$LWDISPLAY
290
0
9
$INSUNITS
70
6
9
$HYPERLINKBASE
1

9
$STYLESHEET
1

9
$XEDIT
290
1
9
$CEPSNTYPE
380
0
9
$PSTYLEMODE
290
1
9
$FINGERPRINTGUID
2
{E004B78D-17BF-48C8-807F-4B93CE953F44}
9
$VERSIONGUID
2
{0A02E043-772B-49E3-ACAE-085392C6C6ED}
9
$EXTNAMES
290
1
9
$PSVPSCALE
40
0.0
9
$OLESTARTUP
290
0`,yd=`0
CLASS
1
ACDBDICTIONARYWDFLT
2
AcDbDictionaryWithDefault
3
ObjectDBX Classes
90
0
280
0
281
0
0
CLASS
1
SUN
2
AcDbSun
3
SCENEOE
90
1153
280
0
281
0
0
CLASS
1
VISUALSTYLE
2
AcDbVisualStyle
3
ObjectDBX Classes
90
4095
280
0
281
0
0
CLASS
1
MATERIAL
2
AcDbMaterial
3
ObjectDBX Classes
90
1153
280
0
281
0
0
CLASS
1
SCALE
2
AcDbScale
3
ObjectDBX Classes
90
1153
280
0
281
0
0
CLASS
1
TABLESTYLE
2
AcDbTableStyle
3
ObjectDBX Classes
90
4095
280
0
281
0
0
CLASS
1
MLEADERSTYLE
2
AcDbMLeaderStyle
3
ACDB_MLEADERSTYLE_CLASS
90
4095
280
0
281
0
0
CLASS
1
DICTIONARYVAR
2
AcDbDictionaryVar
3
ObjectDBX Classes
90
0
280
0
281
0
0
CLASS
1
CELLSTYLEMAP
2
AcDbCellStyleMap
3
ObjectDBX Classes
90
1152
280
0
281
0
0
CLASS
1
MENTALRAYRENDERSETTINGS
2
AcDbMentalRayRenderSettings
3
SCENEOE
90
1024
280
0
281
0
0
CLASS
1
ACDBDETAILVIEWSTYLE
2
AcDbDetailViewStyle
3
ObjectDBX Classes
90
1025
280
0
281
0
0
CLASS
1
ACDBSECTIONVIEWSTYLE
2
AcDbSectionViewStyle
3
ObjectDBX Classes
90
1025
280
0
281
0
0
CLASS
1
RASTERVARIABLES
2
AcDbRasterVariables
3
ISM
90
0
280
0
281
0
0
CLASS
1
ACDBPLACEHOLDER
2
AcDbPlaceHolder
3
ObjectDBX Classes
90
0
280
0
281
0
0
CLASS
1
LAYOUT
2
AcDbLayout
3
ObjectDBX Classes
90
0
280
0
281
0`,Sd=`0
DICTIONARY
5
A
330
0
100
AcDbDictionary
281
1
3
ACAD_COLOR
350
B
3
ACAD_GROUP
350
C
3
ACAD_LAYOUT
350
D
3
ACAD_MATERIAL
350
E
3
ACAD_MLEADERSTYLE
350
F
3
ACAD_MLINESTYLE
350
10
3
ACAD_PLOTSETTINGS
350
11
3
ACAD_PLOTSTYLENAME
350
12
3
ACAD_SCALELIST
350
14
3
ACAD_TABLESTYLE
350
15
3
ACAD_VISUALSTYLE
350
16
3
EZDXF_META
350
2D
0
DICTIONARY
5
B
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
C
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
D
330
A
100
AcDbDictionary
281
1
3
Model
350
1A
3
Layout1
350
1E
0
DICTIONARY
5
E
330
A
100
AcDbDictionary
281
1
3
ByBlock
350
1F
3
ByLayer
350
20
3
Global
350
21
0
DICTIONARY
5
F
330
A
100
AcDbDictionary
281
1
3
Standard
350
2C
0
DICTIONARY
5
10
330
A
100
AcDbDictionary
281
1
3
Standard
350
22
0
DICTIONARY
5
11
330
A
100
AcDbDictionary
281
1
0
ACDBDICTIONARYWDFLT
5
12
330
A
100
AcDbDictionary
281
1
3
Normal
350
13
100
AcDbDictionaryWithDefault
340
13
0
ACDBPLACEHOLDER
5
13
330
12
0
DICTIONARY
5
14
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
15
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
16
330
A
100
AcDbDictionary
281
1
0
LAYOUT
5
1A
330
D
100
AcDbPlotSettings
1

4
A3
6

40
7.5
41
20.0
42
7.5
43
20.0
44
420.0
45
297.0
46
0.0
47
0.0
48
0.0
49
0.0
140
0.0
141
0.0
142
1.0
143
1.0
70
1024
72
1
73
0
74
5
7

75
16
76
0
77
2
78
300
147
1.0
148
0.0
149
0.0
100
AcDbLayout
1
Model
70
1
71
0
10
0.0
20
0.0
11
420.0
21
297.0
12
0.0
22
0.0
32
0.0
14
1e+20
24
1e+20
34
1e+20
15
-1e+20
25
-1e+20
35
-1e+20
146
0.0
13
0.0
23
0.0
33
0.0
16
1.0
26
0.0
36
0.0
17
0.0
27
1.0
37
0.0
76
1
330
17
0
LAYOUT
5
1E
330
D
100
AcDbPlotSettings
1

4
A3
6

40
7.5
41
20.0
42
7.5
43
20.0
44
420.0
45
297.0
46
0.0
47
0.0
48
0.0
49
0.0
140
0.0
141
0.0
142
1.0
143
1.0
70
0
72
1
73
0
74
5
7

75
16
76
0
77
2
78
300
147
1.0
148
0.0
149
0.0
100
AcDbLayout
1
Layout1
70
1
71
1
10
0.0
20
0.0
11
420.0
21
297.0
12
0.0
22
0.0
32
0.0
14
1e+20
24
1e+20
34
1e+20
15
-1e+20
25
-1e+20
35
-1e+20
146
0.0
13
0.0
23
0.0
33
0.0
16
1.0
26
0.0
36
0.0
17
0.0
27
1.0
37
0.0
76
1
330
1B
0
MATERIAL
5
1F
102
{ACAD_REACTORS
330
E
102
}
330
E
100
AcDbMaterial
1
ByBlock
2

70
0
40
1.0
71
1
41
1.0
91
-1023410177
42
1.0
72
1
3

73
1
74
1
75
1
44
0.5
73
0
45
1.0
46
1.0
77
1
4

78
1
79
1
170
1
48
1.0
171
1
6

172
1
173
1
174
1
140
1.0
141
1.0
175
1
7

176
1
177
1
178
1
143
1.0
179
1
8

270
1
271
1
272
1
145
1.0
146
1.0
273
1
9

274
1
275
1
276
1
42
1.0
72
1
3

73
1
74
1
75
1
94
63
0
MATERIAL
5
20
102
{ACAD_REACTORS
330
E
102
}
330
E
100
AcDbMaterial
1
ByLayer
2

70
0
40
1.0
71
1
41
1.0
91
-1023410177
42
1.0
72
1
3

73
1
74
1
75
1
44
0.5
73
0
45
1.0
46
1.0
77
1
4

78
1
79
1
170
1
48
1.0
171
1
6

172
1
173
1
174
1
140
1.0
141
1.0
175
1
7

176
1
177
1
178
1
143
1.0
179
1
8

270
1
271
1
272
1
145
1.0
146
1.0
273
1
9

274
1
275
1
276
1
42
1.0
72
1
3

73
1
74
1
75
1
94
63
0
MATERIAL
5
21
102
{ACAD_REACTORS
330
E
102
}
330
E
100
AcDbMaterial
1
Global
2

70
0
40
1.0
71
1
41
1.0
91
-1023410177
42
1.0
72
1
3

73
1
74
1
75
1
44
0.5
73
0
45
1.0
46
1.0
77
1
4

78
1
79
1
170
1
48
1.0
171
1
6

172
1
173
1
174
1
140
1.0
141
1.0
175
1
7

176
1
177
1
178
1
143
1.0
179
1
8

270
1
271
1
272
1
145
1.0
146
1.0
273
1
9

274
1
275
1
276
1
42
1.0
72
1
3

73
1
74
1
75
1
94
63
0
MLINESTYLE
5
22
102
{ACAD_REACTORS
330
10
102
}
330
10
100
AcDbMlineStyle
2
Standard
70
0
3

62
256
51
90.0
52
90.0
71
2
49
0.5
62
256
6
BYLAYER
49
-0.5
62
256
6
BYLAYER
0
MLEADERSTYLE
5
2C
102
{ACAD_REACTORS
330
F
102
}
330
F
100
AcDbMLeaderStyle
179
2
170
2
171
1
172
0
90
2
40
0.0
41
0.0
173
1
91
-1056964608
92
-2
290
1
42
2.0
291
1
43
8.0
3
Standard
44
4.0
300

342
29
174
1
175
1
176
0
178
1
93
-1056964608
45
4.0
292
0
297
0
46
4.0
94
-1056964608
47
1.0
49
1.0
140
1.0
294
1
141
0.0
177
0
142
1.0
295
0
296
0
143
3.75
271
0
272
9
273
9
0
DICTIONARY
5
2D
330
A
100
AcDbDictionary
280
1
281
1
3
CREATED_BY_EZDXF
350
2E
3
WRITTEN_BY_EZDXF
350
32
0
DICTIONARYVAR
5
2E
330
2D
100
DictionaryVariables
280
0
1
1.4.5 @ 2026-11-18T08:10:15.506456+00:00
0
DICTIONARYVAR
5
32
330
2D
100
DictionaryVariables
280
0
1
1.4.5 @ 2026-11-18T08:10:15.507793+00:00`,vd=`9
$ACADVER
1
AC1024
9
$ACADMAINTVER
70
6
9
$DWGCODEPAGE
3
ANSI_1252
9
$LASTSAVEDBY
1
ezdxf
9
$INSBASE
10
0.0
20
0.0
30
0.0
9
$EXTMIN
10
1e+20
20
1e+20
30
1e+20
9
$EXTMAX
10
-1e+20
20
-1e+20
30
-1e+20
9
$LIMMIN
10
0.0
20
0.0
9
$LIMMAX
10
420.0
20
297.0
9
$ORTHOMODE
70
0
9
$REGENMODE
70
1
9
$FILLMODE
70
1
9
$QTEXTMODE
70
0
9
$MIRRTEXT
70
1
9
$LTSCALE
40
1.0
9
$ATTMODE
70
1
9
$TEXTSIZE
40
2.5
9
$TRACEWID
40
1.0
9
$TEXTSTYLE
7
Standard
9
$CLAYER
8
0
9
$CELTYPE
6
ByLayer
9
$CECOLOR
62
256
9
$CELTSCALE
40
1.0
9
$DISPSILH
70
0
9
$DIMSCALE
40
1.0
9
$DIMASZ
40
2.5
9
$DIMEXO
40
0.625
9
$DIMDLI
40
3.75
9
$DIMRND
40
0.0
9
$DIMDLE
40
0.0
9
$DIMEXE
40
1.25
9
$DIMTP
40
0.0
9
$DIMTM
40
0.0
9
$DIMTXT
40
2.5
9
$DIMCEN
40
2.5
9
$DIMTSZ
40
0.0
9
$DIMTOL
70
0
9
$DIMLIM
70
0
9
$DIMTIH
70
0
9
$DIMTOH
70
0
9
$DIMSE1
70
0
9
$DIMSE2
70
0
9
$DIMTAD
70
1
9
$DIMZIN
70
8
9
$DIMBLK
1

9
$DIMASO
70
1
9
$DIMSHO
70
1
9
$DIMPOST
1

9
$DIMAPOST
1

9
$DIMALT
70
0
9
$DIMALTD
70
3
9
$DIMALTF
40
0.03937007874
9
$DIMLFAC
40
1.0
9
$DIMTOFL
70
1
9
$DIMTVP
40
0.0
9
$DIMTIX
70
0
9
$DIMSOXD
70
0
9
$DIMSAH
70
0
9
$DIMBLK1
1

9
$DIMBLK2
1

9
$DIMSTYLE
2
ISO-25
9
$DIMCLRD
70
0
9
$DIMCLRE
70
0
9
$DIMCLRT
70
0
9
$DIMTFAC
40
1.0
9
$DIMGAP
40
0.625
9
$DIMJUST
70
0
9
$DIMSD1
70
0
9
$DIMSD2
70
0
9
$DIMTOLJ
70
0
9
$DIMTZIN
70
8
9
$DIMALTZ
70
0
9
$DIMALTTZ
70
0
9
$DIMUPT
70
0
9
$DIMDEC
70
2
9
$DIMTDEC
70
2
9
$DIMALTU
70
2
9
$DIMALTTD
70
3
9
$DIMTXSTY
7
Standard
9
$DIMAUNIT
70
0
9
$DIMADEC
70
0
9
$DIMALTRND
40
0.0
9
$DIMAZIN
70
0
9
$DIMDSEP
70
44
9
$DIMATFIT
70
3
9
$DIMFRAC
70
0
9
$DIMLDRBLK
1

9
$DIMLUNIT
70
2
9
$DIMLWD
70
-2
9
$DIMLWE
70
-2
9
$DIMTMOVE
70
0
9
$DIMFXL
40
1.0
9
$DIMFXLON
70
0
9
$DIMJOGANG
40
0.785398163397
9
$DIMTFILL
70
0
9
$DIMTFILLCLR
70
0
9
$DIMARCSYM
70
0
9
$DIMLTYPE
6

9
$DIMLTEX1
6

9
$DIMLTEX2
6

9
$DIMTXTDIRECTION
70
0
9
$LUNITS
70
2
9
$LUPREC
70
4
9
$SKETCHINC
40
1.0
9
$FILLETRAD
40
10.0
9
$AUNITS
70
0
9
$AUPREC
70
2
9
$MENU
1
.
9
$ELEVATION
40
0.0
9
$PELEVATION
40
0.0
9
$THICKNESS
40
0.0
9
$LIMCHECK
70
0
9
$CHAMFERA
40
0.0
9
$CHAMFERB
40
0.0
9
$CHAMFERC
40
0.0
9
$CHAMFERD
40
0.0
9
$SKPOLY
70
0
9
$TDCREATE
40
2461363.724236111
9
$TDUCREATE
40
2458532.153996898
9
$TDUPDATE
40
2461363.724236111
9
$TDUUPDATE
40
2458532.1544311
9
$TDINDWG
40
0.0
9
$TDUSRTIMER
40
0.0
9
$USRTIMER
70
1
9
$ANGBASE
50
0.0
9
$ANGDIR
70
0
9
$PDMODE
70
0
9
$PDSIZE
40
0.0
9
$PLINEWID
40
0.0
9
$SPLFRAME
70
0
9
$SPLINETYPE
70
6
9
$SPLINESEGS
70
8
9
$HANDSEED
5
33
9
$SURFTAB1
70
6
9
$SURFTAB2
70
6
9
$SURFTYPE
70
6
9
$SURFU
70
6
9
$SURFV
70
6
9
$UCSBASE
2

9
$UCSNAME
2

9
$UCSORG
10
0.0
20
0.0
30
0.0
9
$UCSXDIR
10
1.0
20
0.0
30
0.0
9
$UCSYDIR
10
0.0
20
1.0
30
0.0
9
$UCSORTHOREF
2

9
$UCSORTHOVIEW
70
0
9
$UCSORGTOP
10
0.0
20
0.0
30
0.0
9
$UCSORGBOTTOM
10
0.0
20
0.0
30
0.0
9
$UCSORGLEFT
10
0.0
20
0.0
30
0.0
9
$UCSORGRIGHT
10
0.0
20
0.0
30
0.0
9
$UCSORGFRONT
10
0.0
20
0.0
30
0.0
9
$UCSORGBACK
10
0.0
20
0.0
30
0.0
9
$PUCSBASE
2

9
$PUCSNAME
2

9
$PUCSORG
10
0.0
20
0.0
30
0.0
9
$PUCSXDIR
10
1.0
20
0.0
30
0.0
9
$PUCSYDIR
10
0.0
20
1.0
30
0.0
9
$PUCSORTHOREF
2

9
$PUCSORTHOVIEW
70
0
9
$PUCSORGTOP
10
0.0
20
0.0
30
0.0
9
$PUCSORGBOTTOM
10
0.0
20
0.0
30
0.0
9
$PUCSORGLEFT
10
0.0
20
0.0
30
0.0
9
$PUCSORGRIGHT
10
0.0
20
0.0
30
0.0
9
$PUCSORGFRONT
10
0.0
20
0.0
30
0.0
9
$PUCSORGBACK
10
0.0
20
0.0
30
0.0
9
$USERI1
70
0
9
$USERI2
70
0
9
$USERI3
70
0
9
$USERI4
70
0
9
$USERI5
70
0
9
$USERR1
40
0.0
9
$USERR2
40
0.0
9
$USERR3
40
0.0
9
$USERR4
40
0.0
9
$USERR5
40
0.0
9
$WORLDVIEW
70
1
9
$SHADEDGE
70
3
9
$SHADEDIF
70
70
9
$TILEMODE
70
1
9
$MAXACTVP
70
64
9
$PINSBASE
10
0.0
20
0.0
30
0.0
9
$PLIMCHECK
70
0
9
$PEXTMIN
10
1e+20
20
1e+20
30
1e+20
9
$PEXTMAX
10
-1e+20
20
-1e+20
30
-1e+20
9
$PLIMMIN
10
0.0
20
0.0
9
$PLIMMAX
10
420.0
20
297.0
9
$UNITMODE
70
0
9
$VISRETAIN
70
1
9
$PLINEGEN
70
0
9
$PSLTSCALE
70
1
9
$TREEDEPTH
70
3020
9
$CMLSTYLE
2
Standard
9
$CMLJUST
70
0
9
$CMLSCALE
40
20.0
9
$PROXYGRAPHICS
70
1
9
$MEASUREMENT
70
1
9
$CELWEIGHT
370
-1
9
$ENDCAPS
280
0
9
$JOINSTYLE
280
0
9
$LWDISPLAY
290
0
9
$INSUNITS
70
6
9
$HYPERLINKBASE
1

9
$STYLESHEET
1

9
$XEDIT
290
1
9
$CEPSNTYPE
380
0
9
$PSTYLEMODE
290
1
9
$FINGERPRINTGUID
2
{B0AD1293-4D1D-408B-AFC9-B5EE2AE8E69B}
9
$VERSIONGUID
2
{358959B6-95A9-4584-8C1C-88AB9AF854B0}
9
$EXTNAMES
290
1
9
$PSVPSCALE
40
0.0
9
$OLESTARTUP
290
0
9
$SORTENTS
280
127
9
$INDEXCTL
280
0
9
$HIDETEXT
280
1
9
$XCLIPFRAME
280
1
9
$HALOGAP
280
0
9
$OBSCOLOR
70
257
9
$OBSLTYPE
280
0
9
$INTERSECTIONDISPLAY
280
0
9
$INTERSECTIONCOLOR
70
257
9
$DIMASSOC
280
2
9
$PROJECTNAME
1

9
$CAMERADISPLAY
290
0
9
$LENSLENGTH
40
50.0
9
$CAMERAHEIGHT
40
0.0
9
$STEPSPERSEC
40
24.0
9
$STEPSIZE
40
100.0
9
$3DDWFPREC
40
2.0
9
$PSOLWIDTH
40
0.005
9
$PSOLHEIGHT
40
0.08
9
$LOFTANG1
40
1.570796326795
9
$LOFTANG2
40
1.570796326795
9
$LOFTMAG1
40
0.0
9
$LOFTMAG2
40
0.0
9
$LOFTPARAM
70
7
9
$LOFTNORMALS
280
1
9
$LATITUDE
40
37.795
9
$LONGITUDE
40
-122.394
9
$NORTHDIRECTION
40
0.0
9
$TIMEZONE
70
-8000
9
$LIGHTGLYPHDISPLAY
280
1
9
$TILEMODELIGHTSYNCH
280
1
9
$CMATERIAL
347
20
9
$SOLIDHIST
280
0
9
$SHOWHIST
280
1
9
$DWFFRAME
280
2
9
$DGNFRAME
280
2
9
$REALWORLDSCALE
290
1
9
$INTERFERECOLOR
62
256
9
$CSHADOW
280
0
9
$SHADOWPLANELOCATION
40
0.0`,Md=`0
CLASS
1
ACDBDICTIONARYWDFLT
2
AcDbDictionaryWithDefault
3
ObjectDBX Classes
90
0
91
0
280
0
281
0
0
CLASS
1
SUN
2
AcDbSun
3
SCENEOE
90
1153
91
0
280
0
281
0
0
CLASS
1
VISUALSTYLE
2
AcDbVisualStyle
3
ObjectDBX Classes
90
4095
91
0
280
0
281
0
0
CLASS
1
MATERIAL
2
AcDbMaterial
3
ObjectDBX Classes
90
1153
91
0
280
0
281
0
0
CLASS
1
SCALE
2
AcDbScale
3
ObjectDBX Classes
90
1153
91
0
280
0
281
0
0
CLASS
1
TABLESTYLE
2
AcDbTableStyle
3
ObjectDBX Classes
90
4095
91
0
280
0
281
0
0
CLASS
1
MLEADERSTYLE
2
AcDbMLeaderStyle
3
ACDB_MLEADERSTYLE_CLASS
90
4095
91
0
280
0
281
0
0
CLASS
1
DICTIONARYVAR
2
AcDbDictionaryVar
3
ObjectDBX Classes
90
0
91
0
280
0
281
0
0
CLASS
1
CELLSTYLEMAP
2
AcDbCellStyleMap
3
ObjectDBX Classes
90
1152
91
0
280
0
281
0
0
CLASS
1
MENTALRAYRENDERSETTINGS
2
AcDbMentalRayRenderSettings
3
SCENEOE
90
1024
91
0
280
0
281
0
0
CLASS
1
ACDBDETAILVIEWSTYLE
2
AcDbDetailViewStyle
3
ObjectDBX Classes
90
1025
91
0
280
0
281
0
0
CLASS
1
ACDBSECTIONVIEWSTYLE
2
AcDbSectionViewStyle
3
ObjectDBX Classes
90
1025
91
0
280
0
281
0
0
CLASS
1
RASTERVARIABLES
2
AcDbRasterVariables
3
ISM
90
0
91
0
280
0
281
0
0
CLASS
1
LAYOUT
2
AcDbLayout
3
ObjectDBX Classes
90
0
91
0
280
0
281
0
0
CLASS
1
ACDBPLACEHOLDER
2
AcDbPlaceHolder
3
ObjectDBX Classes
90
0
91
0
280
0
281
0`,bd=`0
DICTIONARY
5
A
330
0
100
AcDbDictionary
281
1
3
ACAD_COLOR
350
B
3
ACAD_GROUP
350
C
3
ACAD_LAYOUT
350
D
3
ACAD_MATERIAL
350
E
3
ACAD_MLEADERSTYLE
350
F
3
ACAD_MLINESTYLE
350
10
3
ACAD_PLOTSETTINGS
350
11
3
ACAD_PLOTSTYLENAME
350
12
3
ACAD_SCALELIST
350
14
3
ACAD_TABLESTYLE
350
15
3
ACAD_VISUALSTYLE
350
16
0
DICTIONARY
5
B
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
C
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
D
330
A
100
AcDbDictionary
281
1
3
Model
350
1A
3
Layout1
350
1E
0
DICTIONARY
5
E
330
A
100
AcDbDictionary
281
1
3
ByBlock
350
1F
3
ByLayer
350
20
3
Global
350
21
0
DICTIONARY
5
F
330
A
100
AcDbDictionary
281
1
3
Standard
350
2C
0
DICTIONARY
5
10
330
A
100
AcDbDictionary
281
1
3
Standard
350
22
0
DICTIONARY
5
11
330
A
100
AcDbDictionary
281
1
0
ACDBDICTIONARYWDFLT
5
12
330
A
100
AcDbDictionary
281
1
3
Normal
350
13
100
AcDbDictionaryWithDefault
340
13
0
ACDBPLACEHOLDER
5
13
330
12
0
DICTIONARY
5
14
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
15
330
A
100
AcDbDictionary
281
1
0
DICTIONARY
5
16
330
A
100
AcDbDictionary
281
1
0
LAYOUT
5
1A
330
D
100
AcDbPlotSettings
1

4
A3
6

40
7.5
41
20.0
42
7.5
43
20.0
44
420.0
45
297.0
46
0.0
47
0.0
48
0.0
49
0.0
140
0.0
141
0.0
142
1.0
143
1.0
70
1024
72
1
73
0
74
5
7

75
16
76
0
77
2
78
300
147
1.0
148
0.0
149
0.0
100
AcDbLayout
1
Model
70
1
71
0
10
0.0
20
0.0
11
420.0
21
297.0
12
0.0
22
0.0
32
0.0
14
1e+20
24
1e+20
34
1e+20
15
-1e+20
25
-1e+20
35
-1e+20
146
0.0
13
0.0
23
0.0
33
0.0
16
1.0
26
0.0
36
0.0
17
0.0
27
1.0
37
0.0
76
1
330
17
0
LAYOUT
5
1E
330
D
100
AcDbPlotSettings
1

4
A3
6

40
7.5
41
20.0
42
7.5
43
20.0
44
420.0
45
297.0
46
0.0
47
0.0
48
0.0
49
0.0
140
0.0
141
0.0
142
1.0
143
1.0
70
0
72
1
73
0
74
5
7

75
16
76
0
77
2
78
300
147
1.0
148
0.0
149
0.0
100
AcDbLayout
1
Layout1
70
1
71
1
10
0.0
20
0.0
11
420.0
21
297.0
12
0.0
22
0.0
32
0.0
14
1e+20
24
1e+20
34
1e+20
15
-1e+20
25
-1e+20
35
-1e+20
146
0.0
13
0.0
23
0.0
33
0.0
16
1.0
26
0.0
36
0.0
17
0.0
27
1.0
37
0.0
76
1
330
1B
0
MATERIAL
5
1F
102
{ACAD_REACTORS
330
E
102
}
330
E
100
AcDbMaterial
1
ByBlock
2

70
0
40
1.0
71
1
41
1.0
91
-1023410177
42
1.0
72
1
3

73
1
74
1
75
1
44
0.5
73
0
45
1.0
46
1.0
77
1
4

78
1
79
1
170
1
48
1.0
171
1
6

172
1
173
1
174
1
140
1.0
141
1.0
175
1
7

176
1
177
1
178
1
143
1.0
179
1
8

270
1
271
1
272
1
145
1.0
146
1.0
273
1
9

274
1
275
1
276
1
42
1.0
72
1
3

73
1
74
1
75
1
94
63
0
MATERIAL
5
20
102
{ACAD_REACTORS
330
E
102
}
330
E
100
AcDbMaterial
1
ByLayer
2

70
0
40
1.0
71
1
41
1.0
91
-1023410177
42
1.0
72
1
3

73
1
74
1
75
1
44
0.5
73
0
45
1.0
46
1.0
77
1
4

78
1
79
1
170
1
48
1.0
171
1
6

172
1
173
1
174
1
140
1.0
141
1.0
175
1
7

176
1
177
1
178
1
143
1.0
179
1
8

270
1
271
1
272
1
145
1.0
146
1.0
273
1
9

274
1
275
1
276
1
42
1.0
72
1
3

73
1
74
1
75
1
94
63
0
MATERIAL
5
21
102
{ACAD_REACTORS
330
E
102
}
330
E
100
AcDbMaterial
1
Global
2

70
0
40
1.0
71
1
41
1.0
91
-1023410177
42
1.0
72
1
3

73
1
74
1
75
1
44
0.5
73
0
45
1.0
46
1.0
77
1
4

78
1
79
1
170
1
48
1.0
171
1
6

172
1
173
1
174
1
140
1.0
141
1.0
175
1
7

176
1
177
1
178
1
143
1.0
179
1
8

270
1
271
1
272
1
145
1.0
146
1.0
273
1
9

274
1
275
1
276
1
42
1.0
72
1
3

73
1
74
1
75
1
94
63
0
MLINESTYLE
5
22
102
{ACAD_REACTORS
330
10
102
}
330
10
100
AcDbMlineStyle
2
Standard
70
0
3

62
256
51
90.0
52
90.0
71
2
49
0.5
62
256
6
BYLAYER
49
-0.5
62
256
6
BYLAYER
0
MLEADERSTYLE
5
2C
102
{ACAD_REACTORS
330
F
102
}
330
F
100
AcDbMLeaderStyle
179
2
170
2
171
1
172
0
90
2
40
0.0
41
0.0
173
1
91
-1056964608
92
-2
290
1
42
2.0
291
1
43
8.0
3
Standard
44
4.0
300

342
29
174
1
175
1
176
0
178
1
93
-1056964608
45
4.0
292
0
297
0
46
4.0
94
-1056964608
47
1.0
49
1.0
140
1.0
294
1
141
0.0
177
0
142
1.0
295
0
296
0
143
3.75
271
0
272
9
273
9`;var Td=i=>{if(!Number.isFinite(i))throw new Error(`DXF\u66F8\u304D\u51FA\u3057: \u6570\u5024\u304C\u4E0D\u6B63\u3067\u3059 (${i})`);let t=Math.round(i*1e6)/1e6;return Object.is(t,-0)?"0":String(t)};function ox(i){let t="";for(let e of i){let n=e.codePointAt(0);t+=n<128?e:n>65535?"?":`\\U+${n.toString(16).toUpperCase().padStart(4,"0")}`}return t}var Ed={ANSI31:[{a:45,dx:-2.24506403,dy:2.24506403,dash:[]}],ANSI37:[{a:45,dx:-2.24506403,dy:2.24506403,dash:[]},{a:135,dx:-2.24506403,dy:-2.24506403,dash:[]}]},Vr=class{lines=[];utf8;constructor(t){this.utf8=t}g(t,e){let n=typeof e=="number"?Td(e):String(e).replace(/[\r\n]+/g," ");this.lines.push(String(t),typeof e=="number"||this.utf8?n:ox(n))}},el=class{next=256;hnd=()=>(this.next++).toString(16).toUpperCase();layers=[];linetypes=[];styles=[];dimstyles=[];blocks=new Map;ents=[];dimNo=1;ltscale=1;version="R2010";addLayer(t){this.layers.find(e=>e.name===t.name)||this.layers.push(t)}addLinetype(t){this.linetypes.find(e=>e.name===t.name)||this.linetypes.push(t)}addStyle(t){this.styles.find(e=>e.name===t.name)||this.styles.push(t)}addDimStyle(t){this.dimstyles.find(e=>e.name===t.name)||this.dimstyles.push(t)}hasBlock(t){return this.blocks.has(t)}common(t,e,n,s,r,o){t.g(0,e),t.g(5,s),t.g(330,n),t.g(100,"AcDbEntity"),t.g(8,r.layer),r.linetype&&r.linetype!=="BYLAYER"&&t.g(6,r.linetype),r.color!==void 0&&r.color!==256&&t.g(62,r.color),r.lineweight!==void 0&&r.lineweight!==-1&&t.g(370,r.lineweight),r.ltscale!==void 0&&r.ltscale!==1&&t.g(48,r.ltscale),t.g(100,o)}push(t,e){(t??this.ents).push(e)}line(t,e,n,s){this.push(s,(r,o,a)=>{this.common(r,"LINE",o,a(),t,"AcDbLine"),r.g(10,e[0]),r.g(20,e[1]),r.g(30,0),r.g(11,n[0]),r.g(21,n[1]),r.g(31,0)})}lwpolyline(t,e,n=!1,s,r=0,o){this.push(o,(a,c,l)=>{this.common(a,"LWPOLYLINE",c,l(),t,"AcDbPolyline"),a.g(90,e.length),a.g(70,n?1:0),r&&a.g(43,r),e.forEach((u,p)=>{a.g(10,u[0]),a.g(20,u[1]),s&&s[p]&&a.g(42,s[p])})})}circle(t,e,n,s){this.push(s,(r,o,a)=>{this.common(r,"CIRCLE",o,a(),t,"AcDbCircle"),r.g(10,e[0]),r.g(20,e[1]),r.g(30,0),r.g(40,n)})}arc(t,e,n,s,r,o){this.push(o,(a,c,l)=>{this.common(a,"ARC",c,l(),t,"AcDbCircle"),a.g(10,e[0]),a.g(20,e[1]),a.g(30,0),a.g(40,n),a.g(100,"AcDbArc"),a.g(50,s),a.g(51,r)})}solid(t,e,n){this.push(n,(s,r,o)=>{this.common(s,"SOLID",r,o(),t,"AcDbTrace"),e.forEach((a,c)=>{s.g(10+c,a[0]),s.g(20+c,a[1]),s.g(30+c,0)})})}text(t,e,n,s,r,o=0,a=0,c=0,l=1,u,p){let d=p??n;this.push(u,(f,m,x)=>{this.common(f,"TEXT",m,x(),t,"AcDbText"),f.g(10,d[0]),f.g(20,d[1]),f.g(30,0),f.g(40,s),f.g(1,e),o&&f.g(50,o),l!==1&&f.g(41,l),f.g(7,r),(a||c)&&(f.g(72,a),f.g(11,n[0]),f.g(21,n[1]),f.g(31,0)),f.g(100,"AcDbText"),c&&f.g(73,c)})}mtext(t,e,n,s,r,o=1,a=0,c=0,l,u=!1){this.push(l,(p,d,f)=>{this.common(p,"MTEXT",d,f(),t,"AcDbMText"),p.g(10,n[0]),p.g(20,n[1]),p.g(30,0),p.g(40,s),p.g(41,c),p.g(71,o),p.g(72,1);let m=u?e:e.replace(/\n/g,"\\P");for(let x=0;x<m.length;x+=250)p.g(x+250<m.length?3:1,m.slice(x,x+250));p.g(7,r),a&&p.g(50,a)})}hatch(t,e){this.push(e,(n,s,r)=>{this.common(n,"HATCH",s,r(),t,"AcDbHatch"),n.g(10,0),n.g(20,0),n.g(30,0),n.g(210,0),n.g(220,0),n.g(230,1),n.g(2,t.solid?"SOLID":t.pattern??"ANSI31"),n.g(70,t.solid?1:0),n.g(71,0),n.g(91,t.paths.length);for(let o of t.paths)n.g(92,3),n.g(72,o.bulges?.some(a=>a)?1:0),n.g(73,1),n.g(93,o.pts.length),o.pts.forEach((a,c)=>{n.g(10,a[0]),n.g(20,a[1]),o.bulges?.some(l=>l)&&n.g(42,o.bulges[c]??0)}),n.g(97,0);if(n.g(75,t.solid?0:1),n.g(76,1),!t.solid){let o=t.scale??1,a=t.angle??0;if(n.g(52,a),n.g(41,o),n.g(77,0),t.lines?.length){n.g(78,t.lines.length);for(let[c,l,u,p]of t.lines){n.g(53,c),n.g(43,l[0]),n.g(44,l[1]),n.g(45,u[0]),n.g(46,u[1]),n.g(79,p.length);for(let d of p)n.g(49,d)}}else{let c=Ed[t.pattern??"ANSI31"]??Ed.ANSI31;n.g(78,c.length);for(let l of c){n.g(53,l.a+a),n.g(43,0),n.g(44,0),n.g(45,l.dx*o),n.g(46,l.dy*o),n.g(79,l.dash.length);for(let u of l.dash)n.g(49,u*o)}}}n.g(98,0)})}insert(t,e,n,s=1,r=1,o=0,a){this.push(a,(c,l,u)=>{this.common(c,"INSERT",l,u(),t,"AcDbBlockReference"),c.g(2,e),c.g(10,n[0]),c.g(20,n[1]),c.g(30,0),s!==1&&c.g(41,s),r!==1&&c.g(42,r),o&&c.g(50,o)})}defineBlock(t,e,n=[0,0]){let s=[];e(s),this.blocks.set(t,{ents:s,anon:t.startsWith("*"),base:n})}dimLinear(t,e,n,s,r,o,a,c){let l=`*D${this.dimNo++}`,u=Math.abs(r?n[1]-e[1]:n[0]-e[0]),p=a??Math.round(u).toLocaleString("en-US"),d=[],f={layer:t.layer,color:0},m=o.dimasz/2;if(r){let h=s,y=Math.sign(h-e[0])||-1,E=Math.min(e[1],n[1]),M=Math.max(e[1],n[1]);for(let T of[e,n])this.line(f,[T[0]+y*o.dimexo,T[1]],[h+y*o.dimexe,T[1]],d);this.line(f,[h,E+2*m],[h,M-2*m],d);for(let T of[E,M])this.lwpolyline({layer:"0",color:0},[[h,T-m/2],[h,T+m/2]],!0,[1,1],m,d);this.text(f,p,[h-o.dimgap-o.dimtxt*.57,(E+M)/2],o.dimtxt,o.textStyle,90,1,2,1,d)}else{let h=s,y=Math.sign(h-e[1])||-1,E=Math.min(e[0],n[0]),M=Math.max(e[0],n[0]);for(let T of[e,n])this.line(f,[T[0],T[1]+y*o.dimexo],[T[0],h+y*o.dimexe],d);this.line(f,[E+2*m,h],[M-2*m,h],d);for(let T of[E,M])this.lwpolyline({layer:"0",color:0},[[T+m/2,h],[T-m/2,h]],!0,[1,1],m,d);this.text(f,p,[(E+M)/2,h+o.dimgap+o.dimtxt*.57],o.dimtxt,o.textStyle,0,1,2,1,d)}this.blocks.set(l,{ents:d,anon:!0,base:[0,0]});let x=r?[s-o.dimgap-o.dimtxt/2,(e[1]+n[1])/2]:[(e[0]+n[0])/2,s+o.dimgap+o.dimtxt/2],g=r?[s,n[1]]:[n[0],s];this.push(c,(h,y,E)=>{this.common(h,"DIMENSION",y,E(),t,"AcDbDimension"),h.g(2,l),h.g(3,o.name),h.g(10,g[0]),h.g(20,g[1]),h.g(30,0),h.g(11,x[0]),h.g(21,x[1]),h.g(31,0),h.g(70,32),h.g(71,5),a!==void 0&&h.g(1,a),h.g(100,"AcDbAlignedDimension"),h.g(13,e[0]),h.g(23,e[1]),h.g(33,0),h.g(14,n[0]),h.g(24,n[1]),h.g(34,0),h.g(50,r?90:0),h.g(100,"AcDbRotatedDimension")})}toString(){let t=this.version==="R2010",e=new Vr(t),n={tables:{VPORT:"8",LTYPE:"2",LAYER:"1",STYLE:"5",VIEW:"7",UCS:"6",APPID:"3",DIMSTYLE:"4",BLOCK_RECORD:"9"}},s=new Map(this.linetypes.map(h=>[h.name,this.hnd()])),r=new Map(this.layers.map(h=>[h.name,this.hnd()])),o=new Map(this.styles.map(h=>[h.name,this.hnd()])),a=new Map(this.dimstyles.map(h=>[h.name,this.hnd()])),c=new Map([...this.blocks.keys()].map(h=>[h,this.hnd()])),l=h=>o.get(h)??"29",u=(t?vd:xd).replace(/(\$INSUNITS\n70\n)\d+/,"$14").replace(/(\$DWGCODEPAGE\n3\n)\S+/,"$1ANSI_932").replace(/(\$LTSCALE\n40\n)[\d.]+/,`$1${Td(this.ltscale)}`).replace(/(\$DIMSTYLE\n2\n)\S+/,"$1Standard"),p=new Vr(t),d=()=>this.hnd();for(let h of this.ents)h(p,"17",d);let f=new Vr(t);for(let[h,y]of this.blocks){let E=c.get(h);f.g(0,"BLOCK"),f.g(5,d()),f.g(330,E),f.g(100,"AcDbEntity"),f.g(8,"0"),f.g(100,"AcDbBlockBegin"),f.g(2,h),f.g(70,y.anon?1:0),f.g(10,y.base[0]),f.g(20,y.base[1]),f.g(30,0),f.g(3,h),f.g(1,"");for(let M of y.ents)M(f,E,d);f.g(0,"ENDBLK"),f.g(5,d()),f.g(330,E),f.g(100,"AcDbEntity"),f.g(8,"0"),f.g(100,"AcDbBlockEnd")}u=u.replace(/(\$HANDSEED\n5\n)\S+/,`$1${this.hnd()}`),e.lines.push("0","SECTION","2","HEADER",u,"0","ENDSEC"),e.lines.push("0","SECTION","2","CLASSES",t?Md:yd,"0","ENDSEC"),e.g(0,"SECTION"),e.g(2,"TABLES");let m=(h,y,E,M)=>{e.g(0,"TABLE"),e.g(2,h),e.g(5,n.tables[h]),e.g(330,"0"),e.g(100,"AcDbSymbolTable"),e.g(70,y),M?.(),E(),e.g(0,"ENDTAB")},x=(h,y,E,M,T=5)=>{e.g(0,h),e.g(T,y),e.g(330,E),e.g(100,"AcDbSymbolTableRecord"),e.g(100,M)};m("VPORT",1,()=>{x("VPORT","23","8","AcDbViewportTableRecord"),e.g(2,"*Active"),e.g(70,0);for(let[h,y]of[[10,0],[20,0],[11,1],[21,1],[12,0],[22,0],[13,0],[23,0],[14,.5],[24,.5],[15,.5],[25,.5],[16,0],[26,0],[36,1],[17,0],[27,0],[37,0],[40,1e3],[41,1.34],[42,50],[43,0],[44,0],[50,0],[51,0],[71,0],[72,1e3],[73,1],[74,3],[75,0],[76,0],[77,0],[78,0],...t?[[281,0],[65,0],[146,0]]:[]])e.g(h,y)}),m("LTYPE",3+this.linetypes.length,()=>{for(let[h,y]of[["ByBlock","24"],["ByLayer","25"],["Continuous","26"]])x("LTYPE",y,"2","AcDbLinetypeTableRecord"),e.g(2,h),e.g(70,0),e.g(3,h==="Continuous"?"Solid line":""),e.g(72,65),e.g(73,0),e.g(40,0);for(let h of this.linetypes){x("LTYPE",s.get(h.name),"2","AcDbLinetypeTableRecord"),e.g(2,h.name),e.g(70,0),e.g(3,h.description),e.g(72,65),e.g(73,h.pattern.length),e.g(40,h.pattern.reduce((y,E)=>y+Math.abs(E),0));for(let y of h.pattern)e.g(49,y),e.g(74,0)}}),m("LAYER",2+this.layers.length,()=>{x("LAYER","27","1","AcDbLayerTableRecord"),e.g(2,"0"),e.g(70,0),e.g(62,7),e.g(6,"Continuous"),e.g(370,-3),e.g(390,"13"),t&&e.g(347,"21"),x("LAYER","28","1","AcDbLayerTableRecord"),e.g(2,"Defpoints"),e.g(70,0),e.g(62,7),e.g(6,"Continuous"),e.g(290,0),e.g(370,-3),e.g(390,"13"),t&&e.g(347,"21");for(let h of this.layers)h.name==="0"||h.name==="Defpoints"||(x("LAYER",r.get(h.name),"1","AcDbLayerTableRecord"),e.g(2,h.name),e.g(70,0),e.g(62,h.color),e.g(6,h.linetype),h.plot===!1&&e.g(290,0),e.g(370,h.lineweight??-3),e.g(390,"13"),t&&e.g(347,"21"))}),m("STYLE",1+this.styles.length,()=>{x("STYLE","29","5","AcDbTextStyleTableRecord"),e.g(2,"Standard"),e.g(70,0),e.g(40,0),e.g(41,1),e.g(50,0),e.g(71,0),e.g(42,2.5),e.g(3,"txt"),e.g(4,"");for(let h of this.styles)h.name!=="Standard"&&(x("STYLE",o.get(h.name),"5","AcDbTextStyleTableRecord"),e.g(2,h.name),e.g(70,0),e.g(40,h.height??0),e.g(41,h.width??1),e.g(50,0),e.g(71,0),e.g(42,2.5),e.g(3,h.font),e.g(4,h.bigfont??""))}),m("VIEW",0,()=>{}),m("UCS",0,()=>{}),m("APPID",1,()=>{x("APPID","2A","3","AcDbRegAppTableRecord"),e.g(2,"ACAD"),e.g(70,0)});let g=(h,y,E)=>{x("DIMSTYLE",y,"4","AcDbDimStyleTableRecord",105),e.g(2,h),e.g(70,0),t||(e.g(3,""),e.g(4,""));let M=[[40,E?.dimscale??1],[41,E?.dimasz??2.5],[42,E?.dimexo??.625],[43,3.75],[44,E?.dimexe??1.25],[45,0],[46,E?.dimdle??0],[47,0],[48,0],...t?[[49,2.5]]:[],[140,E?.dimtxt??2.5],[141,2.5],[142,0],[143,.03937007874],[144,1],[145,0],[146,1],[147,E?.dimgap??.625],[148,0],...t?[[69,0],[70,0]]:[],[71,0],[72,0],[73,0],[74,0],[75,0],[76,0],[77,1],[78,8],[79,3],[170,0],[171,3],[172,1],[173,0],[174,0],[175,0],[176,0],[177,0],[178,0],[179,2],[271,0],[272,0],[273,2],[274,3],[275,0],[276,0],[277,2],[278,44],[279,0],[280,0],[281,0],[282,0],[283,0],[284,8],[285,0],[286,0],[288,0],[289,3],...t?[[290,0]]:[]];for(let[T,w]of M)e.g(T,w);E&&e.g(340,l(E.textStyle)),e.g(371,-2),e.g(372,-2)};m("DIMSTYLE",1+this.dimstyles.length,()=>{g("Standard","2B");for(let h of this.dimstyles)g(h.name,a.get(h.name),h)},()=>e.g(100,"AcDbDimStyleTable")),m("BLOCK_RECORD",2+this.blocks.size,()=>{let h=(y,E,M)=>{x("BLOCK_RECORD",y,"9","AcDbBlockTableRecord"),e.g(2,E),e.g(340,M),t&&(e.g(70,0),e.g(280,1),e.g(281,0))};h("17","*Model_Space","1A"),h("1B","*Paper_Space","1E");for(let[y]of this.blocks)h(c.get(y),y,"0")}),e.g(0,"ENDSEC"),e.g(0,"SECTION"),e.g(2,"BLOCKS"),e.lines.push("0","BLOCK","5","18","330","17","100","AcDbEntity","8","0","100","AcDbBlockBegin","2","*Model_Space","70","0","10","0","20","0","30","0","3","*Model_Space","1","","0","ENDBLK","5","19","330","17","100","AcDbEntity","8","0","100","AcDbBlockEnd","0","BLOCK","5","1C","330","1B","100","AcDbEntity","67","1","8","0","100","AcDbBlockBegin","2","*Paper_Space","70","0","10","0","20","0","30","0","3","*Paper_Space","1","","0","ENDBLK","5","1D","330","1B","100","AcDbEntity","67","1","8","0","100","AcDbBlockEnd");for(let h of f.lines)e.lines.push(h);e.g(0,"ENDSEC"),e.g(0,"SECTION"),e.g(2,"ENTITIES");for(let h of p.lines)e.lines.push(h);return e.g(0,"ENDSEC"),e.lines.push("0","SECTION","2","OBJECTS",t?bd:Sd,"0","ENDSEC","0","EOF"),e.lines.join(`\r
`).replace(/\r?\n/g,`\r
`)+`\r
`}};function Ad(i,t){for(let e of t.linetypes)i.addLinetype(e);for(let e of t.layers)i.addLayer({...e,linetype:e.linetype||"Continuous"});for(let e of t.styles)i.addStyle(e);for(let e of t.dimstyles)i.addDimStyle(e)}var dn=(i,t)=>[i[0]+t[0],i[1]+t[1]],ax=i=>({layer:i.L??"0",color:i.c,linetype:i.lt&&i.lt!=="BYLAYER"?i.lt:void 0,lineweight:i.lw!==void 0&&i.lw!==-1?i.lw:void 0,ltscale:i.lts});function hi(i,t,e=[0,0],n,s){let r=a=>s?.dimstyles.find(c=>c.name===a)??{name:a,textStyle:"Standard",dimtxt:280,dimasz:100,dimexo:200,dimexe:0,dimgap:80},o=(a,c)=>{let l=s?.styles.find(u=>u.name===a);return l?.height?l.height:c};for(let a of t){let c=ax(a);switch(a.t){case"LINE":i.line(c,dn(a.p[0],e),dn(a.p[1],e),n);break;case"LWPOLYLINE":case"POLYLINE":{let l=a.p.map(p=>dn(p,e)),u=a.p.map(p=>p[2]??0);i.lwpolyline(c,l,!!a.closed,u.some(p=>p)?u:void 0,a.cw??0,n);break}case"CIRCLE":i.circle(c,dn(a.ctr,e),a.r,n);break;case"ARC":i.arc(c,dn(a.ctr,e),a.r,a.a[0],a.a[1],n);break;case"SOLID":i.solid(c,a.p.map(l=>dn(l,e)),n);break;case"TEXT":{let l=a.ha||a.va;i.text(c,a.s,dn(l?a.al:a.ins,e),a.h,a.st||"Standard",a.rot??0,a.ha??0,a.va??0,a.w??1,n,l?dn(a.ins,e):void 0);break}case"MTEXT":i.mtext(c,a.raw??a.s,dn(a.ins,e),a.h,a.st||"Standard",a.ap??1,a.rot??0,a.wid??0,n,a.raw!==void 0);break;case"HATCH":{let l=a.paths.filter(d=>d.length>=3).map(d=>({pts:d.map(f=>dn(f,e))}));if(!l.length)break;let u=!!(a.solid||a.pat==="SOLID"),p=a.pdef?a.pdef.map(([d,f,m,x])=>[d,[f[0]+e[0],f[1]+e[1]],m,x]):void 0;i.hatch({...c,solid:u,pattern:a.pat||"ANSI31",scale:a.sc??1,angle:a.ang??0,paths:l,lines:p},n);break}case"DIMENSION":{let l=(a.dt??0)&7;if((l===0||l===1)&&a.p1&&a.p2&&a.dp){let u=Math.abs(a.p1[0]-a.p2[0])<1e-6||Math.abs(a.p1[1]-a.p2[1])>1e-6&&Math.abs(a.dp[0]-a.p1[0])>1e-6&&Math.abs(a.dp[0]-a.p2[0])>1e-6&&Math.abs(a.p1[0]-a.p2[0])<Math.abs(a.p1[1]-a.p2[1]),p=r(a.ds),d={...p,dimtxt:o(p.textStyle,p.dimtxt)};i.dimLinear(c,dn(a.p1,e),dn(a.p2,e),u?a.dp[0]+e[0]:a.dp[1]+e[1],u,d,a.txt&&a.txt!=="<>"?a.txt:void 0,n)}else a.x&&hi(i,a.x,e,n,s);break}case"INSERT":case"LEADER":case"MULTILEADER":(a.sub??a.x)&&hi(i,a.sub??a.x,e,n,s);break;case"SPLINE":case"ELLIPSE":a.flat&&i.lwpolyline(c,a.flat.map(l=>dn(l,e)),!1,void 0,0,n);break;default:break}}}li();var kc=[315,"4.5pt 1 200"],$n=(i,t,e=0,n,s,r="001_Text")=>({t:"TEXT",L:r,s:i,ins:t,al:t,h:n??kc[0],st:s??kc[1],rot:e,ha:4,va:0,w:1}),ge=(i,t,e)=>({t:"LINE",L:i,p:[t,e]}),Wr=(i,t,e,n,s)=>({t:"LWPOLYLINE",L:i,p:[[t,e],[n,e],[n,s],[t,s]],closed:!0}),zc={gridLineBelow:3190,gridLineAbove:3e3,gridLineLeft:3400,gridLineRight:2e3,dimStep:900,leaderGap:500,leaderLen:450,bubbleR:582,bubbleText:{h:350,st:"5pt 1 200"},titleBox:{w:6e3,h:840,below:4800},beamTagOffset:550.7,beamTagBox:[1200,500],colTagOffset:[-708.8,-499.3],colTagOffsetLeftEdge:[691.2,-499.3],colTagBox:[800,400],slabLevelDy:-790.3,slabArrowDy:-363.6,slabArrowLen:1500,slabHead:[255.2,147.3]},Bc=i=>i===0?"(\xB10)":`(${i>0?"+":""}${i})`;function wd(i){let t=zc,e=[],n=i.grids.filter(h=>h.axis==="X").sort((h,y)=>h.pos-y.pos),s=i.grids.filter(h=>h.axis==="Y").sort((h,y)=>h.pos-y.pos);if(!n.length||!s.length)return e;let r=n[0].pos,o=n[n.length-1].pos,a=s[0].pos,c=s[s.length-1].pos,l=a-t.gridLineBelow,u=r-t.gridLineLeft;for(let h of n){e.push(ge("0.05_base",[h.pos,l],[h.pos,c+t.gridLineAbove]));let y=l-2*t.dimStep-t.leaderGap;e.push(ge("0.10",[h.pos,y-t.leaderLen],[h.pos,y])),e.push({t:"CIRCLE",L:"0.10",ctr:[h.pos,y-t.leaderLen-t.bubbleR],r:t.bubbleR}),e.push($n(h.name,[h.pos,y-t.leaderLen-t.bubbleR],0,t.bubbleText.h,t.bubbleText.st))}for(let h of s){e.push(ge("0.05_base",[u,h.pos],[o+t.gridLineRight,h.pos]));let y=u-2*t.dimStep-t.leaderGap;e.push(ge("0.10",[y-t.leaderLen,h.pos],[y,h.pos])),e.push({t:"CIRCLE",L:"0.10",ctr:[y-t.leaderLen-t.bubbleR,h.pos],r:t.bubbleR}),e.push($n(h.name,[y-t.leaderLen-t.bubbleR,h.pos],0,t.bubbleText.h,t.bubbleText.st))}let p="1 200 4.5pt",d=n.filter(h=>!h.minor),f=s.filter(h=>!h.minor);for(let h=1;h<d.length;h++)e.push({t:"DIMENSION",L:"001_Text",dt:0,ds:p,p1:[d[h-1].pos,l],p2:[d[h].pos,l],dp:[d[h].pos,l-t.dimStep]});d.length>2&&e.push({t:"DIMENSION",L:"001_Text",dt:0,ds:p,p1:[d[0].pos,l-t.dimStep],p2:[d[d.length-1].pos,l-t.dimStep],dp:[d[d.length-1].pos,l-2*t.dimStep]});for(let h=1;h<f.length;h++)e.push({t:"DIMENSION",L:"001_Text",dt:0,ds:p,p1:[u,f[h].pos],p2:[u,f[h-1].pos],dp:[u-t.dimStep,f[h-1].pos]});f.length>2&&e.push({t:"DIMENSION",L:"001_Text",dt:0,ds:p,p1:[u-t.dimStep,f[0].pos],p2:[u-t.dimStep,f[f.length-1].pos],dp:[u-2*t.dimStep,f[f.length-1].pos]});for(let h of s.filter(y=>y.minor)){let y=f.reduce((E,M)=>Math.abs(M.pos-h.pos)<Math.abs(E.pos-h.pos)?M:E);e.push({t:"DIMENSION",L:"001_Text",dt:0,ds:p,p1:[u-t.dimStep,y.pos],p2:[u,h.pos],dp:[u-2*t.dimStep,h.pos]})}let m=(r+o)/2,x=t.titleBox,g=l-x.below;return e.push(Wr("0.10",m-x.w/2,g-x.h,m+x.w/2,g)),e.push(ge("0.00",[m,l-2*t.dimStep],[m,g])),e.push(ge("0.00",[m-x.w/2,g-x.h],[m+x.w/2,g])),e.push(ge("0.00",[m+x.w/2,g-x.h],[m-x.w/2,g])),e}function lx(i){let t=zc,e=i.grids.filter(s=>s.axis==="X").map(s=>s.pos),n=i.grids.filter(s=>s.axis==="Y").map(s=>s.pos);return[(Math.min(...e)+Math.max(...e))/2,Math.min(...n)-t.gridLineBelow-t.titleBox.below-t.titleBox.h/2]}function Rd(i,t){let e=zc,n=[],s=hn(i,t.story??"");if(!s)throw new Error(`\u30D3\u30E5\u30FC ${t.title}: \u968E ${t.story} \u304C\u3042\u308A\u307E\u305B\u3093`);if(!i.grids.some(d=>d.axis==="X")||!i.grids.some(d=>d.axis==="Y"))return[];let r=t.level??s.level;kc=t.opts?.tagText??[315,"4.5pt 1 200"];let o=(d,f)=>Array.isArray(t.tags?.[d])?t.tags[d]:f,a=d=>t.tags?.[d],c=Math.min(...i.grids.filter(d=>d.axis==="X").map(d=>d.pos));n.push($n(`${t.title} S=1/${t.scale}`,lx(i),0,315,"4.5pt 1 200"));let l=[];if(t.opts?.style!=="foundation"&&t.opts?.drawColumns!==!1){let d=new Set,f=i.members.filter(m=>m.kind==="column").map(m=>{try{return un(i,m)}catch{return null}}).filter(m=>!!m&&(t.opts?.columnStory?m.member.story===t.opts.columnStory:m.p0[2]<r&&m.p1[2]>=r));for(let m of f){let x=`${m.p0[0]},${m.p0[1]}`;if(d.has(x))continue;d.add(x);let g=[m.p0[0],m.p0[1]];l.push({mem:m.member,c:g,r:{x0:g[0]-m.w/2,y0:g[1]-m.h/2,x1:g[0]+m.w/2,y1:g[1]+m.h/2}})}}l.length&&n.push({t:"HATCH",L:"0.05_Hatch",c:252,solid:!0,pat:"SOLID",paths:l.map(({r:d})=>[[d.x1,d.y1],[d.x0,d.y1],[d.x0,d.y0],[d.x1,d.y0]])});for(let{mem:d,r:f,c:m}of l)if(n.push(Wr("0.20",f.x0,f.y0,f.x1,f.y1)),n.push(ge("0.05_D",[f.x0,f.y0],[f.x1,f.y1]),ge("0.05_D",[f.x0,f.y1],[f.x1,f.y0])),t.opts?.columnMarks!==!1){let x=Math.abs(m[0]-c)<1?e.colTagOffsetLeftEdge:e.colTagOffset,g=o(d.id,[m[0]+x[0],m[1]+x[1]]),h=[m[0]+Math.sign(x[0])*700,m[1]-500],y=Math.hypot(g[0]-h[0],g[1]-h[1])<100?h:g;n.push($n(d.mark,g)),n.push(Wr("0.00",y[0]-e.colTagBox[0]/2,y[1]-e.colTagBox[1]/2,y[0]+e.colTagBox[0]/2,y[1]+e.colTagBox[1]/2))}let u=i.members.filter(d=>d.kind!=="column"&&d.story===t.story&&(!d.view||d.view===t.title||t.opts?.beamMarks===!1)),p=t.beamTopDefault??0;for(let d of u){let f=un(i,d),m=Ji(i,d.mark,d.story),x=m?(m.shape.type==="RC_RECT",m.shape.b):300,[g,h]=[f.p0[0],f.p0[1]],[y,E]=[f.p1[0],f.p1[1]],M=Math.abs(E-h)<1e-6,T=Math.abs(y-g)<1e-6;if(!M&&!T){let D=Math.hypot(y-g,E-h),R=-(E-h)/D*x/2,z=(y-g)/D*x/2;for(let G of[1,-1])n.push(ge("0.05_D",[g+G*R,h+G*z],[y+G*R,E+G*z]));t.opts?.beamMarks!==!1&&n.push($n(d.mark,[(g+y)/2+R*2.2,(h+E)/2+z*2.2],(Math.atan2(E-h,y-g)*180/Math.PI+360)%180));continue}let w="0.05_D",_=M?[Math.min(g,y),Math.max(g,y)]:[Math.min(h,E),Math.max(h,E)],b=M?h:g,U=l.filter(({r:D})=>M?D.y0<b&&b<D.y1:D.x0<b&&b<D.x1).map(({r:D})=>M?[D.x0,D.x1]:[D.y0,D.y1]).filter(([D,R])=>R>_[0]&&D<_[1]).sort((D,R)=>D[0]-R[0]),P=[],N=_[0];for(let[D,R]of U)D>N&&P.push([N,D]),N=Math.max(N,R);N<_[1]&&P.push([N,_[1]]);let C=d.view===t.title&&d.edges||[w,w];if(t.opts?.drawBeams!==!1)for(let[D,R]of P)for(let z of[-1,1]){let G=b+z*x/2,B=C[z<0?0:1]||w;n.push(M?ge(B,[D,G],[R,G]):ge(B,[G,D],[G,R]))}if(t.opts?.beamMarks!==!1&&(!d.view||d.view===t.title)){let D=(_[0]+_[1])/2,R=M?[D,b+550]:[b-550,D],z=o(d.id,M?[D,b+e.beamTagOffset]:[b-e.beamTagOffset,D]),G=Math.hypot(z[0]-R[0],z[1]-R[1])<100?R:z,B=d.dz??p,tt=B!==p||!!a(d.id+":showlv"),W=!!a(d.id+":inline")&&tt,K=a(d.id+":ts");n.push($n(W?`${d.mark}${Bc(B)}`:d.mark,z,M?0:90,K?.[0],K?.[1]));let[j,pt]=e.beamTagBox;if(n.push(M?Wr("0.00",G[0]-j/2,G[1]-pt/2,G[0]+j/2,G[1]+pt/2):Wr("0.00",G[0]-pt/2,G[1]-j/2,G[0]+pt/2,G[1]+j/2)),tt&&!W){let Rt=o(d.id+":lv",M?[z[0],z[1]-450]:[z[0]+450,z[1]]);n.push($n(Bc(B),Rt,M?0:90))}}}for(let d of(i.slabs??[]).filter(f=>f.story===t.story&&(!f.view||f.view===t.title))){let f=[d.at.x,d.at.y],m=d.rot===90;if(n.push($n(d.mark,f,d.rot)),d.dz!==null&&d.dz!==void 0){let M=o(d.id+":lv",m?[f[0]-e.slabLevelDy,f[1]]:[f[0],f[1]+e.slabLevelDy]);n.push($n(Bc(d.dz),M,d.rot))}if(a(d.id+":noarrow"))continue;let x=o(d.id+":arrow",m?[f[0]-e.slabArrowDy,f[1]]:[f[0],f[1]+e.slabArrowDy]),g=(a(d.id+":alen")??e.slabArrowLen)/2,[h,y]=e.slabHead;if((a(d.id+":arot")??d.rot)!==90){let M=[x[0]-g,x[1]],T=[x[0]+g,x[1]];n.push(ge("0.05",M,T),ge("0.05",M,[M[0]+h,M[1]+y]),ge("0.05",M,[M[0]+h,M[1]-y]),ge("0.05",T,[T[0]-h,T[1]+y]),ge("0.05",T,[T[0]-h,T[1]-y]))}else{let M=[x[0],x[1]-g],T=[x[0],x[1]+g];n.push(ge("0.05",M,T),ge("0.05",M,[M[0]+y,M[1]+h]),ge("0.05",M,[M[0]-y,M[1]+h]),ge("0.05",T,[T[0]+y,T[1]-h]),ge("0.05",T,[T[0]-y,T[1]-h]))}}for(let d of(i.walls??[]).filter(f=>f.story===t.story&&(!f.view||f.view===t.title)))n.push($n(d.mark,[d.at.x,d.at.y],d.rot));return n}li();var Hc=(i,t,e)=>({t:"LINE",L:i,p:[t,e]}),Cd=(i,t,e,n,s="001_Text",r=0)=>({t:"TEXT",L:s,s:i,ins:t,al:t,h:e,st:n,rot:r,ha:4,va:0,w:1}),Id=(i,t,e,n,s,r,o)=>({t:"TEXT",L:r,s:i,ins:t,al:e,h:n,st:s,rot:0,ha:0,va:o,w:1});function Dd(i,t){let e=[],n=t,s=n.gridStyle,r=n.levelStyle,o=n.axis==="X"?"Y":"X",a=i.grids.filter(p=>p.axis===o&&!p.minor).sort((p,d)=>p.pos-d.pos);if(s&&a.length){for(let m of a)e.push(Hc("0.05_base",[m.pos,s.lineFrom],[m.pos,s.lineTo])),s.leader&&e.push(Hc("0.10",[m.pos,s.leader[0]],[m.pos,s.leader[1]])),s.bubbleY!=null&&e.push({t:"CIRCLE",L:"0.10",ctr:[m.pos,s.bubbleY],r:s.r??582}),(s.textY??s.bubbleY)!=null&&e.push(Cd(m.name,[m.pos,s.textY??s.bubbleY],s.textH??350,s.textSt??"5pt 1 200"));let p=a.filter(m=>!m.minor),[d,f]=s.dimRows??[];if(d!==void 0)for(let m=1;m<p.length;m++)e.push({t:"DIMENSION",L:"001_Text",dt:0,ds:s.dimStyle,p1:[p[m-1].pos,s.dimFrom],p2:[p[m].pos,s.dimFrom],dp:[p[m].pos,d]});f!==void 0&&p.length>2&&e.push({t:"DIMENSION",L:"001_Text",dt:0,ds:s.dimStyle,p1:[p[0].pos,d],p2:[p[p.length-1].pos,d],dp:[p[p.length-1].pos,f]})}if(r){let d=[],f=Dn(i),m=f[f.length-1],x=g=>g>=0?`GL+${g}`:`GL${g}`;for(let g of f)(g!==m||!(i.levels??[]).length)&&d.push({z:g.level-0,label:`\u25BD${g.name.replace(/F$/,"")}FL (${x(g.level)})`,kind:"fl"}),g.beamTop!==void 0&&d.push({z:g.level+g.beamTop,label:`\u25B2${g.name}\u6881\u5929\u7AEF`,kind:"beamtop"});for(let g of i.levels??[])d.push({z:g.z,label:g.label,kind:g.kind});for(let g of d){let h=g.kind==="gl"?r.x0:r.mainX0??r.x0;e.push(Hc("0.05_base",[h,g.z],[r.x1,g.z]));let y=g.kind==="gl"?r.x0+90:r.textX;g.kind==="beamtop"?e.push(Id(g.label,[y,g.z+r.topDy],[y,g.z-94],r.textH,r.textSt,r.textL,3)):e.push(Id(g.label,[y,g.z+(g.kind==="gl"?173:r.flDy)],[y,g.z],r.textH,r.textSt,r.textL,1))}}let c=n.tagText??[105,"5pt"],l=n.line,u=i.grids.find(p=>p.axis===n.axis&&p.name===n.line);for(let p of i.members){if(p.kind==="column"||!p.from||!p.to)continue;let d=t.tags?.[p.id];if(!Array.isArray(d)&&n.autoTags&&u){let g=(y,E)=>{try{return Fs(i,E,E==="X"?y.x:y.y)}catch{return NaN}};if(n.axis==="Y"?g(p.from,"Y")===u.pos&&g(p.to,"Y")===u.pos:g(p.from,"X")===u.pos&&g(p.to,"X")===u.pos){let y=n.axis==="Y"?g(p.from,"X"):g(p.from,"Y"),E=n.axis==="Y"?g(p.to,"X"):g(p.to,"Y"),M=i.stories.find(T=>T.name===p.story);M&&(d=[(y+E)/2,M.level+(p.dz??M.beamTop??0)-849])}}if(!Array.isArray(d))continue;let f=t.tags?.[p.id+":hv"],m=t.tags?.[p.id+":ins"],x=Cd(p.mark,d,c[0],c[1],n.tagLayer??"0.10");f&&(x.ha=f[0],x.va=f[1],x.ins=m??d),e.push(x)}return e}li();var Pd={linetypes:[{name:"JIS_08_15",description:"1SASEN15 ____ _ ____ _ ____ _ ____ _ ____",pattern:[15,-.75,.75,-.75],complex:!1},{name:"VW-01____",description:"",pattern:[.20828,-.20828],complex:!1},{name:"JIS_08_11",description:"1SASEN11 ___ _ ___ _ ___ _ ___ _ ___ _ ___",pattern:[11,-.6,.6,-.6],complex:!1}],layers:[{name:"0",color:210,linetype:"Continuous",plot:!0,lineweight:-3},{name:"0.00",color:8,linetype:"Continuous",plot:!1,lineweight:-3},{name:"0.10",color:7,linetype:"Continuous",plot:!0,lineweight:-3},{name:"0.05_base",color:5,linetype:"JIS_08_15",plot:!0,lineweight:-3},{name:"0.15",color:4,linetype:"Continuous",plot:!0,lineweight:-3},{name:"0.30",color:2,linetype:"Continuous",plot:!0,lineweight:-3},{name:"0.05",color:1,linetype:"Continuous",plot:!0,lineweight:-3},{name:"0.05_Hatch",color:1,linetype:"Continuous",plot:!0,lineweight:-3},{name:"Defpoints",color:7,linetype:"Continuous",plot:!1,lineweight:-3},{name:"001_Text",color:7,linetype:"Continuous",plot:!0,lineweight:-3},{name:"0.05_D",color:1,linetype:"VW-01____",plot:!0,lineweight:-3},{name:"0.05_void",color:1,linetype:"JIS_08_11",plot:!0,lineweight:-3},{name:"0.20",color:3,linetype:"Continuous",plot:!0,lineweight:-3}],styles:[{name:"Standard",font:"msgothic.ttc",height:0,width:1,bigfont:""},{name:"5pt 1 100",font:"msgothic.ttc",height:176.4,width:1,bigfont:""},{name:"6pt",font:"msgothic.ttc",height:2.1,width:1,bigfont:""},{name:"5pt",font:"msgothic.ttc",height:1.75,width:1,bigfont:""},{name:"5pt 1 200",font:"msgothic.ttc",height:350,width:1,bigfont:""},{name:"4.5pt 1 200",font:"msgothic.ttc",height:280,width:1,bigfont:""},{name:"GOTHIC",font:"msgothic.ttc",height:0,width:1,bigfont:""}],dimstyles:[{name:"1 200 4.5pt",textStyle:"4.5pt 1 200",dimtxt:315,dimasz:100,dimexo:200,dimexe:0,dimgap:80,dimscale:0},{name:"1 200 5pt",textStyle:"5pt 1 200",dimtxt:350,dimasz:100,dimexo:200,dimexe:0,dimgap:80,dimscale:0}]};var Ld="\u57FA\u6E96\u7DDA";function cx(i,t,e){let n=new el;n.ltscale=200,Ad(n,t);for(let[s,r]of Object.entries(i.blocks??{}))n.defineBlock(s,o=>hi(n,r,[0,0],o,t));n.defineBlock(Ld,s=>hi(n,wd(i),[0,0],s,t));for(let s of i.sheets??[]){if(e&&!e.includes(s.name))continue;let[r,o,a]=s.frame;s.frameBlock&&n.insert({layer:"0.10"},s.frameBlock,[r,o],a,a),hi(n,s.ann??[],[r,o],void 0,t);for(let c of(i.views??[]).filter(l=>l.sheet===s.id))c.kind==="plan"?(n.insert({layer:"0.05_base"},Ld,c.place),hi(n,Rd(i,c),c.place,void 0,t)):hi(n,Dd(i,c),c.place,void 0,t),hi(n,c.ann??[],c.place,void 0,t)}return n.toString()}var Gs={w:420,h:297,scale:200},Nd=[[8970,23704],[49770,23704]],Od=[[14880,23458],[55880,23458]];function hx(i,t,e){let n=Gs.w*e,s=Gs.h*e,r="0.10",o=(c,l,u,p)=>({t:"LWPOLYLINE",L:r,p:[[c,l],[u,l],[u,p],[c,p]],closed:!0}),a=(c,l,u,p)=>({t:"TEXT",L:"001_Text",s:c,ins:[l,u],al:[l,u],h:p,st:"GOTHIC",rot:0,ha:0,va:0,w:1});return[o(20*e,10*e,n-10*e,s-10*e),o(n-120*e,10*e,n-10*e,26*e),a(i,n-116*e,18*e,250),a(`${t}  S=1/${e} (A3)`,n-116*e,12*e,250)]}function ux(i){let t=JSON.parse(JSON.stringify(i));t.views=[],t.sheets=[];let e=Dn(t),n=e.filter((c,l)=>l>0||t.members.some(u=>u.kind!=="column"&&u.story===c.name)),s=0,r=0,o=c=>{s++;let l={id:`sh${s}`,name:c,frame:[(s-1)*Gs.w*Gs.scale,0,Gs.scale],ann:[]};return l.ann=hx(`${t.name} ${c}`,`S-${String(s).padStart(2,"0")}`,Gs.scale),t.sheets.push(l),l};for(let c=0;c<n.length;c+=2){let l=o(`\u4F0F\u56F3(${c/2+1})`);n.slice(c,c+2).forEach((u,p)=>{let d=e[e.indexOf(u)-1],f={id:`v${++r}`,kind:"plan",title:`${u.name}\u4F0F\u56F3`,story:u.name,place:[l.frame[0]+Nd[p][0],l.frame[1]+Nd[p][1]],sheet:l.id,scale:200,beamTopDefault:u.beamTop??0,opts:{columnStory:d?d.name:u.name}};t.views.push(f)})}let a=t.grids.filter(c=>!c.minor).sort((c,l)=>c.axis===l.axis?c.pos-l.pos:c.axis<l.axis?-1:1);for(let c=0;c<a.length;c+=2){let l=o(`\u8EF8\u7D44\u56F3(${c/2+1})`);a.slice(c,c+2).forEach((u,p)=>{let d={id:`v${++r}`,kind:"elevation",title:`${u.name}\u901A\u308A\u8EF8\u7D44\u56F3`,line:u.name,axis:u.axis,place:[l.frame[0]+Od[p][0],l.frame[1]+Od[p][1]],sheet:l.id,scale:200,tags:{},autoTags:!0,tagText:[105,"5pt"],tagLayer:"0.10",gridStyle:{lineFrom:-7900,lineTo:22e3,leader:[-10560,-10200],bubbleY:-11142,r:582,textH:350,textSt:"5pt 1 200",textY:-11142,dimRows:[-8800,-9700],dimStyle:"1 200 4.5pt",dimFrom:-7900},levelStyle:{x0:-12302,x1:25476,mainX0:-8624,textX:-7716,textH:315,textSt:"4.5pt 1 200",textL:"0.10",flDy:64,topDy:-409}};t.views.push(d)})}return t}function Ud(i){let e=(i.views?.length??0)>0&&(i.sheets?.length??0)>0?i:ux(i);return cx(e,i.drawingStd??Pd)}var px="https://cdn.jsdelivr.net/npm/rhino3dm@8.35.0/rhino3dm.module.min.js",kd="sbim.autosave",Vt=i=>document.getElementById(i),Zt,fn="plan",ae="",we=new Set,Yt=null,Gc="",Qi=null,Sn={int:!0,line:!0,end:!0,mid:!0},Ln=!0,di=!1,Wc=!1,ts="all",Ws=[],Di=-1,qr={\u67F1:"column",\u6881:"beam",\u5927\u6881:"beam",\u5C0F\u6881:"sbeam",\u901A\u308A:"grid",\u901A\u308A\u82AF:"grid",\u968E:"story",\u65AD\u9762:"section",\u524A\u9664:"delete",del:"delete",e:"delete",u:"undo",z:"zoom",\u8868:"table",\u56F3\u9762:"export set","?":"help"},mx=["column","beam","sbeam","grid","story","section","delete","undo","redo","zoom","view plan","view 3d","view front","view right","view top","level","export stb","export dxf","export 3dm","export set","table","sample","new","help",...Object.keys(qr)],On=Vt("viewport"),je=new Xa({antialias:!0});je.setPixelRatio(window.devicePixelRatio);On.appendChild(je.domElement);var sl=new Ja;sl.domElement.className="labels";On.appendChild(sl.domElement);var Ni=new cr;Ni.background=new kt(2829617);Ni.add(new vr(16777215,4473924,2.2));var Vd=new br(16777215,1.5);Vd.position.set(1,-2,3);Ni.add(Vd);var es=new Ve(40,1,100,1e6);es.up.set(0,0,1);var oe=new Wi(-1,1,1,-1,-1e6,1e6);oe.up.set(0,1,0);var Zr=oe,Xs=new Br(es,je.domElement),Ys=new Br(oe,je.domElement);Xs.mouseButtons={LEFT:-1,MIDDLE:cn.PAN,RIGHT:cn.ROTATE};Ys.mouseButtons={LEFT:-1,MIDDLE:cn.PAN,RIGHT:cn.PAN};Ys.enableRotate=!1;Ys.screenSpacePanning=!0;var $s=new jn;Ni.add($s);var Pi=new an(new gr(1,1.4,24),new Ts({color:16765952,depthTest:!1}));Pi.renderOrder=10;Pi.visible=!1;Ni.add(Pi);var ns=new As(new on,new Vi({color:16765952,depthTest:!1}));ns.renderOrder=10;ns.visible=!1;Ni.add(ns);var gx={column:14242639,girder:4882388,beam:4174719},nl=new Map;function Wd(){let i=On.clientWidth,t=On.clientHeight;je.setSize(i,t),sl.setSize(i,t),es.aspect=i/t,es.updateProjectionMatrix();let e=(oe.top-oe.bottom)/2||2e4;oe.left=-e*i/t,oe.right=e*i/t,oe.top=e,oe.bottom=-e,oe.updateProjectionMatrix()}new ResizeObserver(Wd).observe(On);function $c(i){let t=i.grids.filter(s=>s.axis==="X").map(s=>s.pos),e=i.grids.filter(s=>s.axis==="Y").map(s=>s.pos),n=i.stories.map(s=>s.level);return{x0:Math.min(0,...t),x1:Math.max(1e3,...t),y0:Math.min(0,...e),y1:Math.max(1e3,...e),z0:Math.min(0,...n),z1:Math.max(1e3,...n)}}function Xc(){let i=$c(Zt.model),t=(i.x0+i.x1)/2,e=(i.y0+i.y1)/2,n=(i.z0+i.z1)/2,s=Math.max(i.x1-i.x0,i.y1-i.y0,6e3)*.75+4e3,r=On.clientWidth||1,o=On.clientHeight||1;oe.position.set(t,e,1e5),oe.lookAt(t,e,0),oe.top=s,oe.bottom=-s,oe.left=-s*r/o,oe.right=s*r/o,oe.zoom=1,oe.updateProjectionMatrix(),Ys.target.set(t,e,0),Ys.update(),es.position.set(t-s*1.6,e-s*2.2,n+s*1.4),Xs.target.set(t,e,n),Xs.update()}function zd(i,t,e){let n=document.createElement("div");n.className=t,n.textContent=i;let s=new kr(n);s.position.set(...e),$s.add(s)}function vn(){for(let c of[...$s.children]){$s.remove(c),c.geometry?.dispose?.();let l=c.material;l&&l!==Pi.material&&(Array.isArray(l)?l:[l]).forEach(u=>u.dispose?.()),c instanceof kr&&c.element.remove()}nl.clear();let i=Zt.model,e=hn(i,ae)?.level??0,n=$c(i),s=2e3,r=new xr({color:9080728,dashSize:600,gapSize:200}),o=fn==="plan"?e+5:n.z0;for(let c of i.grids){let l=c.axis==="X"?[new F(c.pos,n.y0-s,o),new F(c.pos,n.y1+s,o)]:[new F(n.x0-s,c.pos,o),new F(n.x1+s,c.pos,o)],u=new As(new on().setFromPoints(l),r);u.computeLineDistances(),$s.add(u),zd(c.name,"bubble",[l[0].x+(c.axis==="Y"?-800:0),l[0].y+(c.axis==="X"?-800:0),o])}let a=new Set;if(fn==="plan"){let c=new Set,l=i.members.filter(u=>u.kind==="column").map(u=>{try{return un(i,u)}catch{return null}}).filter(u=>!!u&&(u.p1[2]===e||u.p0[2]===e)).sort((u,p)=>+(p.p1[2]===e)-+(u.p1[2]===e));for(let u of l){let p=`${u.p0[0]},${u.p0[1]}`;c.has(p)||(c.add(p),a.add(u.member.id))}}for(let c of i.members){let l;try{l=un(i,c)}catch{continue}let u=c.kind==="column",p=!0,d=!1;if(fn==="plan"?u?p=a.has(c.id):p=c.story===ae:d=c.story!==ae&&!(u&&l.p1[2]===e),!p)continue;let f=Math.hypot(l.p1[0]-l.p0[0],l.p1[1]-l.p0[1],l.p1[2]-l.p0[2]),m=u?new si(l.w,l.h,f):new si(f,l.w,l.h),x=we.has(c.id),g=new _r({color:x?16765952:gx[c.kind],transparent:d||fn==="plan"&&!u,opacity:d?.25:fn==="plan"&&!u?.75:1}),h=new an(m,g);if(u?h.position.set(l.p0[0],l.p0[1],(l.p0[2]+l.p1[2])/2):(h.position.set((l.p0[0]+l.p1[0])/2,(l.p0[1]+l.p1[1])/2,l.p0[2]-l.h/2),h.rotation.z=Math.atan2(l.p1[1]-l.p0[1],l.p1[0]-l.p0[0])),fn==="plan"&&u&&(h.position.z=e-100),h.userData.id=c.id,$s.add(h),nl.set(c.id,h),fn==="plan"){let y=c.dz?`${c.mark}(${c.dz})`:c.mark;zd(y,x?"mark sel":"mark",u?[l.p0[0]-l.w,l.p0[1]+l.h,e+50]:[(l.p0[0]+l.p1[0])/2,(l.p0[1]+l.p1[1])/2,e+50])}}Zr=fn==="plan"?oe:es,Ys.enabled=fn==="plan",Xs.enabled=fn==="3d",Yc(),rl()}function Yc(){let i=Zt.model,t=Vt("story"),e=Dn(i);e.find(r=>r.name===ae)||(ae=e[1]?.name??e[0]?.name??""),t.innerHTML=e.map(r=>`<option ${r.name===ae?"selected":""}>${Ht(r.name)}</option>`).join(""),Vt("tree").innerHTML=`
    <details open><summary>\u901A\u308A\u82AF (${i.grids.length})</summary>${i.grids.map(r=>`<div class="item">${Ht(r.name)} <small>${Ht(String(r.pos))}</small></div>`).join("")}</details>
    <details open><summary>\u968E (${e.length})</summary>${e.map(r=>`<div class="item ${r.name===ae?"cur":""}" data-story="${Ht(r.name)}">${Ht(r.name)} <small>FL ${Ht(String(r.level))}</small></div>`).join("")}</details>
    <details open><summary>\u65AD\u9762 (${i.sections.length})</summary>${i.sections.map(r=>`<div class="item">${Ht(r.mark)} <small>${Ht(r.story)} ${Ht(Bs(r.shape))}</small></div>`).join("")}</details>
    <details open><summary>${Ht(ae)} \u306E\u90E8\u6750</summary>${i.members.filter(r=>r.story===ae).map(r=>`<div class="item ${we.has(r.id)?"cur":""}" data-id="${Ht(r.id)}">${Ht(r.mark)} <small>${Ht(r.kind)} ${Ht(r.id)}</small></div>`).join("")}</details>`;let n=Vt("props"),s=[...we].filter(r=>i.members.find(o=>o.id===r));if(s.length===1){let r=i.members.find(a=>a.id===s[0]),o=Ji(i,r.mark,r.story);n.innerHTML=`<h3>${Ht(r.kind)} ${Ht(r.id)}</h3>
      <label>\u7B26\u53F7 <input id="p-mark" value="${Ht(r.mark)}"></label>
      <label>\u968E <select id="p-story">${e.map(a=>`<option ${a.name===r.story?"selected":""}>${Ht(a.name)}</option>`).join("")}</select></label>
      ${r.kind!=="column"?`<label>\u5929\u7AEF dz <input id="p-dz" type="number" value="${Ht(String(r.dz??0))}"></label>`:""}
      <p class="muted">\u65AD\u9762: ${o?Ht(Bs(o.shape)):"<b class=warn>\u672A\u5B9A\u7FA9</b>"}<br>\u4F4D\u7F6E: ${Ht(JSON.stringify(r.at??[r.from,r.to]))}</p>
      <button id="p-apply">\u9069\u7528</button> <button id="p-del">\u524A\u9664</button>`,Vt("p-apply").onclick=()=>{let a={id:r.id,mark:Vt("p-mark").value,story:Vt("p-story").value};r.kind!=="column"&&(a.dz=Number(Vt("p-dz").value)),Nn({cmd:"member.set",args:a})},Vt("p-del").onclick=()=>Nn({cmd:"delete",args:{ids:[r.id]}})}else s.length>1?(n.innerHTML=`<h3>${s.length} \u500B\u9078\u629E</h3><button id="p-del">\u524A\u9664</button>`,Vt("p-del").onclick=()=>Nn({cmd:"delete",args:{ids:s}})):n.innerHTML='<p class="muted">\u90E8\u6750\u3092\u30AF\u30EA\u30C3\u30AF\u3067\u9078\u629E\u3002<br>\u53F3\u30C9\u30E9\u30C3\u30B0: \u5E73\u9762=\u79FB\u52D5 / 3D=\u56DE\u8EE2\u3001\u30DB\u30A4\u30FC\u30EB: \u30BA\u30FC\u30E0</p>';Vt("title").textContent=i.name}var Ht=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);Vt("tree").addEventListener("click",i=>{let t=i.target.closest(".item");t&&(t.dataset.story&&(ae=t.dataset.story,vn()),t.dataset.id&&(we=new Set([t.dataset.id]),vn()))});Vt("story").addEventListener("change",i=>{ae=i.target.value,vn()});function se(i,t=""){let e=Vt("history"),n=document.createElement("div");n.className=t,n.textContent=i,e.appendChild(n),e.scrollTop=e.scrollHeight}function is(){let i=Vt("prompt");Yt?Yt.type==="column"?i.textContent=`\u67F1 ${Yt.mark}: \u4EA4\u70B9\u3092\u30AF\u30EA\u30C3\u30AF\uFF08Esc\u3067\u7D42\u4E86\uFF09`:i.textContent=`${Yt.kind==="girder"?"\u5927\u6881":"\u5C0F\u6881"} ${Yt.mark}: ${Yt.first?"\u7D42\u70B9":"\u59CB\u70B9"}\u3092\u30AF\u30EA\u30C3\u30AF\uFF08Esc\u3067\u7D42\u4E86\uFF09`:i.textContent="\u30B3\u30DE\u30F3\u30C9:"}function Nn(i){let t=Zt.run(i.cmd,i.args);return t.ok?(se(`\u2713 ${i.cmd}${t.ids?.length?" "+t.ids.join(","):""}`,"ok"),i.cmd==="delete"&&we.clear()):se(`\u2717 ${t.error}`,"err"),t}function Li(i){if(i=i.trim(),!i){Gc&&Li(Gc);return}se(`> ${i}`,"in"),Ws.unshift(i),Di=-1;let t=i.split(/\s+/);Object.hasOwn(qr,t[0])&&(t=[...qr[t[0]].split(" "),...t.slice(1)]),["sample","new","delete","export","undo","redo"].includes(t[0].toLowerCase())||(Gc=i),i=t.join(" ");let e=t[0].toLowerCase();try{if(e==="help"||e==="?"){fd.concat(["view plan|3d   level <\u968E>   zoom   export stb|dxf|3dm   sample   new"]).forEach(n=>se(n));return}if(e==="view"){if(t[1]==="front"||t[1]==="right"||t[1]==="top"||t[1]==="persp"){ui("3d"),Yd(t[1]);return}ui(t[1]==="3d"?"3d":"plan");return}if(e==="table"){Zd();return}if(e==="level"){if(!hn(Zt.model,t[1]))throw new Error(`\u968E ${t[1]} \u304C\u3042\u308A\u307E\u305B\u3093`);ae=t[1],vn();return}if(e==="zoom"){Xc();return}if(e==="export"){Yr(t[1]);return}if(e==="filter"){qd(t[1]??"all");return}if(e==="osnap"){Ln=!Ln,qs();return}if(e==="ortho"){di=!di,qs();return}if(e==="sample"){Qi=null,Kr(Qa().model);return}if(e==="new"){confirm("\u65B0\u3057\u3044\u30E2\u30C7\u30EB\u306B\u3057\u307E\u3059\u304B\uFF1F\uFF08\u672A\u4FDD\u5B58\u306E\u5909\u66F4\u306F\u5931\u308F\u308C\u307E\u3059\uFF09")&&(Qi=null,Kr(new ji().model));return}if(e==="column"&&t.length<=2){Yt={type:"column",mark:t[1]??"C1"},ui("plan"),is();return}if((e==="beam"||e==="sbeam")&&t.length<=3){Yt={type:"beam",kind:e==="beam"?"girder":"beam",mark:t[1]??(e==="beam"?"G1":"B1"),dz:Number(t[2]??0)},ui("plan"),is();return}Nn(Hs(i,{story:ae}))}catch(n){se(`\u2717 ${n.message}`,"err")}}var xe=Vt("cmd"),Pn=Vt("suggest");function qc(){let i=xe.value.trim();if(!i||i.includes(" ")){Pn.style.display="none";return}let t=Ws.filter(s=>s.startsWith(i)).slice(0,4),e=mx.filter(s=>s.startsWith(i.toLowerCase())||s.startsWith(i)).slice(0,8),n=[...new Set([...t,...e])].slice(0,8);Pn.innerHTML=n.map((s,r)=>`<div class="${r===0?"cur":""}">${Ht(s)}${Object.hasOwn(qr,s)?` <small>\u2192 ${Ht(qr[s])}</small>`:""}</div>`).join(""),Pn.style.display=n.length?"block":"none",Pn.list=n}xe.addEventListener("input",qc);Pn.addEventListener("mousedown",i=>{let t=[...Pn.children].indexOf(i.target.closest("div")),e=Pn.list??[];t>=0&&e[t]&&(i.preventDefault(),xe.value=e[t]+" ",qc(),xe.focus())});xe.addEventListener("keydown",i=>{let t=Pn.list??[];if(!(i.isComposing||i.keyCode===229)){if(i.key==="Enter"){let e=xe.value;xe.value="",Pn.style.display="none",Li(e)}else i.key===" "&&xe.value.trim()===""?(i.preventDefault(),Li("")):i.key==="Tab"&&t.length&&Pn.style.display!=="none"?(i.preventDefault(),xe.value=t[0]+" ",qc()):i.key==="ArrowUp"&&Ws.length?(i.preventDefault(),Di=Math.min(Di+1,Ws.length-1),xe.value=Ws[Di]):i.key==="ArrowDown"&&(i.preventDefault(),Di=Math.max(Di-1,-1),xe.value=Di<0?"":Ws[Di]);i.key==="Escape"&&(xe.value?(xe.value="",Pn.style.display="none"):Zc())}});function Zc(){Yt&&se("\u4E2D\u65AD"),Yt=null,ns.visible=!1,is()}var Hd=new Er;function Vc(i){let t=je.domElement.getBoundingClientRect();return new wt((i.clientX-t.left)/t.width*2-1,-((i.clientY-t.top)/t.height)*2+1)}function _x(i){let t=new F(Vc(i).x,Vc(i).y,0).unproject(oe);return{x:t.x,y:t.y}}function $d(i){let t=_x(i),n=14/(On.clientWidth/((oe.right-oe.left)/oe.zoom)),s=null,r=Zt.model.grids.filter(f=>f.axis==="X"),o=Zt.model.grids.filter(f=>f.axis==="Y");for(let f of r)for(let m of o){let x=Math.hypot(f.pos-t.x,m.pos-t.y);x<n&&(!s||x<s.d)&&(s={d:x,ref:{x:f.name,y:m.name},x:f.pos,y:m.pos})}if((!Ln||!Sn.int)&&(s=null),Ln&&(Sn.end||Sn.mid))for(let f of Zt.model.members){if(f.kind==="column"||f.story!==ae||!f.from||!f.to)continue;let m,x;try{m=il(f.from),x=il(f.to)}catch{continue}let g=[];if(Sn.end&&g.push([m.x,m.y,f.from,"\u7AEF\u70B9"],[x.x,x.y,f.to,"\u7AEF\u70B9"]),Sn.mid){let h=(m.x+x.x)/2,y=(m.y+x.y)/2;g.push([h,y,{x:h,y},"\u4E2D\u70B9"])}for(let[h,y,E,M]of g){let T=Math.hypot(h-t.x,y-t.y);T<n&&(!s||T<s.d-1)&&(s={d:T,ref:E,x:h,y,kind:M})}}if(s)return Gd({...s,snapped:!0});let a=f=>Math.round(f/50)*50,c=Ln&&Sn.line,l=c?r.find(f=>Math.abs(f.pos-t.x)<n):void 0,u=c?o.find(f=>Math.abs(f.pos-t.y)<n):void 0,p=l?l.pos:a(t.x),d=u?u.pos:a(t.y);return Gd({ref:{x:l?l.name:p,y:u?u.name:d},x:p,y:d,snapped:!!(l||u)})}function Gd(i){if(di===Wc||Yt?.type!=="beam"||!Yt.first)return i;let t;try{t=il(Yt.first)}catch{return i}return Math.abs(i.x-t.x)>=Math.abs(i.y-t.y)?{...i,y:t.y,ref:{x:i.ref.x,y:Yt.first.y},kind:"\u76F4\u4EA4"}:{...i,x:t.x,ref:{x:Yt.first.x,y:i.ref.y},kind:"\u76F4\u4EA4"}}je.domElement.addEventListener("pointermove",i=>{if(fn!=="plan"){Pi.visible=!1;return}let t=$d(i),e=hn(Zt.model,ae)?.level??0,n=7/(On.clientWidth/((oe.right-oe.left)/oe.zoom));if(Pi.visible=!!Yt||t.snapped,Pi.position.set(t.x,t.y,e+200),Pi.scale.setScalar(n),Vt("status").textContent=`X ${Math.round(t.x)}  Y ${Math.round(t.y)}  ${t.kind?t.kind:t.snapped?"\u30B9\u30CA\u30C3\u30D7: "+[t.ref.x,t.ref.y].filter(s=>typeof s=="string").join("/"):""}`,Yt?.type==="beam"&&Yt.first){let s;try{s=il(Yt.first)}catch{Yt.first=void 0,is();return}ns.geometry.setFromPoints([new F(s.x,s.y,e+200),new F(t.x,t.y,e+200)]),ns.visible=!0}});function il(i){let t=(e,n)=>{if(typeof n=="number")return n;let s=Zt.model.grids.find(r=>r.axis===e&&r.name===n);if(!s)throw new Error(`\u901A\u308A\u82AF ${n} \u304C\u3042\u308A\u307E\u305B\u3093`);return s.pos};return{x:t("X",i.x),y:t("Y",i.y)}}var Xe=null,$r=null,Jr=document.createElement("div");Jr.className="selbox";On.appendChild(Jr);je.domElement.addEventListener("contextmenu",i=>i.preventDefault());je.domElement.addEventListener("pointerdown",i=>{i.button===0&&(Xe={x:i.clientX,y:i.clientY}),i.button===2&&($r={x:i.clientX,y:i.clientY})});je.domElement.addEventListener("pointermove",i=>{if(!Xe||Yt||(i.buttons&1)===0)return;let t=i.clientX-Xe.x;if(Math.abs(t)<4&&Math.abs(i.clientY-Xe.y)<4)return;let e=On.getBoundingClientRect(),n=Math.min(Xe.x,i.clientX)-e.left,s=Math.min(Xe.y,i.clientY)-e.top;Object.assign(Jr.style,{display:"block",left:`${n}px`,top:`${s}px`,width:`${Math.abs(t)}px`,height:`${Math.abs(i.clientY-Xe.y)}px`}),Jr.classList.toggle("crossing",t<0)});function xx(i){let t=i.clone().project(Zr),e=je.domElement.getBoundingClientRect();return{x:(t.x+1)/2*e.width+e.left,y:(1-t.y)/2*e.height+e.top}}function yx(i,t,e){let n=Math.min(i.x,t.x),s=Math.max(i.x,t.x),r=Math.min(i.y,t.y),o=Math.max(i.y,t.y),a=t.x<i.x,c=u=>u.x>=n&&u.x<=s&&u.y>=r&&u.y<=o,l=[];for(let[u,p]of nl){let d=Zt.model.members.find(T=>T.id===u);if(!d||ts!=="all"&&d.kind!==ts)continue;p.geometry.computeBoundingBox();let f=p.geometry.boundingBox,m=[];for(let T of[f.min.x,f.max.x])for(let w of[f.min.y,f.max.y])for(let _ of[f.min.z,f.max.z])m.push(xx(new F(T,w,_).applyMatrix4(p.matrixWorld)));let x=m.every(c),g=Math.min(...m.map(T=>T.x)),h=Math.max(...m.map(T=>T.x)),y=Math.min(...m.map(T=>T.y)),E=Math.max(...m.map(T=>T.y)),M=h>=n&&g<=s&&E>=r&&y<=o;(a?M:x)&&l.push(u)}if(e==="set")we=new Set(l);else for(let u of l)e==="add"?we.add(u):we.delete(u);se(`${a?"\u4EA4\u5DEE":"\u7A93"}\u9078\u629E: ${l.length} \u500B`,"muted"),vn()}je.domElement.addEventListener("pointerup",i=>{if(i.button===2&&$r){let s=Math.hypot(i.clientX-$r.x,i.clientY-$r.y)>4;$r=null,s||(Yt?Zc():Li(""));return}if(i.button!==0||!Xe)return;if(!Yt&&Math.hypot(i.clientX-Xe.x,i.clientY-Xe.y)>4){Jr.style.display="none",yx(Xe,{x:i.clientX,y:i.clientY},i.ctrlKey?"remove":i.shiftKey?"add":"set"),Xe=null;return}if(Math.hypot(i.clientX-Xe.x,i.clientY-Xe.y)>4)return;if(Xe=null,Yt&&fn==="plan"){let s=$d(i);Yt.type==="column"?Nn({cmd:"column.add",args:{mark:Yt.mark,story:ae,at:s.ref}}):Yt.first?Nn({cmd:"beam.add",args:{kind:Yt.kind,mark:Yt.mark,story:ae,from:Yt.first,to:s.ref,dz:Yt.dz||void 0}}).ok&&(Yt.first=s.ref):Yt.first=s.ref,is();return}Hd.setFromCamera(Vc(i),Zr);let t=[...nl.values()].filter(s=>ts==="all"||Zt.model.members.find(r=>r.id===s.userData.id)?.kind===ts),n=Hd.intersectObjects(t)[0]?.object.userData.id;n?i.ctrlKey?we.delete(n):i.shiftKey?we.add(n):we=new Set([n]):!i.shiftKey&&!i.ctrlKey&&we.clear(),vn()});window.addEventListener("keyup",i=>{i.key==="Shift"&&(Wc=!1)});window.addEventListener("keydown",i=>{if(i.key==="Shift"&&(Wc=!0),i.key==="F3"){i.preventDefault(),Ln=!Ln,se(`\u30B9\u30CA\u30C3\u30D7 ${Ln?"\u30AA\u30F3":"\u30AA\u30D5"}`,"muted"),qs();return}if(i.key==="F8"){i.preventDefault(),di=!di,se(`\u76F4\u4EA4 ${di?"\u30AA\u30F3":"\u30AA\u30D5"}`,"muted"),qs();return}if((i.ctrlKey||i.metaKey)&&i.key==="1"){i.preventDefault(),document.querySelector("#props input, #props select")?.focus();return}let t=document.activeElement,e=t===xe||!!t?.closest?.("#props, #table")||["INPUT","SELECT","TEXTAREA","BUTTON"].includes(t?.tagName??"");i.key==="Escape"&&t!==xe&&(Yt?Zc():we.size&&(we.clear(),vn())),!e&&((i.ctrlKey||i.metaKey)&&i.key.toLowerCase()==="z"?(i.preventDefault(),Nn({cmd:"undo",args:{}})):(i.ctrlKey||i.metaKey)&&i.key.toLowerCase()==="y"?(i.preventDefault(),Nn({cmd:"redo",args:{}})):(i.ctrlKey||i.metaKey)&&i.key.toLowerCase()==="s"?(i.preventDefault(),Xd()):i.key==="Delete"&&we.size?Nn({cmd:"delete",args:{ids:[...we]}}):i.key==="Enter"||i.key===" "?(i.preventDefault(),xe.focus(),Li("")):i.key.length===1&&!i.ctrlKey&&!i.metaKey&&!i.altKey&&xe.focus())});function ui(i){fn=i,Vt("btn-plan").classList.toggle("on",i==="plan"),Vt("btn-3d").classList.toggle("on",i==="3d"),i==="3d"&&(Yt=null,ns.visible=!1,is()),vn()}function Xr(i,t,e){let n=document.createElement("a");n.href=URL.createObjectURL(new Blob([t],{type:e})),n.download=i,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),2e3)}async function Yr(i){let t=Zt.model.name.replace(/[\\/:*?"<>|\s]+/g,"_");try{if(i==="stb")Xr(`${t}.stb`,Oc(Zt.model),"application/xml"),se("\u2713 ST-Bridge \u3092\u66F8\u304D\u51FA\u3057\u307E\u3057\u305F","ok");else if(i==="set")Xr(`${t}_\u69CB\u9020\u56F3.dxf`,Ud(Zt.model),"application/dxf"),se("\u2713 \u56F3\u9762\u4E00\u5F0F\uFF08\u4F0F\u56F3\u30FB\u8EF8\u7D44\u56F3\uFF09DXF \u3092\u66F8\u304D\u51FA\u3057\u307E\u3057\u305F","ok");else if(i==="dxf")Xr(`${t}_${ae}\u4F0F\u56F3.dxf`,Fc(Zt.model,ae),"application/dxf"),se(`\u2713 ${ae}\u4F0F\u56F3 DXF \u3092\u66F8\u304D\u51FA\u3057\u307E\u3057\u305F`,"ok");else if(i==="3dm"){se("rhino3dm \u3092\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026");let n=await(await import(px)).default(),{export3dm:s}=await Promise.resolve().then(()=>(Bd(),Fd));Xr(`${t}.3dm`,s(n,Zt.model),"application/octet-stream"),se("\u2713 3dm \u3092\u66F8\u304D\u51FA\u3057\u307E\u3057\u305F","ok")}else se("export stb | dxf | 3dm","err")}catch(e){se(`\u2717 ${e.message}`,"err")}}async function Xd(){let i=JSON.stringify(Zt.model,null,1),t=window;try{if(t.showSaveFilePicker){Qi??=await t.showSaveFilePicker({suggestedName:`${Zt.model.name}.sbim.json`,types:[{description:"StructBIM",accept:{"application/json":[".json"]}}]});let e=await Qi.createWritable();await e.write(i),await e.close(),se(`\u2713 \u4FDD\u5B58: ${Qi.name}`,"ok")}else Xr(`${Zt.model.name}.sbim.json`,i,"application/json")}catch(e){e.name!=="AbortError"&&se(`\u2717 ${e.message}`,"err")}}async function Sx(){let i=window;try{let t;if(i.showOpenFilePicker){let[e]=await i.showOpenFilePicker({types:[{description:"StructBIM",accept:{"application/json":[".json"]}}]});t=await(await e.getFile()).text(),Kr(JSON.parse(t))&&(Qi=e);return}else t=await new Promise(e=>{let n=document.createElement("input");n.type="file",n.accept=".json",n.onchange=async()=>e(await n.files[0].text()),n.click()});Kr(JSON.parse(t))&&(Qi=null)}catch(t){t.name!=="AbortError"&&se(`\u2717 ${t.message}`,"err")}}function Kr(i){try{return Zt.load(i),we.clear(),ae="",Yc(),Xc(),vn(),se(`\u2713 \u8AAD\u307F\u8FBC\u307F: ${i.name}`,"ok"),!0}catch(t){return se(`\u2717 ${t.message}`,"err"),!1}}function vx(){let i=null;try{let t=localStorage.getItem(kd);t&&(i=JSON.parse(t))}catch{}try{Zt=i?new ji(i):Qa()}catch(t){i=null,Zt=Qa(),setTimeout(()=>se(`\u2717 \u81EA\u52D5\u4FDD\u5B58\u30C7\u30FC\u30BF\u304C\u58CA\u308C\u3066\u3044\u305F\u306E\u3067\u30B5\u30F3\u30D7\u30EB\u3092\u958B\u304D\u307E\u3057\u305F\uFF08${t.message}\uFF09`,"err"))}Zt.on(()=>{try{localStorage.setItem(kd,JSON.stringify(Zt.model))}catch{}vn()}),Vt("btn-plan").onclick=()=>ui("plan"),Vt("btn-3d").onclick=()=>ui("3d"),Vt("btn-open").onclick=Sx,Vt("btn-save").onclick=Xd,Vt("btn-new").onclick=()=>Li("new"),Vt("btn-sample").onclick=()=>Li("sample"),Vt("btn-stb").onclick=()=>Yr("stb"),Vt("btn-dxf").onclick=()=>Yr("dxf"),Vt("btn-3dm").onclick=()=>Yr("3dm"),Vt("btn-col").onclick=()=>{xe.value="column C1",xe.focus()},Vt("btn-beam").onclick=()=>{xe.value="beam G1",xe.focus()},Vt("btn-help").onclick=()=>Li("help"),Vt("btn-set").onclick=()=>Yr("set"),Vt("btn-table").onclick=()=>Zd();for(let t of["front","right","top","persp"]){let e=document.getElementById(`v-${t}`);e&&(e.onclick=()=>{ui("3d"),Yd(t)})}Vt("filter").onchange=t=>qd(t.target.value),qs(),Wd(),Yc(),Xc(),ui("plan"),is(),se(i?"\u524D\u56DE\u306E\u4F5C\u696D\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F\uFF08\u30D6\u30E9\u30A6\u30B6\u5185\u306E\u81EA\u52D5\u4FDD\u5B58\uFF09":"\u30B5\u30F3\u30D7\u30EB\uFF08\u67B6\u7A7A\u30C7\u30FC\u30BF\uFF09\u3092\u958B\u304D\u307E\u3057\u305F\u3002help \u3067\u30B3\u30DE\u30F3\u30C9\u4E00\u89A7","muted"),je.setAnimationLoop(()=>{je.render(Ni,Zr),sl.render(Ni,Zr)})}vx();window.sbim={run:(i,t)=>t!==void 0||i.includes(".")&&!i.includes(" ")?Zt.run(i,t??{}):(()=>{let e=Hs(i,{story:ae});return Zt.run(e.cmd,e.args)})(),model:()=>JSON.parse(JSON.stringify(Zt.model)),load:i=>Kr(i),exportStb:()=>Oc(Zt.model),exportDxf:(i=ae)=>Fc(Zt.model,i),setStory:i=>{ae=i,vn()},setView:ui,log:()=>Zt.log};if("serviceWorker"in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("./sw.js").catch(()=>{});let i=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{i&&se("\u65B0\u3057\u3044\u7248\u304C\u5C4A\u304D\u307E\u3057\u305F\uFF08\u518D\u8AAD\u307F\u8FBC\u307F\u3067\u53CD\u6620\uFF09","ok")})}function qs(){let i=document.getElementById("aids");if(!i)return;let t=(e,n,s,r)=>`<button data-aid="${e}" class="${n?"on":""}" title="${r}">${s}</button>`;i.innerHTML=t("osnap",Ln,"\u30B9\u30CA\u30C3\u30D7","F3: \u5168\u30B9\u30CA\u30C3\u30D7\u306E\u5207\u66FF")+t("int",Sn.int,"\u4EA4\u70B9","\u901A\u308A\u82AF\u306E\u4EA4\u70B9")+t("line",Sn.line,"\u901A\u308A","\u901A\u308A\u82AF\u4E0A")+t("end",Sn.end,"\u7AEF\u70B9","\u6881\u306E\u7AEF\u70B9")+t("mid",Sn.mid,"\u4E2D\u70B9","\u6881\u306E\u4E2D\u70B9")+t("ortho",di,"\u76F4\u4EA4","F8 / Shift\u3067\u4E00\u6642\u5207\u66FF")}document.addEventListener("click",i=>{let t=i.target.closest("[data-aid]");if(!t)return;let e=t.dataset.aid;e==="osnap"?Ln=!Ln:e==="ortho"?di=!di:Sn[e]=!Sn[e],qs()});function Yd(i){let t=$c(Zt.model),e=(t.x0+t.x1)/2,n=(t.y0+t.y1)/2,s=(t.z0+t.z1)/2,r=Math.max(t.x1-t.x0,t.y1-t.y0,t.z1-t.z0)*1.8+6e3,o={front:[e,n-r,s],right:[e+r,n,s],top:[e,n-1,s+r],persp:[e-r*.8,n-r*1.1,s+r*.7]},a=o[i]??o.persp;es.position.set(...a),Xs.target.set(e,n,s),Xs.update(),se(`\u30D3\u30E5\u30FC: ${{front:"\u6B63\u9762",right:"\u53F3\u5074\u9762",top:"\u4E0A\u9762",persp:"\u30D1\u30FC\u30B9"}[i]??i}`,"muted")}function qd(i){ts=["all","column","girder","beam"].includes(i)?i:"all";let t=document.getElementById("filter");t&&(t.value=ts),se(`\u9078\u629E\u30D5\u30A3\u30EB\u30BF: ${{all:"\u5168\u3066",column:"\u67F1",girder:"\u5927\u6881",beam:"\u5C0F\u6881"}[ts]}`,"muted")}var Vs="grid";function Zd(){let i=Vt("table");i.style.display=i.style.display==="block"?"none":"block",rl()}function rl(){let i=document.getElementById("table");if(!i||i.style.display!=="block")return;let t=Zt.model,e={grid:"\u901A\u308A\u82AF",story:"\u968E",section:"\u65AD\u9762",member:`\u90E8\u6750\uFF08${ae}\uFF09`},n=["grid","story","section","member"].map(o=>`<button data-tab="${o}" class="${Vs===o?"on":""}">${Ht(e[o])}</button>`).join(""),s=(o,a)=>`<td><input ${a} value="${Ht(String(o??""))}"></td>`,r="";Vs==="grid"&&(r="<tr><th>\u65B9\u5411</th><th>\u540D\u524D</th><th>\u4F4D\u7F6E mm</th></tr>"+t.grids.map(o=>`<tr><td>${o.axis}</td>${s(o.name,`data-cmd="grid.set" data-id="${Ht(o.id)}" data-k="name"`)}${s(o.pos,`data-cmd="grid.set" data-id="${Ht(o.id)}" data-k="pos"`)}</tr>`).join("")),Vs==="story"&&(r="<tr><th>\u540D\u524D</th><th>FL mm</th></tr>"+Dn(t).map(o=>`<tr>${s(o.name,`data-cmd="story.set" data-id="${Ht(o.id)}" data-k="name"`)}${s(o.level,`data-cmd="story.set" data-id="${Ht(o.id)}" data-k="level"`)}</tr>`).join("")),Vs==="section"&&(r="<tr><th>\u7B26\u53F7</th><th>\u7A2E\u5225</th><th>\u968E</th><th>\u65AD\u9762</th></tr>"+t.sections.map(o=>`<tr><td>${Ht(o.mark)}</td><td>${Ht(o.kind)}</td><td>${Ht(o.story)}</td>${s(Bs(o.shape).replace("\u25A1-","BOX-"),`data-cmd="section" data-mark="${Ht(o.mark)}" data-kind="${Ht(o.kind)}" data-story="${Ht(o.story)}"`)}</tr>`).join("")),Vs==="member"&&(r="<tr><th>id</th><th>\u7A2E\u5225</th><th>\u7B26\u53F7</th><th>\u5929\u7AEF dz</th></tr>"+t.members.filter(o=>o.story===ae).map(o=>`<tr data-row="${Ht(o.id)}" class="${we.has(o.id)?"cur":""}"><td>${Ht(o.id)}</td><td>${Ht(o.kind)}</td>${s(o.mark,`data-cmd="member.set" data-id="${Ht(o.id)}" data-k="mark"`)}${o.kind==="column"?"<td></td>":s(o.dz??0,`data-cmd="member.set" data-id="${Ht(o.id)}" data-k="dz"`)}</tr>`).join("")),i.innerHTML=`<div class="tabs">${n}<span class="muted">\u30BB\u30EB\u3092\u66F8\u304D\u63DB\u3048\u3066Enter\u3067\u78BA\u5B9A\uFF08\u30B3\u30DE\u30F3\u30C9\u3068\u3057\u3066\u8A18\u9332\u30FBUndo\u53EF\uFF09</span></div><div class="tw"><table>${r}</table></div>`}Vt("table").addEventListener("click",i=>{let t=i.target.closest("[data-tab]");if(t){Vs=t.dataset.tab,rl();return}let e=i.target.closest("[data-row]");e&&i.target.tagName!=="INPUT"&&(we=new Set([e.dataset.row]),vn())});Vt("table").addEventListener("change",i=>{let t=i.target,e=t.dataset;if(e.cmd==="section")try{Nn({cmd:"section.add",args:{mark:e.mark,kind:e.kind,story:e.story,shape:Hs(`section X column ${t.value}`).args.shape}})}catch(n){se(`\u2717 ${n.message}`,"err")}else e.cmd&&Nn({cmd:e.cmd,args:{id:e.id,[e.k]:t.value}});rl()});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
