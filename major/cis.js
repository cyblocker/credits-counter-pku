	var GPAtable = document.getElementsByTagName("td");
	//alert(GPAtable.length);
	var count = Array(0,0,0,0);
	var CreditNeeds = Array(29,15,20,9);
	//专业必修
	var zhuanyebixiu = Array("04830281","04830070","00131480","04830080","04830090","04830100","04830120","04830670","04831320","04830250");
	var zybxCredit = Array(3,3,3,3,3,3,3,3,2,3);
	//专业限选
	var zhuanyexianxuan = Array("04831210","00130280","04830110","04830130","04830170","04831361","04812250","04831220","04831290","04831400","04831300","04831230","04830230","04830220","04831670","04831370","04831730","04830270");
	var zyxxCredit = Array(2,3,2,2,2,2,2,1,3,2,3,2,3,3,3,2,3,2);
	//专业任选
	var zhuanyerenxuan = Array("04831780");
	var zyrxCredit = Array(3);
	//新技术任选

	var xinjishu = Array("04831950","04830840","04831200","04831710","04830030","04830340","04832220","04831280");
	var xjsCredit = Array(2,2,2,3,2,2,2,2);
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
	if(count[1] >= CreditNeeds[1])
	{
		count[2] += count[1] - CreditNeeds[1];
	}
	else
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "专业限选 " + (CreditNeeds[1]-count[1]) + " 学分";
		start = true;
	}
	if(count[2] >= CreditNeeds[2])
	{
		count[3] += count[2] - CreditNeeds[2];
	}
	else
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "核心任选 " + (CreditNeeds[2]-count[2]) + " 学分";
		start = true;
	}
	if(count[3] < CreditNeeds[3])
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "新技术任选 " + (CreditNeeds[3]-count[3]) + " 学分";
		start = true;
	}
	if(start == false)
	{
		result += "恭喜您的专业课已经达到毕业需求！"
	}
	alert(result);
