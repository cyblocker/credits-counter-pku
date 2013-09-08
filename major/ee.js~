//必修30、限选13、核心课程8、组合课程外学院1门3分、本专业任选8分，全体专业选修课总不低于43
	var GPAtable = document.getElementsByTagName("td");
	//alert(GPAtable.length);
	var count = Array(0,0,0,0,0);
	var CreditNeeds = Array(30,13,8,10);
	//专业必修
	var zhuanyebixiu = Array("00432110","00132380","04830600","04830840","00431166","04830610","04830890","00431140","00431120","04832030","04830890","04830620","04830630","04830640","04830650","04830660");
	var zybxCredit = Array(4,3,2,2,2,3,3,4,3,4,4,3,3,2,3,2);
	//专业限选
	var zhuanyexianxuan = Array("04830850","04830860","04830870","04830670","04830480","04830780","04830730","04830680");
	var zyxxCredit = Array(3,3,3,3,3,2,3,2);
	//核心课程
	var zhuanyerenxuan = Array("04830910","04830800","04830760","04830720","04830970","04830830","04830680");
	var zyrxCredit = Array(3,3,3,3,3,2,2);
	//专业任选

	var xinjishu = Array("04831860","04830800","04830750","04830470","04831520","04830810","04830970","04830710","00433328","04831020","04830790","04830930","04830740","04831970","04831680","04830910","04832270","04832271");
	var xjsCredit = Array(2,3,2,3,2,2,3,2,3,3,2,3,2,2,2,3,1,3);
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
				break;
			}
		}
		if(j < zhuanyexianxuan.length)
			continue;
		for(j = 0; j < zhuanyerenxuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyerenxuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[2] += zyrxCredit[j];
				break;
			}
		}
		if(j < zhuanyerenxuan.length)
			continue;
		for(j = 0; j < xinjishu.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == xinjishu[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[3] += xjsCredit[j];
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
			if(GPAtable[i].firstChild.nodeValue != "04831840" && (GPAtable[i+1].firstChild.nodeValue >= 60 || GPAtable[i+1].firstChild.nodeValue == "合格"))
			{
				count[3] += Number(GPAtable[i+4].firstChild.nodeValue);
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
		count[0] = CreditNeeds[0];
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
	var start2 = true;
	if(count[1]+count[2] + count[3]  < 41)
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "专业选修课共 " + (41-count[2]-count[1]-count[3]-count[4]) + " 学分\n            (包括专业限选、核心课程及专业任选)";
		start = true;
		start2 = false;
	}
	if(count[1] >= CreditNeeds[1])
	{
		count[2] += count[1] - CreditNeeds[1];
		count[1] = CreditNeeds[1];
	}
	else
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		if(start2 == false)
			{result += "其中：";start2=true;}
		result += "专业限选 " + (CreditNeeds[1]-count[1]) + " 学分";
		start = true;
	}
	if(count[2] >= CreditNeeds[2])
	{
		count[3] += count[2] - CreditNeeds[2];
		count[2] = CreditNeeds[2];
	}
	else
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		if(start2 == false)
			{result += "其中：";start2=true;}
		else result += "               "
		result += "核心课程 " + (CreditNeeds[2]-count[2]) + " 学分";
		start = true;
	}
	if(count[3] < CreditNeeds[3])
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		if(start2 == false)
			{result += "其中：";start2=true;}
		else result += "               "
		result += "专业任选 " + (CreditNeeds[3]-count[3]) + " 学分";
		start = true;
	}
	if(start == false)
	{
		result += "恭喜您的专业课已经达到毕业需求！"
	}
	alert(result);
