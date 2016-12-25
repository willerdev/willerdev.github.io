function NavisConvertTagToPhoneNumberBasic(t){
	if (t != null) t = t.toLowerCase();
	switch (t){
		case "8002395414": return("8002395414");
		case "8004377439": return("8004377439");
		case "8442591391": return("8442591391");
		case "8443301711": return("8443301711");
		case "8443301795": return("8443301795");
		case "8443301797": return("8443301797");
		case "8443301799": return("8443301799");
		case "8443301802": return("8443301802");
		case "8443301809": return("8443301809");
		case "8443301811": return("8443301811");
		case "8443301813": return("8443301813");
		case "8444021920": return("8444021920");
		case "8447122733": return("8447122733");
		case "8449939569": return("8449939569");
		case "8552688489": return("8552688489");
		case "8553386099": return("8553386099");
		case "8553387117": return("8553387117");
		case "8553387126": return("8553387126");
		case "8553388727": return("8553388727");
		case "test": return("8554412354");
		case "organic": return("8554412434");
		case "8556297020": return("8556297020");
		case "8556755461": return("8556755461");
		case "8556916365": return("8556916365");
		case "8557293108": return("8557293108");
		case "8557454518": return("8557454518");
		case "8557454519": return("8557454519");
		case "8557776498": return("8557776498");
		case "8558162608": return("8558162608");
		case "8558485332": return("8558485332");
		case "8559011718": return("8559011718");
		case "8662110434": return("8662110434");
		case "8662648353": return("8662648353");
		case "8662741296": return("8662741296");
		case "8662787897": return("8662787897");
		case "8663990402": return("8663990402");
		case "8664883132": return("8664883132");
		case "8665044829": return("8665044829");
		case "8665050791": return("8665050791");
		case "8665052984": return("8665052984");
		case "8665054528": return("8665054528");
		case "8665207380": return("8665207380");
		case "8665207382": return("8665207382");
		case "8665208379": return("8665208379");
		case "8667277622": return("8667277622");
		case "8667851412": return("8667851412");
		case "8668224932": return("8668224932");
		case "8669909231": return("8669909231");
		case "8669916650": return("8669916650");
		case "8772031840": return("8772031840");
		case "8772035908": return("8772035908");
		case "8772099017": return("8772099017");
		case "8772613427": return("8772613427");
		case "8772658415": return("8772658415");
		case "8776478774": return("8776478774");
		case "8776506234": return("8776506234");
		case "8776751991": return("8776751991");
		case "8777242149": return("8777242149");
		case "8777242161": return("8777242161");
		case "8777242163": return("8777242163");
		case "8777254197": return("8777254197");
		case "8777374452": return("8777374452");
		case "8777400432": return("8777400432");
		case "8777729988": return("8777729988");
		case "8777836073": return("8777836073");
		case "8883831418": return("8883831418");
		case "8884603983": return("8884603983");
		case "8884845542": return("8884845542");
		case "8885114153": return("8885114153");
		case "8885261933": return("8885261933");
		case "8885278939": return("8885278939");
		case "8885284590": return("8885284590");
		case "8885445082": return("8885445082");
		case "8885561981": return("8885561981");
		case "8885635707": return("8885635707");
		case "8885802870": return("8885802870");
		case "8885828639": return("8885828639");
		case "8886847890": return("8886847890");
		case "8887169665": return("8887169665");
		case "8887737106": return("8887737106");
		case "8887952125": return("8887952125");
	}
	return("8443301797");
}


function ValidateNavisKeyword(t){
	return t;
}


function CreateNavisTagCookie(t) {
	CreateNavisTagCookie3(t, "", 90);
}

function CreateNavisTagCookie2(t, dom) {
	CreateNavisTagCookie3(t, dom, 90);
}

var NavisCookieKeywordValue = null;
function CreateNavisTagCookie3(t, dom, days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	var domstr = (dom=="")? "" : "; domain=" + dom;
	document.cookie = "14890NavisNCKeyword="+t+expires+domstr+"; path=/";
	document.cookie = "NavisNCKeyword="+expires+domstr+"; path=/";
	NavisCookieKeywordValue = t;
}


function ReadNavisTagCookie1(n) {
    //actually used to read both tag cookies and contactId cookies
	var nameEQ = n + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}



function ReadNavisTagCookie() {
	var c0 = NavisCookieKeywordValue;
	if (c0 != null) return ValidateNavisKeyword(c0);
	var c1 = ReadNavisTagCookie1("14890NavisNCKeyword");
	if (c1 != null) return ValidateNavisKeyword(c1);
	var c2 = ReadNavisTagCookie1("NavisNCKeyword");
	return ValidateNavisKeyword(c2);
}


function GetNavisQueryString(name){
	var nameEQ = name + "=";
	nameEQ = nameEQ.toLowerCase();
	//alert(window.location.search.substring(1, window.location.search.length));
	var ca = window.location.search.substring(1, window.location.search.length).split('&');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		c = c.toLowerCase();
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function GetNavisTagQueryString(){
    return GetNavisQueryString("NCK");
}


function NavisGetDomain(url){
	var rs = url.split('/');
	var rd = rs.length > 2 ? rs[2].toLowerCase() : null;
	return rd;
}
	

function GetNavisTagReferrer(){
	return GetNavisTagReferrer2("");
}
function GetNavisTagReferrer2(dom){
	var rd = NavisGetDomain(document.referrer);
	if (rd == null) return null;
	var ld = NavisGetDomain(document.location.href);
	if (rd == ld) return null;
	if (dom != "" && dom != null){
		if (dom.substring(0, 1) == ".") dom = dom.substring(1,dom.length);
		if (rd == dom) return null;
		dom = "." + dom;
		if (rd.length > dom.length && rd.substring(rd.length-dom.length, dom.length) == dom) return null;
	}
	return rd;
}

function GetNavisTagHash(){
	var nameEQ = "NCK=";
	nameEQ = nameEQ.toLowerCase();
	var h = document.location.hash;
	h = h.toLowerCase();
	return (h.substring(1, nameEQ.length + 1) == nameEQ) ? h.substring(nameEQ.length + 1, h.length) : null; 
}

	

function ProcessNavisNCKeyword(){
	ProcessNavisNCKeyword5("", true, false, false, 90);
}

function ProcessNavisNCKeyword2(dom){
	ProcessNavisNCKeyword5(dom, true, false, false, 90);
}

function ProcessNavisNCKeyword3(dom, referrer){
	ProcessNavisNCKeyword5(dom, true, false, referrer, 90);
}

function ProcessNavisNCKeyword4(dom, querystring, hash, referrer){
	ProcessNavisNCKeyword5(dom, querystring, hash, referrer, 90)
}

//dom: domain for the cookie, useful for cookies that persist on multiple subdomains
//querystring:  Should I look in the querystring for the token?
//hash:  Should I look in the hash (the part of the URL after #) for the token?
//referrer:  Should I use the domain of the referrer as the token?
//days: how many days the cookie should persist for
function ProcessNavisNCKeyword5(dom, querystring, hash, referrer, days){
	var t = null;
	if (t == null && querystring){
		t = GetNavisTagQueryString();
	}
	if (t == null && hash){
		t = GetNavisTagHash();
	}
	if (t == null && referrer){
		t = GetNavisTagReferrer2(dom);
	}
	
	if (t != null){
		CreateNavisTagCookie3(t, dom, days);
	}

    ProcessNavisContactId(dom)
}



function FormatPhone(ph, fmt){
	var fs = fmt.split("#");
	var s = "";
	for (var i = 0; i < 10; i++){
		s += fs[i] + ph.substr(i, 1);
	}
	s += fs[10];
	return s;
}

function ShowNavisNCPhoneNumber(){
	ShowNavisNCPhoneNumberFormat("(###) ###-####");
}

function ShowNavisNCPhoneNumberFormat(fmt){
	var ph = NavisConvertTagToPhoneNumberBasic(ReadNavisTagCookie());
	document.write(FormatPhone(ph, fmt));
}


function SetElementToNavisNCPhoneNumber(id){
	SetElementToNavisNCPhoneNumberFormat(id, "(###) ###-####");
}

function SetElementToNavisNCPhoneNumberFormat(id, fmt){
	var el = document.getElementById(id);
	if (el == null){
		return
	} 
	var ph = NavisConvertTagToPhoneNumberBasic(ReadNavisTagCookie());
    ph = FormatPhone(ph, fmt);
    el.innerHTML = ph;
}

function NavisConvertTagToPhoneNumber(t){
	return FormatPhone(NavisConvertTagToPhoneNumberBasic(t), "(###) ###-####");
}

function NavisSetHiddenKeywordField(id){
	NavisSetHiddenKeywordFieldD(id, null);
}
function NavisSetHiddenKeywordFieldD(id, deflt){
	var fld = document.getElementById(id);
	if (fld != null){
		var kwd = ReadNavisTagCookie();
		if (kwd == null && deflt != null) kwd = deflt;
		fld.value = kwd;
	}
}
function NavisSetHiddenPhoneNumberField(id){
	var fld = document.getElementById(id);
	if (fld != null){
		fld.value = NavisConvertTagToPhoneNumberBasic(ReadNavisTagCookie());
	}
}



function SetNavisP2TalkLink(linkId){
	SetNavisLink(linkId, "P2Talk", "");
}
function SetNavisP2TalkCustomLink(linkId){
	SetNavisLink(linkId, "P2TCust", "");
}
function SetNavisP2ChatLink(linkId){
	SetNavisLink(linkId, "P2ChatIni", "");
}
function SetNavisP2ChatCustomLink(linkId){
	SetNavisLink(linkId, "P2ChatIni", "&cust=1");
}
function SetNavisLink(linkId, page, extra){
	var lnk = document.getElementById(linkId);
	if (lnk != null && (lnk.tagName.toLowerCase() == "a" || lnk.tagName.toLowerCase() == "area")){
		var ph = NavisConvertTagToPhoneNumberBasic(ReadNavisTagCookie());
		var acct = "14890";

		lnk.href = "https://www.thenavisway.com/p2talk/" + page + ".aspx?account=" + acct + "&dnis=" + ph + "&contactid=" + ReadNavisContactIdCookie() + extra;
	}
}


function AppendNavisKeywordToURL(url){
	var kwd = ReadNavisTagCookie();
	url = AppendNavisItemToURL(url, "NCK", kwd);
	var c = ReadNavisContactIdCookie();
	url = AppendNavisItemToURL(url, "ContactId", c);
    return url;
}

function AppendNavisKeywordToLink(linkId){
	var kwd = ReadNavisTagCookie();
	AppendNavisItemToLink(linkId, "NCK", kwd);
	var c = ReadNavisContactIdCookie();
	AppendNavisItemToLink(linkId, "ContactId", c);
}

function AppendNavisPhoneNumberToLink(linkId, param){
	var tfn = NavisConvertTagToPhoneNumberBasic(ReadNavisTagCookie());
	AppendNavisItemToLink(linkId, param, tfn);
}

function SetTelLinkToNavisPhoneNumber(linkId){
    SetLinkToNavisPhoneNumber(linkId, "tel:+1");
}

function SetLinkToNavisPhoneNumber(linkId, prefix){
	var tfn = NavisConvertTagToPhoneNumberBasic(ReadNavisTagCookie());
	var lnk = document.getElementById(linkId);
	if (lnk == null){
		return
	} 
	var tag = lnk.tagName.toLowerCase();
	if (tag == "a" || tag == "area"){
		lnk.href = prefix + tfn;
	}
}


function AppendNavisItemToURL(url, param, val){
	if (val != null){
		var hl = url.indexOf("#");
		var ha = ""
		if (hl != -1){
			ha = url.substr(hl);
			url = url.substr(0, hl);
		}
		return url + (url.indexOf("?") == -1 ? "?" : "&") + param + "=" + val + ha;
	}
	return url;
}

function AppendNavisItemToLink(linkId, param, val){
	var lnk = document.getElementById(linkId);
	if (lnk == null){
		return
	} 
	var tag = lnk.tagName.toLowerCase();
	if (tag == "a" || tag == "area"){
		lnk.href = AppendNavisItemToURL(lnk.href, param, val);
	} else if (tag == "iframe"){
		lnk.src = AppendNavisItemToURL(lnk.src, param, val);
	} else if (tag == "form"){
		lnk.action = AppendNavisItemToURL(lnk.action, param, val);
	}
}



function SendNavisConfirmationNumberField(resnum, fld){
	var ph = NavisConvertTagToPhoneNumberBasic(ReadNavisTagCookie());
	var navisPixel =new Image();
	var acct = "14890";
	var jspass = "obb19fmgijxtq14etm6z";
	navisPixel.src="https://www.thenavisway.com/Narrowcast/Interface/OnlineBookingPixel.aspx?acct=" + acct + "&jspass=" + jspass + "&" + fld + "=" + resnum + "&tfn=" + ph + "&n=" + GetNavisUniqueTimeValue();
}


function SendNavisConfirmationNumber(resnum){
	SendNavisConfirmationNumberField(resnum, "resnum");
}

function SendNavisAltConfirmationNumber(altresnum){
	SendNavisConfirmationNumberField(altresnum, "altresnum");
}





//ContactId Specific

var NavisCookieContactIdValue = null;
function CreateNavisContactIdCookie(contactid, dom) {
    var regex = /^[0-9]{4,19}$/i;
    if (contactid == null){
        return;
    } else if (contactid == ""){
        return;
    } else if (contactid == "clear"){
        contactid = "";
    } else if (!regex.test(contactid)) {
        return;
    }
	var date = new Date();
	date.setTime(date.getTime()+(10*365*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	var domstr = (dom=="")? "" : "; domain=" + dom;
	document.cookie = "14890NavisContactId="+contactid+expires+domstr+"; path=/";
	NavisCookieContactIdValue = contactid;
}

function ReadNavisContactIdCookie() {
	var c0 = NavisCookieContactIdValue;
	if (c0 != null) return c0;
	var c1 = ReadNavisTagCookie1("14890NavisContactId");
	return c1;
}

function GetNavisContactIdQueryString(){
    return GetNavisQueryString("ContactId");
}

function ProcessNavisContactId(dom){
	var c = GetNavisContactIdQueryString();
	if (c != null){
		CreateNavisContactIdCookie(c, dom);
	}
}


function SendNavisContactIdAttribute(attributename, attributevalue){
    SendNavisContactIdAttributeData("&AttributeName=" + encodeURIComponent(attributename) + "&AttributeValue=" + encodeURIComponent(attributevalue));
}

function SendNavisContactIdAttributeIncrement(attributename, incrementby){
    SendNavisContactIdAttributeIncrement2(attributename, incrementby, incrementby);
}

function SendNavisContactIdAttributeIncrement2(attributename, incrementby, initialvalue){
    SendNavisContactIdAttributeData("&AttributeName=" + encodeURIComponent(attributename) + "&InitialValue=" + encodeURIComponent(initialvalue) + "&IncrementBy=" + encodeURIComponent(incrementby));
}

function SendNavisContactIdAttributeData(params){
	var c = ReadNavisContactIdCookie();
    if (c == null || c == ""){
        return;
    }
	var navisPixel =new Image();
	var acct = "14890";
	var jspass = "obb19fmgijxtq14etm6z";
	navisPixel.src="https://www.thenavisway.com/CRM/Interface/ContactPixel.aspx?acct=" + acct + "&jspass=" + jspass + "&ContactID=" + c + params + "&n=" + GetNavisUniqueTimeValue();
}

function GetNavisUniqueTimeValue(){
    var d = new Date();
    var n = d.getTime();
    var ns = n + "";
    return ns;
}    