import activity from "./activity";
import accountsInfo from "./accountsInfo";
import advertiseBot from "./advertiseBot";
import bannedList from "./bannedList";
import businessReport from "./businessReport";

import club from "./club";
import clubTable from "./clubTable";
import clubUser from "./clubUser";
import common from "./common";
import configGroupList from "./configGroupList";
import emoji from "./emoji";
import gameRecord from "./gameRecord";
import globalConfiguration from "./globalConfiguration";
import halltable from "./halltable";
import home from "./home";
import imageText from "./imageText";
import netEase from "./netEase";
import paiJuWinLoseRecord from "./paiJuWinLoseRecord";
import propertyRecords from "./propertyRecords";
import switchSuit from "./switchSuit";
import userStatic from "./userStatic";

import api from "./backModule/api";
import authority from "./backModule/authority";
import dict from "./backModule/dict";
import loginLog from "./backModule/loginLog";
import menu from "./backModule/menu";
import operation from "./backModule/operation";
import user from "./backModule/user";
import whiteList from "./backModule/whiteList";


import insuranceRecord from "./transferManagement/insuranceRecord";
import inTransferRecord from "./transferManagement/inTransferRecord";
import otherTotals from "./transferManagement/otherTotals";
import pumpingRecord from "./transferManagement/pumpingRecord";
import transferPayList from "./transferManagement/transferPayList";
import transferWithdrawList from "./transferManagement/transferWithdrawList";


export default {
  ...activity,
  ...accountsInfo,
  ...advertiseBot,
  ...bannedList,
  ...businessReport,
  ...club,
  ...clubTable,
  ...clubUser,
  ...common,
  ...configGroupList,
  ...emoji,
  ...gameRecord,
  ...globalConfiguration,
  ...halltable,
  ...home,
  ...imageText,
  ...netEase,
  ...paiJuWinLoseRecord,
  ...propertyRecords,
  ...switchSuit,
  ...userStatic,
  ...api,
  ...authority,
  ...dict,
  ...loginLog,
  ...menu,
  ...operation,
  ...user,
  ...whiteList,
  ...insuranceRecord,
  ...inTransferRecord,
  ...otherTotals,
  ...pumpingRecord,
  ...transferPayList,
  ...transferWithdrawList,
}