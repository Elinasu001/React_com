<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width"/>
<!-- 타이틀 수정필요하면 수정할 것-->
<title>전체 약관 일괄 동의</title>
<style>
.terms {
    border: 0;
    width: 100%;
}

hr {
  margin: 12px 0;
  border: 0;
  text-align: center;
  
  &:before {
    content: "\2022\20\2022\20\2022";
    font-size: 20px;
    color: #999999;
  }
}
</style>
<script>
function resizer(el)
{
    if(!el) return;
    var doc = el.contentWindow.document;
    var body_ = doc.body;
    var html_ = doc.documentElement;
	
	var perPageOffset = 0;	// 페이지별 구분이 쉽게 하기 위한 하단 여백 값

    //var height = Math.max( body_.scrollHeight, body_.offsetHeight, html_.clientHeight,     html_.scrollHeight, html_.offsetHeight );
	var height = html_.offsetHeight;
    //var width  = Math.max( body_.scrollWidth, body_.offsetWidth, html_.clientWidth, html_.scrollWidth, html_.offsetWidth );
	var width = html_.offsetWidth;

    el.height = height + perPageOffset;    
    el.width = width;
}

var delay = 300;
var timer = undefined;

window.addEventListener('resize', function() {
	clearTimeout(timer);
	timer = setTimeout(function() {
		var els = document.getElementsByClassName('terms');
		if(els && els.length > 0) {
			for(var i = 0; i < els.length; i++) {
				resizer(els[i]);
			}
		}
	}, delay);
});
</script>
<body>
<!-- 한번에 보여줄 것만 설정 할 것-->
<iframe class="terms" src="./serviceAgreement.jsp" title="서비스 이용동의 약관" onload="resizer(this)"></iframe>
<hr/>
<iframe class="terms" src="./privacyPolicy.jsp" title="개인정보 이용동의 약관" onload="resizer(this)"></iframe>
<hr/>
<iframe class="terms" src="./provideInfoAgreement.jsp" title="제3자 정보제공 동의 약관" onload="resizer(this)"></iframe>
<!--
<hr/>
<iframe class="terms" src="./piiAgreement.jsp" title="고유식별정보 처리동의 약관" onload="resizer(this)"></iframe>
-->
</body>
</html>