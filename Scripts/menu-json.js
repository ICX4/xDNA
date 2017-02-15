var menuJSON = [
   {
      "Text":"Home",
      "Link":"/Default.aspx",
      "ChildMenuItems":[

      ]
   },
   {
      "Text":"data:View",
      "Link":"/DataManagement.aspx",
      "ChildMenuItems":[
         {
            "Text":"Internal Data Management",
            "Link":"",
            "ChildMenuItems":[
               {
                  "Text":"Organisations",
                  "Link":"",
                  "ChildMenuItems":[
                     {
                        "Text":"By Source",
                        "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=1\u0026IsProduction=1\u0026initialview=Organisation\u0026initialcat=Organisations by Source\u0026initialSource=CIF Organisation",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"Matched",
                        "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=1\u0026IsProduction=1\u0026initialview=Organisation\u0026initialcat=Organisations Matched\u0026initialSource=CIF Organisation\u0026initialshow=CIF Org - Org MDM Match",
                        "ChildMenuItems":[

                        ]
                     }
                  ]
               },
               {
                  "Text":"People",
                  "Link":"",
                  "ChildMenuItems":[
                     {
                        "Text":"By Source",
                        "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=1\u0026IsProduction=1\u0026initialview=People\u0026initialcat=Number of People by Source\u0026initialSource=CIF Individuals",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"Matched",
                        "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=1\u0026IsProduction=1\u0026initialview=People\u0026initialcat=People Matched\u0026initialSource=CIF Individuals",
                        "ChildMenuItems":[

                        ]
                     }
                  ]
               }
            ]
         },
         {
            "Text":"External Data Management",
            "Link":"",
            "ChildMenuItems":[
               {
                  "Text":"Organisations by Source",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=Organisation",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Organisations Matched",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=Organisation\u0026initialcat=Organisations Matched",
                  "Icon":"",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Sanctioned Organisation Matches",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=Organisation\u0026initialcat=Sanctioned Matches",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Sanctioned Organisations",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=Organisation\u0026initialcat=Sanctioned Organisations",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Number of Instruments by Source",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=Instrument",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Instruments by Security Type",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=Instrument\u0026initialcat=Instruments by Security Type",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Instruments with Issuers",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=Instrument\u0026initialcat=Instruments with Issuers",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Number of People by Source",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=People",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"People Matched",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=People\u0026initialcat=People Matched\u0026initialshow=DNB Execs",
                  "Icon":"",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Sanctioned People Matches",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=People\u0026initialcat=Sanctioned Matches",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Sanctioned People",
                  "Link":"/Pages/Dashboards/DataQuality.aspx?isInternal=0\u0026initialview=People\u0026initialcat=Sanctioned People",
                  "ChildMenuItems":[

                  ]
               }
            ]
         },
         {
            "Text":"Dataflow Monitoring",
            "Link":"/Pages/Dashboards/DataflowMonitoring.aspx",
            "ChildMenuItems":[

            ]
         }
      ]
   },
   {
      "Text":"case:Flow",
      "Link":"",
      "ChildMenuItems":[
         {
            "Text":"Case Management Report",
            "Link":"/Compliance/Default.aspx",
            "ChildMenuItems":[
               {
                  "Text":"Unmatched Cases",
                  "Link":"",
                  "ChildMenuItems":[
                     {
                        "Text":"Case Processing by Source System and Type",
                        "Link":"/Compliance/SourceReport.aspx",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"User Processing Performance",
                        "Link":"/Compliance/UserRecordReport.aspx",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"User Processing Performance Average",
                        "Link":"/Compliance/Report/ProcessorPerformanceAverages.aspx?IsMatchCases=1",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"Supervisor Case Processing",
                        "Link":"/Compliance/SupervisorCaseReport.aspx",
                        "ChildMenuItems":[

                        ]
                     }
                  ]
               },
               {
                  "Text":"Attribute Cases",
                  "Link":"",
                  "ChildMenuItems":[
                     {
                        "Text":"Cases By Attribute",
                        "Link":"/Compliance/FieldReport.aspx",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"User Processing Performance",
                        "Link":"/Compliance/ProcessorAttributeReport.aspx",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"User Processing Performance Average",
                        "Link":"/Compliance/Report/ProcessorPerformanceAverages.aspx?IsMatchCases=0",
                        "ChildMenuItems":[

                        ]
                     },
                     {
                        "Text":"Supervisor Case Processing",
                        "Link":"/Compliance/SupervisorAttributeReport.aspx",
                        "ChildMenuItems":[

                        ]
                     }
                  ]
               }
            ]
         }
      ]
   },
   {
      "Text":"Alignment",
      "Link":"/Pages/Reports/Index.aspx",
      "ChildMenuItems":[
         {
            "Text":"All Fields",
            "Link":"/Pages/Reports/AllFields.aspx",
            "ChildMenuItems":[

            ]
         },
         {
            "Text":"Fields By Source",
            "Link":"/Pages/Reports/FieldsBySource.aspx",
            "ChildMenuItems":[

            ]
         },
         {
            "Text":"Fields Enrichment Report",
            "Link":"/Pages/Reports/FieldsBySourceReport.aspx",
            "ChildMenuItems":[

            ]
         }
      ]
   },
   {
      "Text":"admin:View",
      "Link":"/SystemAdmin.aspx",
      "ChildMenuItems":[
         {
            "Text":"Configure Caseflow",
            "Link":"/Compliance/Entities/Default.aspx",
            "ChildMenuItems":[
               {
                  "Text":"Configure Case Assignment",
                  "Link":"/RulesEngine/ManageRecords.aspx",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Configure Case Types",
                  "Link":"/Compliance/Entities/CaseTypes.aspx",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Configure Attribute Groups",
                  "Link":"/Compliance/Entities/AttributeGroups.aspx",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Configure Source Systems",
                  "Link":"/Compliance/Entities/SourceSystems.aspx",
                  "ChildMenuItems":[

                  ]
               },
               {
                  "Text":"Configure User Groups",
                  "Link":"/Compliance/Entities/UserGroups.aspx",
                  "ChildMenuItems":[

                  ]
               }
            ]
         },
         {
            "Text":"User Management",
            "Link":"/Admin/Membership/Default.aspx",
            "ChildMenuItems":[

            ]
         },
         {
            "Text":"About",
            "Link":"/Admin/About.aspx",
            "ChildMenuItems":[

            ]
         }
      ]
   },
   {
      "Text":"Support",
      "Link":"javascript:openWithoutReferrer();",
      "ChildMenuItems":[

      ]
   }
]
