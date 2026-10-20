const tile=(s,x,y,z,size=14,mat='blue')=>{
  s.box(x,y,z,size,size,8,mat,3);
  s.box(x+4,y+4,z+8,size-8,size-8,1,'white',1);
};
const arc=(s,cx,cy,z,r,a,b,mat='blue',width=4)=>{
  const p=Array.from({length:33},(_,i)=>{const t=(a+(b-a)*i/32)*Math.PI/180;return[cx+r*Math.cos(t),cy+r*Math.sin(t),z]});
  s.line(p,mat,width);
  const end=p.at(-1),t=b*Math.PI/180,sign=Math.sign(b-a),vx=-Math.sin(t)*sign,vy=Math.cos(t)*sign;
  s.poly([end,[end[0]-7*vx+4*vy,end[1]-7*vy-4*vx,z],[end[0]-7*vx-4*vy,end[1]-7*vy+4*vx,z]],mat);
};
export const coreIcons = [
  {id:'agent',name:'AI Agent',category:'Agents & control',description:'An autonomous compute unit with a sensing port and an active decision core.',draw(s){
    s.box(-23,-20,0,46,40,7,'neutral',5);
    s.box(-19,-16,7,38,32,25,'blue',5);
    s.box(-12,-9,32,24,18,3,'white',3);
    s.line([[-8,0,35],[0,0,35],[0,-5,35],[8,-5,35]],'blue',2);
    s.dot([-8,0,35],2,'blue');s.dot([8,-5,35],2,'blue');
    s.panel(-11,16.1,15,22,9,'ink');
    s.line([[-5,16.2,19.5],[5,16.2,19.5]],'white',2);
    s.dot([15,16.2,11],1.6,'teal');
  }},
  {id:'multi-agent',name:'Multi-Agent Swarm',category:'Agents & control',description:'Three peer compute nodes coordinate through a shared network junction.',draw(s){
    s.line([[0,-18,2],[0,4,2],[-22,19,2]],'ink',2);
    s.line([[0,4,2],[22,19,2]],'ink',2);
    tile(s,-8,-30,2,16,'purple');tile(s,-31,14,2,16,'blue');tile(s,15,14,2,16,'teal');
    s.cylinder(0,4,0,6,4,'coral');
  }},
  {id:'task',name:'Task Card',category:'Agents & control',description:'A dimensional task card with a completed item and a short work queue.',draw(s){
    s.box(-22,-10,0,44,30,5,'neutral',4);
    s.panel(-21,5,5,42,49,'white');
    s.panel(-9,5.2,47,18,8,'purple');
    s.poly([[-15,5.2,31],[-5,5.2,31],[-5,5.2,41],[-15,5.2,41]],'teal');
    s.line([[-13,5.4,36],[-10,5.4,33],[-6.5,5.4,39]],'white',2);
    s.line([[1,5.3,38],[14,5.3,38]],'ink',2);
    s.line([[1,5.3,33],[10,5.3,33]],'neutral',1.8);
    s.line([[-14,5.3,23],[13,5.3,23]],'ink',2);
    s.line([[-14,5.3,16],[5,5.3,16]],'neutral',1.8);
  }},
  {id:'goal',name:'Goal / Objective',category:'Agents & control',description:'A concentric objective dial with a precise marker reaching its center.',draw(s){
    s.cylinder(0,0,0,29,7,'neutral');
    s.cylinder(0,0,7,25,2,'white');
    s.ring(0,0,9.1,19,'blue',3);
    s.ring(0,0,9.2,11,'purple',3);
    s.cylinder(0,0,9,4,2,'coral');
    // One axis for the point, shaft, and attached vanes. The transverse
    // direction keeps the head broad and legible in the isometric camera.
    const arrow=(t,side=0)=>[17*t+0.68*side,-17*t-0.13*side,11+24*t-0.67*side];
    for(const side of [-1,1]) {
      s.poly([arrow(.73),arrow(.86,3.4*side),arrow(1,3.4*side),arrow(.91)],'coral');
    }
    s.line([arrow(.27),arrow(1.05)],'ink',2.6);
    s.poly([arrow(0),arrow(.27,5),arrow(.27,-5)],'coral');
  }},
  {id:'feedback-loop',name:'Feedback Loop',category:'Agents & control',description:'A circular feedback track around a stable system node.',draw(s){
    s.cylinder(0,0,0,28,5,'neutral');
    arc(s,0,0,6,22,20,170,'blue',3.3);
    arc(s,0,0,6,22,200,350,'teal',3.3);
    tile(s,-8,-8,5,16,'purple');
  }},
  {id:'recursive-loop',name:'Recursive Loop',category:'Agents & control',description:'Nested cycles repeat the same operation at two scales.',draw(s){
    s.cylinder(0,0,0,29,4,'neutral');
    arc(s,0,0,5,24,25,335,'blue',3);
    s.cylinder(0,0,4,14,5,'white');
    arc(s,0,0,10,10,35,325,'purple',2.6);
    s.cylinder(0,0,9,3,3,'coral');
  }},
  {id:'reflection',name:'Self-Reflection',category:'Agents & control',description:'A compute module faces a mirror containing its own geometric representation.',draw(s){
    s.box(-27,-20,0,54,40,4,'neutral',4);
    s.panel(-22,-10,4,44,43,'purple');
    s.panel(-18,-9.8,8,36,34,'white');
    s.poly([[-7,-9.5,17],[4,-9.5,17],[4,-9.5,29],[-7,-9.5,29]],'purple');
    s.line([[-13,-9.4,31],[-5,-9.4,38]],'neutral',2);
    s.line([[7,-9.4,12],[14,-9.4,18]],'neutral',2);
    tile(s,-5,5,4,20,'blue');
  }},
  {id:'asi-core',name:'Superintelligence Core',category:'Frontier systems',description:'A central crystalline compute core unifies four surrounding signal channels.',draw(s){
    s.box(-26,-26,0,52,52,5,'neutral',5);
    s.line([[-23,0,5],[23,0,5]],'blue',2);
    s.line([[0,-23,5],[0,23,5]],'blue',2);
    s.cylinder(0,0,5,18,5,'purple');
    // An octahedral central node: distinct from the standard processor modules.
    const top=[0,0,47],bottom=[0,0,10],left=[-17,0,28],back=[0,-17,28],right=[17,0,28],front=[0,17,28];
    s.poly([top,back,right],'purple');s.poly([top,left,front],'blue');s.poly([top,front,right],'teal');
    s.poly([bottom,left,front],'blue');s.poly([bottom,front,right],'purple');
    for(const [x,y] of [[-23,0],[23,0],[0,-23],[0,23]]) s.dot([x,y,5],2,'coral');
  }},
  {id:'monitoring',name:'Monitoring / Observability',category:'Frontier systems',description:'An instrument screen combines a live signal trace with status indicators.',draw(s){
    s.box(-16,-4,0,32,24,4,'neutral',3);
    s.box(-4,0,4,8,8,10,'purple',1);
    s.panel(-29,4,14,58,35,'neutral');
    s.panel(-25,4.2,18,50,27,'white');
    s.line([[-20,4.5,29],[-13,4.5,29],[-8,4.5,37],[-2,4.5,23],[4,4.5,32],[11,4.5,32]],'blue',2.4);
    s.line([[16,4.5,23],[20,4.5,23],[20,4.5,36],[16,4.5,36]],'purple',2);
    s.dot([-21,4.5,40],1.6,'teal');s.dot([-15,4.5,40],1.6,'coral');
  }},
  {id:'mixture-of-experts',name:'Mixture of Experts',category:'Frontier systems',description:'A router selects specialized expert modules through a branching signal bus.',draw(s){
    s.line([[-24,-17,2],[-24,5,2],[24,5,2],[24,-17,2]],'ink',1.8);
    s.line([[0,-17,2],[0,25,2]],'ink',1.8);
    tile(s,-33,-30,2,18,'blue');tile(s,-9,-30,2,18,'purple');tile(s,15,-30,2,18,'teal');
    s.line([[0,5,2],[24,5,2],[24,-12,2]],'coral',2.8);
    s.box(-12,17,0,24,19,10,'neutral',3);
    s.poly([[-6,22,10],[6,22,10],[0,30,10]],'coral');
  }},
  {id:'distillation',name:'Model Distillation',category:'Frontier systems',description:'A broad teacher model is compressed through a tapered transfer stage into a smaller student.',draw(s){
    s.box(-22,-22,33,44,44,7,'purple',4);
    for(const x of [-12,3]) for(const y of [-12,3]) s.box(x,y,40,9,9,1,'white',1);
    s.poly([[-20,18,33],[20,18,33],[7,7,15],[-7,7,15]],'blue');
    s.poly([[20,18,33],[20,-18,33],[7,-7,15],[7,7,15]],'teal');
    s.box(-10,-10,3,20,20,12,'blue',3);
    s.box(-5,-5,15,10,10,1,'white',1);
  }},
  {id:'world-model',name:'World Model',category:'Frontier systems',description:'A small simulated environment contains terrain, structures, and a coordinate grid.',draw(s){
    s.box(-28,-28,0,56,56,5,'neutral',4);
    for(const p of [-14,0,14]) {
      s.line([[p,-25,5],[p,25,5]],'neutral',1.2);
      s.line([[-25,p,5],[25,p,5]],'neutral',1.2);
    }
    s.box(-18,-18,5,15,15,22,'purple',2);
    s.box(4,-17,5,17,14,11,'blue',2);
    s.poly([[-16,8,5],[2,8,5],[-7,8,25]],'teal');
    s.poly([[2,8,5],[2,21,5],[-7,8,25]],'blue');
    s.cylinder(15,16,5,5,3,'coral');
  }},
];
