	var GPAtable = document.getElementsByTagName("td");
	//alert(GPAtable.length);
	var count = Array(0,0);
	var CreditNeeds = Array(30,43);
	//专业必修
	var zhuanyebixiu = Array("00431140","04830600","00431120","04830840","04831010","04830630","04830650","04831040","04831050","04831030","04831090","04830640","04831080","04831060");
	var zybxCredit = Array(4,2,3,2,3,3,3,3,3,3,3,2,1,2);
	//专业选修之理论基础
	var zhuanyexianxuan = Array("04830620","04830850","00431166","00432108","04830870","00132380","04830670","04830890","04830910");
	var zyxxCredit = Array(3,3,2,3,3,3,3,3,3);
	var lljc = 0;
	//专业选修之计算机类
	var zhuanyerenxuan = Array("04830120","04830780","04830660","04830460");
	var zyrxCredit = Array(3,2,2,3);
	var jsjl = 0;
	//专业选修之专业类

	var xinjishu = Array("04831140","04830810","04832010","04830030","04830760","04830680","04832200","04832330","04831190","04831180","04831070","04831160");
	var xjsCredit = Array(3,2,3,3,3,2,3,2,3,2,3,3);
	var zyl = 0;
	//大类平台及学院课程
	var xueyuan = Array("00130201","00130202","00101460","00431141","00431143","00132301","00132302","00132321","00132323","00431110","00431155","00132304","04830010","04831770","04831870","04830041","04831750","04830050","04830530","04831760","04830540");
	var xueyuanCredit = Array(5,5,4,3,3,5,5,5,4,4,4,4,1,2,1,3,3,3,3,3,3);
	var xueyuanCount = 0;
	var xueyuanNeeds = 33;
	for(var i = 0; i < GPAtable.length; i++)
	{
		var j;
		for(j = 0; j < xueyuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == xueyuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				xueyuanCount += xueyuanCredit[j];
				break;
			}
		}
		if(j < xueyuan.length)
			continue;
		for(j = 0; j < zhuanyebixiu.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyebixiu[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[0] += zybxCredit[j];
				break;
			}
		}
		if(j < zhuanyebixiu.length)
			continue;
		for(j = 0; j < zhuanyexianxuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyexianxuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[1] += zyxxCredit[j];
				lljc++;
				break;
			}
		}
		if(j < zhuanyexianxuan.length)
			continue;
		for(j = 0; j < zhuanyerenxuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyerenxuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[1] += zyrxCredit[j];
				jsjl++;
				break;
			}
		}
		if(j < zhuanyerenxuan.length)
			continue;
		for(j = 0; j < xinjishu.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == xinjishu[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[1] += xjsCredit[j];
				zyl++;
				break;
			}
		}
		if(j < xinjishu.length)
			continue;
		//检测不在教学计划中的课程
		var xinke = new RegExp("^048");
		var kechenghao = new RegExp("[0-9]{8}");
		//alert("test");
		if(xinke.test(GPAtable[i].firstChild.nodeValue) && kechenghao.test(GPAtable[i].firstChild.nodeValue))
		{
			//是信科的课程
			if(GPAtable[i+1].firstChild.nodeValue >= 60 || GPAtable[i+1].firstChild.nodeValue == "合格")
			{
				count[1] += Number(GPAtable[i+4].firstChild.nodeValue);
			}
		}
	
	}
	var result = "";
	var start = false;
	if(xueyuanCount >= xueyuanNeeds)
	{
		count[1] += xueyuanCount - xueyuanNeeds;
	}
	else
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "学院课程 " + (xueyuanNeeds-xueyuanCount) + " 学分";
		start = true;
	}
	if(count[0] >= CreditNeeds[0])
	{
		count[1] += count[0] - CreditNeeds[0];
	}
	else
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "专业必修 " + (CreditNeeds[0]-count[0]) + " 学分";
		start = true;
	}
	if(count[1] < CreditNeeds[1])
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "选修课程 " + (CreditNeeds[1]-count[1]) + " 学分";
		start = true;
	}
	if(lljc < 3)
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "理论基础选修 " + (3-lljc) + " 门";
		start = true;
	}
	if(jsjl < 1)
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "计算机类选修 " + (1-jsjl) + " 门";
		start = true;
	}
	if(zyl < 3)
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "专业类选修 " + (3-zyl) + " 门";
		start = true;
	}
	if(start == false)
	{
		result += "恭喜您的专业课已经达到毕业需求！"
	}
	alert(result);
