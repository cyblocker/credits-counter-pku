var getmajor = document.getElementsByTagName("b");
//alert(getmajor[4].firstChild.nodeValue);
major = getmajor[4].firstChild.nodeValue;
stu_id = getmajor[1].firstChild.nodeValue;
//alert(stu_id);
/**************************/
/*                        */
/*         智能系         */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Intelligence") > -1)
{
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
}
/**************************/
/*                        */
/*         计算机         */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Computer") > -1)
{
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
}
/**************************/
/*                        */
/*         电子系         */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Electronic") > -1)
{
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
		result += "核心课程 " + (CreditNeeds[2]-count[2]) + " 学分";
		start = true;
	}
	if(count[3] < CreditNeeds[3])
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "专业任选 " + (CreditNeeds[3]-count[3]) + " 学分";
		start = true;
	}
	if(count[1]+count[2] + count[3]  < 41)
	{
		if(start == true)
			result += "\n            "
		else
			result += "您仍需选修：\n            "
		result += "专业选修课共 " + (41-count[2]-count[1]-count[3]-count[4]) + " 学分\n            (包括专业限选、核心课程及专业任选)";
		start = true;
	}
	if(start == false)
	{
		result += "恭喜您的专业课已经达到毕业需求！"
	}
	alert(result);
}

/**************************/
/*                        */
/*         微电子         */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Microelectronics") > -1)
{
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
}
/**************************/
/*                        */
/*         化学专业       */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Chemistry") > -1 && major.indexOf("Material") <= -1 && major.indexOf("Applied") <= -1 && major.indexOf("Biology") <= -1 )
{
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
	var zybx2 = Array("01034500");
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
}
/**************************/
/*                        */
/*        材料化学        */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Chemistry") > -1 && major.indexOf("Material") > -1)
{
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
}
/**************************/
/*                        */
/*        应用化学        */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Chemistry") > -1 && major.indexOf("Applied") > -1)
{
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
	var zybx2 = Array("01034660","01034990");
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
}
/**************************/
/*                        */
/*        生物化学        */
/*                        */
/*                        */
/**************************/
if(major.indexOf("Chemistry") > -1 && major.indexOf("Biology") > -1)
{
	var GPAtable = document.getElementsByTagName("td");
	//alert(GPAtable.length);
	var count = Array(0,0,0);//大类平台、专业必修、专业选修
	var CreditNeeds = Array(18,65.5,13.5);
	//大类平台必修
	var daleipingtai = Array("00130201","00130202","00431141","00431143","00431215");
	var dlptCredit = Array(5,5,3,3,2);
	//大类平台选修
	var daleipingtaixuan = Array("00431142","00431144","00131460");
	var dlptxCredit = Array(2,2,4);
	//公共专业必修
	var zhuanyebixiu = Array("01034390","01034310","01034321","01030200","01031100","01034350","01034360","01034371","01034373","01035002","01035002","01030120","01035140","01030120","01034460","01032860","01034400","01034930","01035020","01034450","01034480","01035040");
	//本专业必修
	var zybx2 = Array("01034500","01139380","01130200","01130210","01130150","01130160","01130030","01139360","01139580","01131170");
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
}
if(major.indexOf("Intelligence") <= -1 && major.indexOf("Computer") <= -1 && major.indexOf("Electronics") <= -1 && major.indexOf("Microelectronics") <= -1 && major.indexOf("Chemistry") <= -1)
{
	alert("暂不支持您所在的专业");
}
