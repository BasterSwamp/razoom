// Garden Gnome Software - Skin
// Pano2VR 6.1.14/18105
// Filename: clinic_02.ggsk
// Generated 2024-05-22T08:18:17

function pano2vrSkin(player,base) {
	player.addVariable('category_visible', 2, false);
	player.addVariable('node_visible', 2, false);
	player.addVariable('opt_3d_preview', 2, true);
	player.addVariable('vis_info_popup', 2, false);
	player.addVariable('var_hs', 1, 0);
	player.addVariable('vis_image_popup', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._instructionbox=document.createElement('div');
		els=me._instructionbox__img=document.createElement('img');
		els.className='ggskin ggskin_instructionbox';
		hs=basePath + 'images/instructionbox.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="instruction-box";
		el.ggDx=4;
		el.ggDy=-20;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 392px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 303px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._instructionbox.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._instructionbox.onclick=function (e) {
			me._instructionbox.ggVisible = !me._instructionbox.ggVisible;
			var flag=me._instructionbox.ggVisible;
			me._instructionbox.style[domTransition]='none';
			me._instructionbox.style.visibility=((flag)&&(Number(me._instructionbox.style.opacity)>0||!me._instructionbox.style.opacity))?'inherit':'hidden';
		}
		me._instructionbox.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._instructionbox);
		el=me._loading_container=document.createElement('div');
		el.ggId="loading_container";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 65px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 30px;';
		hs+='visibility : inherit;';
		hs+='width : 192px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_container.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading_container.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._loading_text0=document.createElement('div');
		els=me._loading_text0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loading_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 67px;';
		hs+='left : 8px;';
		hs+='position : absolute;';
		hs+='top : 9px;';
		hs+='visibility : inherit;';
		hs+='width : 177px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #ffffff;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loading_text0.ggUpdateText=function() {
			var hs="\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u0437\u0430\u0447\u0435\u043a\u0430\u0439\u0442\u0435,<br\/>\u0456\u0434\u0435 \u0437\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f <br\/>"+(player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loading_text0.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loading_text0.ggUpdateText();
		});
		el.appendChild(els);
		me._loading_text0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_text0.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((175-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._loading_container.appendChild(me._loading_text0);
		el=me._loading_text=document.createElement('div');
		els=me._loading_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loading_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 67px;';
		hs+='left : 7px;';
		hs+='position : absolute;';
		hs+='top : 8px;';
		hs+='visibility : inherit;';
		hs+='width : 177px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #ffffff;';
		hs+='color: rgba(224,224,224,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loading_text.ggUpdateText=function() {
			var hs="\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u0437\u0430\u0447\u0435\u043a\u0430\u0439\u0442\u0435,<br\/>\u0456\u0434\u0435 \u0437\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f <br\/>"+(player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loading_text.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loading_text.ggUpdateText();
		});
		el.appendChild(els);
		me._loading_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_text.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((175-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._loading_container.appendChild(me._loading_text);
		me.divSkin.appendChild(me._loading_container);
		el=me._controlspanel=document.createElement('div');
		el.ggId="controls-panel";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : #e0e0e0;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : -82px;';
		hs+='cursor : default;';
		hs+='height : 135px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 305px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._controlspanel.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controlspanel.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._controlspanel);
		el=me._toolbar02=document.createElement('div');
		el.ggId="toolbar02";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : -76px;';
		hs+='height : 47px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.69999;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 4640px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._toolbar02.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._toolbar02.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._pan_title_shadow3=document.createElement('div');
		els=me._pan_title_shadow3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title_shadow";
		el.ggDx=3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 128px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title_shadow3.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title_shadow3.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title_shadow3.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title_shadow3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title_shadow3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._toolbar02.appendChild(me._pan_title_shadow3);
		el=me._pan_title3=document.createElement('div');
		els=me._pan_title3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 129px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title3.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title3.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title3.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._toolbar02.appendChild(me._pan_title3);
		el=me._pano_next0=document.createElement('div');
		els=me._pano_next0__img=document.createElement('img');
		els.className='ggskin ggskin_pano_next0';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Pano Next";
		el.ggDx=72;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._pano_next0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pano_next0.onclick=function (e) {
			player.openNext("{"+player.getNextNode()+"}","");
		}
		me._pano_next0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar02.appendChild(me._pano_next0);
		el=me._pano_prev0=document.createElement('div');
		els=me._pano_prev0__img=document.createElement('img');
		els.className='ggskin ggskin_pano_prev0';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Pano Prev";
		el.ggDx=-69;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._pano_prev0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pano_prev0.onclick=function (e) {
			player.openNext("{"+player.getPrevNode()+"}","");
		}
		me._pano_prev0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar02.appendChild(me._pano_prev0);
		el=me._help1=document.createElement('div');
		els=me._help1__img=document.createElement('img');
		els.className='ggskin ggskin_help1';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="help";
		el.ggDx=-22;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._help1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._help1.onclick=function (e) {
			me._instructionbox.ggVisible = !me._instructionbox.ggVisible;
			var flag=me._instructionbox.ggVisible;
			me._instructionbox.style[domTransition]='none';
			me._instructionbox.style.visibility=((flag)&&(Number(me._instructionbox.style.opacity)>0||!me._instructionbox.style.opacity))?'inherit':'hidden';
		}
		me._help1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar02.appendChild(me._help1);
		el=me._vr=document.createElement('div');
		els=me._vr__img=document.createElement('img');
		els.className='ggskin ggskin_vr';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="vr";
		el.ggDx=25;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._vr.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._vr.onclick=function (e) {
			player.enterVR();
		}
		me._vr.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar02.appendChild(me._vr);
		me.divSkin.appendChild(me._toolbar02);
		el=me._toolbar03=document.createElement('div');
		el.ggId="toolbar03";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : -76px;';
		hs+='height : 47px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.69999;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 4640px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._toolbar03.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._toolbar03.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._pan_title_shadow2=document.createElement('div');
		els=me._pan_title_shadow2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title_shadow";
		el.ggDx=3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 162px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title_shadow2.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title_shadow2.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title_shadow2.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title_shadow2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title_shadow2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._toolbar03.appendChild(me._pan_title_shadow2);
		el=me._pan_title2=document.createElement('div');
		els=me._pan_title2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 163px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title2.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title2.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title2.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._toolbar03.appendChild(me._pan_title2);
		el=me._pano_next=document.createElement('div');
		els=me._pano_next__img=document.createElement('img');
		els.className='ggskin ggskin_pano_next';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Pano Next";
		el.ggDx=72;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._pano_next.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pano_next.onclick=function (e) {
			player.openNext("{"+player.getNextNode()+"}","");
		}
		me._pano_next.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar03.appendChild(me._pano_next);
		el=me._pano_prev=document.createElement('div');
		els=me._pano_prev__img=document.createElement('img');
		els.className='ggskin ggskin_pano_prev';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Pano Prev";
		el.ggDx=-69;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._pano_prev.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pano_prev.onclick=function (e) {
			player.openNext("{"+player.getPrevNode()+"}","");
		}
		me._pano_prev.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar03.appendChild(me._pano_prev);
		el=me._help0=document.createElement('div');
		els=me._help0__img=document.createElement('img');
		els.className='ggskin ggskin_help0';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="help";
		el.ggDx=-22;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._help0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._help0.onclick=function (e) {
			me._instructionbox.ggVisible = !me._instructionbox.ggVisible;
			var flag=me._instructionbox.ggVisible;
			me._instructionbox.style[domTransition]='none';
			me._instructionbox.style.visibility=((flag)&&(Number(me._instructionbox.style.opacity)>0||!me._instructionbox.style.opacity))?'inherit':'hidden';
		}
		me._help0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar03.appendChild(me._help0);
		el=me._full_screen=document.createElement('div');
		els=me._full_screen__img=document.createElement('img');
		els.className='ggskin ggskin_full_screen';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="full_screen";
		el.ggDx=25;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._full_screen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._full_screen.onclick=function (e) {
			player.enterFullscreen();
			player.exitFullscreen();
		}
		me._full_screen.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar03.appendChild(me._full_screen);
		me.divSkin.appendChild(me._toolbar03);
		el=me._toolbar04=document.createElement('div');
		el.ggId="toolbar04";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : -76px;';
		hs+='height : 47px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.69999;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 4640px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._toolbar04.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._toolbar04.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._pan_title_shadow1=document.createElement('div');
		els=me._pan_title_shadow1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title_shadow";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 162px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title_shadow1.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title_shadow1.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title_shadow1.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title_shadow1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title_shadow1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._toolbar04.appendChild(me._pan_title_shadow1);
		el=me._pan_title1=document.createElement('div');
		els=me._pan_title1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 163px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title1.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title1.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title1.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._toolbar04.appendChild(me._pan_title1);
		el=me._help=document.createElement('div');
		els=me._help__img=document.createElement('img');
		els.className='ggskin ggskin_help';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="help";
		el.ggDx=116;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._help.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._help.onclick=function (e) {
			me._instructionbox.ggVisible = !me._instructionbox.ggVisible;
			var flag=me._instructionbox.ggVisible;
			me._instructionbox.style[domTransition]='none';
			me._instructionbox.style.visibility=((flag)&&(Number(me._instructionbox.style.opacity)>0||!me._instructionbox.style.opacity))?'inherit':'hidden';
		}
		me._help.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar04.appendChild(me._help);
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggDx=-119;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_1.onclick=function (e) {
				player.playSound("Element01","1");
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar04.appendChild(me._image_1);
		el=me._image_2=document.createElement('div');
		els=me._image_2__img=document.createElement('img');
		els.className='ggskin ggskin_image_2';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 2";
		el.ggDx=-72;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_2.onclick=function (e) {
				player.pauseSound("Element01");
		}
		me._image_2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar04.appendChild(me._image_2);
		el=me._image_3=document.createElement('div');
		els=me._image_3__img=document.createElement('img');
		els.className='ggskin ggskin_image_3';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 3";
		el.ggDx=-25;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_3.onclick=function (e) {
			player.openNext("{"+player.getPrevNode()+"}","");
		}
		me._image_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar04.appendChild(me._image_3);
		el=me._image_4=document.createElement('div');
		els=me._image_4__img=document.createElement('img');
		els.className='ggskin ggskin_image_4';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 4";
		el.ggDx=22;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_4.onclick=function (e) {
			player.openNext("{"+player.getNextNode()+"}","");
		}
		me._image_4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar04.appendChild(me._image_4);
		el=me._image_5=document.createElement('div');
		els=me._image_5__img=document.createElement('img');
		els.className='ggskin ggskin_image_5';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 5";
		el.ggDx=69;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 82px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_5.onclick=function (e) {
			player.enterFullscreen();
			player.exitFullscreen();
		}
		me._image_5.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._toolbar04.appendChild(me._image_5);
		el=me._media_controls=document.createElement('div');
		el.ggId="media_controls";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 132px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 285px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._media_controls.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._media_controls.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._media_seekbar=document.createElement('div');
		me._media_seekbar__playhead=document.createElement('div');
		me._media_seekbar.mediaEl = null;
		me._media_seekbar.fromBufferSource = false;
		el.ggId="media_seekbar";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_seekbar ";
		el.ggType='seekbar';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 14px;';
		hs+='left : 5px;';
		hs+='opacity : 0.49999;';
		hs+='position : absolute;';
		hs+='top : 6px;';
		hs+='visibility : inherit;';
		hs+='width : 273px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._media_seekbar.connectToMediaEl = function() {
			var disableSeekbar = function() {
				me._media_seekbar__playhead.style.visibility = 'hidden';
				me._media_seekbar.style.background = '#d1d1d3';
				me._media_seekbar.ggConnected = false;
			}
			if (me._media_seekbar.mediaEl != null) {
				if (me._media_seekbar.fromBufferSource) {
					player.removeEventListener('bufferSoundTimeupdate', me._media_seekbar.updatePlayback);
					if (me._media_seekbar.ggActivate) {
						player.removeEventListener('bufferSoundPlay', me._media_seekbar.bufferSoundActivate);
					}
					if (me._media_seekbar.ggDeactivate) {
						player.removeEventListener('bufferSoundPause', me._media_seekbar.bufferSoundDeactivate);
						player.removeEventListener('bufferSoundStop', me._media_seekbar.bufferSoundDeactivate);
						player.removeEventListener('bufferSoundEnded', me._media_seekbar.bufferSoundDeactivate);
					}
					if (me._media_seekbar.ggMediaEnded) {
						player.removeEventListener('bufferSoundEnded', me._media_seekbar.bufferSoundMediaEnded);
					}
				} else {
					me._media_seekbar.mediaEl.removeEventListener('progress', me._media_seekbar.updatePlayback);
					me._media_seekbar.mediaEl.removeEventListener('canplay', me._media_seekbar.updatePlayback);
					me._media_seekbar.mediaEl.removeEventListener('timeupdate', me._media_seekbar.updatePlayback);
					if (me._media_seekbar.ggActivate) {
						me._media_seekbar.mediaEl.removeEventListener('play', me._media_seekbar.ggActivate);
					}
					if (me._media_seekbar.ggDeactivate) {
						me._media_seekbar.mediaEl.removeEventListener('ended', me._media_seekbar.ggDeactivate);
						me._media_seekbar.mediaEl.removeEventListener('pause', me._media_seekbar.ggDeactivate);
					}
					if (me._media_seekbar.ggMediaEnded) {
						me._media_seekbar.mediaEl.removeEventListener('ended', me._media_seekbar.ggMediaEnded);
					}
				}
			}
			me._media_seekbar.mediaEl = player.getMediaObject('Element01');
			if (me._media_seekbar.mediaEl) {
				me._media_seekbar.fromBufferSource = false;
			} else {
				me._media_seekbar.mediaEl = player.getMediaBufferSourceObject('Element01');
				me._media_seekbar.fromBufferSource = true;
			}
			if (me._media_seekbar.mediaEl != null) {
				me._media_seekbar__playhead.style.visibility = 'inherit';
				me._media_seekbar__playhead.style.left = '-2px';
				if (me._media_seekbar.fromBufferSource) {
					player.addListener('bufferSoundTimeupdate', me._media_seekbar.updatePlayback);
					if (me._media_seekbar.ggActivate) {
						me._media_seekbar.bufferSoundActivate = function(args) { if (args['id'] == me._media_seekbar.mediaEl.id) me._media_seekbar.ggActivate(); };
						player.addListener('bufferSoundPlay', me._media_seekbar.bufferSoundActivate);
					}
					if (me._media_seekbar.ggDeactivate) {
						me._media_seekbar.bufferSoundDeactivate = function(args) { if (args['id'] == me._media_seekbar.mediaEl.id) me._media_seekbar.ggDeactivate(); };
						player.addListener('bufferSoundPause', me._media_seekbar.bufferSoundDeactivate);
						player.addListener('bufferSoundStop', me._media_seekbar.bufferSoundDeactivate);
						player.addListener('bufferSoundEnded', me._media_seekbar.bufferSoundDeactivate);
					}
					if (me._media_seekbar.ggMediaEnded) {
						me._media_seekbar.bufferSoundMediaEnded = function(args) { if (args['id'] == me._media_seekbar.mediaEl.id) me._media_seekbar.ggMediaEnded(); };
						player.addListener('bufferSoundEnded', me._media_seekbar.bufferSoundMediaEnded);
					}
				} else {
					me._media_seekbar.mediaEl.addEventListener('progress', me._media_seekbar.updatePlayback);
					me._media_seekbar.mediaEl.addEventListener('canplay', me._media_seekbar.updatePlayback);
					me._media_seekbar.mediaEl.addEventListener('timeupdate', me._media_seekbar.updatePlayback);
					if (me._media_seekbar.ggActivate) {
						me._media_seekbar.mediaEl.addEventListener('play', me._media_seekbar.ggActivate);
					}
					if (me._media_seekbar.ggDeactivate) {
						me._media_seekbar.mediaEl.addEventListener('ended', me._media_seekbar.ggDeactivate);
						me._media_seekbar.mediaEl.addEventListener('pause', me._media_seekbar.ggDeactivate);
					}
					if (me._media_seekbar.ggMediaEnded) {
						me._media_seekbar.mediaEl.addEventListener('ended', me._media_seekbar.ggMediaEnded);
					}
				}
				me._media_seekbar.ggConnected = true;
			} else {
				disableSeekbar();
			}
			var videoEl = me.findElements('Element01');
			if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
				disableSeekbar();
			}
		}
		me._media_seekbar.updatePlayback = function(args) {
			if (!me._media_seekbar.ggConnected) return;
			if (me._media_seekbar.mediaEl != null) {
				if (me._media_seekbar.mediaEl.readyState || (me._media_seekbar.fromBufferSource && args && args['id'] == me._media_seekbar.mediaEl.id)) {
					if (me._media_seekbar.fromBufferSource) {
						var percent = me._media_seekbar.mediaEl.bufferSoundCurrentTime() / me._media_seekbar.mediaEl.bufferSoundDuration();
					} else {
						var percent = me._media_seekbar.mediaEl.currentTime / me._media_seekbar.mediaEl.duration;
					}
					percent = Math.min(percent, 1.0);
					var playheadpos = Math.round((me._media_seekbar.clientWidth - 2 * 5 + 0) * percent);
					playheadpos += -2;
					me._media_seekbar__playhead.style.left = playheadpos.toString() + 'px';
					var offsetPercent = Math.round(100.0 * (5 / me._media_seekbar.clientWidth));
					var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
					var gradientString ='linear-gradient(90deg, rgba(204,0,0,1) 0%, rgba(204,0,0,1) ' + currPos + '%';
					if (me._media_seekbar.fromBufferSource) {
						gradientString += ', rgba(178,178,181,1) ' + currPos +'%, rgba(178,178,181,1) 100%';
					} else {
						for (var i = 0; i < me._media_seekbar.mediaEl.buffered.length; i++) {
							var rangeStart = Math.round((me._media_seekbar.mediaEl.buffered.start(i) / me._media_seekbar.mediaEl.duration) * 100.0);
							var rangeEnd = Math.ceil((me._media_seekbar.mediaEl.buffered.end(i) / me._media_seekbar.mediaEl.duration) * 100.0);
							if (rangeEnd > currPos) {
								if (rangeStart < currPos) {
									gradientString += ', rgba(178,178,181,1) ' + currPos + '%';
								} else {
									gradientString += ', #d1d1d3 ' + currPos + '%, #d1d1d3 ' + rangeStart + '%';
									gradientString += ', rgba(178,178,181,1) ' + rangeStart + '%';
								}
									gradientString += ', rgba(178,178,181,1) ' + rangeEnd + '%';
								currPos = rangeEnd;
							}
						}
						if (currPos < 100) {
							gradientString += ', rgba(209,209,211,1) ' + currPos + '%';
						}
					}
					gradientString += ')';
					me._media_seekbar.style.background = gradientString;
				}
			}
		}
		me._media_seekbar.appendChild(me._media_seekbar__playhead);
		hs+='background: #d1d1d3;';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		var hs_playhead = 'height: 14px;';
		hs_playhead += 'width: 14px;';
		hs_playhead += 'border: 0px;';
		hs_playhead += 'position: absolute;';
		hs_playhead += 'left: -2px;';
		hs_playhead += 'top: 0px;';
		hs_playhead += 'border-radius: 7;';
		hs_playhead += cssPrefix + 'border-radius: 7px;';
		hs_playhead += 'background-color: rgba(255,255,255,1);';
		hs_playhead += 'pointer-events: none;';
		me._media_seekbar.setAttribute('style', hs);
		me._media_seekbar__playhead.setAttribute('style', hs_playhead);
		me._media_seekbar.ggIsActive=function() {
			if (me._media_seekbar.mediaEl != null) {
				return (me._media_seekbar.mediaEl.paused == false && me._media_seekbar.mediaEl.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._media_seekbar.onmousedown=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._media_seekbar.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._media_seekbar.fromBufferSource) {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._media_seekbar.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._media_seekbar.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.duration;
						if (!isNaN(seekpos)) me._media_seekbar.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._media_seekbar.onmouseup=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._media_seekbar.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._media_seekbar.fromBufferSource) {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._media_seekbar.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._media_seekbar.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.duration;
						if (!isNaN(seekpos)) me._media_seekbar.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._media_seekbar.onmousemove=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._media_seekbar.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._media_seekbar.fromBufferSource) {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._media_seekbar.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._media_seekbar.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.duration;
						if (!isNaN(seekpos)) me._media_seekbar.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._media_seekbar.ontouchend=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._media_seekbar.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._media_seekbar.fromBufferSource) {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._media_seekbar.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._media_seekbar.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._media_seekbar.clientWidth) * me._media_seekbar.mediaEl.duration;
						if (!isNaN(seekpos)) me._media_seekbar.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._media_seekbar.ggUpdatePosition=function (useTransition) {
			me._media_seekbar.updatePlayback();
		}
		me._media_seekbar.ggNodeChange=function () {
			me._media_seekbar.connectToMediaEl();
		}
		me._media_controls.appendChild(me._media_seekbar);
		me._toolbar04.appendChild(me._media_controls);
		me.divSkin.appendChild(me._toolbar04);
		el=me._screentint_info=document.createElement('div');
		el.ggId="screentint_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint_info.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint_info.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_info_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._screentint_info.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._screentint_info.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._screentint_info.style[domTransition]='';
				if (me._screentint_info.ggCurrentLogicStateVisible == 0) {
					me._screentint_info.style.visibility=(Number(me._screentint_info.style.opacity)>0||!me._screentint_info.style.opacity)?'inherit':'hidden';
					me._screentint_info.ggVisible=true;
				}
				else {
					me._screentint_info.style.visibility="hidden";
					me._screentint_info.ggVisible=false;
				}
			}
		}
		me._screentint_info.onclick=function (e) {
			player.setVariableValue('vis_info_popup', false);
			me._info_title.ggText="";
			me._info_title.ggTextDiv.innerHTML=me._info_title.ggText;
			if (me._info_title.ggUpdateText) {
				me._info_title.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._info_title.ggUpdatePosition) {
				me._info_title.ggUpdatePosition();
			}
			me._info_title.ggTextDiv.scrollTop = 0;
			me._info_text_body.ggText="";
			me._info_text_body.ggTextDiv.innerHTML=me._info_text_body.ggText;
			if (me._info_text_body.ggUpdateText) {
				me._info_text_body.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._info_text_body.ggUpdatePosition) {
				me._info_text_body.ggUpdatePosition();
			}
			me._info_text_body.ggTextDiv.scrollTop = 0;
		}
		me._screentint_info.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._screentint_info);
		el=me._information=document.createElement('div');
		el.ggId="information";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 250px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._information.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_info_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._information.style[domTransition]='';
				if (me._information.ggCurrentLogicStateVisible == 0) {
					me._information.style.visibility=(Number(me._information.style.opacity)>0||!me._information.style.opacity)?'inherit':'hidden';
					me._information.ggVisible=true;
				}
				else {
					me._information.style.visibility="hidden";
					me._information.ggVisible=false;
				}
			}
		}
		me._information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._informationbg=document.createElement('div');
		el.ggId="informationbg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : rgba(0,0,0,0.509804);';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 250px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._informationbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._informationbg.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._informationbg);
		el=me._info_text_body=document.createElement('div');
		els=me._info_text_body__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_text_body";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 193px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 45px;';
		hs+='visibility : inherit;';
		hs+='width : 276px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 276px;';
		hs+='height: 193px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		me._info_text_body.ggUpdateText=function() {
			var hs=player.hotspot.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._info_text_body.ggUpdateText();
		player.addListener('activehotspotchanged', function() {
			me._info_text_body.ggUpdateText();
		});
		el.appendChild(els);
		me._info_text_body.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_text_body.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_text_body);
		el=me._info_title=document.createElement('div');
		els=me._info_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 53px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 15px;';
		hs+='visibility : inherit;';
		hs+='width : 245px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 245px;';
		hs+='height: 53px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._info_title.ggUpdateText=function() {
			var hs=player.hotspot.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._info_title.ggUpdateText();
		player.addListener('activehotspotchanged', function() {
			me._info_title.ggUpdateText();
		});
		el.appendChild(els);
		me._info_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_title.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_title);
		el=me._ht_info_close=document.createElement('div');
		els=me._ht_info_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLTAuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAx'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuOD'+
			'gxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIu'+
			'OTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMzQzNDM0MiLz4KIDwvZz4KIDxnPgogIDxwYXRoIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MiwxNmwzLjQ0LTMuNDRjMC40NjgtMC40NjcsMC40NjgtMS4yMjUsMC0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MSwwLjAwMUwxNiwxNC4zMDhsLTMuNDQxLTMuNDQxYy0wLjQ2Ny0wLjQ2Ny0xLjIyNC0wLjQ2Ny0xLjY5MSwwLj'+
			'AwMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNCwwLDEuNjlMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI2LDAsMS42OTJjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bDMuNDQtMy40NGwzLjQzOSwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNSwwLjQ2OCwxLjY5MSwwLjAwMUMyMS41OTksMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0'+
			'Ljg4MS00Ljg4MSwxMi43OTUsMCwxNy42NzhjNC44ODEsNC44OCwxMi43OTYsNC44OCwxNy42NzgsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI5LjcyLDE5Ljk1NiwyOS43MiwxMi4wNDIsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU4OS0wLjAwMS01LjE3LTAuOTg1LTcuMTQ2LTIuOTYxUzUuODk1LDE4LjU5LDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4NC01LjE3LDIuOTYtNy4xNDdDMTAuODMsNi44NzgsMTMuNDA5LDUuODk0LDE2LDUuODk0YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjk3NiwxLjk3Ny'+
			'wyLjk1Nyw0LjU1NiwyLjk2LDcuMTQ3Yy0wLjAwMSwyLjU5MS0wLjk4NSw1LjE2OS0yLjk2LDcuMTQ4QzIxLjE2OSwyNS4xMjIsMTguNTkxLDI2LjEwNiwxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_info_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_info_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNiwwLjAwMS0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5Miww'+
			'LjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MWMtMC40NjgtMC40NjgtMS4yMjUtMC40NjctMS42OTMsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4yMjQsMC40NjcsMS42OTEsMEMyMS41OTgsMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOy'+
			'YjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzhjNC44ODIsNC44ODEsMTIuNzk2LDQuODgxLDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTlDNi44NzgsMjEuMTcsNS44OTUsMTguNTkxLDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4'+
			'LTIuOTZjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDhDMjEuMTcsMjUuMTIzLDE4LjU5MSwyNi4xMDcsMTYsMjYuMTA2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NCYjeGQ7JiN4YTsmI3'+
			'g5OyYjeDk7YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzYy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MiwwLjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwYy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDFsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4y'+
			'MjQsMC40NjcsMS42OTEsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MWMtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzgmI3hkOyYjeGE7JiN4OTsmI3g5O2M0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDBDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O0M2Ljg3OCwyMS4xNyw1Ljg5NS'+
			'wxOC41OTEsNS44OTQsMTZjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O0MyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_info_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_info_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 1px;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_info_close.onclick=function (e) {
			player.setVariableValue('vis_info_popup', false);
		}
		me._ht_info_close.onmouseover=function (e) {
			me._ht_info_close__img.style.visibility='hidden';
			me._ht_info_close__imgo.style.visibility='inherit';
		}
		me._ht_info_close.onmouseout=function (e) {
			me._ht_info_close__img.style.visibility='inherit';
			me._ht_info_close__imgo.style.visibility='hidden';
		}
		me._ht_info_close.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._ht_info_close);
		me.divSkin.appendChild(me._information);
		el=me._screentint_image=document.createElement('div');
		el.ggId="screentint_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint_image.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._screentint_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._screentint_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._screentint_image.style[domTransition]='';
				if (me._screentint_image.ggCurrentLogicStateVisible == 0) {
					me._screentint_image.style.visibility=(Number(me._screentint_image.style.opacity)>0||!me._screentint_image.style.opacity)?'inherit':'hidden';
					me._screentint_image.ggVisible=true;
				}
				else {
					me._screentint_image.style.visibility="hidden";
					me._screentint_image.ggVisible=false;
				}
			}
		}
		me._screentint_image.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
		}
		me._screentint_image.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._screentint_image);
		el=me._image_popup=document.createElement('div');
		el.ggId="image_popup";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_popup.style[domTransition]='';
				if (me._image_popup.ggCurrentLogicStateVisible == 0) {
					me._image_popup.style.visibility=(Number(me._image_popup.style.opacity)>0||!me._image_popup.style.opacity)?'inherit':'hidden';
					me._image_popup.ggVisible=true;
				}
				else {
					me._image_popup.style.visibility="hidden";
					me._image_popup.ggVisible=false;
				}
			}
		}
		me._image_popup.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
			}
		}
		el=me._loading_image=document.createElement('div');
		els=me._loading_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGZpbGw9IndoaXRlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCI+CiA8Y2lyY2xlIGN4PSIxNiIgcj0iMCIgY3k9IjMiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMCIgY2FsY01vZGU9InNwbGluZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN4PSIxNiIgdHJhbnNmb3JtPS'+
			'Jyb3RhdGUoNDUgMTYgMTYpIiByPSIwIiBjeT0iMyI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjEyNXMiIGNhbGNNb2RlPSJzcGxpbmUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeD0iMTYiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgcj0iMCIgY3k9IjMiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVw'+
			'ZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC4yNXMiIGNhbGNNb2RlPSJzcGxpbmUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeD0iMTYiIHRyYW5zZm9ybT0icm90YXRlKDEzNSAxNiAxNikiIHI9IjAiIGN5PSIzIj4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYmVnaW49Ij'+
			'AuMzc1cyIgY2FsY01vZGU9InNwbGluZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN4PSIxNiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgcj0iMCIgY3k9IjMiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC41cyIgY2FsY01vZGU9InNwbGluZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN4PSIxNiIgdHJhbnNmb3JtPSJyb3RhdGUoMjI1IDE2IDE2KSIgcj0iMCIg'+
			'Y3k9IjMiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC42MjVzIiBjYWxjTW9kZT0ic3BsaW5lIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3g9IjE2IiB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgMTYgMTYpIiByPSIwIiBjeT0iMyI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2'+
			'V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjc1cyIgY2FsY01vZGU9InNwbGluZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN4PSIxNiIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSIgcj0iMCIgY3k9IjMiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBiZWdpbj0iMC44NzVzIiBjYWxjTW9kZT0ic3BsaW5l'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3g9IjE2IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiByPSIwIiBjeT0iMyI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGJlZ2luPSIwLjVzIiBjYWxjTW9kZT0ic3BsaW5lIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_popup.appendChild(me._loading_image);
		el=me._popup_image=document.createElement('div');
		els=me._popup_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._popup_image.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="popup_image";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_image.style[domTransition]='';
				if (me._popup_image.ggCurrentLogicStateVisible == 0) {
					me._popup_image.style.visibility=(Number(me._popup_image.style.opacity)>0||!me._popup_image.style.opacity)?'inherit':'hidden';
					me._popup_image.ggSubElement.src=me._popup_image.ggText;
					me._popup_image.ggVisible=true;
				}
				else {
					me._popup_image.style.visibility="hidden";
					me._popup_image__img.src = '';
					me._popup_image.ggVisible=false;
				}
			}
		}
		me._popup_image.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
		}
		me._popup_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
			}
			var parentWidth = me._popup_image.clientWidth;
			var parentHeight = me._popup_image.clientHeight;
			var img = me._popup_image__img;
			var aspectRatioDiv = me._popup_image.clientWidth / me._popup_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._image_popup.appendChild(me._popup_image);
		me.divSkin.appendChild(me._image_popup);
		el=me._image_popup_close=document.createElement('div');
		els=me._image_popup_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLTAuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAx'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuOD'+
			'gxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIu'+
			'OTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMzQzNDM0MiLz4KIDwvZz4KIDxnPgogIDxwYXRoIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MiwxNmwzLjQ0LTMuNDRjMC40NjgtMC40NjcsMC40NjgtMS4yMjUsMC0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MSwwLjAwMUwxNiwxNC4zMDhsLTMuNDQxLTMuNDQxYy0wLjQ2Ny0wLjQ2Ny0xLjIyNC0wLjQ2Ny0xLjY5MSwwLj'+
			'AwMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNCwwLDEuNjlMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI2LDAsMS42OTJjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bDMuNDQtMy40NGwzLjQzOSwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNSwwLjQ2OCwxLjY5MSwwLjAwMUMyMS41OTksMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0'+
			'Ljg4MS00Ljg4MSwxMi43OTUsMCwxNy42NzhjNC44ODEsNC44OCwxMi43OTYsNC44OCwxNy42NzgsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI5LjcyLDE5Ljk1NiwyOS43MiwxMi4wNDIsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU4OS0wLjAwMS01LjE3LTAuOTg1LTcuMTQ2LTIuOTYxUzUuODk1LDE4LjU5LDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4NC01LjE3LDIuOTYtNy4xNDdDMTAuODMsNi44NzgsMTMuNDA5LDUuODk0LDE2LDUuODk0YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjk3NiwxLjk3Ny'+
			'wyLjk1Nyw0LjU1NiwyLjk2LDcuMTQ3Yy0wLjAwMSwyLjU5MS0wLjk4NSw1LjE2OS0yLjk2LDcuMTQ4QzIxLjE2OSwyNS4xMjIsMTguNTkxLDI2LjEwNiwxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_popup_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._image_popup_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNiwwLjAwMS0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5Miww'+
			'LjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MWMtMC40NjgtMC40NjgtMS4yMjUtMC40NjctMS42OTMsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4yMjQsMC40NjcsMS42OTEsMEMyMS41OTgsMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOy'+
			'YjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzhjNC44ODIsNC44ODEsMTIuNzk2LDQuODgxLDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTlDNi44NzgsMjEuMTcsNS44OTUsMTguNTkxLDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4'+
			'LTIuOTZjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDhDMjEuMTcsMjUuMTIzLDE4LjU5MSwyNi4xMDcsMTYsMjYuMTA2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NCYjeGQ7JiN4YTsmI3'+
			'g5OyYjeDk7YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzYy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MiwwLjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwYy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDFsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4y'+
			'MjQsMC40NjcsMS42OTEsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MWMtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzgmI3hkOyYjeGE7JiN4OTsmI3g5O2M0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDBDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O0M2Ljg3OCwyMS4xNyw1Ljg5NS'+
			'wxOC41OTEsNS44OTQsMTZjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O0MyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_popup_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="image_popup_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 75px;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup_close.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup_close.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_popup_close.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_popup_close.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_popup_close.style[domTransition]='';
				if (me._image_popup_close.ggCurrentLogicStateVisible == 0) {
					me._image_popup_close.style.visibility=(Number(me._image_popup_close.style.opacity)>0||!me._image_popup_close.style.opacity)?'inherit':'hidden';
					me._image_popup_close.ggVisible=true;
				}
				else {
					me._image_popup_close.style.visibility="hidden";
					me._image_popup_close.ggVisible=false;
				}
			}
		}
		me._image_popup_close.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
		}
		me._image_popup_close.onmouseover=function (e) {
			me._image_popup_close__img.style.visibility='hidden';
			me._image_popup_close__imgo.style.visibility='inherit';
		}
		me._image_popup_close.onmouseout=function (e) {
			me._image_popup_close__img.style.visibility='inherit';
			me._image_popup_close__imgo.style.visibility='hidden';
		}
		me._image_popup_close.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_popup_close);
		el=me._shema=document.createElement('div');
		el.ggId="shema";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 1px;';
		hs+='height : 300px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._shema.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._shema.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._map_10=document.createElement('div');
		el.ggFilter = '';
		el.ggFilteredIds = [];
		el.ggMapNotLoaded = true;
		el.ggId="Map 1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_map ";
		el.ggType='map';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #ffffff;';
		hs+='bottom : 0px;';
		hs+='cursor : default;';
		hs+='height : 300px;';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_10.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._map_10.ggCurrentLogicStateSize != newLogicStateSize) {
				me._map_10.ggCurrentLogicStateSize = newLogicStateSize;
				me._map_10.style[domTransition]='width 0s, height 0s';
				if (me._map_10.ggCurrentLogicStateSize == 0) {
					me._map_10.style.width='600px';
					me._map_10.style.height='300px';
					skin.updateSize(me._map_10);
				}
				else if (me._map_10.ggCurrentLogicStateSize == 1) {
					me._map_10.style.width='300px';
					me._map_10.style.height='300px';
					skin.updateSize(me._map_10);
				}
				else {
					me._map_10.style.width='300px';
					me._map_10.style.height='300px';
					skin.updateSize(me._map_10);
				}
			}
		}
		me._map_10.ggCurrentLogicStateSize = -1;
		me._map_10.ggUpdateConditionResize=function () {
			if (me._map_10.ggMapNotLoaded == false) {
				me._map_10.ggMap.invalidateSize(false);
			}
		}
		me._map_10.ggUpdateConditionTimer=function () {
			me._map_10.ggRadar.update();
		}
		me._map_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			me._map_10.ggUpdateConditionResize();
		}
		me._map_10.ggNodeChange=function () {
			if (me._map_10.ggLastActivMarker) {
				if (me._map_10.ggLastActivMarker._div.ggDeactivate) me._map_10.ggLastActivMarker._div.ggDeactivate();
			}
			var id=player.getCurrentNode();
			if (me.ggMarkerArray) {
			var marker=me._map_10.ggMarkerArray[id];
			if (marker) {
				if (marker._div.ggActivate) marker._div.ggActivate();
			}
			me._map_10.ggLastActivMarker=marker;
			}
			if (!me._map_10.ggMapNotLoaded) {
				me._map_10.ggCenterNode();
			}
			if (player.getMapType(me._map_10.ggMapId) == 'file') {
				var coords = player.getNodeMapCoords(id, me._map_10.ggMapId);
				if (coords.length < 2) {
					var mapId = player.getMapContainingNode(id);
					if (mapId != '') {
							me._map_10.ggChangeMap(mapId);
					}
				}
			}
			me._map_10.ggLastNodeId = id;
		}
		me._shema.appendChild(me._map_10);
		el=me._pan_title_shadow0=document.createElement('div');
		els=me._pan_title_shadow0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title_shadow";
		el.ggDx=3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 307px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title_shadow0.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title_shadow0.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title_shadow0.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title_shadow0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title_shadow0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._shema.appendChild(me._pan_title_shadow0);
		el=me._pan_title0=document.createElement('div');
		els=me._pan_title0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 308px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title0.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title0.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title0.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._shema.appendChild(me._pan_title0);
		el=me._image_shema_close0=document.createElement('div');
		els=me._image_shema_close0__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLTAuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAx'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuOD'+
			'gxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIu'+
			'OTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMzQzNDM0MiLz4KIDwvZz4KIDxnPgogIDxwYXRoIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MiwxNmwzLjQ0LTMuNDRjMC40NjgtMC40NjcsMC40NjgtMS4yMjUsMC0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MSwwLjAwMUwxNiwxNC4zMDhsLTMuNDQxLTMuNDQxYy0wLjQ2Ny0wLjQ2Ny0xLjIyNC0wLjQ2Ny0xLjY5MSwwLj'+
			'AwMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNCwwLDEuNjlMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI2LDAsMS42OTJjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bDMuNDQtMy40NGwzLjQzOSwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNSwwLjQ2OCwxLjY5MSwwLjAwMUMyMS41OTksMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0'+
			'Ljg4MS00Ljg4MSwxMi43OTUsMCwxNy42NzhjNC44ODEsNC44OCwxMi43OTYsNC44OCwxNy42NzgsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI5LjcyLDE5Ljk1NiwyOS43MiwxMi4wNDIsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU4OS0wLjAwMS01LjE3LTAuOTg1LTcuMTQ2LTIuOTYxUzUuODk1LDE4LjU5LDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4NC01LjE3LDIuOTYtNy4xNDdDMTAuODMsNi44NzgsMTMuNDA5LDUuODk0LDE2LDUuODk0YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjk3NiwxLjk3Ny'+
			'wyLjk1Nyw0LjU1NiwyLjk2LDcuMTQ3Yy0wLjAwMSwyLjU5MS0wLjk4NSw1LjE2OS0yLjk2LDcuMTQ4QzIxLjE2OSwyNS4xMjIsMTguNTkxLDI2LjEwNiwxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_shema_close0__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._image_shema_close0__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNiwwLjAwMS0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5Miww'+
			'LjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MWMtMC40NjgtMC40NjgtMS4yMjUtMC40NjctMS42OTMsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4yMjQsMC40NjcsMS42OTEsMEMyMS41OTgsMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOy'+
			'YjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzhjNC44ODIsNC44ODEsMTIuNzk2LDQuODgxLDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTlDNi44NzgsMjEuMTcsNS44OTUsMTguNTkxLDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4'+
			'LTIuOTZjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDhDMjEuMTcsMjUuMTIzLDE4LjU5MSwyNi4xMDcsMTYsMjYuMTA2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NCYjeGQ7JiN4YTsmI3'+
			'g5OyYjeDk7YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzYy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MiwwLjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwYy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDFsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4y'+
			'MjQsMC40NjcsMS42OTEsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MWMtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzgmI3hkOyYjeGE7JiN4OTsmI3g5O2M0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDBDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O0M2Ljg3OCwyMS4xNyw1Ljg5NS'+
			'wxOC41OTEsNS44OTQsMTZjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O0MyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_shema_close0__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="image_shema_close";
		el.ggDx=132;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 306px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_shema_close0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_shema_close0.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStatePosition = 1;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._image_shema_close0.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._image_shema_close0.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._image_shema_close0.style[domTransition]='left 0s, bottom 0s';
				if (me._image_shema_close0.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 270;
					me._image_shema_close0.style.bottom='306px';
					me._image_shema_close0.ggUpdatePosition(true);
				}
				else if (me._image_shema_close0.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 132;
					me._image_shema_close0.style.bottom='306px';
					me._image_shema_close0.ggUpdatePosition(true);
				}
				else {
					me._image_shema_close0.ggDx=132;
					me._image_shema_close0.style.bottom='306px';
					me._image_shema_close0.ggUpdatePosition(true);
				}
			}
		}
		me._image_shema_close0.onclick=function (e) {
			me._shema.ggVisible = !me._shema.ggVisible;
			var flag=me._shema.ggVisible;
			me._shema.style[domTransition]='none';
			me._shema.style.visibility=((flag)&&(Number(me._shema.style.opacity)>0||!me._shema.style.opacity))?'inherit':'hidden';
		}
		me._image_shema_close0.onmouseover=function (e) {
			me._image_shema_close0__img.style.visibility='hidden';
			me._image_shema_close0__imgo.style.visibility='inherit';
		}
		me._image_shema_close0.onmouseout=function (e) {
			me._image_shema_close0__img.style.visibility='inherit';
			me._image_shema_close0__imgo.style.visibility='hidden';
		}
		me._image_shema_close0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._shema.appendChild(me._image_shema_close0);
		me.divSkin.appendChild(me._shema);
		el=me._floor_plan=document.createElement('div');
		els=me._floor_plan__img=document.createElement('img');
		els.className='ggskin ggskin_floor_plan';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="floor_plan";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image icon_animation";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='opacity : 0.9;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : 10px;';
		hs+='visibility : hidden;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._floor_plan.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._floor_plan.onclick=function (e) {
			me._shema.ggVisible = !me._shema.ggVisible;
			var flag=me._shema.ggVisible;
			me._shema.style[domTransition]='none';
			me._shema.style.visibility=((flag)&&(Number(me._shema.style.opacity)>0||!me._shema.style.opacity))?'inherit':'hidden';
		}
		me._floor_plan.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._floor_plan);
		el=me._map=document.createElement('div');
		el.ggId="map";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 1px;';
		hs+='height : 300px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._map.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._map_1=document.createElement('div');
		el.ggFilter = '';
		el.ggFilteredIds = [];
		el.ggMapNotLoaded = true;
		el.ggId="Map 1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_map ";
		el.ggType='map';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #ffffff;';
		hs+='bottom : 0px;';
		hs+='cursor : default;';
		hs+='height : 300px;';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_1.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._map_1.ggCurrentLogicStateSize != newLogicStateSize) {
				me._map_1.ggCurrentLogicStateSize = newLogicStateSize;
				me._map_1.style[domTransition]='width 0s, height 0s';
				if (me._map_1.ggCurrentLogicStateSize == 0) {
					me._map_1.style.width='600px';
					me._map_1.style.height='300px';
					skin.updateSize(me._map_1);
				}
				else if (me._map_1.ggCurrentLogicStateSize == 1) {
					me._map_1.style.width='300px';
					me._map_1.style.height='300px';
					skin.updateSize(me._map_1);
				}
				else {
					me._map_1.style.width='300px';
					me._map_1.style.height='300px';
					skin.updateSize(me._map_1);
				}
			}
		}
		me._map_1.ggCurrentLogicStateSize = -1;
		me._map_1.ggUpdateConditionTimer=function () {
			me._map_1.ggRadar.update();
		}
		me._map_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_1.ggNodeChange=function () {
			if (me._map_1.ggLastActivMarker) {
				if (me._map_1.ggLastActivMarker._div.ggDeactivate) me._map_1.ggLastActivMarker._div.ggDeactivate();
			}
			var id=player.getCurrentNode();
			if (me.ggMarkerArray) {
			var marker=me._map_1.ggMarkerArray[id];
			if (marker) {
				if (marker._div.ggActivate) marker._div.ggActivate();
			}
			me._map_1.ggLastActivMarker=marker;
			}
			if (!me._map_1.ggMapNotLoaded) {
				me._map_1.ggCenterNode();
			}
			if (player.getMapType(me._map_1.ggMapId) == 'file') {
				var coords = player.getNodeMapCoords(id, me._map_1.ggMapId);
				if (coords.length < 2) {
					var mapId = player.getMapContainingNode(id);
					if (mapId != '') {
							me._map_1.ggChangeMap(mapId);
					}
				}
			}
			me._map_1.ggLastNodeId = id;
		}
		me._map.appendChild(me._map_1);
		el=me._pan_title_shadow=document.createElement('div');
		els=me._pan_title_shadow__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title_shadow";
		el.ggDx=3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 307px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title_shadow.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title_shadow.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title_shadow.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title_shadow.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title_shadow.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._map.appendChild(me._pan_title_shadow);
		el=me._pan_title=document.createElement('div');
		els=me._pan_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Pan_title";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 308px;';
		hs+='height : 26px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 289px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._pan_title.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._pan_title.ggUpdateText();
		player.addListener('changenode', function() {
			me._pan_title.ggUpdateText();
		});
		el.appendChild(els);
		me._pan_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pan_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((287-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._map.appendChild(me._pan_title);
		el=me._image_shema_close=document.createElement('div');
		els=me._image_shema_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLTAuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAx'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuOD'+
			'gxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIu'+
			'OTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMzQzNDM0MiLz4KIDwvZz4KIDxnPgogIDxwYXRoIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MiwxNmwzLjQ0LTMuNDRjMC40NjgtMC40NjcsMC40NjgtMS4yMjUsMC0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MSwwLjAwMUwxNiwxNC4zMDhsLTMuNDQxLTMuNDQxYy0wLjQ2Ny0wLjQ2Ny0xLjIyNC0wLjQ2Ny0xLjY5MSwwLj'+
			'AwMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNCwwLDEuNjlMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI2LDAsMS42OTJjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bDMuNDQtMy40NGwzLjQzOSwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNSwwLjQ2OCwxLjY5MSwwLjAwMUMyMS41OTksMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0'+
			'Ljg4MS00Ljg4MSwxMi43OTUsMCwxNy42NzhjNC44ODEsNC44OCwxMi43OTYsNC44OCwxNy42NzgsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI5LjcyLDE5Ljk1NiwyOS43MiwxMi4wNDIsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU4OS0wLjAwMS01LjE3LTAuOTg1LTcuMTQ2LTIuOTYxUzUuODk1LDE4LjU5LDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4NC01LjE3LDIuOTYtNy4xNDdDMTAuODMsNi44NzgsMTMuNDA5LDUuODk0LDE2LDUuODk0YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjk3NiwxLjk3Ny'+
			'wyLjk1Nyw0LjU1NiwyLjk2LDcuMTQ3Yy0wLjAwMSwyLjU5MS0wLjk4NSw1LjE2OS0yLjk2LDcuMTQ4QzIxLjE2OSwyNS4xMjIsMTguNTkxLDI2LjEwNiwxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_shema_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._image_shema_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeD0iMHB4IiBoZWlnaHQ9IjMycHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczp4bGluaz0iaH'+
			'R0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzEiIHdpZHRoPSIzMnB4Ij4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNiwwLjAwMS0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5Miww'+
			'LjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MWMtMC40NjgtMC40NjgtMS4yMjUtMC40NjctMS42OTMsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4yMjQsMC40NjcsMS42OTEsMEMyMS41OTgsMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOy'+
			'YjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzhjNC44ODIsNC44ODEsMTIuNzk2LDQuODgxLDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTlDNi44NzgsMjEuMTcsNS44OTUsMTguNTkxLDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4'+
			'LTIuOTZjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDhDMjEuMTcsMjUuMTIzLDE4LjU5MSwyNi4xMDcsMTYsMjYuMTA2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NCYjeGQ7JiN4YTsmI3'+
			'g5OyYjeDk7YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzYy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MiwwLjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwYy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDFsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4y'+
			'MjQsMC40NjcsMS42OTEsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MWMtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzgmI3hkOyYjeGE7JiN4OTsmI3g5O2M0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDBDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O0M2Ljg3OCwyMS4xNyw1Ljg5NS'+
			'wxOC41OTEsNS44OTQsMTZjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O0MyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_shema_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="image_shema_close";
		el.ggDx=132;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 306px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_shema_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_shema_close.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStatePosition = 1;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._image_shema_close.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._image_shema_close.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._image_shema_close.style[domTransition]='left 0s, bottom 0s';
				if (me._image_shema_close.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 270;
					me._image_shema_close.style.bottom='306px';
					me._image_shema_close.ggUpdatePosition(true);
				}
				else if (me._image_shema_close.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 132;
					me._image_shema_close.style.bottom='306px';
					me._image_shema_close.ggUpdatePosition(true);
				}
				else {
					me._image_shema_close.ggDx=132;
					me._image_shema_close.style.bottom='306px';
					me._image_shema_close.ggUpdatePosition(true);
				}
			}
		}
		me._image_shema_close.onclick=function (e) {
			me._map.ggVisible = !me._map.ggVisible;
			var flag=me._map.ggVisible;
			me._map.style[domTransition]='none';
			me._map.style.visibility=((flag)&&(Number(me._map.style.opacity)>0||!me._map.style.opacity))?'inherit':'hidden';
		}
		me._image_shema_close.onmouseover=function (e) {
			me._image_shema_close__img.style.visibility='hidden';
			me._image_shema_close__imgo.style.visibility='inherit';
		}
		me._image_shema_close.onmouseout=function (e) {
			me._image_shema_close__img.style.visibility='inherit';
			me._image_shema_close__imgo.style.visibility='hidden';
		}
		me._image_shema_close.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map.appendChild(me._image_shema_close);
		me.divSkin.appendChild(me._map);
		el=me._map_plan=document.createElement('div');
		els=me._map_plan__img=document.createElement('img');
		els.className='ggskin ggskin_map_plan';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_plan";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image icon_animation";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='opacity : 0.9;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : 10px;';
		hs+='visibility : hidden;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._map_plan.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._map_plan.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.tags.indexOf("map") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else if (
				((me.ggUserdata.tags.indexOf("map") == -1))
			)
			{
				newLogicStateVisible = 1;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._map_plan.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._map_plan.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._map_plan.style[domTransition]='';
				if (me._map_plan.ggCurrentLogicStateVisible == 0) {
					me._map_plan.style.visibility=(Number(me._map_plan.style.opacity)>0||!me._map_plan.style.opacity)?'inherit':'hidden';
					me._map_plan.ggVisible=true;
				}
				else if (me._map_plan.ggCurrentLogicStateVisible == 1) {
					me._map_plan.style.visibility="hidden";
					me._map_plan.ggVisible=false;
				}
				else {
					me._map_plan.style.visibility="hidden";
					me._map_plan.ggVisible=false;
				}
			}
		}
		me._map_plan.onclick=function (e) {
			me._map.ggVisible = !me._map.ggVisible;
			var flag=me._map.ggVisible;
			me._map.style[domTransition]='none';
			me._map.style.visibility=((flag)&&(Number(me._map.style.opacity)>0||!me._map.style.opacity))?'inherit':'hidden';
		}
		me._map_plan.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._map_plan);
		el=me._node_scroller=document.createElement('div');
		els=me._node_scroller__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 164px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 159.5px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller.ggScrollByX = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0 || me._node_scroller.ggHPercentVisible >= 1.0) return;
			me._node_scroller.ggScrollPosX = (me._node_scroller__horScrollFg.offsetLeft + diffX);
			me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
			me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			let percentScrolled = me._node_scroller.ggScrollPosX / (me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
			me._node_scroller__content.style.left = -(Math.round((me._node_scroller.ggContentWidth * (1.0 - me._node_scroller.ggHPercentVisible)) * percentScrolled)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
		}
		me._node_scroller.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0 || me._node_scroller.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller.ggScrollPosX >= me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth)) {
					me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller.ggScrollPosX <= 0)) {
					me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			let percentScrolled = me._node_scroller.ggScrollPosX / (me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
			me._node_scroller__content.style.left = -(Math.round((me._node_scroller.ggContentWidth * (1.0 - me._node_scroller.ggHPercentVisible)) * percentScrolled)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller.ggScrollByY = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0 || me._node_scroller.ggVPercentVisible >= 1.0) return;
			me._node_scroller.ggScrollPosY = (me._node_scroller__vertScrollFg.offsetTop + diffY);
			me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
			me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			let percentScrolled = me._node_scroller.ggScrollPosY / (me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
			me._node_scroller__content.style.top = -(Math.round((me._node_scroller.ggContentHeight * (1.0 - me._node_scroller.ggVPercentVisible)) * percentScrolled)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
		}
		me._node_scroller.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0 || me._node_scroller.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller.ggScrollPosY >= me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight)) {
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller.ggScrollPosY <= 0)) {
					me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			let percentScrolled = me._node_scroller.ggScrollPosY / (me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
			me._node_scroller__content.style.top = -(Math.round((me._node_scroller.ggContentHeight * (1.0 - me._node_scroller.ggVPercentVisible)) * percentScrolled)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller.clientWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller.clientWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0))) * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller.clientHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller.clientHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0))) * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._node_scroller__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller.ggDragInertiaX *= 0.65;
					me._node_scroller.ggDragInertiaY *= 0.65;
					me._node_scroller.ggScrollByX(me._node_scroller.ggDragInertiaX);
					me._node_scroller.ggScrollByY(me._node_scroller.ggDragInertiaY);
					if (Math.abs(me._node_scroller.ggDragInertiaX) < 1.0 && Math.abs(me._node_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._node_scroller__content.ontouchend = null;
				me._node_scroller__content.ontouchmove = null;
				me._node_scroller__content.onpointerup = null;
				me._node_scroller__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._node_scroller__content.onpointerup = me._node_scroller__content.ontouchend;
		}
			me._node_scroller__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._node_scroller.ggDragLastX) * me._node_scroller.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._node_scroller.ggDragLastY) * me._node_scroller.ggVPercentVisible;
				me._node_scroller.ggDragInertiaX = -diffX;
				me._node_scroller.ggDragInertiaY = -diffY;
				me._node_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller.ggScrollByX(-diffX);
				me._node_scroller.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._node_scroller__content.onpointermove = me._node_scroller__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._node_scroller__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 600px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 600px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller.ggScrollPosY = 0;
		me._node_scroller.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller.ggDragInertiaY *= 0.65;
					me._node_scroller.ggScrollByY(me._node_scroller.ggDragInertiaY);
					if (Math.abs(me._node_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragInertiaY = diffY;
				me._node_scroller.ggDragLastY = e.clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller.ggDragInertiaY *= 0.65;
					me._node_scroller.ggScrollByY(me._node_scroller.ggDragInertiaY);
					if (Math.abs(me._node_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragInertiaY = diffY;
				me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller.ggScrollHeight;
			if (e.offsetY < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller.ggScrollByYSmooth(30 * me._node_scroller.ggVPercentVisible * wheelDelta);
		});
		elCornerBg = me._node_scroller__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='background : rgba(66,66,66,0.501961);';
		hs+='border : 0px solid #000000;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 200px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_scroller.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._node_scroller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true)) && 
				((player.getVariableValue('node_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_scroller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_scroller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._node_scroller.style[domTransition]='opacity 500ms ease 0ms';
				if (me._node_scroller.ggCurrentLogicStateAlpha == 0) {
					me._node_scroller.style.visibility=me._node_scroller.ggVisible?'inherit':'hidden';
					me._node_scroller.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._node_scroller.style.opacity == 0.0) { me._node_scroller.style.visibility="hidden"; } }, 505);
					me._node_scroller.style.opacity=0;
				}
			}
		}
		me._node_scroller.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._node_scroller.ggHorScrollVisible && contentHeight > this.clientHeight - 15) || (!me._node_scroller.ggHorScrollVisible && contentHeight > this.clientHeight)) {
					me._node_scroller__vertScrollBg.style.visibility = 'inherit';
					me._node_scroller__vertScrollFg.style.visibility = 'inherit';
					me._node_scroller.ggVertScrollVisible = true;
				} else {
					me._node_scroller__vertScrollBg.style.visibility = 'hidden';
					me._node_scroller__vertScrollFg.style.visibility = 'hidden';
					me._node_scroller.ggVertScrollVisible = false;
				}
				if(me._node_scroller.ggVertScrollVisible) {
					me._node_scroller.ggAvailableWidth = me._node_scroller.clientWidth - 15;
					if (me._node_scroller.ggHorScrollVisible) {
						me._node_scroller.ggAvailableHeight = me._node_scroller.clientHeight - 15;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height - me._node_scroller__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller.ggAvailableHeight = me._node_scroller.clientHeight;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height;
						me._node_scroller__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller__vertScrollBg.style.height = me._node_scroller.ggAvailableHeight + 'px';
					me._node_scroller.ggVPercentVisible = contentHeight != 0 ? me._node_scroller.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._node_scroller.ggVPercentVisible > 1.0) me._node_scroller.ggVPercentVisible = 1.0;
					me._node_scroller.ggScrollHeight =  Math.round(me._node_scroller__vertScrollBg.offsetHeight * me._node_scroller.ggVPercentVisible);
					me._node_scroller__vertScrollFg.style.height = me._node_scroller.ggScrollHeight + 'px';
					me._node_scroller.ggScrollPosY = me._node_scroller.ggScrollPosYPercent * me._node_scroller.ggAvailableHeight;
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
					if (me._node_scroller.ggVPercentVisible < 1.0) {
						let percentScrolled = me._node_scroller.ggScrollPosY / (me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
						me._node_scroller__content.style.top = -(Math.round((me._node_scroller.ggContentHeight * (1.0 - me._node_scroller.ggVPercentVisible)) * percentScrolled)) + me._node_scroller.ggContentTopOffset + 'px';
					}
				} else {
					me._node_scroller.ggAvailableWidth = me._node_scroller.clientWidth;
					me._node_scroller.ggScrollPosY = 0;
					me._node_scroller.ggScrollPosYPercent = 0.0;
					me._node_scroller__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller.ggVertScrollVisible) {
					me.updateSize(me._node_scroller);
					me._node_scroller.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 150;
		el.ggHeight = 100;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_title && me._node_cloner.ggInstances[i]._node_title.logicBlock_visible) {
						me._node_cloner.ggInstances[i]._node_title.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_active = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_title && me._node_cloner.ggInstances[i]._node_title.logicBlock_visible) {
						me._node_cloner.ggInstances[i]._node_title.logicBlock_visible();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner.ggUpdating == true) return;
			me._node_cloner.ggUpdating = true;
			var el=me._node_cloner;
			var curNumCols = 0;
			curNumCols = me._node_cloner.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner.ggWidth) + 'px';
				parameter.width=me._node_cloner.ggWidth + 'px';
				parameter.height=me._node_cloner.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner.callChildLogicBlocks_changenode();
			me._node_cloner.callChildLogicBlocks_mouseover();
			me._node_cloner.callChildLogicBlocks_active();
			me._node_cloner.callChildLogicBlocks_changevisitednodes();
			me._node_cloner.callChildLogicBlocks_activehotspotchanged();
			me._node_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner.parentNode.classList.contains('ggskin_subelement') && me._node_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 100px;';
		hs+='left : 10px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 65px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner.childNodes.length; i++) {
				var child=me._node_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner.ggUpdatePosition=function (useTransition) {
				me._node_cloner.ggUpdate();
		}
		me._node_cloner.ggNodeChange=function () {
			me._node_cloner.ggUpdateConditionNodeChange();
		}
		me._node_scroller__content.appendChild(me._node_cloner);
		el=me._go_back=document.createElement('div');
		els=me._go_back__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="go_back";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : 14px;';
		hs+='position : absolute;';
		hs+='top : 23px;';
		hs+='visibility : inherit;';
		hs+='width : 103px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 103px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #ffffff;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="< \u041f\u043e\u0432\u0435\u0440\u043d\u0443\u0442\u0438\u0441\u044c";
		el.appendChild(els);
		me._go_back.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._go_back.onclick=function (e) {
			player.setVariableValue('node_visible', false);
		}
		me._go_back.ggUpdatePosition=function (useTransition) {
		}
		me._node_scroller__content.appendChild(me._go_back);
		me.divSkin.appendChild(me._node_scroller);
		el=me._category_scroller=document.createElement('div');
		els=me._category_scroller__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 104px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 179px;';
		hs+="";
		els.setAttribute('style',hs);
		me._category_scroller.ggScrollByX = function(diffX) {
			if(!me._category_scroller.ggHorScrollVisible || diffX == 0 || me._category_scroller.ggHPercentVisible >= 1.0) return;
			me._category_scroller.ggScrollPosX = (me._category_scroller__horScrollFg.offsetLeft + diffX);
			me._category_scroller.ggScrollPosX = Math.max(me._category_scroller.ggScrollPosX, 0);
			me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
			me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
			let percentScrolled = me._category_scroller.ggScrollPosX / (me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
			me._category_scroller__content.style.left = -(Math.round((me._category_scroller.ggContentWidth * (1.0 - me._category_scroller.ggHPercentVisible)) * percentScrolled)) + me._category_scroller.ggContentLeftOffset + 'px';
			me._category_scroller.ggScrollPosXPercent = (me._category_scroller__horScrollFg.offsetLeft / me._category_scroller__horScrollBg.offsetWidth);
		}
		me._category_scroller.ggScrollByXSmooth = function(diffX) {
			if(!me._category_scroller.ggHorScrollVisible || diffX == 0 || me._category_scroller.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._category_scroller.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._category_scroller.ggScrollPosX >= me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth)) {
					me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._category_scroller.ggScrollPosX <= 0)) {
					me._category_scroller.ggScrollPosX = Math.max(me._category_scroller.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
			let percentScrolled = me._category_scroller.ggScrollPosX / (me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
			me._category_scroller__content.style.left = -(Math.round((me._category_scroller.ggContentWidth * (1.0 - me._category_scroller.ggHPercentVisible)) * percentScrolled)) + me._category_scroller.ggContentLeftOffset + 'px';
			me._category_scroller.ggScrollPosXPercent = (me._category_scroller__horScrollFg.offsetLeft / me._category_scroller__horScrollBg.offsetWidth);
			}, 10);
		}
		me._category_scroller.ggScrollByY = function(diffY) {
			if(!me._category_scroller.ggVertScrollVisible || diffY == 0 || me._category_scroller.ggVPercentVisible >= 1.0) return;
			me._category_scroller.ggScrollPosY = (me._category_scroller__vertScrollFg.offsetTop + diffY);
			me._category_scroller.ggScrollPosY = Math.max(me._category_scroller.ggScrollPosY, 0);
			me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
			me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
			let percentScrolled = me._category_scroller.ggScrollPosY / (me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
			me._category_scroller__content.style.top = -(Math.round((me._category_scroller.ggContentHeight * (1.0 - me._category_scroller.ggVPercentVisible)) * percentScrolled)) + me._category_scroller.ggContentTopOffset + 'px';
			me._category_scroller.ggScrollPosYPercent = (me._category_scroller__vertScrollFg.offsetTop / me._category_scroller__vertScrollBg.offsetHeight);
		}
		me._category_scroller.ggScrollByYSmooth = function(diffY) {
			if(!me._category_scroller.ggVertScrollVisible || diffY == 0 || me._category_scroller.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._category_scroller.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._category_scroller.ggScrollPosY >= me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight)) {
					me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._category_scroller.ggScrollPosY <= 0)) {
					me._category_scroller.ggScrollPosY = Math.max(me._category_scroller.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
			let percentScrolled = me._category_scroller.ggScrollPosY / (me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
			me._category_scroller__content.style.top = -(Math.round((me._category_scroller.ggContentHeight * (1.0 - me._category_scroller.ggVPercentVisible)) * percentScrolled)) + me._category_scroller.ggContentTopOffset + 'px';
			me._category_scroller.ggScrollPosYPercent = (me._category_scroller__vertScrollFg.offsetTop / me._category_scroller__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._category_scroller.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._category_scroller.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._category_scroller.ggHPercentVisible);
					me._category_scroller.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._category_scroller.clientWidth - (me._category_scroller.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._category_scroller.clientWidth - (me._category_scroller.ggVertScrollVisible ? 15 : 0))) * me._category_scroller.ggHPercentVisible);
					me._category_scroller.ggScrollByXSmooth(diffX);
				}
			}
			if (me._category_scroller.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._category_scroller.ggVPercentVisible);
					me._category_scroller.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._category_scroller.clientHeight - (me._category_scroller.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._category_scroller.clientHeight - (me._category_scroller.ggHorScrollVisible ? 15 : 0))) * me._category_scroller.ggVPercentVisible);
					me._category_scroller.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._category_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._category_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._category_scroller__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._category_scroller.ggDragInertiaX *= 0.65;
					me._category_scroller.ggDragInertiaY *= 0.65;
					me._category_scroller.ggScrollByX(me._category_scroller.ggDragInertiaX);
					me._category_scroller.ggScrollByY(me._category_scroller.ggDragInertiaY);
					if (Math.abs(me._category_scroller.ggDragInertiaX) < 1.0 && Math.abs(me._category_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._category_scroller__content.ontouchend = null;
				me._category_scroller__content.ontouchmove = null;
				me._category_scroller__content.onpointerup = null;
				me._category_scroller__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._category_scroller__content.onpointerup = me._category_scroller__content.ontouchend;
		}
			me._category_scroller__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._category_scroller.ggDragLastX) * me._category_scroller.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._category_scroller.ggDragLastY) * me._category_scroller.ggVPercentVisible;
				me._category_scroller.ggDragInertiaX = -diffX;
				me._category_scroller.ggDragInertiaY = -diffY;
				me._category_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._category_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._category_scroller.ggScrollByX(-diffX);
				me._category_scroller.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._category_scroller__content.onpointermove = me._category_scroller__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elHorScrollBg = me._category_scroller__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 200px; height: 15px; background-color: rgba(128,128,128,0.752941); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._category_scroller__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 200px; height: 15px; background-color: rgba(192,192,192,0.752941); pointer-events: auto;');
		me._category_scroller.ggScrollPosX = 0;
		me._category_scroller.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._category_scroller.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._category_scroller.ggDragInertiaX *= 0.65;
					me._category_scroller.ggScrollByX(me._category_scroller.ggDragInertiaX);
					if (Math.abs(me._category_scroller.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._category_scroller.ggDragLastX;
				me._category_scroller.ggDragInertiaX = diffX;
				me._category_scroller.ggDragLastX = e.clientX;
				me._category_scroller.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._category_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._category_scroller.ggDragInertiaX *= 0.65;
					me._category_scroller.ggScrollByX(me._category_scroller.ggDragInertiaX);
					if (Math.abs(me._category_scroller.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._category_scroller.ggDragLastX;
				me._category_scroller.ggDragInertiaX = diffX;
				me._category_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._category_scroller.ggScrollByX(diffX);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elHorScrollFg.onpointerdown = elHorScrollFg.ontouchstart;
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._category_scroller.ggScrollWidth;
			if (e.offsetX < me._category_scroller.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._category_scroller.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._category_scroller__horScrollBg.getBoundingClientRect();
			var diffX = me._category_scroller.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._category_scroller.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._category_scroller.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._category_scroller.ggScrollByXSmooth(30 * me._category_scroller.ggHPercentVisible * wheelDelta);
		});
		elVertScrollBg = me._category_scroller__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 600px; background-color: rgba(128,128,128,0.752941); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._category_scroller__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 600px; background-color: rgba(192,192,192,0.752941); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._category_scroller.ggScrollPosY = 0;
		me._category_scroller.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._category_scroller.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._category_scroller.ggDragInertiaY *= 0.65;
					me._category_scroller.ggScrollByY(me._category_scroller.ggDragInertiaY);
					if (Math.abs(me._category_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragInertiaY = diffY;
				me._category_scroller.ggDragLastY = e.clientY;
				me._category_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._category_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._category_scroller.ggDragInertiaY *= 0.65;
					me._category_scroller.ggScrollByY(me._category_scroller.ggDragInertiaY);
					if (Math.abs(me._category_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragInertiaY = diffY;
				me._category_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._category_scroller.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._category_scroller.ggScrollHeight;
			if (e.offsetY < me._category_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._category_scroller.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._category_scroller__vertScrollBg.getBoundingClientRect();
			var diffY = me._category_scroller.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._category_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._category_scroller.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._category_scroller.ggScrollByYSmooth(30 * me._category_scroller.ggVPercentVisible * wheelDelta);
		});
		elCornerBg = me._category_scroller__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="category_scroller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='background : rgba(0,0,0,0.501961);';
		hs+='border : 0px solid #000000;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 200px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._category_scroller.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._category_scroller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('node_visible') == true)) || 
				((player.getVariableValue('category_visible') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._category_scroller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._category_scroller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._category_scroller.style[domTransition]='opacity 500ms ease 0ms';
				if (me._category_scroller.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._category_scroller.style.opacity == 0.0) { me._category_scroller.style.visibility="hidden"; } }, 505);
					me._category_scroller.style.opacity=0;
				}
				else {
					me._category_scroller.style.visibility=me._category_scroller.ggVisible?'inherit':'hidden';
					me._category_scroller.style.opacity=1;
				}
			}
		}
		me._category_scroller.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				this.ggContent.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if (contentWidth > Math.ceil(offsetWidthWithScale)) {
					me._category_scroller__horScrollBg.style.visibility = 'inherit';
					me._category_scroller__horScrollFg.style.visibility = 'inherit';
					me._category_scroller.ggHorScrollVisible = true;
				} else {
					me._category_scroller__horScrollBg.style.visibility = 'hidden';
					me._category_scroller__horScrollFg.style.visibility = 'hidden';
					me._category_scroller.ggHorScrollVisible = false;
				}
				if ((me._category_scroller.ggHorScrollVisible && contentHeight > this.clientHeight - 15) || (!me._category_scroller.ggHorScrollVisible && contentHeight > this.clientHeight)) {
					me._category_scroller__vertScrollBg.style.visibility = 'inherit';
					me._category_scroller__vertScrollFg.style.visibility = 'inherit';
					me._category_scroller.ggVertScrollVisible = true;
					if (!me._category_scroller.ggHorScrollVisible && (contentWidth > offsetWidthWithScale - me._category_scroller__vertScrollBg.getBoundingClientRect().width)) {
						me._category_scroller__horScrollBg.style.visibility = 'inherit';
						me._category_scroller__horScrollFg.style.visibility = 'inherit';
						me._category_scroller.ggHorScrollVisible = true;
					}
				} else {
					me._category_scroller__vertScrollBg.style.visibility = 'hidden';
					me._category_scroller__vertScrollFg.style.visibility = 'hidden';
					me._category_scroller.ggVertScrollVisible = false;
				}
				if(me._category_scroller.ggHorScrollVisible) {
					me._category_scroller.ggAvailableHeight = me._category_scroller.clientHeight - 15;
					if (me._category_scroller.ggVertScrollVisible) {
						me._category_scroller.ggAvailableWidth = me._category_scroller.clientWidth - 15;
						me._category_scroller.ggAvailableWidthWithScale = me._category_scroller.getBoundingClientRect().width - me._category_scroller__horScrollBg.getBoundingClientRect().height;
					} else {
						me._category_scroller.ggAvailableWidth = me._category_scroller.clientWidth;
						me._category_scroller.ggAvailableWidthWithScale = me._category_scroller.getBoundingClientRect().width;
					}
					me._category_scroller__horScrollBg.style.width = me._category_scroller.ggAvailableWidth + 'px';
					me._category_scroller.ggHPercentVisible = contentWidth != 0 ? me._category_scroller.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._category_scroller.ggHPercentVisible > 1.0) me._category_scroller.ggHPercentVisible = 1.0;
					me._category_scroller.ggScrollWidth = Math.round(me._category_scroller__horScrollBg.offsetWidth * me._category_scroller.ggHPercentVisible);
					me._category_scroller__horScrollFg.style.width = me._category_scroller.ggScrollWidth + 'px';
					me._category_scroller.ggScrollPosX = me._category_scroller.ggScrollPosXPercent * me._category_scroller.ggAvailableWidth;
					me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
					me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
					if (me._category_scroller.ggHPercentVisible < 1.0) {
						let percentScrolled = me._category_scroller.ggScrollPosX / (me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
						me._category_scroller__content.style.left = -(Math.round((me._category_scroller.ggContentWidth * (1.0 - me._category_scroller.ggHPercentVisible)) * percentScrolled)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._category_scroller.ggAvailableHeight = me._category_scroller.clientHeight;
					me._category_scroller.ggScrollPosX = 0;
					me._category_scroller.ggScrollPosXPercent = 0.0;
					me._category_scroller__content.style.left = this.ggContentLeftOffset + 'px';
				}
				if(me._category_scroller.ggVertScrollVisible) {
					me._category_scroller.ggAvailableWidth = me._category_scroller.clientWidth - 15;
					if (me._category_scroller.ggHorScrollVisible) {
						me._category_scroller.ggAvailableHeight = me._category_scroller.clientHeight - 15;
						me._category_scroller.ggAvailableHeightWithScale = me._category_scroller.getBoundingClientRect().height - me._category_scroller__vertScrollBg.getBoundingClientRect().width;
						me._category_scroller__cornerBg.style.visibility = 'inherit';
					} else {
						me._category_scroller.ggAvailableHeight = me._category_scroller.clientHeight;
						me._category_scroller.ggAvailableHeightWithScale = me._category_scroller.getBoundingClientRect().height;
						me._category_scroller__cornerBg.style.visibility = 'hidden';
					}
					me._category_scroller__vertScrollBg.style.height = me._category_scroller.ggAvailableHeight + 'px';
					me._category_scroller.ggVPercentVisible = contentHeight != 0 ? me._category_scroller.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._category_scroller.ggVPercentVisible > 1.0) me._category_scroller.ggVPercentVisible = 1.0;
					me._category_scroller.ggScrollHeight =  Math.round(me._category_scroller__vertScrollBg.offsetHeight * me._category_scroller.ggVPercentVisible);
					me._category_scroller__vertScrollFg.style.height = me._category_scroller.ggScrollHeight + 'px';
					me._category_scroller.ggScrollPosY = me._category_scroller.ggScrollPosYPercent * me._category_scroller.ggAvailableHeight;
					me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
					me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
					if (me._category_scroller.ggVPercentVisible < 1.0) {
						let percentScrolled = me._category_scroller.ggScrollPosY / (me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
						me._category_scroller__content.style.top = -(Math.round((me._category_scroller.ggContentHeight * (1.0 - me._category_scroller.ggVPercentVisible)) * percentScrolled)) + me._category_scroller.ggContentTopOffset + 'px';
					}
				} else {
					me._category_scroller.ggAvailableWidth = me._category_scroller.clientWidth;
					me._category_scroller.ggScrollPosY = 0;
					me._category_scroller.ggScrollPosYPercent = 0.0;
					me._category_scroller__content.style.top = this.ggContentTopOffset + 'px';
					me._category_scroller__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._category_scroller.ggHorScrollVisible || vertScrollWasVisible != me._category_scroller.ggVertScrollVisible) {
					me.updateSize(me._category_scroller);
					me._category_scroller.ggUpdatePosition();
				}
			}
		}
		el=me._category_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 170;
		el.ggHeight = 40;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		el.ggUpdate = function(filter) {
			if(me._category_cloner.ggUpdating == true) return;
			me._category_cloner.ggUpdating = true;
			var el=me._category_cloner;
			var curNumCols = 0;
			curNumCols = me._category_cloner.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._category_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var firstNode;
			for (var i=0; i < el.ggTagTable.length; i++) {
				var cItem = el.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k]) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				var parameter={};
				parameter.top=(row * me._category_cloner.ggHeight) + 'px';
				parameter.left=(column * me._category_cloner.ggWidth) + 'px';
				parameter.width=me._category_cloner.ggWidth + 'px';
				parameter.height=me._category_cloner.ggHeight + 'px';
				parameter.index=currentIndex;
				var inst = new SkinCloner_category_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
			}
			me._category_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._category_cloner.parentNode.classList.contains('ggskin_subelement') && me._category_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._category_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggTagTable = [
			{tag:"room",title:"\u041a\u0430\u0431\u0456\u043d\u0435\u0442\u0438"},
			];
		el.ggId="category_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 40px;';
		hs+='left : 10px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 65px;';
		hs+='visibility : inherit;';
		hs+='width : 170px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._category_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._category_cloner.childNodes.length; i++) {
				var child=me._category_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._category_cloner.ggUpdatePosition=function (useTransition) {
				me._category_cloner.ggUpdate();
		}
		me._category_cloner.ggNodeChange=function () {
			me._category_cloner.ggUpdateConditionNodeChange();
		}
		me._category_scroller__content.appendChild(me._category_cloner);
		me.divSkin.appendChild(me._category_scroller);
		el=me._menu_open=document.createElement('div');
		els=me._menu_open__img=document.createElement('img');
		els.className='ggskin ggskin_menu_open';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAO50lEQVR4nO2deVBT1x7Hv4EEJUqFgEYUqQXcWFoX9GlVOipxqVP1Pa1ioehQtI7Tpz61LU7tMh3/0PG5tM+OFrtYB1/1qWChWm1xxQIFbTtKlFpABYQEIYCRAMk1eX8cgiEkcG9yN6mfGScQzj3n5/3ee5bf+Z1zgKeIConQBtCgNwB/AAFtn/4A+gHwBiAH4AGgFwAKgAlAC4DWtp/1AGoB1Nl8tvBrPjPEKEhfAMMAPAtgCIgAbFIHoAJAOYBbAB6ynL9biEUQBYAIAOEABoI/uywANAButP2r46lcpwgpiBRAJICxAIIFtMOWcgC/AigCqQJ5RwhBegGIBjAJpHoSIw8B5AG4AtIe8QafgngDmABgYtvPTwLNAH5p+9fMR4F8CCIBMAZALEiv6E'+
			'nEACAbwG8g7Q5ncC3IQABzQXpLPYEKAKcAVHNVAFeCSAFMB6mePDgqQyjMAPIBnAMHDT8XgvQHsAiAkoO8xYQWwDEA99nM1JPNzEC6sa+BjKR7On0BjAZQD6CGrUzZEkQCYAaA2SDV1V8FT5DBrCeAO2xlyEYe/wAwHuIZ+fPNsyAunltwsxfmriAyAEsAjHIzn56AEsAgAMUgDb9LuCOIDEA8gFA38uhp+IN08W/ARVFcFcQTQByAEBev78n4gbwparhQfbkiiATAAjytprpCASJMMdMLXREkFqQBf0rXKEF6nGVMLmIqSARI1/av2ptiSjDIwJH24JHJmKE/gPkQUAylUum1cuXK0JiYmOdCQkIGKpVKhVwul0skEonFYrEYDAaDVqvVlZWVaS5dunQ7NTW1VKvVGoWyt435IANHWqLQvblSAMkgzkLemT17dv/N'+
			'mze/OH78+AgvLy8Z3euMRqOpsLBQvWXLltzTp0+z6uJgiBbAftDwfdEVZCaAF92xyBVGjhzZZ//+/bGTJ08eLZG4/mJaLBb8/PPPv69YsSK7uLi4iUUTmZAH4Ex3iei0IUEAXgHPVdW6devCjhw5siw0NHSIO2IAgEQiQXBw8MCkpKQxBoNBm5+fr2PJTCYMBlAK4EFXiboTxAPEWejDklG0+PLLLyempKT8nUn1RAeZTCabNWvW88HBwa2ZmZmVbOZNAwmIKL+ii/FJd4JMAPFo8sahQ4emJiYmqtx9K5whkUgwZsyYsOHDh5vT09PLOSnEOX1BZh/vOUvQlSDeABaDuEh4Ydu2bS+sWrVqDh9lRUVFPSeXyxuys7O1fJRnQxDIW+Kwge9KkJcAhHFhkSNiY2P99+zZs9TT05PtORqnTJgwITQvL+9GWVkZLwEMbc'+
			'hAqqzbjv7orF6QA1gLErLDCyUlJctDQ0Of5as8K6WlpeVhYWFf81ysEcBukOqrA86exsng8e147733Ri5atGgyX+XZolAo+lEUpc3JyanlsVhPkCrrjv0fHAUgyEAac9548803p/JZnkjKHw8H7bOjN+R5AFGcm9PG0qVLByclJb3kyrWtra2tarW6pKio6HZNTU2dl5eXtE+fPoxjv/r16+dz69atkqKiIr0rdriIDGQ+XmP7paM3ZCwv5rSxbNkyxuK3trYaU1NTfwgICNg+evToIyqV6tSkSZMylErlnqSkpK8rKysZx00tX76ct4fQhjH2X9g36goAa/ixhVBbW7vG39/fj256g8FgiIuL+yYrK8tppIefn5/04sWLr0ZFRQ2nm69Op6v39/f/lG56FvkUQLvnwP4NieDTkujo6GeYiAEA77zzzvGuxACA+vp6'+
			'SqVSHa+traXtIlEoFH7R0dHPMLGFJSJtfxFUkBkzZgQySa9Wq0s+++wzWhM+Wq3WuHfv3vNM8lepVIzsYYlw219sBfEBz9GG4eHhAUzSZ2VlXWeSfteuXcUmk8lEN/3IkSMZ2cMSStj4Cm0FCQPPHt2BAwcyqiIuX76s6T7VY+rr6ymtVkt7VRRTe1hCArKED0BHQXgfJffp04eRJ0Cv19N+2q0YjUba1zC1h0Xa772tILwvK5PJZIz8ViNGjGD8BCsUCtrXSKVSoSL125drWA3oDdLl5RWTyfSISfqXX36ZkTtHpVIF+Pr60g78pijK5YhDN1GAaNAuCNtLj2nx8OFDRmvGZ86cOS44OLg33fTvv/8+o2lnvV7Pp9fXHn/gsSBC9C5QXV3dyCS9XC73Tk9Pf8XDo/ua5d133x0xderUTiPhrqiqqupyepVjAgCB35'+
			'CbN28yXhc+bty48Pz8/IWBgYFeztJs27bthS1btrzqgj18enztCQAed3MXw26Awgfh4eF91Gr1RleubWpqajp16tSVrKysErVa/WDAgAG9VCrV4AULFowNCQlxaU3jqFGj/i1gVMoNAP+zCpIMMrXIOxqNZrVSqewvRNl2dtQEBgbuFdCEewD2W6sswZYr5+XlMQ5I5oK8vLw/BDbBG3jchgi2kH/37t2/C1W2FYvFgt27d/8msBkdBBFs6fLFixd1arX6T6HKB4Dr16/funTpUr2QNqBtstAqhFAuAwDABx98cM5i4XSDBKdYLBZ89NFHjLzCHOEFiGRRf3p6uubs2bOFQpT9448//pKRkcHIacklVkF43fHGEQkJCdk6na6BzzLr6up08fHxZ/ksswuMwGNBhPLhtKPVao1vv/12Bl9Vl8VisWzcuPFEXV0dYw8y'+
			'RzwCHgsipA+nna+++qr81KlTuXyUdfLkybwDBw5U8FEWTZoBkQkCAPHx8ec1Gg2ni2s0Gs39+Pj4c1yW4QIdBGHk5OOSxsZGas2aNRlms5mTatRsNptXr16d/uDBA0aufx5oBB4LIvjmj7YcPXq0+vjx45c4yvuimHpVNtQBjwUR0svpkMTExJyKigpWNwqrqKioWr58+WU282SRWkDEgrS0tJhXrFiRTlEUK1ULRVGP3njjjYyWlhbBe5RO6PCGiKrKsnLmzJnagwcPsjJOOHDgQPZPP/0kugfPhlqgY9jPGggwr94dUqlUUlxcvDw0NNTlIIySkpK7o0aN+oaiKGH8M92jAwkp7eA64Xu9HS0oirIkJiZmMAnnsaW1tdW4bNmyEyIWAyCbawLoKMhdAQyhRW5ubsO+fftOu3Lt559/fiY3N5dXl4wLtN972yrLB8'+
			'B6iHQfEw8PD1y7du21iIiIYd2nJqjV6j8jIyP/y6VdLLED5CSHDm+IHmQLCFFiNpvx+uuvZzU3N9PyKjQ3NzfHx8dncW0XC2jQJgbQeQWVHMBzvJrDAI1GY/T29m6MiYnpNiBj69atmYcPH+Z7cwBXKICTKgsQYMGOK1y9evXVsWPHOhXl6tWrN6Kjo4/yaZMb/Ac2ww77CSodRNrbsmXx4sXf6/V6h+E6er2+acmSJd/zbZOLlMNuDOgo2NkCYCQv5rhIfX09RVFUrUql6rQucPPmzcdOnjwp2rbQjguwW/TpqEclA/AvPAEnGeTk5MyfMmXKaJvff4uJickU0iYGGADsAjkrqx1Hc+omkIZG9CxZsuR0Q0NDIwA0NDQ0xsXFdbsflYi4AjsxAOdBDgVom+MVM1VVVa2bNm06YbFYsGnTphNVVVWCxwbQxAhywkIn'+
			'nC2YMYGEpXC2qkoqlUo2bNgw/K233oqIiYkJKC0tbdTpdIzdI1euXGkoLy+//cUXX7jkaRg2bJj8ww8/fD4xMXFYSEhIr4KCAh1Hc2O25IJsS96Jrkbl3gD+CQ7aksDAQK/Lly/Hh4SEtDsMW1paWtauXXskNTX1DtvlOWPlypVDP/nkkyW9e/duX3NSVlZWPmXKlEPV1dVc1RDNII5EhwPc7twkfwPA+v5V586dmztt2rRo++8NBoNh6NChu+/fv895JEj//v1ld+7cWSeXyzs9cOfPn78yffr0kxwV/QPImVYO6W6b2EKQrTZYXS49adKkSEffy+VyeXJycsj27dtvHTx4cKpCoZBTFPUoJSUlr6io6GFCQkJQQkJC+7Vms9myc+fOK9nZ2XWxsbH+69evj/bw8Gh/yNLS0orS0tIqIyMj+27dunWSVCr11Ol0hs'+
			'TExJzk5OQQR2LY2MeFIDUg99Qp3QliBpAFIAksRjnaVhH2+Pr69h40aFCvRYsWTZXJZFIAuHDhwp2ioqI/4+LiRs2aNetvtunv3r2ry87Orlu4cGHInDlzJtr+jaKoR2lpaZWzZ88OnDt37osAYDKZqJSUlAJfX1+nNnRlnxuYAWSimxg4up7dWSDnDrLCvXv3Vg0aNMjhWzd//vx9mZmZWj8/P6mPj4/UZDKZrfW5h4cHgoKC2m+W2Wy2VFZWtvesgoKCetm+IZWVlS3WBjowMNBLJpN56PV6qr6+npo3b57yu+++W+XIhqqqKu3gwYP3sfTftZIPoNspBCYbKa8AS1XX+vXrw3bs2BFv/31hYaF6woQJx9gogw4FBQWLxo8f32k7kQ0bNhzauXNnCYtF0d5Ime46cTOIR3I0g2uckpeXp2tqaqqKiooa4OPj09dg'+
			'MDSfPn26YN68eT8YjUbeZva+/fbbP6KiojyHDBnSXyaTyaqrq7Uff/xx5o4dO9gUwwggDTQPQWY6GRUBcgKbKCexRMpRkLNEaMH0ab8P4usSy2HCYucyuujiOsKV6uc2yLxJTz+n0F2ugZwKyghX24NbINtmiy5sSCSUgBw6ydgH46ogFgA3QaouXxfz6KncBnAYLh7L6k6PyQzSWA3C0zfFSgmIGC67ftztwlpF8QcwwM28nnSKQHpUbh1YzMY+69bqyxMCbIImEnJAGnC3/fZsbnx/GyRgOIzlfMWMEUAGGHZtu4LtG1cD4A+Qxr4vy3mLDS3ICPwOm5ly8SQ3AfgdZAAZhJ43qreAOAqPgaY7hAlc3yzr+VU9ZRBZA+JC5ywiko+n1wPkJIBpaNtX8AmkBcB5kMklTifc+axOvAFMBDkKQ7DdhxjSDBKBkw+elo'+
			'4LUb/3AnljJkK8DX8TyLmDheB52xEhG1wZiDt/HGz2rRWYCgBXQQa7gmy5IZYekD+IOOHg/3hXDch+h2qIYPGrWASx5RmQwWUwyMif0XEWNKgHiTq/C+J7EnJr2E6IURB7eoNsoepv8/kMSACfN8h8v/UsJxOIL6kZJJj5AchTX2vzyWjz5qf8xfk/x3iI846G7NcAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="menu_open";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._menu_open.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._menu_open.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('category_visible') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._menu_open.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._menu_open.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._menu_open.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStatePosition == 0) {
					me._menu_open.style.left='130px';
					me._menu_open.style.top='5px';
				}
				else {
					me._menu_open.style.left='10px';
					me._menu_open.style.top='10px';
				}
			}
		}
		me._menu_open.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['menu_open'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else if (
				((player.getVariableValue('category_visible') == false))
			)
			{
				newLogicStateAlpha = 1;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._menu_open.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._menu_open.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._menu_open.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStateAlpha == 0) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
				else if (me._menu_open.ggCurrentLogicStateAlpha == 1) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=0.6;
				}
				else {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
			}
		}
		me._menu_open.onclick=function (e) {
			if (
				(
					((player.getVariableValue('node_visible') == false))
				)
			) {
				player.setVariableValue('category_visible', !player.getVariableValue('category_visible'));
			}
			player.setVariableValue('node_visible', false);
		}
		me._menu_open.onmouseover=function (e) {
			me.elementMouseOver['menu_open']=true;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.onmouseout=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ontouchend=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._menu_open);
		el=me._gyro=document.createElement('div');
		el.ggId="gyro";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._gyro.onclick=function (e) {
			player.setUseGyro(!(player.getUseGyro()));
		}
		me._gyro.onmouseover=function (e) {
			me.elementMouseOver['gyro']=true;
			me._tt_gyro.logicBlock_visible();
		}
		me._gyro.onmouseout=function (e) {
			me.elementMouseOver['gyro']=false;
			me._tt_gyro.logicBlock_visible();
		}
		me._gyro.ontouchend=function (e) {
			me.elementMouseOver['gyro']=false;
			me._tt_gyro.logicBlock_visible();
		}
		me._gyro.ggUpdatePosition=function (useTransition) {
		}
		el=me._gyro_on=document.createElement('div');
		els=me._gyro_on__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._gyro_on__img.setAttribute('src',basePath + 'images/gyro_on.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._gyro_on__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		me._gyro_on__imgo.setAttribute('src',basePath + 'images/gyro_on__o.svg');
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="gyro_on";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro_on.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getUseGyro() == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._gyro_on.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._gyro_on.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._gyro_on.style[domTransition]='opacity 0s';
				if (me._gyro_on.ggCurrentLogicStateAlpha == 0) {
					me._gyro_on.style.visibility=me._gyro_on.ggVisible?'inherit':'hidden';
					me._gyro_on.style.opacity=1;
				}
				else {
					me._gyro_on.style.visibility="hidden";
					me._gyro_on.style.opacity=0;
				}
			}
		}
		me._gyro_on.onmouseover=function (e) {
			me._gyro_on__img.style.visibility='hidden';
			me._gyro_on__imgo.style.visibility='inherit';
		}
		me._gyro_on.onmouseout=function (e) {
			me._gyro_on__img.style.visibility='inherit';
			me._gyro_on__imgo.style.visibility='hidden';
		}
		me._gyro_on.ggUpdatePosition=function (useTransition) {
		}
		me._gyro.appendChild(me._gyro_on);
		el=me._gyro_off=document.createElement('div');
		els=me._gyro_off__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._gyro_off__img.setAttribute('src',basePath + 'images/gyro_off.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._gyro_off__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		me._gyro_off__imgo.setAttribute('src',basePath + 'images/gyro_off__o.svg');
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="gyro_off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro_off.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getUseGyro() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._gyro_off.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._gyro_off.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._gyro_off.style[domTransition]='opacity 0s';
				if (me._gyro_off.ggCurrentLogicStateAlpha == 0) {
					me._gyro_off.style.visibility=me._gyro_off.ggVisible?'inherit':'hidden';
					me._gyro_off.style.opacity=1;
				}
				else {
					me._gyro_off.style.visibility="hidden";
					me._gyro_off.style.opacity=0;
				}
			}
		}
		me._gyro_off.onmouseover=function (e) {
			me._gyro_off__img.style.visibility='hidden';
			me._gyro_off__imgo.style.visibility='inherit';
		}
		me._gyro_off.onmouseout=function (e) {
			me._gyro_off__img.style.visibility='inherit';
			me._gyro_off__imgo.style.visibility='hidden';
		}
		me._gyro_off.ggUpdatePosition=function (useTransition) {
		}
		me._gyro.appendChild(me._gyro_off);
		el=me._tt_gyro=document.createElement('div');
		els=me._tt_gyro__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_gyro";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_gyro.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_gyro.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_gyro.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_gyro.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_gyro.style[domTransition]='left 0s, top 0s';
				if (me._tt_gyro.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_gyro.style.top='-25px';
					me._tt_gyro.ggUpdatePosition(true);
				}
				else {
					me._tt_gyro.ggDx=0;
					me._tt_gyro.style.top='32px';
					me._tt_gyro.ggUpdatePosition(true);
				}
			}
		}
		me._tt_gyro.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['gyro'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_gyro.style[domTransition]='left 0s, top 0s';
				if (me._tt_gyro.ggCurrentLogicStateVisible == 0) {
					me._tt_gyro.style.visibility=(Number(me._tt_gyro.style.opacity)>0||!me._tt_gyro.style.opacity)?'inherit':'hidden';
					me._tt_gyro.ggVisible=true;
				}
				else {
					me._tt_gyro.style.visibility="hidden";
					me._tt_gyro.ggVisible=false;
				}
			}
		}
		me._tt_gyro.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getUseGyro() == true))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((player.getUseGyro() == false))
			)
			{
				newLogicStateText = 1;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_gyro.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_gyro.ggCurrentLogicStateText = newLogicStateText;
				me._tt_gyro.style[domTransition]='left 0s, top 0s';
				if (me._tt_gyro.ggCurrentLogicStateText == 0) {
					me._tt_gyro.ggText="Gyroscope Off";
					me._tt_gyro__text.innerHTML=me._tt_gyro.ggText;
					if (me._tt_gyro.ggUpdateText) {
					me._tt_gyro.ggUpdateText=function() {
						var hs="Gyroscope Off";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_gyro.ggUpdatePosition) me._tt_gyro.ggUpdatePosition();
					}
				}
				else if (me._tt_gyro.ggCurrentLogicStateText == 1) {
					me._tt_gyro.ggText="Gyroscope On";
					me._tt_gyro__text.innerHTML=me._tt_gyro.ggText;
					if (me._tt_gyro.ggUpdateText) {
					me._tt_gyro.ggUpdateText=function() {
						var hs="Gyroscope On";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_gyro.ggUpdatePosition) me._tt_gyro.ggUpdatePosition();
					}
				}
				else {
					me._tt_gyro.ggText="";
					me._tt_gyro__text.innerHTML=me._tt_gyro.ggText;
					if (me._tt_gyro.ggUpdateText) {
					me._tt_gyro.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_gyro.ggUpdatePosition) me._tt_gyro.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_gyro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._gyro.appendChild(me._tt_gyro);
		me.divSkin.appendChild(me._gyro);
		el=me._instructionboxintro=document.createElement('div');
		el.ggId="instruction-box-intro";
		el.ggDx=0;
		el.ggDy=-50;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 482px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._instructionboxintro.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._instructionboxintro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._instructionboxvideo=document.createElement('div');
		els=me._instructionboxvideo__img=document.createElement('img');
		els.className='ggskin ggskin_instructionboxvideo';
		hs=basePath + 'images/instructionboxvideo.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="instruction-box-video";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 482px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._instructionboxvideo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._instructionboxvideo.onclick=function (e) {
			me._instructionboxintro.style[domTransition]='none';
			me._instructionboxintro.style.visibility='hidden';
			me._instructionboxintro.ggVisible=false;
			if (me._instruction.ggApiPlayer) {
				if (me._instruction.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._instruction.ggApiPlayer.pauseVideo();
						me._instruction.ggApiPlayer.seekTo(0);
					};
					if (me._instruction.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._instruction.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._instruction.ggApiPlayerType == 'vimeo') {
					me._instruction.ggApiPlayer.pause();
					me._instruction.ggApiPlayer.setCurrentTime(0);
				}
			} else {
				player.stopSound("instruction");
			}
				player.playSound("Element01","1");
		}
		me._instructionboxvideo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._instructionboxintro.appendChild(me._instructionboxvideo);
		el=me._instruction=document.createElement('div');
		me._instruction.seekbars = [];
		me._instruction.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._instruction.seekbars.length; i++) {
					var seekbar = me.findElements(me._instruction.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._instruction.hasChildNodes()) {
				me._instruction.removeChild(me._instruction.lastChild);
			}
			if (me._instruction__vid) {
				me._instruction__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._instruction.ggVideoNotLoaded ==false && me._instruction.ggDeactivate) { me._instruction.ggDeactivate(); }
				me._instruction.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('instruction');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._instruction.ggVideoNotLoaded = false;
			me._instruction__vid=document.createElement('video');
			me._instruction__vid.className='ggskin ggskin_video';
			me._instruction__vid.setAttribute('width', '100%');
			me._instruction__vid.setAttribute('height', '100%');
			me._instruction__vid.setAttribute('controlsList', 'nodownload');
			me._instruction__vid.setAttribute('oncontextmenu', 'return false;');
			me._instruction__vid.setAttribute('controls', '');
			me._instruction__source=document.createElement('source');
			me._instruction__source.setAttribute('src', media);
			me._instruction__vid.setAttribute('playsinline', 'playsinline');
			me._instruction__vid.setAttribute('style', ';');
			me._instruction__vid.style.outline = 'none';
			me._instruction__vid.appendChild(me._instruction__source);
			me._instruction.appendChild(me._instruction__vid);
			var videoEl = player.registerVideoElement('instruction', me._instruction__vid);
			videoEl.autoplay = false;
			player.changeVolume('instruction', 0.0);
			notifySeekbars();
			me._instruction.ggVideoSource = media;
		}
		el.ggId="instruction";
		el.ggDx=0;
		el.ggDy=55;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 350px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 291px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._instruction.ggIsActive=function() {
			if (me._instruction__vid != null) {
				return (me._instruction__vid.paused == false && me._instruction__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._instruction.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._instructionboxintro.appendChild(me._instruction);
		me.divSkin.appendChild(me._instructionboxintro);
		me._map_10.ggMarkerInstances=[];
		me._map_10.ggMapId = 'FloorPlan01';
		me._map_10.ggLastNodeId=null;
		me._map_10.ggMarkerArray=[];
		me._map_10.ggGoogleMarkerArray=[];
		me._map_10.ggLastZoom = -1;
		me._map_10.ggRadar={ lastFov : -1, lastPan : -1, lastZoom : -1,activeNodeLatLng : null, poly : null }
		me._map_10.ggRadar.update=function() {
			var radar=me._map_10.ggRadar;
			var map=me._map_10.ggMap;
			if (!map) return;
			var d2r = Math.PI/180 ;
			var r2d = 180/Math.PI ;
			var fov = player.getFov();
			var pan = player.getPanNorth();
			var zoom = map.getZoom();
			var gps;
			if (player.getMapType(me._map_10.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_10.ggMapId);
				pan -= me._map_10.ggFloorplanNorth;
			}
			var filterpassed = true;
			var currentId = player.getCurrentNode();
			if (me._map_10.ggFilteredIds.length > 0 && me._map_10.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0)) && filterpassed) {
				if (zoom<6) zoom = 6; // avoid large radar beams on world map
				if ((radar.poly) && (fov==radar.lastFov) && (pan==radar.lastPan) && (zoom==radar.lastZoom) && (gps[0]==radar.activeNodeLatLng.lat) && (gps[1]==radar.activeNodeLatLng.lng)) return; 
				radar.lastPan=pan;radar.lastFov=fov;radar.lastZoom=zoom;
				radar.activeNodeLatLng = L.latLng(gps[0], gps[1]);
				var tileDeg = 360.0 / Math.pow(2, zoom);
				var rLng = tileDeg * 0.195313;
				var rLat = rLng * Math.cos(radar.activeNodeLatLng.lat * d2r);
				var radar_path = [];
				radar_path.push(radar.activeNodeLatLng);
				var segments=5;
				for (i=-segments; i<=segments; i++) {
					var angle = (fov / (2*segments)) * i;
					var x = -rLng * Math.sin((pan+angle)*d2r) + radar.activeNodeLatLng.lng;
					var y =  rLat * Math.cos((pan+angle)*d2r) + radar.activeNodeLatLng.lat;
					radar_path.push(L.latLng(y, x));
				}
				if (radar.poly) {
					radar.poly.removeFrom(map);
					radar.poly = null;
				}
				radar.poly = L.polygon(radar_path, {
					color: '#ff0000',
					opacity: 0.8,
					weight: 1,
					fill: true,
					fillColor: '#ff0000',
					fillOpacity: 0.35
				}).addTo(map);
			} else {
				if (radar) {
					activeNodeLatLng = L.latLng(0,0);
					if (radar.poly) {
						radar.poly.removeFrom(map);
						radar.poly = null;
					}
				}
			}
		}
		me._map_10.ggTileAvailable=function(x, y, z) {
			var mapDetails = player.getMapDetails(me._map_10.ggMapId);
			if (z < 7 || z > 7 + (mapDetails['zoomlevels'] - 1)) return false;
			var mapAR = mapDetails['width'] / mapDetails['height'];
			if (mapDetails['width'] >= mapDetails['height']) {
			var tilesInX = Math.pow(2, z - 7);
			var tilesInY = Math.ceil(tilesInX / mapAR);
			} else {
				var tilesInY = Math.pow(2, z - 7);
				var tilesInX = Math.ceil(tilesInY * mapAR);
			}
			var tilesXStart = Math.pow(2, z - 1);
			var tilesYStart = tilesXStart;
			var tilesXEnd = tilesXStart + tilesInX - 1;
			var tilesYEnd = tilesYStart + tilesInY - 1;
			if (x < tilesXStart || x > tilesXEnd || y < tilesYStart || y > tilesYEnd) return false;
			return true;
		}
		me._map_10.ggInitMap=function(keepZoom) {
			me._map_10.ggMapNotLoaded = false;
			var mapType = player.getMapType(me._map_10.ggMapId);
			var mapDetails = player.getMapDetails(me._map_10.ggMapId);
			if (mapType == 'file') {
				me._map_10.style.backgroundColor = mapDetails['bgcolor'];
				me._map_10.ggFloorplanNorth = mapDetails['floorplannorth'];
			} else {
				me._map_10.style.backgroundColor = '#fff';
			}
			var gps;
			if (player.getMapType(me._map_10.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_10.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				activeNodeLatLng = L.latLng(gps[0], gps[1]);
			} else {
				activeNodeLatLng = L.latLng(0,0);
			}
			if (mapType == 'web') {
				if (me._map_10.ggLastZoom == -1) me._map_10.ggLastZoom = 2;
				var initZoom = keepZoom ? me._map_10.ggLastZoom : 2;
				var maxZoom = ((mapDetails['mapprovider'] == 'openstreetmap') && (mapDetails['mapstyle'] == 'outdoors')) ? 17 : 18;
				if (mapDetails['mapprovider'] == 'custom') maxZoom = mapDetails['mapmaxzoom'];
				var mapOptions = {
					zoom: initZoom,
					zoomControl: true,
					attributionControl: false,
					maxZoom: maxZoom
				};
				me._map_10.ggMap = L.map(me._map_10, mapOptions).setView(activeNodeLatLng, initZoom);
				if (mapDetails['mapprovider'] == 'openstreetmap') {
					if (mapDetails['mapstyle'] == 'streets') {
						L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{}).addTo(me._map_10.ggMap);
					} else if (mapDetails['mapstyle'] == 'outdoors') {
						L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{}).addTo(me._map_10.ggMap);
					}
				} else if (mapDetails['mapprovider'] == 'mapbox') {
					if (mapDetails['styleurl'] == '') {
						if (mapDetails['mapstyle'] == 'satellite') {
							L.tileLayer('https://api.mapbox.com/v4/mapbox.' + mapDetails['mapstyle'] +  '/{z}/{x}/{y}@2x.png?access_token=' + mapDetails['mapkey'],{}).addTo(me._map_10.ggMap);
						} else {
							L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/' + mapDetails['mapstyle'] +  '-v11/tiles/{z}/{x}/{y}@2x?access_token=' + mapDetails['mapkey'],{ tileSize: 512, zoomOffset: -1 }).addTo(me._map_10.ggMap);
						}
					} else {
						var styleurlstring = mapDetails['styleurl'];
						styleurlstring = styleurlstring.slice(styleurlstring.indexOf('styles/') + 7);
						L.tileLayer('https://api.mapbox.com/styles/v1/' + styleurlstring + '/tiles/256/{z}/{x}/{y}@2x?access_token=' + mapDetails['mapkey'],{}).addTo(me._map_10.ggMap);
					}
				} else if (mapDetails['mapprovider'] == 'custom') {
					L.tileLayer(mapDetails['mapurltemplate'],{ maxZoom: mapDetails['mapmaxzoom']}).addTo(me._map_10.ggMap);
				}
			} else if (mapType == 'file') {
				me._map_10.ggCalculateFloorplanDimInDeg(mapDetails);
				var mapCenter = activeNodeLatLng;
				if (mapCenter.lat == 0.0 && mapCenter.lng == 0.0) {
					mapCenter.lat = -me._map_10.mapHeightInDeg / 2;
					mapCenter.lng = me._map_10.mapWidthInDeg / 2;
				}
				if (me._map_10.ggLastZoom == -1) me._map_10.ggLastZoom = 7;
				var initZoom = keepZoom ? me._map_10.ggLastZoom : 9;
				var mapOptions = {
					zoom: initZoom,
					minZoom: 7,
					maxZoom: 7 + (mapDetails['zoomlevels'] - 1) + 0,
					center: mapCenter,
					zoomControls: true,
					attributionControl: false
				};
				me._map_10.ggMap = L.map(me._map_10, mapOptions).setView(activeNodeLatLng, initZoom);
				var MapLayer = L.TileLayer.extend({
					getTileUrl: function(coords){
						if (me._map_10.ggTileAvailable(coords.x, coords.y, coords.z)) {
							return basePath + 'images/maptiles/' + me._map_10.ggMapId + '/' + coords.z + '/' + coords.x + '_' + coords.y + '.' + mapDetails['tileformat'];
						} else {
							return '';
						}
					}
				});
				var mapLayer = new MapLayer();
				mapLayer.addTo(me._map_10.ggMap);
				me._map_10.ggMap.on('move zoom', function() {
					me._map_10.ggCheckBounds(mapDetails);
				});
				me._map_10.ggCheckBounds(mapDetails);
			}
		}
		me._map_10.ggClearMap=function() {
		if (me._map_10.ggMap) me._map_10.ggMap.remove();
		me._map_10.ggMap = null;
		me._map_10.ggClearMapMarkers();
		me._map_10.ggMapNotLoaded = true;
		}
		me._map_10.ggClearMapMarkers=function() {
			me._map_10.ggLastActivMarker = null;
			var id,marker;
			var markers=me._map_10.ggGoogleMarkerArray;
			for (id in markers) {
				if (markers.hasOwnProperty(id)) {
					marker=markers[id];
					marker.removeFrom(me._map_10.ggMap);
				}
			}
			me._map_10.ggGoogleMarkerArray=[];
		}
		me._map_10.ggCenterNode=function() {
			if (!me._map_10.ggMap) return;
			var gps;
			if (player.getMapType(me._map_10.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_10.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				var markerLocation = L.latLng(gps[0], gps[1]);
				me._map_10.ggMap.panTo(markerLocation, {animate: false});
			}
		}
		me._map_10.ggFitBounds=function(force) {
			if (me._map_10.ggMapNotLoaded) return;
			if (me._map_10.ggMarkerBounds.isValid()) {
				if (me._map_10.ggMarkerInstances.length > 1 || Object.getOwnPropertyNames(me._map_10.ggGoogleMarkerArray).length > 1) {
					if (force) {
					me._map_10.ggMap.zoomOut(1, {animate: false});
					me._map_10.ggMap.fitBounds(me._map_10.ggMarkerBounds, {padding: [30, 30], animate: false});
					} else {
						if (player.getMapType(me._map_10.ggMapId) == 'web') {
							me._map_10.ggMap.setZoom(2);
						} else {
							me._map_10.ggMap.setZoom(7 + 2);
						}
					}
				} else {
					me._map_10.ggMap.setView(me._map_10.ggMarkerBounds.getCenter(), me._map_10.ggMap.getZoom());
					if (player.getMapType(me._map_10.ggMapId) == 'web') {
						if (force) {
						me._map_10.ggMap.setZoom(18);
						} else {
							me._map_10.ggMap.setZoom(2);
						}
					} else {
						if (force) {
						me._map_10.ggMap.setZoom(7);
						} else {
							me._map_10.ggMap.setZoom(7 + 2);
						}
					}
				}
			}
		}
		me._map_10.ggInitMapMarkers=function(updateMapBounds) {
			me._map_10.ggClearMapMarkers();
			var ids=player.getNodeIds();
			me._map_10.ggFilteredIds = [];
			if (me._map_10.ggFilter != '') {
				var filter = me._map_10.ggFilter.split(',');
				for (i=0; i < ids.length; i++) {
					var nodeId = ids[i];
					var nodeData = player.getNodeUserdata(nodeId);
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_10.ggFilteredIds.push(nodeId);
					}
				}
				if (me._map_10.ggFilteredIds.length > 0) ids = me._map_10.ggFilteredIds;
			}
			var marker;
			var markerLocation;
			me._map_10.ggMarkerBounds = L.latLngBounds();
			var currentId = player.getCurrentNode();
			for(var i=0;i<ids.length;i++) {
				var id=ids[i];
				var gps;
				if (player.getMapType(me._map_10.ggMapId) == 'web') {
					gps=player.getNodeLatLng(id);
				} else {
					gps=player.getNodeMapCoords(id, me._map_10.ggMapId);
				}
				if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
					markerLocation = L.latLng(gps[0], gps[1]);
					var mapIcon = L.icon({iconUrl: basePath + 'images/_ggMapPin.png', iconRetinaUrl: basePath + 'images/_ggMapPin.png', iconSize : [40, 40], iconAnchor: [20, 40]});
					marker = L.marker(markerLocation, {title: player.getNodeTitle(id), icon: mapIcon});
					marker.ggId=id;
					marker.on('click', function() {
						player.openNext('{' + this.ggId + '}');
						activeNodeLatLng=me.position;
						lastFov=-1; // force radar update
					});
					marker.addTo(me._map_10.ggMap);
					me._map_10.ggGoogleMarkerArray[id] = marker;
					me._map_10.ggMarkerBounds.extend(markerLocation);
				}
			}
			if (ids.length > 1 && me._map_10.ggMarkerBounds.isValid() && updateMapBounds) {
				me._map_10.ggFitBounds(false);
			}
			skin.updateSize(me._map_10);
			this.ggLastActivMarker = null;
			if (this.ggUpdateConditionNodeChange) this.ggUpdateConditionNodeChange();
			this.ggRadar.lastFov = -1;
		}
		me._map_10.ggChangeMap=function(mapId) {
			var newMapType = player.getMapType(mapId)
			if (newMapType == 'web') {
				return;
			}
			me._map_10.ggMapId = mapId;
			if (!me._map_10.ggMapNotLoaded) {
				if (me._map_10.ggMap) {
					me._map_10.ggLastZoom = me._map_10.ggMap.getZoom();
				}
				me._map_10.ggClearMap();
				me._map_10.ggInitMap(true);
				me._map_10.ggInitMapMarkers(false);
				var mapDetails = player.getMapDetails(me._map_10.ggMapId);
				me._map_10.ggCalculateFloorplanDimInDeg(mapDetails);
				me._map_10.ggCheckBounds(mapDetails);
			}
		}
		me._map_10.ggCalculateFloorplanDimInDeg=function(mapDetails) {
			var mapAR = mapDetails['width'] / mapDetails['height'];
			var tileInDeg = 360.0 / Math.pow(2, 7);
			if (mapDetails['width'] >= mapDetails['height']) {
				var tmpWidth = mapDetails['width'];
				while (tmpWidth > 256) {
					tmpWidth /= 2;
				}
				me._map_10.mapWidthInDeg = tileInDeg * (tmpWidth / 256);
				me._map_10.mapHeightInDeg = me._map_10.mapWidthInDeg / mapAR;
			} else {
				var tmpHeight = mapDetails['height'];
				while (tmpHeight > 256) {
					tmpHeight /= 2;
				}
				me._map_10.mapHeightInDeg = tileInDeg * (tmpHeight / 256);
				me._map_10.mapWidthInDeg = me._map_10.mapHeightInDeg * mapAR;
			}
		}
		me._map_10.ggInCheckBounds=false;
		me._map_10.ggCheckBounds=function(mapDetails) {
			if (me._map_10.ggInCheckBounds) return;
			me._map_10.ggInCheckBounds = true;
			var mapCenter = me._map_10.ggMap.getCenter();
			var currentZoom = me._map_10.ggMap.getZoom();
			var pixelInDeg = 360.0 / (Math.pow(2, currentZoom) * 256)
			var xOffset = (me._map_10.clientWidth / 2.0) * pixelInDeg;
			var yOffset = (me._map_10.clientHeight / 2.0) * pixelInDeg;
			var x = mapCenter.lng;
			var y = mapCenter.lat;
			var xTemp = x;
			var yTemp = y;
			if (me._map_10.mapWidthInDeg < me._map_10.clientWidth * pixelInDeg) {
				var xMargin = (me._map_10.clientWidth * pixelInDeg - me._map_10.mapWidthInDeg) / 2;
				if (x < me._map_10.mapWidthInDeg / 2 - xMargin) x = me._map_10.mapWidthInDeg / 2 - xMargin;
				if (x > me._map_10.mapWidthInDeg / 2 + xMargin) x = me._map_10.mapWidthInDeg / 2 + xMargin;
			} else {
				if (x > me._map_10.mapWidthInDeg - xOffset) x = me._map_10.mapWidthInDeg - xOffset;
				if (x < xOffset) x = xOffset;
			}
			if (me._map_10.mapHeightInDeg < me._map_10.clientHeight * pixelInDeg) {
				var yMargin = (me._map_10.clientHeight * pixelInDeg - me._map_10.mapHeightInDeg) / 2;
				if (y < -me._map_10.mapHeightInDeg / 2 - yMargin) y = -me._map_10.mapHeightInDeg / 2 - yMargin;
				if (y > -me._map_10.mapHeightInDeg / 2 + yMargin) y = -me._map_10.mapHeightInDeg / 2 + yMargin;
			} else {
				if (y < -me._map_10.mapHeightInDeg + yOffset) y = -me._map_10.mapHeightInDeg + yOffset;
				if (y > -yOffset) y = -yOffset;
			}
			if (x != xTemp || y != yTemp) {
				var newCenter = L.latLng(y, x);
				me._map_10.ggMap.setView(newCenter, me._map_10.ggMap.getZoom(), {animate: false});
			}
			me._map_10.ggInCheckBounds = false;
		}
		me._map_1.ggMarkerInstances=[];
		me._map_1.ggMapId = 'googleroadmap';
		me._map_1.ggLastNodeId=null;
		me._map_1.ggMarkerArray=[];
		me._map_1.ggGoogleMarkerArray=[];
		me._map_1.ggLastZoom = -1;
		me._map_1.ggRadar={ lastFov : -1, lastPan : -1, lastZoom : -1,activeNodeLatLng : null, poly : null }
		me._map_1.ggRadar.update=function() {
			if ((typeof google !== 'object') || (typeof google.maps !== 'object')) return;
			var radar=me._map_1.ggRadar;
			var map=me._map_1.ggMap;
			if (!map) return;
			var d2r = Math.PI/180 ;
			var r2d = 180/Math.PI ;
			var fov = player.getFov();
			var pan = player.getPanNorth();
			var zoom = map.getZoom();
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
				pan -= me._map_1.ggFloorplanNorth;
			}
			var filterpassed = true;
			var currentId = player.getCurrentNode();
			if (me._map_1.ggFilteredIds.length > 0 && me._map_1.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0)) && filterpassed) {
				if (zoom<6) zoom = 6; // avoid large radar beams on world map
				if ((radar.poly) && (fov==radar.lastFov) && (pan==radar.lastPan) && (zoom==radar.lastZoom) && (gps[0]==radar.activeNodeLatLng.lat()) && (gps[1]==radar.activeNodeLatLng.lng())) return; 
				radar.lastPan=pan;radar.lastFov=fov;radar.lastZoom=zoom;
				radar.activeNodeLatLng = new google.maps.LatLng(gps[0], gps[1]);
				var tileDeg = 360.0 / Math.pow(2, zoom);
				var rLng = tileDeg * 0.195313;
				var rLat = rLng * Math.cos(radar.activeNodeLatLng.lat() * d2r);
				var radar_path = [];
				radar_path.push(radar.activeNodeLatLng);
				var segments=5;
				for (i=-segments; i<=segments; i++) {
					var angle = (fov / (2*segments)) * i;
					var x = -rLng * Math.sin((pan+angle)*d2r) + radar.activeNodeLatLng.lng();
					var y =  rLat * Math.cos((pan+angle)*d2r) + radar.activeNodeLatLng.lat();
					radar_path.push(new google.maps.LatLng(y, x));
				}
				if (radar.poly) {
					radar.poly.setMap(null);
					radar.poly = null;
				}
				radar.poly = new google.maps.Polygon({
					paths: radar_path,
					strokeColor: '#ff0000',
					strokeOpacity: 0.8,
					strokeWeight: 1,
					fillColor: '#ff0000',
					fillOpacity: 0.35
				});
				radar.poly.setMap(map);
			} else {
				if (radar) {
					activeNodeLatLng = new google.maps.LatLng(0,0);
					if (radar.poly) {
						radar.poly.setMap(null);
						radar.poly = null;
					}
				}
			}
		}
		me._map_1.ggTileAvailable=function(x, y, z) {
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (z < 7 || z > 7 + (mapDetails['zoomlevels'] - 1)) return false;
			var mapAR = mapDetails['width'] / mapDetails['height'];
			if (mapDetails['width'] >= mapDetails['height']) {
			var tilesInX = Math.pow(2, z - 7);
			var tilesInY = Math.ceil(tilesInX / mapAR);
			} else {
				var tilesInY = Math.pow(2, z - 7);
				var tilesInX = Math.ceil(tilesInY * mapAR);
			}
			var tilesXStart = Math.pow(2, z - 1);
			var tilesYStart = tilesXStart;
			var tilesXEnd = tilesXStart + tilesInX - 1;
			var tilesYEnd = tilesYStart + tilesInY - 1;
			if (x < tilesXStart || x > tilesXEnd || y < tilesYStart || y > tilesYEnd) return false;
			return true;
		}
		me._map_1.ggInitMap=function(keepZoom) {
			me._map_1.ggMapNotLoaded = false;
			var mapType = player.getMapType(me._map_1.ggMapId);
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (mapType == 'file') {
				me._map_1.style.backgroundColor = mapDetails['bgcolor'];
				me._map_1.ggFloorplanNorth = mapDetails['floorplannorth'];
			} else {
				me._map_1.style.backgroundColor = '#fff';
			}
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((typeof google !== 'object') || (typeof google.maps !== 'object')) return;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				activeNodeLatLng = new google.maps.LatLng(gps[0], gps[1]);
			} else {
				activeNodeLatLng = new google.maps.LatLng(0,0);
			}
			if (mapType == 'web') {
				var mapTypeId;
				if (me._map_1.ggMapId == 'googleroadmap') {
					mapTypeId = google.maps.MapTypeId.ROADMAP;
				} else if (me._map_1.ggMapId == 'googlehybrid') {
					mapTypeId = google.maps.MapTypeId.HYBRID;
				} else if (me._map_1.ggMapId == 'googlesatellite') {
					mapTypeId = google.maps.MapTypeId.SATELLITE;
				} else if (me._map_1.ggMapId == 'googleterrain') {
					mapTypeId = google.maps.MapTypeId.TERRAIN;
				} else {
					mapTypeId = mapDetails['mapprovider'];
				}
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 17;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 17;
				var mapOptions = {
					zoom: initZoom,
					center: activeNodeLatLng,
					mapTypeId: mapTypeId,
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false
				};
				me._map_1.ggMap = new google.maps.Map(me._map_1, mapOptions);
				if (mapTypeId == 'googlecustomstyle') {
					var styledMapType = new google.maps.StyledMapType(JSON.parse(mapDetails['googlecustomstylecode']), {name: 'Styled Map'});
					me._map_1.ggMap.mapTypes.set('styled_map', styledMapType);
					me._map_1.ggMap.setMapTypeId('styled_map');
				}
				if (mapTypeId == 'openstreetmap') {
					me._map_1.ggMap.mapTypes.set('openstreetmap', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							if (mapDetails['mapstyle'] == 'streets') {
								return 'https://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
							} else if (mapDetails['mapstyle'] == 'outdoors') {
								return 'https://a.tile.opentopomap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
							}
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: mapDetails['mapstyle'] == 'outdoors' ? 17 : 18
					}));
				}
				if (mapTypeId == 'mapbox') {
					me._map_1.ggMap.mapTypes.set('mapbox', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							if (mapDetails['styleurl'] == '') {
								if (mapDetails['mapstyle'] == 'satellite') {
									return 'https://api.mapbox.com/v4/mapbox.' + mapDetails['mapstyle'] + '/' + zoom + '/' + coord.x + '/' + coord.y + '@2x.png?access_token=' + mapDetails['mapkey'];
								} else {
									return 'https://api.mapbox.com/styles/v1/mapbox/' + mapDetails['mapstyle'] + '-v11/tiles/256/' + zoom + '/' + coord.x + '/' + coord.y + '@2x?access_token=' + mapDetails['mapkey'];
								}
							} else {
								var styleurlstring = mapDetails['styleurl'];
								styleurlstring = styleurlstring.slice(styleurlstring.indexOf('styles/') + 7);
								return 'https://api.mapbox.com/styles/v1/' + styleurlstring + '/tiles/256/' + zoom + '/' + coord.x + '/' + coord.y + '@2x?access_token=' + mapDetails['mapkey'];
							}
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: 18
					}));
				}
				if (mapTypeId == 'custom') {
					me._map_1.ggMap.mapTypes.set('custom', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							var urlString = mapDetails['mapurltemplate'];
							urlString = urlString.replace('{s}', 'a');
							urlString = urlString.replace('{z}', zoom);
							urlString = urlString.replace('{x}', coord.x);
							urlString = urlString.replace('{y}', coord.y);
							return urlString;
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: mapDetails['mapmaxzoom']
					}));
				}
			} else if (mapType == 'file') {
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 7;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 7;
				var mapOptions = {
				  backgroundColor: mapDetails['bgcolor'],
					zoom: initZoom,
					minZoom: 7,
					maxZoom: 7 + (mapDetails['zoomlevels'] - 1) + 0,
					center: activeNodeLatLng,
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false
				};
				me._map_1.ggMap = new google.maps.Map(me._map_1, mapOptions);
				var customMapType = new google.maps.ImageMapType({
					getTileUrl: function(coord, zoom) {
						if (me._map_1.ggTileAvailable(coord.x, coord.y, zoom)) {
							return basePath + 'images/maptiles/' + me._map_1.ggMapId + '/' + zoom + '/' + coord.x + '_' + coord.y + '.' + mapDetails['tileformat'];
						} else {
							return null;
						}
					},
					tileSize: new google.maps.Size(256, 256),
					minZoom: 7,
					maxZoom: 7 + mapDetails['zoomlevels'],
					name: mapDetails['title'],
				});
				me._map_1.ggMap.mapTypes.set(me._map_1.ggMapId, customMapType);
				me._map_1.ggMap.setMapTypeId(me._map_1.ggMapId);
				me._map_1.ggCalculateFloorplanDimInDeg(mapDetails);
				google.maps.event.addListener(me._map_1.ggMap, 'center_changed', function() {
					me._map_1.ggCheckBounds(mapDetails);
				});
				google.maps.event.addListener(me._map_1.ggMap, 'zoom_changed', function() {
					me._map_1.ggCheckBounds(mapDetails);
				});
			}
		}
		me._map_1.ggClearMap=function() {
		me._map_1.ggMap = null;
		me._map_1.ggClearMapMarkers();
		me._map_1.ggMapNotLoaded = true;
		}
		me._map_1.ggClearMapMarkers=function() {
			me._map_1.ggLastActivMarker = null;
			var id,marker;
			var markers=me._map_1.ggGoogleMarkerArray;
			for (id in markers) {
				if (markers.hasOwnProperty(id)) {
					marker=markers[id];
					marker.setMap(null);
				}
			}
			me._map_1.ggGoogleMarkerArray=[];
		}
		me._map_1.ggCenterNode=function() {
			if (!me._map_1.ggMap) return;
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				var markerLocation = new google.maps.LatLng(gps[0], gps[1]);
				me._map_1.ggMap.panTo(markerLocation);
			}
		}
		me._map_1.ggFitBounds=function(force) {
			if (me._map_1.ggMapNotLoaded) return;
			if (!me._map_1.ggMarkerBounds.isEmpty()) {
				if (me._map_1.ggMarkerInstances.length > 1 || Object.getOwnPropertyNames(me._map_1.ggGoogleMarkerArray).length > 1) {
					if (force) {
					me._map_1.ggMap.fitBounds(me._map_1.ggMarkerBounds, 30);
					} else {
						if (player.getMapType(me._map_1.ggMapId) == 'web') {
							me._map_1.ggMap.setZoom(17);
						} else {
							me._map_1.ggMap.setZoom(7 + 17);
						}
					}
				} else {
					me._map_1.ggMap.setCenter(me._map_1.ggMarkerBounds.getCenter());
					if (player.getMapType(me._map_1.ggMapId) == 'web') {
						if (force) {
						me._map_1.ggMap.setZoom(18);
						} else {
							me._map_1.ggMap.setZoom(17);
						}
					} else {
						if (force) {
						me._map_1.ggMap.setZoom(7);
						} else {
							me._map_1.ggMap.setZoom(7 + 17);
						}
					}
				}
			}
		}
		me._map_1.ggInitMapMarkers=function(updateMapBounds) {
			me._map_1.ggClearMapMarkers();
			var ids=player.getNodeIds();
			me._map_1.ggFilteredIds = [];
			if (me._map_1.ggFilter != '') {
				var filter = me._map_1.ggFilter.split(',');
				for (i=0; i < ids.length; i++) {
					var nodeId = ids[i];
					var nodeData = player.getNodeUserdata(nodeId);
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_1.ggFilteredIds.push(nodeId);
					}
				}
				if (me._map_1.ggFilteredIds.length > 0) ids = me._map_1.ggFilteredIds;
			}
			var marker;
			var markerLocation;
			me._map_1.ggMarkerBounds = new google.maps.LatLngBounds();
			var currentId = player.getCurrentNode();
			for(var i=0;i<ids.length;i++) {
				var id=ids[i];
				var gps;
				if (player.getMapType(me._map_1.ggMapId) == 'web') {
					gps=player.getNodeLatLng(id);
				} else {
					gps=player.getNodeMapCoords(id, me._map_1.ggMapId);
				}
				if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
					markerLocation = new google.maps.LatLng(gps[0], gps[1]);
					marker = new google.maps.Marker({position: markerLocation,map: me._map_1.ggMap});
					marker.setTitle(player.getNodeTitle(id));
					marker.setClickable(true);
					marker.ggId=id;
					google.maps.event.addListener(marker, 'click', function() {
						player.openNext('{' + this.ggId + '}');
						activeNodeLatLng=me.position;
						lastFov=-1; // force radar update
					});
					me._map_1.ggGoogleMarkerArray[id] = marker;
					me._map_1.ggMarkerBounds.extend(markerLocation);
				}
			}
			if (ids.length > 1 && !me._map_1.ggMarkerBounds.isEmpty() && updateMapBounds) {
				me._map_1.ggFitBounds(false);
			}
			skin.updateSize(me._map_1);
			this.ggLastActivMarker = null;
			if (this.ggUpdateConditionNodeChange) this.ggUpdateConditionNodeChange();
			this.ggRadar.lastFov = -1;
		}
		me._map_1.ggChangeMap=function(mapId) {
			var newMapType = player.getMapType(mapId)
			if (newMapType == 'file') {
				return;
			}
			me._map_1.ggMapId = mapId;
			if (!me._map_1.ggMapNotLoaded) {
				if (me._map_1.ggMap) {
					me._map_1.ggLastZoom = me._map_1.ggMap.getZoom();
				}
				me._map_1.ggClearMap();
				me._map_1.ggInitMap(true);
				me._map_1.ggInitMapMarkers(false);
			}
		}
		me._map_1.ggCalculateFloorplanDimInDeg=function(mapDetails) {
			var mapAR = mapDetails['width'] / mapDetails['height'];
			var tileInDeg = 360.0 / Math.pow(2, 7);
			if (mapDetails['width'] >= mapDetails['height']) {
				var tmpWidth = mapDetails['width'];
				while (tmpWidth > 256) {
					tmpWidth /= 2;
				}
				me._map_1.mapWidthInDeg = tileInDeg * (tmpWidth / 256);
				me._map_1.mapHeightInDeg = me._map_1.mapWidthInDeg / mapAR;
			} else {
				var tmpHeight = mapDetails['height'];
				while (tmpHeight > 256) {
					tmpHeight /= 2;
				}
				me._map_1.mapHeightInDeg = tileInDeg * (tmpHeight / 256);
				me._map_1.mapWidthInDeg = me._map_1.mapHeightInDeg * mapAR;
			}
		}
		me._map_1.ggInCheckBounds=false;
		me._map_1.ggCheckBounds=function(mapDetails) {
			if (me._map_1.ggInCheckBounds) return;
			me._map_1.ggInCheckBounds = true;
			var mapCenter = me._map_1.ggMap.getCenter();
			var currentZoom = me._map_1.ggMap.getZoom();
			var pixelInDeg = 360.0 / (Math.pow(2, currentZoom) * 256)
			var xOffset = (me._map_1.clientWidth / 2.0) * pixelInDeg;
			var yOffset = (me._map_1.clientHeight / 2.0) * pixelInDeg;
			var x = mapCenter.lng();
			var y = mapCenter.lat();
			var xTemp = x;
			var yTemp = y;
			if (me._map_1.mapWidthInDeg < me._map_1.clientWidth * pixelInDeg) {
				var xMargin = (me._map_1.clientWidth * pixelInDeg - me._map_1.mapWidthInDeg) / 2;
				if (x < me._map_1.mapWidthInDeg / 2 - xMargin) x = me._map_1.mapWidthInDeg / 2 - xMargin;
				if (x > me._map_1.mapWidthInDeg / 2 + xMargin) x = me._map_1.mapWidthInDeg / 2 + xMargin;
			} else {
				if (x > me._map_1.mapWidthInDeg - xOffset) x = me._map_1.mapWidthInDeg - xOffset;
				if (x < xOffset) x = xOffset;
			}
			if (me._map_1.mapHeightInDeg < me._map_1.clientHeight * pixelInDeg) {
				var yMargin = (me._map_1.clientHeight * pixelInDeg - me._map_1.mapHeightInDeg) / 2;
				if (y < -me._map_1.mapHeightInDeg / 2 - yMargin) y = -me._map_1.mapHeightInDeg / 2 - yMargin;
				if (y > -me._map_1.mapHeightInDeg / 2 + yMargin) y = -me._map_1.mapHeightInDeg / 2 + yMargin;
			} else {
				if (y < -me._map_1.mapHeightInDeg + yOffset) y = -me._map_1.mapHeightInDeg + yOffset;
				if (y > -yOffset) y = -yOffset;
			}
			if (x != xTemp || y != yTemp) {
				me._map_1.ggMap.setCenter(new google.maps.LatLng(y, x));
			}
			me._map_1.ggInCheckBounds = false;
		}
		me._instruction.ggInitMedia('media/instruction.mp4');
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._map_10.ggClearMap();
			me._map_10.ggInitMap(false);
			me._map_10.ggInitMapMarkers(true);
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(false);
			me._map_1.ggInitMapMarkers(true);
			me._node_cloner.ggUpdate();
			me._category_cloner.ggUpdate();
		});
		player.addListener('imagesready', function() {
			if (player.transitionsDisabled) {
				me._loading_container.style[domTransition]='none';
			} else {
				me._loading_container.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._loading_container.style.opacity='0';
			me._loading_container.style.visibility='hidden';
			me._node_scroller.ggUpdatePosition();
			me._category_scroller.ggUpdatePosition();
		});
		player.addListener('beforechangenode', function() {
			if (player.transitionsDisabled) {
				me._loading_container.style[domTransition]='none';
			} else {
				me._loading_container.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._loading_container.style.opacity='1';
			me._loading_container.style.visibility=me._loading_container.ggVisible?'inherit':'hidden';
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_spot_floor_arrow_360_sizechanged = function(){
		if(hotspotTemplates['spot_floor_arrow_360']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_floor_arrow_360'].length; i++) {
				if (hotspotTemplates['spot_floor_arrow_360'][i]._hostspot_marker_floor_arrow && hotspotTemplates['spot_floor_arrow_360'][i]._hostspot_marker_floor_arrow.logicBlock_size) {
					hotspotTemplates['spot_floor_arrow_360'][i]._hostspot_marker_floor_arrow.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changenode = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_configloaded = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._chevron_white_lower && hotspotTemplates['ht_node'][i]._chevron_white_lower.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._chevron_white_lower.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._chevron_black && hotspotTemplates['ht_node'][i]._chevron_black.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._chevron_black.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._chevron_white && hotspotTemplates['ht_node'][i]._chevron_white.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._chevron_white.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_sizechanged = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info_image && hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_size) {
					hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_configloaded = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information3 && hotspotTemplates['ht_info'][i]._tt_information3.logicBlock_position) {
					hotspotTemplates['ht_info'][i]._tt_information3.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_mouseover = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information3 && hotspotTemplates['ht_info'][i]._tt_information3.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information3.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_arrow_sizechanged = function(){
		if(hotspotTemplates['ht_info_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow'].length; i++) {
				if (hotspotTemplates['ht_info_arrow'][i]._ht_info_arrow_image && hotspotTemplates['ht_info_arrow'][i]._ht_info_arrow_image.logicBlock_size) {
					hotspotTemplates['ht_info_arrow'][i]._ht_info_arrow_image.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_arrow_configloaded = function(){
		if(hotspotTemplates['ht_info_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow'].length; i++) {
				if (hotspotTemplates['ht_info_arrow'][i]._tt_information_info_arrow && hotspotTemplates['ht_info_arrow'][i]._tt_information_info_arrow.logicBlock_position) {
					hotspotTemplates['ht_info_arrow'][i]._tt_information_info_arrow.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_arrow_mouseover = function(){
		if(hotspotTemplates['ht_info_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow'].length; i++) {
				if (hotspotTemplates['ht_info_arrow'][i]._tt_information_info_arrow && hotspotTemplates['ht_info_arrow'][i]._tt_information_info_arrow.logicBlock_visible) {
					hotspotTemplates['ht_info_arrow'][i]._tt_information_info_arrow.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_arrow_right_sizechanged = function(){
		if(hotspotTemplates['ht_info_arrow_right']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow_right'].length; i++) {
				if (hotspotTemplates['ht_info_arrow_right'][i]._ht_info_arrow_right_image && hotspotTemplates['ht_info_arrow_right'][i]._ht_info_arrow_right_image.logicBlock_size) {
					hotspotTemplates['ht_info_arrow_right'][i]._ht_info_arrow_right_image.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_arrow_right_configloaded = function(){
		if(hotspotTemplates['ht_info_arrow_right']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow_right'].length; i++) {
				if (hotspotTemplates['ht_info_arrow_right'][i]._tt_information_info_arrow_right && hotspotTemplates['ht_info_arrow_right'][i]._tt_information_info_arrow_right.logicBlock_position) {
					hotspotTemplates['ht_info_arrow_right'][i]._tt_information_info_arrow_right.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_arrow_right_mouseover = function(){
		if(hotspotTemplates['ht_info_arrow_right']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow_right'].length; i++) {
				if (hotspotTemplates['ht_info_arrow_right'][i]._tt_information_info_arrow_right && hotspotTemplates['ht_info_arrow_right'][i]._tt_information_info_arrow_right.logicBlock_visible) {
					hotspotTemplates['ht_info_arrow_right'][i]._tt_information_info_arrow_right.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_arrow_right_sizechanged = function(){
		if(hotspotTemplates['spot_arrow_right']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow_right'].length; i++) {
				if (hotspotTemplates['spot_arrow_right'][i]._hostspot_marker_right && hotspotTemplates['spot_arrow_right'][i]._hostspot_marker_right.logicBlock_size) {
					hotspotTemplates['spot_arrow_right'][i]._hostspot_marker_right.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_arrow_left_sizechanged = function(){
		if(hotspotTemplates['spot_arrow_left']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow_left'].length; i++) {
				if (hotspotTemplates['spot_arrow_left'][i]._hostspot_marker_left && hotspotTemplates['spot_arrow_left'][i]._hostspot_marker_left.logicBlock_size) {
					hotspotTemplates['spot_arrow_left'][i]._hostspot_marker_left.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_open_sizechanged = function(){
		if(hotspotTemplates['spot_open']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_open'].length; i++) {
				if (hotspotTemplates['spot_open'][i]._door && hotspotTemplates['spot_open'][i]._door.logicBlock_size) {
					hotspotTemplates['spot_open'][i]._door.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_open_close_door_sizechanged = function(){
		if(hotspotTemplates['spot_open_close_door']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_open_close_door'].length; i++) {
				if (hotspotTemplates['spot_open_close_door'][i]._external_12 && hotspotTemplates['spot_open_close_door'][i]._external_12.logicBlock_size) {
					hotspotTemplates['spot_open_close_door'][i]._external_12.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_open_close_curtain_sizechanged = function(){
		if(hotspotTemplates['spot_open_close_curtain']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_open_close_curtain'].length; i++) {
				if (hotspotTemplates['spot_open_close_curtain'][i]._external_11 && hotspotTemplates['spot_open_close_curtain'][i]._external_11.logicBlock_size) {
					hotspotTemplates['spot_open_close_curtain'][i]._external_11.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_sizechanged = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._design && hotspotTemplates['ht_image'][i]._design.logicBlock_size) {
					hotspotTemplates['ht_image'][i]._design.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_changenode = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_configloaded = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_mouseover = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_arrow_sizechanged = function(){
		if(hotspotTemplates['spot_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow'].length; i++) {
				if (hotspotTemplates['spot_arrow'][i]._hostspot_marker_floor0 && hotspotTemplates['spot_arrow'][i]._hostspot_marker_floor0.logicBlock_size) {
					hotspotTemplates['spot_arrow'][i]._hostspot_marker_floor0.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_arrow_current_view_sizechanged = function(){
		if(hotspotTemplates['spot_arrow_current_view']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow_current_view'].length; i++) {
				if (hotspotTemplates['spot_arrow_current_view'][i]._hostspot_marker_floor && hotspotTemplates['spot_arrow_current_view'][i]._hostspot_marker_floor.logicBlock_size) {
					hotspotTemplates['spot_arrow_current_view'][i]._hostspot_marker_floor.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_05_sizechanged = function(){
		if(hotspotTemplates['ht_info_05']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_05'].length; i++) {
				if (hotspotTemplates['ht_info_05'][i]._ht_info_05.logicBlock_scaling) {
					hotspotTemplates['ht_info_05'][i]._ht_info_05.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_play_sizechanged = function(){
		if(hotspotTemplates['spot_play']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_play'].length; i++) {
				if (hotspotTemplates['spot_play'][i]._external_10 && hotspotTemplates['spot_play'][i]._external_10.logicBlock_size) {
					hotspotTemplates['spot_play'][i]._external_10.logicBlock_size();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_spot_play_current_view_sizechanged = function(){
		if(hotspotTemplates['spot_play_current_view']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_play_current_view'].length; i++) {
				if (hotspotTemplates['spot_play_current_view'][i]._external_1 && hotspotTemplates['spot_play_current_view'][i]._external_1.logicBlock_size) {
					hotspotTemplates['spot_play_current_view'][i]._external_1.logicBlock_size();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		me._map_10.ggUpdateConditionTimer();
		me._map_1.ggUpdateConditionTimer();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_spot_floor_arrow_360(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_floor_arrow_360=document.createElement('div');
		el.ggId="spot_floor_arrow_360";
		el.ggDx=-222;
		el.ggDy=99;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot spot_animation";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_floor_arrow_360.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_floor_arrow_360.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_floor_arrow_360.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_floor_arrow_360.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_floor_arrow_360.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_floor_arrow_360.ggUpdatePosition=function (useTransition) {
		}
		el=me._hostspot_marker_floor_arrow=document.createElement('div');
		els=me._hostspot_marker_floor_arrow__img=document.createElement('img');
		els.className='ggskin ggskin_hostspot_marker_floor_arrow';
		hs='data:image/png;base64,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'+
			'r4oAjOSr/h9VYe9N7OhOdgAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hostspot_marker_floor_arrow";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 73px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 90px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hostspot_marker_floor_arrow.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hostspot_marker_floor_arrow.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._hostspot_marker_floor_arrow.ggCurrentLogicStateSize != newLogicStateSize) {
				me._hostspot_marker_floor_arrow.ggCurrentLogicStateSize = newLogicStateSize;
				me._hostspot_marker_floor_arrow.style[domTransition]='width 0s, height 0s';
				if (me._hostspot_marker_floor_arrow.ggCurrentLogicStateSize == 0) {
					me._hostspot_marker_floor_arrow.style.width='55px';
					me._hostspot_marker_floor_arrow.style.height='55px';
					skin.updateSize(me._hostspot_marker_floor_arrow);
				}
				else if (me._hostspot_marker_floor_arrow.ggCurrentLogicStateSize == 1) {
					me._hostspot_marker_floor_arrow.style.width='28px';
					me._hostspot_marker_floor_arrow.style.height='28px';
					skin.updateSize(me._hostspot_marker_floor_arrow);
				}
				else {
					me._hostspot_marker_floor_arrow.style.width='90px';
					me._hostspot_marker_floor_arrow.style.height='73px';
					skin.updateSize(me._hostspot_marker_floor_arrow);
				}
			}
		}
		me._hostspot_marker_floor_arrow.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._hostspot_marker_floor_arrow.onmouseover=function (e) {
			me._hstextfloorarrow.style[domTransition]='none';
			me._hstextfloorarrow.style.visibility=(Number(me._hstextfloorarrow.style.opacity)>0||!me._hstextfloorarrow.style.opacity)?'inherit':'hidden';
			me._hstextfloorarrow.ggVisible=true;
		}
		me._hostspot_marker_floor_arrow.onmouseout=function (e) {
			me._hstextfloorarrow.style[domTransition]='none';
			me._hstextfloorarrow.style.visibility='hidden';
			me._hstextfloorarrow.ggVisible=false;
		}
		me._hostspot_marker_floor_arrow.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._spot_floor_arrow_360.appendChild(me._hostspot_marker_floor_arrow);
		el=me._hstextfloorarrow=document.createElement('div');
		els=me._hstextfloorarrow__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloorarrow";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloorarrow.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloorarrow.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_floor_arrow_360.appendChild(me._hstextfloorarrow);
		me.__div = me._spot_floor_arrow_360;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 697px;';
		hs+='position : absolute;';
		hs+='top : 517px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		hs+='transform-style: preserve-3d;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ontouchend=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._chevron_white_lower=document.createElement('div');
		els=me._chevron_white_lower__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMCIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAwIDEwMDA7IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIG'+
			'lkPSJMYXllcl8xIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CiA8Zz4KICA8cGF0aCBkPSJNMzQuOSw0MzkuN2w0MDAtNDAxYzE3LjktMTcuOSw0MS43LTI1LjQsNjUuMi0yNGMyMy40LTEuNCw0Ny4yLDYuMSw2NS4xLDI0bDQwMCw0MDEmI3hhOyYjeDk7JiN4OTtjMzMuMiwzMy4zLDMzLjIsODcuNCwwLDEyMC43Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDBMNTAwLDIxNC43TDE1NS4yLDU2MC40Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDAmI3hhOyYjeDk7JiN4OTtTMS43LDQ3MywzNC45LDQzOS43eiIgY2xhc3M9InN0MCIv'+
			'PgogPC9nPgo8L3N2Zz4K';
		me._chevron_white_lower__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_white_lower";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -70px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,-1px);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._chevron_white_lower.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._chevron_white_lower.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white_lower.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white_lower.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_white_lower.style[domTransition]='opacity 500ms ease 0ms';
				if (me._chevron_white_lower.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white_lower.style.visibility=me._chevron_white_lower.ggVisible?'inherit':'hidden';
					me._chevron_white_lower.style.opacity=1;
				}
				else {
					me._chevron_white_lower.style.visibility=me._chevron_white_lower.ggVisible?'inherit':'hidden';
					me._chevron_white_lower.style.opacity=0.6;
				}
			}
		}
		me._chevron_white_lower.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._chevron_white_lower);
		el=me._chevron_black=document.createElement('div');
		els=me._chevron_black__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMCIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAwIDEwMDA7IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIG'+
			'lkPSJMYXllcl8xIj4KIDxnPgogIDxwYXRoIGQ9Ik0zNC45LDQzOS43bDQwMC00MDFjMTcuOS0xNy45LDQxLjctMjUuNCw2NS4yLTI0YzIzLjQtMS40LDQ3LjIsNi4xLDY1LjEsMjRsNDAwLDQwMWMzMy4yLDMzLjMsMzMuMiw4Ny40LDAsMTIwLjcmI3hhOyYjeDk7JiN4OTtjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMEw1MDAsMjE0LjdMMTU1LjIsNTYwLjRjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMFMxLjcsNDczLDM0LjksNDM5Ljd6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._chevron_black__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_black";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.4;';
		hs+='position : absolute;';
		hs+='top : -70px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._chevron_black.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._chevron_black.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_black.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_black.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_black.style[domTransition]='opacity 500ms ease 0ms';
				if (me._chevron_black.ggCurrentLogicStateAlpha == 0) {
					me._chevron_black.style.visibility=me._chevron_black.ggVisible?'inherit':'hidden';
					me._chevron_black.style.opacity=1;
				}
				else {
					me._chevron_black.style.visibility=me._chevron_black.ggVisible?'inherit':'hidden';
					me._chevron_black.style.opacity=0.4;
				}
			}
		}
		me._chevron_black.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._chevron_black);
		el=me._chevron_white=document.createElement('div');
		els=me._chevron_white__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMCIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAwIDEwMDA7IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIG'+
			'lkPSJMYXllcl8xIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CiA8Zz4KICA8cGF0aCBkPSJNMzQuOSw0MzkuN2w0MDAtNDAxYzE3LjktMTcuOSw0MS43LTI1LjQsNjUuMi0yNGMyMy40LTEuNCw0Ny4yLDYuMSw2NS4xLDI0bDQwMCw0MDEmI3hhOyYjeDk7JiN4OTtjMzMuMiwzMy4zLDMzLjIsODcuNCwwLDEyMC43Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDBMNTAwLDIxNC43TDE1NS4yLDU2MC40Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDAmI3hhOyYjeDk7JiN4OTtTMS43LDQ3MywzNC45LDQzOS43eiIgY2xhc3M9InN0MCIv'+
			'PgogPC9nPgo8L3N2Zz4K';
		me._chevron_white__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_white";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -70px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,1px);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._chevron_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._chevron_white.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_white.style[domTransition]='opacity 500ms ease 0ms';
				if (me._chevron_white.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white.style.visibility=me._chevron_white.ggVisible?'inherit':'hidden';
					me._chevron_white.style.opacity=1;
				}
				else {
					me._chevron_white.style.visibility=me._chevron_white.ggVisible?'inherit':'hidden';
					me._chevron_white.style.opacity=0.6;
				}
			}
		}
		me._chevron_white.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._chevron_white);
		el=me.__code=document.createElement('div');
		els=me.__code__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="_code";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 37px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -39px;';
		hs+='visibility : hidden;';
		hs+='width : 66px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 68px;';
		hs+='height: 39px;';
		hs+='pointer-events: none;';
		hs+='background: #ffffff;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
this.onUpdatePosition=function(player,hotspot) {
var vs=player.getViewerSize();
var y=vs.height * (1/6*(1+Math.cos(player.getTilt() * Math.PI/90.0)));
var hs= 'perspective(500px) translate3d(0px,' + (y) + 'px,0px) ';
hs += 'rotateZ(' + ( player.getRoll()).toFixed(10) + 'deg) ';
hs += 'rotateX(' + ( player.getTilt()).toFixed(10) + 'deg) ';
hs += 'rotateY(' + (-player.getPan()).toFixed(10)  + 'deg) ';
hs += 'rotateY(' + ( hotspot.pan).toFixed(2)  + 'deg) ';
hs += 'rotateX(' + (-hotspot.tilt).toFixed(2) + 'deg) ';
hs += 'rotateX(90deg) ';
this.__div.style.transform=hs;
this.__div.style.left = vs.width / 2 + "px";
this.__div.style.top = vs.height / 2 + "px";
};
		el.appendChild(els);
		me.__code.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me.__code.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me.__code);
		el=me._tt_ht_3d=document.createElement('div');
		els=me._tt_ht_3d__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_3d";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -170px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		hs+='transform:translate3d(0px,0px,40px) rotateX(-90deg); text-shadow: 1px 1px 2px #000000; -webkit-backface-visibility: hidden; backface-visibility: hidden;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 150px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_3d.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_3d.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTour() == false)) && 
				((me.hotspot.title != "")) && 
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_3d_preview') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_3d.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_3d.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_3d.style[domTransition]='';
				if (me._tt_ht_3d.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_3d.style.visibility=(Number(me._tt_ht_3d.style.opacity)>0||!me._tt_ht_3d.style.opacity)?'inherit':'hidden';
					me._tt_ht_3d.ggVisible=true;
				}
				else {
					me._tt_ht_3d.style.visibility="hidden";
					me._tt_ht_3d.ggVisible=false;
				}
			}
		}
		me._tt_ht_3d.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._tt_ht_3d);
		me.__div = me._ht_node;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info=document.createElement('div');
		el.ggId="ht_info";
		el.ggDx=-228;
		el.ggDy=210;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			me._tt_information3.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			me._tt_information3.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ontouchend=function (e) {
			me.elementMouseOver['ht_info']=false;
			me._tt_information3.logicBlock_visible();
		}
		me._ht_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_information3=document.createElement('div');
		els=me._tt_information3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.49999;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_information3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information3.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_information3.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_information3.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_information3.style[domTransition]='left 0s, top 0s';
				if (me._tt_information3.ggCurrentLogicStatePosition == 0) {
					this.ggDx = -50;
					this.ggDy = -47;
					me._tt_information3.ggUpdatePosition(true);
				}
				else {
					me._tt_information3.ggDx=0;
					me._tt_information3.ggDy=40;
					me._tt_information3.ggUpdatePosition(true);
				}
			}
		}
		me._tt_information3.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information3.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information3.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information3.style[domTransition]='left 0s, top 0s';
				if (me._tt_information3.ggCurrentLogicStateVisible == 0) {
					me._tt_information3.style.visibility=(Number(me._tt_information3.style.opacity)>0||!me._tt_information3.style.opacity)?'inherit':'hidden';
					me._tt_information3.ggVisible=true;
				}
				else {
					me._tt_information3.style.visibility="hidden";
					me._tt_information3.ggVisible=false;
				}
			}
		}
		me._tt_information3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((102-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info.appendChild(me._tt_information3);
		el=me._ht_info_image=document.createElement('div');
		els=me._ht_info_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_info_image';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_info_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_image.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._ht_info_image.ggCurrentLogicStateSize != newLogicStateSize) {
				me._ht_info_image.ggCurrentLogicStateSize = newLogicStateSize;
				me._ht_info_image.style[domTransition]='width 0s, height 0s';
				if (me._ht_info_image.ggCurrentLogicStateSize == 0) {
					me._ht_info_image.style.width='55px';
					me._ht_info_image.style.height='55px';
					skin.updateSize(me._ht_info_image);
				}
				else if (me._ht_info_image.ggCurrentLogicStateSize == 1) {
					me._ht_info_image.style.width='28px';
					me._ht_info_image.style.height='28px';
					skin.updateSize(me._ht_info_image);
				}
				else {
					me._ht_info_image.style.width='55px';
					me._ht_info_image.style.height='55px';
					skin.updateSize(me._ht_info_image);
				}
			}
		}
		me._ht_info_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_info.appendChild(me._ht_info_image);
		me.__div = me._ht_info;
	};
	function SkinHotspotClass_ht_info_arrow(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_arrow=document.createElement('div');
		el.ggId="ht_info_arrow";
		el.ggDx=283;
		el.ggDy=-235;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_arrow.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_arrow.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info_arrow']=true;
			me._tt_information_info_arrow.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info_arrow']=false;
			me._tt_information_info_arrow.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow.ontouchend=function (e) {
			me.elementMouseOver['ht_info_arrow']=false;
			me._tt_information_info_arrow.logicBlock_visible();
		}
		me._ht_info_arrow.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_information_info_arrow=document.createElement('div');
		els=me._tt_information_info_arrow__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information_info_arrow";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.49999;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_information_info_arrow.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information_info_arrow.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_information_info_arrow.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_information_info_arrow.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_information_info_arrow.style[domTransition]='left 0s, top 0s';
				if (me._tt_information_info_arrow.ggCurrentLogicStatePosition == 0) {
					this.ggDx = -50;
					this.ggDy = -47;
					me._tt_information_info_arrow.ggUpdatePosition(true);
				}
				else {
					me._tt_information_info_arrow.ggDx=0;
					me._tt_information_info_arrow.ggDy=40;
					me._tt_information_info_arrow.ggUpdatePosition(true);
				}
			}
		}
		me._tt_information_info_arrow.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info_arrow'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information_info_arrow.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information_info_arrow.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information_info_arrow.style[domTransition]='left 0s, top 0s';
				if (me._tt_information_info_arrow.ggCurrentLogicStateVisible == 0) {
					me._tt_information_info_arrow.style.visibility=(Number(me._tt_information_info_arrow.style.opacity)>0||!me._tt_information_info_arrow.style.opacity)?'inherit':'hidden';
					me._tt_information_info_arrow.ggVisible=true;
				}
				else {
					me._tt_information_info_arrow.style.visibility="hidden";
					me._tt_information_info_arrow.ggVisible=false;
				}
			}
		}
		me._tt_information_info_arrow.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((102-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_arrow.appendChild(me._tt_information_info_arrow);
		el=me._ht_info_arrow_image=document.createElement('div');
		els=me._ht_info_arrow_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_info_arrow_image';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_info_arrow_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_arrow_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_arrow_image.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._ht_info_arrow_image.ggCurrentLogicStateSize != newLogicStateSize) {
				me._ht_info_arrow_image.ggCurrentLogicStateSize = newLogicStateSize;
				me._ht_info_arrow_image.style[domTransition]='width 0s, height 0s';
				if (me._ht_info_arrow_image.ggCurrentLogicStateSize == 0) {
					me._ht_info_arrow_image.style.width='55px';
					me._ht_info_arrow_image.style.height='55px';
					skin.updateSize(me._ht_info_arrow_image);
				}
				else if (me._ht_info_arrow_image.ggCurrentLogicStateSize == 1) {
					me._ht_info_arrow_image.style.width='28px';
					me._ht_info_arrow_image.style.height='28px';
					skin.updateSize(me._ht_info_arrow_image);
				}
				else {
					me._ht_info_arrow_image.style.width='55px';
					me._ht_info_arrow_image.style.height='55px';
					skin.updateSize(me._ht_info_arrow_image);
				}
			}
		}
		me._ht_info_arrow_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_info_arrow.appendChild(me._ht_info_arrow_image);
		me.__div = me._ht_info_arrow;
	};
	function SkinHotspotClass_ht_info_arrow_right(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_arrow_right=document.createElement('div');
		el.ggId="ht_info_arrow_right";
		el.ggDx=283;
		el.ggDy=-146;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_arrow_right.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_arrow_right.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow_right.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow_right.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info_arrow_right']=true;
			me._tt_information_info_arrow_right.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow_right.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info_arrow_right']=false;
			me._tt_information_info_arrow_right.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_arrow_right.ontouchend=function (e) {
			me.elementMouseOver['ht_info_arrow_right']=false;
			me._tt_information_info_arrow_right.logicBlock_visible();
		}
		me._ht_info_arrow_right.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_information_info_arrow_right=document.createElement('div');
		els=me._tt_information_info_arrow_right__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information_info_arrow_right";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.49999;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_information_info_arrow_right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information_info_arrow_right.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_information_info_arrow_right.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_information_info_arrow_right.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_information_info_arrow_right.style[domTransition]='left 0s, top 0s';
				if (me._tt_information_info_arrow_right.ggCurrentLogicStatePosition == 0) {
					this.ggDx = -50;
					this.ggDy = -47;
					me._tt_information_info_arrow_right.ggUpdatePosition(true);
				}
				else {
					me._tt_information_info_arrow_right.ggDx=0;
					me._tt_information_info_arrow_right.ggDy=40;
					me._tt_information_info_arrow_right.ggUpdatePosition(true);
				}
			}
		}
		me._tt_information_info_arrow_right.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info_arrow_right'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information_info_arrow_right.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information_info_arrow_right.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information_info_arrow_right.style[domTransition]='left 0s, top 0s';
				if (me._tt_information_info_arrow_right.ggCurrentLogicStateVisible == 0) {
					me._tt_information_info_arrow_right.style.visibility=(Number(me._tt_information_info_arrow_right.style.opacity)>0||!me._tt_information_info_arrow_right.style.opacity)?'inherit':'hidden';
					me._tt_information_info_arrow_right.ggVisible=true;
				}
				else {
					me._tt_information_info_arrow_right.style.visibility="hidden";
					me._tt_information_info_arrow_right.ggVisible=false;
				}
			}
		}
		me._tt_information_info_arrow_right.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((102-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_arrow_right.appendChild(me._tt_information_info_arrow_right);
		el=me._ht_info_arrow_right_image=document.createElement('div');
		els=me._ht_info_arrow_right_image__img=document.createElement('img');
		els.className='ggskin ggskin_ht_info_arrow_right_image';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_info_arrow_right_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_arrow_right_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_arrow_right_image.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._ht_info_arrow_right_image.ggCurrentLogicStateSize != newLogicStateSize) {
				me._ht_info_arrow_right_image.ggCurrentLogicStateSize = newLogicStateSize;
				me._ht_info_arrow_right_image.style[domTransition]='width 0s, height 0s';
				if (me._ht_info_arrow_right_image.ggCurrentLogicStateSize == 0) {
					me._ht_info_arrow_right_image.style.width='55px';
					me._ht_info_arrow_right_image.style.height='55px';
					skin.updateSize(me._ht_info_arrow_right_image);
				}
				else if (me._ht_info_arrow_right_image.ggCurrentLogicStateSize == 1) {
					me._ht_info_arrow_right_image.style.width='28px';
					me._ht_info_arrow_right_image.style.height='28px';
					skin.updateSize(me._ht_info_arrow_right_image);
				}
				else {
					me._ht_info_arrow_right_image.style.width='55px';
					me._ht_info_arrow_right_image.style.height='55px';
					skin.updateSize(me._ht_info_arrow_right_image);
				}
			}
		}
		me._ht_info_arrow_right_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_info_arrow_right.appendChild(me._ht_info_arrow_right_image);
		me.__div = me._ht_info_arrow_right;
	};
	function SkinHotspotClass_spot_arrow_right(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_arrow_right=document.createElement('div');
		el.ggId="spot_arrow_right";
		el.ggDx=283;
		el.ggDy=51;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot spot_animation";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_arrow_right.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_arrow_right.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_right.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_right.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_right.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_right.ggUpdatePosition=function (useTransition) {
		}
		el=me._hostspot_marker_right=document.createElement('div');
		els=me._hostspot_marker_right__img=document.createElement('img');
		els.className='ggskin ggskin_hostspot_marker_right';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hostspot_marker_right";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hostspot_marker_right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hostspot_marker_right.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._hostspot_marker_right.ggCurrentLogicStateSize != newLogicStateSize) {
				me._hostspot_marker_right.ggCurrentLogicStateSize = newLogicStateSize;
				me._hostspot_marker_right.style[domTransition]='width 0s, height 0s';
				if (me._hostspot_marker_right.ggCurrentLogicStateSize == 0) {
					me._hostspot_marker_right.style.width='55px';
					me._hostspot_marker_right.style.height='55px';
					skin.updateSize(me._hostspot_marker_right);
				}
				else if (me._hostspot_marker_right.ggCurrentLogicStateSize == 1) {
					me._hostspot_marker_right.style.width='28px';
					me._hostspot_marker_right.style.height='28px';
					skin.updateSize(me._hostspot_marker_right);
				}
				else {
					me._hostspot_marker_right.style.width='55px';
					me._hostspot_marker_right.style.height='55px';
					skin.updateSize(me._hostspot_marker_right);
				}
			}
		}
		me._hostspot_marker_right.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._hostspot_marker_right.onmouseover=function (e) {
			me._text_right.style[domTransition]='none';
			me._text_right.style.visibility=(Number(me._text_right.style.opacity)>0||!me._text_right.style.opacity)?'inherit':'hidden';
			me._text_right.ggVisible=true;
		}
		me._hostspot_marker_right.onmouseout=function (e) {
			me._text_right.style[domTransition]='none';
			me._text_right.style.visibility='hidden';
			me._text_right.ggVisible=false;
		}
		me._hostspot_marker_right.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._spot_arrow_right.appendChild(me._hostspot_marker_right);
		el=me._text_right=document.createElement('div');
		els=me._text_right__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="text_right";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._text_right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._text_right.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_arrow_right.appendChild(me._text_right);
		me.__div = me._spot_arrow_right;
	};
	function SkinHotspotClass_spot_arrow_left(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_arrow_left=document.createElement('div');
		el.ggId="spot_arrow_left";
		el.ggDx=283;
		el.ggDy=-43;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot spot_animation";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_arrow_left.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_arrow_left.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_left.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_left.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_left.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_left.ggUpdatePosition=function (useTransition) {
		}
		el=me._hostspot_marker_left=document.createElement('div');
		els=me._hostspot_marker_left__img=document.createElement('img');
		els.className='ggskin ggskin_hostspot_marker_left';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hostspot_marker_left";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hostspot_marker_left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hostspot_marker_left.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._hostspot_marker_left.ggCurrentLogicStateSize != newLogicStateSize) {
				me._hostspot_marker_left.ggCurrentLogicStateSize = newLogicStateSize;
				me._hostspot_marker_left.style[domTransition]='width 0s, height 0s';
				if (me._hostspot_marker_left.ggCurrentLogicStateSize == 0) {
					me._hostspot_marker_left.style.width='55px';
					me._hostspot_marker_left.style.height='55px';
					skin.updateSize(me._hostspot_marker_left);
				}
				else if (me._hostspot_marker_left.ggCurrentLogicStateSize == 1) {
					me._hostspot_marker_left.style.width='28px';
					me._hostspot_marker_left.style.height='28px';
					skin.updateSize(me._hostspot_marker_left);
				}
				else {
					me._hostspot_marker_left.style.width='55px';
					me._hostspot_marker_left.style.height='55px';
					skin.updateSize(me._hostspot_marker_left);
				}
			}
		}
		me._hostspot_marker_left.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._hostspot_marker_left.onmouseover=function (e) {
			me._text_left.style[domTransition]='none';
			me._text_left.style.visibility=(Number(me._text_left.style.opacity)>0||!me._text_left.style.opacity)?'inherit':'hidden';
			me._text_left.ggVisible=true;
		}
		me._hostspot_marker_left.onmouseout=function (e) {
			me._text_left.style[domTransition]='none';
			me._text_left.style.visibility='hidden';
			me._text_left.ggVisible=false;
		}
		me._hostspot_marker_left.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._spot_arrow_left.appendChild(me._hostspot_marker_left);
		el=me._text_left=document.createElement('div');
		els=me._text_left__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="text_left";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._text_left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._text_left.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_arrow_left.appendChild(me._text_left);
		me.__div = me._spot_arrow_left;
	};
	function SkinHotspotClass_spot_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_info=document.createElement('div');
		el.ggId="spot_info";
		el.ggDx=-213;
		el.ggDy=-211;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot spot_animation";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_info.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._hostspot_marker=document.createElement('div');
		els=me._hostspot_marker__img=document.createElement('img');
		els.className='ggskin ggskin_hostspot_marker';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hostspot_marker";
		el.ggDx=0;
		el.ggDy=8;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hostspot_marker.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hostspot_marker.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._hostspot_marker.onmouseover=function (e) {
			me._hstext.style[domTransition]='none';
			me._hstext.style.visibility=(Number(me._hstext.style.opacity)>0||!me._hstext.style.opacity)?'inherit':'hidden';
			me._hstext.ggVisible=true;
		}
		me._hostspot_marker.onmouseout=function (e) {
			me._hstext.style[domTransition]='none';
			me._hstext.style.visibility='hidden';
			me._hstext.ggVisible=false;
		}
		me._hostspot_marker.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._spot_info.appendChild(me._hostspot_marker);
		el=me._hstext=document.createElement('div');
		els=me._hstext__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstext";
		el.ggDx=0;
		el.ggDy=42;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstext.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstext.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_info.appendChild(me._hstext);
		me.__div = me._spot_info;
	};
	function SkinHotspotClass_spot_open(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_open=document.createElement('div');
		el.ggId="spot_open";
		el.ggDx=-336;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_open.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_open.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open.ggUpdatePosition=function (useTransition) {
		}
		el=me._door=document.createElement('div');
		els=me._door__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._door.ggUpdatePosition();}
		el.ggText=basePath + "./assets/door.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="door";
		el.ggDx=0;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._door.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._door.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._door.ggCurrentLogicStateSize != newLogicStateSize) {
				me._door.ggCurrentLogicStateSize = newLogicStateSize;
				me._door.style[domTransition]='width 0s, height 0s';
				if (me._door.ggCurrentLogicStateSize == 0) {
					me._door.style.width='55px';
					me._door.style.height='55px';
					skin.updateSize(me._door);
				}
				else if (me._door.ggCurrentLogicStateSize == 1) {
					me._door.style.width='28px';
					me._door.style.height='28px';
					skin.updateSize(me._door);
				}
				else {
					me._door.style.width='55px';
					me._door.style.height='55px';
					skin.updateSize(me._door);
				}
			}
		}
		me._door.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._door.onmouseover=function (e) {
			me._hstextfloor5.style[domTransition]='none';
			me._hstextfloor5.style.visibility=(Number(me._hstextfloor5.style.opacity)>0||!me._hstextfloor5.style.opacity)?'inherit':'hidden';
			me._hstextfloor5.ggVisible=true;
		}
		me._door.onmouseout=function (e) {
			me._hstextfloor5.style[domTransition]='none';
			me._hstextfloor5.style.visibility='hidden';
			me._hstextfloor5.ggVisible=false;
		}
		me._door.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._door.clientWidth;
			var parentHeight = me._door.clientHeight;
			var img = me._door__img;
			var aspectRatioDiv = me._door.clientWidth / me._door.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._spot_open.appendChild(me._door);
		el=me._hstextfloor5=document.createElement('div');
		els=me._hstextfloor5__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloor";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloor5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloor5.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_open.appendChild(me._hstextfloor5);
		me.__div = me._spot_open;
	};
	function SkinHotspotClass_spot_open_close_door(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_open_close_door=document.createElement('div');
		el.ggId="spot_open_close_door";
		el.ggDx=-333;
		el.ggDy=102;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_open_close_door.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_open_close_door.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_door.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_door.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_door.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_door.ggUpdatePosition=function (useTransition) {
		}
		el=me._external_12=document.createElement('div');
		els=me._external_12__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._external_12.ggUpdatePosition();}
		el.ggText=basePath + "./assets/door.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="External 1";
		el.ggDx=0;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._external_12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_12.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._external_12.ggCurrentLogicStateSize != newLogicStateSize) {
				me._external_12.ggCurrentLogicStateSize = newLogicStateSize;
				me._external_12.style[domTransition]='width 0s, height 0s';
				if (me._external_12.ggCurrentLogicStateSize == 0) {
					me._external_12.style.width='55px';
					me._external_12.style.height='55px';
					skin.updateSize(me._external_12);
				}
				else if (me._external_12.ggCurrentLogicStateSize == 1) {
					me._external_12.style.width='28px';
					me._external_12.style.height='28px';
					skin.updateSize(me._external_12);
				}
				else {
					me._external_12.style.width='55px';
					me._external_12.style.height='55px';
					skin.updateSize(me._external_12);
				}
			}
		}
		me._external_12.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target+" $(cur)");
		}
		me._external_12.onmouseover=function (e) {
			me._hstextfloor4.style[domTransition]='none';
			me._hstextfloor4.style.visibility=(Number(me._hstextfloor4.style.opacity)>0||!me._hstextfloor4.style.opacity)?'inherit':'hidden';
			me._hstextfloor4.ggVisible=true;
		}
		me._external_12.onmouseout=function (e) {
			me._hstextfloor4.style[domTransition]='none';
			me._hstextfloor4.style.visibility='hidden';
			me._hstextfloor4.ggVisible=false;
		}
		me._external_12.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._external_12.clientWidth;
			var parentHeight = me._external_12.clientHeight;
			var img = me._external_12__img;
			var aspectRatioDiv = me._external_12.clientWidth / me._external_12.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._spot_open_close_door.appendChild(me._external_12);
		el=me._hstextfloor4=document.createElement('div');
		els=me._hstextfloor4__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloor";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloor4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloor4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_open_close_door.appendChild(me._hstextfloor4);
		me.__div = me._spot_open_close_door;
	};
	function SkinHotspotClass_spot_open_close_curtain(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_open_close_curtain=document.createElement('div');
		el.ggId="spot_open_close_curtain";
		el.ggDx=-333;
		el.ggDy=211;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_open_close_curtain.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_open_close_curtain.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_curtain.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_curtain.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_curtain.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_open_close_curtain.ggUpdatePosition=function (useTransition) {
		}
		el=me._external_11=document.createElement('div');
		els=me._external_11__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._external_11.ggUpdatePosition();}
		el.ggText=basePath + "./assets/curtain.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="External 1";
		el.ggDx=0;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._external_11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_11.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._external_11.ggCurrentLogicStateSize != newLogicStateSize) {
				me._external_11.ggCurrentLogicStateSize = newLogicStateSize;
				me._external_11.style[domTransition]='width 0s, height 0s';
				if (me._external_11.ggCurrentLogicStateSize == 0) {
					me._external_11.style.width='55px';
					me._external_11.style.height='55px';
					skin.updateSize(me._external_11);
				}
				else if (me._external_11.ggCurrentLogicStateSize == 1) {
					me._external_11.style.width='28px';
					me._external_11.style.height='28px';
					skin.updateSize(me._external_11);
				}
				else {
					me._external_11.style.width='55px';
					me._external_11.style.height='55px';
					skin.updateSize(me._external_11);
				}
			}
		}
		me._external_11.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target+" $(cur)");
		}
		me._external_11.onmouseover=function (e) {
			me._hstextfloor3.style[domTransition]='none';
			me._hstextfloor3.style.visibility=(Number(me._hstextfloor3.style.opacity)>0||!me._hstextfloor3.style.opacity)?'inherit':'hidden';
			me._hstextfloor3.ggVisible=true;
		}
		me._external_11.onmouseout=function (e) {
			me._hstextfloor3.style[domTransition]='none';
			me._hstextfloor3.style.visibility='hidden';
			me._hstextfloor3.ggVisible=false;
		}
		me._external_11.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._external_11.clientWidth;
			var parentHeight = me._external_11.clientHeight;
			var img = me._external_11__img;
			var aspectRatioDiv = me._external_11.clientWidth / me._external_11.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._spot_open_close_curtain.appendChild(me._external_11);
		el=me._hstextfloor3=document.createElement('div');
		els=me._hstextfloor3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloor";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloor3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloor3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_open_close_curtain.appendChild(me._hstextfloor3);
		me.__div = me._spot_open_close_curtain;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_image=document.createElement('div');
		el.ggId="ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 76px;';
		hs+='position : absolute;';
		hs+='top : 90px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.onclick=function (e) {
			skin._popup_image.ggText=player.getBasePath()+""+me.hotspot.url;
			skin._popup_image.ggSubElement.style.width = '0px';
			skin._popup_image.ggSubElement.style.height = '0px';
			skin._popup_image.ggSubElement.src='';
			skin._popup_image.ggSubElement.src=skin._popup_image.ggText;
			player.setVariableValue('vis_image_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ontouchend=function (e) {
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
		}
		me._ht_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_ht_image=document.createElement('div');
		els=me._tt_ht_image__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_image";
		el.ggDx=0;
		el.ggDy=42;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.49999;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 3px 6px 3px 6px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_ht_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_image.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_image.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_image.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_image.ggCurrentLogicStatePosition == 0) {
					this.ggDx = -50;
					this.ggDy = -47;
					me._tt_ht_image.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_image.ggDx=0;
					me._tt_ht_image.ggDy=42;
					me._tt_ht_image.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_image.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_image.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_image.style.visibility=(Number(me._tt_ht_image.style.opacity)>0||!me._tt_ht_image.style.opacity)?'inherit':'hidden';
					me._tt_ht_image.ggVisible=true;
				}
				else {
					me._tt_ht_image.style.visibility="hidden";
					me._tt_ht_image.ggVisible=false;
				}
			}
		}
		me._tt_ht_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((102-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_image.appendChild(me._tt_ht_image);
		el=me._design=document.createElement('div');
		els=me._design__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._design.ggUpdatePosition();}
		el.ggText=basePath + "./assets/design.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._design.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._design.ggCurrentLogicStateSize != newLogicStateSize) {
				me._design.ggCurrentLogicStateSize = newLogicStateSize;
				me._design.style[domTransition]='width 0s, height 0s';
				if (me._design.ggCurrentLogicStateSize == 0) {
					me._design.style.width='55px';
					me._design.style.height='55px';
					skin.updateSize(me._design);
				}
				else if (me._design.ggCurrentLogicStateSize == 1) {
					me._design.style.width='28px';
					me._design.style.height='28px';
					skin.updateSize(me._design);
				}
				else {
					me._design.style.width='55px';
					me._design.style.height='55px';
					skin.updateSize(me._design);
				}
			}
		}
		me._design.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._design.clientWidth;
			var parentHeight = me._design.clientHeight;
			var img = me._design__img;
			var aspectRatioDiv = me._design.clientWidth / me._design.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_image.appendChild(me._design);
		me.__div = me._ht_image;
	};
	function SkinHotspotClass_spot_arrow(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_arrow=document.createElement('div');
		el.ggId="spot_arrow";
		el.ggDx=-222;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot spot_animation";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_arrow.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_arrow.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow.ggUpdatePosition=function (useTransition) {
		}
		el=me._hostspot_marker_floor0=document.createElement('div');
		els=me._hostspot_marker_floor0__img=document.createElement('img');
		els.className='ggskin ggskin_hostspot_marker_floor0';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hostspot_marker_floor";
		el.ggDx=0;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hostspot_marker_floor0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hostspot_marker_floor0.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._hostspot_marker_floor0.ggCurrentLogicStateSize != newLogicStateSize) {
				me._hostspot_marker_floor0.ggCurrentLogicStateSize = newLogicStateSize;
				me._hostspot_marker_floor0.style[domTransition]='width 0s, height 0s';
				if (me._hostspot_marker_floor0.ggCurrentLogicStateSize == 0) {
					me._hostspot_marker_floor0.style.width='55px';
					me._hostspot_marker_floor0.style.height='55px';
					skin.updateSize(me._hostspot_marker_floor0);
				}
				else if (me._hostspot_marker_floor0.ggCurrentLogicStateSize == 1) {
					me._hostspot_marker_floor0.style.width='28px';
					me._hostspot_marker_floor0.style.height='28px';
					skin.updateSize(me._hostspot_marker_floor0);
				}
				else {
					me._hostspot_marker_floor0.style.width='55px';
					me._hostspot_marker_floor0.style.height='55px';
					skin.updateSize(me._hostspot_marker_floor0);
				}
			}
		}
		me._hostspot_marker_floor0.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._hostspot_marker_floor0.onmouseover=function (e) {
			me._hstextfloor2.style[domTransition]='none';
			me._hstextfloor2.style.visibility=(Number(me._hstextfloor2.style.opacity)>0||!me._hstextfloor2.style.opacity)?'inherit':'hidden';
			me._hstextfloor2.ggVisible=true;
		}
		me._hostspot_marker_floor0.onmouseout=function (e) {
			me._hstextfloor2.style[domTransition]='none';
			me._hstextfloor2.style.visibility='hidden';
			me._hstextfloor2.ggVisible=false;
		}
		me._hostspot_marker_floor0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._spot_arrow.appendChild(me._hostspot_marker_floor0);
		el=me._hstextfloor2=document.createElement('div');
		els=me._hstextfloor2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloor";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloor2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloor2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_arrow.appendChild(me._hstextfloor2);
		me.__div = me._spot_arrow;
	};
	function SkinHotspotClass_spot_arrow_current_view(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_arrow_current_view=document.createElement('div');
		el.ggId="spot_arrow_current_view";
		el.ggDx=-221;
		el.ggDy=-97;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot spot_animation";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_arrow_current_view.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_arrow_current_view.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_current_view.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_current_view.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_current_view.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_arrow_current_view.ggUpdatePosition=function (useTransition) {
		}
		el=me._hostspot_marker_floor=document.createElement('div');
		els=me._hostspot_marker_floor__img=document.createElement('img');
		els.className='ggskin ggskin_hostspot_marker_floor';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAATeElEQVR4nO1de1RUR5r/NdDdPDSiINqgE+IjiOhONInvxCRHZo5kjNmNEDRiEmecRXczq0fmqNkdRWc05siJnsyuuENMlHFhlJxJTARmxMnDxIMx4+YhCPgKZJQeQREjjTQt9P5x+9LVVd99Nc3Lze+cOvf27aq6VfW73/fVrcd3TW63G9+jH+F7QvoXQvq6AAZh8iPNgHri+iMhVKPrvSaDJcFEXKPi9Qv0B0L4hjUR50pHNbg1jmpp+gx9RYgSCeyRDSDO+fR8Y7IE8OdyMHH/mYj0vYreJkTp6Tca+Lx4KBGgJ8jp1FRdj6G3COGJkH8HQWzsIO7In/PEUKAaupM471SIZ2J+9yoxPU2IHiJYAvhgIs4pQniVRRHRSZx3EtdNxHmvEdNThOglgg'+
			'/BCuc8SUqqi1JVVON3KJyzoU+I6QlClAw0/8Tzjc+HIOKopL5kKKkptuHZIx8okkyeIwu+QxAwBJoQJUNNSQIbQhTOKXKMEqJGwh2F8yDQpFCGP6CkdJsQt9sNk8lEqSgliWAbPUQl8IQpqS75nry64lUQ2+AyAUqBJUgmkiWlk7lXQFVYtwlhyGCPShIhN7QZ3oY3M7/Z613EzJs3LyY1NTVxzJgxcTabLTY6OjouIiJiqNVqDTebzeFyWVwuV6vT6Wx1OBw3rl27dsVut9dfunTpSlFRUdWxY8caQBPhYo4u5noQE98EX1IAXzUWMGkxeZ5wv9MzR0pFsUTwBLDB4vnPAiAkJiYmfOPGjQ/Nnj37wfj4+MmRkZE2fwsoo7m52V5bW3vmxIkTp7ds2fLXhoaGVkiN3c4cXUTgJYdVZUrvMH6jO4RQZPBSoUSEhQtm'+
			'AJZ169YlpaWlPT5p0qQ5FotlkN+10kB7e3tLRUXFp4cOHfrw1VdfrYSXjHYuqBHDd5kDQoq/hKiRwep+ShKs8BJhBWDJycmZtmTJkjSbzTbB34r4C7vdXl1QUHAoKyvrFCQSnPASIp/zUkP1zAJCij+E6CGDlQhWEqxs2Lx585SVK1cuHz58+Bh/Ch9INDY2XszNzX1r06ZNX0Aigg2U1GipMMAPUvwlRIkMXj0JJAAIffTRR0fk5ub+dOLEiY9AfQhEgvMmUPcB0FTjDS12oK0ZcDZ741kjgdBIYJANGJbgDfc+AViH6Kmb++zZs5+sXLly7/Hjx68CaANNDq/GtOyKbhglRKknxZPBS0SoHPLy8p5YtmzZSovFEg41tLcAZwuAin3AlXJDlSIRNxOY9AIwcQmgYZ7a29tb8/Pzc1esWPEBJFLkwEuMEikyMYBBUo'+
			'wQQr15U/aCJMJms91TXFz88ylTpvxY9S6XTwCncoDz7xqphzGMfxqYlgWMmq0a7csvvzyakpLy33a7/TsoE6NkV/xSXXoJocjgJYOSijAAoSkpKaPy8/M3RkVFxSve4fKnwCe/Ar79SG/Zu48fPAY88mtg1BzFKNevX69dtmzZlpKSksuQyLgNWlrU1BegkxQjhFBdW8peyFIRBiBsxYoVCTt37syOiIgYRubcUg9U/B74eL2e8vYM5m4HJmUAg2LJvx0OR9OaNWuy8/LyaiARIpMiE8PbFbUusSr0EELZDSU11UUEgLDVq1dP2r59e7bVah1M5vxVHlD2EtDh1FNWEZZBwOxNwIRUyWjfbgKqDwHlWyUbZATBViD5t8APV5B/O53OlvXr12/atWtXBbyksNJCqS/D9kQvIZTd4NWULBnhAMIyMzMTd+3a9Wur1XqP'+
			'kGN7C/Dnf5aMtr8whwPPHpOMNY8r5cDBZMDlMJ7vxMXAj39HGn6n0/nd6tWrf7Vnz54qSGS0QpQUWX1R9qTbhLDzGLzdUJKM8JSUlNGHDh3KIdXUzW+AI8skm+EvrPcA6R8AIx9UjnP1C6DwcanLbBSj5gA/yQeG3Cf85XA4mtLS0rJKSkr+BokQJUmhel6ABil6CJEDPy5FSUb4vffeO/T06dM5pAG/XgUcfhZoPKNWJnWERQGpJYBtmnZc++dAUQpw+5rx+wyfDDz1ByB6ovBXU1NT7dSpU7Pq6upuQCKFkhR+/EuXlASp/MfbDtaG8O8cXT2r0tLSl2gyqoE/Pt09MszhwKJifWQAgO1hiTxzhPF7NZ4B3vlHqdwchg0bFl9aWvoSpAdRrrs8Jie3DTX1DOZIQo0QNjHV1RUM+r59+5ITExPnCrnc/AZ4dxHQdE'+
			'7jdiowhwOLPwJipxtLZ3sYWPKx5ssgiaZzUrlvfiP8lZiYOHf//v0/gpcUmRCZFH5CDdAgA1AmxPAbeXJysm3x4sU/F3Jqb5FsxrVKrbIoI3So1Ki2h/1LP/JBicxQuuetimuVUvnbbwl/paenr0hOTrbBd8CUlRJ+XYAmMXpVFmtDeKNuAWDdvXt3Jjkc8v5z3TPglsHAoiPAyIf8zwOQSEktljoERnH5U+D9pWLRLJbw3bt3Z4ImhG0vpUUZArRUFjUNK6irrVu3Pjhu3DhRl3yxB7jwnsYtVBASCjxbBsTN8j8PFrEzpK5ySJjxtBfek+rDYdy4cdO3bdv2EPSpLa32JntZbFeXeueQu7jhAAYBiGhoaHhdGEK/cR54YyLQeUdnjTlYhwBpfzZuM/TA/jlw8Ee+I8V6EBQC/OwsMHS8z+XGxsZLMTExvwDgANAC'+
			'b3e4DcrvJgDR41KzIdRwCW8/zDt27JhOzmeU/Wv3yEgt6RkyAG/vyxppLF3nHeDovwiXhw8fPmbHjh3TwbQL6N4WtVLGB1o2hBrV9SHlueeeSxVS1h4DvjmqWT8SwRYgtTRwakoJcTOBtD9JatEIasuk+nHwtANl1NmlTKpkAPokRHECat26dUnktGv5Vu2KUTCHA4s/pIdDegKx06X7Ge0SE/Wz2WwT1q1blwRfG0LZEUMSorbATZCQpUuXzhdyvHzCvyF06xAg7WjPSwaP2BmSrTKivr79SKonB097UBKitBRWIEavhAhdXpvNFp6QkDBDSHkqR3/FZARbpa6txoRRjyFultQlNqK+iHomJCTMsNls4aC7vn5JCAslCQkGELxp06bpZrPZtwaOq8Zn+oKtQPpfVCeJaGgNnBqczo6bJQ1Y6iXl/LtSfRmYzebQjR'+
			's3TgO9FJZ/OSRBEaKltkIAhMycOVMcaq15W19lZFgGe8gwIBnOm8DnrwFufv0zB3enFM/IaG/cTMmm6H15JOo7a9ash6D+pq4qJUa7vV1qa+zYsT8UUlXs11cRQHo5W/S+cTX1zjPAp5sAU7B6PFOwFO+dZ4zlHztDUp9m9TUYAICKfOGSp10o++FXt5d/xSdV1oIFC0ZGRERE+aS8fU164dKDIDPw7FFgtDgOqYojGUDdX4DIsfriR46V4h/JMHafUY9IHYxgi3o8+ylhaD8iIiJq4cKFI6GtsnQbdTWVFQQgaMGCBQlCqm8/Vi+8DHMEsNgPm3FkGVB5QDoPtupLI8erPOAHKbMlm6LVJSbq/eSTTyaAaDcYVFkm7lzRjtx///3xQk6NX6sXHGB6U49ox2VR8iJQ+Xvmgl6DzcSrPAAUv2DsvqNmS/MvamNfRL0n'+
			'TJgQD/32w4cYPW/qPDGmkSNHisszbpxXycqD6b+Ult4YQfHzwJl9xtIooWK/lJ8RjH5UKrcSmmqESyNGjIiFMhF+97LYc59Zw6FDh44QUt24qHYfCZMMNkbJi6Th7BYq8o1Lilq5m8XJq8jIyBEQ241qVwGUUWfPyRAeHi72C1sblQstQ2HdE4nSnwZOMnhU7AdKluuPP0hlewpRb0/7KLYfE1X3m7oSTABMVqtVnKRuu6Gduq1J311KXgS+ftNYyYzizFv61ddtlXITdbJarYOgQz1R0JrCZX93BXYbWRf0zC1UH9KOU7K85ySDR0W+RL4WaoqU/yNePM1mcxgMSoYMPRJimGVFnHyVXMXRhdKfSU9ub+LMPnX11VQDlL/Sa8XRQ0jgtv22NgD/MweoLgLcHd7r8nqtr/cG7FaGcOYt4N1U4NpZ7zV3h1TOA7Olcv'+
			'cSlHbh8iT4bEJxuVytgtqyRupTW7evA4fTgKgJwJB4oKNderliCeoL1LwNnPujNHoQYgVu1qpLswxi3MvlcrVB2bENoPKQG90W7QbgdjqdDoGQ0KHG5qivV+urcG/C3Ql8+6GxNKFRwiWn03kLfu6g4lWWkgMXn9Da2vqdkFP4cKP3vjtA1NvTPortx0TVtciB32Qi+A1pbm6+KqSKvE9/Je4mEPX2tA/fblS7ClAz6hSznQDcdru9Xog9TBxv/H8Bot5Xr16th/ImUN2LrdXUlY9ro3PnztUKOQ3/B911uKtA1Lu6uroW6s4FFNWWmsqiyOgE0FlcXCyOqP3A4NzG3QKi3p72UXKSpioplFFn9Rzv9KsDQMfhw4f/7nA4rvukDIvu/vrbgQbbw1K9GTgcjuuHDx/+O2hvD/z2Nt0rF5WkpMu10cWLF78SUk1+wWCN'+
			'BjiIUWBPu+h1VCPAqMrqcm908uTJ00LKhEUGanMXgKhveXn5aehzUuNXL4tUWQA6srOzP/O8kXoRMQIY95SRKg1cjF8o1ZeBy+Vq27x582dQdh3IqiwSelQWT8YdAC673d5aU1NzUkipNrt2N2FalnCppqbmpN1ub4XonEb3blwlo66krliPbK7CwsI/CTmOmmN8NclAw+i55CKNgoKCUoj+TwypLb0S4mM/PDd1bdu2rcJut4td4Fn/YaR6Aw9E/ex2e80rr7xSCf2egkjoeVOnVJZMSntBQYE4exM/D4hP1q7YQET8PClw8LQD5SFIySENCaPdXh8yALiysrJONjY2XhJySP5PacfR3YSgECD5v4TLjY2Nl7Kysk6CaRd42yog3V75SL6DwJeU9jfeeENcQzrsfmDe6zpqOYAw73WpXhz27t2bD2UfWoa8A2nNGL'+
			'J+alk7IuvJdgDOl19++a8XLlw4JaSesvLu6QaPe0qqD4cLFy6c2rBhw+egvQLxZGisENe2IfLRDaLrC8ZZ5KpVq3JdLlerkMuCA35sNehnGDVHqgcHl8vVumrVqlzQXubY9tKUDBlqNkQ+km/q4AgpKyuzFxYW5gk5WQZLjlyik9TKYRB6110EYH1GdJJUfovoYergwYN5ZWVldgTQ7Z+WyqKIIdUWgLbnn3/+aFVVlbj6eMh9wNNvC9uJexz+O4iWMHQ88HQR6RWoqqrqeEZGxlEoOzHzy1+WXpXF2xJeSmR3d23z58//bVNTU62QW9QE4J/eCYyk3Lqs7fSs0yXF8xfRSVJ5oxKFv5qammrnz5//Omj/i1TvSjcpRpYB8e8kgtoC0FZXV3czIyNji8PhEJf0RSd5Nul006a01EtLdNRQXQTcuuJf/qPmAM+8Rz48'+
			'DoejKSMjY0tdXd1NiI7LKH++uqUD8E9lKdkSp6eAbSUlJZezsrI2O51OcTHEkPukfeiJ6XrKp4xj/6bs6qmxAjj2C//yTUyXyhcp+kJwOp23srKyNjMOMSmnZd1yGdujPhfXrFkzefv27dmKfty/ypM8PnS0a5WTRlg0MGM9kPCMtPqjtVFaW3Vyu77F3yw0fC62t7e3rF+/Pnvnzp1n0Mc+FwHlzTuaXkkzMzMn5OTkbFL0SnrrirSZpq+9kiYtBQbHkX+3trY2rV27dvOePXuq0Q+8kgLivgbKu0P3/fYe/3fgb8f1lDswGD0XePQ3A9JvL0CTYsizdUlJSeYDDzygPup4+QRwagdw/rCeMvmH8QuBab/U49m6LCUlZU9/9GzdFZ85kvvXESjf787vgKo/AGfeBOo/01s+ZcROByYvl4y2xj70geL7vSsNaJui++'+
			'sIjz322Mjdu3cvT0xM1Pl1hGag7kPfryPcuiJtEmJd71kGS2uMB8dxX0d4XK8vE3dVVdUnmZmZA+brCIDy/kPeQY3m90O2bNkyNTMz88V+8v2QS7m5uW8OxO+HAPpI0f2Fnddee21Genr6or76wk5hYWHR2rVrP8MA/cJOV1rmSO5nh8FvUG3YsCEpNTX1iaSkpNk9/Q2qysrKE0VFRR94pl0H/DeoutIzRy0VpvcrbeaYmJiw7OzsaTNnzpwaHx8/KYBfaasoLy//3+zs7FMNDQ234SXhrvhKW1cexJF3KRGw7xjGxsbGRUdHx3q+YzgoJMTrT+nOnTttTqezxfMdw/r6+vor3fiOoYuJT60eoXpS3SIDCAAhvfylz2Aub/YhoKae5Yk1eYSaWqxBBZaITohSQS1Y6DYZQIC+het2u90AZGLkgnXC21ByCIK3YsHw'+
			'VpwlgCejL76FqyYRAVVRPLpNCCddbohPq4k574QvKR2e33cgksASwLrIk68ByoQA4hPNNjDf8DwBlJ3oERXFoyfW6fCkAN7J/SD4Prly48rEUNKg5uIIEAmRj7yU8IFSR5Q0dHJ58vcKKAJh1FXz587l32zD8k8+RYAeF0d8Y1GkqBHE24ZeJUJGT69kkwvP2hITRImRr/EE8aQpEULdlyKFP6fsQp8QIaOnJUS4H3FONbRW4PPiQakuvYFNz5/3OHp7rScvMfI1ihxonLPgVRZ7L76hKbLY+Hz6XkVfLb5lK6tEDkCTAahLB3UPvU9/n5DAoj+shlZrBFaieOhRWf5c61P0B0J4qDUc1cX1J79+i/5IiBoGVOP6A6Mu/r5HD+N7QvoZ/g/VtQP2VVtmLgAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hostspot_marker_floor";
		el.ggDx=0;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hostspot_marker_floor.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hostspot_marker_floor.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._hostspot_marker_floor.ggCurrentLogicStateSize != newLogicStateSize) {
				me._hostspot_marker_floor.ggCurrentLogicStateSize = newLogicStateSize;
				me._hostspot_marker_floor.style[domTransition]='width 0s, height 0s';
				if (me._hostspot_marker_floor.ggCurrentLogicStateSize == 0) {
					me._hostspot_marker_floor.style.width='55px';
					me._hostspot_marker_floor.style.height='55px';
					skin.updateSize(me._hostspot_marker_floor);
				}
				else if (me._hostspot_marker_floor.ggCurrentLogicStateSize == 1) {
					me._hostspot_marker_floor.style.width='28px';
					me._hostspot_marker_floor.style.height='28px';
					skin.updateSize(me._hostspot_marker_floor);
				}
				else {
					me._hostspot_marker_floor.style.width='55px';
					me._hostspot_marker_floor.style.height='55px';
					skin.updateSize(me._hostspot_marker_floor);
				}
			}
		}
		me._hostspot_marker_floor.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target+" $(cur)");
		}
		me._hostspot_marker_floor.onmouseover=function (e) {
			me._hstextfloor1.style[domTransition]='none';
			me._hstextfloor1.style.visibility=(Number(me._hstextfloor1.style.opacity)>0||!me._hstextfloor1.style.opacity)?'inherit':'hidden';
			me._hstextfloor1.ggVisible=true;
		}
		me._hostspot_marker_floor.onmouseout=function (e) {
			me._hstextfloor1.style[domTransition]='none';
			me._hstextfloor1.style.visibility='hidden';
			me._hstextfloor1.ggVisible=false;
		}
		me._hostspot_marker_floor.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._spot_arrow_current_view.appendChild(me._hostspot_marker_floor);
		el=me._hstextfloor1=document.createElement('div');
		els=me._hstextfloor1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloor";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloor1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloor1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_arrow_current_view.appendChild(me._hstextfloor1);
		me.__div = me._spot_arrow_current_view;
	};
	function SkinHotspotClass_ht_info_02(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_02=document.createElement('div');
		el.ggId="ht_info_02";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_02.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_02.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_02.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_02.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_02.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_02.ggUpdatePosition=function (useTransition) {
		}
		el=me._call2=document.createElement('div');
		els=me._call2__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._call2.ggUpdatePosition();}
		el.ggText=basePath + "./assets/call_out.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="call";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 61px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.69999;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._call2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._call2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._call2.clientWidth;
			var parentHeight = me._call2.clientHeight;
			var img = me._call2__img;
			var aspectRatioDiv = me._call2.clientWidth / me._call2.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_info_02.appendChild(me._call2);
		el=me._tt_information2=document.createElement('div');
		els=me._tt_information2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggDy=-12;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 185px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_information2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((183-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_02.appendChild(me._tt_information2);
		me.__div = me._ht_info_02;
	};
	function SkinHotspotClass_ht_info_03(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_03=document.createElement('div');
		el.ggId="ht_info_03";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_03.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_03.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_03.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_03.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_03.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_03.ggUpdatePosition=function (useTransition) {
		}
		el=me._call1=document.createElement('div');
		els=me._call1__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._call1.ggUpdatePosition();}
		el.ggText=basePath + "./assets/call_out.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="call";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:180,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 61px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.69999;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._call1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._call1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._call1.clientWidth;
			var parentHeight = me._call1.clientHeight;
			var img = me._call1__img;
			var aspectRatioDiv = me._call1.clientWidth / me._call1.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_info_03.appendChild(me._call1);
		el=me._tt_information1=document.createElement('div');
		els=me._tt_information1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggDy=20;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 185px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_information1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((183-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_03.appendChild(me._tt_information1);
		me.__div = me._ht_info_03;
	};
	function SkinHotspotClass_ht_info_04(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_04=document.createElement('div');
		el.ggId="ht_info_04";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_04.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_04.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_04.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_04.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_04.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_04.ggUpdatePosition=function (useTransition) {
		}
		el=me._call0=document.createElement('div');
		els=me._call0__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._call0.ggUpdatePosition();}
		el.ggText=basePath + "./assets/call_out_02.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="call";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 61px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.69999;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 189px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._call0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._call0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._call0.clientWidth;
			var parentHeight = me._call0.clientHeight;
			var img = me._call0__img;
			var aspectRatioDiv = me._call0.clientWidth / me._call0.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_info_04.appendChild(me._call0);
		el=me._tt_information0=document.createElement('div');
		els=me._tt_information0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggDy=-12;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 185px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_information0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((183-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_04.appendChild(me._tt_information0);
		me.__div = me._ht_info_04;
	};
	function SkinHotspotClass_ht_info_05(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_05=document.createElement('div');
		el.ggId="ht_info_05";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_05.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_05.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getViewerSize().width >= 1600))
			)
			{
				newLogicStateScaling = 1;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_05.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_05.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._ht_info_05.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._ht_info_05.ggCurrentLogicStateScaling == 0) {
					me._ht_info_05.ggParameter.sx = 0.5;
					me._ht_info_05.ggParameter.sy = 0.5;
					me._ht_info_05.style[domTransform]=parameterToTransform(me._ht_info_05.ggParameter);
				}
				else if (me._ht_info_05.ggCurrentLogicStateScaling == 1) {
					me._ht_info_05.ggParameter.sx = 1;
					me._ht_info_05.ggParameter.sy = 1;
					me._ht_info_05.style[domTransform]=parameterToTransform(me._ht_info_05.ggParameter);
				}
				else {
					me._ht_info_05.ggParameter.sx = 1;
					me._ht_info_05.ggParameter.sy = 1;
					me._ht_info_05.style[domTransform]=parameterToTransform(me._ht_info_05.ggParameter);
				}
			}
		}
		me._ht_info_05.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_05.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_05.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_05.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_05.ggUpdatePosition=function (useTransition) {
		}
		el=me._call=document.createElement('div');
		els=me._call__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._call.ggUpdatePosition();}
		el.ggText=basePath + "./assets/call_out_02.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="call";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 61px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.69999;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 189px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._call.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._call.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._call.clientWidth;
			var parentHeight = me._call.clientHeight;
			var img = me._call__img;
			var aspectRatioDiv = me._call.clientWidth / me._call.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_info_05.appendChild(me._call);
		el=me._tt_information=document.createElement('div');
		els=me._tt_information__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggDy=-12;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 185px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._tt_information.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((183-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_05.appendChild(me._tt_information);
		me.__div = me._ht_info_05;
	};
	function SkinHotspotClass_spot_play(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_play=document.createElement('div');
		el.ggId="spot_play";
		el.ggDx=-336;
		el.ggDy=-103;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_play.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_play.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play.ggUpdatePosition=function (useTransition) {
		}
		el=me._external_10=document.createElement('div');
		els=me._external_10__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._external_10.ggUpdatePosition();}
		el.ggText=basePath + "./assets/play.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="External 1";
		el.ggDx=0;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._external_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_10.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._external_10.ggCurrentLogicStateSize != newLogicStateSize) {
				me._external_10.ggCurrentLogicStateSize = newLogicStateSize;
				me._external_10.style[domTransition]='width 0s, height 0s';
				if (me._external_10.ggCurrentLogicStateSize == 0) {
					me._external_10.style.width='55px';
					me._external_10.style.height='55px';
					skin.updateSize(me._external_10);
				}
				else if (me._external_10.ggCurrentLogicStateSize == 1) {
					me._external_10.style.width='28px';
					me._external_10.style.height='28px';
					skin.updateSize(me._external_10);
				}
				else {
					me._external_10.style.width='55px';
					me._external_10.style.height='55px';
					skin.updateSize(me._external_10);
				}
			}
		}
		me._external_10.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
		}
		me._external_10.onmouseover=function (e) {
			me._hstextfloor0.style[domTransition]='none';
			me._hstextfloor0.style.visibility=(Number(me._hstextfloor0.style.opacity)>0||!me._hstextfloor0.style.opacity)?'inherit':'hidden';
			me._hstextfloor0.ggVisible=true;
		}
		me._external_10.onmouseout=function (e) {
			me._hstextfloor0.style[domTransition]='none';
			me._hstextfloor0.style.visibility='hidden';
			me._hstextfloor0.ggVisible=false;
		}
		me._external_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._external_10.clientWidth;
			var parentHeight = me._external_10.clientHeight;
			var img = me._external_10__img;
			var aspectRatioDiv = me._external_10.clientWidth / me._external_10.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._spot_play.appendChild(me._external_10);
		el=me._hstextfloor0=document.createElement('div');
		els=me._hstextfloor0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloor";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloor0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloor0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_play.appendChild(me._hstextfloor0);
		me.__div = me._spot_play;
	};
	function SkinHotspotClass_spot_play_current_view(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._spot_play_current_view=document.createElement('div');
		el.ggId="spot_play_current_view";
		el.ggDx=-336;
		el.ggDy=-103;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._spot_play_current_view.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._spot_play_current_view.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play_current_view.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play_current_view.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play_current_view.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._spot_play_current_view.ggUpdatePosition=function (useTransition) {
		}
		el=me._external_1=document.createElement('div');
		els=me._external_1__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._external_1.ggUpdatePosition();}
		el.ggText=basePath + "./assets/play.gif";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="External 1";
		el.ggDx=0;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 55px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 55px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._external_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_1.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getViewerSize().width > 1600))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getViewerSize().width <= 1600))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._external_1.ggCurrentLogicStateSize != newLogicStateSize) {
				me._external_1.ggCurrentLogicStateSize = newLogicStateSize;
				me._external_1.style[domTransition]='width 0s, height 0s';
				if (me._external_1.ggCurrentLogicStateSize == 0) {
					me._external_1.style.width='55px';
					me._external_1.style.height='55px';
					skin.updateSize(me._external_1);
				}
				else if (me._external_1.ggCurrentLogicStateSize == 1) {
					me._external_1.style.width='28px';
					me._external_1.style.height='28px';
					skin.updateSize(me._external_1);
				}
				else {
					me._external_1.style.width='55px';
					me._external_1.style.height='55px';
					skin.updateSize(me._external_1);
				}
			}
		}
		me._external_1.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target+" $(cur)");
		}
		me._external_1.onmouseover=function (e) {
			me._hstextfloor.style[domTransition]='none';
			me._hstextfloor.style.visibility=(Number(me._hstextfloor.style.opacity)>0||!me._hstextfloor.style.opacity)?'inherit':'hidden';
			me._hstextfloor.ggVisible=true;
		}
		me._external_1.onmouseout=function (e) {
			me._hstextfloor.style[domTransition]='none';
			me._hstextfloor.style.visibility='hidden';
			me._hstextfloor.ggVisible=false;
		}
		me._external_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._external_1.clientWidth;
			var parentHeight = me._external_1.clientHeight;
			var img = me._external_1__img;
			var aspectRatioDiv = me._external_1.clientWidth / me._external_1.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._spot_play_current_view.appendChild(me._external_1);
		el=me._hstextfloor=document.createElement('div');
		els=me._hstextfloor__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hstextfloor";
		el.ggDx=0;
		el.ggDy=40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp; "+me.hotspot.title+" &nbsp;";
		el.appendChild(els);
		me._hstextfloor.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hstextfloor.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((101-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._spot_play_current_view.appendChild(me._hstextfloor);
		me.__div = me._spot_play_current_view;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='spot_floor_arrow_360') {
			hotspot.skinid = 'spot_floor_arrow_360';
			hsinst = new SkinHotspotClass_spot_floor_arrow_360(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_floor_arrow_360_sizechanged();;
		} else
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_configloaded();;
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview();;
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_sizechanged();;
			me.callChildLogicBlocksHotspot_ht_info_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_mouseover();;
		} else
		if (hotspot.skinid=='ht_info_arrow') {
			hotspot.skinid = 'ht_info_arrow';
			hsinst = new SkinHotspotClass_ht_info_arrow(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_arrow_sizechanged();;
			me.callChildLogicBlocksHotspot_ht_info_arrow_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_arrow_mouseover();;
		} else
		if (hotspot.skinid=='ht_info_arrow_right') {
			hotspot.skinid = 'ht_info_arrow_right';
			hsinst = new SkinHotspotClass_ht_info_arrow_right(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_arrow_right_sizechanged();;
			me.callChildLogicBlocksHotspot_ht_info_arrow_right_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_arrow_right_mouseover();;
		} else
		if (hotspot.skinid=='spot_arrow_right') {
			hotspot.skinid = 'spot_arrow_right';
			hsinst = new SkinHotspotClass_spot_arrow_right(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_arrow_right_sizechanged();;
		} else
		if (hotspot.skinid=='spot_arrow_left') {
			hotspot.skinid = 'spot_arrow_left';
			hsinst = new SkinHotspotClass_spot_arrow_left(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_arrow_left_sizechanged();;
		} else
		if (hotspot.skinid=='spot_info') {
			hotspot.skinid = 'spot_info';
			hsinst = new SkinHotspotClass_spot_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='spot_open') {
			hotspot.skinid = 'spot_open';
			hsinst = new SkinHotspotClass_spot_open(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_open_sizechanged();;
		} else
		if (hotspot.skinid=='spot_open_close_door') {
			hotspot.skinid = 'spot_open_close_door';
			hsinst = new SkinHotspotClass_spot_open_close_door(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_open_close_door_sizechanged();;
		} else
		if (hotspot.skinid=='spot_open_close_curtain') {
			hotspot.skinid = 'spot_open_close_curtain';
			hsinst = new SkinHotspotClass_spot_open_close_curtain(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_open_close_curtain_sizechanged();;
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_image_sizechanged();;
			me.callChildLogicBlocksHotspot_ht_image_changenode();;
			me.callChildLogicBlocksHotspot_ht_image_configloaded();;
			me.callChildLogicBlocksHotspot_ht_image_mouseover();;
			me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged();;
		} else
		if (hotspot.skinid=='spot_arrow') {
			hotspot.skinid = 'spot_arrow';
			hsinst = new SkinHotspotClass_spot_arrow(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_arrow_sizechanged();;
		} else
		if (hotspot.skinid=='spot_arrow_current_view') {
			hotspot.skinid = 'spot_arrow_current_view';
			hsinst = new SkinHotspotClass_spot_arrow_current_view(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_arrow_current_view_sizechanged();;
		} else
		if (hotspot.skinid=='ht_info_02') {
			hotspot.skinid = 'ht_info_02';
			hsinst = new SkinHotspotClass_ht_info_02(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_info_03') {
			hotspot.skinid = 'ht_info_03';
			hsinst = new SkinHotspotClass_ht_info_03(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_info_04') {
			hotspot.skinid = 'ht_info_04';
			hsinst = new SkinHotspotClass_ht_info_04(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_info_05') {
			hotspot.skinid = 'ht_info_05';
			hsinst = new SkinHotspotClass_ht_info_05(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_05_sizechanged();;
		} else
		if (hotspot.skinid=='spot_play') {
			hotspot.skinid = 'spot_play';
			hsinst = new SkinHotspotClass_spot_play(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_play_sizechanged();;
		} else
		{
			hotspot.skinid = 'spot_play_current_view';
			hsinst = new SkinHotspotClass_spot_play_current_view(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_spot_play_current_view_sizechanged();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['spot_floor_arrow_360']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_floor_arrow_360'].length; i++) {
				hotspotTemplates['spot_floor_arrow_360'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				hotspotTemplates['ht_info'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow'].length; i++) {
				hotspotTemplates['ht_info_arrow'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_arrow_right']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_arrow_right'].length; i++) {
				hotspotTemplates['ht_info_arrow_right'][i] = null;
			}
		}
		if(hotspotTemplates['spot_arrow_right']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow_right'].length; i++) {
				hotspotTemplates['spot_arrow_right'][i] = null;
			}
		}
		if(hotspotTemplates['spot_arrow_left']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow_left'].length; i++) {
				hotspotTemplates['spot_arrow_left'][i] = null;
			}
		}
		if(hotspotTemplates['spot_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_info'].length; i++) {
				hotspotTemplates['spot_info'][i] = null;
			}
		}
		if(hotspotTemplates['spot_open']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_open'].length; i++) {
				hotspotTemplates['spot_open'][i] = null;
			}
		}
		if(hotspotTemplates['spot_open_close_door']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_open_close_door'].length; i++) {
				hotspotTemplates['spot_open_close_door'][i] = null;
			}
		}
		if(hotspotTemplates['spot_open_close_curtain']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_open_close_curtain'].length; i++) {
				hotspotTemplates['spot_open_close_curtain'][i] = null;
			}
		}
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				hotspotTemplates['ht_image'][i] = null;
			}
		}
		if(hotspotTemplates['spot_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow'].length; i++) {
				hotspotTemplates['spot_arrow'][i] = null;
			}
		}
		if(hotspotTemplates['spot_arrow_current_view']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_arrow_current_view'].length; i++) {
				hotspotTemplates['spot_arrow_current_view'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_02']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_02'].length; i++) {
				hotspotTemplates['ht_info_02'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_03']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_03'].length; i++) {
				hotspotTemplates['ht_info_03'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_04']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_04'].length; i++) {
				hotspotTemplates['ht_info_04'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_05']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_05'].length; i++) {
				hotspotTemplates['ht_info_05'][i] = null;
			}
		}
		if(hotspotTemplates['spot_play']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_play'].length; i++) {
				hotspotTemplates['spot_play'][i] = null;
			}
		}
		if(hotspotTemplates['spot_play_current_view']) {
			var i;
			for(i = 0; i < hotspotTemplates['spot_play_current_view'].length; i++) {
				hotspotTemplates['spot_play_current_view'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinCloner_node_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 150px; height: 100px; visibility: inherit; overflow: hidden;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner=document.createElement('div');
		els=me._node_image_cloner__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner.onclick=function (e) {
			if (
				(
					((me._node_image_cloner.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner']=true;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title=document.createElement('div');
		els=me._node_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 150px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title.style[domTransition]='';
				if (me._node_title.ggCurrentLogicStateVisible == 0) {
					me._node_title.style.visibility="hidden";
					me._node_title.ggVisible=false;
				}
				else {
					me._node_title.style.visibility=(Number(me._node_title.style.opacity)>0||!me._node_title.style.opacity)?'inherit':'hidden';
					me._node_title.ggVisible=true;
				}
			}
		}
		me._node_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_title);
		el=me._node_visited=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 85px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 145px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited.style[domTransition]='border-color 0s';
				if (me._node_visited.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_visited);
		me.__div.appendChild(me._node_image_cloner);
	};
	function SkinCloner_category_cloner_Class(item, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 170px; height: 40px; visibility: inherit; overflow: hidden;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			var tags = player.userdata.tags;
			if (tags.indexOf(me.ggTag) == -1) return false;
			for(var i=0;i<me.ggParent.ggCurrentFilter.length;i++) {
				if (tags.indexOf(me.ggParent.ggCurrentFilter[i])==-1) return false;
			}
			return true;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._category_text=document.createElement('div');
		els=me._category_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="category_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 170px;';
		hs+='height: 40px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggTitle+" ("+me.ggNodeCount+")";
		el.appendChild(els);
		me._category_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_text.onclick=function (e) {
			skin._node_cloner.ggText=me.ggTag;
			if (skin._node_cloner.ggText=='') {
				skin._node_cloner.ggUpdate([]);
			} else {
				skin._node_cloner.ggUpdate(skin._node_cloner.ggText.split(','));
			}
			skin.updateSize(skin.divSkin);
			player.setVariableValue('node_visible', true);
		}
		me._category_text.ggActivate=function () {
			skin._node_cloner.ggText=me.ggTag;
			if (skin._node_cloner.ggText=='') {
				skin._node_cloner.ggUpdate([]);
			} else {
				skin._node_cloner.ggUpdate(skin._node_cloner.ggText.split(','));
			}
			skin.updateSize(skin.divSkin);
		}
		me._category_text.ggUpdatePosition=function (useTransition) {
		}
		me._category_text.ggNodeChange=function () {
			if (me._category_text.ggLastIsActive!=me._category_text.ggIsActive()) {
				me._category_text.ggLastIsActive=me._category_text.ggIsActive();
				if (me._category_text.ggIsActive()) {
					if (me._category_text.ggActivate) me._category_text.ggActivate();
				} else {
					if (me._category_text.ggDeactivate) me._category_text.ggDeactivate();
				}
			}
		}
		me.__div.appendChild(me._category_text);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._map_10.logicBlock_size();
	me._image_shema_close0.logicBlock_position();
	me._map_1.logicBlock_size();
	me._image_shema_close.logicBlock_position();
	me._screentint_info.logicBlock_visible();
	me._information.logicBlock_visible();
	me._screentint_image.logicBlock_visible();
	me._image_popup.logicBlock_visible();
	me._popup_image.logicBlock_visible();
	me._image_popup_close.logicBlock_visible();
	me._map_plan.logicBlock_visible();
	me._node_scroller.logicBlock_alpha();
	me._category_scroller.logicBlock_alpha();
	me._menu_open.logicBlock_position();
	me._menu_open.logicBlock_alpha();
	me._gyro_on.logicBlock_alpha();
	me._gyro_off.logicBlock_alpha();
	me._tt_gyro.logicBlock_text();
	me._tt_gyro.logicBlock_position();
	player.addListener('sizechanged', function(args) { me._map_10.logicBlock_size();me._image_shema_close0.logicBlock_position();me._map_1.logicBlock_size();me._image_shema_close.logicBlock_position(); });
	player.addListener('changenode', function(args) { me._screentint_info.logicBlock_visible();me._information.logicBlock_visible();me._screentint_image.logicBlock_visible();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._image_popup_close.logicBlock_visible();me._map_plan.logicBlock_visible();me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha();me._gyro_on.logicBlock_alpha();me._gyro_off.logicBlock_alpha();me._tt_gyro.logicBlock_text(); });
	player.addListener('configloaded', function(args) { me._tt_gyro.logicBlock_position(); });
	player.addListener('gyrochanged', function(args) { me._gyro_on.logicBlock_alpha();me._gyro_off.logicBlock_alpha();me._tt_gyro.logicBlock_text(); });
	player.addListener('hastouch', function(args) { me._tt_gyro.logicBlock_position(); });
	player.addListener('varchanged_vis_info_popup', function(args) { me._screentint_info.logicBlock_visible();me._information.logicBlock_visible(); });
	player.addListener('varchanged_vis_image_popup', function(args) { me._screentint_image.logicBlock_visible();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._image_popup_close.logicBlock_visible(); });
	player.addListener('varchanged_category_visible', function(args) { me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha(); });
	player.addListener('varchanged_node_visible', function(args) { me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha(); });
	player.addListener('changenode', function(args) { me._node_cloner.callChildLogicBlocks_changenode(); });
	player.addListener('mouseover', function(args) { me._node_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._node_cloner.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._node_cloner.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me._node_cloner.callChildLogicBlocks_activehotspotchanged(); });
	player.addListener('sizechanged', function(args) { me.callChildLogicBlocksHotspot_spot_floor_arrow_360_sizechanged();me.callChildLogicBlocksHotspot_ht_info_sizechanged();me.callChildLogicBlocksHotspot_ht_info_arrow_sizechanged();me.callChildLogicBlocksHotspot_ht_info_arrow_right_sizechanged();me.callChildLogicBlocksHotspot_spot_arrow_right_sizechanged();me.callChildLogicBlocksHotspot_spot_arrow_left_sizechanged();me.callChildLogicBlocksHotspot_spot_open_sizechanged();me.callChildLogicBlocksHotspot_spot_open_close_door_sizechanged();me.callChildLogicBlocksHotspot_spot_open_close_curtain_sizechanged();me.callChildLogicBlocksHotspot_ht_image_sizechanged();me.callChildLogicBlocksHotspot_spot_arrow_sizechanged();me.callChildLogicBlocksHotspot_spot_arrow_current_view_sizechanged();me.callChildLogicBlocksHotspot_ht_info_05_sizechanged();me.callChildLogicBlocksHotspot_spot_play_sizechanged();me.callChildLogicBlocksHotspot_spot_play_current_view_sizechanged(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_changenode();me.callChildLogicBlocksHotspot_ht_image_changenode(); });
	player.addListener('configloaded', function(args) { me.callChildLogicBlocksHotspot_ht_node_configloaded();me.callChildLogicBlocksHotspot_ht_info_configloaded();me.callChildLogicBlocksHotspot_ht_info_arrow_configloaded();me.callChildLogicBlocksHotspot_ht_info_arrow_right_configloaded();me.callChildLogicBlocksHotspot_ht_image_configloaded(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_node_mouseover();me.callChildLogicBlocksHotspot_ht_info_mouseover();me.callChildLogicBlocksHotspot_ht_info_arrow_mouseover();me.callChildLogicBlocksHotspot_ht_info_arrow_right_mouseover();me.callChildLogicBlocksHotspot_ht_image_mouseover(); });
	player.addListener('activehotspotchanged', function(args) { me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged(); });
	player.addListener('varchanged_opt_3d_preview', function(args) { me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};