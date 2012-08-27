var getmajor = document.getElementsByTagName("b");
stu_id = getmajor[1].firstChild.nodeValue;
	var GPAtable = document.getElementsByTagName("td");
	//alert(GPAtable.length);
	var count = Array(0,0,0);//大类平台、专业必修、专业选修
	var CreditNeeds = Array(18,49.5,29.5);
	//大类平台必修
	var daleipingtai = Array("00130201","00130202","00431141","00431143","00431215");
	var dlptCredit = Array(5,5,3,3,2);
	//大类平台选修
	var daleipingtaixuan = Array("00431142","00431144","00131460");
	var dlptxCredit = Array(2,2,4);
	//公共专业必修
	var zhuanyebixiu = Array("01034390","01034310","01034321","01030200","01031100","01034350","01034360","01034371","01034373","01035002","01035002","01030120","01035140","01030120","01034460","01032860","01034400","01034930","01035020","01034450","01034480","01035040");
	//本专业必修
	var zybx2 = Array("01034490");
	if(stu_id.indexOf("10000")>-1)
	{
		CreditNeeds[1]--;CreditNeeds[2]++;
	}
	if(stu_id.indexOf("11000")>-1)
	{
		CreditNeeds[1]++;CreditNeeds[2]--;
	}
	for(var i = 0; i < GPAtable.length; i++)
	{
		var j;
		for(j = 0; j < daleipingtai.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == daleipingtai[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[0] += dlptCredit[j];
				break;
			}
		}
		if(j < daleipingtai.length)
			continue;
		for(j = 0; j < zhuanyebixiu.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyebixiu[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[1] += Number(GPAtable[i+4].firstChild.nodeValue);
				break;
			}
		}
		if(j < zhuanyebixiu.length)
			continue;
		for(j = 0; j < zybx2.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zybx2[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[1] += Number(GPAtable[i+4].firstChild.nodeValue);
				break;
			}
		}
		if(j < zybx2.length)
			continue;
		for(j = 0; j < daleipingtaixuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == daleipingtaixuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[2] += dlptxCredit[j];
				break;
			}
		}
		if(j < daleipingtaixuan.length)
			continue;
		//检测不在教学计划中的课程
		var xinke = new RegExp("^010");
		var kechenghao = new RegExp("[0-9]{8}");
		//alert("test");
		if(xinke.test(GPAtable[i].firstChild.nodeValue) && kechenghao.test(GPAtable[i].firstChild.nodeValue))
		{
			//是化院的课程
			if(GPAtable[i+1].firstChild.nodeValue >= 60 || GPAtable[i+1].firstChild.nodeValue == "合格")
			{
				count[2] += Number(GPAtable[i+4].firstChild.nodeValue);
			}
		}
	}
	var result = "";
	var start = false;
	if(count[0] >= CreditNeeds[0])
	{
		count[0] = CreditNeeds[0];
	}
	else
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "大类平台必修 " + (CreditNeeds[0]-count[0]) + " 学分";
		start = true;
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
		result += "专业必修 " + (CreditNeeds[1]-count[1]) + " 学分";
		start = true;
	}
	if(count[2] < CreditNeeds[2])
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "专业选修 " + (CreditNeeds[2]-count[2]) + " 学分";
		start = true;
	}
	if(start == false)
	{
		result += "恭喜您的专业课已经达到毕业需求！"
	}
	alert(result);
