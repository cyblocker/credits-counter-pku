	var GPAtable = document.getElementsByTagName("td");
	//alert(GPAtable.length);
	var count = Array(0,0,0);
	var CreditNeeds = Array(30,11,20);
	//专业必修
	var zhuanyebixiu = Array("04830281","04830070","00131480","04830080","04830090","04830100","04830120","04830140","04830150","04830161");
	//专业限选
	var zhuanyexianxuan = Array("04830110","04830130","04830141","04830170","04830180","04830190","04830240","04830241","04832250");
	//专业任选
	var zhuanyerenxuan = Array("04831780","00130280","04830260","04831210","04831200","04831730","04830670"  ,"04830270","04830220","04830200","04830230","04830290","04830320","04830310","04830410","04830210","04831800", "04830350","04830340","04830330","04830300","04830510","04830030","04830560","04830550","04831780","04831890","04831880","04832191","04832230","04830211","04831950","04832270","04832271","04832160","04832193","04830221");

	//大类平台及学院课程
	var xueyuan = Array("00130201","00130202","00101460","00431141","00431143","00132301","00132302","00132321","00132323","00431110","00431155","00132304","04830010","04831770","04831870","04830041","04831750","04830050","04830530","04831760","04830540","04832192","04832350","04832160");
	var xueyuanCount = 0;
	var xueyuanNeeds = 33;
	for(var i = 0; i < GPAtable.length; i++)
	{
		var j;
		for(j = 0; j < xueyuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == xueyuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				xueyuanCount += Number(GPAtable[i+4].firstChild.nodeValue);
				break;
			}
		}
		if(j < xueyuan.length)
			continue;
		for(j = 0; j < zhuanyebixiu.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyebixiu[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[0] += Number(GPAtable[i+4].firstChild.nodeValue);
				break;
			}
		}
		if(j < zhuanyebixiu.length)
			continue;
		for(j = 0; j < zhuanyexianxuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyexianxuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[1] += Number(GPAtable[i+4].firstChild.nodeValue);
				//alert("限选"+GPAtable[i+3].firstChild.nodeValue + Number(GPAtable[i+4].firstChild.nodeValue));
				break;
			}
		}
		if(j < zhuanyexianxuan.length)
			continue;
		for(j = 0; j < zhuanyerenxuan.length ; j++)
		{
			if(GPAtable[i].firstChild.nodeValue == zhuanyerenxuan[j] && GPAtable[i+1].firstChild.nodeValue >= 60)
			{
				count[2] += Number(GPAtable[i+4].firstChild.nodeValue);
				//alert("任选"+GPAtable[i+3].firstChild.nodeValue + Number(GPAtable[i+4].firstChild.nodeValue));
				break;
			}
		}
		if(j < zhuanyerenxuan.length)
			continue;
	
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
	if(count[2] < CreditNeeds[2])
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "核心任选 " + (CreditNeeds[2]-count[2]) + " 学分";
		start = true;
	}
	if(count[2]+count[1] < 43)
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "限选或任选 " + (43-count[2]-count[1]) + " 学分\n            （包括专业限选和核心任选）";
		start = true;
	}
	if(start == false)
	{
		result += "恭喜您的专业课已经达到毕业需求！"
	}
	alert(result);
