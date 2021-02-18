var x_url = window.location.href;
var x_index = x_url.lastIndexOf("\/");
x_str = x_url.substring(x_index + 1,x_url.length);
if ( x_str !='denied.html' && window.self === window.top) { 
    window.location='denied.html'; 
}

//字号
function SetFont(c) {
	var b = document.getElementById("cr");
	if (!b) {
		return
	}
	b.style.fontSize = c + "pt";
	var d = b.childNodes;
	for (var a = 0; a < d.length; a++) {
		if (d[a].nodeType == 1) {
			d[a].style.fontSize = c + "pt"
		}
	}

	var m = document.getElementById("wk");
	if (!m) {
		return
	}
	m.style.fontSize = c + "pt";
	var n = m.childNodes;
	for (var a = 0; a < n.length; a++) {
		if (n[a].nodeType == 1) {
			n[a].style.fontSize = c + "pt"
		}
	}
	
	
};

//导航栏
var tocDiv = function(content) {
		this.content = content;
		(function(content) {
			var div = document.createElement('div');
			div.innerHTML = content;
			div.id = 'az';
			var first = document.body.firstChild;
			document.body.insertBefore(div, first)
		})(content)
	};
	
function ToggleEditable (obj) {
	if (document.body.contentEditable == "true") {
		document.body.contentEditable = "false";
		obj.innerHTML = "<img class='xg' src='../css/img/lock.gif' title='擦写' style='width:14px;vertical-align: text-bottom;'>";
	}
	else {
		document.body.contentEditable = "true";
		obj.innerHTML = "<img class='xg' src='../css/img/unlock.gif' title='锁定' style='width:14px;vertical-align: text-bottom;'>";
	}
}
	
tocDiv('<span id="wk"><span style="margin-right:10px" id="title"></span><span onclick="show_hidden(toc);" style="margin-right:10px" id="sToc">[+/-]</span><span id="ghjj"><a href="javascript:SetFont(8)">小</a> <a href="javascript:SetFont(14)">中</a> <a href="javascript:SetFont(20)">大</a></span> <span onclick="ToggleEditable (this);"> <img class="xg" src="../css/img/lock.gif" title="擦写" style="width:14px;vertical-align: text-bottom;"></span><span id="ghj" style="float:right;" ><span id="date" title="最后更新" style="margin-right:10px"></span><a id="prev" style="margin-right:10px">Prev</a><a id="next">Next</a></span></span><a id="kw_btn" style="display:none" href="#kw_1">kw_btn</a><div id="toc"></div><hr/><img class="xg" onclick="topFunction()" id="gotop" src="../css/img/top.png">');
document.getElementById("title").innerHTML = "❑ " + document.title;
var currentTitle = document.title;
if(currentTitle=='大醉虾'| currentTitle=='Denied'){
	document.getElementById("prev").parentNode.removeChild(document.getElementById("prev"));
	document.getElementById("next").parentNode.removeChild(document.getElementById("next"));	
}
//关键词着色
//https://stackoverflow.com/questions/8644428/how-to-highlight-text-using-javascript
var InstantSearch = {
    "highlight": function(container, highlightText) {
        var internalHighlighter = function(options) {
            var id = {
                    container: "container",
                    tokens: "tokens",
                    all: "all",
                    token: "token",
                    className: "className",
                    sensitiveSearch: "sensitiveSearch"
                },
                tokens = options[id.tokens],
                allClassName = options[id.all][id.className],
                allSensitiveSearch = options[id.all][id.sensitiveSearch];

            function checkAndReplace(node, tokenArr, classNameAll, sensitiveSearchAll) {
                var nodeVal = node.nodeValue,
                    parentNode = node.parentNode,
                    i, j, curToken, myToken, myClassName, mySensitiveSearch, finalClassName, finalSensitiveSearch, foundIndex, begin, matched, end, textNode, span, isFirst;

                for (i = 0, j = tokenArr.length; i < j; i++) {
                    curToken = tokenArr[i];
                    myToken = curToken[id.token];
                    myClassName = curToken[id.className];
                    mySensitiveSearch = curToken[id.sensitiveSearch];
                    finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);
                    finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);
                    isFirst = true;
                    while (true) {
                        if (finalSensitiveSearch) foundIndex = nodeVal.indexOf(myToken);
                        else foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());
                        if (foundIndex < 0) {
                            if (isFirst) break;
                            if (nodeVal) {
                                textNode = document.createTextNode(nodeVal);
                                parentNode.insertBefore(textNode, node);
                            } // End if (nodeVal)
                            parentNode.removeChild(node);
                            break;
                        } // End if (foundIndex < 0)
                        isFirst = false;
                        begin = nodeVal.substring(0, foundIndex);
                        matched = nodeVal.substr(foundIndex, myToken.length);
                        if (begin) {
                            textNode = document.createTextNode(begin);
                            parentNode.insertBefore(textNode, node);
                        } // End if (begin)
                        span = document.createElement("span");
                        span.className += finalClassName;
                        span.appendChild(document.createTextNode(matched));
                        parentNode.insertBefore(span, node);

                        nodeVal = nodeVal.substring(foundIndex + myToken.length);
                    } // Whend
                } // Next i 
            }; // End Function checkAndReplace 
            function iterator(p) {
                if (p === null) return;
                var children = Array.prototype.slice.call(p.childNodes),
                    i,
                    cur;

                if (children.length) {
                    for (i = 0; i < children.length; i++) {
                        cur = children[i];
                        if (cur.nodeType === 3) {
                            checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
                        } else if (cur.nodeType === 1) {
                            iterator(cur);
                        }
                    }
                }
            }; // End Function iterator
            iterator(options[id.container]);
        } // End Function highlighter
        ;
        internalHighlighter({
            container: container,
            all: {
                className: "highlighter"
            },
            tokens: [{
                token: highlightText,
                className: "highlight",
                sensitiveSearch: false
            }]
        }); // End Call internalHighlighter 
    } // End Function highlight
};

//前后页
window.addEventListener("message", function( xyz ) {
	var str = xyz.data;
	var ARR = str.split(',');
	var currentTitle = document.title;
	if(currentTitle=='大醉虾'| currentTitle=='Denied'){
		document.getElementById("prev").parentNode.removeChild(document.getElementById("prev"));
		document.getElementById("next").parentNode.removeChild(document.getElementById("next"));	
	}
	else if(ARR.length>1){
		if(ARR[0]==currentTitle){
			document.getElementById("prev").parentNode.removeChild(document.getElementById("prev"));
			document.getElementById("next").setAttribute('href', ARR[1] + '.html');
			document.getElementById("next").setAttribute('onclick', 'javascript:next1()');
			document.getElementById("next").setAttribute('target', 'mainframe');		
			document.getElementById("next").setAttribute('title', ARR[1]);		
		}
		else if(ARR[ARR.length-1]==currentTitle){
			document.getElementById("prev").setAttribute('href', ARR[ARR.length-2] + '.html');
			document.getElementById("prev").setAttribute('onclick', 'javascript:prev1()');
			document.getElementById("prev").setAttribute('target', 'mainframe');
			document.getElementById("prev").setAttribute('title', ARR[ARR.length-2]);		
			document.getElementById("next").parentNode.removeChild(document.getElementById("next"));
		}
		else {
			for (var i = 1; i < ARR.length-1; i++) {
				if(ARR[i]==currentTitle){		
					document.getElementById("prev").setAttribute('href', ARR[i-1] + '.html');
					document.getElementById("prev").setAttribute('onclick', 'javascript:prev1()');
					document.getElementById("prev").setAttribute('target', 'mainframe');
					document.getElementById("prev").setAttribute('title', ARR[i-1]);		
					document.getElementById("next").setAttribute('href', ARR[i+1] + '.html');
					document.getElementById("next").setAttribute('onclick', 'javascript:next1()');
					document.getElementById("next").setAttribute('target', 'mainframe');
					document.getElementById("next").setAttribute('title', ARR[i+1]);		
				}
			};
		}
	}else{
		document.getElementById("prev").parentNode.removeChild(document.getElementById("prev"));
		document.getElementById("next").parentNode.removeChild(document.getElementById("next"));	
		var container = document.getElementById("cr");
		InstantSearch.highlight(container, str);
		document.getElementsByClassName("highlight")[0].setAttribute('id', "kw_1");
	}	
}, false );


function prev1(){
	top.postMessage('prev1','*');
}
function next1(){
	top.postMessage('next1','*');
}




//页脚
function show_hidden(obj) {
	if (obj.style.display == 'block') {
		obj.style.display = 'none';
	} else {
		obj.style.display = 'block';
	}
}


var footer = function(content) {
		this.content = content;
		(function(content) {
			var div = document.createElement('div');
			div.innerHTML = content;
			div.style.fontSize = "smaller";
			document.body.appendChild(div)
		})(content)
	};
footer('<span id="dot" title="hasFocus">┌</span><hr/><span style="background-color:snow;color:lightsteelblue;box-shadow:1px 1px 2px grey;cursor:pointer" onclick="hpg()">wulingpo.github.io</span><div id="layer" style="display: none; position: absolute; z-index: 100000000;"></div><div id="mask"></div><br/>');
function hpg(){window.open("https://wulingpo.github.io/","_parent")}

//站外链接
function target_blank() {
	var anchors = document.querySelectorAll("a[href^='http']:not(._top):not(.mediabox)");
	for (var l = 0; l < anchors.length; l++) {
			anchors[l].setAttribute('target', '_blank');
			anchors[l].classList.add('blank');
	};
};

//帖子日期
function tick() {
	var d = document.getElementById("edit_date");
	var c = document.getElementById("date");	
	var el=document.getElementById("edit_date");
	if(el.innerHTML==""){
		c.innerHTML ="Date: -";
		}else{
			c.innerHTML ="Date: "+d.innerHTML;
	}	
};
if( document.getElementById("edit_date") ){tick();}else{document.getElementById("date").innerHTML ="Date: -";}



//表格序号
var tables = document.getElementsByClassName('sNum');
for (var x = 0; x < tables.length; x++) {   
	for(var i = 0, td; i < tables[x].rows.length; i++){
		td = document.createElement('td');
		td.appendChild(document.createTextNode(i + 1));
		tables[x].rows[i].insertBefore(td, tables[x].rows[i].firstChild);
	};
};	

//表格样式
var bk_tb = document.getElementsByClassName('bk');
for (var x = 0; x < bk_tb.length; x++) {		
	for (var i = 0; i < bk_tb[x].querySelectorAll("tr").length; i++) {
		bk_tb[x].querySelectorAll("tr")[i].onmouseover = function() {
			this.style.backgroundColor = "#171515"
		};
		bk_tb[x].querySelectorAll("tr")[i].onmouseout = function() {
			this.style.backgroundColor = "#2f2f2f"
		};
	};
};
var be_tb = document.getElementsByClassName('be');
for (var x = 0; x < be_tb.length; x++) {		
	for (var i = 0; i < be_tb[x].querySelectorAll("tr").length; i++) {
		be_tb[x].querySelectorAll("tr")[i].onmouseover = function() {
			this.style.backgroundColor = "#ffffff"
		};
		be_tb[x].querySelectorAll("tr")[i].onmouseout = function() {
			this.style.backgroundColor = "whitesmoke"
		};
	};
};

//pop图片
//onmouseover="sPic(event,'../images/...jpg');" onmouseout="hPic();"
function sPic(e, sUrl) {
	var x, y;
	x = e.clientX;
	y = e.clientY;
	document.getElementById("layer").style.left = x + 10 + 'px';
	document.getElementById("layer").style.top = y + 2 + 'px';
	document.getElementById("layer").innerHTML = "<img style='z-index:1003;max-width:320px' border='0' src=\"" + sUrl + "\">";
	document.getElementById("layer").style.display = "";
	document.getElementById("mask").style.display ="block";
}
function hPic() {
	document.getElementById("layer").innerHTML = "";
	document.getElementById("layer").style.display = "none";
	document.getElementById("mask").style.display ='none';
}

//内文目录
function createLink(href, innerHTML) {
	var a = document.createElement("a");
	a.setAttribute("href", href);
	a.innerHTML = innerHTML;
	return a;
}
function generateTOC(toc) {
Object.prototype.exist2 = function(){ 
  if(typeof this !='undefined' && this.length >= 5){
	var i2 = 0,
		i3 = 0,
		i4 = 0;
	toc = toc.appendChild(document.createElement("ul"));
	for (var i = 0; i < document.getElementById("cr").childNodes.length; ++i) {
		var node = document.getElementById("cr").childNodes[i];
		var tagName = node.nodeName.toLowerCase();
		if (tagName == "h4") {
			++i4;
			if (i4 == 1) toc.lastChild.lastChild.lastChild.appendChild(document.createElement("ul"));
			var section = i2 + "." + i3 + "." + i4;
			node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
			node.id = "section" + section;
			toc.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
		} else if (tagName == "h3") {
			++i3, i4 = 0;
			if (i3 == 1) toc.lastChild.appendChild(document.createElement("ul"));
			var section = i2 + "." + i3;
			node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
			node.id = "section" + section;
			toc.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
		} else if (tagName == "h2") {
			++i2, i3 = 0, i4 = 0;
			var section = i2;
			node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
			node.id = "section" + section;
			toc.appendChild(h2item = document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
		}
	}
	document.getElementById("sToc").style.color = "blue";
	document.getElementById("sToc").style.display = "initial";
	document.getElementById("sToc").style.cursor = "n-resize";
  }else{document.getElementById("sToc").style.display = "none";};
};

document.querySelectorAll('h2,h3,h4').exist2();
}
var toc = document.getElementById("toc");

//代码醒目
//https://asvd.github.io/microlight/
!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("undefined"!=typeof exports?exports:e.microlight={})}(this,function(e){var t,n,i,o=window,r=document,a="appendChild",l="test",c=";text-shadow:",s="opacity:.",d=" 0px 0px ",u="3px 0px 5",f=")",p=function(e){for(n=r.getElementsByClassName(e||"microlight"),t=0;i=n[t++];)for(var p,h,g,m,y,x=i.textContent,b=0,w=x[0],v=1,k=i.innerHTML="",C=0,N=/(\d*\, \d*\, \d*)(, ([.\d]*))?/g.exec(o.getComputedStyle(i).color),E="px rgba("+N[1]+",",S=N[3]||1;h=p,p=7>C&&"\\"==p?1:v;){if(v=w,w=x[++b],m=k.length>1,!v||C>8&&"\n"==v||[/\S/[l](v),1,1,!/[$\w]/[l](v),("/"==p||"\n"==p)&&m,'"'==p&&m,"'"==p&&m,x[b-4]+h+p=="-->",h+p=="*/"][C])for(k&&(i[a](y=r.createElement("span")).setAttribute("style",["",c+d+9+E+.7*S+"),"+d+2+E+.4*S+f,s+6+c+d+7+E+S/4+"),"+d+3+E+S/4+f,s+7+c+u+E+S/5+"),-"+u+E+S/5+f,"font-style:italic;"+s+5+c+u+E+S/4+"),-"+u+E+S/4+f][C?3>C?2:C>6?4:C>3?3:+/^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/[l](k):0]),y[a](r.createTextNode(k))),g=C&&7>C?C:g,k="",C=11;![1,/[\/{}[(\-+*=<>:;|\\.,?!&@~]/[l](v),/[\])]/[l](v),/[$\w]/[l](v),"/"==v&&2>g&&"<"!=p,'"'==v,"'"==v,v+w+x[b+1]+x[b+2]=="<!--",v+w=="/*",v+w=="//","#"==v][--C];);k+=v}};e.reset=p,"complete"==r.readyState?p():o.addEventListener("load",function(){p()},0)});
function edit() {
	edit = document.getElementsByClassName('microlight');
	if (edit) {
		for (var i = 0; i < edit.length; i++) {
			edit[i].setAttribute('contentEditable', 'true');
			edit[i].style.cursor = "default";
			edit[i].ondblclick = function() {
				document.execCommand('selectAll', false, null)
			}
		}
	}
};

//图集
//<img src="../images/" data-subtext="图片说明"><br>
//https://www.cssscript.com/demo/mobile-compatible-responsive-gallery-hesgallery/
document.body.classList.add('hes-gallery');
let HesGallery = {
    options: {
        minResolution: 0,
        wrapAround: false,
        showImageCount: true
    },
    version: '1.4.2'
}
function HesSingleGallery(index) {
    this.index = index;
    this.imgPaths = []; 
    this.subTexts = [];
    this.altTexts = [];
    this.options = {};
    let gallery = document.getElementsByClassName('hes-gallery')[this.index];
    this.options.wrapAround = typeof gallery.dataset.wrap == 'undefined' ? HesGallery.options.wrapAround : gallery.dataset.wrap == 'true';
    this.options.showImageCount = typeof gallery.dataset.imgCount == 'undefined' ? HesGallery.options.showImageCount : gallery.dataset.imgCount == 'true';
    let disabledCount = 0;
    [].forEach.call(gallery.querySelectorAll('img:not(.xg):not(#hg-pic)'), function (image, i) {
        if(image.dataset.disabled == 'true') disabledCount++
        else {
            this.imgPaths.push(image.src || '');
            this.subTexts.push(image.dataset.subtext || '');
            this.altTexts.push(image.dataset.alt || '');
            image.setAttribute('onclick', 'HesGallery.show('+(this.index)+','+(i - disabledCount)+')');
        }
    }.bind(this));
    this.count = this.imgPaths.length;
}
HesGallery.setOptions = function(values) {
    for(let key in values) this.options[key] = values[key];
}

HesGallery.init = function() {
    if(!this.executed) {
        this.EOM = {};
        const gal = document.createElement('div')
        gal.id = "hgallery"
        gal.setAttribute('style', 'visibility:hidden;')
        document.body.appendChild(gal)
        this.EOM.galery = document.getElementById('hgallery');
        this.EOM.galery.innerHTML += "<div id='hg-bg' onclick='HesGallery.hide()'></div>";
        this.EOM.galery.innerHTML += "<div id='hg-pic-cont'><img id='hg-pic' onmouseover='startDrag(this,this);z1000()' onmousewheel='bbimg(this)' ondblclick='HesGallery.hide()' /></div>";
        this.EOM.galery.innerHTML += "<span id='hg-prev' onclick='HesGallery.prev()'>prev</span>";
        this.EOM.galery.innerHTML += "<span id='hg-next' onclick='HesGallery.next()'>next</span>";
        this.EOM.b_prev = document.getElementById('hg-prev');
        this.EOM.b_next = document.getElementById('hg-next');
        this.EOM.pic_cont = document.getElementById('hg-bg');
        this.executed = true;
    }
    this.EOM.pic_cont.classList = 'hg-transition';
    this.count = document.querySelectorAll('.hes-gallery').length;
    this.galleries = [];
    for(let i = 0; i<this.count; i++) { 
        this.galleries[i] = new HesSingleGallery(i);
    }
}
HesGallery.show = function(g,i) {
    if(innerWidth < this.options.minResolution) return false;
    this.currentImg = i;
    this.currentGal = g;
    this.open = true;
    if(this.EOM.pic_cont.classList=='hg-transition') this.EOM.pic_cont.classList.remove('hg-transition');
    document.getElementById('hg-pic').setAttribute('src', this.galleries[g].imgPaths[i]);
    document.getElementById('hg-pic').alt = this.galleries[g].altTexts[i]; 
	document.getElementsByTagName("body")[0].style.overflow = "hidden";	
    this.EOM.galery.classList = 'open';
	//全屏
	top.postMessage('hidden_bb','*');
    this.EOM.pic_cont.dataset.subtext = this.galleries[g].subTexts[i];
    if(
        this.galleries[this.currentGal].options.showImageCount &&
        this.galleries[this.currentGal].imgPaths.length != 1
    ) this.EOM.pic_cont.dataset.howmany =  (this.currentImg+1)+'/'+this.galleries[g].count;
    else  this.EOM.pic_cont.dataset.howmany = '';
    if(this.galleries[this.currentGal].imgPaths.length == 1) { 
        this.EOM.b_prev.classList = 'hg-unvisible';
        this.EOM.b_next.classList = 'hg-unvisible';
    }
    else if(this.currentImg+1 == 1 && !this.galleries[this.currentGal].options.wrapAround) { 
        this.EOM.b_prev.classList = 'hg-unvisible';
        this.EOM.b_next.classList = '';
    }
    else if (this.currentImg+1 == this.galleries[this.currentGal].count && !this.galleries[this.currentGal].options.wrapAround) { 
        this.EOM.b_next.classList = 'hg-unvisible';
        this.EOM.b_prev.classList = '';
    }
    else { 
        this.EOM.b_next.classList = '';
        this.EOM.b_prev.classList = '';
    }
}
HesGallery.hide = function() {
    this.EOM.pic_cont.classList.add('hg-transition');
    this.EOM.galery.classList='';
	//恢复
	top.postMessage('show_bb','*');
    this.open = false;	
	document.getElementsByTagName("body")[0].style.overflow = "auto";
}
HesGallery.next = function() {
    if(this.galleries[this.currentGal].options.wrapAround && this.currentImg == this.galleries[this.currentGal].count-1)
        this.show(this.currentGal, 0);
    else if(this.currentImg+1 < this.galleries[this.currentGal].count)
        this.show(this.currentGal, this.currentImg+1);
}
HesGallery.prev = function() {
    if(this.galleries[this.currentGal].options.wrapAround && this.currentImg == 0)
        this.show(this.currentGal, this.galleries[this.currentGal].count-1);
    else if(this.currentImg+1 > 1)
        this.show(this.currentGal, this.currentImg-1);
}
HesGallery.setOptions({
	minResolution: 0,
	showImageCount: true,
	wrapAround: true
});

//缩放，拖拽
var params = {
	zoomVal:1,
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false
};
function bbimg(o){
	params.zoomVal+=event.wheelDelta/1200;
	if (params.zoomVal >= 0.2) {
		o.style.transform="scale("+params.zoomVal+")";
	} else {
		params.zoomVal=0.2;
		o.style.transform="scale("+params.zoomVal+")";
		return false;
	}
}
var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};
var startDrag = function(bar, target, callback){
	if(getCss(target, "left") !== "auto"){
		params.left = getCss(target, "left");
	}
	if(getCss(target, "top") !== "auto"){
		params.top = getCss(target, "top");
	}
	//o是移动对象
	bar.onmousedown = function(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}
		}
		var e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
	};
	document.onmouseup = function(){
		params.flag = false;
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
	};
	document.onmousemove = function(event){
		var e = event ? event: window.event;

		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.currentX, disY = nowY - params.currentY;
			target.style.left = parseInt(params.left) + disX+ "px";
			target.style.top = parseInt(params.top) + disY+ "px";
			target.style.position = "relative";

			if (typeof callback == "function") {
				callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
			}

			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
	}
};
ie = (document.all) ? true : false;
function keyDown(e){  
	var xxxx = document.getElementById('hgallery');
    var zzzz = document.getElementById('hg-pic');
	if(ie){
		if(xxxx.getAttribute('class')=='open'){   
			if(event.keyCode==40){//下：退出
				event.keyCode=0;      
				event.returnValue=false;      
				HesGallery.hide();
			}    
			if(event.keyCode==38){//上：恢复尺寸
				event.keyCode=0;      
				event.returnValue=false;      
				zzzz.style.transform = "scale(1)";
				params.zoomVal = 1;
				zzzz.style.left = 0;
				zzzz.style.top = 0;
			}    
			if(event.keyCode==37){//左   
				event.keyCode=0;      
				event.returnValue=false;      
				HesGallery.prev();   
			}   
			if(event.keyCode==39){//右 
				event.keyCode=0;      
				event.returnValue=false;      
				HesGallery.next();    
			}
		}
		if(event.keyCode==37){//左   
			event.keyCode=0;      
			event.returnValue=false;      
			document.getElementById('prev').click();   
		}   
		if(event.keyCode==39){//右 
			event.keyCode=0;      
			event.returnValue=false;      
			document.getElementById('next').click();    
		}
	}else{    
		if(xxxx.getAttribute('class')=='open'){   	
			if(e.which==40){//下     
				e.which=0;      
				e.returnValue=false;      
				HesGallery.hide();
				//注意：此句不能少，否则火狐下个别热键会被重复调用；如F5键：会先调用自定义函数，再刷新页面，其他同理       
				return false;    
			}    
			if(e.which==38){//上     
				e.which=0;      
				e.returnValue=false;      
				zzzz.style.transform = "scale(1)";
				params.zoomVal = 1;
				zzzz.style.left = 0;
				zzzz.style.top = 0;
				return false;    
			}    
			if(e.which==37){//左      
				e.which=0;       
				e.returnValue=false;       
				HesGallery.prev();      
				return false;    
			}   
			if(e.which==39){//右      
				e.which=0;       
				e.returnValue=false;       
				HesGallery.next();      
				return false;    
			}   
		};
		if(e.which==37){//左      
			e.which=0;       
			e.returnValue=false;       
			document.getElementById('prev').click();      
			return false;    
		}   
		if(e.which==39){//右      
			e.which=0;       
			e.returnValue=false;       
			document.getElementById('next').click();    
			return false;    
		}   
	};
};
document.onkeydown=keyDown;



//视频灯箱
//https://www.cssscript.com/demo/responsive-youtubevimeo-video-lightbox-with-vanilla-javascript-mediabox/
(function(root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.MediaBox = factory();
    }
}(this, function() {
    "use strict";
    var MediaBox = function(element) {
        if (!this || !(this instanceof MediaBox)) {
            return new MediaBox(element);
        }
        this.selector = document.querySelectorAll(element);
        this.root = document.querySelector('body');
        this.run();
    };
    MediaBox.prototype = {
        run: function() {
            Array.prototype.forEach.call(this.selector, function(el) {
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    var link = this.parseUrl(el.getAttribute('href'));
                    this.render(link);
					top.postMessage('hidden_bb','*');
                    this.close();
					document.getElementsByTagName("body")[0].style.overflow = "hidden";	
                }.bind(this), false);
            }.bind(this));
        },
        template: function(s, d) {
            var p;
            for (p in d) {
                if (d.hasOwnProperty(p)) {
                    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
                }
            }
            return s;
        },
        parseUrl: function(url) {
            var service = {},
                matches;
            if (matches = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
                service.provider = "youtube";
                service.id = matches[2];
            } else if (matches = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/)) {
                service.provider = "vimeo";
                service.id = matches[3];
            } else {
                service.provider = "Unknown";
                service.id = '';
            }
            return service;
        },
        render: function(service) {
            var embedLink, lightbox;
            if (service.provider === 'youtube') {
                embedLink = 'https://www.youtube.com/embed/' + service.id;
            } else if (service.provider === 'vimeo') {
                embedLink = 'https://player.vimeo.com/video/' + service.id;
            } else {
                throw new Error("Invalid video URL");
            }
            lightbox = this.template('<div class="mediabox-wrap"><div class="mediabox-content"><span class="mediabox-close">Esc</span><iframe src="{embed}?autoplay=1" frameborder="0" allowfullscreen></iframe></div></div>', {
                embed: embedLink
            });
            this.root.insertAdjacentHTML('beforeend', lightbox);
        },
        close: function() {
            var wrapper = document.querySelector('.mediabox-wrap');
            wrapper.addEventListener('click', function(e) {
                if (e.target && e.target.nodeName === 'SPAN' && e.target.className === 'mediabox-close') {
					document.getElementsByTagName("body")[0].style.overflow = "auto";	
                    wrapper.classList.add('mediabox-hide');
					top.postMessage('show_bb','*');
                    setTimeout(function() {
                        this.root.removeChild(wrapper);
                    }.bind(this), 500);
                }
            }.bind(this), false);
        }
    };
    return MediaBox;
}));

//返回顶部
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        document.getElementById("gotop").style.display = "block";
    } else {
        document.getElementById("gotop").style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//当前焦点
if (document.hasFocus()) {
    document.getElementById("dot").style.display = "block"; 
} else {
    document.getElementById("dot").style.display = "none"; 
}
window.onfocus = function() { 
	document.getElementById("dot").style.display = "block"; 
};
window.onblur = function() { 
    document.getElementById("dot").style.display = "none";
};


function ddelay(){if ( x_str !='denied.html' && window.self != window.top) { window.setTimeout(function(){document.getElementById('kw_btn').click();},600);}}
window.onload=function(){HesGallery.init();MediaBox('.mediabox');target_blank();edit();ddelay();generateTOC(document.getElementById('toc'));}
window.setTimeout(function(){document.body.style.display="block";document.body.contentEditable = "false"},30);