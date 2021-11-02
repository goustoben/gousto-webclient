!(function (e) {
  console.log(`
  #TESTING# Optimizely stubbed with local file.
  `)
  function t(i) {
    if (n[i]) return n[i].exports;
    var r = (n[i] = { exports: {}, id: i, loaded: !1 });
    return e[i].call(r.exports, r, r.exports, t), (r.loaded = !0), r.exports;
  }
  var n = {};
  return (t.m = e), (t.c = n), (t.p = ""), t(0);
})([
  function (e, t, n) {
    function i() {
      function e(e) {
        var t = n(149),
          i = [t];
        i.push(n(151)),
          i.push(n(157)),
          i.push(n(160)),
          i.push(n(163)),
          i.push(n(165)),
          i.push(n(175)),
          i.push(n(178)),
          i.push(n(181)),
          i.push(n(184)),
          i.push(n(188)),
          i.push(n(191)),
          i.push(n(195)),
          i.push(n(199)),
          i.push(n(204)),
          i.push(n(205)),
          i.push(n(208)),
          i.push(n(209)),
          i.push(n(212)),
          i.push(n(213)),
          i.push(n(217)),
          i.push(n(222)),
          i.push(n(224)),
          i.push(n(225)),
          h.initialize({ clientData: e, plugins: i });
      }
      function t(e, t, n) {
        return "/dist/preview_data.js?token=__TOKEN__&preview_layer_ids=__PREVIEW_LAYER_IDS__"
          .replace("__TOKEN__", e)
          .replace("__PROJECT_ID__", t)
          .replace("__PREVIEW_LAYER_IDS__", n.join(","))
          .replace("__GET_ONLY_PREVIEW_LAYERS__", !0);
      }
      window.performance &&
        window.performance.mark &&
        window.performance.mark("optimizely:blockBegin");
      var i = n(1);
      i.initialize();
      var r = n(83),
        a = n(23),
        o = n(16);
      n(129);
      var s = o.get("stores/directive"),
        u = n(91);
      if (!u.isCORSSupported())
        throw new Error("CORS is not supported on this browser, aborting.");
      var c,
        l = n(132),
        d = n(118),
        f = n(133),
        p = {
          layers: [
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["11504150687"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "11500401013", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "Haricots - GetHelp",
                  bucketingStrategy: null,
                  variations: [
                    {
                      id: "11500401013",
                      actions: [{ viewId: "11504150687", changes: [] }],
                      name: "Original",
                    },
                    {
                      id: "11481060711",
                      actions: [
                        {
                          viewId: "11504150687",
                          changes: [
                            {
                              src:
                                "/actions/01ea92ed2258d25406695c4c9da993147489d4fde7c89c38caf72675494e8caa.js",
                              dependencies: [],
                              id: "5DFE1038-9A2D-4FC8-89A3-A7E0E427C613",
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "11504330542",
                  integrationSettings: null,
                },
              ],
              id: "11469921248",
              weightDistributions: null,
              name: "Haricots - GetHelp",
              groupId: null,
              commitId: "11502331193",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["16655170243"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "16637220504", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Rockets] Pause OSR test",
                  bucketingStrategy: null,
                  variations: [
                    { id: "16626760044", actions: [], name: "Original" },
                    {
                      id: "16637220504",
                      actions: [
                        {
                          viewId: "16655170243",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "741424DF-67BE-4031-842B-B930D068EF91",
                              value: function ($) {
                                document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                    if (window.__loadFeatures__) {
                                      window.__loadFeatures__({
                                        features: {
                                          subscriptionPauseOsr: true,
                                          enableOsrOffer: true,
                                        },
                                      });
                                    } else {
                                      console.log(
                                        "Window loadFeatures is not defined"
                                      );
                                    }
                                  }
                                );
                              },
                            },
                            {
                              selector: ".G335c25",
                              dependencies: [],
                              attributes: {
                                html:
                                  "You have <strong>30%</strong> off all your orders, but only until the <strong>25th of October. If you pause you\u2019ll miss out on your discount </strong>",
                              },
                              type: "attribute",
                              id: "C5B6A060-52FB-474D-97E7-D23ED73F4D2F",
                              css: {},
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "16641220824",
                  integrationSettings: null,
                },
              ],
              id: "16639730160",
              weightDistributions: null,
              name: "[Rockets] Pause OSR test",
              groupId: null,
              commitId: "20146182698",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["15822900317"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "16884170066", endOfRange: 5000 },
                    { entityId: "16872181056", endOfRange: 10000 },
                  ],
                  audienceName: "[CONV]QA mode",
                  name:
                    "[CONV] [QA] GOU 017 'Goes well with...' on recipe details ",
                  bucketingStrategy: null,
                  variations: [
                    {
                      id: "16884170066",
                      actions: [{ viewId: "15822900317", changes: [] }],
                      name: "Original",
                    },
                    {
                      id: "16872181056",
                      actions: [
                        {
                          viewId: "15822900317",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "332C4B25-FC7E-499C-ABAD-DD817619D5CB",
                              value: function ($) {
                                var utils = window["optimizely"].get("utils");

                                window.springBoard.upsellProducts = window
                                  .springBoard.upsellProducts || [
                                  // price in pence to avoid float issues
                                  {
                                    name:
                                      "Pots & Co - Little Pot of Salted Caramel",
                                    cssClass: "pots-caramel",
                                    price: 110,
                                    id: "df19edba-beb3-11e5-ab47-02fada0dd3b9",
                                    sku: "AP-1FCD-DES-02-P",
                                    info:
                                      "<p>When you add a touch of salt to caramel, something delicious and slightly dangerous happens. We’re championing that danger in the name of these gluten free pots of pure chocolate with salted caramel JOY.</p><p><strong>Allergen:</strong> soya, milk, egg</p>",
                                    amount: 0,
                                    category: "dessert",
                                    maxAmount: 4,
                                  },
                                  {
                                    //
                                    name: "Mastri Vernacoli Pinot Grigio 375ml",
                                    cssClass: "mastri-pinot",
                                    price: 599,
                                    id: "AP-ACH-WIN-WHI-40-P",
                                    sku: "AP-ACH-WIN-WHI-40-P",
                                    info:
                                      "<p>Perfect portion for two this half bottle needs to be paired with delicate and subtle flavours. The mountainous Trentino region is renowned for the high quality of fresh, delicate Pinot Grigio. This is a great example with ripe stone fruit characters balanced by zesty acidity. 12.5% ABV</p><p><strong>Allergen:</strong> sulphites</p>",
                                    amount: 0,
                                    category: "wine",
                                    maxAmount: 2,
                                  },
                                  {
                                    name:
                                      "Greyrock Sauvignon Blanc, Marlborough (750ml bottle)",
                                    cssClass: "greyrock-sauvignon",
                                    price: 999,
                                    id: "6be801a4-ad68-11e9-8046-028ecab2f72c",
                                    sku: "AP-ACH-WIN-WHI-44-P",
                                    info:
                                      "<p>A truly fruity Sauvignon Blanc, the gooseberry, passionfruit, and intense tropical fruit flavours are brightened with lime yet mellowed with sweet grassy notes. Perfect when paired with seafood or alone as an aperitif. 12.5% ABV</p><p><strong>Allergen:</strong> sulphites </p>",
                                    amount: 0,
                                    category: "wine",
                                    maxAmount: 2,
                                  },
                                  {
                                    name:
                                      "Gu white Chocolate & Raspberry Pot (50g)",
                                    cssClass: "gu-white-chocolate",
                                    price: 599,
                                    id: "AP-1FCD-DES-08-P",
                                    sku: "AP-1FCD-DES-08-P",
                                    info:
                                      "<p></p><p><strong>Allergen:</strong> </p>",
                                    amount: 0,
                                    category: "dessert",
                                    maxAmount: 2,
                                  },
                                  {
                                    name:
                                      "Brisa de Verano Garnacha Tinta (750ml bottle)",
                                    cssClass: "brisa-de-verano",
                                    price: 899,
                                    id: "1d8dc0c6-ad67-11e9-bcec-0240d7e60952",
                                    sku: "AP-ACH-WIN-RED-50-P",
                                    info:
                                      "<p>If you're insisting that white wine is your summer staple, you can't have tried the Brisa de Verano - or \"summer breeze.\" A glass of this glorious Garnacha that bursts with berry flavour will have you sipping rouge all summer long. 14.5% ABV</p><p><strong>Allergen:</strong> sulphites, eggs</p>",
                                    amount: 0,
                                    category: "wine",
                                    maxAmount: 2,
                                  },
                                  {
                                    //
                                    name:
                                      "Montevista Sauvignon Blanc (750ml bottle)",
                                    cssClass: "montevista-sauvignon",
                                    price: 899,
                                    id: "AP-ACH-WIN-WHI-43-P",
                                    sku: "AP-ACH-WIN-WHI-43-P",
                                    info:
                                      "<p>From the cooler climes of the Maule Valley comes this Chilean Sauvignon Blanc, with a fresh and lively nose of leafy nettle that diffuses into crisp apple, lemon, and lime notes. Perfect as an aperitif, or as a zingy partner to green salads and shellfish. 13% ABV</p><p><strong>Allergen:</strong> sulphites</p>",
                                    amount: 0,
                                    category: "wine",
                                    maxAmount: 2,
                                  },
                                  {
                                    name: "Gu Zesty Lemon Pot (50g)",
                                    cssClass: "gu-zesty-lemon",
                                    price: 100,
                                    id: "8ef1d22a-e42c-11e8-b730-02dbf738d01a",
                                    sku: "AP-1FCD-DES-05-P",
                                    info:
                                      "<p>This little pot from Gu Puds provides the perfect after dinner treat for a sweet but sharp finish to satisfy that pudding craving.</p><p><strong>Allergen:</strong> milk, egg</p>",
                                    amount: 0,
                                    category: "dessert",
                                    maxAmount: 2,
                                  },
                                  {
                                    name: "Sanvigilio Merlot (375 bottle)",
                                    cssClass: "sanvigilio-merlot",
                                    price: 649,
                                    id: "df0ec8ca-ad68-11e9-844b-0240d7e60952",
                                    sku: "AP-ACH-WIN-RED-53-P",
                                    info:
                                      "<p>Ripe, plummy, with just a hint of spice, this medium bodied Italian Merlot perfectly balances soft juicy berries with fresh acid and light herbal notes. Ideal to pair with your Italian favourites, including meat antipasti, pizza, or pasta. 12.5% ABV</p><p><strong>Allergen:</strong> sulphites</p>",
                                    amount: 0,
                                    category: "wine",
                                    maxAmount: 2,
                                  },
                                  {
                                    name: "La Crocera Barbera",
                                    cssClass: "crocera-barbera",
                                    price: 999,
                                    id: "a593ea2a-ecdf-11e8-80ca-0626df2cfe00",
                                    sku: "AP-ACH-WIN-RED-46-P",
                                    info:
                                      "<p>Crocera is a perfect fresh juicy red but also over-delivers on everything else. Classic barrique-aged Barbera from 6 hectares of vines on the Il Cascinone estate. Plus more awards than we can list. Barbera, one of my favourite grapes. 14.5% ABV</p><p><strong>Allergen:</strong> sulphites</p>",
                                    amount: 0,
                                    category: "wine",
                                    maxAmount: 2,
                                  },
                                  {
                                    name:
                                      "Gu Salted Caramel Chocolate Ganache Pot (50g)",
                                    cssClass: "gu-chocolate-ganache",
                                    price: 599,
                                    id: "AP-1FCD-DES-07-P",
                                    sku: "AP-1FCD-DES-07-P",
                                    info:
                                      "<p></p><p><strong>Allergen:</strong> </p>",
                                    amount: 0,
                                    category: "dessert",
                                    maxAmount: 2,
                                  },
                                  {
                                    name: "Pots & Co - Little Pot of Chocolate",
                                    cssClass: "pot-of-chocolate",
                                    price: 110,
                                    id: "df0ddd72-beb3-11e5-8432-02fada0dd3b9",
                                    sku: "AP-1FCD-DES-01-P",
                                    info:
                                      "<p>The perfect midweek gluten free treat! This little pot of luxurious chocolate ganache is crafted with the finest 70% Belgian chocolate.</p><p><strong>Allergen:</strong> milk, soya</p>",
                                    amount: 0,
                                    category: "dessert",
                                    maxAmount: 4,
                                  },
                                  {
                                    name: "Superbake Joy Makers Brownie Mix",
                                    cssClass: "superbake-brownies",
                                    price: 599,
                                    id: "fe5e61fa-3378-11e9-b043-06e2ed19d23a",
                                    sku: "AP-FCD-SHB-29",
                                    info:
                                      "<p>Get your bake on with these brownies made with natural organic ingredients and maca powder. Vegan, gluten-free and dairy free. One pack makes 12 - 15 brownies.</p>",
                                    amount: 0,
                                    category: "dessert",
                                    maxAmount: 2,
                                  },
                                ];

                                var upsellCategories = {
                                  wine: {
                                    maxAmount: 2,
                                  },
                                  beer: {
                                    maxAmount: 5,
                                  },
                                  spirits: {
                                    maxAmount: 4,
                                  },
                                  dessert: {
                                    maxAmount: 4,
                                  },
                                  kitchenware: {
                                    maxAmount: 6,
                                  },
                                  snacks: {
                                    maxAmount: 10,
                                  },
                                  "food-cupboard": {
                                    maxAmount: 4,
                                  },
                                  "mini-alcohol": {
                                    maxAmount: 5,
                                  },
                                };

                                var proteinUpsell = {
                                  "Chicken Thigh": [2, 0],
                                  "Chicken Breast": [2, 0],
                                  Turkey: [2, 0],
                                  Pork: [4, 0],
                                  "Sausage Pork": [4, 0],
                                  "Processed Meat": [4, 0],
                                  Fish: [5, 10],
                                  Lamb: [7, 11],
                                  Beef: [8, 11],
                                  Duck: [8, 10],
                                  Vegetarian: [8, 11],
                                  Vegan: [8, 11],
                                  Other: [10, 1],
                                  "": [],
                                };

                                var protein = "";

                                if (
                                  typeof window.springBoard.urlParams
                                    .recipeDetailId !== "undefined"
                                ) {
                                  addUpsellItems(
                                    window.springBoard.urlParams.recipeDetailId
                                  );
                                }

                                var checkDataLayer = setInterval(function () {
                                  if (
                                    typeof window.dataLayer.push !==
                                      "undefined" &&
                                    typeof window.__store__ !== "undefined" &&
                                    typeof window.__store__.getState() !==
                                      "undefined"
                                  ) {
                                    clearInterval(checkDataLayer);

                                    // Intercept dataLayer route/history events
                                    var getPushData = window.dataLayer.push;
                                    window.dataLayer.push = function (data) {
                                      getPushData.apply(this, arguments);

                                      if (
                                        typeof data.event !== "undefined" &&
                                        data.event === "userAction" &&
                                        typeof data.actionType !==
                                          "undefined" &&
                                        typeof data.actionValue !== "undefined"
                                      ) {
                                        var actionValue = JSON.parse(
                                          data.actionValue
                                        );

                                        if (
                                          data.actionType ===
                                          "MENU_RECIPE_DETAIL_VISIBILITY_CHANGE"
                                        ) {
                                          if (actionValue.show) {
                                            addUpsellItems(
                                              actionValue.recipeId
                                            );
                                          }
                                        } else if (
                                          data.actionType ===
                                          "BOXSUMMARY_VISIBILITY_CHANGE"
                                        ) {
                                          if (actionValue.show) {
                                            addItemsToBasketSummary(
                                              actionValue.view
                                            );
                                          }
                                        } else if (
                                          data.actionType === "Recipe Removed"
                                        ) {
                                          if (
                                            typeof actionValue.view !==
                                              "undefined" &&
                                            actionValue.view ===
                                              "boxSummaryMinus"
                                          ) {
                                            addUpsellPrice();
                                            addUpsellRow();
                                          }
                                        } else if (
                                          data.actionType ===
                                          "BASKET_SLOT_CHANGE"
                                        ) {
                                          resetProductAmounts();
                                        }
                                      }
                                    };
                                  }
                                }, 50);

                                function addUpsellItems(recipeId) {
                                  protein =
                                    window.__store__.getState().recipes.toJS()[
                                      recipeId
                                    ].protein === ""
                                      ? "Other"
                                      : window.__store__
                                          .getState()
                                          .recipes.toJS()[recipeId].protein;

                                  utils
                                    .waitForElement(
                                      ".__goustoOverlayContainer__ > div > div > div > div > div > div > div:nth-child(3)"
                                    )
                                    .then(function (element) {
                                      var addedUpsells = false;
                                      for (
                                        var i = 0;
                                        i <
                                        window.springBoard.upsellProducts
                                          .length;
                                        i++
                                      ) {
                                        if (
                                          window.springBoard.upsellProducts[i]
                                            .amount > 0
                                        ) {
                                          addedUpsells = true;
                                        }
                                      }

                                      if (
                                        !document.querySelector(
                                          ".cv-017-container"
                                        ) &&
                                        protein !== "" &&
                                        !addedUpsells &&
                                        window.__store__
                                          .getState()
                                          .basket.toJS().slotId !== ""
                                      ) {
                                        var upsellHtml =
                                          '<div class="cv-017-container"><h3>Goes well with</h3><div class="extras-list-container">' +
                                          '<div class="extra ' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][0]
                                          ].cssClass +
                                          '" data-product="' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][0]
                                          ].cssClass +
                                          '" data-protein="' +
                                          protein +
                                          '"> <a href="javascript:;" class="info-icon">&nbsp;</a><div class="extra-image">&nbsp;</div><h3>' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][0]
                                          ].name +
                                          '</h3><div class="price">&pound;' +
                                          (
                                            window.springBoard.upsellProducts[
                                              proteinUpsell[protein][0]
                                            ].price / 100
                                          ).toFixed(2) +
                                          '</div><p class="item-added-confirmation"></p><div class="tooltip info"><div class="tooltip-content"><div class="tooltip-arrow"></div><div class="tooltip-close"></div><div class="tooltip-inner"><div class="tooltip-padding tooltip-message">' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][0]
                                          ].info +
                                          '</div></div></div></div><div class="tooltip fit"><div class="tooltip-content"><div class="tooltip-arrow"></div><div class="tooltip-inner"><div class="tooltip-padding tooltip-message">Sorry, we can\'t fit anymore of this item in your box</div></div></div></div><div class="cta-container add-container"> <a href="javascript:;" class="cta">Add</a></div><div class="cta-container increment-container"> <a href="javascript:;" class="minus-cta increment-cta">-</a> <span>1</span> <a href="javascript:;" class="add-cta increment-cta">+</a></div></div>' +
                                          '<div class="extra ' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][1]
                                          ].cssClass +
                                          '" data-product="' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][1]
                                          ].cssClass +
                                          '" data-protein="' +
                                          protein +
                                          '"> <a href="javascript:;" class="info-icon">&nbsp;</a><div class="extra-image">&nbsp;</div><h3>' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][1]
                                          ].name +
                                          '</h3><div class="price">&pound;' +
                                          (
                                            window.springBoard.upsellProducts[
                                              proteinUpsell[protein][1]
                                            ].price / 100
                                          ).toFixed(2) +
                                          '</div><p class="item-added-confirmation"></p><div class="tooltip info"><div class="tooltip-content"><div class="tooltip-arrow"></div><div class="tooltip-close"></div><div class="tooltip-inner"><div class="tooltip-padding tooltip-message">' +
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][1]
                                          ].info +
                                          '</div></div></div></div><div class="tooltip fit"><div class="tooltip-content"><div class="tooltip-arrow"></div><div class="tooltip-inner"><div class="tooltip-padding tooltip-message">Sorry, we can\'t fit anymore of this item in your box</div></div></div></div><div class="cta-container add-container"> <a href="javascript:;" class="cta">Add</a></div><div class="cta-container increment-container"> <a href="javascript:;" class="minus-cta increment-cta">-</a> <span>1</span> <a href="javascript:;" class="add-cta increment-cta">+</a></div></div>' +
                                          "</div></div>";

                                        element.insertAdjacentHTML(
                                          "beforebegin",
                                          upsellHtml
                                        );

                                        var cvUpsellContainer = document.querySelector(
                                          ".cv-017-container"
                                        );

                                        var infoIcons = cvUpsellContainer.querySelectorAll(
                                          ".info-icon"
                                        );
                                        for (
                                          var i = 0;
                                          i < infoIcons.length;
                                          i++
                                        ) {
                                          infoIcons[i].addEventListener(
                                            "click",
                                            openTooltip
                                          );
                                        }

                                        var ctas = cvUpsellContainer.querySelectorAll(
                                          ".cta"
                                        );
                                        for (var i = 0; i < ctas.length; i++) {
                                          ctas[i].addEventListener(
                                            "click",
                                            addItem
                                          );
                                        }

                                        var addCtas = cvUpsellContainer.querySelectorAll(
                                          ".add-cta"
                                        );
                                        for (
                                          var i = 0;
                                          i < addCtas.length;
                                          i++
                                        ) {
                                          addCtas[i].addEventListener(
                                            "click",
                                            addItem
                                          );
                                        }

                                        var removeCtas = cvUpsellContainer.querySelectorAll(
                                          ".minus-cta"
                                        );
                                        for (
                                          var i = 0;
                                          i < removeCtas.length;
                                          i++
                                        ) {
                                          removeCtas[i].addEventListener(
                                            "click",
                                            removeItem
                                          );
                                        }

                                        cvUpsellContainer.addEventListener(
                                          "mouseover",
                                          showFitTooltip
                                        );
                                        cvUpsellContainer.addEventListener(
                                          "click",
                                          showFitTooltip
                                        );
                                      }
                                    });
                                }

                                function addItem(e) {
                                  if (
                                    !e.target.classList.contains("disabled")
                                  ) {
                                    var extraProduct = getExtraElement(
                                      e.target
                                    );
                                    if (extraProduct) {
                                      var productIndex = getProductIndex(
                                        extraProduct.getAttribute(
                                          "data-product"
                                        )
                                      );

                                      window.springBoard.upsellProducts[
                                        productIndex
                                      ].amount++;
                                      extraProduct.querySelector(
                                        ".increment-container span"
                                      ).innerText =
                                        window.springBoard.upsellProducts[
                                          productIndex
                                        ].amount;
                                      extraProduct.querySelector(
                                        ".item-added-confirmation"
                                      ).innerText =
                                        window.springBoard.upsellProducts[
                                          productIndex
                                        ].amount +
                                        " item" +
                                        (window.springBoard.upsellProducts[
                                          productIndex
                                        ].amount > 1
                                          ? "s"
                                          : "") +
                                        " added";

                                      checkLimit(productIndex);

                                      extraProduct.classList.add("increment");

                                      updateBottomPrice();
                                      checkBasketSummaryStatus();
                                      window.springBoard.protein = extraProduct.getAttribute(
                                        "data-protein"
                                      );
                                      setProteinSegment();
                                      setAddonTypeSegment();

                                      window["optimizely"].push({
                                        type: "event",
                                        eventName:
                                          "gou017_clicks_on_add_recipe_details",
                                      });
                                    }
                                  }
                                }

                                function removeItem(e) {
                                  var extraProduct = getExtraElement(e.target);
                                  if (extraProduct) {
                                    var productIndex = getProductIndex(
                                      extraProduct.getAttribute("data-product")
                                    );

                                    window.springBoard.upsellProducts[
                                      productIndex
                                    ].amount--;
                                    extraProduct.querySelector(
                                      ".increment-container span"
                                    ).innerText =
                                      window.springBoard.upsellProducts[
                                        productIndex
                                      ].amount;

                                    checkLimit(productIndex);
                                    removeLimit(productIndex);

                                    if (
                                      window.springBoard.upsellProducts[
                                        productIndex
                                      ].amount === 0
                                    ) {
                                      extraProduct.classList.remove(
                                        "increment"
                                      );
                                      extraProduct.querySelector(
                                        ".item-added-confirmation"
                                      ).innerText = "";
                                    }

                                    updateBottomPrice();
                                    checkBasketSummaryStatus();
                                    setProteinSegment();
                                    setAddonTypeSegment();

                                    window["optimizely"].push({
                                      type: "event",
                                      eventName:
                                        "gou017_remove_item_recipe_details",
                                    });
                                  }
                                }

                                function getProductIndex(productName) {
                                  var productIndex = 0;

                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[i]
                                        .cssClass === productName
                                    ) {
                                      productIndex = i;
                                    }
                                  }

                                  return productIndex;
                                }

                                function checkLimit(productIndex) {
                                  var catTotal = 0,
                                    catLimit =
                                      upsellCategories[
                                        window.springBoard.upsellProducts[
                                          productIndex
                                        ].category
                                      ].maxAmount,
                                    catProductIndexes = [],
                                    prodTotal = 0;

                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[
                                        productIndex
                                      ].category ===
                                      window.springBoard.upsellProducts[i]
                                        .category
                                    ) {
                                      catTotal +=
                                        window.springBoard.upsellProducts[i]
                                          .amount;
                                      catProductIndexes.push(i);
                                    }

                                    prodTotal +=
                                      window.springBoard.upsellProducts[i]
                                        .amount;
                                  }

                                  if (
                                    window.springBoard.upsellProducts[
                                      productIndex
                                    ].maxAmount &&
                                    window.springBoard.upsellProducts[
                                      productIndex
                                    ].amount >=
                                      window.springBoard.upsellProducts[
                                        productIndex
                                      ].maxAmount
                                  ) {
                                    document
                                      .querySelector(
                                        '.cv-017-container .extra[data-product="' +
                                          window.springBoard.upsellProducts[
                                            productIndex
                                          ].cssClass +
                                          '"] .add-cta'
                                      )
                                      .classList.add("disabled");
                                    document
                                      .querySelector(
                                        '.cv-017-container .extra[data-product="' +
                                          window.springBoard.upsellProducts[
                                            productIndex
                                          ].cssClass +
                                          '"] .add-container'
                                      )
                                      .classList.add("disabled");
                                  }

                                  if (catTotal >= catLimit) {
                                    for (
                                      var i = 0;
                                      i < catProductIndexes.length;
                                      i++
                                    ) {
                                      if (
                                        document.querySelector(
                                          '.cv-017-container .extra[data-product="' +
                                            window.springBoard.upsellProducts[
                                              catProductIndexes[i]
                                            ].cssClass +
                                            '"]'
                                        )
                                      ) {
                                        document
                                          .querySelector(
                                            '.cv-017-container .extra[data-product="' +
                                              window.springBoard.upsellProducts[
                                                catProductIndexes[i]
                                              ].cssClass +
                                              '"] .add-cta'
                                          )
                                          .classList.add("disabled");
                                        document
                                          .querySelector(
                                            '.cv-017-container .extra[data-product="' +
                                              window.springBoard.upsellProducts[
                                                catProductIndexes[i]
                                              ].cssClass +
                                              '"] .add-container'
                                          )
                                          .classList.add("disabled");
                                      }
                                    }
                                  }

                                  if (prodTotal >= 10) {
                                    for (
                                      var i = 0;
                                      i <
                                      window.springBoard.upsellProducts.length;
                                      i++
                                    ) {
                                      document
                                        .querySelector(
                                          '.cv-017-container .extra[data-product="' +
                                            window.springBoard.upsellProducts[i]
                                              .cssClass +
                                            '"] .add-cta'
                                        )
                                        .classList.add("disabled");
                                      document
                                        .querySelector(
                                          '.cv-017-container .extra[data-product="' +
                                            window.springBoard.upsellProducts[i]
                                              .cssClass +
                                            '"] .add-container'
                                        )
                                        .classList.add("disabled");
                                    }
                                  }
                                }

                                function removeLimit(productIndex) {
                                  for (
                                    var i = 0;
                                    i < proteinUpsell[protein].length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[
                                        productIndex
                                      ].category ===
                                      window.springBoard.upsellProducts[
                                        proteinUpsell[protein][i]
                                      ].category
                                    ) {
                                      document
                                        .querySelector(
                                          '.cv-017-container .extra[data-product="' +
                                            window.springBoard.upsellProducts[
                                              proteinUpsell[protein][i]
                                            ].cssClass +
                                            '"] .add-cta'
                                        )
                                        .classList.remove("disabled");
                                      document
                                        .querySelector(
                                          '.cv-017-container .extra[data-product="' +
                                            window.springBoard.upsellProducts[
                                              proteinUpsell[protein][i]
                                            ].cssClass +
                                            '"] .add-container'
                                        )
                                        .classList.remove("disabled");
                                    }
                                  }

                                  for (
                                    var i = 0;
                                    i < Object.keys(upsellCategories).length;
                                    i++
                                  ) {
                                    var category = Object.keys(
                                        upsellCategories
                                      )[i],
                                      catTotal = 0;

                                    for (
                                      var j = 0;
                                      j <
                                      window.springBoard.upsellProducts.length;
                                      j++
                                    ) {
                                      if (
                                        Object.keys(upsellCategories)[i] ===
                                        window.springBoard.upsellProducts[j]
                                          .category
                                      ) {
                                        catTotal +=
                                          window.springBoard.upsellProducts[j]
                                            .amount;
                                      }
                                    }

                                    if (
                                      upsellCategories[
                                        Object.keys(upsellCategories)[i]
                                      ].maxAmount > catTotal
                                    ) {
                                      for (
                                        var j = 0;
                                        j < proteinUpsell[protein].length;
                                        j++
                                      ) {
                                        if (
                                          Object.keys(upsellCategories)[i] ===
                                          window.springBoard.upsellProducts[
                                            proteinUpsell[protein][j]
                                          ].category
                                        ) {
                                          document
                                            .querySelector(
                                              '.cv-017-container .extra[data-product="' +
                                                window.springBoard
                                                  .upsellProducts[
                                                  proteinUpsell[protein][j]
                                                ].cssClass +
                                                '"] .add-cta'
                                            )
                                            .classList.remove("disabled");
                                          document
                                            .querySelector(
                                              '.cv-017-container .extra[data-product="' +
                                                window.springBoard
                                                  .upsellProducts[
                                                  proteinUpsell[protein][j]
                                                ].cssClass +
                                                '"] .add-container'
                                            )
                                            .classList.remove("disabled");
                                        }
                                      }
                                    }
                                  }
                                }

                                function showFitTooltip(e) {
                                  if (
                                    e.target.matches(
                                      ".increment-cta.add-cta.disabled"
                                    ) ||
                                    e.target.matches(
                                      ".add-container.disabled .cta"
                                    )
                                  ) {
                                    var extra = getExtraElement(e.target);
                                    extra.classList.add("show-fit-tooltip");
                                  } else if (
                                    document.querySelector(".show-fit-tooltip")
                                  ) {
                                    var shownFitTooltips = document.querySelectorAll(
                                      ".show-fit-tooltip"
                                    );

                                    for (
                                      var i = 0;
                                      i < shownFitTooltips.length;
                                      i++
                                    ) {
                                      shownFitTooltips[i].classList.remove(
                                        "show-fit-tooltip"
                                      );
                                    }
                                  }
                                }

                                function getExtraElement(element) {
                                  if (!element) {
                                    return null;
                                  } else if (element.matches(".extra")) {
                                    return element;
                                  } else {
                                    return getExtraElement(
                                      element.parentElement
                                    );
                                  }
                                }

                                function openTooltip(e) {
                                  if (
                                    document.querySelector(".tooltip.info.show")
                                  ) {
                                    document
                                      .querySelector(".tooltip.info.show")
                                      .classList.remove("show");
                                  }
                                  e.target.parentElement
                                    .querySelector(".tooltip.info")
                                    .classList.add("show");

                                  document.body.addEventListener(
                                    "click",
                                    closeTooltip
                                  );
                                  e.target.parentElement
                                    .querySelector(
                                      ".tooltip.info .tooltip-close"
                                    )
                                    .addEventListener(
                                      "click",
                                      function (event) {
                                        e.target.parentElement
                                          .querySelector(".tooltip.info")
                                          .classList.remove("show");
                                      }
                                    );
                                }

                                function didClickTooltip(element) {
                                  if (!element) {
                                    return false;
                                  } else if (
                                    element.matches(".tooltip") ||
                                    element.matches(".info-icon")
                                  ) {
                                    return true;
                                  } else {
                                    return didClickTooltip(
                                      element.parentElement
                                    );
                                  }
                                }

                                function closeTooltip(e) {
                                  var shownTooltip = document.querySelector(
                                    ".tooltip.info.show"
                                  );
                                  if (
                                    !didClickTooltip(e.target) &&
                                    shownTooltip
                                  ) {
                                    shownTooltip.classList.remove("show");

                                    document.body.removeEventListener(
                                      closeTooltip
                                    );
                                  }
                                }

                                function getView() {
                                  var view = null;
                                  for (
                                    var i = 0;
                                    i < window.dataLayer.length;
                                    i++
                                  ) {
                                    var data = window.dataLayer[i];

                                    if (
                                      typeof data.event !== "undefined" &&
                                      data.event === "userAction" &&
                                      typeof data.actionType !== "undefined" &&
                                      typeof data.actionValue !== "undefined" &&
                                      data.actionType ===
                                        "BOXSUMMARY_VISIBILITY_CHANGE"
                                    ) {
                                      var actionValue = JSON.parse(
                                        data.actionValue
                                      );

                                      if (
                                        typeof actionValue.view !== "undefined"
                                      ) {
                                        view = actionValue.view;
                                      }
                                    }
                                  }

                                  return view;
                                }

                                function checkBasketSummaryStatus() {
                                  if (
                                    document.querySelector(
                                      '[data-testing="boxSummaryMobile"] [data-testing="boxProgressAlert"], [data-testing="boxProgressAlert"]'
                                    )
                                  ) {
                                    var view = getView();

                                    if (view) {
                                      addItemsToBasketSummary(view);
                                    }
                                  }
                                }

                                function addItemsToBasketSummary(view) {
                                  var basket = window.__store__
                                      .getState()
                                      .basket.toJS(),
                                    addedUpsells = false,
                                    selector =
                                      view === "mobile"
                                        ? '[data-testing="boxSummaryMobile"] [data-testing="boxProgressAlert"]'
                                        : '[data-testing="boxProgressAlert"]';

                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[i]
                                        .amount > 0
                                    ) {
                                      addedUpsells = true;
                                    }
                                  }

                                  if (
                                    basket.slotId !== "" &&
                                    Object.keys(basket.recipes).length > 0 &&
                                    addedUpsells
                                  ) {
                                    utils
                                      .waitForElement(selector)
                                      .then(function (element) {
                                        if (
                                          document.querySelector(
                                            ".cv-017-basket-container"
                                          )
                                        ) {
                                          document
                                            .querySelector(
                                              ".cv-017-basket-container"
                                            )
                                            .remove();
                                        }

                                        var recipeListContainer =
                                          element.parentElement.previousSibling;

                                        var basketUpsellContainer = document.createElement(
                                          "div"
                                        );
                                        basketUpsellContainer.classList.add(
                                          "cv-017-basket-container"
                                        );

                                        var extraHtml = "";
                                        for (
                                          var i = 0;
                                          i <
                                          window.springBoard.upsellProducts
                                            .length;
                                          i++
                                        ) {
                                          if (
                                            window.springBoard.upsellProducts[i]
                                              .amount > 0
                                          ) {
                                            extraHtml +=
                                              '<div class="extra ' +
                                              window.springBoard.upsellProducts[
                                                i
                                              ].cssClass +
                                              '" data-protein="' +
                                              window.springBoard.protein +
                                              '"><div class="extra-image"></div><div class="text-container"><h4>' +
                                              window.springBoard.upsellProducts[
                                                i
                                              ].name +
                                              "</h4><p>" +
                                              window.springBoard.upsellProducts[
                                                i
                                              ].amount +
                                              ' servings</p></div><a href="javascript:;" class="close" data-product="' +
                                              i +
                                              '"></a></div>';
                                          }
                                        }

                                        basketUpsellContainer.innerHTML = extraHtml;

                                        recipeListContainer.appendChild(
                                          basketUpsellContainer
                                        );

                                        var extraItemsClose = basketUpsellContainer.querySelectorAll(
                                          ".extra .close"
                                        );
                                        for (
                                          var i = 0;
                                          i < extraItemsClose.length;
                                          i++
                                        ) {
                                          extraItemsClose[i].addEventListener(
                                            "click",
                                            removeItemFromBasketSummary
                                          );
                                        }

                                        addUpsellPrice();
                                        addUpsellRow();
                                        updateBottomPrice();
                                      });
                                  }
                                }

                                function removeItemFromBasketSummary(e) {
                                  var productIndex = e.target.getAttribute(
                                      "data-product"
                                    ),
                                    basketSummaryProduct = document.querySelector(
                                      ".cv-017-basket-container .extra." +
                                        window.springBoard.upsellProducts[
                                          productIndex
                                        ].cssClass
                                    );

                                  window.springBoard.upsellProducts[
                                    productIndex
                                  ].amount = 0;
                                  basketSummaryProduct.remove();

                                  addUpsellPrice();
                                  addUpsellRow();
                                  updateBottomPrice();
                                  setProteinSegment();
                                  setAddonTypeSegment();

                                  window["optimizely"].push({
                                    type: "event",
                                    eventName: "gou017_remove_item_box_summary",
                                  });
                                }

                                function getNewTotal() {
                                  var upsellTotal = 0,
                                    totalValue = parseFloat(
                                      window.__store__.getState().pricing.toJS()
                                        .prices.total
                                    );

                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    upsellTotal +=
                                      window.springBoard.upsellProducts[i]
                                        .amount *
                                      window.springBoard.upsellProducts[i]
                                        .price;
                                  }

                                  upsellTotal = upsellTotal / 100;

                                  var newTotal = (
                                    totalValue + upsellTotal
                                  ).toFixed(2);

                                  if (isNaN(newTotal)) {
                                    return "—";
                                  } else {
                                    return newTotal;
                                  }
                                }

                                function addUpsellPrice() {
                                  var view = getView();
                                  if (view) {
                                    var selector =
                                        getView() === "mobile"
                                          ? '[data-testing="boxSummaryMobile"] [data-testing="boxProgressAlert"]'
                                          : '[data-testing="boxProgressAlert"]',
                                      progressAlert = document.querySelector(
                                        selector
                                      );

                                    if (progressAlert) {
                                      totalContainer = progressAlert.nextSibling.lastElementChild.querySelector(
                                        "p span:last-of-type"
                                      );

                                      var newTotalAmount = getNewTotal();

                                      totalContainer.innerHTML =
                                        "&pound;" + newTotalAmount;
                                    }
                                  }
                                }

                                function addUpsellRow() {
                                  var view = getView();
                                  if (view) {
                                    var selector =
                                        view === "mobile"
                                          ? '[data-testing="boxSummaryMobile"] [data-testing="boxProgressAlert"]'
                                          : '[data-testing="boxProgressAlert"]',
                                      progressAlert = document.querySelector(
                                        selector
                                      );

                                    if (progressAlert) {
                                      var deliveryContainer =
                                          progressAlert.nextSibling
                                            .lastElementChild.previousSibling,
                                        upsellTotal = 0,
                                        upsellQuantity = 0;

                                      for (
                                        var i = 0;
                                        i <
                                        window.springBoard.upsellProducts
                                          .length;
                                        i++
                                      ) {
                                        upsellTotal +=
                                          window.springBoard.upsellProducts[i]
                                            .amount *
                                          window.springBoard.upsellProducts[i]
                                            .price;
                                        upsellQuantity +=
                                          window.springBoard.upsellProducts[i]
                                            .amount;
                                      }

                                      upsellTotal = upsellTotal / 100;

                                      if (
                                        document.querySelector(".cv-upsell-row")
                                      ) {
                                        document
                                          .querySelector(".cv-upsell-row")
                                          .remove();
                                      }

                                      if (upsellTotal > 0) {
                                        var upsellRow =
                                          '<div class="cv-upsell-row"><span class="row-name">Market items (' +
                                          upsellQuantity +
                                          ')</span><span class="row-price">&pound;' +
                                          upsellTotal.toFixed(2) +
                                          "</span></div>";
                                        deliveryContainer.insertAdjacentHTML(
                                          "beforebegin",
                                          upsellRow
                                        );
                                      }
                                    }
                                  }
                                }

                                function updateBottomPrice() {
                                  var newTotalAmount = getNewTotal();

                                  if (!isNaN(newTotalAmount)) {
                                    utils
                                      .waitForElement(
                                        '[data-testing="menuBottomBarDesktop"] > [data-testing="menuBottomBarDesktop"] [role="button"] > div > div > div > div > span'
                                      )
                                      .then(function (element) {
                                        var desktopSpans = document.querySelectorAll(
                                          '[data-testing="menuBottomBarDesktop"] > [data-testing="menuBottomBarDesktop"] [role="button"] > div > div > div > div > span'
                                        );
                                        for (
                                          var i = 0;
                                          i < desktopSpans.length;
                                          i++
                                        ) {
                                          desktopSpans[i].innerHTML =
                                            "&pound;" + newTotalAmount;
                                        }
                                      });

                                    utils
                                      .waitForElement(
                                        '[data-testing="menuContainer"] > div:nth-of-type(2) > div > div > div > div > div > span'
                                      )
                                      .then(function (element) {
                                        var mobileSpans = document.querySelectorAll(
                                          '[data-testing="menuContainer"] > div:nth-of-type(2) > div > div > div > div > div > span'
                                        );
                                        for (
                                          var i = 0;
                                          i < mobileSpans.length;
                                          i++
                                        ) {
                                          mobileSpans[i].innerHTML =
                                            "&pound;" + newTotalAmount;
                                        }
                                      });
                                  }
                                }

                                var pricePending = false;
                                setInterval(function () {
                                  var pricing = window.__store__
                                    .getState()
                                    .pricing.toJS();
                                  if (pricing.pending) {
                                    pricePending = true;
                                  }
                                  if (pricePending && !pricing.pending) {
                                    setTimeout(function () {
                                      addUpsellPrice();
                                      addUpsellRow();
                                      updateBottomPrice();
                                    }, 50);
                                    pricePending = false;
                                  }
                                }, 50);

                                function addDesktopOverlayButton(
                                  parentElement
                                ) {
                                  if (
                                    document.querySelector(
                                      ".cv-overlay-button.desktop"
                                    )
                                  ) {
                                    document
                                      .querySelector(
                                        ".cv-overlay-button.desktop"
                                      )
                                      .remove();
                                  }

                                  var overlayButton = document.createElement(
                                    "div"
                                  );
                                  overlayButton.classList.add(
                                    "cv-overlay-button",
                                    "desktop"
                                  );
                                  overlayButton.innerHTML =
                                    parentElement.firstChild.innerHTML;

                                  parentElement.firstChild.classList.add(
                                    "cv-button-container"
                                  );
                                  parentElement.insertBefore(
                                    overlayButton,
                                    parentElement.firstChild
                                  );

                                  overlayButton.addEventListener(
                                    "click",
                                    clickDesktopButton
                                  );
                                }

                                function addMobileOverlayButton(parentElement) {
                                  if (
                                    document.querySelector(
                                      ".cv-overlay-button.mobile"
                                    )
                                  ) {
                                    document
                                      .querySelector(
                                        ".cv-overlay-button.mobile"
                                      )
                                      .remove();
                                  }

                                  var overlayButton = document.createElement(
                                    "div"
                                  );
                                  overlayButton.classList.add(
                                    "cv-overlay-button",
                                    "mobile"
                                  );
                                  overlayButton.innerHTML =
                                    parentElement.firstChild.innerHTML;

                                  var duplicateClasses = parentElement.firstChild.getAttribute(
                                    "class"
                                  );
                                  if (duplicateClasses) {
                                    duplicateClasses = duplicateClasses.split(
                                      " "
                                    );
                                    for (
                                      var i = 0;
                                      i < duplicateClasses.length;
                                      i++
                                    ) {
                                      if (
                                        duplicateClasses[i] !==
                                        "cv-button-container"
                                      ) {
                                        overlayButton.classList.add(
                                          duplicateClasses[i]
                                        );
                                      }
                                    }
                                  }

                                  parentElement.firstChild.classList.add(
                                    "cv-button-container"
                                  );
                                  parentElement.insertBefore(
                                    overlayButton,
                                    parentElement.firstChild
                                  );

                                  overlayButton.addEventListener(
                                    "click",
                                    clickMobileButton
                                  );
                                }

                                function clickDesktopButton(e) {
                                  var addedUpsells = false,
                                    addedUpsellList = [];

                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[i]
                                        .amount > 0
                                    ) {
                                      addedUpsells = true;
                                      addedUpsellList.push({
                                        id:
                                          window.springBoard.upsellProducts[i]
                                            .id,
                                        quantity:
                                          window.springBoard.upsellProducts[i]
                                            .amount,
                                        type: "Product",
                                      });
                                    }
                                  }
                                  if (
                                    document.querySelector(
                                      '.cv-button-container [role="button"]:not(.disabled)'
                                    )
                                  ) {
                                    if (addedUpsells) {
                                      //console.log('Add upsells');
                                      var orderUpdateProductsRequestEvent = document.createEvent(
                                        "CustomEvent"
                                      );

                                      orderUpdateProductsRequestEvent.initCustomEvent(
                                        "orderUpdateProductsRequest",
                                        true,
                                        true,
                                        {
                                          itemChoices: addedUpsellList,
                                        }
                                      );
                                      window.dispatchEvent(
                                        orderUpdateProductsRequestEvent
                                      );
                                    } else {
                                      document
                                        .querySelector(
                                          '.cv-button-container [role="button"]:not(.disabled)'
                                        )
                                        .click();
                                    }
                                  }
                                }

                                function clickMobileButton(e) {
                                  var addedUpsells = false,
                                    addedUpsellList = [];

                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[i]
                                        .amount > 0
                                    ) {
                                      addedUpsells = true;
                                      addedUpsellList.push({
                                        id:
                                          window.springBoard.upsellProducts[i]
                                            .id,
                                        quantity:
                                          window.springBoard.upsellProducts[i]
                                            .amount,
                                        type: "Product",
                                      });
                                    }
                                  }
                                  if (
                                    document.querySelector(
                                      '.cv-button-container [role="button"]:not(.disabled)'
                                    )
                                  ) {
                                    if (addedUpsells) {
                                      //console.log('Add upsells');
                                    } else {
                                      document
                                        .querySelector(
                                          '.cv-button-container [role="button"]:not(.disabled)'
                                        )
                                        .click();
                                    }
                                  }
                                }

                                function addDesktopMutationObserver(
                                  parentElement
                                ) {
                                  var mutationCallback = function (
                                    mutationsList
                                  ) {
                                    var element = document.querySelector(
                                      '[data-testing="menuBottomBarDesktop"] [data-testing="menuBottomBarDesktop"] > span > div:nth-of-type(2)'
                                    );

                                    var testAddition = false;
                                    for (
                                      var i = 0;
                                      i < mutationsList.length;
                                      i++
                                    ) {
                                      if (
                                        mutationsList[i].addedNodes.length > 0
                                      ) {
                                        for (
                                          var j = 0;
                                          j <
                                          mutationsList[i].addedNodes.length;
                                          j++
                                        ) {
                                          if (
                                            mutationsList[i].addedNodes[j] &&
                                            mutationsList[i].addedNodes[j]
                                              .classList &&
                                            mutationsList[i].addedNodes[
                                              j
                                            ].classList.contains(
                                              "cv-overlay-button"
                                            )
                                          ) {
                                            testAddition = true;
                                          }
                                        }
                                      }
                                    }

                                    if (element && !testAddition) {
                                      addDesktopOverlayButton(element);
                                    }
                                  };

                                  var observer = new MutationObserver(
                                    mutationCallback
                                  );

                                  observer.observe(parentElement, {
                                    attributes: true,
                                    childList: true,
                                    subtree: true,
                                  });
                                }

                                utils
                                  .waitForElement(
                                    '[data-testing="menuBottomBarDesktop"] [data-testing="menuBottomBarDesktop"] > span > div:nth-of-type(2)'
                                  )
                                  .then(function (element) {
                                    addDesktopOverlayButton(element);

                                    addDesktopMutationObserver(
                                      element.parentElement
                                    );
                                  });

                                function addMobileMutationObserver(
                                  parentElement
                                ) {
                                  var mutationCallback = function (
                                    mutationsList
                                  ) {
                                    var element = document.querySelector(
                                      '[data-testing="mobileBoxSummaryButton"]'
                                    ).parentElement.parentElement.parentElement;

                                    var testAddition = false;
                                    for (
                                      var i = 0;
                                      i < mutationsList.length;
                                      i++
                                    ) {
                                      if (
                                        mutationsList[i].addedNodes.length > 0
                                      ) {
                                        for (
                                          var j = 0;
                                          j <
                                          mutationsList[i].addedNodes.length;
                                          j++
                                        ) {
                                          if (
                                            mutationsList[i].addedNodes[j] &&
                                            mutationsList[i].addedNodes[j]
                                              .classList &&
                                            mutationsList[i].addedNodes[
                                              j
                                            ].classList.contains(
                                              "cv-overlay-button"
                                            )
                                          ) {
                                            testAddition = true;
                                          }
                                        }
                                      }
                                    }

                                    if (element && !testAddition) {
                                      addMobileOverlayButton(element);
                                    }
                                  };

                                  var observer = new MutationObserver(
                                    mutationCallback
                                  );

                                  observer.observe(parentElement, {
                                    attributes: true,
                                    childList: true,
                                    subtree: true,
                                  });
                                }

                                utils
                                  .waitForElement(
                                    '[data-testing="mobileBoxSummaryButton"]'
                                  )
                                  .then(function (element) {
                                    addMobileOverlayButton(
                                      element.parentElement.parentElement
                                        .parentElement
                                    );

                                    addMobileMutationObserver(
                                      elemen.parentElement.parentElement
                                        .parentElement.parentElement
                                    );
                                  });

                                function readyDesktopNextButton() {
                                  utils
                                    .waitForElement(
                                      '[data-testing="menuBottomBarDesktop"] [data-testing="menuBottomBarDesktop"] [data-testing="desktopBoxSummaryNextButton"]'
                                    )
                                    .then(function (element) {
                                      addDesktopOverlayButton(
                                        element.parentElement.parentElement
                                      );

                                      addDesktopMutationObserver(
                                        element.parentElement.parentElement
                                          .parentElement
                                      );
                                    });
                                }

                                function readyMobileNextButton() {
                                  utils
                                    .waitForElement(
                                      '[data-testing="mobileBoxSummaryNextButton"]'
                                    )
                                    .then(function (element) {
                                      addMobileOverlayButton(
                                        element.parentElement.parentElement
                                      );

                                      addMobileMutationObserver(
                                        element.parentElement.parentElement
                                          .parentElement
                                      );
                                    });
                                }

                                function resetProductAmounts() {
                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    window.springBoard.upsellProducts[
                                      i
                                    ].amount = 0;
                                  }

                                  setProteinSegment();
                                  setAddonTypeSegment();
                                }

                                function setProteinSegment() {
                                  var protein =
                                    window.springBoard.protein || "None";

                                  var checkAllGone = true;
                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[i]
                                        .amount > 0
                                    ) {
                                      checkAllGone = false;
                                    }
                                  }
                                  protein = checkAllGone ? "None" : protein;

                                  window["optimizely"].push({
                                    type: "user",
                                    attributes: {
                                      gou017_protein_type: protein,
                                    },
                                  });
                                }

                                function setAddonTypeSegment() {
                                  var addonType = "None",
                                    drinkAdded = false,
                                    dessertAdded = false;

                                  for (
                                    var i = 0;
                                    i <
                                    window.springBoard.upsellProducts.length;
                                    i++
                                  ) {
                                    if (
                                      window.springBoard.upsellProducts[i]
                                        .amount > 0
                                    ) {
                                      if (
                                        window.springBoard.upsellProducts[i]
                                          .category === "wine"
                                      ) {
                                        drinkAdded = true;
                                      } else {
                                        dessertAdded = true;
                                      }
                                    }
                                  }

                                  if (drinkAdded && dessertAdded) {
                                    addonType = "Both";
                                  } else if (drinkAdded) {
                                    addonType = "Drink";
                                  } else if (dessertAdded) {
                                    addonType = "Dessert";
                                  }

                                  window["optimizely"].push({
                                    type: "user",
                                    attributes: {
                                      gou017_addon_type: addonType,
                                    },
                                  });
                                }

                                if (
                                  document.readyState === "complete" ||
                                  document.readyState === "interactive"
                                ) {
                                  setTimeout(readyDesktopNextButton, 1);
                                  setTimeout(readyMobileNextButton, 1);
                                } else {
                                  document.addEventListener(
                                    "DOMContentLoaded",
                                    readyDesktopNextButton
                                  );
                                  document.addEventListener(
                                    "DOMContentLoaded",
                                    readyMobileNextButton
                                  );
                                }
                              },
                            },
                            {
                              value:
                                '<style>.cv-017-container {\n\tpadding: 20px 0 0;\n\tclear: both;\n}\n\n.cv-017-container h3 {\n\tfont-size: 16px;\n\tline-height: 26px;\n\tcolor: #333D47;\n\tmargin-bottom: 0;\n\tpadding-left: 15px;\n\tfont-family: Axiforma,Helvetica,sans-serif;\n}\n\n.cv-017-container .extras-list-container {\n\tpadding: 15px 15px 0;\n}\n\n.cv-017-container .extras-list-container:after {\n\tcontent: "";\n\tdisplay: table;\n\tclear: both;\n}\n\n.cv-017-container .extras-list-container .extra {\n\theight: 108px;\n\tbackground: #FFFFFF;\n\tborder: 1px solid #D3D6D9;\n\tbox-sizing: border-box;\n\tmargin-bottom: 10px;\n\tpadding-right: 10px;\n\tposition: relative;\n}\n\n.cv-017-container .extras-list-container > div:nth-child(even) {\n\tmargin-bottom: 0px;\n}\n\n.cv-017-container .extras-list-container .extra .extra-image {\n\tfloat: left;\n\twidth: 106px;\n\theight: 106px;\n\tbackground: transparent url(https://cfactory-img.s3.amazonaws.com/GOU/016/images/placeholder.jpg) center 0 no-repeat;\n\tmargin-right: 10px;\n\t-webkit-background-size: cover;\n\tbackground-size: cover;\n}\n\n.cv-017-container .extras-list-container .extra.pots-caramel .extra-image,\n.cv-017-basket-container .extra.pots-caramel .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/Pots--co-salted-caramel--chocolate-1790_RESIZED-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.pots-chocolate .extra-image, \n.cv-017-basket-container .extra.pots-chocolate .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/Pots--co-little-pot-of-chocolate-1783_RESIZED-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.mastri-pinot .extra-image, \n.cv-017-basket-container .extra.mastri-pinot .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/Mastri-Vernacoli-1980-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.greyrock-sauvignon .extra-image, \n.cv-017-basket-container .extra.greyrock-sauvignon .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/mood-image/Greyrock-Sauvignon-Blanc-Marlborough-750ml-bottle-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.gu-white-chocolate .extra-image, \n.cv-017-basket-container .extra.gu-white-chocolate .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/mood-image/Greyrock-Sauvignon-Blanc-Marlborough-750ml-bottle-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.brisa-de-verano .extra-image, \n.cv-017-basket-container .extra.brisa-de-verano .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/mood-image/Brisa-de-Verano-Garnacha-Tinta-750ml-bottle-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.montevista-sauvignon .extra-image, \n.cv-017-basket-container .extra.montevista-sauvignon .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/mood-image/Montevista-Sauvignon-Blanc-750ml-bottle-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.gu-zesty-lemon .extra-image, \n.cv-017-basket-container .extra.gu-zesty-lemon .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/Gu-Zesty-Lemon.2-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.sanvigilio-merlot .extra-image, \n.cv-017-basket-container .extra.sanvigilio-merlot .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/Sanvigilio-Merlot-375ml-bottle-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.crocera-barbera .extra-image, \n.cv-017-basket-container .extra.crocera-barbera .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/La-Crocera-Barbera-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.gu-chocolate-ganache .extra-image, \n.cv-017-basket-container .extra.gu-chocolate-ganache .extra-image {\n\tbackground-image: url();\n}\n\n.cv-017-container .extras-list-container .extra.pot-of-chocolate .extra-image, \n.cv-017-basket-container .extra.pot-of-chocolate .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/Pots--co-little-pot-of-chocolate-1783_RESIZED-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra.superbake-brownies .extra-image, \n.cv-017-basket-container .extra.superbake-brownies .extra-image {\n\tbackground-image: url(https://production-media.gousto.co.uk/cms/product-image-landscape/Superfood-Bakery-x400.jpg);\n}\n\n.cv-017-container .extras-list-container .extra .info-icon {\n\tposition: absolute;\n\tleft: 4px;\n\tbottom: 4px;\n\twidth: 17px;\n\theight: 17px;\n\tbackground: transparent url(https://cfactory-img.s3.amazonaws.com/GOU/016/images/info.png) 0 0 no-repeat;\n\t-webkit-background-size: 100% auto;\n\tbackground-size: 100% auto;\n\ttext-decoration: none;\n}\n\n.cv-017-container .extras-list-container .extra h3 {\n\tfont-family: AvenirBook,Helvetica,sans-serif;\n\tfont-style: normal;\n\tfont-weight: 800;\n\tfont-size: 14px;\n\tline-height: 19px;\n\tcolor: #333D47;\n\tmargin: 10px 0 0;\n\twidth: auto;\n}\n\n.cv-017-container .extras-list-container .extra .price {\n\tfloat: left;\n\tfont-family: AvenirBook,Helvetica,sans-serif;\n\tfont-style: normal;\n\tfont-weight: 800;\n\tfont-size: 12px;\n\tline-height: 16px;\n\tcolor: #868F94;\n\tmargin-top: 10px;\n}\n\n.cv-017-container .extras-list-container .extra .item-added-confirmation {\n\tposition: absolute;\n\tright: 100px;\n\tbottom: 8px;\n\tfont-style: normal;\n\tfont-weight: 500;\n\tfont-size: 12px;\n\tline-height: 16px;\n\tcolor: #01A92B;\n\tmargin: 0;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container {\n\tposition: absolute;\n\tright: 10px;\n\tbottom: 10px;\n\twidth: 75px;\n}\n\n.cv-017-container .extras-list-container .extra .cta {\n\tdisplay: block;\n\t-webkit-tap-highlight-color: rgba(0,0,0,0);\n\tfont-family: AvenirBook,Helvetica,sans-serif;\n\tfont-weight: 400;\n\tborder: 1px solid #615cff;\n\tborder-radius: 3px;\n\ttext-transform: uppercase;\n\ttext-decoration: none;\n\tcolor: #615cff;\n\theight: 39px;\n\tbox-sizing: border-box;\n\ttext-align: center;\n\tpadding-top: 8px;\n}\n\n.cv-017-container .extras-list-container .extra .cta:hover {\n\tcolor: #fff;\n\tbackground-color: #615cff;\n}\n\n.cv-017-container .extras-list-container .extra .disabled .cta:hover {\n\tcolor: #fff;\n\tbackground-color: #615cff;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container.increment-container {\n\theight: 39px;\n\tdisplay: none;\n}\n\n.cv-017-container .extras-list-container .extra.increment .cta-container.increment-container {\n\tdisplay: block;\n}\n\n.cv-017-container .extras-list-container .extra.increment .cta-container.add-container {\n\tdisplay: none;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container.increment-container:after {\n\tcontent: "";\n\tdisplay: table;\n\tclear: both;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container.increment-container .increment-cta {\n\tfloat: left;\n\tbox-sizing: border-box;\n\twidth: 25px;\n\theight: 100%;\n\tbackground: #615cff;\n\tborder: 1px solid #615cff;\n\tcolor: #fff;\n\tfont-size: 20px;\n\tline-height: 100%;\n\tfont-family: AvenirBook,Helvetica,sans-serif;\n\tfont-weight: 400;\n\ttext-decoration: none;\n\ttext-align: center;\n\tpadding-top: 8px;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container.increment-container .increment-cta.minus-cta {\n\tborder-top-left-radius: 3px;\n\tborder-bottom-left-radius: 3px;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container.increment-container .increment-cta.add-cta {\n\tborder-top-right-radius: 3px;\n\tborder-bottom-right-radius: 3px;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container.increment-container .increment-cta.add-cta.disabled {\n\tbackground-color: #d2d6d9;\n\tborder-left-width: 0;\n}\n\n.cv-017-container .extras-list-container .extra .cta-container.increment-container span {\n\tborder: 1px solid #615cff;\n\tborder-width: 1px 0;\n\tfloat: left;\n\tbox-sizing: border-box;\n\twidth: 25px;\n\theight: 100%;\n\ttext-align: center;\n\tpadding-top: 9px;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip {\n\tdisplay: none;\n\t-webkit-tap-highlight-color: rgba(0,0,0,0);\n\tfont-family: AvenirBook,Helvetica,sans-serif;\n\tfont-weight: 400;\n\t-webkit-font-smoothing: antialiased;\n\tcolor: #333d47;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tz-index: 2;\n\tline-height: 1.5;\n\tfont-size: 14px;\n\tborder-radius: 4px;\n\tmax-width: 250px;\n\tbackground-color: rgba(0,0,0,.05);\n}\n\n.cv-017-container .extras-list-container .extra .tooltip.info {\n\ttop: auto;\n\tbottom: 30px;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip.fit {\n\ttop: auto;\n\tbottom: 61px;\n\tleft: auto;\n\tright: 17px;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip.show,\n.cv-017-container .extras-list-container .extra.show-fit-tooltip .tooltip.fit {\n\tdisplay: block;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip .tooltip-arrow {\n\tposition: absolute;\n\twidth: 0;\n\theight: 0;\n\tborder-color: transparent;\n\tborder-style: solid;\n\tbottom: -5px;\n\tborder-width: 6px 6px 0;\n\tborder-top-color: #fff;\n\tmargin-left: -6px;\n\tright: 25px;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip.info .tooltip-arrow {\n\tright: auto;\n\tleft: 12px;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip .tooltip-close {\n\tposition: absolute;\n\twidth: 13px;\n\theight: 13px;\n\ttop: 10px;\n\tright: 10px;\n\tbackground: transparent url(https://cfactory-img.s3.amazonaws.com/GOU/016/images/close.png) 0 0 no-repeat;\n\t-webkit-background-size: 100% auto;\n\tbackground-size: 100% auto;\n\tcursor: pointer;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip .tooltip-inner {\n\tcolor: #333;\n\ttext-align: center;\n\ttext-decoration: none;\n\tbackground-color: #fff;\n\tborder-radius: 4px;\n\tmin-height: 34px;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip .tooltip-inner .tooltip-message {\n\tcolor: #333;\n\tbox-shadow: 0 2px 5px #ccc;\n\tborder-radius: 4px;\n\tpadding: 9px 11px;\n\ttext-align: left;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip.fit .tooltip-inner .tooltip-message {\n\ttext-align: center;\n}\n\n.cv-017-container .extras-list-container .extra .tooltip.show .tooltip-inner .tooltip-message {\n\tpadding-right: 23px;\n}\n\n.cv-017-basket-container {\n\tpadding: 0 .5rem .5rem;\n}\n\n.cv-017-basket-container .extra {\n\tposition: relative;\n\tpadding: .5rem 0;\n\tborder-top: 1px solid #d8d8d6;\n}\n\n.cv-017-basket-container .extra:after {\n\tcontent: "";\n\tdisplay: table;\n\tclear: both;\n}\n\n.cv-017-basket-container .extra .extra-image {\n\tfloat: left;\n\tbackground: transparent url(https://cfactory-img.s3.amazonaws.com/GOU/016/images/placeholder.jpg) center center no-repeat;\n\t-webkit-background-size: cover;\n\tbackground-size: cover;\n\tborder-style: none;\n\tvertical-align: middle;\n\tcursor: pointer;\n\theight: 60px;\n\twidth: 60px;\n\tborder-radius: 100%;\n\tobject-fit: cover;\n\tmargin-right: 10px;\n}\n\n.cv-017-basket-container .extra .text-container {\n\tfloat: left;\n\twidth: 195px;\n}\n\n.cv-017-basket-container .extra .text-container h4 {\n\toverflow: visible;\n\ttext-transform: none;\n\tmargin: 0;\n\ttext-align: left;\n\tcolor: #000;\n\tpadding: 0;\n\tfont-family: AvenirHeavy,Helvetica,sans-serif;\n\tfont-weight: 400;\n}\n\n.cv-017-basket-container .extra .text-container p {\n\tline-height: 1.4;\n\tfont-size: 13px;\n\tmargin: 0;\n}\n\n.cv-017-basket-container .extra .close {\n\tdisplay: inline-block;\n\tfont: normal normal normal 14px/1 FontAwesome;\n\ttext-rendering: auto;\n\t-webkit-font-smoothing: antialiased;\n\ttext-align: center;\n\tcursor: pointer;\n\tcolor: #333d47;\n\tuser-select: none;\n\tposition: absolute;\n\tmargin-left: 0;\n\tright: 0;\n\ttop: 1.5rem;\n\twidth: auto;\n\tfont-size: 1.8em;\n\talign-self: center;\n}\n\n.cv-017-basket-container .extra .close:before {\n\tcontent: "\\F056";\n}\n\n.cv-017-basket-container .extra .close:active,\n.cv-017-basket-container .extra .close:focus,\n.cv-017-basket-container .extra .close:hover {\n\ttext-decoration: none;\n}\n\n.cv-upsell-row {\n\tpadding-top: 7px;\n\tborder-top: 1px solid #d8d8d6;\n}\n\n.cv-upsell-row .row-price {\n\tfloat: right;\n}\n\n.cv-button-container {\n\tdisplay: none;\n}\n\n@media only screen and (min-width:768px) {\n\t.cv-017-container h3 {\n\t\tpadding-left: 20px;\n\t}\n\n\t.cv-017-container .extras-list-container {\n\t\tpadding: 15px 20px 0;\n\t}\n\n\t.cv-017-basket-container .extra .text-container {\n\t\twidth: 199px;\n\t}\n\n\t.cv-017-basket-container .extra .close {\n\t\tfont-size: 1.4em;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .item-added-confirmation {\n\t\tright: 94px;\n\t\tbottom: 13px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .cta-container {\n\t\tbottom: 14px;\n\t}\n}\n\n@media only screen and (min-width:1024px) {\n\t.cv-017-container h3 {\n\t\twidth: 640px;\n\t\tmargin: 0;\n\t\tpadding-left: 50px;\n\t\tmargin-bottom: 20px;\n\t\tfont-size: 18px;\n\t\tline-height: 30px;\n\t}\n\n\t.cv-017-container .extras-list-container {\n\t\twidth: 636px;\n\t\tpadding: 0;\n\t\toverflow: visible;\n\t\tmargin: 0 0 0 50px;\n\t}\n\n\t.cv-017-container .extras-list-container > div:nth-child(odd) {\n\t\tmargin-right: 18px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra {\n\t\tfloat: left;\n\t\twidth: 309px;\n\t\theight: auto;\n\t\tmin-height: 324px;\n\t\tpadding-right: 0;\n\t\tpadding-bottom: 15px;\n\t\tmargin-bottom: 0;\n\t}\n\n\t.cv-017-container .extras-list-container .extra:after {\n\t    content: \'\';\n\t\tdisplay: table;\n\t\tclear: both;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .extra-image {\n\t\tfloat: none;\n\t\twidth: 100%;\n\t\theight: 0;\n\t\tpadding-top: 66%;\n\t}\n\n\t.cv-017-container .extras-list-container .extra h3 {\n\t\tfont-size: 18px;\n\t\tline-height: 25px;\n\t\tfont-family: AvenirHeavy,Helvetica,sans-serif;\n\t\tpadding: 0 15px;\n\t\tmargin-top: 15px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .price {\n\t\tfont-size: 14px;\n\t\tpadding-left: 15px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .info-icon {\n\t\ttop: 168px;\n\t\tbottom: auto;\n\t\tleft: auto;\n\t\tright: 15px;\n\t\tbackground-image: url(https://cfactory-img.s3.amazonaws.com/GOU/016/images/info-desktop.png);\n\t\theight: 20px;\n\t\twidth: 20px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .tooltip.info {\n\t\tright: 8px;\n\t\tleft: auto;\n\t\tbottom: 166px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .tooltip.info .tooltip-arrow {\n\t\tleft: auto;\n\t\tright: 11px;\n\t}\n}\n\n@media only screen and (min-width:1200px) {\n\t.cv-017-container h3 {\n\t\twidth: auto;\n\t\tmargin: 0;\n\t\tmargin-bottom: 20px;\n\t\tfont-size: 18px;\n\t\tline-height: 30px;\n\t}\n\n\t.cv-017-container .extras-list-container {\n\t\twidth: 736px;\n\t\tpadding: 0;\n\t\toverflow: visible;\n\t}\n\n\t.cv-017-container .extras-list-container > div:nth-child(odd) {\n\t\tmargin-right: 20px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra {\n\t\tfloat: left;\n\t\twidth: 358px;\n\t\theight: auto;\n\t\tmin-height: 344px;\n\t\tpadding-right: 0;\n\t\tpadding-bottom: 15px;\n\t\tmargin-bottom: 0;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .info-icon {\n\t\ttop: 201px;\n\t}\n\n\t.cv-017-container .extras-list-container .extra .tooltip.info {\n\t\tbottom: 152px;\n\t}\n}</style>',
                              selector: "head",
                              dependencies: [],
                              type: "append",
                              id: "C0F873D8-789E-4AEE-98FE-8ED7A4E25809",
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: ["and", "14542860473"],
                  changes: null,
                  id: "16881921666",
                  integrationSettings: null,
                },
              ],
              id: "16864312925",
              weightDistributions: null,
              name:
                "[CONV] [QA] GOU 017 'Goes well with...' on recipe details ",
              groupId: null,
              commitId: "16977400722",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["16846361783"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "16840303133", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Haricots] Sort market products by price",
                  bucketingStrategy: null,
                  variations: [
                    {
                      id: "16842462345",
                      actions: [{ viewId: "16846361783", changes: [] }],
                      name: "Original",
                    },
                    {
                      id: "16840303133",
                      actions: [
                        {
                          viewId: "16846361783",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "406AE96D-8D10-46D1-88F1-B5E52A5F6940",
                              value: function ($) {
                                document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                    if (window.__loadFeatures__) {
                                      window.__loadFeatures__({
                                        features: {
                                          sortMarketProducts: true,
                                        },
                                      });
                                    } else {
                                      console.log(
                                        "Window loadFeatures is not defined"
                                      );
                                    }
                                  }
                                );
                              },
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "16846303953",
                  integrationSettings: null,
                },
              ],
              id: "16875090105",
              weightDistributions: null,
              name: "[Haricots] Sort market products by price",
              groupId: null,
              commitId: "16852053527",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["16838760279"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "16891630806", endOfRange: 10000 },
                  ],
                  audienceName: "Logged out (cookie) visitors",
                  name: "[Carrots] NDD Signup Test",
                  bucketingStrategy: null,
                  variations: [
                    {
                      id: "16864345743",
                      actions: [
                        {
                          viewId: "16838760279",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "DC50AD56-EF5A-4F5F-B0EA-1D952BA885E9",
                              value: function ($) {
                                function enableNDD() {
                                  if (window.__loadFeatures__) {
                                    window.__loadFeatures__({
                                      features: {
                                        ndd:
                                          "9037a447-e11a-4960-ae69-d89a029569af",
                                      },
                                    });
                                  } else {
                                    console.log(
                                      "Window loadFeatures is not defined"
                                    );
                                  }
                                }

                                document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                    enableNDD();
                                  }
                                );

                                //Handle SPA URL changes
                                if (document.readyState == "complete") {
                                  enableNDD();
                                }
                              },
                            },
                          ],
                        },
                      ],
                      name: "Original",
                    },
                    {
                      id: "16891630806",
                      actions: [
                        {
                          viewId: "16838760279",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "2950efe22e9b49d5847865dcc30ee5eb",
                              value: function ($) {
                                function enableNDD() {
                                  if (window.__loadFeatures__) {
                                    window.__loadFeatures__({
                                      features: {
                                        ndd:
                                          "823b18ef-5ca0-4a15-8f0f-4a363b319e29",
                                      },
                                    });
                                  } else {
                                    console.log(
                                      "Window loadFeatures is not defined"
                                    );
                                  }
                                }

                                document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                    enableNDD();
                                  }
                                );

                                //Handle SPA URL changes
                                if (document.readyState == "complete") {
                                  enableNDD();
                                }
                              },
                            },
                          ],
                        },
                      ],
                      name: "Free",
                    },
                    {
                      id: "16887477468",
                      actions: [
                        {
                          viewId: "16838760279",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "5DF6022F-4C34-4511-B1C3-F39C82BB897E",
                              value: function ($) {
                                function enableNDD() {
                                  if (window.__loadFeatures__) {
                                    window.__loadFeatures__({
                                      features: {
                                        ndd:
                                          "435191b6-0fa0-422b-a5c0-0dc1dc65d888",
                                      },
                                    });
                                  } else {
                                    console.log(
                                      "Window loadFeatures is not defined"
                                    );
                                  }
                                }

                                document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                    enableNDD();
                                  }
                                );

                                //Handle SPA URL changes
                                if (document.readyState == "complete") {
                                  enableNDD();
                                }
                              },
                            },
                          ],
                        },
                      ],
                      name: "Priced",
                    },
                  ],
                  audienceIds: ["and", "14095560011"],
                  changes: null,
                  id: "16868323910",
                  integrationSettings: null,
                },
              ],
              id: "16889682278",
              weightDistributions: null,
              name: "[Carrots] NDD Signup Test - Price testing",
              groupId: null,
              commitId: "17757671353",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["18394941581"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "18385151137", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Beetroots][PSD2] Change card",
                  bucketingStrategy: null,
                  variations: [
                    {
                      id: "18361791725",
                      actions: [{ viewId: "18394941581", changes: [] }],
                      name: "Original",
                    },
                    {
                      id: "18385151137",
                      actions: [
                        {
                          viewId: "18394941581",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "E4985BC2-FDFE-4A12-BA1D-85E395999C8D",
                              value: function ($) {
                                document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                    if (window.__loadFeatures__) {
                                      window.__loadFeatures__({
                                        features: {
                                          enable3DSForCardOnHold: true,
                                          enable3DSForEditCard: true,
                                        },
                                      });
                                    }
                                  }
                                );
                              },
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "18385190942",
                  integrationSettings: null,
                },
              ],
              id: "18375791320",
              weightDistributions: null,
              name: "[Beetroots][PSD2] Change card",
              groupId: null,
              commitId: "20023562379",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["19184040995"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "19185960700", endOfRange: 5000 },
                    { entityId: "19199160901", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Rockets] First month promo offset",
                  bucketingStrategy: null,
                  variations: [
                    { id: "19185960700", actions: [], name: "Original" },
                    {
                      id: "19199160901",
                      actions: [
                        {
                          viewId: "19184040995",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "8CE76FA7-EB50-4EDB-ABE5-2F19CD6EC6EA",
                              value: function ($) {
                                var utils = optimizely.get("utils");

                                utils
                                  .waitUntil(function () {
                                    return window.__loadFeatures__;
                                  })
                                  .then(function () {
                                    window.__loadFeatures__({
                                      features: {
                                        isFirstMonthPromoOffset: true,
                                      },
                                    });
                                  });
                              },
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "19179901580",
                  integrationSettings: null,
                },
              ],
              id: "19178040845",
              weightDistributions: null,
              name: "[Rockets] First month promo offset",
              groupId: null,
              commitId: "19189731305",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["19573831202"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "19593122108", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Jalape\u00f1os]New Subscription Settings page",
                  bucketingStrategy: null,
                  variations: [
                    { id: "19603481391", actions: [], name: "Original" },
                    {
                      id: "19593122108",
                      actions: [
                        {
                          viewId: "19573831202",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "9768B36B-EE9D-4FD0-B610-6324E092DABF",
                              value: function ($) {
                                var utils = window.optimizely.get("utils");

                                utils
                                  .waitUntil(function () {
                                    return !!window.__loadFeatures__;
                                  })
                                  .then(function () {
                                    if (window.__loadFeatures__) {
                                      __loadFeatures__({
                                        enable: [
                                          "isNewSubscriptionPageEnabled",
                                        ],
                                      });
                                    }
                                  });
                              },
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "19572532732",
                  integrationSettings: null,
                },
              ],
              id: "19564841683",
              weightDistributions: null,
              name: "[Jalape\u00f1os]New Subscription Settings page",
              groupId: null,
              commitId: "19595072678",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["19883970607"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "19866920848", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Rockets] multi skip test",
                  bucketingStrategy: null,
                  variations: [
                    { id: "19722797610", actions: [], name: "Original" },
                    {
                      id: "19866920848",
                      actions: [
                        {
                          viewId: "19883970607",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "74200BED-7EC7-4635-AFE4-2913D7B54D23",
                              value: function ($) {
                                document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                    if (window.__loadFeatures__) {
                                      window.__loadFeatures__({
                                        features: {
                                          isMultiSkipEnabled: true,
                                        },
                                      });
                                    } else {
                                      console.log(
                                        "Window loadFeatures is not defined"
                                      );
                                    }
                                  }
                                );
                              },
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "19883820413",
                  integrationSettings: null,
                },
              ],
              id: "19870460830",
              weightDistributions: null,
              name: "[Rockets] multi skip test",
              groupId: null,
              commitId: "19884230135",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["18651193240"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "20115523408", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Beetroots] Carousel shift on HP",
                  bucketingStrategy: null,
                  variations: [
                    {
                      id: "20104553327",
                      actions: [
                        {
                          viewId: "18651193240",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "54F8DA14-1B63-497B-8A13-787D38E8F98F",
                              value: function ($) {
                                var utils = window.optimizely.get("utils");

                                utils
                                  .waitUntil(function () {
                                    return !!window.__loadFeatures__;
                                  })
                                  .then(function () {
                                    if (window.__loadFeatures__) {
                                      __loadFeatures__({
                                        disable: ["isCarouselShiftEnabled"],
                                      });
                                    }
                                  });
                              },
                            },
                          ],
                        },
                      ],
                      name: "Original-hp-carousel-shift",
                    },
                    {
                      id: "20115523408",
                      actions: [
                        {
                          viewId: "18651193240",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "A35D5071-D4BF-4E04-BBFC-1109B3175C52",
                              value: function ($) {
                                var utils = window.optimizely.get("utils");

                                utils
                                  .waitUntil(function () {
                                    return !!window.__loadFeatures__;
                                  })
                                  .then(function () {
                                    if (window.__loadFeatures__) {
                                      __loadFeatures__({
                                        enable: ["isCarouselShiftEnabled"],
                                      });
                                    }
                                  });
                              },
                            },
                          ],
                        },
                      ],
                      name: "Variation-hp-carousel-shift",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "20120043313",
                  integrationSettings: null,
                },
              ],
              id: "20114293142",
              weightDistributions: null,
              name: "[Beetroots] Carousel shift on HP",
              groupId: null,
              commitId: "20127142870",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
            {
              holdback: 0,
              activation: {},
              integrationSettings: {},
              integrationStringVersion: 2,
              viewIds: ["18815290811"],
              experiments: [
                {
                  weightDistributions: [
                    { entityId: "20187370731", endOfRange: 10000 },
                  ],
                  audienceName: "Everyone else",
                  name: "[Beetroots] Increase password strength",
                  bucketingStrategy: null,
                  variations: [
                    {
                      id: "20187370731",
                      actions: [
                        {
                          viewId: "18815290811",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "0560E927-2DB7-4D76-9181-AC27C1AE31F3",
                              value: function ($) {
                                var utils = window.optimizely.get("utils");

                                utils
                                  .waitUntil(function () {
                                    return !!window.__loadFeatures__;
                                  })
                                  .then(function () {
                                    if (window.__loadFeatures__) {
                                      __loadFeatures__({
                                        disable: ["isPassStrengthEnabled"],
                                      });
                                    }
                                  });
                              },
                            },
                          ],
                        },
                      ],
                      name: "Original",
                    },
                    {
                      id: "20174150841",
                      actions: [
                        {
                          viewId: "18815290811",
                          changes: [
                            {
                              dependencies: [],
                              type: "custom_code",
                              id: "5E10E030-4716-472C-AE3C-D03AD2E499F3",
                              value: function ($) {
                                var utils = window.optimizely.get("utils");

                                utils
                                  .waitUntil(function () {
                                    return !!window.__loadFeatures__;
                                  })
                                  .then(function () {
                                    if (window.__loadFeatures__) {
                                      __loadFeatures__({
                                        enable: ["isPassStrengthEnabled"],
                                      });
                                    }
                                  });
                              },
                            },
                          ],
                        },
                      ],
                      name: "Variation #1",
                    },
                  ],
                  audienceIds: null,
                  changes: null,
                  id: "20181940901",
                  integrationSettings: null,
                },
              ],
              id: "20181860643",
              weightDistributions: null,
              name: "[Beetroots] Increase password strength",
              groupId: null,
              commitId: "20191020729",
              decisionMetadata: null,
              policy: "single_experiment",
              changes: null,
            },
          ],
          listTargetingKeys: [],
          groups: [],
          views: [
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/welcome-to-gousto",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Welcome Page",
              apiName: "7728010866_view_welcome_page",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.pathname.indexOf("welcome-to-gousto") > -1
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "11161352827",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://haricots-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              name: "URL Targeting for Haricots - GetHelp",
              apiName: "7728010866_url_targeting_for_haricots__gethelp",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "11504150687",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "http://frontend.gousto.local/menu",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Local Menu",
              apiName: "7728010866_local_menu",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname.indexOf("menu") > -1;
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined &&
                      typeof window.__store__ !== "undefined" &&
                      typeof window.__store__.getState() !== "undefined" &&
                      document.querySelectorAll('img[alt="animation"]')
                        .length == 0
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (
                          data.event === "gtm.historyChange" &&
                          document.location.href.indexOf("menu") > -1
                        ) {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "14246170101",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/menu",
                    match: "simple",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Menu",
              apiName: "7728010866_menu",
              tags: [],
              undoOnDeactivation: true,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname.indexOf("menu") > -1;
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined &&
                      typeof window.__store__ !== "undefined" &&
                      typeof window.__store__.getState() !== "undefined" &&
                      document.querySelectorAll('img[alt="animation"]')
                        .length == 0
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (
                          data.event === "gtm.historyChange" &&
                          document.location.href.indexOf("menu") > -1
                        ) {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: true,
              id: "14248030209",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: ".*gousto\\.info\\/order\\/\\d+\\/summary",
                    match: "regex",
                  },
                ],
              ],
              name: "View Order Summary Page",
              apiName: "7728010866_view_order_summary_page",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "14260340020",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/menu",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV][Staging][GOU 003]MenuPage ",
              apiName: "7728010866_convstaginggou_003menupage_",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname.indexOf("menu") > -1;
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);
                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }
                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "14573280074",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/check-out/payment",
                    match: "simple",
                  },
                ],
              ],
              activationType: "callback",
              name: "Checkout 3 - Payment",
              apiName: "7728010866_checkout_3__payment",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname === "/check-out/payment";
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "14616600256",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Any page",
              apiName: "any_page",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.hostname ===
                      "staging-frontend.gousto.info"
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "14684400194",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Any Page",
              apiName: "targeting_for_quick_filters",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.hostname ===
                      "staging-frontend.gousto.info"
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 100);
                },
              deactivationEnabled: false,
              id: "14830360211",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/signup/delivery-options",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Sign-up Wizard - Delivery Options - With deactivation",
              apiName: "7728010866_signup_wizard__delivery_options",
              tags: [],
              undoOnDeactivation: true,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.pathname === "/signup/delivery-options"
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: true,
              id: "14875460098",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/get-help*",
                    match: "regex",
                  },
                ],
              ],
              activationType: "callback",
              name: "SSR page",
              apiName: "7728010866_ssr_page",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname === "/get-help/contact";
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "14876500153",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/help",
                    match: "simple",
                  },
                ],
              ],
              activationType: "callback",
              name: "Help Page",
              apiName: "7728010866_help_page",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname === "/help";
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "14885990025",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      ".*staging\\-frontend\\.gousto\\.info\\/order\\/\\d+\\/summary",
                    match: "regex",
                  },
                ],
              ],
              activationType: "polling",
              name: "[CONV] Staging [GOU 006] Order Summary Page",
              apiName: "7728010866_conv_staging_gou_006_confirmation_page",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Polling Function
               * Supply an expression to return a boolean inside a function.
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/topics/dynamic-websites/index.html#polling
               */

              activationCode: function pollingFn() {
                return (
                  document.querySelectorAll(
                    ".gousto-market-header-confirmation"
                  ).length > 0
                );
              },
              deactivationEnabled: false,
              id: "14903280149",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/my-gousto",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "MyGousto",
              apiName: "7728010866_mygousto",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname === "/my-gousto";
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (
                      typeof window.dataLayer !== undefined &&
                      typeof window.dataLayer.push !== undefined
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            options.isActive && activate({ isActive: false });
                            activate();
                          }
                        }
                      };
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "15057300105",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/order-confirmation",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Order Confirmation",
              apiName: "7728010866_visit_page__order_confirmation",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "15189370492",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/menu",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Menu (url change trigger)",
              apiName: "7728010866_menu_url_change_trigger",
              tags: [],
              undoOnDeactivation: true,
              deactivationEnabled: true,
              id: "15195140892",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "exact",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Visit: HomePage",
              apiName: "7728010866_visit_homepage",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "15278270353",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/welcome-to-gousto",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Welcome Page (by URL change)",
              apiName: "7728010866_welcome_page_by_url_change",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "15363620148",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/menu",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV]Menu page - GOU008",
              apiName: "7728010866_convmenu_page__gou008",
              tags: [],
              undoOnDeactivation: true,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf("menu") > -1 &&
                      document.querySelector('[data-testing="logoutButton"]')
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0 &&
                        window.__store__.getState().basket.get("products")
                          .size == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: true,
              id: "15408770283",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/my-subscription",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Visit My Subscription",
              apiName: "7728010866_visit_my_subscription",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "15529600320",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/signup/postcode",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Signup Wizard Postcode - With deactivation",
              apiName: "7728010866_signup_box_size__with_deactivation",
              tags: [],
              undoOnDeactivation: true,
              deactivationEnabled: true,
              id: "15582830114",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "https://gousto.co.uk",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Menu Page (logged out + discount)",
              apiName: "7728010866_url_targeting_for_gst_001",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf("menu") > -1 &&
                      window.__store__.getState().user.toJS().id === ""
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0 &&
                        window.__store__.getState().basket.toJS().promoCode !==
                          ""
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "15677660226",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "https://www.gousto.co.uk",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Checkout | Box Details (discount)",
              apiName: "7728010866_checkout__box_details_discount",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf(
                        "/check-out/boxdetails"
                      ) > -1 &&
                      window.__store__.getState().basket.toJS().promoCode !== ""
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "15678350522",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Checkout | Your Details (discount)",
              apiName: "7728010866_checkout__your_details_discount",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf(
                        "/check-out/yourdetails"
                      ) > -1 &&
                      window.__store__.getState().basket.toJS().promoCode !== ""
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0 &&
                        window.__store__.getState().basket.toJS().promoCode !==
                          ""
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "15704200201",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://www.gousto.co.uk/",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV] GOU 011 Menu Page",
              apiName: "7728010866_conv_gou_011_menu_page",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf("menu") > -1 &&
                      document.querySelector('[data-testing="logoutButton"]')
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "15822900317",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "https://www.gousto.co.uk",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV] Order Confirmation",
              apiName: "7728010866_conv_order_confirmation",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.pathname.indexOf("/order-confirmation/") >
                      -1
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "15834060162",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              name: "[CONV] Sitewide",
              apiName: "7728010866_conv_sitewide",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "15975070162",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV] GOU 012 Order Confirmation",
              apiName: "7728010866_conv_gou_012_order_confirmation",
              tags: [],
              undoOnDeactivation: false,
              activationCode: function callbackFn(activate, options) {
                // Targeting condition
                function activationCondition() {
                  var orderPlaced = false;

                  for (var i = 0; i < window.dataLayer.length; i++) {
                    if (
                      typeof window.dataLayer[i].actionType !== "undefined" &&
                      window.dataLayer[i].actionType === "Order Placed"
                    ) {
                      orderPlaced = true;
                    }
                  }

                  return (
                    window.location.pathname.indexOf("/order-confirmation/") >
                      -1 && orderPlaced
                  );
                }

                // Wait for the dataLayer to load
                var checkDataLayer = setInterval(function () {
                  if (typeof window.dataLayer !== "undefined") {
                    if (
                      typeof window.dataLayer.push !== "undefined" &&
                      typeof window.__store__ !== "undefined" &&
                      typeof window.__store__.getState() !== "undefined" &&
                      document.querySelectorAll('img[alt="animation"]')
                        .length == 0
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            //console.log('OPTI IF ' + document.location.pathname);
                            options.isActive &&
                              activate({
                                isActive: false,
                              });
                            activate();
                          } else {
                            //console.log('OPTI ELSE ' + document.location.pathname);
                            options.isActive &&
                              activate({
                                isActive: false,
                              });
                            //remove test element
                          }
                        }
                      };
                    }
                  }
                }, 50);
              },
              deactivationEnabled: false,
              id: "16056710126",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/my-gousto",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "My Gousto",
              apiName: "7728010866_my_gousto",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "16101120033",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/my-subscription",
                    match: "simple",
                  },
                ],
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/subscription-settings",
                    match: "simple",
                  },
                ],
              ],
              name: "URL Targeting for [Rockets] Pause OSR test",
              apiName: "7728010866_url_targeting_for_rockets_pause_osr_test",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "16655170243",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/mygousto",
                    match: "substring",
                  },
                ],
              ],
              name: "MyGousto (new stack)",
              apiName: "7728010866_mygousto_new_stack",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "16827940109",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/signup",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Wizard",
              apiName: "7728010866_url_targeting_for_carrots_ndd_signup_test",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "16838760279",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              name: "Home Page Substring",
              apiName: "7728010866_home_page_substring",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "16846361783",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/my-deliveries",
                    match: "substring",
                  },
                ],
              ],
              name: "MyDeliveries",
              apiName: "7728010866_mydeliveries",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "17053390186",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "Signup Page (GST 006)",
              apiName: "7728010866_signup_page_gst_006",
              tags: [],
              undoOnDeactivation: false,
              // Optimizely X callback function
              activationCode: function callbackFn(activate, options) {
                // Targeting condition
                function activationCondition() {
                  //logged in users
                  return (
                    window.location.pathname.indexOf("/signup/box-size") > -1
                  );
                }

                // Wait for the dataLayer to load
                var checkDataLayer = setInterval(function () {
                  if (typeof window.dataLayer !== undefined) {
                    if (
                      typeof window.dataLayer.push !== undefined &&
                      typeof window.__store__ !== "undefined" &&
                      typeof window.__store__.getState() !== "undefined" &&
                      document.querySelectorAll('img[alt="animation"]')
                        .length == 0
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            //console.log('OPTI IF ' + document.location.pathname);
                            options.isActive &&
                              activate({
                                isActive: false,
                              });
                            activate();
                          } else {
                            //console.log('OPTI ELSE ' + document.location.pathname);
                            options.isActive &&
                              activate({
                                isActive: false,
                              });
                            //remove test element
                          }
                        }
                      };
                    }
                  }
                }, 50);
              },
              deactivationEnabled: false,
              id: "17391801857",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/signup/box-size",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Box Size",
              apiName: "7728010866_box_size",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "17443411002",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV] GST 004",
              apiName:
                "7728010866_url_targeting_for_rockets_debug_discounted_priceservi",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  function checkPromoCode() {
                    var promoCode = window.__store__.getState().basket.toJS()
                        .promoCode,
                      validCodes = [
                        "ABP633",
                        "BTY5030M",
                        "CC303",
                        "CC30MONTH",
                        "CC5030M",
                        "CC6030M",
                        "CL1935M",
                        "DFT1950M",
                        "DINNER-SEA-NB-FB-5030M",
                        "DINNER-SEA-NB-FBS-5030M",
                        "DINNER-SEA-NB-FBU-5030M",
                        "DINNER-SEA-NB-MB-5030M",
                        "DINNER-SEA-NB-MHD-5030M",
                        "DINNER-SEA-NB-MK-5030M",
                        "DINNER-SEA-NB-RB-5030M",
                        "DINNER-SEA-NB-RD-5030M",
                        "DTI-20M",
                        "DTI-404",
                        "DTI-B-5030",
                        "DTI-SB-5030",
                        "DTI-SB-5031",
                        "DTI-SB-P30M",
                        "ECOBEYOND60",
                        "EDR1940M",
                        "EDR1960M",
                        "EFR1950M",
                        "EM-P63-35M",
                        "ESB1960M",
                        "FOOD19E",
                        "GB-DINNER-DIS-NB-FB-5030M",
                        "GB-DINNER-SEA-BR-5030M",
                        "GB-DINNER-SEA-BR-EX-5030M",
                        "GB-DINNER-SEA-BR-EX-6030M",
                        "GB-DINNER-SEA-BR-G50-5030M",
                        "GB-DINNER-SEA-BR-G60-5030M",
                        "GB-DINNER-SEA-BR-GB-5030M",
                        "GB-DINNER-SEA-BR-GC-5030M",
                        "GB-DINNER-SEA-BR-GD-5030M",
                        "GB-DINNER-SEA-BR-GDI-5030M",
                        "GB-DINNER-SEA-BR-GO-5030M",
                        "GB-DINNER-SEA-BR-GP-5030M",
                        "GB-DINNER-SEA-BR-GPS-5030M",
                        "GB-DINNER-SEA-BR-GR-5030M",
                        "GB-DINNER-SEA-BR-GV-5030M",
                        "GB-DINNER-SEA-BR-JW-5030M",
                        "GB-DINNER-SEA-NB-BF-5030M",
                        "GB-DINNER-SEA-NB-EAF-5030M",
                        "GB-DINNER-SEA-NB-EX-5030M",
                        "GB-DINNER-SEA-NB-FD-5030M",
                        "GB-DINNER-SEA-NB-HMP-5030M",
                        "GB-DINNER-SEA-NB-MD-5030M",
                        "GB-DINNER-SEA-NB-MDS-5030M",
                        "GB-DINNER-SEA-NB-MPB-5030M",
                        "GB-DINNER-SEA-NB-MPRD-5030M",
                        "GB-DINNER-SEA-NB-PL-RB32-5030M",
                        "GB-DINNER-SEA-NB-PL-VR32-5030M",
                        "GB-DINNER-SEA-NB-SK-5030M",
                        "GB-DINNER-SEA-RB-GCK-5030M",
                        "GB-DINNER-SEA-RB-GRE-5030M",
                        "GOHENRY40M",
                        "GOODLORD50M",
                        "HOLLYSHAW",
                        "HSD1940M",
                        "HSD1950M",
                        "JOEWICKS",
                        "JOEWICKS1",
                        "JOEWICKS10",
                        "JOEWICKS19",
                        "JOEWICKS23",
                        "JOEWICKS26",
                        "JOEWICKS3",
                        "JOEWICKS30",
                        "JOEWICKS32",
                        "JOEWICKS35",
                        "JOEWICKS40",
                        "JOEWICKS40",
                        "JOEWICKS63",
                        "JUMP1960M",
                        "MAIL1950M",
                        "MAIL1955M",
                        "MISSGREEDYSHOME50M",
                        "MISSGREEDYSHOME60M",
                        "MONEYBOX1940M",
                        "MVC1950M",
                        "PERK6030M",
                        "PG6030",
                        "PROMO1942M",
                        "PUKKA50",
                        "QDC1935M",
                        "REVOLUT60M",
                        "SAVE1950M",
                        "SAVOO1950M",
                        "SDXO1940M",
                        "SKIM1950M",
                        "TASTY-C01-S03-P07",
                        "TASTY-C16-S01-P53-AC1-30M",
                        "TASTY-C16-S01-P53-AC2-30M",
                        "TASTY-C16-S01-P53-AC4-30M",
                        "TASTY-C16-S01-P53-FIONA1-30M",
                        "TASTY-C16-S01-P53-FIONA2-30M",
                        "TASTY-C16-S01-P53-FIONA4-30M",
                        "TASTY-C16-S01-P53-PJJ1-30M",
                        "TASTY-C16-S01-P53-PJJ2-30M",
                        "TASTY-C16-S01-P53-PJJ4-30M",
                        "TASTY-S01-AFF-P53-30M",
                        "TASTY-S01-H-P53-30M",
                        "TASTY-S01-HJW-P53-30M",
                        "TASTY-S01-JM-P53-30M",
                        "TASTY-S01-LAL12-P53-30M",
                        "TASTY-S01-MUMS-P53-30M",
                        "TASTY-S01-NETCS-P53-30M",
                        "TASTY-S01-P05-P53-30M",
                        "TASTY-S01-PETS-P53-30M",
                        "TASTY-S02-ATB-P53-30M",
                        "TASTY-S03-ATTR-P53-30M",
                        "TASTY-S04-INT-DIY-5030M",
                        "TASTY-S04-INT-FOOD-5030M",
                        "TASTY-S04-LAL-ATB-5030M",
                        "TASTY-S04-LAL-ATB5-7-5030M",
                        "TASTY-S21-IM-5030M",
                        "TCB1950M",
                        "THELIST1950M",
                        "VBOX19601M",
                        "VCUK1950M",
                        "XEXEC6030M",
                        "YBC1940M",
                      ];
                    if (promoCode === "") {
                      return true;
                    } else {
                      // return validCodes.indexOf(promoCode) > -1 || promoCode.match(/[a-zA-Z]{3,5}[0-9]{8}/);
                      return validCodes.indexOf(promoCode) > -1;
                    }
                  }

                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf("menu") > -1 &&
                      window.__store__.getState().user.toJS().id === "" &&
                      checkPromoCode()
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "17462712445",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV] GST 004",
              apiName: "7728010866_conv_gst_004",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  function checkPromoCode() {
                    var promoCode = window.__store__.getState().basket.toJS()
                        .promoCode,
                      validCodes = [
                        "ABP633",
                        "BTY5030M",
                        "CC303",
                        "CC30MONTH",
                        "CC5030M",
                        "CC6030M",
                        "CL1935M",
                        "DFT1950M",
                        "DINNER-SEA-NB-FB-5030M",
                        "DINNER-SEA-NB-FBS-5030M",
                        "DINNER-SEA-NB-FBU-5030M",
                        "DINNER-SEA-NB-MB-5030M",
                        "DINNER-SEA-NB-MHD-5030M",
                        "DINNER-SEA-NB-MK-5030M",
                        "DINNER-SEA-NB-RB-5030M",
                        "DINNER-SEA-NB-RD-5030M",
                        "DTI-20M",
                        "DTI-404",
                        "DTI-B-5030",
                        "DTI-SB-5030",
                        "DTI-SB-5031",
                        "DTI-SB-P30M",
                        "ECOBEYOND60",
                        "EDR1940M",
                        "EDR1960M",
                        "EFR1950M",
                        "EM-P63-35M",
                        "ESB1960M",
                        "FOOD19E",
                        "GB-DINNER-DIS-NB-FB-5030M",
                        "GB-DINNER-SEA-BR-5030M",
                        "GB-DINNER-SEA-BR-EX-5030M",
                        "GB-DINNER-SEA-BR-EX-6030M",
                        "GB-DINNER-SEA-BR-G50-5030M",
                        "GB-DINNER-SEA-BR-G60-5030M",
                        "GB-DINNER-SEA-BR-GB-5030M",
                        "GB-DINNER-SEA-BR-GC-5030M",
                        "GB-DINNER-SEA-BR-GD-5030M",
                        "GB-DINNER-SEA-BR-GDI-5030M",
                        "GB-DINNER-SEA-BR-GO-5030M",
                        "GB-DINNER-SEA-BR-GP-5030M",
                        "GB-DINNER-SEA-BR-GPS-5030M",
                        "GB-DINNER-SEA-BR-GR-5030M",
                        "GB-DINNER-SEA-BR-GV-5030M",
                        "GB-DINNER-SEA-BR-JW-5030M",
                        "GB-DINNER-SEA-NB-BF-5030M",
                        "GB-DINNER-SEA-NB-EAF-5030M",
                        "GB-DINNER-SEA-NB-EX-5030M",
                        "GB-DINNER-SEA-NB-FD-5030M",
                        "GB-DINNER-SEA-NB-HMP-5030M",
                        "GB-DINNER-SEA-NB-MD-5030M",
                        "GB-DINNER-SEA-NB-MDS-5030M",
                        "GB-DINNER-SEA-NB-MPB-5030M",
                        "GB-DINNER-SEA-NB-MPRD-5030M",
                        "GB-DINNER-SEA-NB-PL-RB32-5030M",
                        "GB-DINNER-SEA-NB-PL-VR32-5030M",
                        "GB-DINNER-SEA-NB-SK-5030M",
                        "GB-DINNER-SEA-RB-GCK-5030M",
                        "GB-DINNER-SEA-RB-GRE-5030M",
                        "GOHENRY40M",
                        "GOODLORD50M",
                        "HOLLYSHAW",
                        "HSD1940M",
                        "HSD1950M",
                        "JOEWICKS",
                        "JOEWICKS1",
                        "JOEWICKS10",
                        "JOEWICKS19",
                        "JOEWICKS23",
                        "JOEWICKS26",
                        "JOEWICKS3",
                        "JOEWICKS30",
                        "JOEWICKS32",
                        "JOEWICKS35",
                        "JOEWICKS40",
                        "JOEWICKS40",
                        "JOEWICKS63",
                        "JUMP1960M",
                        "MAIL1950M",
                        "MAIL1955M",
                        "MISSGREEDYSHOME50M",
                        "MISSGREEDYSHOME60M",
                        "MONEYBOX1940M",
                        "MVC1950M",
                        "PERK6030M",
                        "PG6030",
                        "PROMO1942M",
                        "PUKKA50",
                        "QDC1935M",
                        "REVOLUT60M",
                        "SAVE1950M",
                        "SAVOO1950M",
                        "SDXO1940M",
                        "SKIM1950M",
                        "TASTY-C01-S03-P07",
                        "TASTY-C16-S01-P53-AC1-30M",
                        "TASTY-C16-S01-P53-AC2-30M",
                        "TASTY-C16-S01-P53-AC4-30M",
                        "TASTY-C16-S01-P53-FIONA1-30M",
                        "TASTY-C16-S01-P53-FIONA2-30M",
                        "TASTY-C16-S01-P53-FIONA4-30M",
                        "TASTY-C16-S01-P53-PJJ1-30M",
                        "TASTY-C16-S01-P53-PJJ2-30M",
                        "TASTY-C16-S01-P53-PJJ4-30M",
                        "TASTY-S01-AFF-P53-30M",
                        "TASTY-S01-H-P53-30M",
                        "TASTY-S01-HJW-P53-30M",
                        "TASTY-S01-JM-P53-30M",
                        "TASTY-S01-LAL12-P53-30M",
                        "TASTY-S01-MUMS-P53-30M",
                        "TASTY-S01-NETCS-P53-30M",
                        "TASTY-S01-P05-P53-30M",
                        "TASTY-S01-PETS-P53-30M",
                        "TASTY-S02-ATB-P53-30M",
                        "TASTY-S03-ATTR-P53-30M",
                        "TASTY-S04-INT-DIY-5030M",
                        "TASTY-S04-INT-FOOD-5030M",
                        "TASTY-S04-LAL-ATB-5030M",
                        "TASTY-S04-LAL-ATB5-7-5030M",
                        "TASTY-S21-IM-5030M",
                        "TCB1950M",
                        "THELIST1950M",
                        "VBOX19601M",
                        "VCUK1950M",
                        "XEXEC6030M",
                        "YBC1940M",
                      ];
                    if (promoCode === "") {
                      return true;
                    } else {
                      // return validCodes.indexOf(promoCode) > -1 || promoCode.match(/[a-zA-Z]{3,5}[0-9]{8}/);
                      return validCodes.indexOf(promoCode) > -1;
                    }
                  }

                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf("menu") > -1 &&
                      window.__store__.getState().user.toJS().id === "" &&
                      checkPromoCode()
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== undefined) {
                      if (
                        typeof window.dataLayer.push !== undefined &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "17473862688",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/check-out/*",
                    match: "regex",
                  },
                ],
              ],
              activationType: "dom_changed",
              name: "Checkout DOM Changes",
              apiName: "7728010866_checkout_dom_changes",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "17593720385",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "http://staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              name: "Home Page - Immediately, Simple Match",
              apiName: "7728010866_home_page__immediately_simple_match",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "17798100010",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "GST 021 | Checkout | Your Details",
              apiName: "7728010866_gst_021__checkout__your_details",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf(
                        "/check-out/yourdetails"
                      ) > -1
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (
                        typeof window.dataLayer.push !== "undefined" &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "17810620899",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "staging-frontend.gousto.info",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "GST 021 | Checkout | Payment",
              apiName: "7728010866_gst_021__checkout__payment",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf("/check-out/payment") >
                      -1
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (
                        typeof window.dataLayer.push !== "undefined" &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "17825441473",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "GST 019",
              apiName: "7728010866_gst_019",
              tags: [],
              undoOnDeactivation: false,
              // Optimizely X callback function
              activationCode: function callbackFn(activate, options) {
                function checkPromoCode() {
                  var promoCode = window.__store__.getState().basket.toJS()
                      .promoCode,
                    validCodes = [
                      "ABP633",
                      "BERKB5030",
                      "BTY1960M",
                      "BTY5030M",
                      "DINNER-SEA-NB-FB-5030M",
                      "DINNER-SEA-NB-FBS-5030M",
                      "DINNER-SEA-NB-FBU-5030M",
                      "DINNER-SEA-NB-MB-5030M",
                      "DINNER-SEA-NB-MHD-5030M",
                      "DINNER-SEA-NB-MK-5030M",
                      "DINNER-SEA-NB-RB-5030M",
                      "DINNER-SEA-NB-RD-5030M",
                      // 20 DISCOUNT 'DTI-20M',
                      "DTI-404",
                      "DTI-B-5030",
                      "DTI-SB-5030",
                      "DTI-SB-5031",
                      "DTI-SB-P30M",
                      "CC303",
                      "CC30MONTH",
                      "CC5030M",
                      "CC6030M",
                      "CL1935M",
                      "CLOUDINT5030",
                      "FOOD19E",
                      "GB-DINNER-DIS-NB-FB-5030M",
                      "GB-DINNER-SEA-BR-5030M",
                      "GB-DINNER-SEA-BR-EX-5030M",
                      "GB-DINNER-SEA-BR-EX-6030M",
                      "GB-DINNER-SEA-BR-G50-5030M",
                      "GB-DINNER-SEA-BR-G60-5030M",
                      "GB-DINNER-SEA-BR-GB-5030M",
                      "GB-DINNER-SEA-BR-GC-5030M",
                      "GB-DINNER-SEA-BR-GD-5030M",
                      "GB-DINNER-SEA-BR-GDI-5030M",
                      "GB-DINNER-SEA-BR-GO-5030M",
                      "GB-DINNER-SEA-BR-GP-5030M",
                      "GB-DINNER-SEA-BR-GPS-5030M",
                      "GB-DINNER-SEA-BR-GR-5030M",
                      "GB-DINNER-SEA-BR-GV-5030M",
                      "GB-DINNER-SEA-BR-JW-5030M",
                      "GB-DINNER-SEA-NB-BF-5030M",
                      "GB-DINNER-SEA-NB-EAF-5030M",
                      "GB-DINNER-SEA-NB-EX-5030M",
                      "GB-DINNER-SEA-NB-FD-5030M",
                      "GB-DINNER-SEA-NB-HMP-5030M",
                      "GB-DINNER-SEA-NB-MD-5030M",
                      "GB-DINNER-SEA-NB-MDS-5030M",
                      "GB-DINNER-SEA-NB-MPB-5030M",
                      "GB-DINNER-SEA-NB-MPRD-5030M",
                      "GB-DINNER-SEA-NB-PL-RB32-5030M",
                      "GB-DINNER-SEA-NB-PL-VR32-5030M",
                      "GB-DINNER-SEA-NB-SK-5030M",
                      "GB-DINNER-SEA-RB-GCK-5030M",
                      "GB-DINNER-SEA-RB-GRE-5030M",
                      "COOK35",
                      "COUNTRY1960M",
                      "CWD1940M",
                      "DFC1940M",
                      "DFT1940M",
                      "DFT1950M",
                      "EARTH1950M",
                      "ECOBEYOND60",
                      "EDR1940M",
                      "EDR1960M",
                      "EFR1950M",
                      "EM-P63-35M",
                      "ESB1960M",
                      "EXPERT1950M",
                      "GATE1960M",
                      "GOHENRY40M",
                      "GOODLORD50M",
                      "GORAISE1935M",
                      "GREEN1942M",
                      "GYMILES1950M",
                      "HOLLYSHAW",
                      "HONEY1950M",
                      "HOUSEOFH5030",
                      "HSD1940M",
                      "HSD1950M",
                      "ICOM12301M",
                      "JOEWICKS",
                      "JOEWICKS1",
                      "JOEWICKS10",
                      "JOEWICKS19",
                      "JOEWICKS23",
                      "JOEWICKS26",
                      "JOEWICKS3",
                      "TASTY-C01-S03-P07",
                      "JOEWICKS30",
                      "JOEWICKS32",
                      "JOEWICKS35",
                      "JOEWICKS40",
                      "JOEWICKS63",
                      "JUMP1960M",
                      "TASTY-S01-AFF-P53-30M",
                      "TASTY-S01-H-P53-30M",
                      "TASTY-S01-HJW-P53-30M",
                      "TASTY-S01-JM-P53-30M",
                      "TASTY-S01-LAL12-P53-30M",
                      "TASTY-S01-MUMS-P53-30M",
                      "TASTY-S01-NETCS-P53-30M",
                      "TASTY-S01-P05-P53-30M",
                      "TASTY-S01-PETS-P53-30M",
                      "TASTY-S02-ATB-P53-30M",
                      "TASTY-S03-ATTR-P53-30M",
                      "TASTY-S04-INT-DIY-5030M",
                      "TASTY-S04-INT-FOOD-5030M",
                      "TASTY-S04-LAL-ATB-5030M",
                      "TASTY-S04-LAL-ATB5-7-5030M",
                      "TASTY-S21-IM-5030M",
                      "MAIL1950M",
                      // 55 DISCOUNT 'MAIL1955M',
                      "MAIL1960M",
                      "MANDCO1960M",
                      "MISSGREEDYSHOME50M",
                      "MISSGREEDYSHOME60M",
                      "MONEYBOX1940M",
                      "MVC1950M",
                      "MVC1960M",
                      "NHS1940M",
                      "PERK6030M",
                      "PG6030",
                      "PROMO1942M",
                      "PROMO30M",
                      "PROMO50M",
                      "PUKKA50",
                      "QDC1935M",
                      "QDC1950M",
                      "REVOLUT60M",
                      "SAVE1950M",
                      "SAVE1960M",
                      "SAVOO1950M",
                      "SDXO1940M",
                      "SHEER1940M",
                      "SHOPMY5030",
                      "SKIM1950M",
                      "SLOTHM35",
                      "SPORTSHEROES1942M",
                      "TASTY-C16-S01-P53-AC1-30M",
                      "TASTY-C16-S01-P53-AC2-30M",
                      "TASTY-C16-S01-P53-AC4-30M",
                      "TASTY-C16-S01-P53-FIONA1-30M",
                      "TASTY-C16-S01-P53-FIONA2-30M",
                      "TASTY-C16-S01-P53-FIONA4-30M",
                      "TASTY-C16-S01-P53-PJJ1-30M",
                      "TASTY-C16-S01-P53-PJJ2-30M",
                      "TASTY-C16-S01-P53-PJJ4-30M",
                      "TCB1935M",
                      "TCB1950M",
                      "TESB1960M",
                      "THELIST1950M",
                      "THELIST1960M",
                      "TS1960M",
                      "VBOX1950M",
                      "VBOX19601M",
                      "VBUTLER5030",
                      "VCLOUD1950M",
                      "VCLOUD1960M",
                      "VCUK1950M",
                      "XEXEC6030M",
                      "YBC1940M",
                      "GB-DINNER-SEA-BR-3030M",
                      "GB-DINNER-SEA-BR-RLSA-3030M",
                      "GB-DINNER-SEA-BR-G30-3030M",
                      "GB-DINNER-SEA-BR-G40-3030M",
                      "GB-DINNER-SEA-BR-G50-3030M",
                      "GB-DINNER-SEA-BR-G60-3030M",
                      "GB-DINNER-SEA-BR-GB-3030M",
                      "GB-DINNER-SEA-RB-GCK-3030M",
                      "GB-DINNER-SEA-BR-GC-3030M",
                      "GB-DINNER-SEA-BR-GD-3030M",
                      "GB-DINNER-SEA-BR-GDI-3030M",
                      "GB-DINNER-SEA-BR-GF-3030M",
                      "GB-DINNER-SEA-BR-HM-5030M",
                      "GB-DINNER-SEA-BR-JW-3030M",
                      "GB-DINNER-SEA-BR-GO-3030M",
                      "GB-DINNER-SEA-BR-GP-3030M",
                      "GB-DINNER-SEA-BR-GPS-3030M",
                      "GB-DINNER-SEA-RB-GRE-3030M",
                      "GB-DINNER-SEA-BR-GR-3030M",
                      "GB-DINNER-SEA-BR-GVR-3030M",
                      "GB-DINNER-SEA-BR-GV-3030M",
                    ];
                  if (promoCode === "") {
                    return false;
                  } else {
                    return validCodes.indexOf(promoCode) > -1;
                  }
                }
                // Targeting condition
                function activationCondition() {
                  //logged in users
                  return (
                    window.location.pathname == "/signup/box-size" &&
                    window.__store__.getState().user.toJS().id === "" &&
                    checkPromoCode()
                  );
                }

                // Wait for the dataLayer to load
                var checkDataLayer = setInterval(function () {
                  if (typeof window.dataLayer !== "undefined") {
                    if (
                      typeof window.dataLayer.push !== "undefined" &&
                      typeof window.__store__ !== "undefined" &&
                      typeof window.__store__.getState() !== "undefined" &&
                      document.querySelectorAll('img[alt="animation"]')
                        .length == 0
                    ) {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            //console.log('OPTI IF ' + document.location.pathname);
                            options.isActive &&
                              activate({
                                isActive: false,
                              });
                            activate();
                          } else {
                            //console.log('OPTI ELSE ' + document.location.pathname);
                            options.isActive &&
                              activate({
                                isActive: false,
                              });
                            //remove test element
                          }
                        }
                      };
                    }
                  }
                }, 50);
              },
              deactivationEnabled: false,
              id: "17831730317",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "callback",
              name: "GST 021 | Checkout | Box Details",
              apiName: "7728010866_gst_021__checkout__box_details",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    //logged in users
                    return (
                      window.location.pathname.indexOf(
                        "/check-out/boxdetails"
                      ) > -1
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (
                        typeof window.dataLayer.push !== "undefined" &&
                        typeof window.__store__ !== "undefined" &&
                        typeof window.__store__.getState() !== "undefined" &&
                        document.querySelectorAll('img[alt="animation"]')
                          .length == 0
                      ) {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              //console.log('OPTI IF ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            } else {
                              //console.log('OPTI ELSE ' + document.location.pathname);
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              //remove test element
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "17843450922",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              name:
                "URL Targeting for [Haricots] Add info about blocked resubscriptions",
              apiName:
                "7728010866_url_targeting_for_haricots_add_info_about_blocked_res",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "17906730323",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/signup/delivery-options",
                    match: "simple",
                  },
                ],
              ],
              activationType: "callback",
              name: "[CONV]Signup 3 - Delivery Options",
              apiName: "7728010866_convsignup_3__delivery_options",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.pathname === "/signup/delivery-options"
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (typeof window.dataLayer.push !== "undefined") {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              options.isActive && activate({ isActive: false });
                              activate();
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "17956980407",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/signup/box-size",
                    match: "simple",
                  },
                ],
                ["or", { type: "element_present", value: ".G57a4b7" }],
              ],
              name: "Signup box size simple match",
              apiName: "7728010866_signup_boxsize",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18077500202",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              name:
                "URL Targeting for [Haricots] Limited Capacity Notice on MyGousto ",
              apiName:
                "7728010866_url_targeting_for_haricots_limited_capacity_notice_on",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18136440061",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/signup/*",
                    match: "regex",
                  },
                ],
              ],
              activationType: "callback",
              name: "[Beetroots][CRO] Delivery Education Wizard",
              apiName: "7728010866_beetrootscro_delivery_education_wizard",
              tags: [],
              undoOnDeactivation: false,
              activationCode:
                /**
                 * Sample Activation Function
                 * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
                 * @param {Function} activate - Call this function when you want to activate the page.
                 * @param {Object} options - An object containing Page information.
                 */

                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.pathname === "/signup/delivery-options"
                    );
                  }

                  function isBoxSizeStep() {
                    return window.location.pathname === "/signup/box-size";
                  }

                  function isPostCodeStep() {
                    return window.location.pathname === "/signup/postcode";
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (typeof window.dataLayer.push !== "undefined") {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        if (isBoxSizeStep() || isPostCodeStep()) {
                          if (document.querySelector(".Gd598eb")) {
                            document
                              .querySelector(".Gd598eb")
                              .classList.remove("pos-relative");
                          }
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              if (options.isActive) {
                                activate({ isActive: false });
                              }
                              activate();
                            }
                            if (isBoxSizeStep() || isPostCodeStep()) {
                              if (document.querySelector(".Gd598eb")) {
                                document
                                  .querySelector(".Gd598eb")
                                  .classList.remove("pos-relative");
                              }
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "18263214171",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-helpcentre.gousto.info/",
                    match: "simple",
                  },
                ],
              ],
              name: "Help Centre ",
              apiName: "7728010866_help_centre_",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18276462865",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "[Beetroots] Menu - hide progress bar",
              apiName: "7728010866_beetroots_menu_for_new_users",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname === "/menu";
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (typeof window.dataLayer.push !== "undefined") {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (
                            (data.event === "userAction" &&
                              data.actionType === "change_basket_slot") ||
                            data.event === "gtm.historyChange"
                          ) {
                            if (
                              activationCondition() &&
                              window.__store__ &&
                              window.__store__.getState().user.toJS().id === ""
                            ) {
                              if (options.isActive) {
                                activate({ isActive: false });
                              }
                              activate();
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "18309385304",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/my-subscription",
                    match: "simple",
                  },
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/my-details",
                    match: "simple",
                  },
                ],
              ],
              name: "[Beetroots] Change card",
              apiName: "7728010866_beetroots_change_card",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18394941581",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/check-out/*",
                    match: "regex",
                  },
                ],
              ],
              activationType: "callback",
              name: "[Beetroots][CRO] Promo code CTA in checkout flow",
              apiName:
                "7728010866_beetrootscro_promo_code_cta_in_checkout_flow",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.pathname === "/check-out/aboutyou" ||
                      window.location.pathname === "/check-out/boxdetails" ||
                      window.location.pathname === "/check-out/yourdetails" ||
                      window.location.pathname === "/check-out/delivery" ||
                      window.location.pathname === "/check-out/payment"
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (typeof window.dataLayer.push !== "undefined") {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (
                            data.event === "gtm.historyChange" ||
                            data.actionType === "Promocode Removed"
                          ) {
                            if (activationCondition()) {
                              if (options.isActive) {
                                activate({ isActive: false });
                              }
                              activate();
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "18527340407",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/box-prices",
                    match: "simple",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "[Beetroots][CRO] Box Prices page redesign",
              apiName: "7728010866_beetrootscro_box_prices_page_redesign",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18580082635",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/check-out/delivery",
                    match: "simple",
                  },
                ],
              ],
              name: "[Beetroots] Check-out delivery",
              apiName: "7728010866_beetroots_checkout_delivery",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18616490574",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "simple",
                  },
                ],
              ],
              name: "[Beetroots] Homepage immediately",
              apiName: "7728010866_beetrootscro_homepage_mvt",
              tags: [],
              undoOnDeactivation: false,
              activationCode: function callbackFn(activate, options) {
                // Targeting condition
                function activationCondition() {
                  return window.location.pathname === "/";
                }

                // Wait for the dataLayer to load
                var checkDataLayer = setInterval(function () {
                  if (typeof window.dataLayer !== "undefined") {
                    if (typeof window.dataLayer.push !== "undefined") {
                      clearInterval(checkDataLayer);

                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }

                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);

                        // Deactivate and reactivate the test on route change
                        if (
                          data.event === "gtm.dom" ||
                          data.event === "gtm.load" ||
                          data.event === "gtm.historyChange"
                        ) {
                          if (activationCondition()) {
                            options.isActive &&
                              activate({
                                isActive: false,
                              });
                            activate();
                          }
                        }
                      };
                    }
                  }
                }, 50);
              },
              deactivationEnabled: false,
              id: "18651193240",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "staging-frontend.gousto.info/signup/*",
                    match: "regex",
                  },
                ],
              ],
              activationType: "callback",
              name:
                "[Rockets] - Signup: Delivery options [Taste preferences exp.]",
              apiName:
                "7728010866_rockets__signup_delivery_options_taste_preferences_ex",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode: function callbackFn(activate, options) {
                // Targeting condition
                function activationCondition() {
                  return (
                    window.location.pathname === "/signup/delivery-options"
                  );
                }
                // Wait for the dataLayer to load
                var checkDataLayer = setInterval(function () {
                  if (typeof window.dataLayer !== "undefined") {
                    if (typeof window.dataLayer.push !== "undefined") {
                      clearInterval(checkDataLayer);
                      // Activate test when landing directly on the page
                      if (activationCondition()) {
                        activate();
                      }
                      // Intercept dataLayer route/history events
                      var getPushData = window.dataLayer.push;
                      window.dataLayer.push = function (data) {
                        getPushData.apply(this, arguments);
                        // Deactivate and reactivate the test on route change
                        if (data.event === "gtm.historyChange") {
                          if (activationCondition()) {
                            if (options.isActive) {
                              activate({ isActive: false });
                            }
                            activate();
                          }
                        }
                      };
                    }
                  }
                }, 50);
              },
              deactivationEnabled: false,
              id: "18774784899",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "simple",
                  },
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/signup/*",
                    match: "regex",
                  },
                ],
              ],
              activationType: "callback",
              name: "[Beetroots][CRO] Wizard pricing",
              apiName: "7728010866_beetrootscro_wizard_pricing",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return (
                      window.location.pathname === "/" ||
                      window.location.pathname === "/signup/delivery-options" ||
                      window.location.pathname === "/signup/box-size" ||
                      window.location.pathname === "/signup/postcode"
                    );
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (typeof window.dataLayer.push !== "undefined") {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              if (options.isActive) {
                                activate({ isActive: false });
                              }
                              activate();
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "18790893332",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/menu",
                    match: "simple",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "[Beetroots][CRO] Checkout Redesign",
              apiName: "7728010866_beetrootscro_checkout_redesign",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18815290811",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "simple",
                  },
                ],
              ],
              activationType: "callback",
              name: " [Beetroots] Apply promo code by clicking get started",
              apiName:
                "7728010866__beetroots_apply_promo_code_by_clicking_get_started",
              tags: [],
              undoOnDeactivation: false,
              /**
               * Sample Activation Function
               * For complete documentation, see https://developers.optimizely.com/x/solutions/javascript/code-samples/index.html#page-activation
               * @param {Function} activate - Call this function when you want to activate the page.
               * @param {Object} options - An object containing Page information.
               */

              activationCode:
                // Optimizely X callback function
                function callbackFn(activate, options) {
                  // Targeting condition
                  function activationCondition() {
                    return window.location.pathname === "/";
                  }

                  // Wait for the dataLayer to load
                  var checkDataLayer = setInterval(function () {
                    if (typeof window.dataLayer !== "undefined") {
                      if (typeof window.dataLayer.push !== "undefined") {
                        clearInterval(checkDataLayer);

                        // Activate test when landing directly on the page
                        if (activationCondition()) {
                          activate();
                        }

                        // Intercept dataLayer route/history events
                        var getPushData = window.dataLayer.push;
                        window.dataLayer.push = function (data) {
                          getPushData.apply(this, arguments);

                          // Deactivate and reactivate the test on route change
                          if (data.event === "gtm.historyChange") {
                            if (activationCondition()) {
                              options.isActive &&
                                activate({
                                  isActive: false,
                                });
                              activate();
                            }
                          }
                        };
                      }
                    }
                  }, 50);
                },
              deactivationEnabled: false,
              id: "18860321320",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/check-out.*",
                    match: "regex",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Checkout URL changes",
              apiName: "7728010866_checkout_url_changes",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "18931532675",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name:
                "[Beetroots][CRO] Redirect to wizard from box prices and menu",
              apiName:
                "7728010866_beetrootscro_redirect_to_wizard_from_box_prices_and_m",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "19036790390",
            },
            {
              category: "other",
              staticConditions: [
                "or",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/box-prices",
                    match: "simple",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "Box prices page",
              apiName: "7728010866_box_prices_page",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "19054460096",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/check-out/payment",
                    match: "simple",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "URL Targeting for [Rockets] First month promo offset",
              apiName: "7728010866_url_targeting_for_first_month_promo_offset",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "19184040995",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "staging-frontend.gousto.info/my-",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "staging-frontend.gousto.info/rate-my-recipes",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "http://frontend.gousto.local/my-gousto",
                    match: "substring",
                  },
                  {
                    type: "url",
                    value: "staging-frontend.gousto.info/subscription-settings",
                    match: "simple",
                  },
                ],
              ],
              activationType: "dom_changed",
              name:
                "URL Targeting for [Jalape\u00f1os]New Subscription Settings page",
              apiName:
                "7728010866_url_targeting_for_new_subscription_settings_page",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "19573831202",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging.gousto.info/my-subscription",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "URL Targeting for [Rockets] multi skip test",
              apiName: "7728010866_url_targeting_for_rockets_multi_skip_test",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "19883970607",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value:
                      "https://staging-frontend.gousto.info/rate-my-recipes",
                    match: "simple",
                  },
                ],
              ],
              name: "rate-my-recipes",
              apiName: "7728010866_ratemyrecipes",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "20043383374",
            },
            {
              category: "other",
              staticConditions: [
                "and",
                [
                  "or",
                  {
                    type: "url",
                    value: "https://staging-frontend.gousto.info/signup",
                    match: "substring",
                  },
                ],
              ],
              activationType: "url_changed",
              name: "[CRO] Signup wizard",
              apiName: "7728010866_cro_signup_wizard",
              tags: [],
              undoOnDeactivation: false,
              deactivationEnabled: false,
              id: "20113182003",
            },
          ],
          projectId: "7728010866",
          namespace: "7728010866",
          tagGroups: [],
          integrationSettings: [],
          interestGroups: [],
          dimensions: [
            {
              segmentId: null,
              id: "15721500266",
              apiName: "basket_seen",
              name: "Basket seen",
            },
            {
              segmentId: null,
              id: "16902715597",
              apiName: "gou017_addon_type",
              name: "[GOU017] Addon type",
            },
            {
              segmentId: null,
              id: "16918004950",
              apiName: "gou017_protein_type",
              name: "[GOU017] Protein type ",
            },
          ],
          audiences: [
            {
              conditions: [
                "and",
                [
                  "or",
                  [
                    "not",
                    [
                      "or",
                      {
                        value: "",
                        type: "cookies",
                        name: "v1_oauth_remember",
                        match: "exists",
                      },
                    ],
                  ],
                ],
              ],
              id: "14095560011",
              name: "Logged out (cookie) visitors",
            },
            {
              conditions: [
                "and",
                [
                  "or",
                  [
                    "or",
                    {
                      value: "true",
                      type: "cookies",
                      name: "cfQA",
                      match: "exact",
                    },
                  ],
                ],
              ],
              id: "14542860473",
              name: "[CONV]QA mode",
            },
          ],
          anonymizeIP: false,
          projectJS: function () {
            window.optimizely = window.optimizely || [];
            window["optimizely"] = window["optimizely"] || [];
            window.optimizely.push([
              "setCookieDomain",
              window.location.hostname,
            ]);

            window.springBoard = window.springBoard || [];
            window.springBoard.urlParams = {};
            window.springBoard.revision = 3.11;

            /**
             * Function to create browser cookies
             * @param  {string}     name    Name of the cookie
             * @param  {string}     value   Value fo the cookie
             * @param  {integer}    days    Length of cookie in days. Leave blank to never expire
             * @return {null}
             */
            window.springBoard.createCookie = function (name, value, days) {
              if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                var expires = "; expires=" + date.toGMTString();
              } else var expires = "";
              var cDomain =
                typeof window.springBoard.cookieDomain !== "undefined"
                  ? window.springBoard.cookieDomain
                  : document.location.host.indexOf("www.") == 0
                  ? document.location.host.substr(
                      3,
                      document.location.host.length
                    )
                  : document.location.host;
              document.cookie =
                escape(name) +
                "=" +
                escape(value) +
                expires +
                ";domain=" +
                cDomain +
                ";path=/" +
                (document.location.protocol == "https:" ? "; secure" : "");

              return null;
            };

            /**
             * Function to read values of browser cookies
             * @param  {string}     name    Name of cookie to read
             * @return {string|null}        Value of cookie. Returns null if cookie doesn't exist
             */
            window.springBoard.readCookie = function (name) {
              var nameEQ = escape(name) + "=";
              var ca = document.cookie.split(";");
              for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0)
                  return unescape(c.substring(nameEQ.length, c.length));
              }
              return null;
            };

            /**
             * Function to delete a browser cookie
             * @param  {string}     name    Name of cookie to delete
             * @return {null}
             */
            window.springBoard.eraseCookie = function (name) {
              window.springBoard.createCookie(name, "", -1);

              return null;
            };

            /**
             * Function to add custom CSS to a page
             * @param {string}      css     A string of CSS to add to a page
             */
            window.springBoard.addCss = function (css) {
              var head = document.getElementsByTagName("head")[0],
                style = document.createElement("style");

              style.type = "text/css";
              if (style.styleSheet) {
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
              head.appendChild(style);
            };

            /**
             * Function to add custom Javascript to a page
             * @param {string}  js   The string of Javascript to add
             */
            window.springBoard.addJS = function (js) {
              var head = document.getElementsByTagName("head")[0],
                script = document.createElement("script");

              script.type = "text/javascript";
              script.src = js;
              head.appendChild(script);
            };

            //on
            window.springBoard.on = function (eventType, selector, action) {
              document.addEventListener(eventType, function (e) {
                var target = e.target;
                if (target.matches(selector)) {
                  action(e);
                } else {
                  while (target && target.parentNode !== document) {
                    target = target.parentNode;
                    if (!target) {
                      return;
                    } // If element doesn't exist

                    if (target.matches(selector)) {
                      action(e);
                    }
                  }
                }
              });
            };

            /**
             * Function to set URL parameters
             *
             */
            window.onpopstate = function () {
              var match,
                pl = /\+/g, // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) {
                  return decodeURIComponent(s.replace(pl, " "));
                },
                query = window.location.search.substring(1);

              window.springBoard.urlParams = {};
              while ((match = search.exec(query)))
                window.springBoard.urlParams[decode(match[1])] = decode(
                  match[2]
                );
            };
            window.onpopstate();

            // Check if in QA and add/remove cookie
            window.springBoard.checkCookies = function () {
              if (window.springBoard.urlParams["cfQA"]) {
                var cfQA = window.springBoard.urlParams["cfQA"].toLowerCase();
                if (cfQA == "true") {
                  window.springBoard.createCookie("cfQA", "true");
                }
                if (cfQA == "false") {
                  window.springBoard.eraseCookie("cfQA");
                }
              }

              // Check if in Disabled Optimizely mode and add/remove cookie
              if (window.springBoard.urlParams["cvDisable"]) {
                var cvDisable = window.springBoard.urlParams[
                  "cvDisable"
                ].toLowerCase();
                if (cvDisable == "true") {
                  window.springBoard.createCookie("cvDisable", "true");
                  window.optimizely = window.optimizely || [];
                  window.optimizely.push(["disable"]);
                }
                if (cvDisable == "false") {
                  window.springBoard.eraseCookie("cvDisable");
                }
              }

              // Disabled Window Display
              if (window.springBoard.readCookie("cvDisable") == "true") {
                document.title = "[DISABLED] " + document.title;
              }
            };
            window.springBoard.checkCookies();

            window.springBoard.log = function (value) {
              if (window.springBoard.readCookie("cfQA")) {
                console.dir(value);
              }
            };

            //END SpringBoard functionality

            window.optimizely.push({
              type: "addListener",
              filter: {
                type: "analytics",
                name: "trackEvent",
              },
              handler: function (event) {
                //events for number of recipes in the completed order:
                if (/\/order\/\d+\/summary/.test(document.location.pathname)) {
                  //check URL of confirmation page
                  var cvCheckRecipes = setInterval(function () {
                    if (
                      document.readyState === "interactive" ||
                      document.readyState === "complete"
                    ) {
                      clearInterval(cvCheckRecipes);
                      //Number of recipes
                      var cvBoxSize = document.querySelectorAll(
                        ".ordersummary-recipes .ordersummary-recipe picture"
                      ).length;
                      if (event.data.name === "[CONV]Order confirmed") {
                        switch (cvBoxSize) {
                          case 2:
                            window.optimizely.push({
                              type: "event",
                              eventName: "conv_order_confirmed_2_recipes",
                            });
                            break;
                          case 3:
                            window.optimizely.push({
                              type: "event",
                              eventName: "conv_order_confirmed_3_recipes",
                            });
                            break;
                          case 4:
                            window.optimizely.push({
                              type: "event",
                              eventName: "conv_order_confirmed_4_recipes",
                            });
                            break;
                          default:
                          //window.springBoard.log('default');
                        }
                      }
                    }
                  }, 50);
                }
              },
            });

            try {
              //CONVERSION - SEGMENTS
              //Logged in/out on menu page
              if (document.location.pathname.indexOf("menu") > -1) {
                if (
                  document.querySelector('[data-testing="loginButton"]') !==
                  null
                ) {
                  window.optimizely.push({
                    type: "user",
                    attributes: {
                      conv_logged_in_menu: "yes",
                    },
                  });
                } else if (
                  document.querySelector('[data-testing="logoutButton"]') !==
                  null
                ) {
                  window.optimizely.push({
                    type: "user",
                    attributes: {
                      conv_logged_in_menu: "no",
                    },
                  });
                }
              }

              //CONV segments on order confirmation page
              if (/\/order\/\d+\/summary/.test(document.location.pathname)) {
                //check URL of confirmation page
                var cvCheckRecipes = setInterval(function () {
                  if (
                    document.readyState === "interactive" ||
                    document.readyState === "complete"
                  ) {
                    clearInterval(cvCheckRecipes);
                    //Number of recipes
                    var cvRecipesNumber = document.querySelectorAll(
                      ".ordersummary-recipes .ordersummary-recipe picture"
                    ).length;
                    window.optimizely.push({
                      type: "user",
                      attributes: {
                        conv_no_of_recipes: cvRecipesNumber,
                      },
                    });
                    //Box Size
                    var cvBoxSize = document.querySelector(
                      ".ordersummary-num-portions"
                    ).innerText;
                    window.optimizely.push({
                      type: "user",
                      attributes: {
                        conv_box_size: cvBoxSize,
                      },
                    });
                    //Order contains premium
                    if (
                      document
                        .getElementById("ordersummary-box-price")
                        .innerText.indexOf("surcharge") > -1
                    ) {
                      window.optimizely.push({
                        type: "user",
                        attributes: {
                          conv_order_contains_premium: "Yes",
                        },
                      });
                    } else {
                      window.optimizely.push({
                        type: "user",
                        attributes: {
                          conv_order_contains_premium: "No",
                        },
                      });
                    }
                  }
                }, 50);
              }
              //END CONVERSION SEGMENTS

              //[CONV]Adds recipe - clicks

              //event
              var waitForVisitorInfo = setInterval(function () {
                if (typeof window.optimizely.get("visitor") == "object") {
                  clearInterval(waitForVisitorInfo);
                  window.springBoard.cvEvent = function () {
                    if (window.optimizely.get("visitor").device === "desktop") {
                      return "mousedown";
                    } else {
                      return "touchstart";
                    }
                  };
                }

                //DESKTOP
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "[data-testing='menuRecipeAdd']",
                  function (event) {
                    var targetElement = event.target || event.srcElement;

                    //[CONV]Adds recipe - clicks
                    if (targetElement.innertext !== "-") {
                      window.optimizely.push({
                        type: "event",
                        eventName: "cv_add_recipe_click",
                      });
                      //[CONV]Adds premium recipe - clicks
                      if (
                        targetElement.innerHTML.indexOf("£") !== -1 ||
                        targetElement.parentNode.innerHTML.indexOf("£") !== -1
                      ) {
                        window.optimizely.push({
                          type: "event",
                          eventName: "cv_add_premium_recipes_click",
                        });
                      }
                    }
                  }
                );

                //[CONV]Menu - clicks on checkout
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "[data-testing='desktopBoxSummaryButton']",
                  function (event) {
                    //[CONV]Menu - clicks on checkout
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_menu_checkout_click",
                    });
                  }
                );

                //[CONV]Navigation - Choose Recipes clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "a[href='/menu']",
                  function (event) {
                    var targetElement = event.target || event.srcElement;

                    if (
                      targetElement.innerText
                        .toLowerCase()
                        .indexOf("choose recipes") > -1
                    ) {
                      //[CONV]Navigation - Choose Recipes clicks
                      window.optimizely.push({
                        type: "event",
                        eventName: "cv_navigation_choose_recipes_click",
                      });
                    }
                  }
                );

                //[CONV]Market - filter clicks - Desktop
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  ".category-list-item",
                  function (event) {
                    //[CONV]Market - filter clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_market_filter_click",
                    });
                  }
                );

                //[CONV]Market - filter clicks - Mobile
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  ".category-list--mobile",
                  function (event) {
                    //[CONV]Market - filter clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_market_filter_click",
                    });
                  }
                );
                window.springBoard.on(
                  "change",
                  "#product-filter",
                  function (event) {
                    //[CONV]Market - filter clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_market_filter_click",
                    });
                  }
                );

                //Clicks on "Update Order" CTA [CONV]
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "button.gbtn-primary",
                  function (event) {
                    //Clicks on "Update Order" CTA [CONV]
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_opdate_order_cta_market_clicks",
                    });
                  }
                );

                //[CONV]Market item added & confirmed
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  ".ordersummary-sticky .gbtn-primary",
                  function (event) {
                    //[CONV]Market item added & confirmed
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_market_item_added_and_confirmed",
                    });
                  }
                );

                //[CONV]Checkout - "Cancel order" clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  ".__goustoOverlayContainer__",
                  function (event) {
                    var evTarget = event.target;
                    if (evTarget.innerText === "Cancel anyway") {
                      //[CONV]Order cancellation confirmed
                      window.optimizely.push({
                        type: "event",
                        eventName: "cv_order_cancellation_confirmed_click",
                      });
                    }
                  }
                );

                //[CONV]My Deliveries - "Shop extras" clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  ".order-item-upsell .gbtn-primary",
                  function (event) {
                    //[CONV]My Deliveries - "Shop extras" clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_deliveries_shop_extras",
                    });
                  }
                );

                //[CONV]My Deliveries - "Choose Recipes" clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "a.choose-now",
                  function (event) {
                    //[CONV]My Deliveries - "Choose Recipes" clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_deliveries_choose_recipes_click",
                    });
                  }
                );

                //[CONV]Signup - "2 people" box clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "[data-testing='signupBoxSize2Portions']",
                  function (event) {
                    //[CONV]Signup - "2 people" box clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_signup_2people_click",
                    });
                  }
                );

                //[CONV]Signup - "4 people" box clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "[data-testing='signupBoxSize4Portions']",
                  function (event) {
                    //[CONV]Signup - "4 people" box clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_signup_4people_click",
                    });
                  }
                );

                //[CONV]Checkout - "Edit order" clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "[data-testing='checkoutContainer'] > div > div > div:last-of-type > div:first-of-type > div > div > a",
                  function (event) {
                    var evTarget = event.target;
                    if (evTarget.innerText.indexOf("Edit order") > -1) {
                      //[CONV]Checkout - "Edit order" clicks
                      window.optimizely.push({
                        type: "event",
                        eventName: "cv_checkout_edit_order_click",
                      });
                    }
                  }
                );

                //[CONV]Checkout - "Edit order" clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "[data-testing='checkoutContainer'] > div > div > div:last-of-type > div:last-of-type a",
                  function (event) {
                    var evTarget = event.target;
                    if (evTarget.innerText.indexOf("another recipe") > -1) {
                      //[CONV]Checkout - "Add another recipe" clicks
                      window.optimizely.push({
                        type: "event",
                        eventName: "cv_add_another_recipe_checkout_click",
                      });
                    }
                  }
                );

                //[CONV]Checkout - "Submit order" clicks
                window.springBoard.on(
                  window.springBoard.cvEvent(),
                  "[data-testing='checkoutCTA']",
                  function (event) {
                    //[CONV]Checkout - "Add another recipe" clicks
                    window.optimizely.push({
                      type: "event",
                      eventName: "cv_checkout_submit_order_click",
                    });
                  }
                );

                //ADD NEW TRACKING USING window.springBoard.on HERE
              }, 50);

              //dataLayer
              var checkDataLayer = setInterval(function () {
                if (
                  typeof window.dataLayer !== "undefined" &&
                  typeof window.dataLayer.push !== "undefined"
                ) {
                  clearInterval(checkDataLayer);

                  var marketPlaceItemAdded = false;

                  // Intercept dataLayer route/history events
                  var getPushData = window.dataLayer.push;
                  window.dataLayer.push = function (data) {
                    getPushData.apply(this, arguments);

                    if (
                      typeof data.actionType !== "undefined" &&
                      data.actionType.indexOf("BOXSUMMARY_VISIBILITY_CHANGE") >
                        -1
                    ) {
                      if (
                        (typeof data.actionValue !== "undefined" &&
                          data.actionValue ===
                            '{"show":true,"view":"desktop"}') ||
                        data.actionValue === '{"show":true,"view":"mobile"}'
                      ) {
                        //[CONV]Box summary clicks
                        window.optimizely.push({
                          type: "event",
                          eventName: "cv_box_summary_click",
                        });
                      } else if (
                        typeof data.actionValue !== "undefined" &&
                        data.actionValue === '{"show":false}'
                      ) {
                        //[CONV]Box summary - clicks on "Choose recipes"
                        window.optimizely.push({
                          type: "event",
                          eventName: "cv_box_summary_choose_recipes_click",
                        });
                      }
                    } else if (
                      typeof data.actionType !== "undefined" &&
                      data.actionType.indexOf("MarketProduct Added") > -1
                    ) {
                      marketPlaceItemAdded = true;
                    } else if (
                      typeof data.actionType !== "undefined" &&
                      data.actionType.indexOf("Order Edited") > -1
                    ) {
                      //Clicks on "Update Order" CTA [CONV]
                      window.optimizely.push({
                        type: "event",
                        eventName: "cv_opdate_order_cta_market_clicks",
                      });
                      if (marketPlaceItemAdded) {
                        marketPlaceItemAdded = false;
                        window.optimizely.push({
                          type: "event",
                          eventName: "cv_market_item_added_and_confirmed",
                        });
                      }
                    }
                    //Visitor status
                    if (document.location.pathname.indexOf("check-out") > 0) {
                      if (
                        typeof data.actionType !== "undefined" &&
                        data.actionType.indexOf("SIGNUP_TRACKING_STEP_CHANGE") >
                          -1
                      ) {
                        window.optimizely.push({
                          type: "user",
                          attributes: {
                            conv_order_status: "New",
                          },
                        });
                      }
                    }

                    //CONV - new users signup page seen
                    if (document.location.pathname === "/check-out/aboutyou") {
                      window.optimizely.push({
                        type: "user",
                        attributes: {
                          conv_signup_about_you_seen: "Yes",
                        },
                      });
                      if (
                        typeof data.actionType !== "undefined" &&
                        data.actionType.indexOf(
                          "BASKET_PROMO_CODE_APPLIED_CHANGE"
                        ) > -1
                      ) {
                        if (
                          document
                            .querySelector('[data-testing="checkoutContainer"]')
                            .innerText.indexOf("discount") > -1
                        ) {
                          window.optimizely.push({
                            type: "user",
                            attributes: {
                              conv_discout_applied: "Yes",
                            },
                          });
                        } else {
                          window.optimizely.push({
                            type: "user",
                            attributes: {
                              conv_discout_applied: "No",
                            },
                          });
                        }
                      }
                    }
                  };
                }
              }, 50);
            } catch (err) {
              //console.log(err);
            }
          },
          visitorAttributes: [],
          enableForceParameters: true,
          accountId: "3732210624",
          events: [
            {
              category: "other",
              name: "Test Ellie",
              eventType: "custom",
              viewId: null,
              apiName: "Test Ellie",
              id: "13560790845",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Test Saf",
              eventType: "custom",
              viewId: null,
              apiName: "trackEvent",
              id: "13613640177",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Order Edited Gross",
              eventType: "custom",
              viewId: null,
              apiName: "order_edited_gross",
              id: "13624730030",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Order Placed Gross",
              eventType: "custom",
              viewId: null,
              apiName: "order_placed_gross",
              id: "13630230221",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Order Placed Net",
              eventType: "custom",
              viewId: null,
              apiName: "order_placed_net",
              id: "13705900262",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Order Edited Net",
              eventType: "custom",
              viewId: null,
              apiName: "order_edited_net",
              id: "13728610166",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Use App CTA Clicked",
              eventType: "custom",
              viewId: null,
              apiName: "use-app-cta-clicked",
              id: "14721560306",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Clicked Show Me Recipes CTA",
              eventType: "click",
              viewId: "14875460098",
              apiName: "clicked_show_me_recipes_cta",
              id: "14863380994",
              eventFilter: {
                filterType: "target_selector",
                selector: 'div[data-testing="signupDeliveryCTA"]',
              },
            },
            {
              category: "other",
              name: "Click App Banner CTA",
              eventType: "click",
              viewId: "14830360211",
              apiName: "7728010866_click_app_banner_cta",
              id: "15606440331",
              eventFilter: {
                filterType: "target_selector",
                selector: '[data-testing="appBannerCTA"]',
              },
            },
            {
              category: "other",
              name: "Close App Banner",
              eventType: "click",
              viewId: "14830360211",
              apiName: "7728010866_close_app_banner",
              id: "15608220418",
              eventFilter: {
                filterType: "target_selector",
                selector: '[data-testing="appBannerDismiss"]',
              },
            },
            {
              category: "other",
              name: "Menu - clicks on checkout [CONV]",
              eventType: "custom",
              viewId: null,
              apiName: "menu_clicks_on_checkout",
              id: "15688880434",
              eventFilter: null,
            },
            {
              category: "other",
              name: 'Box summary - clicks on "Choose recipes" [CONV]',
              eventType: "custom",
              viewId: null,
              apiName: "box_summary_clicks_on_choose_recipes",
              id: "15717050587",
              eventFilter: null,
            },
            {
              category: "other",
              name: 'Clicks on "Update Order" CTA [CONV]',
              eventType: "custom",
              viewId: null,
              apiName: "cv_opdate_order_cta_market_clicks",
              id: "15961260261",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Market item added & confirmed [CONV]",
              eventType: "custom",
              viewId: null,
              apiName: "cv_market_item_added_and_confirmed",
              id: "15963280024",
              eventFilter: null,
            },
            {
              category: "other",
              name: "Market - filter clicks [CONV]",
              eventType: "custom",
              viewId: null,
              apiName: "cv_market_filter_click",
              id: "15967280289",
              eventFilter: null,
            },
            {
              category: "other",
              name: "[GOU 016] Clicks on Skip with an item",
              eventType: "custom",
              viewId: null,
              apiName: "gou_016_continue_without_with_product",
              id: "16834250048",
              eventFilter: null,
            },
            {
              category: "other",
              name: "[GOU 016] Clicks on Skip (mobile only) ",
              eventType: "click",
              viewId: "16056710126",
              apiName: "7728010866_gou_016_clicks_on_skip_mobile_only_",
              id: "16838590209",
              eventFilter: {
                filterType: "target_selector",
                selector: ".cv-016 .header .skip-cta",
              },
            },
            {
              category: "other",
              name: "[GOU 016] Clicks on Continue with items",
              eventType: "click",
              viewId: "16056710126",
              apiName: "7728010866_gou_016_clicks_on_continue_with_items",
              id: "16856150138",
              eventFilter: {
                filterType: "target_selector",
                selector: ".cv-016 .banner.bottom .cta.continue",
              },
            },
            {
              category: "other",
              name: "[GOU 016] Clicks on Continue without items",
              eventType: "click",
              viewId: "16056710126",
              apiName: "7728010866_gou_016_clicks_on_continue_without_items",
              id: "16857970106",
              eventFilter: {
                filterType: "target_selector",
                selector:
                  ".cv-016 .banner.bottom .cta:not(.skip):not(.continue)",
              },
            },
            {
              category: "other",
              name:
                "[GOU017] Clicks on '-' (remove) market item from Box summary [CONV] ",
              eventType: "custom",
              viewId: null,
              apiName: "gou017_remove_item_box_summary",
              id: "16902917703",
              eventFilter: null,
            },
            {
              category: "other",
              name:
                "[GOU017] Clicks on 'Add' recipe details [CONV] and [TOTAL]",
              eventType: "custom",
              viewId: null,
              apiName: "gou017_clicks_on_add_recipe_details",
              id: "16908623045",
              eventFilter: null,
            },
            {
              category: "other",
              name:
                "[GOU017] Clicks on '-' (remove) market item after adding it from recipe details [CONV] ",
              eventType: "custom",
              viewId: null,
              apiName: "gou017_remove_item_recipe_details",
              id: "16921637668",
              eventFilter: null,
            },
          ],
          experimental: { trimPages: false },
          revision: "5398",
        },
        h = n(134),
        g = "initializeOptimizelyPreview";
      if ((d.populateDirectiveData(), s.clientHasAlreadyInitialized()))
        return void a.warn(
          "Main / Disabling because Optimizely has already initialized on this page load. Are there multiple snippets on the page?"
        );
      if (s.shouldBailForDesktopApp())
        return void a.log("Main / Disabling because of desktop app.");
      if (s.conflictInObservingChanges())
        return void a.log(
          "Main / Disabling: Observe Changes Indefinitely is on, but browser does not support it."
        );
      if (s.shouldLoadInnie())
        l.registerFunction("getProjectId", function () {
          return p.projectId;
        }),
          l.registerFunction("getAccountId", function () {
            return p.accountId;
          }),
          f.addScriptAsync("https://app.optimizely.com/js/innie.js"),
          a.log("Main / Disabling in favor of the editor client.");
      else if (s.shouldLoadPreview()) {
        var v;
        (v = s.isSlave()
          ? window.optimizely
          : (window.optimizely = window.optimizely || [])),
          v.push({ type: "load", data: p }),
          a.log("Main / Disabling in favor of the preview client."),
          n(148).setupPreviewGlobal(),
          n(148).pushToPreviewGlobal({
            type: "pushPreviewData",
            name: "liveCommitData",
            data: p,
          }),
          s.isSlave() ||
            (l.registerFunction("getProjectId", function () {
              return p.projectId;
            }),
            f.addScriptSync(
              "https://cdn-assets-prod.s3.amazonaws.com/js/preview2/7728010866.js"
            ));
      } else if (s.shouldBootstrapDataForPreview()) {
        l.registerFunction(g, function (t) {
          e(t), l.unregisterFunction(g);
        });
        var _ = s.isSlave()
          ? PROJECT_ID_FOR_SLAVE_PREVIEW
          : l.getFunction("getProjectId")();
        (c = t(s.getProjectToken(), _, s.getPreviewLayerIds())),
          f.addScriptSync(c),
          n(148).setupPreviewGlobal(),
          f.addScriptAsync("/dist/js/preview_ui.js");
      } else
        s.shouldBootstrapDataForEditor()
          ? (l.registerFunction(g, function (t) {
              e(t), l.unregisterFunction(g);
            }),
            f.addScriptAsync(window.optimizely_editor_data_endpoint))
          : s.shouldInitialize() && e(p);
      r.timeEnd("block");
    }
    try {
      i();
    } catch (e) {
      try {
        n(120).handleError(e);
      } catch (e) {
        console.log(e);
      }
    }
  },
  function (e, t, n) {
    function i() {
      s();
      var e = V.getRumData();
      return (
        (e.extras = e.extras || {}),
        (e.extras.beacon = { cjsTimeout: !0 }),
        (e = v.pickBy(e, function (e) {
          return !v.isUndefined(e);
        })),
        a(e)
      );
    }
    function r(e) {
      var t = L.getPromise("RUM_FIRST_BEACON");
      return t ? t.then(e) : m.makeAsyncRequest("RUM_FIRST_BEACON", e);
    }
    function a(e) {
      return v.isEmpty(e)
        ? w.resolve()
        : r(function () {
            return C.request({
              url: B,
              method: "POST",
              data: e,
              withCredentials: !0,
            })
              .then(function (e) {
                return m.resolveRequest("RUM_FIRST_BEACON", e), e;
              })
              ["catch"](function (e) {
                throw (
                  (A.error("POST to client-rum failed:", e),
                  m.rejectRequest("RUM_FIRST_BEACON", e),
                  e)
                );
              });
          });
    }
    function o() {
      var e = I.getCurrentScript();
      if (e) return e.src;
    }
    function s() {
      var e = {
          id: V.getRumId(),
          v: H,
          account: k.getAccountId(),
          project: k.getSnippetId() || k.getProjectId(),
          snippet: k.getSnippetId(),
          revision: k.getRevision(),
          clientVersion: P.getClientVersion(),
          hasSlave: !1,
          wxhr: !0,
          extras: {},
        },
        t = D.getPersistedBehaviorEventCount(),
        n = E.getEventCount();
      e["numBehaviorEvents"] = n;
      var i = n - t;
      v.extend(e.extras, {
        behaviorEventCountDiff: i,
        behaviorEventCountDecreased: i < 0,
      }),
        v.assign(e, u(), d()),
        T.dispatch(N.SET_RUM_DATA, { data: e });
    }
    function u() {
      var e = R.getGlobal("performance");
      if (e) {
        var t,
          n = V.getScriptSrc();
        try {
          if (n) {
            A.debug("Using derived script src: ", n);
            var i = e.getEntriesByName(n);
            i.length > 0 && (t = i[0]);
          }
          if (!t) {
            var r = /\/\/[^.]+\.optimizely\.(com|test)\/(js|api\/client)\/[\d]+\.js/gi;
            A.debug("Scanning resource timing entries with regex");
            var a = e.getEntriesByType("resource");
            t = v.find(a, function (e) {
              return r.test(e.name);
            });
          }
          if (t)
            return v.mapValues(O.ResourceTimingAttributes, function (e, n) {
              var i = t[n];
              return "number" == typeof i
                ? Math.round(1e3 * (i || 0)) / 1e3
                : "serverTiming" === n
                ? i || []
                : void 0;
            });
        } catch (e) {
          return;
        }
      }
    }
    function c() {
      try {
        return !I.querySelector("body");
      } catch (e) {
        return null;
      }
    }
    function l() {
      try {
        R.getGlobal("requestAnimationFrame")(function () {
          var e = V.getRumData().timebase;
          T.dispatch(N.SET_RUM_DATA, { data: { render: y.now() - (e || 0) } });
        });
      } catch (e) {
        return;
      }
    }
    function d() {
      return F.getDurationsFor(v.values(O.RUMPerformanceTimingAttributes));
    }
    function f() {
      var e = S.keys(),
        t = v.filter(
          v.map(e, function (e) {
            var t = D.getStorageKeyFromKey(e);
            return t
              ? {
                  key: e,
                  isForeign: D.isForeignKey(e),
                  category: t,
                  size: e.length + S.getItem(e).length,
                }
              : null;
          })
        ),
        n = v.reduce(
          t,
          function (e, t) {
            var n = t.key,
              i = D.getIdFromKey(n);
            if (!i) return e;
            var r = t.isForeign ? e.foreign : e.local;
            return (r[i] = !0), e;
          },
          { local: {}, foreign: {} }
        ),
        i = v
          .chain(t)
          .filter({ isForeign: !0 })
          .reduce(function (e, t) {
            var n = t.key.split("_")[0];
            return (e[n] = !0), e;
          }, {})
          .value(),
        r = { local: 0, foreign: 0 },
        a = { local: {}, foreign: {} };
      v.forEach(t, function (e) {
        var t = e.isForeign ? "foreign" : "local";
        (r[t] += e.size),
          a[t][e.category] || (a[t][e.category] = 0),
          (a[t][e.category] += e.size);
      });
      var o = {
          numKeys: S.allKeys().length,
          sizeKeys: S.allKeys().toString().length,
          sizeValues: S.allValues().toString().length,
          idCounts: {
            local: v.keys(n.local).length,
            foreign: v.keys(n.foreign).length,
          },
          foreignOriginCount: v.keys(i).length,
          byteTotals: r,
          byteTotalsByCategory: a,
        },
        s = b.estimateStorage();
      return s.then(function (e) {
        return v.assign(o, { storageEstimate: e });
      });
    }
    function p() {
      var e = R.getGlobal("performance"),
        t = e ? e.timing : {},
        n = F.getMarks() || {},
        i = V.getApiData(),
        r = V.getDOMObservationData(),
        o = G.get("state").getActiveExperimentIds(),
        s = V.getFeaturesNeededData(),
        u = I.parseUri(V.getScriptSrc()),
        c = V.getRumData() || {},
        l = c.extras || {};
      v.assign(l, {
        apiCalls: i,
        DOMObservationData: r,
        paintTimings: g(),
        activeExperimentIds: o,
        numPages: U.getNumberOfPages(),
        snippet: {
          scheme: u.protocol.slice(0, -1),
          host: u.host,
          path: u.pathname,
        },
        networkInfo: h(),
        experimental: k.getExperimental(),
        featuresNeeded: s,
        beacon: { cjsOnload: !0 },
      });
      var d = R.getGlobal("Prototype");
      d && !v.isUndefined(d.Version) && (l.prototypeJS = d.Version);
      var p = !1;
      p = !0;
      var _ = M.getFrames();
      _.length && (l.xdFramesLoaded = _.length);
      var m = {
        id: V.getRumId(),
        v: H,
        project: k.getSnippetId() || k.getProjectId(),
        navigationTimings: t,
        userTimings: n,
        xd: p,
        apis: v.keys(i),
        extras: l,
        sampleRate: c.sampleRate,
      };
      f().then(function (e) {
        var t = v.assign(m, { lsMetrics: e });
        a(t);
      });
    }
    function h() {
      var e = R.getGlobal("navigator");
      if (e && e.connection)
        return v.pick(e.connection, ["downlink", "rtt", "effectiveType"]);
    }
    function g() {
      var e = R.getGlobal("performance");
      if (e)
        try {
          var t = e.getEntriesByType("paint");
          if (v.isEmpty(t)) return;
          return v.reduce(
            t,
            function (e, t) {
              return (e[t.name] = Math.round(t.startTime)), e;
            },
            {}
          );
        } catch (e) {
          return;
        }
    }
    var v = n(2),
      _ = n(5),
      m = n(6),
      E = n(71),
      y = n(24),
      I = n(80),
      T = n(9),
      S = n(81).LocalStorage,
      A = n(23),
      b = n(90),
      w = n(12).Promise,
      D = n(74),
      R = n(40),
      C = n(91),
      N = n(7),
      O = n(25),
      x = n(16),
      L = x.get("stores/async_request"),
      P = x.get("stores/client_metadata"),
      k = x.get("stores/global"),
      V = x.get("stores/rum"),
      F = x.get("stores/performance"),
      M = x.get("stores/xdomain"),
      U = x.get("stores/view_data"),
      G = n(93),
      B = "https://rum.optimizely.com/rum",
      j = 3e3,
      H = "1.0",
      z = 0.01;
    (t.initialize = function () {
      var e,
        t = _.generate().replace(/-/g, "");
      e = Math.random() < z;
      var n = o();
      T.dispatch(N.SET_RUM_DATA, {
        id: t,
        RumHost: B,
        inRumSample: e,
        src: n,
        data: {
          id: t,
          sync: c(),
          timebase: y.now(),
          sampleRate: z,
          url: n,
          extras: { initialDOMState: I.getReadyState() },
        },
      });
    }),
      (t.queueBeacons = function () {
        return V.getSampleRum()
          ? (l(),
            I.isLoaded() ? R.setTimeout(p, j) : R.addEventListener("load", p),
            new w(function (e, t) {
              R.setTimeout(function () {
                i().then(e, t);
              }, j);
            }).catch(function (e) {
              A.warn("RUM / Error sending data:", e);
            }))
          : w.resolve();
      });
  },
  function (e, t, n) {
    e.exports = n(3)._.noConflict();
  },
  function (e, t, n) {
    (function (e, n) {
      (function () {
        function i(e, t) {
          return e.set(t[0], t[1]), e;
        }
        function r(e, t) {
          return e.add(t), e;
        }
        function a(e, t) {
          return u(De(e), pn);
        }
        function o(e, t) {
          return !!e.length && f(e, t, 0) > -1;
        }
        function s(e, t, n) {
          for (var i = -1, r = e.length; ++i < r; ) if (n(t, e[i])) return !0;
          return !1;
        }
        function u(e, t) {
          for (var n = -1, i = t.length, r = e.length; ++n < i; )
            e[r + n] = t[n];
          return e;
        }
        function c(e, t, n) {
          for (var i = -1, r = e.length; ++i < r; ) {
            var a = e[i],
              o = t(a);
            if (null != o && (s === An ? o === o : n(o, s)))
              var s = o,
                u = a;
          }
          return u;
        }
        function l(e, t, n, i) {
          var r;
          return (
            n(e, function (e, n, a) {
              if (t(e, n, a)) return (r = i ? n : e), !1;
            }),
            r
          );
        }
        function d(e, t, n) {
          for (var i = e.length, r = n ? i : -1; n ? r-- : ++r < i; )
            if (t(e[r], r, e)) return r;
          return -1;
        }
        function f(e, t, n) {
          if (t !== t) return y(e, n);
          for (var i = n - 1, r = e.length; ++i < r; ) if (e[i] === t) return i;
          return -1;
        }
        function p(e, t, n, i, r) {
          return (
            r(e, function (e, r, a) {
              n = i ? ((i = !1), e) : t(n, e, r, a);
            }),
            n
          );
        }
        function h(e, t) {
          for (var n = -1, i = Array(e); ++n < e; ) i[n] = t(n);
          return i;
        }
        function g(e) {
          return function (t) {
            return e(t);
          };
        }
        function v(e, t) {
          return Ee(t, function (t) {
            return e[t];
          });
        }
        function _(e) {
          return e && e.Object === Object ? e : null;
        }
        function m(e, t) {
          if (e !== t) {
            var n = null === e,
              i = e === An,
              r = e === e,
              a = null === t,
              o = t === An,
              s = t === t;
            if ((e > t && !a) || !r || (n && !o && s) || (i && s)) return 1;
            if ((e < t && !n) || !s || (a && !i && r) || (o && r)) return -1;
          }
          return 0;
        }
        function E(e) {
          return hi[e];
        }
        function y(e, t, n) {
          for (var i = e.length, r = t + (n ? 0 : -1); n ? r-- : ++r < i; ) {
            var a = e[r];
            if (a !== a) return r;
          }
          return -1;
        }
        function I(e) {
          var t = !1;
          if (null != e && "function" != typeof e.toString)
            try {
              t = !!(e + "");
            } catch (e) {}
          return t;
        }
        function T(e, t) {
          return (
            (e = "number" == typeof e || di.test(e) ? +e : -1),
            (t = null == t ? Pn : t),
            e > -1 && e % 1 == 0 && e < t
          );
        }
        function S(e) {
          for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
          return n;
        }
        function A(e) {
          var t = -1,
            n = Array(e.size);
          return (
            e.forEach(function (e, i) {
              n[++t] = [i, e];
            }),
            n
          );
        }
        function b(e) {
          var t = -1,
            n = Array(e.size);
          return (
            e.forEach(function (e) {
              n[++t] = e;
            }),
            n
          );
        }
        function w(e) {
          if (Ht(e) && !dr(e)) {
            if (e instanceof D) return e;
            if (Di.call(e, "__wrapped__")) return tt(e);
          }
          return new D(e);
        }
        function D(e, t) {
          (this.e = e), (this.u = []), (this.l = !!t);
        }
        function R() {}
        function C(e, t) {
          return O(e, t) && delete e[t];
        }
        function N(e, t) {
          if (Xi) {
            var n = e[t];
            return n === Rn ? An : n;
          }
          return Di.call(e, t) ? e[t] : An;
        }
        function O(e, t) {
          return Xi ? e[t] !== An : Di.call(e, t);
        }
        function x(e, t, n) {
          e[t] = Xi && n === An ? Rn : n;
        }
        function L(e) {
          var t = -1,
            n = e ? e.length : 0;
          for (this.clear(); ++t < n; ) {
            var i = e[t];
            this.set(i[0], i[1]);
          }
        }
        function P() {
          this.d = { hash: new R(), map: Yi ? new Yi() : [], string: new R() };
        }
        function k(e) {
          var t = this.d;
          return Ze(e)
            ? C("string" == typeof e ? t.string : t.hash, e)
            : Yi
            ? t.map["delete"](e)
            : W(t.map, e);
        }
        function V(e) {
          var t = this.d;
          return Ze(e)
            ? N("string" == typeof e ? t.string : t.hash, e)
            : Yi
            ? t.map.get(e)
            : X(t.map, e);
        }
        function F(e) {
          var t = this.d;
          return Ze(e)
            ? O("string" == typeof e ? t.string : t.hash, e)
            : Yi
            ? t.map.has(e)
            : $(t.map, e);
        }
        function M(e, t) {
          var n = this.d;
          return (
            Ze(e)
              ? x("string" == typeof e ? n.string : n.hash, e, t)
              : Yi
              ? n.map.set(e, t)
              : J(n.map, e, t),
            this
          );
        }
        function U(e) {
          var t = -1,
            n = e ? e.length : 0;
          for (this.d = new L(); ++t < n; ) this.push(e[t]);
        }
        function G(e, t) {
          var n = e.d;
          if (Ze(t)) {
            var i = n.d,
              r = "string" == typeof t ? i.string : i.hash;
            return r[t] === Rn;
          }
          return n.has(t);
        }
        function B(e) {
          var t = this.d;
          if (Ze(e)) {
            var n = t.d,
              i = "string" == typeof e ? n.string : n.hash;
            i[e] = Rn;
          } else t.set(e, Rn);
        }
        function j(e) {
          var t = -1,
            n = e ? e.length : 0;
          for (this.clear(); ++t < n; ) {
            var i = e[t];
            this.set(i[0], i[1]);
          }
        }
        function H() {
          this.d = { array: [], map: null };
        }
        function z(e) {
          var t = this.d,
            n = t.array;
          return n ? W(n, e) : t.map["delete"](e);
        }
        function K(e) {
          var t = this.d,
            n = t.array;
          return n ? X(n, e) : t.map.get(e);
        }
        function Y(e) {
          var t = this.d,
            n = t.array;
          return n ? $(n, e) : t.map.has(e);
        }
        function q(e, t) {
          var n = this.d,
            i = n.array;
          i &&
            (i.length < wn - 1
              ? J(i, e, t)
              : ((n.array = null), (n.map = new L(i))));
          var r = n.map;
          return r && r.set(e, t), this;
        }
        function W(e, t) {
          var n = Q(e, t);
          if (n < 0) return !1;
          var i = e.length - 1;
          return n == i ? e.pop() : ji.call(e, n, 1), !0;
        }
        function X(e, t) {
          var n = Q(e, t);
          return n < 0 ? An : e[n][1];
        }
        function $(e, t) {
          return Q(e, t) > -1;
        }
        function Q(e, t) {
          for (var n = e.length; n--; ) if (Nt(e[n][0], t)) return n;
          return -1;
        }
        function J(e, t, n) {
          var i = Q(e, t);
          i < 0 ? e.push([t, n]) : (e[i][1] = n);
        }
        function Z(e, t, n, i) {
          return e === An || (Nt(e, bi[n]) && !Di.call(i, n)) ? t : e;
        }
        function ee(e, t, n) {
          ((n === An || Nt(e[t], n)) &&
            ("number" != typeof t || n !== An || t in e)) ||
            (e[t] = n);
        }
        function te(e, t, n) {
          var i = e[t];
          (Di.call(e, t) && Nt(i, n) && (n !== An || t in e)) || (e[t] = n);
        }
        function ne(e, t) {
          return e && ir(t, sn(t), e);
        }
        function ie(e) {
          return "function" == typeof e ? e : vn;
        }
        function re(e, t, n, i, r, a, o) {
          var s;
          if ((i && (s = a ? i(e, r, a, o) : i(e)), s !== An)) return s;
          if (!jt(e)) return e;
          var u = dr(e);
          if (u) {
            if (((s = Xe(e)), !t)) return De(e, s);
          } else {
            var c = We(e),
              l = c == Gn || c == Bn;
            if (fr(e)) return Ne(e, t);
            if (c == zn || c == kn || (l && !a)) {
              if (I(e)) return a ? e : {};
              if (((s = $e(l ? {} : e)), !t))
                return (s = ne(s, e)), n ? Me(e, s) : s;
            } else {
              if (!pi[c]) return a ? e : {};
              s = Qe(e, c, t);
            }
          }
          o || (o = new j());
          var d = o.get(e);
          return d
            ? d
            : (o.set(e, s),
              (u ? tr : fe)(e, function (r, a) {
                te(s, a, re(r, t, n, i, a, e, o));
              }),
              n && !u ? Me(e, s) : s);
        }
        function ae(e) {
          return jt(e) ? Gi(e) : {};
        }
        function oe(e, t, n) {
          if ("function" != typeof e) throw new TypeError(Dn);
          return setTimeout(function () {
            e.apply(An, n);
          }, t);
        }
        function se(e, t, n, i) {
          var r = -1,
            a = o,
            u = !0,
            c = e.length,
            l = [],
            d = t.length;
          if (!c) return l;
          n && (t = Ee(t, g(n))),
            i
              ? ((a = s), (u = !1))
              : t.length >= wn && ((a = G), (u = !1), (t = new U(t)));
          e: for (; ++r < c; ) {
            var f = e[r],
              p = n ? n(f) : f;
            if (u && p === p) {
              for (var h = d; h--; ) if (t[h] === p) continue e;
              l.push(f);
            } else a(t, p, i) || l.push(f);
          }
          return l;
        }
        function ue(e, t) {
          var n = !0;
          return (
            tr(e, function (e, i, r) {
              return (n = !!t(e, i, r));
            }),
            n
          );
        }
        function ce(e, t) {
          var n = [];
          return (
            tr(e, function (e, i, r) {
              t(e, i, r) && n.push(e);
            }),
            n
          );
        }
        function le(e, t, n, i) {
          i || (i = []);
          for (var r = -1, a = e.length; ++r < a; ) {
            var o = e[r];
            t > 0 && Pt(o) && (n || dr(o) || xt(o))
              ? t > 1
                ? le(o, t - 1, n, i)
                : u(i, o)
              : n || (i[i.length] = o);
          }
          return i;
        }
        function de(e, t) {
          return null == e ? e : nr(e, t, un);
        }
        function fe(e, t) {
          return e && nr(e, t, sn);
        }
        function pe(e, t) {
          return ce(t, function (t) {
            return Gt(e[t]);
          });
        }
        function he(e, t, n, i, r) {
          return (
            e === t ||
            (null == e || null == t || (!jt(e) && !Ht(t))
              ? e !== e && t !== t
              : ge(e, t, he, n, i, r))
          );
        }
        function ge(e, t, n, i, r, a) {
          var o = dr(e),
            s = dr(t),
            u = Vn,
            c = Vn;
          o || ((u = Ni.call(e)), (u = u == kn ? zn : u)),
            s || ((c = Ni.call(t)), (c = c == kn ? zn : c));
          var l = u == zn && !I(e),
            d = c == zn && !I(t),
            f = u == c;
          a || (a = []);
          var p = vt(a, function (t) {
            return t[0] === e;
          });
          if (p && p[1]) return p[1] == t;
          if ((a.push([e, t]), f && !l)) {
            var h = o || Qt(e) ? ze(e, t, n, i, r, a) : Ke(e, t, u, n, i, r, a);
            return a.pop(), h;
          }
          if (!(r & xn)) {
            var g = l && Di.call(e, "__wrapped__"),
              v = d && Di.call(t, "__wrapped__");
            if (g || v) {
              var h = n(g ? e.value() : e, v ? t.value() : t, i, r, a);
              return a.pop(), h;
            }
          }
          if (!f) return !1;
          var h = Ye(e, t, n, i, r, a);
          return a.pop(), h;
        }
        function ve(e) {
          var t = typeof e;
          return "function" == t
            ? e
            : null == e
            ? vn
            : ("object" == t ? ye : be)(e);
        }
        function _e(e) {
          return zi(Object(e));
        }
        function me(e) {
          e = null == e ? e : Object(e);
          var t = [];
          for (var n in e) t.push(n);
          return t;
        }
        function Ee(e, t) {
          var n = -1,
            i = Lt(e) ? Array(e.length) : [];
          return (
            tr(e, function (e, r, a) {
              i[++n] = t(e, r, a);
            }),
            i
          );
        }
        function ye(e) {
          var t = sn(e);
          return function (n) {
            var i = t.length;
            if (null == n) return !i;
            for (n = Object(n); i--; ) {
              var r = t[i];
              if (!(r in n && he(e[r], n[r], An, On | xn))) return !1;
            }
            return !0;
          };
        }
        function Ie(e, t, n, i, r) {
          if (e !== t) {
            var a = dr(t) || Qt(t) ? An : un(t);
            tr(a || t, function (o, s) {
              if ((a && ((s = o), (o = t[s])), jt(o)))
                r || (r = new j()), Te(e, t, s, n, Ie, i, r);
              else {
                var u = i ? i(e[s], o, s + "", e, t, r) : An;
                u === An && (u = o), ee(e, s, u);
              }
            });
          }
        }
        function Te(e, t, n, i, r, a, o) {
          var s = e[n],
            u = t[n],
            c = o.get(u);
          if (c) return void ee(e, n, c);
          var l = a ? a(s, u, n + "", e, t, o) : An,
            d = l === An;
          d &&
            ((l = u),
            dr(u) || Qt(u)
              ? dr(s)
                ? (l = s)
                : Pt(s)
                ? (l = De(s))
                : ((d = !1), (l = re(u, !a)))
              : Wt(u) || xt(u)
              ? xt(s)
                ? (l = tn(s))
                : !jt(s) || (i && Gt(s))
                ? ((d = !1), (l = re(u, !a)))
                : (l = s)
              : (d = !1)),
            o.set(u, l),
            d && r(l, u, i, a, o),
            o["delete"](u),
            ee(e, n, l);
        }
        function Se(e, t) {
          return (
            (e = Object(e)),
            yt(
              t,
              function (t, n) {
                return n in e && (t[n] = e[n]), t;
              },
              {}
            )
          );
        }
        function Ae(e, t) {
          var n = {};
          return (
            de(e, function (e, i) {
              t(e, i) && (n[i] = e);
            }),
            n
          );
        }
        function be(e) {
          return function (t) {
            return null == t ? An : t[e];
          };
        }
        function we(e, t, n) {
          var i = -1,
            r = e.length;
          t < 0 && (t = -t > r ? 0 : r + t),
            (n = n > r ? r : n),
            n < 0 && (n += r),
            (r = t > n ? 0 : (n - t) >>> 0),
            (t >>>= 0);
          for (var a = Array(r); ++i < r; ) a[i] = e[i + t];
          return a;
        }
        function De(e) {
          return we(e, 0, e.length);
        }
        function Re(e, t) {
          var n;
          return (
            tr(e, function (e, i, r) {
              return (n = t(e, i, r)), !n;
            }),
            !!n
          );
        }
        function Ce(e, t) {
          var n = e;
          return yt(
            t,
            function (e, t) {
              return t.func.apply(t.thisArg, u([e], t.args));
            },
            n
          );
        }
        function Ne(e, t) {
          if (t) return e.slice();
          var n = new e.constructor(e.length);
          return e.copy(n), n;
        }
        function Oe(e) {
          var t = new e.constructor(e.byteLength);
          return new Vi(t).set(new Vi(e)), t;
        }
        function xe(e) {
          return yt(A(e), i, new e.constructor());
        }
        function Le(e) {
          var t = new e.constructor(e.source, ci.exec(e));
          return (t.lastIndex = e.lastIndex), t;
        }
        function Pe(e) {
          return yt(b(e), r, new e.constructor());
        }
        function ke(e) {
          return er ? Object(er.call(e)) : {};
        }
        function Ve(e, t) {
          var n = t ? Oe(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        }
        function Fe(e, t, n, i) {
          n || (n = {});
          for (var r = -1, a = t.length; ++r < a; ) {
            var o = t[r],
              s = i ? i(n[o], e[o], o, n, e) : e[o];
            te(n, o, s);
          }
          return n;
        }
        function Me(e, t) {
          return ir(e, ar(e), t);
        }
        function Ue(e) {
          return Dt(function (t, n) {
            var i = -1,
              r = n.length,
              a = r > 1 ? n[r - 1] : An;
            for (
              a = "function" == typeof a ? (r--, a) : An, t = Object(t);
              ++i < r;

            ) {
              var o = n[i];
              o && e(t, o, i, a);
            }
            return t;
          });
        }
        function Ge(e, t) {
          return function (n, i) {
            if (null == n) return n;
            if (!Lt(n)) return e(n, i);
            for (
              var r = n.length, a = t ? r : -1, o = Object(n);
              (t ? a-- : ++a < r) && i(o[a], a, o) !== !1;

            );
            return n;
          };
        }
        function Be(e) {
          return function (t, n, i) {
            for (var r = -1, a = Object(t), o = i(t), s = o.length; s--; ) {
              var u = o[e ? s : ++r];
              if (n(a[u], u, a) === !1) break;
            }
            return t;
          };
        }
        function je(e) {
          return function () {
            var t = arguments,
              n = ae(e.prototype),
              i = e.apply(n, t);
            return jt(i) ? i : n;
          };
        }
        function He(e, t, n, i) {
          function r() {
            for (
              var t = -1,
                s = arguments.length,
                u = -1,
                c = i.length,
                l = Array(c + s),
                d = this && this !== Si && this instanceof r ? o : e;
              ++u < c;

            )
              l[u] = i[u];
            for (; s--; ) l[u++] = arguments[++t];
            return d.apply(a ? n : this, l);
          }
          if ("function" != typeof e) throw new TypeError(Dn);
          var a = t & Cn,
            o = je(e);
          return r;
        }
        function ze(e, t, n, i, r, a) {
          var o = -1,
            s = r & xn,
            u = r & On,
            c = e.length,
            l = t.length;
          if (c != l && !(s && l > c)) return !1;
          for (var d = !0; ++o < c; ) {
            var f,
              p = e[o],
              h = t[o];
            if (f !== An) {
              if (f) continue;
              d = !1;
              break;
            }
            if (u) {
              if (
                !Re(t, function (e) {
                  return p === e || n(p, e, i, r, a);
                })
              ) {
                d = !1;
                break;
              }
            } else if (p !== h && !n(p, h, i, r, a)) {
              d = !1;
              break;
            }
          }
          return d;
        }
        function Ke(e, t, n, i, r, a, o) {
          switch (n) {
            case Fn:
            case Mn:
              return +e == +t;
            case Un:
              return e.name == t.name && e.message == t.message;
            case Hn:
              return e != +e ? t != +t : e == +t;
            case Kn:
            case qn:
              return e == t + "";
          }
          return !1;
        }
        function Ye(e, t, n, i, r, a) {
          var o = r & xn,
            s = sn(e),
            u = s.length,
            c = sn(t),
            l = c.length;
          if (u != l && !o) return !1;
          for (var d = u; d--; ) {
            var f = s[d];
            if (!(o ? f in t : Di.call(t, f))) return !1;
          }
          for (var p = !0, h = o; ++d < u; ) {
            f = s[d];
            var g,
              v = e[f],
              _ = t[f];
            if (!(g === An ? v === _ || n(v, _, i, r, a) : g)) {
              p = !1;
              break;
            }
            h || (h = "constructor" == f);
          }
          if (p && !h) {
            var m = e.constructor,
              E = t.constructor;
            m != E &&
              "constructor" in e &&
              "constructor" in t &&
              !(
                "function" == typeof m &&
                m instanceof m &&
                "function" == typeof E &&
                E instanceof E
              ) &&
              (p = !1);
          }
          return p;
        }
        function qe(e, t) {
          var n = e[t];
          return Kt(n) ? n : An;
        }
        function We(e) {
          return Ni.call(e);
        }
        function Xe(e) {
          var t = e.length,
            n = e.constructor(t);
          return (
            t &&
              "string" == typeof e[0] &&
              Di.call(e, "index") &&
              ((n.index = e.index), (n.input = e.input)),
            n
          );
        }
        function $e(e) {
          return "function" != typeof e.constructor || et(e) ? {} : ae(Mi(e));
        }
        function Qe(e, t, n) {
          var i = e.constructor;
          switch (t) {
            case $n:
              return Oe(e);
            case Fn:
            case Mn:
              return new i(+e);
            case Qn:
            case Jn:
            case Zn:
            case ei:
            case ti:
            case ni:
            case ii:
            case ri:
            case ai:
              return Ve(e, n);
            case jn:
              return xe(e);
            case Hn:
            case qn:
              return new i(e);
            case Kn:
              return Le(e);
            case Yn:
              return Pe(e);
            case Wn:
              return ke(e);
          }
        }
        function Je(e) {
          var t = e ? e.length : An;
          return Bt(t) && (dr(e) || $t(e) || xt(e)) ? h(t, String) : null;
        }
        function Ze(e) {
          var t = typeof e;
          return (
            "number" == t ||
            "boolean" == t ||
            ("string" == t && "__proto__" != e) ||
            null == e
          );
        }
        function et(e) {
          var t = e && e.constructor,
            n = ("function" == typeof t && t.prototype) || bi;
          return e === n;
        }
        function tt(e) {
          var t = new D(e.e, e.l);
          return (t.u = De(e.u)), t;
        }
        function nt(e) {
          return ce(e, Boolean);
        }
        function it(e, t) {
          return e && e.length ? d(e, ve(t, 3)) : -1;
        }
        function rt(e) {
          var t = e ? e.length : 0;
          return t ? le(e, 1) : [];
        }
        function at(e) {
          var t = e ? e.length : 0;
          return t ? le(e, Ln) : [];
        }
        function ot(e) {
          return e ? e[0] : An;
        }
        function st(e, t, n) {
          var i = e ? e.length : 0;
          n = "number" == typeof n ? (n < 0 ? Ki(i + n, 0) : n) : 0;
          for (var r = (n || 0) - 1, a = t === t; ++r < i; ) {
            var o = e[r];
            if (a ? o === t : o !== o) return r;
          }
          return -1;
        }
        function ut(e) {
          var t = e ? e.length : 0;
          return t ? e[t - 1] : An;
        }
        function ct(e, t, n) {
          var i = e ? e.length : 0;
          return (
            (t = null == t ? 0 : +t),
            (n = n === An ? i : +n),
            i ? we(e, t, n) : []
          );
        }
        function lt(e) {
          var t = w(e);
          return (t.l = !0), t;
        }
        function dt(e, t) {
          return t(e), e;
        }
        function ft(e, t) {
          return t(e);
        }
        function pt() {
          return Ce(this.e, this.u);
        }
        function ht(e, t, n) {
          return (t = n ? An : t), ue(e, ve(t));
        }
        function gt(e, t) {
          return ce(e, ve(t));
        }
        function vt(e, t) {
          return l(e, ve(t), tr);
        }
        function _t(e, t) {
          return tr(e, ie(t));
        }
        function mt(e, t, n, i) {
          (e = Lt(e) ? e : pn(e)), (n = n && !i ? pr(n) : 0);
          var r = e.length;
          return (
            n < 0 && (n = Ki(r + n, 0)),
            $t(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && f(e, t, n) > -1
          );
        }
        function Et(e, t) {
          return Ee(e, ve(t));
        }
        function yt(e, t, n) {
          return p(e, ve(t), n, arguments.length < 3, tr);
        }
        function It(e) {
          return null == e ? 0 : ((e = Lt(e) ? e : sn(e)), e.length);
        }
        function Tt(e, t, n) {
          return (t = n ? An : t), Re(e, ve(t));
        }
        function St(e, t) {
          var n = 0;
          return (
            (t = ve(t)),
            Ee(
              Ee(e, function (e, i, r) {
                return { value: e, index: n++, criteria: t(e, i, r) };
              }).sort(function (e, t) {
                return m(e.criteria, t.criteria) || e.index - t.index;
              }),
              be("value")
            )
          );
        }
        function At(e, t) {
          var n;
          if ("function" != typeof t) throw new TypeError(Dn);
          return (
            (e = pr(e)),
            function () {
              return (
                --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = An), n
              );
            }
          );
        }
        function bt(e) {
          if ("function" != typeof e) throw new TypeError(Dn);
          return function () {
            return !e.apply(this, arguments);
          };
        }
        function wt(e) {
          return At(2, e);
        }
        function Dt(e, t) {
          if ("function" != typeof e) throw new TypeError(Dn);
          return (
            (t = Ki(t === An ? e.length - 1 : pr(t), 0)),
            function () {
              for (
                var n = arguments,
                  i = -1,
                  r = Ki(n.length - t, 0),
                  a = Array(r);
                ++i < r;

              )
                a[i] = n[t + i];
              var o = Array(t + 1);
              for (i = -1; ++i < t; ) o[i] = n[i];
              return (o[t] = a), e.apply(this, o);
            }
          );
        }
        function Rt(e) {
          return jt(e) ? (dr(e) ? De(e) : ir(e, sn(e))) : e;
        }
        function Ct(e) {
          return re(e, !0, !0);
        }
        function Nt(e, t) {
          return e === t || (e !== e && t !== t);
        }
        function Ot(e, t) {
          return e > t;
        }
        function xt(e) {
          return (
            Pt(e) &&
            Di.call(e, "callee") &&
            (!Bi.call(e, "callee") || Ni.call(e) == kn)
          );
        }
        function Lt(e) {
          return null != e && Bt(rr(e)) && !Gt(e);
        }
        function Pt(e) {
          return Ht(e) && Lt(e);
        }
        function kt(e) {
          return e === !0 || e === !1 || (Ht(e) && Ni.call(e) == Fn);
        }
        function Vt(e) {
          return Ht(e) && Ni.call(e) == Mn;
        }
        function Ft(e) {
          if (Lt(e) && (dr(e) || $t(e) || Gt(e.splice) || xt(e)))
            return !e.length;
          for (var t in e) if (Di.call(e, t)) return !1;
          return !0;
        }
        function Mt(e, t) {
          return he(e, t);
        }
        function Ut(e) {
          return "number" == typeof e && Hi(e);
        }
        function Gt(e) {
          var t = jt(e) ? Ni.call(e) : "";
          return t == Gn || t == Bn;
        }
        function Bt(e) {
          return "number" == typeof e && e > -1 && e % 1 == 0 && e <= Pn;
        }
        function jt(e) {
          var t = typeof e;
          return !!e && ("object" == t || "function" == t);
        }
        function Ht(e) {
          return !!e && "object" == typeof e;
        }
        function zt(e) {
          return qt(e) && e != +e;
        }
        function Kt(e) {
          return (
            null != e &&
            (Gt(e) ? xi.test(wi.call(e)) : Ht(e) && (I(e) ? xi : li).test(e))
          );
        }
        function Yt(e) {
          return null === e;
        }
        function qt(e) {
          return "number" == typeof e || (Ht(e) && Ni.call(e) == Hn);
        }
        function Wt(e) {
          if (!Ht(e) || Ni.call(e) != zn || I(e)) return !1;
          var t = Mi(e);
          if (null === t) return !0;
          var n = t.constructor;
          return "function" == typeof n && n instanceof n && wi.call(n) == Ci;
        }
        function Xt(e) {
          return jt(e) && Ni.call(e) == Kn;
        }
        function $t(e) {
          return "string" == typeof e || (!dr(e) && Ht(e) && Ni.call(e) == qn);
        }
        function Qt(e) {
          return Ht(e) && Bt(e.length) && !!fi[Ni.call(e)];
        }
        function Jt(e) {
          return e === An;
        }
        function Zt(e, t) {
          return e < t;
        }
        function en(e) {
          return Lt(e) ? (e.length ? De(e) : []) : pn(e);
        }
        function tn(e) {
          return ir(e, un(e));
        }
        function nn(e) {
          return "string" == typeof e ? e : null == e ? "" : e + "";
        }
        function rn(e, t) {
          var n = ae(e);
          return t ? gr(n, t) : n;
        }
        function an(e, t) {
          return e && fe(e, ie(t));
        }
        function on(e, t) {
          return null != e && Di.call(e, t);
        }
        function sn(e) {
          var t = et(e);
          if (!t && !Lt(e)) return _e(e);
          var n = Je(e),
            i = !!n,
            r = n || [],
            a = r.length;
          for (var o in e)
            !Di.call(e, o) ||
              (i && ("length" == o || T(o, a))) ||
              (t && "constructor" == o) ||
              r.push(o);
          return r;
        }
        function un(e) {
          for (
            var t = -1,
              n = et(e),
              i = me(e),
              r = i.length,
              a = Je(e),
              o = !!a,
              s = a || [],
              u = s.length;
            ++t < r;

          ) {
            var c = i[t];
            (o && ("length" == c || T(c, u))) ||
              ("constructor" == c && (n || !Di.call(e, c))) ||
              s.push(c);
          }
          return s;
        }
        function cn(e, t) {
          var n = {};
          return (
            (t = ve(t, 3)),
            fe(e, function (e, i, r) {
              n[i] = t(e, i, r);
            }),
            n
          );
        }
        function ln(e, t) {
          return (
            (t = ve(t)),
            Ae(e, function (e, n) {
              return !t(e, n);
            })
          );
        }
        function dn(e, t) {
          return null == e ? {} : Ae(e, ve(t));
        }
        function fn(e, t, n) {
          var i = null == e ? An : e[t];
          return i === An && (i = n), Gt(i) ? i.call(e) : i;
        }
        function pn(e) {
          return e ? v(e, sn(e)) : [];
        }
        function hn(e) {
          return (e = nn(e)), e && si.test(e) ? e.replace(oi, E) : e;
        }
        function gn(e) {
          return function () {
            return e;
          };
        }
        function vn(e) {
          return e;
        }
        function _n(e) {
          return ye(gr({}, e));
        }
        function mn(e, t, n) {
          var i = sn(t),
            r = pe(t, i);
          null != n ||
            (jt(t) && (r.length || !i.length)) ||
            ((n = t), (t = e), (e = this), (r = pe(t, sn(t))));
          var a = !(jt(n) && "chain" in n) || n.chain,
            o = Gt(e);
          return (
            tr(r, function (n) {
              var i = t[n];
              (e[n] = i),
                o &&
                  (e.prototype[n] = function () {
                    var t = this.l;
                    if (a || t) {
                      var n = e(this.e),
                        r = (n.u = De(this.u));
                      return (
                        r.push({ func: i, args: arguments, thisArg: e }),
                        (n.l = t),
                        n
                      );
                    }
                    return i.apply(e, u([this.value()], arguments));
                  });
            }),
            e
          );
        }
        function En() {
          return Si._ === this && (Si._ = Oi), this;
        }
        function yn() {}
        function In(e) {
          var t = ++Ri;
          return nn(e) + t;
        }
        function Tn(e) {
          return e && e.length ? c(e, vn, Ot) : An;
        }
        function Sn(e) {
          return e && e.length ? c(e, vn, Zt) : An;
        }
        var An,
          bn = "4.6.1",
          wn = 200,
          Dn = "Expected a function",
          Rn = "__lodash_hash_undefined__",
          Cn = 1,
          Nn = 32,
          On = 1,
          xn = 2,
          Ln = 1 / 0,
          Pn = 9007199254740991,
          kn = "[object Arguments]",
          Vn = "[object Array]",
          Fn = "[object Boolean]",
          Mn = "[object Date]",
          Un = "[object Error]",
          Gn = "[object Function]",
          Bn = "[object GeneratorFunction]",
          jn = "[object Map]",
          Hn = "[object Number]",
          zn = "[object Object]",
          Kn = "[object RegExp]",
          Yn = "[object Set]",
          qn = "[object String]",
          Wn = "[object Symbol]",
          Xn = "[object WeakMap]",
          $n = "[object ArrayBuffer]",
          Qn = "[object Float32Array]",
          Jn = "[object Float64Array]",
          Zn = "[object Int8Array]",
          ei = "[object Int16Array]",
          ti = "[object Int32Array]",
          ni = "[object Uint8Array]",
          ii = "[object Uint8ClampedArray]",
          ri = "[object Uint16Array]",
          ai = "[object Uint32Array]",
          oi = /[&<>"'`]/g,
          si = RegExp(oi.source),
          ui = /[\\^$.*+?()[\]{}|]/g,
          ci = /\w*$/,
          li = /^\[object .+?Constructor\]$/,
          di = /^(?:0|[1-9]\d*)$/,
          fi = {};
        (fi[Qn] = fi[Jn] = fi[Zn] = fi[ei] = fi[ti] = fi[ni] = fi[ii] = fi[
          ri
        ] = fi[ai] = !0),
          (fi[kn] = fi[Vn] = fi[$n] = fi[Fn] = fi[Mn] = fi[Un] = fi[Gn] = fi[
            jn
          ] = fi[Hn] = fi[zn] = fi[Kn] = fi[Yn] = fi[qn] = fi[Xn] = !1);
        var pi = {};
        (pi[kn] = pi[Vn] = pi[$n] = pi[Fn] = pi[Mn] = pi[Qn] = pi[Jn] = pi[
          Zn
        ] = pi[ei] = pi[ti] = pi[jn] = pi[Hn] = pi[zn] = pi[Kn] = pi[Yn] = pi[
          qn
        ] = pi[Wn] = pi[ni] = pi[ii] = pi[ri] = pi[ai] = !0),
          (pi[Un] = pi[Gn] = pi[Xn] = !1);
        var hi = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "`": "&#96;",
          },
          gi = { function: !0, object: !0 },
          vi = gi[typeof t] && t && !t.nodeType ? t : An,
          _i = gi[typeof e] && e && !e.nodeType ? e : An,
          mi = _i && _i.exports === vi ? vi : An,
          Ei = _(vi && _i && "object" == typeof n && n),
          yi = _(gi[typeof self] && self),
          Ii = _(gi[typeof window] && window),
          Ti = _(gi[typeof this] && this),
          Si =
            Ei ||
            (Ii !== (Ti && Ti.window) && Ii) ||
            yi ||
            Ti ||
            Function("return this")(),
          Ai = Array.prototype,
          bi = Object.prototype,
          wi = Function.prototype.toString,
          Di = bi.hasOwnProperty,
          Ri = 0,
          Ci = wi.call(Object),
          Ni = bi.toString,
          Oi = Si._,
          xi = RegExp(
            "^" +
              wi
                .call(Di)
                .replace(ui, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          Li = mi ? An : An,
          Pi = Si.Reflect,
          ki = Si.Symbol,
          Vi = Si.Uint8Array,
          Fi = Pi ? Pi.enumerate : An,
          Mi = Object.getPrototypeOf,
          Ui = Object.getOwnPropertySymbols,
          Gi = Object.create,
          Bi = bi.propertyIsEnumerable,
          ji = Ai.splice,
          Hi = Si.isFinite,
          zi = Object.keys,
          Ki = Math.max,
          Yi = qe(Si, "Map"),
          qi = qe(Si, "Set"),
          Wi = qe(Si, "WeakMap"),
          Xi = qe(Object, "create"),
          $i = Yi ? wi.call(Yi) : "",
          Qi = qi ? wi.call(qi) : "",
          Ji = Wi ? wi.call(Wi) : "",
          Zi = ki ? ki.prototype : An,
          er = Zi ? Zi.valueOf : An,
          tr = Ge(fe),
          nr = Be();
        Fi &&
          !Bi.call({ valueOf: 1 }, "valueOf") &&
          (me = function (e) {
            return S(Fi(e));
          });
        var ir = Fe,
          rr = be("length"),
          ar =
            Ui ||
            function () {
              return [];
            };
        ((Yi && We(new Yi()) != jn) ||
          (qi && We(new qi()) != Yn) ||
          (Wi && We(new Wi()) != Xn)) &&
          (We = function (e) {
            var t = Ni.call(e),
              n = t == zn ? e.constructor : null,
              i = "function" == typeof n ? wi.call(n) : "";
            if (i)
              switch (i) {
                case $i:
                  return jn;
                case Qi:
                  return Yn;
                case Ji:
                  return Xn;
              }
            return t;
          });
        var or = Dt(function (e, t) {
            return (
              dr(e) || (e = null == e ? [] : [Object(e)]),
              (t = le(t, 1)),
              a(e, t)
            );
          }),
          sr = Dt(function (e, t, n) {
            return He(e, Cn | Nn, t, n);
          }),
          ur = Dt(function (e, t) {
            return oe(e, 1, t);
          }),
          cr = Dt(function (e, t, n) {
            return oe(e, hr(t) || 0, n);
          }),
          lr = Dt(function (e, t) {
            return He(e, Nn, An, t);
          }),
          dr = Array.isArray,
          fr = Li
            ? function (e) {
                return e instanceof Li;
              }
            : gn(!1),
          pr = Number,
          hr = Number,
          gr = Ue(function (e, t) {
            ir(t, sn(t), e);
          }),
          vr = Ue(function (e, t) {
            ir(t, un(t), e);
          }),
          _r = Ue(function (e, t, n, i) {
            Fe(t, un(t), e, i);
          }),
          mr = Dt(function (e) {
            return e.push(An, Z), _r.apply(An, e);
          }),
          Er = Ue(function (e, t, n) {
            Ie(e, t, n);
          }),
          yr = Dt(function (e, t) {
            return null == e
              ? {}
              : ((t = Ee(le(t, 1), String)), Se(e, se(un(e), t)));
          }),
          Ir = Dt(function (e, t) {
            return null == e ? {} : Se(e, le(t, 1));
          }),
          Tr = ve;
        (D.prototype = ae(w.prototype)),
          (D.prototype.constructor = D),
          (R.prototype = Xi ? Xi(null) : bi),
          (L.prototype.clear = P),
          (L.prototype["delete"] = k),
          (L.prototype.get = V),
          (L.prototype.has = F),
          (L.prototype.set = M),
          (U.prototype.push = B),
          (j.prototype.clear = H),
          (j.prototype["delete"] = z),
          (j.prototype.get = K),
          (j.prototype.has = Y),
          (j.prototype.set = q),
          (w.assign = gr),
          (w.assignIn = vr),
          (w.before = At),
          (w.bind = sr),
          (w.chain = lt),
          (w.compact = nt),
          (w.concat = or),
          (w.create = rn),
          (w.defaults = mr),
          (w.defer = ur),
          (w.delay = cr),
          (w.filter = gt),
          (w.flatten = rt),
          (w.flattenDeep = at),
          (w.iteratee = Tr),
          (w.keys = sn),
          (w.map = Et),
          (w.mapValues = cn),
          (w.matches = _n),
          (w.merge = Er),
          (w.mixin = mn),
          (w.negate = bt),
          (w.omit = yr),
          (w.omitBy = ln),
          (w.once = wt),
          (w.partial = lr),
          (w.pick = Ir),
          (w.pickBy = dn),
          (w.slice = ct),
          (w.sortBy = St),
          (w.tap = dt),
          (w.thru = ft),
          (w.toArray = en),
          (w.values = pn),
          (w.extend = vr),
          mn(w, w),
          (w.clone = Rt),
          (w.cloneDeep = Ct),
          (w.escape = hn),
          (w.every = ht),
          (w.find = vt),
          (w.findIndex = it),
          (w.forEach = _t),
          (w.forOwn = an),
          (w.has = on),
          (w.head = ot),
          (w.identity = vn),
          (w.includes = mt),
          (w.indexOf = st),
          (w.isArguments = xt),
          (w.isArray = dr),
          (w.isBoolean = kt),
          (w.isDate = Vt),
          (w.isEmpty = Ft),
          (w.isEqual = Mt),
          (w.isFinite = Ut),
          (w.isFunction = Gt),
          (w.isNaN = zt),
          (w.isNull = Yt),
          (w.isNumber = qt),
          (w.isObject = jt),
          (w.isRegExp = Xt),
          (w.isString = $t),
          (w.isUndefined = Jt),
          (w.last = ut),
          (w.max = Tn),
          (w.min = Sn),
          (w.noConflict = En),
          (w.noop = yn),
          (w.reduce = yt),
          (w.result = fn),
          (w.size = It),
          (w.some = Tt),
          (w.uniqueId = In),
          (w.each = _t),
          (w.first = ot),
          mn(
            w,
            (function () {
              var e = {};
              return (
                fe(w, function (t, n) {
                  Di.call(w.prototype, n) || (e[n] = t);
                }),
                e
              );
            })(),
            { chain: !1 }
          ),
          (w.VERSION = bn),
          tr(
            [
              "pop",
              "join",
              "replace",
              "reverse",
              "split",
              "push",
              "shift",
              "sort",
              "splice",
              "unshift",
            ],
            function (e) {
              var t = (/^(?:replace|split)$/.test(e) ? String.prototype : Ai)[
                  e
                ],
                n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
                i = /^(?:pop|join|replace|shift)$/.test(e);
              w.prototype[e] = function () {
                var e = arguments;
                return i && !this.l
                  ? t.apply(this.value(), e)
                  : this[n](function (n) {
                      return t.apply(n, e);
                    });
              };
            }
          ),
          (w.prototype.toJSON = w.prototype.valueOf = w.prototype.value = pt),
          ((Ii || yi || {})._ = w),
          vi && _i && (mi && ((_i.exports = w)._ = w), (vi._ = w));
      }.call(this));
    }.call(
      t,
      n(4)(e),
      (function () {
        return this;
      })()
    ));
  },
  function (e, t) {
    e.exports = function (e) {
      return (
        e.webpackPolyfill ||
          ((e.deprecate = function () {}),
          (e.paths = []),
          (e.children = []),
          (e.webpackPolyfill = 1)),
        e
      );
    };
  },
  function (e, t) {
    t.generate = function e(t) {
      return t
        ? (t ^ ((16 * Math.random()) >> (t / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e);
    };
  },
  function (e, t, n) {
    var i = n(7),
      r = n(9),
      a = n(12).Promise,
      o = n(16),
      s = o.get("stores/async_request");
    (t.makeAsyncRequest = function (e, t) {
      var n = s.getPromise(e);
      if (n) return n;
      var o,
        u,
        c = new a(function (e, t) {
          (o = e), (u = t);
        });
      return (
        r.dispatch(i.REGISTER_ASYNC_DEFERRED, {
          source: e,
          promise: c,
          resolver: o,
          rejecter: u,
        }),
        t && t(),
        c
      );
    }),
      (t.resolveRequest = function (e, t) {
        r.dispatch(i.RESOLVE_DEFERRED, { source: e, resolveWith: t });
      }),
      (t.rejectRequest = function (e, t) {
        r.dispatch(i.REJECT_DEFERRED, { source: e, rejectWith: t });
      });
  },
  function (e, t, n) {
    var i = n(8);
    e.exports = i({
      LOG: null,
      SET_LOGLEVEL: null,
      INITIALIZE_STATE: null,
      SET_DOMCONTENTLOADED: null,
      ACTIVATE: null,
      UPDATE_BEHAVIOR_STORE: null,
      DATA_LOADED: null,
      SET_CLIENT_NAME: null,
      SET_CLIENT_VERSION: null,
      LOAD_PERSISTED_LAYER_STATES: null,
      RECORD_GLOBAL_DECISION: null,
      RECORD_LAYER_DECISION: null,
      ENSURE_ORIGINAL_PUSHSTATE: null,
      ENSURE_ORIGINAL_REPLACESTATE: null,
      SET_VISITOR_ATTRIBUTES: null,
      SET_VISITOR_ATTRIBUTE_PENDING: null,
      LOAD_EXISTING_VISITOR_PROFILE: null,
      SET_VISITOR_EVENTS: null,
      SET_FOREIGN_VISITOR_EVENTS: null,
      SET_FOREIGN_VISITOR_EVENT_QUEUE: null,
      SET_VISITOR_ID: null,
      SET_VISITOR_ID_VIA_API: null,
      REFRESH_SESSION: null,
      LOAD_SESSION_STATE: null,
      UPDATE_VARIATION_ID_MAP: null,
      MERGE_VARIATION_ID_MAP: null,
      UPDATE_PREFERRED_LAYER_MAP: null,
      MERGE_PREFERRED_LAYER_MAP: null,
      RECORD_LAYER_DECISION_EVENT_ID: null,
      TRACK_VIEW_ACTIVATED_EVENT: null,
      REGISTER_ASYNC_DEFERRED: null,
      RESOLVE_DEFERRED: null,
      REJECT_DEFERRED: null,
      REGISTER_PLUGIN: null,
      ADD_CLEANUP_FN: null,
      CLEAR_CLEANUP_FN: null,
      ACTION_EXECUTED: null,
      REGISTER_ACTION: null,
      SET_VIEW_ACTIVE_STATE: null,
      UPDATE_PARSED_VIEW_METADATA: null,
      UPDATE_USER_SUPPLIED_METADATA: null,
      REGISTER_VIEWS: null,
      SET_GLOBAL_TAGS: null,
      SET_VIEW_BATCHING: null,
      RESET_VIEW_STATES: null,
      ATTACH_EVENT_STREAM_PUBLISHERS: null,
      DETACH_EVENT_STREAM_PUBLISHERS: null,
      LOAD_DIRECTIVE: null,
      SET_COOKIE_AGE: null,
      SET_COOKIE_DOMAIN: null,
      SET_COOKIE_AUTO_REFRESH: null,
      XDOMAIN_SET_DEFAULT_FRAME: null,
      XDOMAIN_ADD_FRAME: null,
      XDOMAIN_SET_MESSAGE: null,
      XDOMAIN_ADD_SUBSCRIBER: null,
      XDOMAIN_SET_CANONICAL_ORIGINS: null,
      XDOMAIN_SET_DISABLED: null,
      ADD_EMITTER_HANDLER: null,
      REMOVE_EMITTER_HANDLER: null,
      SET_INTEGRATION_SETTINGS: null,
      ADD_CHANGE: null,
      SET_CHANGE_APPLIER: null,
      REMOVE_ACTION_STATE: null,
      ANNOUNCE_PENDING_REDIRECT: null,
      LOAD_REDIRECT_DATA: null,
      REGISTER_TRACKED_REDIRECT_DATA: null,
      SET_PENDING_EVENT: null,
      REMOVE_PENDING_EVENT: null,
      LOAD_PENDING_EVENTS: null,
      SANDBOXED_FUNCTIONS_ADDED: null,
      SET_RUM_DATA: null,
      RECORD_API_USAGE: null,
      INITIALIZE_CHANGE_METRICS: null,
      RECORD_ACTIVATION_TYPE_USAGE: null,
      RECORD_AUDIENCE_USAGE: null,
      RECORD_CHANGE_MACROTASK_RATE: null,
      RECORD_CHANGE_OVERHEATED: null,
      RECORD_CHANGE_TYPE_USAGE: null,
      RECORD_DOM_OBSERVATION_OCCURENCE: null,
      RECORD_INTEGRATION_USAGE: null,
      RECORD_LAYER_FEATURE_USAGE: null,
      RECORD_LAYER_POLICY_USAGE: null,
      RECORD_RECOMMENDATIONS_USAGE: null,
      RECORD_VIEW_FEATURE_USAGE: null,
      RECORD_VIEWS_INITIALLY_ACTIVATED_COUNT: null,
      RECORD_VISITOR_ID_LOCATOR_USAGE: null,
      RECORD_VISITOR_ID_ERROR: null,
      RECORD_STICKY_BUCKETING_FEATURE: null,
      SET_PERFORMANCE_MARKS_DATA: null,
      FINALIZE_BATCH_SNAPSHOT: null,
      REGISTER_PREVIOUS_BATCH: null,
      REGISTER_TRACKER_VISITOR: null,
      REGISTER_TRACKER_EVENT: null,
      REGISTER_TRACKER_DECISION: null,
      RESET_TRACKER_EVENTS: null,
      RESET_TRACKER_PREVIOUS_BATCHES: null,
      RESET_TRACKER_STORE: null,
      SET_TRACKER_POLLING: null,
      SET_TRACKER_BATCHING: null,
      SET_TRACKER_SEND_EVENTS: null,
      SET_TRACKER_PERSISTABLE_STATE: null,
      SET_TRACKER_DIRTY: null,
      UPDATE_TRACKER_VISITOR_ATTRIBUTES: null,
      SET_UA_DATA: null,
    });
  },
  function (e, t) {
    "use strict";
    var n = function (e) {
      var t,
        n = {};
      if (!(e instanceof Object) || Array.isArray(e))
        throw new Error("keyMirror(...): Argument must be an object.");
      for (t in e) e.hasOwnProperty(t) && (n[t] = t);
      return n;
    };
    e.exports = n;
  },
  function (e, t, n) {
    var i = n(10);
    e.exports = i.create();
  },
  function (e, t, n) {
    function i(e) {
      (e = e || {}),
        (this.f = {}),
        (this.g = {}),
        (this.I = 0),
        (this.T = []),
        (this.S = []);
    }
    function r(e, t) {
      return function () {
        var n = e.indexOf(t);
        n !== -1 && e.splice(n, 1);
      };
    }
    var a = n(2),
      o = n(11);
    (i.prototype.registerStores = function (e) {
      a.forOwn(
        e,
        a.bind(function (e, t) {
          this.f[t] = new o(t, this, e);
        }, this)
      );
    }),
      (i.prototype.getStore = function (e) {
        return this.f[e];
      }),
      (i.prototype.dispatch = function (e, t) {
        this.dispatchId++,
          a.each(
            this.T,
            a.bind(function (n) {
              n.call(this, e, t);
            }, this)
          ),
          a.forOwn(this.f, function (n) {
            n.A(e, t);
          }),
          a.each(
            this.S,
            a.bind(function (n) {
              n.call(this, e, t);
            }, this)
          ),
          a.forOwn(
            this.f,
            a.bind(function (e, t) {
              e.hasChanges() &&
                this.g[t] &&
                (e.resetChange(),
                a.each(this.g[t], function (t) {
                  t(e);
                }));
            }, this)
          );
      }),
      (i.prototype.reset = function () {
        (this.g = {}),
          a.forOwn(this.f, function (e, t) {
            e.b();
          });
      }),
      (i.prototype.getState = function () {
        var e = {};
        return (
          a.forOwn(this.f, function (t, n) {
            e[n] = t.w();
          }),
          e
        );
      }),
      (i.prototype.onPreAction = function (e) {
        var t = this.T;
        return t.push(e), r(t, e);
      }),
      (i.prototype.onPostAction = function (e) {
        var t = this.S;
        return t.push(e), r(t, e);
      }),
      (i.prototype.D = function (e, t) {
        this.g[e] || (this.g[e] = []), this.g[e].push(t);
        var n = this.g[e];
        return r(n, t);
      }),
      (e.exports = {
        create: function (e) {
          return new i(e);
        },
      });
  },
  function (e, t, n) {
    function i(e, t, n) {
      (this.R = e),
        (this.C = t),
        (this.N = 0),
        (this.O = !1),
        (this.L = {}),
        r.extend(this, n),
        (this.P = {}),
        this.initialize && this.initialize();
    }
    var r = n(2);
    (i.prototype.A = function (e, t) {
      var n = this.L[e];
      n && "function" == typeof n && n.call(this, t, e);
    }),
      (i.prototype.w = function () {
        return r.cloneDeep(this.P);
      }),
      (i.prototype.on = function (e, t) {
        this.L[e] = r.bind(t, this);
      }),
      (i.prototype.observe = function (e) {
        return this.C.D(this.R, e);
      }),
      (i.prototype.emitChange = function () {
        (this.O = !0), this.N++;
      }),
      (i.prototype.hasChanges = function () {
        return this.O;
      }),
      (i.prototype.resetChange = function () {
        this.O = !1;
      }),
      (i.prototype.getStateId = function () {
        return this.N;
      }),
      (i.prototype.b = function () {
        this.reset && "function" == typeof this.reset && this.reset(),
          this.initialize();
      }),
      (e.exports = i);
  },
  function (e, t, n) {
    e.exports = n(13);
  },
  function (e, t, n) {
    (function (t, i) {
      /*!
       * @overview es6-promise - a tiny implementation of Promises/A+.
       * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
       * @license   Licensed under MIT license
       *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
       * @version   4.1.0
       */
      !(function (t, n) {
        e.exports = n();
      })(this, function () {
        "use strict";
        function e(e) {
          return "function" == typeof e || ("object" == typeof e && null !== e);
        }
        function r(e) {
          return "function" == typeof e;
        }
        function a(e) {
          X = e;
        }
        function o(e) {
          $ = e;
        }
        function s() {
          return function () {
            return t.nextTick(f);
          };
        }
        function u() {
          return "undefined" != typeof W
            ? function () {
                W(f);
              }
            : d();
        }
        function c() {
          var e = 0,
            t = new Z(f),
            n = document.createTextNode("");
          return (
            t.observe(n, { characterData: !0 }),
            function () {
              n.data = e = ++e % 2;
            }
          );
        }
        function l() {
          var e = new MessageChannel();
          return (
            (e.port1.onmessage = f),
            function () {
              return e.port2.postMessage(0);
            }
          );
        }
        function d() {
          var e = setTimeout;
          return function () {
            return e(f, 1);
          };
        }
        function f() {
          for (var e = 0; e < q; e += 2) {
            var t = ne[e],
              n = ne[e + 1];
            t(n), (ne[e] = void 0), (ne[e + 1] = void 0);
          }
          q = 0;
        }
        function p() {
          try {
            var e = n(15);
            return (W = e.runOnLoop || e.runOnContext), u();
          } catch (e) {
            return d();
          }
        }
        function h(e, t) {
          var n = arguments,
            i = this,
            r = new this.constructor(v);
          void 0 === r[re] && k(r);
          var a = i._state;
          return (
            a
              ? !(function () {
                  var e = n[a - 1];
                  $(function () {
                    return x(a, r, e, i._result);
                  });
                })()
              : R(i, r, e, t),
            r
          );
        }
        function g(e) {
          var t = this;
          if (e && "object" == typeof e && e.constructor === t) return e;
          var n = new t(v);
          return A(n, e), n;
        }
        function v() {}
        function _() {
          return new TypeError("You cannot resolve a promise with itself");
        }
        function m() {
          return new TypeError(
            "A promises callback cannot return that same promise."
          );
        }
        function E(e) {
          try {
            return e.then;
          } catch (e) {
            return (ue.error = e), ue;
          }
        }
        function y(e, t, n, i) {
          try {
            e.call(t, n, i);
          } catch (e) {
            return e;
          }
        }
        function I(e, t, n) {
          $(function (e) {
            var i = !1,
              r = y(
                n,
                t,
                function (n) {
                  i || ((i = !0), t !== n ? A(e, n) : w(e, n));
                },
                function (t) {
                  i || ((i = !0), D(e, t));
                },
                "Settle: " + (e._label || " unknown promise")
              );
            !i && r && ((i = !0), D(e, r));
          }, e);
        }
        function T(e, t) {
          t._state === oe
            ? w(e, t._result)
            : t._state === se
            ? D(e, t._result)
            : R(
                t,
                void 0,
                function (t) {
                  return A(e, t);
                },
                function (t) {
                  return D(e, t);
                }
              );
        }
        function S(e, t, n) {
          t.constructor === e.constructor &&
          n === h &&
          t.constructor.resolve === g
            ? T(e, t)
            : n === ue
            ? (D(e, ue.error), (ue.error = null))
            : void 0 === n
            ? w(e, t)
            : r(n)
            ? I(e, t, n)
            : w(e, t);
        }
        function A(t, n) {
          t === n ? D(t, _()) : e(n) ? S(t, n, E(n)) : w(t, n);
        }
        function b(e) {
          e._onerror && e._onerror(e._result), C(e);
        }
        function w(e, t) {
          e._state === ae &&
            ((e._result = t),
            (e._state = oe),
            0 !== e._subscribers.length && $(C, e));
        }
        function D(e, t) {
          e._state === ae && ((e._state = se), (e._result = t), $(b, e));
        }
        function R(e, t, n, i) {
          var r = e._subscribers,
            a = r.length;
          (e._onerror = null),
            (r[a] = t),
            (r[a + oe] = n),
            (r[a + se] = i),
            0 === a && e._state && $(C, e);
        }
        function C(e) {
          var t = e._subscribers,
            n = e._state;
          if (0 !== t.length) {
            for (
              var i = void 0, r = void 0, a = e._result, o = 0;
              o < t.length;
              o += 3
            )
              (i = t[o]), (r = t[o + n]), i ? x(n, i, r, a) : r(a);
            e._subscribers.length = 0;
          }
        }
        function N() {
          this.error = null;
        }
        function O(e, t) {
          try {
            return e(t);
          } catch (e) {
            return (ce.error = e), ce;
          }
        }
        function x(e, t, n, i) {
          var a = r(n),
            o = void 0,
            s = void 0,
            u = void 0,
            c = void 0;
          if (a) {
            if (
              ((o = O(n, i)),
              o === ce ? ((c = !0), (s = o.error), (o.error = null)) : (u = !0),
              t === o)
            )
              return void D(t, m());
          } else (o = i), (u = !0);
          t._state !== ae ||
            (a && u
              ? A(t, o)
              : c
              ? D(t, s)
              : e === oe
              ? w(t, o)
              : e === se && D(t, o));
        }
        function L(e, t) {
          try {
            t(
              function (t) {
                A(e, t);
              },
              function (t) {
                D(e, t);
              }
            );
          } catch (t) {
            D(e, t);
          }
        }
        function P() {
          return le++;
        }
        function k(e) {
          (e[re] = le++),
            (e._state = void 0),
            (e._result = void 0),
            (e._subscribers = []);
        }
        function V(e, t) {
          (this._instanceConstructor = e),
            (this.promise = new e(v)),
            this.promise[re] || k(this.promise),
            Y(t)
              ? ((this._input = t),
                (this.length = t.length),
                (this._remaining = t.length),
                (this._result = new Array(this.length)),
                0 === this.length
                  ? w(this.promise, this._result)
                  : ((this.length = this.length || 0),
                    this._enumerate(),
                    0 === this._remaining && w(this.promise, this._result)))
              : D(this.promise, F());
        }
        function F() {
          return new Error("Array Methods must be provided an Array");
        }
        function M(e) {
          return new V(this, e).promise;
        }
        function U(e) {
          var t = this;
          return new t(
            Y(e)
              ? function (n, i) {
                  for (var r = e.length, a = 0; a < r; a++)
                    t.resolve(e[a]).then(n, i);
                }
              : function (e, t) {
                  return t(new TypeError("You must pass an array to race."));
                }
          );
        }
        function G(e) {
          var t = this,
            n = new t(v);
          return D(n, e), n;
        }
        function B() {
          throw new TypeError(
            "You must pass a resolver function as the first argument to the promise constructor"
          );
        }
        function j() {
          throw new TypeError(
            "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
          );
        }
        function H(e) {
          (this[re] = P()),
            (this._result = this._state = void 0),
            (this._subscribers = []),
            v !== e &&
              ("function" != typeof e && B(),
              this instanceof H ? L(this, e) : j());
        }
        function z() {
          var e = void 0;
          if ("undefined" != typeof i) e = i;
          else if ("undefined" != typeof self) e = self;
          else
            try {
              e = Function("return this")();
            } catch (e) {
              throw new Error(
                "polyfill failed because global object is unavailable in this environment"
              );
            }
          var t = e.Promise;
          if (t) {
            var n = null;
            try {
              n = Object.prototype.toString.call(t.resolve());
            } catch (e) {}
            if ("[object Promise]" === n && !t.cast) return;
          }
          e.Promise = H;
        }
        var K = void 0;
        K = Array.isArray
          ? Array.isArray
          : function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            };
        var Y = K,
          q = 0,
          W = void 0,
          X = void 0,
          $ = function (e, t) {
            (ne[q] = e),
              (ne[q + 1] = t),
              (q += 2),
              2 === q && (X ? X(f) : ie());
          },
          Q = "undefined" != typeof window ? window : void 0,
          J = Q || {},
          Z = J.MutationObserver || J.WebKitMutationObserver,
          ee =
            "undefined" == typeof self &&
            "undefined" != typeof t &&
            "[object process]" === {}.toString.call(t),
          te =
            "undefined" != typeof Uint8ClampedArray &&
            "undefined" != typeof importScripts &&
            "undefined" != typeof MessageChannel,
          ne = new Array(1e3),
          ie = void 0;
        ie = ee ? s() : Z ? c() : te ? l() : void 0 === Q ? p() : d();
        var re = Math.random().toString(36).substring(16),
          ae = void 0,
          oe = 1,
          se = 2,
          ue = new N(),
          ce = new N(),
          le = 0;
        return (
          (V.prototype._enumerate = function () {
            for (
              var e = this.length, t = this._input, n = 0;
              this._state === ae && n < e;
              n++
            )
              this._eachEntry(t[n], n);
          }),
          (V.prototype._eachEntry = function (e, t) {
            var n = this._instanceConstructor,
              i = n.resolve;
            if (i === g) {
              var r = E(e);
              if (r === h && e._state !== ae)
                this._settledAt(e._state, t, e._result);
              else if ("function" != typeof r)
                this._remaining--, (this._result[t] = e);
              else if (n === H) {
                var a = new n(v);
                S(a, e, r), this._willSettleAt(a, t);
              } else
                this._willSettleAt(
                  new n(function (t) {
                    return t(e);
                  }),
                  t
                );
            } else this._willSettleAt(i(e), t);
          }),
          (V.prototype._settledAt = function (e, t, n) {
            var i = this.promise;
            i._state === ae &&
              (this._remaining--, e === se ? D(i, n) : (this._result[t] = n)),
              0 === this._remaining && w(i, this._result);
          }),
          (V.prototype._willSettleAt = function (e, t) {
            var n = this;
            R(
              e,
              void 0,
              function (e) {
                return n._settledAt(oe, t, e);
              },
              function (e) {
                return n._settledAt(se, t, e);
              }
            );
          }),
          (H.all = M),
          (H.race = U),
          (H.resolve = g),
          (H.reject = G),
          (H._setScheduler = a),
          (H._setAsap = o),
          (H._asap = $),
          (H.prototype = {
            constructor: H,
            then: h,
            catch: function (e) {
              return this.then(null, e);
            },
          }),
          (H.polyfill = z),
          (H.Promise = H),
          H
        );
      });
    }.call(
      t,
      n(14),
      (function () {
        return this;
      })()
    ));
  },
  function (e, t) {
    function n() {
      throw new Error("setTimeout has not been defined");
    }
    function i() {
      throw new Error("clearTimeout has not been defined");
    }
    function r(e) {
      if (l === setTimeout) return setTimeout(e, 0);
      if ((l === n || !l) && setTimeout)
        return (l = setTimeout), setTimeout(e, 0);
      try {
        return l(e, 0);
      } catch (t) {
        try {
          return l.call(null, e, 0);
        } catch (t) {
          return l.call(this, e, 0);
        }
      }
    }
    function a(e) {
      if (d === clearTimeout) return clearTimeout(e);
      if ((d === i || !d) && clearTimeout)
        return (d = clearTimeout), clearTimeout(e);
      try {
        return d(e);
      } catch (t) {
        try {
          return d.call(null, e);
        } catch (t) {
          return d.call(this, e);
        }
      }
    }
    function o() {
      g &&
        p &&
        ((g = !1), p.length ? (h = p.concat(h)) : (v = -1), h.length && s());
    }
    function s() {
      if (!g) {
        var e = r(o);
        g = !0;
        for (var t = h.length; t; ) {
          for (p = h, h = []; ++v < t; ) p && p[v].run();
          (v = -1), (t = h.length);
        }
        (p = null), (g = !1), a(e);
      }
    }
    function u(e, t) {
      (this.fun = e), (this.array = t);
    }
    function c() {}
    var l,
      d,
      f = (e.exports = {});
    !(function () {
      try {
        l = "function" == typeof setTimeout ? setTimeout : n;
      } catch (e) {
        l = n;
      }
      try {
        d = "function" == typeof clearTimeout ? clearTimeout : i;
      } catch (e) {
        d = i;
      }
    })();
    var p,
      h = [],
      g = !1,
      v = -1;
    (f.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      h.push(new u(e, t)), 1 !== h.length || g || r(s);
    }),
      (u.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (f.title = "browser"),
      (f.browser = !0),
      (f.env = {}),
      (f.argv = []),
      (f.version = ""),
      (f.versions = {}),
      (f.on = c),
      (f.addListener = c),
      (f.once = c),
      (f.off = c),
      (f.removeListener = c),
      (f.removeAllListeners = c),
      (f.emit = c),
      (f.prependListener = c),
      (f.prependOnceListener = c),
      (f.listeners = function (e) {
        return [];
      }),
      (f.binding = function (e) {
        throw new Error("process.binding is not supported");
      }),
      (f.cwd = function () {
        return "/";
      }),
      (f.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }),
      (f.umask = function () {
        return 0;
      });
  },
  function (e, t) {},
  function (e, t, n) {
    var i = n(2),
      r = n(17),
      a = n(9),
      o = n(18),
      s = r.create(),
      u = {
        action_data: n(21),
        async_request: n(27),
        audience_data: n(28),
        change_data: n(29),
        cleanup: n(30),
        client_metadata: n(31),
        cookie_options: n(33),
        event_data: n(34),
        event_emitter: n(35),
        dimension_data: n(36),
        directive: n(37),
        global: n(38),
        history: n(39),
        integration_settings: n(41),
        layer: n(42),
        layer_data: n(43),
        log: n(45),
        observed_redirect: n(46),
        pending_events: n(47),
        performance: n(48),
        plugins: n(49),
        provider_status: n(50),
        pending_redirect: n(51),
        rum: n(52),
        sandbox: n(53),
        session: n(54),
        tracker_optimizely: n(55),
        ua_data: n(56),
        view: n(57),
        view_data: n(58),
        visitor: n(59),
        visitor_attribute_entity: n(60),
        visitor_events: n(61),
        visitor_events_manager: n(66),
        visitor_id: n(67),
        visitor_bucketing: n(68),
        xdomain: n(69),
      };
    (u["group_data"] = n(70)),
      a.registerStores(u),
      i.forOwn(u, function (e, t) {
        s.register("stores/" + t, a.getStore(t));
      }),
      s.register("core/plugins/matchers/key_value", o),
      (e.exports = s);
  },
  function (e, t, n) {
    function i() {
      this.k = {};
    }
    var r = n(2);
    (i.prototype.register = function (e, t) {
      if (1 === arguments.length) {
        var n = this;
        return void r.each(e, function (e, t) {
          n.register(t, e);
        });
      }
      if (this.k[e]) throw new Error("Module already registered for: " + e);
      this.k[e] = t;
    }),
      (i.prototype.get = function (e) {
        return this.k[e];
      }),
      (i.prototype.getModuleKeys = function () {
        var e = this.k;
        return r.keys(e);
      }),
      (i.prototype.evaluate = function (e) {
        var t = e.length,
          n = e.slice(0, t - 1),
          i = e[t - 1];
        if ("function" != typeof i)
          throw new Error(
            "Evaluate must take a function as last element in array"
          );
        var a = r.map(n, r.bind(this.get, this));
        return i.apply(null, a);
      }),
      (i.prototype.reset = function () {
        this.k = {};
      }),
      (e.exports = {
        create: function () {
          return new i();
        },
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(19).getFieldValue,
      a = n(20);
    e.exports = function (e, t) {
      var n = r(e, t.name.split("."));
      return i.isArray(n)
        ? i.some(n, i.partial(a.hasMatch, t.value, t.match))
        : a.hasMatch(t.value, t.match, n);
    };
  },
  function (e, t, n) {
    var i = n(2);
    (t.getFieldValue = function (e, t) {
      i.isArray(t) || (t = [t]);
      for (var n = e, r = 0; r < t.length; r++) {
        var a = t[r];
        if (!i.isObject(n) || !n.hasOwnProperty(a)) return;
        n = n[a];
      }
      return n;
    }),
      (t.setFieldValue = function (e, t, n) {
        if (!i.isArray(t) || i.isEmpty(t))
          throw new Error("Attempted to set an invalid key path: " + t);
        for (var r = e, a = 0; a < t.length - 1; a++) {
          var o = t[a];
          i.isObject(r[o]) || (r[o] = {}), (r = r[o]);
        }
        r[t[t.length - 1]] = n;
      });
  },
  function (e, t, n) {
    var i = n(2);
    t.hasMatch = function (e, t, n) {
      var r = !i.isUndefined(n) && null !== n,
        a = !i.isUndefined(e) && null !== e,
        o = t || (a ? "exact" : "exists");
      switch (o) {
        case "exists":
          return r;
        case "exact":
          return r && String(n) === e;
        case "substring":
          return r && String(n).indexOf(e) > -1;
        case "regex":
          try {
            if (a && r) {
              var s = new RegExp(e);
              return s.test(String(n));
            }
            return !1;
          } catch (e) {}
          return !1;
        case "range":
          var u = e.split(":"),
            c = parseFloat(u[0]),
            l = parseFloat(u[1]),
            d = parseFloat(n);
          return d >= c && d <= l;
        default:
          return !1;
      }
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22),
      o = n(23);
    e.exports = {
      initialize: function () {
        (this.P = { actions: {}, actionState: {} }),
          this.on(r.DATA_LOADED, this.V),
          this.on(r.ACTION_EXECUTED, this.F),
          this.on(r.SET_CHANGE_APPLIER, this.M),
          this.on(r.REMOVE_ACTION_STATE, this.U);
      },
      V: function (e) {
        var t = this;
        i.isEmpty(e.data.layers) ||
          (i.each(e.data.layers, function (e) {
            var n;
            if (e.changes) {
              var r = "layerId:" + e.id;
              (n = {
                id: r,
                layerId: e.id,
                changeSet: e.changes,
                type: "layer",
              }),
                a.deepFreeze(n),
                (t.P.actions[r] = n);
            }
            i.each(e.experiments, function (r) {
              if (r.changes) {
                var o = "experimentId:" + r.id;
                (n = {
                  id: o,
                  layerId: e.id,
                  experimentId: r.id,
                  changeSet: r.changes,
                  type: "experiment",
                }),
                  a.deepFreeze(n),
                  (t.P.actions[o] = n);
              }
              i.each(r.variations, function (o) {
                i.each(o.actions, function (i) {
                  var s = i.pageId || i.viewId,
                    u = r.id + ":" + o.id + ":" + s;
                  (n = {
                    id: u,
                    layerId: e.id,
                    experimentId: r.id,
                    variationId: o.id,
                    pageId: s,
                    changeSet: i.changes,
                    type: "variation",
                  }),
                    a.deepFreeze(n),
                    (t.P.actions[u] = n);
                });
              });
            });
          }),
          this.emitChange());
      },
      F: function (e) {
        var t = e.actionId;
        i.isUndefined(t) ||
          this.P.actionState[t] ||
          (this.P.actionState[t] = {});
      },
      M: function (e) {
        var t = e.actionId,
          n = e.changeId;
        return this.P.actionState[t]
          ? void (this.P.actionState[t][n] = e.changeApplier)
          : void o.warn(
              "Action Data / Attempted to set changeApplier for inactive action: ",
              t
            );
      },
      U: function (e) {
        delete this.P.actionState[e.actionId];
      },
      get: function (e) {
        return a.safeReference(this.P.actions[e]);
      },
      getActionState: function (e) {
        return a.safeReference(this.P.actionState[e]);
      },
      getByChangeId: function (e) {
        return i.find(this.P.actions, { changeSet: [{ id: e }] });
      },
      getAllActionIdsByPageId: function (e) {
        return i.map(i.filter(this.P.actions, { pageId: e }), "id");
      },
      getChangeApplier: function (e, t) {
        var n = this.P.actionState[t];
        if (n) return n[e];
      },
      getExperimentVariationActions: function (e, t) {
        return a.safeReference(
          i.filter(this.P.actions, { experimentId: e, variationId: t })
        );
      },
      getLayerActions: function (e) {
        return a.safeReference(
          i.filter(this.P.actions, { id: "layerId:" + e })
        );
      },
      getExperimentActions: function (e) {
        return a.safeReference(
          i.filter(this.P.actions, { id: "experimentId:" + e })
        );
      },
      getAll: function () {
        return a.safeReference(i.values(this.P.actions));
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = !1;
    (t.deepFreeze = function e(t) {
      r &&
        i.isObject(t) &&
        !i.isFunction(t) &&
        (i.forOwn(t, e), Object.freeze(t));
    }),
      (t.safeReference = function e(t) {
        return r
          ? !i.isObject(t) || i.isFunction(t) || Object.isFrozen(t)
            ? t
            : i.isArray(t)
            ? i.map(t, e)
            : i.reduce(
                t,
                function (t, n, i) {
                  return (t[i] = e(n)), t;
                },
                {}
              )
          : i.cloneDeep(t);
      });
  },
  function (e, t, n) {
    function i() {
      (this.logLevel = null),
        (this.logMatch = null),
        (this.logs = []),
        (this.timebase = o.now());
    }
    var r = n(2),
      a = n(7),
      o = n(24),
      s = n(25),
      u = n(9),
      c = n(26);
    (i.prototype.G = function () {
      return !r.isNull(this.logLevel);
    }),
      (i.prototype.setLogLevel = function (e) {
        var t = this.B(e);
        null === t
          ? console.error("Unknown log level: " + e)
          : this.logLevel !== t &&
            (this.log("Setting log level to " + t),
            (this.logLevel = t),
            this.flush());
      }),
      (i.prototype.setLogMatcher = function (e) {
        r.isString(e) ? (this.logMatcher = e) : (this.logMatcher = ""),
          (this.logGroup = 0);
      }),
      (i.prototype.shouldLog = function (e) {
        return this.G() && this.logLevel >= e;
      }),
      (i.prototype.matchesLogMessage = function (e, t) {
        var n = this.logMatcher;
        if (!this.logMatcher) return !0;
        if (this.logGroup)
          return (
            "GROUPSTART" === e
              ? this.logGroup++
              : "GROUPEND" === e && this.logGroup--,
            !0
          );
        var i = r.some(t, function (e) {
          if (!r.isString(e))
            try {
              e = c.stringify(e);
            } catch (e) {}
          return r.isString(e) && r.includes(e, n);
        });
        return i && "GROUPSTART" === e && this.logGroup++, i;
      }),
      (i.prototype.storeLog = function (e, t) {
        var n = { logLevel: e, logMessage: t };
        u.dispatch(a.LOG, n);
      }),
      (i.prototype.flush = function () {
        var e = n(16),
          t = e.get("stores/log");
        this.logGroup = 0;
        var i = t.getLogs();
        r.each(
          i,
          r.bind(function (e) {
            this.j(e.logLevel, e.logMessage, !0);
          }, this)
        );
      }),
      (i.prototype.j = function (e, t, n) {
        var i,
          a = e;
        if (console)
          switch (e) {
            case "GROUPSTART":
              (i = console.groupCollapsed), (a = s.LogLevel.DEBUG);
              break;
            case "GROUPEND":
              (i = console.groupEnd), (a = s.LogLevel.DEBUG);
              break;
            case s.LogLevel.ERROR:
              i = console.error;
              break;
            case s.LogLevel.WARN:
              i = console.warn;
              break;
            case s.LogLevel.DEBUG:
              i = console.debug;
              break;
            default:
              i = console.log;
          }
        try {
          n ||
            (this.G() && !this.shouldLog(a)) ||
            (r.isArray(t) && r.isString(t[0]) && (t = this.H(t)),
            this.storeLog(e, t)),
            i &&
              this.shouldLog(a) &&
              this.matchesLogMessage(e, t) &&
              i.apply(console, t);
        } catch (e) {
          console && (console.error ? console.error(e) : console.log(e));
        }
      }),
      (i.prototype.debug = function () {
        this.j(s.LogLevel.DEBUG, [].slice.call(arguments));
      }),
      (i.prototype.log = function () {
        this.j(s.LogLevel.INFO, [].slice.call(arguments));
      }),
      (i.prototype.logAlways = function () {
        var e = this.H([].slice.call(arguments));
        console &&
          console.log &&
          console.log.apply &&
          console.log.apply(console, e),
          this.storeLog(s.LogLevel.INFO, e);
      }),
      (i.prototype.warn = function () {
        this.j(s.LogLevel.WARN, [].slice.call(arguments));
      }),
      (i.prototype.error = function (e) {
        var t = [].slice.call(arguments);
        1 === t.length && e.stack
          ? (this.j(s.LogLevel.ERROR, [this.z(), e]),
            this.j(s.LogLevel.INFO, [e.stack]))
          : this.j(s.LogLevel.ERROR, t);
      }),
      (i.prototype.groupCollapsed = function () {
        this.j("GROUPSTART", [].slice.call(arguments));
      }),
      (i.prototype.groupEnd = function () {
        this.j("GROUPEND", [].slice.call(arguments));
      }),
      (i.prototype.H = function (e) {
        var t = this.z().toString();
        return (
          t.length < 6 && (t = ("     " + t).slice(-6)),
          [t + "| Optly / " + e[0]].concat(e.slice(1))
        );
      }),
      (i.prototype.z = function () {
        return this.timebase ? o.now() - this.timebase : 0;
      }),
      (i.prototype.B = function (e) {
        return e &&
          ((e = e.toUpperCase()),
          "TRUE" === e && (e = "INFO"),
          "FALSE" === e && (e = "OFF"),
          "ALL" === e && (e = "DEBUG"),
          !r.isUndefined(s.LogLevel[e]))
          ? s.LogLevel[e]
          : null;
      }),
      (e.exports = new i());
  },
  function (e, t) {
    t.now = function () {
      return +new Date();
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(8);
    (t.COOKIES = {
      OPT_OUT: "optimizelyOptOut",
      PREVIEW: "optimizelyPreview",
      REDIRECT: "optimizelyRedirectData",
      SESSION_STATE: "optimizelySessionState",
      TOKEN: "optimizelyToken",
      VISITOR_ID: "optimizelyEndUserId",
      VISITOR_UUID: "optimizelyPPID",
    }),
      (t.LayerActivationTypes = {
        CONDITIONAL: "conditional",
        IMMEDIATE: "immediate",
        MANUAL: "manual",
        READY: "ready",
        TIMEOUT: "timeout",
      }),
      (t.LogLevel = { OFF: 0, ERROR: 1, WARN: 2, INFO: 3, DEBUG: 4 }),
      (t.Lifecycle = r({
        preActivate: null,
        postVisitorProfileLoad: null,
        postViewsActivated: null,
        postActivate: null,
      })),
      (t.ViewActivationTypes = {
        immediate: "immediate",
        manual: "manual",
        callback: "callback",
        polling: "polling",
        URLChanged: "url_changed",
        DOMChanged: "dom_changed",
      }),
      (t.StorageKeys = {
        PENDING_EVENTS: "pending_events",
        RELAYED_EVENTS: "relayed_events",
      }),
      (t.PluginTypes = r({
        visitorProfileProviders: null,
        viewProviders: null,
        audienceMatchers: null,
        viewMatchers: null,
        analyticsTrackers: null,
        viewTagLocators: null,
        userFeatureDefs: null,
        apiModules: null,
        changeAppliers: null,
        deciders: null,
        eventImplementations: null,
        viewTriggers: null,
      })),
      (t.ResourceTimingAttributes = r({
        connectStart: null,
        connectEnd: null,
        decodedBodySize: null,
        domainLookupStart: null,
        domainLookupEnd: null,
        duration: null,
        encodedBodySize: null,
        fetchStart: null,
        requestStart: null,
        responseStart: null,
        responseEnd: null,
        secureConnectionStart: null,
        startTime: null,
        transferSize: null,
        serverTiming: null,
      })),
      (t.RUMPerformanceTimingAttributes = r({ blockTime: null })),
      (t.AttributionTypes = r({ FIRST_TOUCH: null, LAST_TOUCH: null })),
      (t.SandboxedFunctions = r({ XMLHttpRequest: null })),
      (t.PerformanceData = r({
        performance_marks: null,
        resource_timing: null,
        performance_timing: null,
      })),
      (t.PerformanceCounters = r({
        mutation_observer_invocation: null,
        polling_invocation: null,
        match_selector_invocation: null,
      })),
      (t.VisitorStorageKeys = {
        EVENTS: "events",
        EVENT_QUEUE: "event_queue",
        LAYER_MAP: "layer_map",
        LAYER_STATES: "layer_states",
        SESSION_STATE: "session_state",
        VISITOR_PROFILE: "visitor_profile",
        VARIATION_MAP: "variation_map",
        TRACKER_OPTIMIZELY: "tracker_optimizely",
      }),
      (t.AllStorageKeys = i.assign({}, t.StorageKeys, t.VisitorStorageKeys)),
      (t.ListTargetingKeyTypes = { COOKIE: "c", QUERY: "q", JS_VARIABLE: "j" }),
      (t.VisitorIdLocatorType = {
        COOKIE: "cookie",
        JS_VARIABLE: "js",
        LOCALSTORAGE: "localStorage",
        QUERY: "query",
      });
  },
  function (e, t, n) {
    function i(e) {
      var t = [Array.prototype],
        n = [];
      r.each(t, function (e) {
        r.isUndefined(e.toJSON) || (n.push(e.toJSON), delete e.toJSON);
      });
      var i, a;
      try {
        i = e();
      } catch (e) {
        a = e;
      } finally {
        r.each(n, function (e, n) {
          t[n].toJSON = e;
        });
      }
      if (a) throw a;
      return i;
    }
    var r = n(2);
    (t.stringify = function () {
      return i(
        r.bind(function () {
          return JSON.stringify.apply(null, this);
        }, arguments)
      );
    }),
      (t.parse = JSON.parse);
  },
  function (e, t, n) {
    var i = n(7);
    e.exports = {
      initialize: function () {
        (this.P = {}),
          this.on(i.REGISTER_ASYNC_DEFERRED, this.K),
          this.on(i.RESOLVE_DEFERRED, this.Y),
          this.on(i.REJECT_DEFERRED, this.q);
      },
      getRequest: function (e) {
        return this.P[e];
      },
      getPromise: function (e) {
        var t = this.getRequest(e);
        if (t) return t.promise;
      },
      K: function (e) {
        this.P[e.source] = {
          promise: e.promise,
          resolver: e.resolver,
          rejecter: e.rejecter,
        };
      },
      Y: function (e) {
        var t = this.getRequest(e.source);
        if (!t)
          throw new Error("No request registered for source: " + e.source);
        t.resolver(e.resolveWith);
      },
      q: function (e) {
        var t = this.getRequest(e.source);
        if (!t)
          throw new Error("No request registered for source: " + e.source);
        if (!t.rejecter)
          throw new Error("No rejecter registered for source: " + e.source);
        t.rejecter(e.rejectWith);
      },
    };
  },
  function (e, t, n) {
    function i(e, t) {
      return (
        t || (t = {}),
        e
          ? (r.each(e, function (e) {
              if (!r.isString(e)) {
                if (r.isObject(e)) {
                  var n = e.type,
                    a = e.name || "_";
                  t[n] || (t[n] = {}), (t[n][a] = !0);
                }
                r.isArray(e) && i(e, t);
              }
            }),
            t)
          : t
      );
    }
    var r = n(2),
      a = n(7),
      o = n(22);
    e.exports = {
      initialize: function () {
        (this.P = { audiences: {}, featuresNeeded: {} }),
          this.on(a.DATA_LOADED, this.V);
      },
      V: function (e) {
        r.isEmpty(e.data.audiences) ||
          (r.each(
            e.data.audiences,
            r.bind(function (e) {
              o.deepFreeze(e),
                r.merge(this.P.featuresNeeded, i(e.conditions)),
                (this.P.audiences[e.id] = e);
            }, this)
          ),
          this.emitChange());
      },
      getAll: function () {
        return o.safeReference(r.values(this.P.audiences));
      },
      getFeaturesNeeded: function (e) {
        return o.safeReference(this.P.featuresNeeded[e] || {});
      },
      getAudiencesMap: function () {
        return o.safeReference(this.P.audiences);
      },
      get: function (e) {
        return o.safeReference(this.P.audiences[e]);
      },
      getAudienceName: function (e) {
        var t = r.find(r.values(this.P.audiences), { id: e });
        return t.name || "Aud " + e;
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22);
    e.exports = {
      initialize: function () {
        (this.P = {}),
          this.on(r.ADD_CHANGE, this.W),
          this.on(r.DATA_LOADED, this.V);
      },
      getChange: function (e) {
        return this.P[e];
      },
      V: function (e) {
        i.isEmpty(e.data.changes) ||
          i.each(e.data.changes, i.bind(this.W, this));
      },
      W: function (e) {
        a.deepFreeze(e), (this.P[e.id] = e), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(25);
    e.exports = {
      initialize: function () {
        (this.P = {}),
          i.each(
            a.Lifecycle,
            i.bind(function (e) {
              this.P[e] = [];
            }, this)
          ),
          this.on(r.ADD_CLEANUP_FN, this.X),
          this.on(r.CLEAR_CLEANUP_FN, this.Q);
      },
      getCleanupFns: function (e) {
        return i.cloneDeep(this.P[e]);
      },
      X: function (e) {
        this.P[e.lifecycle].push(e.cleanupFn), this.emitChange();
      },
      Q: function (e) {
        var t = this.P[e.lifecycle];
        if (e.cleanupFn) {
          var n = t.indexOf(e.cleanupFn);
          n > -1 && (t.splice(n, 1), this.emitChange());
        } else (this.P[e.lifecycle] = []), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(7),
      r = n(32);
    e.exports = {
      initialize: function () {
        (this.P = { name: r.NAME, version: r.VERSION }),
          this.on(i.SET_CLIENT_NAME, this.J),
          this.on(i.SET_CLIENT_VERSION, this.Z);
      },
      getClientName: function () {
        return this.P.name;
      },
      getClientVersion: function () {
        return this.P.version;
      },
      J: function (e) {
        e && (this.P.name = e), this.emitChange();
      },
      Z: function (e) {
        e && (this.P.version = e), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    (t.VERSION = "0.164.0"), (t.NAME = "js");
  },
  function (e, t, n) {
    var i = n(7),
      r = 15552e3,
      a = !0;
    e.exports = {
      initialize: function () {
        (this.P = {
          currentDomain: null,
          defaultAgeSeconds: r,
          autoRefresh: a,
        }),
          this.on(i.SET_COOKIE_DOMAIN, this.ee),
          this.on(i.SET_COOKIE_AGE, this.te),
          this.on(i.SET_COOKIE_AUTO_REFRESH, this.ne);
      },
      getCurrentDomain: function () {
        return this.P.currentDomain;
      },
      getDefaultAgeInSeconds: function () {
        return this.P.defaultAgeSeconds;
      },
      getAutoRefresh: function () {
        return this.P.autoRefresh;
      },
      ee: function (e) {
        (this.P.currentDomain = e), this.emitChange();
      },
      te: function (e) {
        (this.P.defaultAgeSeconds = e), this.emitChange();
      },
      ne: function (e) {
        (this.P.autoRefresh = e), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22);
    e.exports = {
      initialize: function () {
        (this.P = {}), this.on(r.DATA_LOADED, this.V);
      },
      getAll: function () {
        return a.safeReference(i.values(this.P));
      },
      getEventsMap: function () {
        return a.safeReference(this.P);
      },
      get: function (e) {
        return a.safeReference(this.P[e]);
      },
      getByApiName: function (e) {
        return a.safeReference(i.find(i.values(this.P), { apiName: e }));
      },
      getByPageId: function (e) {
        return a.safeReference(i.filter(this.P, { pageId: e }));
      },
      V: function (e) {
        i.isEmpty(e.data.events) ||
          (i.each(
            e.data.events,
            i.bind(function (e) {
              e.pageId || (e.pageId = e.viewId),
                a.deepFreeze(e),
                (this.P[e.id] = e);
            }, this)
          ),
          this.emitChange());
      },
    };
  },
  function (e, t, n) {
    function i(e) {
      var t = [];
      return e && r.isObject(e)
        ? (e.type && t.push(e.type),
          t.push(o),
          e.type && e.name && t.push(e.name),
          t.join(""))
        : o;
    }
    var r = n(2),
      a = n(7),
      o = "|";
    e.exports = {
      initialize: function () {
        (this.P = { handlers: {} }),
          this.on(a.ADD_EMITTER_HANDLER, this.re),
          this.on(a.REMOVE_EMITTER_HANDLER, this.ae);
      },
      getHandlers: function (e, t) {
        var n = [null, { type: e.type }, { type: e.type, name: e.name }],
          a = [];
        return (
          r.each(
            n,
            r.bind(function (e) {
              var t = i(e),
                n = this.P.handlers[t];
              n && (a = a.concat(n));
            }, this)
          ),
          t &&
            (a = r.filter(a, function (e) {
              return !e.publicOnly;
            })),
          a
        );
      },
      re: function (e) {
        var t = i(e.filter);
        this.P.handlers[t] || (this.P.handlers[t] = []),
          this.P.handlers[t].push({
            handler: e.handler,
            token: e.token,
            publicOnly: !!e.publicOnly,
            emitErrors: !!e.emitErrors,
          }),
          this.emitChange();
      },
      ae: function (e) {
        var t = !1,
          n = e.token;
        r.forOwn(
          this.P.handlers,
          r.bind(function (e, i) {
            var a = r.filter(e, function (e) {
              return e.token !== n;
            });
            a.length !== e.length && ((t = !0), (this.P.handlers[i] = a));
          }, this)
        ),
          t && this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22);
    e.exports = {
      initialize: function () {
        (this.P = {}), this.on(r.DATA_LOADED, this.V);
      },
      V: function (e) {
        i.isEmpty(e.data.dimensions) ||
          (i.each(
            e.data.dimensions,
            i.bind(function (e) {
              a.deepFreeze(e), (this.P[e.id] = e);
            }, this)
          ),
          this.emitChange());
      },
      getAll: function () {
        return a.safeReference(i.values(this.P));
      },
      getById: function (e) {
        return a.safeReference(this.P[e]);
      },
      getByApiName: function (e) {
        return a.safeReference(i.find(i.values(this.P), { apiName: e }));
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        (this.P = {
          disabled: !1,
          forceAudienceIds: [],
          forceVariationIds: [],
          alreadyInitialized: !1,
          mutationObserverAPISupported: !1,
          isEditor: !1,
          isPreview: !1,
          isLegacyPreview: !1,
          isSlave: !1,
          previewLayerIds: [],
          projectToken: null,
          shouldOptOut: !1,
          trackingDisabled: !1,
          isRunningInV2Editor: !1,
          isRunningInDesktopApp: !1,
          forceTracking: !1,
        }),
          this.on(r.LOAD_DIRECTIVE, this.oe);
      },
      getAll: function () {
        return i.cloneDeep(this.P);
      },
      conflictInObservingChanges: function () {
        return !this.P.mutationObserverAPISupported;
      },
      isDisabled: function () {
        return this.P.disabled;
      },
      isEditor: function () {
        return this.P.isEditor;
      },
      clientHasAlreadyInitialized: function () {
        return this.P.alreadyInitialized;
      },
      getForceAudienceIds: function () {
        return this.P.forceAudienceIds;
      },
      getForceVariationIds: function () {
        return this.P.forceVariationIds;
      },
      getPreviewLayerIds: function () {
        return this.P.previewLayerIds;
      },
      getProjectToken: function () {
        return this.P.projectToken;
      },
      getForceTracking: function () {
        return this.P.forceTracking;
      },
      shouldActivate: function () {
        return !this.P.isEditor && !this.isDisabled();
      },
      shouldBootstrapDataForPreview: function () {
        return this.P.isPreview;
      },
      shouldBootstrapDataForEditor: function () {
        return this.P.isEditor;
      },
      shouldInitialize: function () {
        return !(
          this.shouldLoadPreview() ||
          this.isDisabled() ||
          this.getProjectToken()
        );
      },
      shouldLoadPreview: function () {
        return !(
          this.P.isPreview ||
          this.P.isLegacyPreview ||
          !this.getProjectToken() ||
          this.P.isEditor
        );
      },
      shouldBailForDesktopApp: function () {
        return !this.P.isEditor && this.P.isRunningInDesktopApp;
      },
      shouldLoadInnie: function () {
        return (
          !this.P.isSlave && !this.P.isEditor && this.P.isRunningInV2Editor
        );
      },
      shouldObserveChangesIndefinitely: function () {
        return this.P.mutationObserverAPISupported;
      },
      shouldObserveChangesUntilTimeout: function () {
        return !this.shouldObserveChangesIndefinitely();
      },
      shouldOptOut: function () {
        return this.P.shouldOptOut;
      },
      shouldSendTrackingData: function () {
        return (
          !this.P.trackingDisabled &&
          (!!this.P.forceTracking ||
            (!this.P.isPreview &&
              i.isEmpty(this.getForceVariationIds()) &&
              i.isEmpty(this.getForceAudienceIds())))
        );
      },
      isSlave: function () {
        return this.P.isSlave;
      },
      isRunningInDesktopApp: function () {
        return this.P.isRunningInDesktopApp;
      },
      isRunningInV2Editor: function () {
        return this.P.isRunningInV2Editor;
      },
      oe: function (e) {
        i.extend(this.P, e), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22);
    e.exports = {
      initialize: function () {
        (this.P = {
          holdback: 0,
          isGlobalHoldback: null,
          listTargetingKeys: [],
          revision: null,
          projectId: null,
          accountId: null,
          namespace: null,
          activationId: null,
          activationTimestamp: null,
          dcpServiceId: null,
          dcpKeyfieldLocators: [],
          recommenderServices: [],
          anonymizeIP: null,
          projectJS: null,
          snippetId: null,
          plugins: [],
          domContentLoaded: !1,
          experimental: {},
        }),
          this.on(r.DATA_LOADED, this.se),
          this.on(r.ACTIVATE, this.ue),
          this.on(r.RECORD_GLOBAL_DECISION, this.ce),
          this.on(r.SET_DOMCONTENTLOADED, this.le);
      },
      getRevision: function () {
        return this.P.revision;
      },
      getGlobalHoldbackThreshold: function () {
        return this.P.holdback;
      },
      getProjectId: function () {
        return this.P.projectId;
      },
      getSnippetId: function () {
        return this.P.snippetId;
      },
      getAccountId: function () {
        return this.P.accountId;
      },
      getNamespace: function () {
        return this.P.namespace;
      },
      getActivationId: function () {
        return this.P.activationId;
      },
      getActivationTimestamp: function () {
        return this.P.activationTimestamp;
      },
      getAnonymizeIP: function () {
        return this.P.anonymizeIP;
      },
      isGlobalHoldback: function () {
        return !!this.P.isGlobalHoldback;
      },
      getListTargetingKeys: function () {
        return this.P.listTargetingKeys.slice();
      },
      getDCPServiceId: function () {
        return this.P.dcpServiceId;
      },
      getDCPKeyfieldLocators: function () {
        return this.P.dcpKeyfieldLocators;
      },
      getRecommenderServices: function () {
        return this.P.recommenderServices;
      },
      getProjectJS: function () {
        return this.P.projectJS;
      },
      getPlugins: function () {
        return this.P.plugins;
      },
      getExperimental: function () {
        return a.safeReference(this.P.experimental);
      },
      domContentLoadedHasFired: function () {
        return this.P.domContentLoaded;
      },
      ue: function (e) {
        (this.P.activationId = e.activationId),
          (this.P.activationTimestamp = e.activationTimestamp),
          (this.P.isGlobalHoldback = null);
      },
      ce: function (e) {
        var t = e.isGlobalHoldback;
        if (null !== this.P.isGlobalHoldback && this.P.isGlobalHoldback !== t)
          throw new Error("Attempted to change already set global holdback!");
        (this.P.isGlobalHoldback = t), this.emitChange();
      },
      se: function (e) {
        var t = i.pick(e.data, [
          "holdback",
          "accountId",
          "projectId",
          "snippetId",
          "namespace",
          "revision",
          "listTargetingKeys",
          "dcpServiceId",
          "dcpKeyfieldLocators",
          "recommenderServices",
          "anonymizeIP",
          "plugins",
          "projectJS",
          "experimental",
        ]);
        if (0 !== i.keys(t).length) {
          var n = {
            listTargetingKeys: [],
            dcpServiceId: null,
            dcpKeyfieldLocators: [],
          };
          i.extend(this.P, n, t), this.emitChange();
        }
      },
      le: function () {
        (this.P.domContentLoaded = !0), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(40);
    e.exports = {
      initialize: function () {
        (this.P = { originalPushState: null, originalReplaceState: null }),
          this.on(r.ENSURE_ORIGINAL_PUSHSTATE, this.de),
          this.on(r.ENSURE_ORIGINAL_REPLACESTATE, this.fe);
      },
      getOriginalPushState: function () {
        return this.P.originalPushState;
      },
      getOriginalReplaceState: function () {
        return this.P.originalReplaceState;
      },
      de: function () {
        this.P.originalPushState ||
          (this.P.originalPushState = i.bind(
            a.getGlobal("history").pushState,
            a.getGlobal("history")
          ));
      },
      fe: function () {
        this.P.originalReplaceState ||
          (this.P.originalReplaceState = i.bind(
            a.getGlobal("history").replaceState,
            a.getGlobal("history")
          ));
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(23);
    (t.getUserAgent = function () {
      return window.navigator.userAgent;
    }),
      (t.getLocationSearch = function () {
        return window.location.search;
      }),
      (t.getNavigatorLanguage = function () {
        return window.navigator.language || window.navigator.userLanguage;
      }),
      (t.getHref = function () {
        return window.location.href;
      }),
      (t.getLocation = function () {
        return window.location;
      }),
      (t.setLocation = function (e) {
        window.location.replace(e);
      }),
      (t.setGlobal = function (e, t) {
        window[e] = t;
      }),
      (t.getGlobal = function (e) {
        return window[e];
      }),
      (t.getGlobalByPath = function (e) {
        for (var t = e.split("."), n = window; t.length; )
          try {
            n = n[t.shift()];
          } catch (t) {
            throw (
              (r.error("Attempted to access nonexistent property. Path ", e),
              new Error("Attempted to access nonexistent property. Path ", e))
            );
          }
        return n;
      }),
      (t.addEventListener = function () {
        return window.addEventListener.apply(window, arguments);
      }),
      (t.removeEventListener = function () {
        return window.removeEventListener.apply(window, arguments);
      }),
      (t.isMutationObserverAPISupported = function () {
        return !i.isUndefined(window.MutationObserver);
      }),
      (t.alert = function (e) {
        alert(e);
      }),
      (t.setTimeout = function (e, t) {
        return setTimeout(function () {
          try {
            e();
          } catch (e) {
            r.warn("Deferred function threw error:", e);
          }
        }, t);
      }),
      (t.setInterval = function (e, t) {
        return setInterval(function () {
          try {
            e();
          } catch (e) {
            r.warn("Polling function threw error:", e);
          }
        }, t);
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        (this.P = {}),
          this.on(r.DATA_LOADED, this.V),
          this.on(r.SET_INTEGRATION_SETTINGS, this.pe);
      },
      V: function (e) {
        i.isEmpty(e.data.integrationSettings) ||
          (i.each(
            e.data.integrationSettings,
            i.bind(function (e) {
              this.P[e.id] = e;
            }, this)
          ),
          this.emitChange());
      },
      pe: function (e) {
        var t = this.P[e.id];
        t ? i.extend(t, e) : (this.P[e.id] = e);
      },
      getAll: function () {
        return i.cloneDeep(i.values(this.P));
      },
      get: function (e) {
        return i.cloneDeep(this.P[e]);
      },
      getReference: function (e) {
        return this.P[e];
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(23),
      o = "*";
    e.exports = {
      initialize: function () {
        (this.P = {}),
          this.on(r.LOAD_PERSISTED_LAYER_STATES, this.he),
          this.on(r.RECORD_LAYER_DECISION, this.ge),
          this.on(r.RECORD_LAYER_DECISION_EVENT_ID, this.ve);
      },
      getLayerState: function (e, t) {
        if (this.P[e]) {
          var n = this.P[e];
          if (i.keys(n).length > 1 && !t)
            throw new Error(
              "View Id must be specified when more than one layerState for layer."
            );
          return t ? i.cloneDeep(i.find(n, { pageId: t })) : i.cloneDeep(n[o]);
        }
      },
      getLayerStates: function (e) {
        var t = [];
        for (var n in this.P)
          i.forEach(this.P[n], function (n) {
            (i.isUndefined(e) || n.namespace === e) && t.push(i.cloneDeep(n));
          });
        return t;
      },
      getLayerStatesForAnalytics: function () {
        var e = [];
        for (var t in this.P)
          i.forEach(this.P[t], function (t) {
            e.push(i.pick(t, ["layerId", "decision", "decisionEventId"]));
          });
        return e;
      },
      he: function (e) {
        e.merge || (this.P = {}),
          i.each(
            e.layerStates,
            i.bind(function (e) {
              var t = e.layerId;
              e.pageId || (e.pageId = e.viewId);
              var n = e.pageId || o,
                r = this.P[t];
              if (i.isUndefined(r)) (this.P[t] = {}), (this.P[t][n] = e);
              else {
                var a = r[n];
                (!a || e.decisionTimestamp > (a.decisionTimestamp || 0)) &&
                  (this.P[t][n] = e);
              }
            }, this)
          ),
          this.emitChange();
      },
      ge: function (e) {
        var t = {
            layerId: e.layerId,
            revision: e.revision,
            namespace: e.namespace,
            pageId: e.pageId,
            decisionTicket: e.decisionTicket,
            decision: e.decision,
            decisionActivationId: e.activationId,
            decisionTimestamp: e.timestamp,
            decisionEventId: null,
          },
          n = this.P[e.layerId] || {};
        e.pageId ? (delete n[o], (n[e.pageId] = t)) : ((n = {}), (n[o] = t)),
          (this.P[e.layerId] = n),
          this.emitChange();
      },
      ve: function (e) {
        var t = e.layerId,
          n = e.pageId || o;
        return this.P[t]
          ? this.P[t][n]
            ? ((this.P[t][n].decisionEventId = e.decisionId),
              void this.emitChange())
            : void a.warn(
                "Not recording decision event: Layer state not found for view",
                n
              )
          : void a.warn(
              "Not recording decision event: Campaign not registered",
              t
            );
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22),
      o = n(44);
    e.exports = {
      initialize: function () {
        (this.P = { layers: {}, experiments: {}, variations: {} }),
          this.on(r.DATA_LOADED, this.V);
      },
      V: function (e) {
        if (!i.isEmpty(e.data.layers)) {
          var t = this;
          i.each(e.data.layers, function (e) {
            i.each(e.experiments, function (n) {
              e.pageIds || (e.pageIds = e.viewIds),
                n.campaignName || o.isSingleExperimentPolicy(e.policy)
                  ? o.isSingleExperimentPolicy(e.policy) &&
                    e.groupId &&
                    (n.groupId = e.groupId)
                  : (n.campaignName = e.name),
                i.each(n.variations, function (e) {
                  i.each(e.actions, function (e) {
                    e.pageId || (e.pageId = e.viewId);
                  }),
                    (t.P.variations[e.id] = e);
                }),
                (t.P.experiments[n.id] = n);
            }),
              a.deepFreeze(e),
              (t.P.layers[e.id] = e);
          }),
            this.emitChange();
        }
      },
      getAll: function () {
        return a.safeReference(i.values(this.P.layers));
      },
      getCampaignsMap: function () {
        return a.safeReference(this.P.layers);
      },
      getExperimentsMap: function () {
        return a.safeReference(this.P.experiments);
      },
      getVariationsMap: function () {
        return a.safeReference(this.P.variations);
      },
      getCount: function () {
        return i.keys(this.P.layers).length;
      },
      getAllByPageIds: function (e) {
        return a.safeReference(
          i.filter(this.P.layers, function (t) {
            return i.some(e, i.partial(i.includes, t.pageIds));
          })
        );
      },
      get: function (e) {
        return a.safeReference(this.P.layers[e]);
      },
      getLayerByExperimentId: function (e) {
        var t = i.find(this.P.layers, function (t) {
          return i.find(t.experiments, { id: e });
        });
        return a.safeReference(t);
      },
      getExperimentByVariationId: function (e) {
        var t;
        return (
          i.some(this.P.layers, function (n) {
            return (
              i.some(n.experiments, function (n) {
                return i.find(n.variations, { id: e }) && (t = n), t;
              }),
              t
            );
          }),
          a.safeReference(t)
        );
      },
    };
  },
  function (e, t) {
    var n = "single_experiment",
      i = "multivariate";
    t.isSingleExperimentPolicy = function (e) {
      return e === n || e === i;
    };
  },
  function (e, t, n) {
    var i = n(7);
    e.exports = {
      initialize: function () {
        (this.P = { logs: [] }), this.on(i.LOG, this._e);
      },
      getLogs: function () {
        return this.P.logs;
      },
      _e: function (e) {
        this.P.logs.push(e), this.emitChange();
      },
      w: function () {
        return this.P.logs.slice();
      },
    };
  },
  function (e, t, n) {
    var i = n(7),
      r = n(22);
    e.exports = {
      initialize: function () {
        (this.P = { data: null, hasTracked: null }),
          this.on(i.LOAD_REDIRECT_DATA, this.me),
          this.on(i.REGISTER_TRACKED_REDIRECT_DATA, this.Ee);
      },
      get: function () {
        return r.safeReference(this.P.data);
      },
      hasTracked: function () {
        return this.P.hasTracked;
      },
      me: function (e) {
        r.deepFreeze(e),
          (this.P.data = e),
          (this.P.hasTracked = !1),
          this.emitChange();
      },
      Ee: function () {
        this.P.hasTracked = !0;
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(26),
      o = 1e3;
    e.exports = {
      initialize: function () {
        (this.P = {}),
          this.on(r.SET_PENDING_EVENT, this.ye),
          this.on(r.REMOVE_PENDING_EVENT, this.Ie),
          this.on(r.LOAD_PENDING_EVENTS, this.Te);
      },
      getEvents: function () {
        return this.P;
      },
      getEventsString: function () {
        return a.stringify(this.P);
      },
      ye: function (e) {
        i.keys(this.P).length >= o && this.Se();
        var t = e.id,
          n = e.retryCount;
        (this.P[t] && this.P[t].retryCount === n) ||
          ((this.P[t] = {
            id: t,
            timeStamp: e.timeStamp,
            data: e.data,
            retryCount: n,
          }),
          this.emitChange());
      },
      Ie: function (e) {
        delete this.P[e.id], this.emitChange();
      },
      Te: function (e) {
        (this.P = e.events), this.Se(), this.emitChange();
      },
      Se: function () {
        for (
          var e = i.sortBy(this.P, "timeStamp"), t = 0;
          t <= e.length - o;
          t++
        )
          delete this.P[e[t].id];
        this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(25);
    e.exports = {
      initialize: function () {
        (this.P = {}),
          (this.P[a.PerformanceData.performance_marks] = {}),
          this.on(r.SET_PERFORMANCE_MARKS_DATA, this.Ae);
      },
      Ae: function (e) {
        i.isUndefined(this.P[a.PerformanceData.performance_marks][e.name]) &&
          (this.P[a.PerformanceData.performance_marks][e.name] = []),
          this.P[a.PerformanceData.performance_marks][e.name].push(e.data),
          this.emitChange();
      },
      getMarks: function () {
        return i.mapValues(
          this.P[a.PerformanceData.performance_marks],
          function (e) {
            return i.map(e, function (e) {
              return [e.startTime, e.duration];
            });
          }
        );
      },
      getDurationsFor: function (e) {
        return i.reduce(
          e,
          i.bind(function (e, t) {
            var n = this.P[a.PerformanceData.performance_marks][t];
            return (
              n &&
                (e[t] = Math.round(
                  i.reduce(
                    n,
                    function (e, t) {
                      return e + t.duration;
                    },
                    0
                  )
                )),
              e
            );
          }, this),
          {}
        );
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(25),
      o = n(23);
    e.exports = {
      initialize: function () {
        (this.P = i.mapValues(a.PluginTypes, function () {
          return {};
        })),
          this.on(r.REGISTER_PLUGIN, this.be);
      },
      be: function (e) {
        var t = e.type,
          n = e.name,
          i = e.plugin;
        if (!t || !n)
          throw new Error(
            "Missing information needed to register plugins: " + t + ":" + n
          );
        if (!this.P[t]) throw new Error("Invalid plugin type specified: " + t);
        (this.P[t][n] = i), o.debug("Plugin Store: Registering Plugin :", e);
      },
      getAllPlugins: function (e) {
        if (e) {
          if (this.P[e]) return this.P[e];
          throw new Error("Invalid plugin type: " + e);
        }
        return this.P;
      },
      getPlugin: function (e, t) {
        if (!t || !e) throw new Error("Missing plugin parameters");
        var n = this.getAllPlugins(e);
        return n[t] || null;
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(19);
    e.exports = {
      initialize: function () {
        (this.P = {}), this.on(r.SET_VISITOR_ATTRIBUTE_PENDING, this.we);
      },
      getPendingAttributeValue: function (e) {
        return (
          (e = i.isArray(e) ? e.concat("pending") : [e, "pending"]),
          a.getFieldValue(this.P, e)
        );
      },
      we: function (e) {
        a.setFieldValue(this.P, e.key, { pending: e.pending }),
          this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        (this.P = { layerId: null }),
          this.on(r.ANNOUNCE_PENDING_REDIRECT, this.me);
      },
      isExpectingRedirect: function () {
        return i.isString(this.P.layerId);
      },
      getLayerId: function () {
        return this.P.layerId;
      },
      me: function (e) {
        this.isExpectingRedirect() ||
          ((this.P.layerId = e.layerId), this.emitChange());
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        (this.P = {
          inRumSample: !1,
          id: null,
          src: null,
          RumHost: null,
          data: { extras: {} },
          apis: {},
          DOMObservation: {},
          featuresNeeded: {},
        }),
          this.on(r.SET_RUM_DATA, this.De),
          this.on(r.RECORD_API_USAGE, this.Re),
          this.on(r.INITIALIZE_CHANGE_METRICS, this.Ce),
          this.on(r.RECORD_ACTIVATION_TYPE_USAGE, this.Ne),
          this.on(r.RECORD_AUDIENCE_USAGE, this.Oe),
          this.on(r.RECORD_CHANGE_MACROTASK_RATE, this.xe),
          this.on(r.RECORD_CHANGE_OVERHEATED, this.Le),
          this.on(r.RECORD_CHANGE_TYPE_USAGE, this.Pe),
          this.on(r.RECORD_DOM_OBSERVATION_OCCURENCE, this.ke),
          this.on(r.RECORD_INTEGRATION_USAGE, this.Ve),
          this.on(r.RECORD_LAYER_FEATURE_USAGE, this.Fe),
          this.on(r.RECORD_LAYER_POLICY_USAGE, this.Me),
          this.on(r.RECORD_VIEW_FEATURE_USAGE, this.Ue),
          this.on(r.RECORD_VIEWS_INITIALLY_ACTIVATED_COUNT, this.Ge),
          this.on(r.RECORD_VISITOR_ID_LOCATOR_USAGE, this.Be),
          this.on(r.RECORD_VISITOR_ID_ERROR, this.je),
          this.on(r.RECORD_STICKY_BUCKETING_FEATURE, this.He);
      },
      De: function (e) {
        i.merge(this.P, e), this.emitChange();
      },
      Re: function (e) {
        this.P.apis[e.methodName] || (this.P.apis[e.methodName] = 0),
          this.P.apis[e.methodName]++,
          this.emitChange();
      },
      Ce: function () {
        i.isUndefined(this.P.data.extras.changeMacrotaskRate) &&
          (this.P.data.extras.changeMacrotaskRate = 0),
          i.isUndefined(this.P.data.extras.numOverheatedChanges) &&
            (this.P.data.extras.numOverheatedChanges = 0);
      },
      xe: function (e) {
        i.isUndefined(this.P.data.extras.changeMacrotaskRate) &&
          (this.P.data.extras.changeMacrotaskRate = 0),
          e.changeMacrotaskRate > this.P.data.extras.changeMacrotaskRate &&
            (this.P.data.extras.changeMacrotaskRate = e.changeMacrotaskRate),
          this.emitChange();
      },
      Le: function () {
        i.isUndefined(this.P.data.extras.numOverheatedChanges) &&
          (this.P.data.extras.numOverheatedChanges = 0),
          this.P.data.extras.numOverheatedChanges++,
          this.emitChange();
      },
      ke: function (e) {
        this.P.DOMObservation[e.counterName] ||
          (this.P.DOMObservation[e.counterName] = 0),
          this.P.DOMObservation[e.counterName]++,
          this.emitChange();
      },
      ze: function (e, t, n) {
        i.isUndefined(this.P.featuresNeeded[e]) &&
          (this.P.featuresNeeded[e] = {});
        var r = this.P.featuresNeeded[e];
        i.each(t, function (e) {
          r[e] || (r[e] = {}), r[e][n] || (r[e][n] = !0);
        });
      },
      Ve: function (e) {
        this.ze("integrations", e.integrations, e.layerId);
      },
      Pe: function (e) {
        this.ze("changeTypes", e.changeTypes, e.layerId);
      },
      Ne: function (e) {
        this.ze("activationTypes", [e.activationType], e.entityId),
          this.emitChange();
      },
      Ue: function (e) {
        this.ze("viewFeatures", e.featuresUsed, e.entityId), this.emitChange();
      },
      Fe: function (e) {
        this.ze("layerFeatures", [e.feature], e.entityId), this.emitChange();
      },
      Me: function (e) {
        this.ze("policy", [e.policy], e.layerId), this.emitChange();
      },
      Oe: function (e) {
        this.ze("audiences", e.audienceTypes, e.layerId), this.emitChange();
      },
      Ge: function (e) {
        (this.P.data.extras.viewsInitiallyActivatedCount =
          e.viewsInitiallyActivatedCount),
          this.emitChange();
      },
      Be: function (e) {
        this.ze("visitorIdLocatorType", [e.visitorIdLocatorType], e.entityId),
          this.emitChange();
      },
      je: function (e) {
        (this.P.data.extras.errorCustomVisitorId = e.isError),
          this.emitChange();
      },
      He: function (e) {
        this.ze("stickyBucketing", [e.feature], e.id);
      },
      getSampleRum: function () {
        return this.P.inRumSample;
      },
      getRumId: function () {
        return this.P.id;
      },
      getRumHost: function () {
        return this.P.RumHost;
      },
      getApiData: function () {
        return this.P.apis;
      },
      getDOMObservationData: function () {
        return this.P.DOMObservation;
      },
      getRumData: function () {
        return i.cloneDeep(this.P.data);
      },
      getScriptSrc: function () {
        return this.P.src;
      },
      getFeaturesNeededData: function () {
        var e = this.P.featuresNeeded,
          t = {};
        return (
          i.forOwn(e, function (e, n) {
            var r = i.keys(e);
            i.isEmpty(r) || (t[n] = {}),
              i.forEach(r, function (r) {
                t[n][r] = i.keys(e[r]).length;
              });
          }),
          t
        );
      },
    };
  },
  function (e, t, n) {
    var i = n(7);
    e.exports = {
      initialize: function () {
        (this.P = { initialized: !1, natives: {} }),
          this.on(i.SANDBOXED_FUNCTIONS_ADDED, this.Ke);
      },
      Ke: function (e) {
        if (!e.sandboxedFunctions)
          throw new Error("No sandboxedFunctions found in payload");
        (this.P.natives = e.sandboxedFunctions),
          (this.P.initialized = !0),
          this.emitChange();
      },
      getAll: function () {
        return this.P.natives;
      },
      get: function (e) {
        if (!e) throw new Error("Missing name parameter");
        return this.P.natives[e] || null;
      },
      isInitialized: function () {
        return this.P.initialized;
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(24),
      o = n(5),
      s = 18e5;
    e.exports = {
      initialize: function () {
        (this.P = { lastSessionTimestamp: 0, sessionId: null }),
          this.on(r.REFRESH_SESSION, this.Ye),
          this.on(r.LOAD_SESSION_STATE, this.qe);
      },
      getState: function () {
        return i.cloneDeep(this.P);
      },
      getSessionId: function () {
        return this.P.sessionId;
      },
      qe: function (e) {
        (this.P.sessionId = e.sessionId),
          (this.P.lastSessionTimestamp = e.lastSessionTimestamp),
          this.emitChange();
      },
      Ye: function () {
        var e = a.now(),
          t = this.P.lastSessionTimestamp;
        (!this.P.sessionId || e - t > s) && (this.P.sessionId = o.generate()),
          (this.P.lastSessionTimestamp = e),
          this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        this.We(),
          this.on(r.FINALIZE_BATCH_SNAPSHOT, this.Xe),
          this.on(r.REGISTER_PREVIOUS_BATCH, this.$e),
          this.on(r.REGISTER_TRACKER_VISITOR, this.Qe),
          this.on(r.REGISTER_TRACKER_EVENT, this.Je),
          this.on(r.REGISTER_TRACKER_DECISION, this.Ze),
          this.on(r.RESET_TRACKER_EVENTS, this.et),
          this.on(r.RESET_TRACKER_STORE, this.We),
          this.on(r.RESET_TRACKER_PREVIOUS_BATCHES, this.tt),
          this.on(r.SET_TRACKER_POLLING, this.nt),
          this.on(r.SET_TRACKER_BATCHING, this.it),
          this.on(r.SET_TRACKER_SEND_EVENTS, this.rt),
          this.on(r.SET_TRACKER_PERSISTABLE_STATE, this.at),
          this.on(r.SET_TRACKER_DIRTY, this.ot),
          this.on(r.UPDATE_TRACKER_VISITOR_ATTRIBUTES, this.st);
      },
      getPersistableState: function () {
        return this.P.isDirty
          ? this.hasEventsToSend() || this.hasPreviousBatchesToSend()
            ? {
                data: this.P.data,
                decisions: this.P.decisions,
                decisionEvents: this.P.decisionEvents,
                previousBatches: this.P.previousBatches,
              }
            : {}
          : null;
      },
      at: function (e) {
        i.isEmpty(this.P.data) ||
          i.isEmpty(e.data) ||
          (this.Xe(), this.P.previousBatches.push(this.getEventBatch())),
          (this.P.data = e.data || {}),
          (this.P.decisions = e.decisions || []),
          (this.P.decisionEvents = e.decisionEvents || []),
          i.isEmpty(this.P.previousBatches) || i.isEmpty(e.previousBatches)
            ? (this.P.previousBatches = e.previousBatches || [])
            : (this.P.previousBatches = this.P.previousBatches.concat(
                e.previousBatches
              )),
          this.emitChange();
      },
      ot: function (e) {
        (this.P.isDirty = e), this.emitChange();
      },
      Je: function (e) {
        var t = this.ut();
        (!i.isEmpty(t.snapshots) && i.isEmpty(this.P.decisionEvents)) ||
          this.ct(),
          this.dt().events.push(e.event),
          (this.P.decisions = e.decisions),
          this.ot(!0);
      },
      Ze: function (e) {
        this.P.decisionEvents.push(e.decisionEvent),
          (this.P.decisions = e.decisions),
          this.ot(!0);
      },
      Qe: function (e) {
        i.isEmpty(this.P.data) ? (this.P.data = e.data) : this.Xe(),
          this.P.data.visitors.push(e.visitor),
          (this.P.decisions = e.decisions),
          (this.P.decisionEvents = []),
          this.ot(!0);
      },
      $e: function (e) {
        this.P.previousBatches.push(e), this.ot(!0);
      },
      We: function () {
        (this.P = {
          polling: !1,
          shouldBatch: !0,
          data: {},
          decisions: [],
          decisionEvents: [],
          canSend: !1,
          isDirty: !1,
          previousBatches: [],
        }),
          this.emitChange();
      },
      et: function () {
        var e = this.ut();
        (this.P.data.visitors = [e]), (e.snapshots = []), this.ot(!0);
      },
      tt: function () {
        (this.P.previousBatches = []), this.ot(!0);
      },
      nt: function (e) {
        (this.P.polling = e), this.emitChange();
      },
      it: function (e) {
        (this.P.shouldBatch = e), this.emitChange();
      },
      rt: function (e) {
        (this.P.canSend = e), this.emitChange();
      },
      getEventBatch: function () {
        return i.cloneDeep(this.P.data);
      },
      getPreviousBatches: function () {
        return i.cloneDeep(this.P.previousBatches);
      },
      ft: function () {
        return this.P.decisionEvents.slice();
      },
      pt: function () {
        this.P.decisionEvents = [];
      },
      ht: function () {
        return this.P.decisions.slice();
      },
      isPolling: function () {
        return this.P.polling;
      },
      shouldBatch: function () {
        return this.P.shouldBatch;
      },
      dt: function () {
        return i.last(this.ut().snapshots);
      },
      ut: function () {
        return i.last(this.P.data.visitors);
      },
      ct: function () {
        var e = this.ft(),
          t = this.ut();
        t.snapshots.push({ decisions: this.ht(), events: e }),
          this.pt(),
          this.ot(!0);
      },
      Xe: function () {
        this.P.decisionEvents.length > 0 && this.ct();
      },
      hasEventsToSend: function () {
        if (!i.isEmpty(this.P.decisionEvents)) return !0;
        if (!i.isEmpty(this.P.data)) {
          var e = i.some(this.P.data.visitors || [], function (e) {
            return e.snapshots.length > 0;
          });
          if (e) return !0;
        }
        return !1;
      },
      hasPreviousBatchesToSend: function () {
        return !i.isEmpty(this.P.previousBatches);
      },
      canSend: function () {
        return this.P.canSend;
      },
      st: function (e) {
        var t = this.ut();
        t && (t.attributes = e.attributes);
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        (this.P = {}), this.on(r.SET_UA_DATA, this.V);
      },
      V: function (e) {
        i.isEmpty(this.P) && (this.P = e.data);
      },
      get: function () {
        return i.cloneDeep(this.P);
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(23),
      o = !1,
      s = { globalTags: {}, viewStates: {}, shouldBatch: !1 };
    e.exports = {
      initialize: function () {
        (this.P = i.cloneDeep(s)),
          this.on(r.REGISTER_VIEWS, this.vt),
          this.on(r.SET_VIEW_ACTIVE_STATE, this._t),
          this.on(r.UPDATE_PARSED_VIEW_METADATA, this.mt),
          this.on(r.UPDATE_USER_SUPPLIED_METADATA, this.Et),
          this.on(r.TRACK_VIEW_ACTIVATED_EVENT, this.yt),
          this.on(r.SET_GLOBAL_TAGS, this.It),
          this.on(r.RESET_VIEW_STATES, this.Tt),
          this.on(r.SET_VIEW_BATCHING, this.it);
      },
      getAll: function () {
        var e = {};
        for (var t in this.P.viewStates) e[t] = this.getViewState(t);
        return e;
      },
      shouldBatch: function () {
        return this.P.shouldBatch;
      },
      getViewState: function (e) {
        var t = i.cloneDeep(this.P.viewStates[e]),
          n = this.P.globalTags;
        return (
          (t.metadata = i.extend(
            {},
            t.parsedMetadata,
            n,
            t.userSuppliedMetadata
          )),
          t
        );
      },
      getActiveViewTags: function () {
        var e = this.getActiveViewStates(),
          t = i.map(e, function (e) {
            return e.metadata;
          }),
          n = [{}].concat(t);
        return i.extend.apply(i, n);
      },
      getActivationEventId: function (e) {
        return this.P.viewStates[e]
          ? this.P.viewStates[e].activationEventId
          : null;
      },
      getActiveViewStates: function () {
        return i.reduce(
          this.P.viewStates,
          i.bind(function (e, t, n) {
            return this.isViewActive(n) && e.push(this.getViewState(n)), e;
          }, this),
          []
        );
      },
      isViewActive: function (e) {
        var t = this.P.viewStates[e];
        return t || a.warn("No Page registered with id", e), !!t.isActive;
      },
      getGlobalTags: function () {
        return i.cloneDeep(this.P.globalTags);
      },
      Tt: function () {
        (this.P.viewStates = {}), this.emitChange();
      },
      vt: function (e) {
        i.each(
          e.views,
          i.bind(function (e) {
            var t = e.id;
            (o && this.P.viewStates[t]) ||
              (this.P.viewStates[t] = {
                id: t,
                isActive: i.isBoolean(e.isActive) ? e.isActive : null,
                activatedTimestamp: null,
                activationEventId: null,
                parsedMetadata: {},
                userSuppliedMetadata: {},
              });
          }, this)
        ),
          this.emitChange();
      },
      _t: function (e) {
        var t = e.view.id;
        if (!this.P.viewStates[t])
          throw new Error("No view exists with id " + t);
        (this.P.viewStates[t].isActive = e.isActive),
          e.isActive
            ? (this.P.viewStates[t].activatedTimestamp = e.timestamp)
            : ((this.P.viewStates[t].parsedMetadata = {}),
              (this.P.viewStates[t].userSuppliedMetadata = {})),
          this.emitChange();
      },
      mt: function (e) {
        var t = e.pageId;
        if (!this.P.viewStates[t])
          throw new Error("No view exists with id " + t);
        i.assign(this.P.viewStates[t].parsedMetadata, e.metadata),
          this.emitChange();
      },
      Et: function (e) {
        var t = e.pageId;
        if (!this.P.viewStates[t])
          throw new Error("No view exists with id " + t);
        i.assign(this.P.viewStates[t].userSuppliedMetadata, e.metadata),
          this.emitChange();
      },
      yt: function (e) {
        var t = e.pageId;
        this.P.viewStates[t] &&
          ((this.P.viewStates[t].activationEventId = e.eventData.eventId),
          this.emitChange());
      },
      It: function (e) {
        i.extend(this.P.globalTags, e), this.emitChange();
      },
      it: function (e) {
        (this.P.shouldBatch = e), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22);
    e.exports = {
      initialize: function () {
        (this.P = { views: {}, apiNamesToViews: {} }),
          this.on(r.DATA_LOADED, this.V);
      },
      getAll: function () {
        return a.safeReference(i.values(this.P.views));
      },
      getPagesMap: function () {
        return a.safeReference(this.P.views);
      },
      get: function (e) {
        return a.safeReference(this.P.views[e]);
      },
      getByApiName: function (e) {
        return a.safeReference(this.P.apiNamesToViews[e]);
      },
      apiNameToId: function (e) {
        var t = this.P.apiNamesToViews[e];
        if (t) return t.id;
      },
      idToApiName: function (e) {
        var t = this.P.views[e];
        if (t) return t.apiName;
      },
      getNumberOfPages: function () {
        return i.keys(this.P.views).length;
      },
      getAllViewsForActivationType: function (e) {
        return i.filter(this.P.views, { activationType: e });
      },
      V: function (e) {
        i.isEmpty(e.data.views) ||
          (i.each(
            e.data.views,
            i.bind(function (e) {
              a.deepFreeze(e),
                (this.P.views[e.id] = e),
                (this.P.apiNamesToViews[e.apiName] = e);
            }, this)
          ),
          this.emitChange());
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(19);
    e.exports = {
      initialize: function () {
        (this.P = { profile: {}, metadata: {}, visitorId: null }),
          this.on(r.SET_VISITOR_ID_VIA_API, this.St),
          this.on(r.SET_VISITOR_ATTRIBUTES, this.At),
          this.on(r.LOAD_EXISTING_VISITOR_PROFILE, this.bt);
      },
      getVisitorProfile: function () {
        return this.P.profile;
      },
      getVisitorProfileMetadata: function () {
        return this.P.metadata;
      },
      getAttribute: function (e) {
        var t = this.P.profile;
        return i.cloneDeep(a.getFieldValue(t, e));
      },
      getAttributeMetadata: function (e) {
        return i.cloneDeep(this.P.metadata[e]);
      },
      getVisitorIdFromAPI: function () {
        return this.P.visitorId;
      },
      bt: function (e) {
        (this.P.profile = e.profile),
          (this.P.metadata = e.metadata),
          this.emitChange();
      },
      At: function (e) {
        i.each(
          e.attributes,
          i.bind(function (e) {
            var t = e.key;
            a.setFieldValue(this.P.profile, t, e.value),
              e.metadata &&
                i.forOwn(
                  e.metadata,
                  i.bind(function (e, n) {
                    a.setFieldValue(this.P.metadata, t.concat(n), e);
                  }, this)
                );
          }, this)
        ),
          this.emitChange();
      },
      St: function (e) {
        (this.P.visitorId = e), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        (this.P = {}), this.on(r.DATA_LOADED, this.wt);
      },
      getCustomBehavioralAttributes: function () {
        return i.filter(this.P, function (e) {
          return !!e.rule_json;
        });
      },
      getVisitorAttribute: function (e) {
        var t = i.values(this.P);
        if (
          (e.datasourceId &&
            (t = i.filter(t, { dcp_datasource_id: String(e.datasourceId) })),
          e.attributeName && e.attributeId)
        )
          throw new Error(
            "Must not specify both attribute name and attribute ID"
          );
        if (e.attributeId) {
          var n = this.P[e.attributeId];
          if (!n)
            throw new Error("Unrecognized attribute ID: " + e.attributeId);
          return n;
        }
        if (e.attributeName) {
          var r = i.filter(t, { name: e.attributeName });
          if (!r.length)
            throw new Error("Unrecognized attribute name: " + e.attributeName);
          if (r.length > 1)
            throw new Error(
              "Too many attributes with name: " + e.attributeName
            );
          return r[0];
        }
        throw new Error("Must specify attribute name or attribute ID");
      },
      wt: function (e) {
        i.isEmpty(e.data.visitorAttributes) ||
          (i.each(
            e.data.visitorAttributes,
            i.bind(function (e) {
              this.P[e.id] = e;
            }, this)
          ),
          this.emitChange());
      },
    };
  },
  function (e, t, n) {
    var i = (n(2), n(7));
    n(62).Event;
    e.exports = {
      initialize: function () {
        (this.P = { events: [], foreignEvents: {}, foreignEventQueues: {} }),
          this.on(i.SET_VISITOR_EVENTS, this.V),
          this.on(i.SET_FOREIGN_VISITOR_EVENTS, this.Dt),
          this.on(i.SET_FOREIGN_VISITOR_EVENT_QUEUE, this.Rt);
      },
      getEvents: function () {
        return this.P.events;
      },
      getForeignEvents: function () {
        return this.P.foreignEvents;
      },
      getForeignEventQueues: function () {
        return this.P.foreignEventQueues;
      },
      V: function (e) {
        (this.P.events = e), this.emitChange();
      },
      Dt: function (e) {
        this.P.foreignEvents[e.key] = e.value;
      },
      Rt: function (e) {
        this.P.foreignEventQueues[e.key] = e.value;
      },
    };
  },
  function (e, t, n) {
    function i(e, t, n, i, r) {
      (this[o.FIELDS.NAME] = e),
        (this[o.FIELDS.TYPE] = t),
        a.isString(n) && n.trim().length > 0 && (this[o.FIELDS.CATEGORY] = n),
        i && a.keys(i).length > 0 && (this[o.FIELDS.OPTIONS] = i),
        a.isUndefined(r) || (this[o.FIELDS.REVENUE] = r);
    }
    function r(e, t, n, i) {
      (this.eventBase = e),
        (this[o.FIELDS.TIME] = t),
        a.isUndefined(n) || (this[o.FIELDS.SESSION_ID] = n),
        a.isUndefined(i) || (this[o.FIELDS.SESSION_INDEX] = i);
    }
    var a = n(2),
      o = n(63),
      s = n(19).getFieldValue,
      u = n(64);
    (t.EventBase = i),
      (i.prototype.digest = function () {
        var e = function (e, t) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(t);
          },
          t = [];
        if (
          (t.push(e(o.FIELDS.NAME, this[o.FIELDS.NAME])),
          t.push(e(o.FIELDS.TYPE, this[o.FIELDS.TYPE])),
          this[o.FIELDS.CATEGORY] &&
            t.push(e(o.FIELDS.CATEGORY, this[o.FIELDS.CATEGORY])),
          this[o.FIELDS.REVENUE] &&
            t.push(e(o.FIELDS.REVENUE, this[o.FIELDS.REVENUE])),
          !this[o.FIELDS.OPTIONS])
        )
          return t.join("&");
        var n = this[o.FIELDS.OPTIONS] || {},
          i = a.filter(a.keys(n), function (e) {
            return n.hasOwnProperty(e);
          });
        i = i.sort();
        for (var r = 0; r < i.length; r++) t.push(e(i[r], n[i[r]]));
        return t.join("&");
      }),
      (i.prototype.hash = function () {
        return this.hash_
          ? this.hash_
          : ((this.hash_ = u.hashToHex(
              u.toByteString(this.digest()),
              u.Seed.BEHAVIOR_EVENT
            )),
            this.hash_);
      }),
      (i.prototype.setHash = function (e) {
        this.hash_ = e;
      }),
      (i.prototype.reHash = function () {
        (this.hash_ = null), this.hash();
      }),
      (i.prototype.equals = function (e) {
        if (this.hash() !== e.hash()) return !1;
        if (
          this[o.FIELDS.NAME] !== e[o.FIELDS.NAME] ||
          this[o.FIELDS.TYPE] !== e[o.FIELDS.TYPE] ||
          this[o.FIELDS.CATEGORY] !== e[o.FIELDS.CATEGORY] ||
          this[o.FIELDS.REVENUE] !== e[o.FIELDS.REVENUE]
        )
          return !1;
        if (!this[o.FIELDS.OPTIONS] && !e[o.FIELDS.OPTIONS]) return !0;
        var t = this[o.FIELDS.OPTIONS] || {},
          n = e[o.FIELDS.OPTIONS] || {},
          i = a.filter(a.keys(t), function (e) {
            return t.hasOwnProperty(e);
          }),
          r = a.filter(a.keys(n), function (e) {
            return n.hasOwnProperty(e);
          });
        if (i.length !== r.length) return !1;
        for (var s = 0; s < i.length; s++) {
          var u = i[s];
          if (!n.hasOwnProperty(u) || t[u] !== n[u]) return !1;
        }
        return !0;
      }),
      (i.prototype.getValueOrDefault = function (e, t) {
        var n = s(this, e);
        return a.isUndefined(n) ? t : n;
      }),
      (i.prototype.setFieldValue = function (e, t) {
        (e !== o.FIELDS.NAME &&
          e !== o.FIELDS.TYPE &&
          e !== o.FIELDS.CATEGORY &&
          e !== o.FIELDS.REVENUE &&
          e !== o.FIELDS.OPTIONS) ||
          ((this[e] = t), this.reHash());
      }),
      (t.Event = r),
      (r.prototype.getValueOrDefault = function (e, t) {
        if (0 === e.length) return this;
        var n = {};
        (n[o.FIELDS.TIME] = this[o.FIELDS.TIME]),
          (n[o.FIELDS.SESSION_ID] = this[o.FIELDS.SESSION_ID]),
          (n[o.FIELDS.SESSION_INDEX] = this[o.FIELDS.SESSION_INDEX]);
        var i = s(n, e);
        return a.isUndefined(i) ? this.eventBase.getValueOrDefault(e, t) : i;
      }),
      (r.prototype.setFieldValue = function (e, t) {
        e === o.FIELDS.TIME ||
        e === o.FIELDS.SESSION_ID ||
        e === o.FIELDS.SESSION_INDEX
          ? (this[e] = t)
          : this.eventBase.setFieldValue(e, t);
      });
    var c = {
      n: "name",
      y: "type",
      c: "category",
      r: "revenue",
      s: "session_id",
      o: "tags",
      si: "session_index",
    };
    (r.prototype.readableEvent = function () {
      var e,
        t,
        n = function (e) {
          return a.isString(e) ? '"' + e + '"' : e;
        },
        i = this,
        r = [];
      a.each(
        [
          o.FIELDS.NAME,
          o.FIELDS.TYPE,
          o.FIELDS.CATEGORY,
          o.FIELDS.REVENUE,
          o.FIELDS.SESSION_ID,
        ],
        function (o) {
          (e = c[o]),
            (t = i.getValueOrDefault([o])),
            a.isUndefined(t) || r.push(e + ": " + n(t));
        }
      );
      var s = [];
      if (
        ((e = c[o.FIELDS.OPTIONS]),
        (t = i.getValueOrDefault([o.FIELDS.OPTIONS])),
        a.isUndefined(t) ||
          (a.each(t, function (e, t) {
            s.push(t + ": " + String(n(e)));
          }),
          r.push(e + ": {\n\t\t" + s.join(",\n\t\t") + "\n\t}")),
        (t = i.getValueOrDefault([o.FIELDS.TIME])),
        a.isNumber(t) && (t = n(new Date(t).toString())),
        !a.isUndefined(t))
      ) {
        var u = "timestamp";
        r.push(u + ": " + t);
      }
      return "{\n\t" + r.join(",\n\t") + "\n}";
    }),
      (r.prototype.toObject = function (e) {
        var t,
          n,
          i = {},
          r = this;
        a.each(
          [
            o.FIELDS.NAME,
            o.FIELDS.TYPE,
            o.FIELDS.CATEGORY,
            o.FIELDS.REVENUE,
            o.FIELDS.OPTIONS,
            o.FIELDS.SESSION_INDEX,
          ],
          function (e) {
            (t = c[e]),
              (n = r.getValueOrDefault(
                [e],
                e === o.FIELDS.OPTIONS ? {} : void 0
              )),
              a.isUndefined(n) || (i[t] = n);
          }
        );
        var s = c[o.FIELDS.OPTIONS],
          u = c[o.FIELDS.REVENUE];
        if (
          (e &&
            e.revenueAsTag &&
            i[u] &&
            ((i[s] = i[s] || {}), (i[s][u] = i[u]), delete i[u]),
          (n = r.getValueOrDefault([o.FIELDS.TIME])),
          a.isNumber(n))
        )
          if (e && e.timeAsTimestamp) {
            var l = "timestamp";
            i[l] = new Date(n);
          } else {
            var d = "time";
            i[d] = n;
          }
        return i;
      });
  },
  function (e, t) {
    (t.FIELDS = {
      NAME: "n",
      TIME: "t",
      TYPE: "y",
      CATEGORY: "c",
      REVENUE: "r",
      SESSION_ID: "s",
      OPTIONS: "o",
      SESSION_INDEX: "si",
    }),
      (t.FIELDS_V0_2 = {
        name: t.FIELDS.NAME,
        time: t.FIELDS.TIME,
        type: t.FIELDS.TYPE,
        category: t.FIELDS.CATEGORY,
        tags: t.FIELDS.OPTIONS,
        session_index: t.FIELDS.SESSION_INDEX,
      });
  },
  function (e, t, n) {
    var i = n(65).v3,
      r = {
        IGNORING: 0,
        BUCKETING: 1,
        FALLBACK: 2,
        HOLDBACK: 3,
        BEHAVIOR_EVENT: 2716770798,
      },
      a = Math.pow(2, 32),
      o = function (e, t, n) {
        return Math.floor(u(e, t) * n);
      },
      s = function (e, t) {
        var n = i(e, t);
        return (n >>> 16).toString(16) + (65535 & n).toString(16);
      },
      u = function (e, t) {
        var n = i(e, t);
        return (n >>> 0) / a;
      },
      c = function (e) {
        var t = String.fromCharCode;
        return e.replace(/[\S\s]/gi, function (e) {
          e = e.charCodeAt(0);
          var n = t(255 & e);
          return (
            e > 255 && (n = t((e >>> 8) & 255) + n),
            e > 65535 && (n = t(e >>> 16) + n),
            n
          );
        });
      };
    e.exports = {
      Seed: r,
      hashToHex: s,
      hashToInt: o,
      hashToReal: u,
      toByteString: c,
    };
  },
  function (e, t, n) {
    !(function () {
      function t(e, t) {
        for (var n, i = e.length, r = t ^ i, a = 0; i >= 4; )
          (n =
            (255 & e.charCodeAt(a)) |
            ((255 & e.charCodeAt(++a)) << 8) |
            ((255 & e.charCodeAt(++a)) << 16) |
            ((255 & e.charCodeAt(++a)) << 24)),
            (n =
              1540483477 * (65535 & n) +
              (((1540483477 * (n >>> 16)) & 65535) << 16)),
            (n ^= n >>> 24),
            (n =
              1540483477 * (65535 & n) +
              (((1540483477 * (n >>> 16)) & 65535) << 16)),
            (r =
              (1540483477 * (65535 & r) +
                (((1540483477 * (r >>> 16)) & 65535) << 16)) ^
              n),
            (i -= 4),
            ++a;
        switch (i) {
          case 3:
            r ^= (255 & e.charCodeAt(a + 2)) << 16;
          case 2:
            r ^= (255 & e.charCodeAt(a + 1)) << 8;
          case 1:
            (r ^= 255 & e.charCodeAt(a)),
              (r =
                1540483477 * (65535 & r) +
                (((1540483477 * (r >>> 16)) & 65535) << 16));
        }
        return (
          (r ^= r >>> 13),
          (r =
            1540483477 * (65535 & r) +
            (((1540483477 * (r >>> 16)) & 65535) << 16)),
          (r ^= r >>> 15),
          r >>> 0
        );
      }
      function n(e, t) {
        var n, i, r, a, o, s, u, c;
        for (
          n = 3 & e.length,
            i = e.length - n,
            r = t,
            o = 3432918353,
            s = 461845907,
            c = 0;
          c < i;

        )
          (u =
            (255 & e.charCodeAt(c)) |
            ((255 & e.charCodeAt(++c)) << 8) |
            ((255 & e.charCodeAt(++c)) << 16) |
            ((255 & e.charCodeAt(++c)) << 24)),
            ++c,
            (u =
              ((65535 & u) * o + ((((u >>> 16) * o) & 65535) << 16)) &
              4294967295),
            (u = (u << 15) | (u >>> 17)),
            (u =
              ((65535 & u) * s + ((((u >>> 16) * s) & 65535) << 16)) &
              4294967295),
            (r ^= u),
            (r = (r << 13) | (r >>> 19)),
            (a =
              (5 * (65535 & r) + (((5 * (r >>> 16)) & 65535) << 16)) &
              4294967295),
            (r = (65535 & a) + 27492 + ((((a >>> 16) + 58964) & 65535) << 16));
        switch (((u = 0), n)) {
          case 3:
            u ^= (255 & e.charCodeAt(c + 2)) << 16;
          case 2:
            u ^= (255 & e.charCodeAt(c + 1)) << 8;
          case 1:
            (u ^= 255 & e.charCodeAt(c)),
              (u =
                ((65535 & u) * o + ((((u >>> 16) * o) & 65535) << 16)) &
                4294967295),
              (u = (u << 15) | (u >>> 17)),
              (u =
                ((65535 & u) * s + ((((u >>> 16) * s) & 65535) << 16)) &
                4294967295),
              (r ^= u);
        }
        return (
          (r ^= e.length),
          (r ^= r >>> 16),
          (r =
            (2246822507 * (65535 & r) +
              (((2246822507 * (r >>> 16)) & 65535) << 16)) &
            4294967295),
          (r ^= r >>> 13),
          (r =
            (3266489909 * (65535 & r) +
              (((3266489909 * (r >>> 16)) & 65535) << 16)) &
            4294967295),
          (r ^= r >>> 16),
          r >>> 0
        );
      }
      var i = n;
      (i.v2 = t), (i.v3 = n);
      e.exports = i;
    })();
  },
  function (e, t, n) {
    var i = n(7);
    e.exports = {
      initialize: function () {
        (this.P = {
          baseMap: {},
          eventQueue: [],
          lastEvent: null,
          initialized: !1,
          cleared: !1,
        }),
          this.on(i.UPDATE_BEHAVIOR_STORE, this.Ct);
      },
      getBaseMap: function () {
        return this.P.baseMap;
      },
      getEventQueue: function () {
        return this.P.eventQueue;
      },
      getLastEvent: function () {
        return this.P.lastEvent;
      },
      getCleared: function () {
        return this.P.cleared;
      },
      getInitialized: function () {
        return this.P.initialized;
      },
      Ct: function (e) {
        this.P[e.key] = e.value;
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7);
    e.exports = {
      initialize: function () {
        (this.P = { randomId: null, visitorIdLocator: null }),
          this.on(r.SET_VISITOR_ID, this.V),
          this.on(r.DATA_LOADED, this.Nt);
      },
      getBucketingId: function () {
        return this.getRandomId();
      },
      getRandomId: function () {
        return this.P.randomId;
      },
      getVisitorIdLocator: function () {
        return this.P.visitorIdLocator;
      },
      V: function (e) {
        i.extend(this.P, e), this.emitChange();
      },
      Nt: function (e) {
        i.isEmpty(e.data.visitorIdLocator) ||
          ((this.P.visitorIdLocator = e.data.visitorIdLocator),
          this.emitChange());
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(26);
    e.exports = {
      initialize: function () {
        (this.P = { variationIdMap: {}, preferredLayerMap: {} }),
          this.on(r.UPDATE_VARIATION_ID_MAP, this.Ot),
          this.on(r.MERGE_VARIATION_ID_MAP, this.xt),
          this.on(r.UPDATE_PREFERRED_LAYER_MAP, this.Lt),
          this.on(r.MERGE_PREFERRED_LAYER_MAP, this.Pt);
      },
      getVariationIdMap: function () {
        return i.cloneDeep(this.P.variationIdMap);
      },
      getVariationIdMapString: function () {
        return a.stringify(this.P.variationIdMap);
      },
      Ot: function (e) {
        var t = this.P.variationIdMap,
          n = t[e.layerId] || {};
        n[e.experimentId] !== e.variationId &&
          ((n[e.experimentId] = e.variationId),
          (this.P.variationIdMap[e.layerId] = n),
          this.emitChange());
      },
      xt: function (e) {
        var t = this.getVariationIdMap(),
          n = e.variationIdMap;
        i.each(t || {}, function (e, t) {
          n[t] ? i.assign(n[t], e) : (n[t] = e);
        }),
          (this.P.variationIdMap = n),
          this.emitChange();
      },
      getPreferredLayerMap: function () {
        return i.cloneDeep(this.P.preferredLayerMap);
      },
      getPreferredLayerMapString: function () {
        return a.stringify(this.P.preferredLayerMap);
      },
      getPreferredLayerId: function (e) {
        return this.P.preferredLayerMap[e];
      },
      Lt: function (e) {
        this.P.preferredLayerMap[e.groupId] !== e.layerId &&
          ((this.P.preferredLayerMap[e.groupId] = e.layerId),
          this.emitChange());
      },
      Pt: function (e) {
        var t = this.getPreferredLayerMap(),
          n = e.preferredLayerMap;
        i.assign(n, t), (this.P.preferredLayerMap = n), this.emitChange();
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(23),
      a = n(7),
      o = 1e3;
    e.exports = {
      initialize: function () {
        (this.P = {
          frames: [],
          defaultFrame: null,
          messages: [],
          subscribers: [],
          canonicalOrigins: null,
          disabled: !1,
        }),
          this.on(a.XDOMAIN_SET_DEFAULT_FRAME, this.kt),
          this.on(a.XDOMAIN_ADD_FRAME, this.Vt),
          this.on(a.XDOMAIN_SET_MESSAGE, this.Ft),
          this.on(a.XDOMAIN_ADD_SUBSCRIBER, this.Mt),
          this.on(a.XDOMAIN_SET_CANONICAL_ORIGINS, this.Ut),
          this.on(a.XDOMAIN_SET_DISABLED, this.Gt);
      },
      getMessages: function () {
        return i.cloneDeep(this.P.messages);
      },
      getOffset: function () {
        return 0 === this.P.messages.length ? 0 : this.P.messages[0].data.id;
      },
      getNextMessageId: function () {
        return this.P.messages.length + this.getOffset();
      },
      getMessageById: function (e) {
        return this.P.messages[e - this.getOffset()];
      },
      getSubscribers: function () {
        return this.P.subscribers;
      },
      getFrames: function () {
        return this.P.frames;
      },
      getNextFrameId: function () {
        return this.P.frames.length;
      },
      getDefaultFrame: function () {
        return this.P.defaultFrame;
      },
      getCanonicalOrigins: function () {
        return i.cloneDeep(this.P.canonicalOrigins);
      },
      isDisabled: function () {
        return this.P.disabled;
      },
      kt: function (e) {
        this.P.defaultFrame = e;
      },
      Vt: function (e) {
        this.P.frames.push(e);
      },
      Ft: function (e) {
        for (
          this.P.messages[e.messageId - this.getOffset()] = e.message;
          this.P.messages.length > o;

        ) {
          var t = this.P.messages.shift();
          r.debug("XDomainStorage: Cleared old message: " + t.data.id);
        }
      },
      Mt: function (e) {
        this.P.subscribers.push(e.subscriber);
      },
      Ut: function (e) {
        this.P.canonicalOrigins = e.canonicalOrigins;
      },
      Gt: function (e) {
        this.P.disabled = e.disabled;
      },
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(22);
    e.exports = {
      initialize: function () {
        (this.P = {}), this.on(r.DATA_LOADED, this.V);
      },
      V: function (e) {
        i.isEmpty(e.data.groups) ||
          (i.each(
            e.data.groups,
            i.bind(function (e) {
              a.deepFreeze(e), (this.P[e.id] = e);
            }, this)
          ),
          this.emitChange());
      },
      getAll: function () {
        return a.safeReference(i.values(this.P));
      },
      getGroupsMap: function () {
        return a.safeReference(this.P);
      },
      get: function (e) {
        return a.safeReference(this.P[e]);
      },
    };
  },
  function (e, t, n) {
    var i = n(72);
    (t.initializeStore = i.initialize),
      (t.addEvent = i.addEvent),
      (t.getEvents = i.getEvents),
      (t.getEventCount = i.getEventCount);
  },
  function (e, t, n) {
    function i(e) {
      y.dispatch(_.SET_VISITOR_EVENTS, e);
    }
    function r(e) {
      y.dispatch(_.UPDATE_BEHAVIOR_STORE, { key: "baseMap", value: e });
    }
    function a(e) {
      y.dispatch(_.UPDATE_BEHAVIOR_STORE, { key: "eventQueue", value: e });
    }
    function o(e) {
      y.dispatch(_.UPDATE_BEHAVIOR_STORE, { key: "lastEvent", value: e });
    }
    function s(e) {
      y.dispatch(_.UPDATE_BEHAVIOR_STORE, { key: "cleared", value: e });
    }
    function u() {
      y.dispatch(_.UPDATE_BEHAVIOR_STORE, { key: "initialized", value: !0 });
    }
    function c() {
      return C.getEvents();
    }
    function l() {
      return N.getBaseMap();
    }
    function d() {
      return N.getEventQueue();
    }
    function f() {
      return N.getLastEvent();
    }
    function p() {
      return N.getCleared();
    }
    function h() {
      return N.getInitialized();
    }
    function g() {
      var e = c().concat(d()),
        t = !1;
      return e.length > x && ((e = e.slice(-x)), (t = !0)), i(e), a([]), t;
    }
    var v = n(2),
      _ = n(7),
      m = n(24),
      E = n(73),
      y = n(9),
      I = n(23),
      T = n(74),
      S = t,
      A = n(62).Event,
      b = n(63),
      w = n(62).EventBase,
      D = n(89),
      R = n(16),
      C = R.get("stores/visitor_events"),
      N = R.get("stores/visitor_events_manager"),
      O = {
        EVENTBASE: "eb",
        HASH: "h",
        TIMEBASE: "tb",
        TIMESTAMPS: "ts",
        DELTA: "d",
        INDEX: "i",
      },
      x = 1e3;
    (t.initialize = function (e, t) {
      if (!h()) {
        S.Bt(e, t);
        var n = c();
        n.length > 0 && o(n[n.length - 1]);
        var i = d();
        i.length > 0 && o(i[i.length - 1]), u();
      }
    }),
      (t.addEvent = function (e) {
        I.debug("Behavior store: adding event", e);
        var t = S.jt(e);
        o(t), a(d().concat(t)), D.reindexIfNecessary(f(), c(), d()), S.Ht(d());
      }),
      (t.getEvents = function () {
        return (
          d().length > 0 && (g() && D.sessionize(c()), S.zt(c()), S.Ht(d())),
          c()
        );
      }),
      (t.getEventCount = function () {
        return d().length + c().length;
      }),
      (S.Bt = function (e, t) {
        S.Kt(e, t) && (S.zt(c()), S.Ht(d())), D.sessionize(c());
      }),
      (S.Kt = function (e, t) {
        if (0 === e.length && 0 === t.length) return i([]), a([]), !1;
        var n = !1,
          r = e[0] || t[0];
        return (
          O.EVENTBASE in r
            ? (i(S.Yt(e)), a(S.Yt(t)))
            : ((n = !0), i(S.qt(e)), a(S.qt(t))),
          d().length > 0 && (g(), (n = !0)),
          i(S._updateBaseMapAndMaybeDedupe(c())),
          S._migrateEventBasesAndUpdateStore() && (n = !0),
          n
        );
      }),
      (S.qt = function (e) {
        for (var t = [], n = 0; n < e.length; n++) {
          var i = e[n],
            r = S.Wt(i);
          t[n] = new A(r, i[b.FIELDS.TIME]);
        }
        return t;
      }),
      (S._migrateEventBasesAndUpdateStore = function () {
        var e = !1,
          t = S.Xt();
        return (
          D.applyMigrations(t) &&
            ((e = !0),
            r({}),
            i(S._updateBaseMapAndMaybeDedupe(c())),
            a(S._updateBaseMapAndMaybeDedupe(d()))),
          e
        );
      }),
      (S.$t = function () {
        return m.now();
      }),
      (S.jt = function (e) {
        var t,
          n = e.name,
          i = e.type || "default",
          r = e.category || E.OTHER,
          a = e.tags || {};
        e.revenue && (t = e.revenue);
        var o = new w(n, i, r, a, t);
        o = S.Qt(o);
        var s = S.$t(),
          u = new A(o, s, -1);
        return D.updateSessionId(f(), u), D.updateSessionIndex(f(), u), u;
      }),
      (S._updateBaseMapAndMaybeDedupe = function (e) {
        for (var t = 0; t < e.length; t++)
          e[t].eventBase = S.Qt(e[t].eventBase);
        return e;
      }),
      (S.zt = function (e) {
        var t = S.Jt(e);
        T.persistBehaviorEvents(t);
      }),
      (S.Ht = function (e) {
        var t = S.Jt(e);
        T.persistBehaviorEventQueue(t);
      }),
      (S.Zt = function () {
        p() || (i([]), a([]), S.zt(c()), S.Ht(d()), r({}), o(null), s(!0));
      }),
      (S.Qt = function (e) {
        var t = e.hash(),
          n = l(),
          i = n[t];
        if (v.isUndefined(i)) return (n[t] = [e]), r(n), e;
        for (var a = 0; a < i.length; a++) if (e.equals(i[a])) return i[a];
        return i.push(e), r(n), e;
      }),
      (S.Xt = function () {
        var e = [],
          t = l();
        for (var n in t) t.hasOwnProperty(n) && (e = e.concat(t[n]));
        return e;
      }),
      (S.Jt = function (e) {
        for (
          var t = function (e) {
              var t = {};
              (t[b.FIELDS.NAME] = e.getValueOrDefault([b.FIELDS.NAME])),
                (t[b.FIELDS.TYPE] = e.getValueOrDefault([b.FIELDS.TYPE]));
              var n = e.getValueOrDefault([b.FIELDS.CATEGORY]);
              v.isUndefined(n) || (t[b.FIELDS.CATEGORY] = n);
              var i = e.getValueOrDefault([b.FIELDS.REVENUE]);
              v.isUndefined(i) || (t[b.FIELDS.REVENUE] = i);
              var r = e.getValueOrDefault([b.FIELDS.OPTIONS]);
              return v.isUndefined(r) || (t[b.FIELDS.OPTIONS] = r), t;
            },
            n = O,
            i = [],
            r = "_idx_",
            a = 0;
          a < e.length;
          a++
        ) {
          var o,
            s,
            u = e[a],
            c = u.eventBase;
          if (c.hasOwnProperty(r)) {
            o = i[c[r]];
            var l = u[b.FIELDS.TIME] - (o[n.TIMEBASE] || 0);
            (s = {}),
              (s[n.DELTA] = l),
              (s[n.INDEX] = a),
              o[n.TIMESTAMPS].push(s);
          } else
            (o = {}),
              (o[n.EVENTBASE] = t(u)),
              (o[n.HASH] = c.hash()),
              (o[n.TIMEBASE] = u[b.FIELDS.TIME]),
              (s = {}),
              (s[n.DELTA] = 0),
              (s[n.INDEX] = a),
              (o[n.TIMESTAMPS] = [s]),
              i.push(o),
              (c[r] = i.length - 1);
        }
        for (a = 0; a < e.length; a++) delete e[a].eventBase[r];
        return i;
      }),
      (S.Wt = function (e, t) {
        var n = new w(
          e[b.FIELDS.NAME],
          e[b.FIELDS.TYPE],
          e[b.FIELDS.CATEGORY],
          e[b.FIELDS.OPTIONS],
          e[b.FIELDS.REVENUE]
        );
        return v.isUndefined(t) || n.setHash(t), n;
      }),
      (S.Yt = function (e) {
        for (var t = O, n = [], i = 0; i < e.length; i++)
          for (
            var r = e[i],
              a = S.Wt(r[t.EVENTBASE], r[t.HASH]),
              o = r[t.TIMEBASE],
              s = r[t.TIMESTAMPS],
              u = 0;
            u < s.length;
            u++
          ) {
            var c = s[u],
              l = new A(a, o + c[t.DELTA]),
              d = c[t.INDEX];
            n[d] = l;
          }
        return n;
      }),
      (t.deserialize = function (e) {
        return S.Yt(e);
      }),
      (t.mergeAllEvents = function (e) {
        var t = [].concat.apply([], e);
        return t.sort(D.sessionSortPredicate), D.sessionize(t), t;
      });
  },
  function (e, t) {
    e.exports = { OTHER: "other" };
  },
  function (e, t, n) {
    function i() {
      return c(j.LAYER_MAP) || {};
    }
    function r(e, t) {
      R.dispatch(C.UPDATE_PREFERRED_LAYER_MAP, { groupId: e, layerId: t });
    }
    function a() {
      var e = Q.getPreferredLayerMapString();
      p(j.LAYER_MAP, e, !0);
    }
    function o(e) {
      R.dispatch(C.SET_TRACKER_PERSISTABLE_STATE, e);
    }
    function s(e, t) {
      function n(e, n) {
        var i;
        t.attributionType && (i = L.now()),
          R.dispatch(C.SET_VISITOR_ATTRIBUTES, {
            attributes: [{ key: e, value: n, metadata: { lastModified: i } }],
          });
      }
      if (t.getter) {
        var i = t.provides;
        if (
          (D.isArray(i) || (i = [i]),
          !ee || !D.includes(["queryParams", "url"], i[0]))
        ) {
          var r = t.isSticky && !D.isUndefined(F.getFieldValue(e, i));
          if (!r) {
            var a;
            try {
              var o = P.evaluate(t.getter);
              D.isFunction(o) &&
                (o = o(
                  function () {
                    return F.getFieldValue(e, i);
                  },
                  function (e) {
                    n(i, e);
                  }
                )),
                D.isUndefined(o) ||
                  (t.isAsync
                    ? ((a = o.then(
                        function (e) {
                          n(i, e);
                        },
                        function (e) {
                          U.warn(
                            'Failed to evaluate provider for "' +
                              t.provides +
                              '"; error was:',
                            e
                          );
                        }
                      )),
                      R.dispatch(C.SET_VISITOR_ATTRIBUTE_PENDING, {
                        key: i,
                        pending: a,
                      }))
                    : n(i, o));
            } catch (e) {
              U.warn(
                'Failed to evaluate getter for provider for "' +
                  t.provides +
                  '"; error was: ' +
                  e.message
              );
            }
            return a;
          }
        }
      }
    }
    function u() {
      E(c(j.EVENTS) || [], c(j.EVENT_QUEUE) || []);
      var e = f(j.LAYER_STATES);
      D.forEach(e, function (e) {
        e.item = D.map(e.item, d);
      }),
        y(l(e)),
        I(c(j.SESSION_STATE) || {}),
        A(c(j.VISITOR_PROFILE) || {});
      var n = c(j.TRACKER_OPTIMIZELY);
      n && o(n), t.loadForeignData(), t.removeLegacySessionStateCookies();
    }
    function c(e) {
      var t = h(e),
        n = M.getItem(t);
      return D.isString(n) && (n = b(n)), n;
    }
    function l(e) {
      var t = [];
      return (
        D.each(e, function (e) {
          D.each(e.item, function (n) {
            (n.namespace = e.namespace), t.push(n);
          });
        }),
        t
      );
    }
    function d(e) {
      var t;
      return (t = e.layerId
        ? e
        : {
            layerId: e.i,
            pageId: e.p,
            decisionTimestamp: e.t,
            decisionTicket: { audienceIds: e.a || [] },
            decision: {
              layerId: e.i,
              experimentId: e.x || null,
              variationId: e.v || null,
              isLayerHoldback: e.h || !1,
            },
          });
    }
    function f(e) {
      var t = $.getBucketingId(),
        n = [],
        i = t + "\\$\\$([^$]+?)\\$\\$" + e,
        r = new RegExp(i);
      return (
        D.each(M.keys(), function (e) {
          var i = e.match(r);
          if (i) {
            var a = { namespace: i[1], userId: t, item: b(M.getItem(e)) };
            n.push(a);
          }
        }),
        n
      );
    }
    function p(e, t, n) {
      try {
        var i = h(e);
        n || (t = V.stringify(t));
        try {
          M.setItem(i, t);
        } catch (e) {
          throw (
            (U.warn("Visitor / Unable to set localStorage key, error was:", e),
            new Error("Unable to set localStorage"))
          );
        }
        w.setItem(i, t);
      } catch (e) {
        U.warn("Unable to persist visitor data:", e.message);
      }
    }
    function h(e) {
      var n = $.getBucketingId();
      if (!n) throw new Error("Visitor bucketingId not set");
      var i = t.getNamespace();
      if (!i) throw new Error("Namespace is not set");
      return [n, i, e].join("$$");
    }
    function g(e, n) {
      if (!$.getBucketingId())
        throw new Error(
          "Cannot update local store because bucketingId not set"
        );
      if (_(e)) {
        var i = t.getStorageKeyFromKey(e);
        if (D.includes(j, i)) {
          var r = h(i);
          if (!(e.indexOf(r) <= 0) && (n = b(n)))
            if (i === j.EVENT_QUEUE)
              R.dispatch(C.SET_FOREIGN_VISITOR_EVENT_QUEUE, {
                key: e,
                value: O.deserialize(n),
              });
            else if (i === j.EVENTS)
              R.dispatch(C.SET_FOREIGN_VISITOR_EVENTS, {
                key: e,
                value: O.deserialize(n),
              });
            else if (i === j.LAYER_STATES)
              R.dispatch(C.LOAD_PERSISTED_LAYER_STATES, {
                layerStates: D.map(n, d),
                merge: !0,
              });
            else if (i === j.VARIATION_MAP)
              R.dispatch(C.MERGE_VARIATION_ID_MAP, { variationIdMap: n });
            else if (i === j.VISITOR_PROFILE) {
              var a = ["custom"],
                o = n;
              D.each(a, function (e) {
                var t = q.getPlugin(k.PluginTypes.visitorProfileProviders, e);
                if (t) {
                  if (o.profile && o.metadata) {
                    var n = v(o, e, t.attributionType);
                    if (!D.isEmpty(n)) {
                      var i = [];
                      D.forOwn(n.data, function (t, r) {
                        var a = n.metadata[r],
                          o = { key: [e, r], value: t, metadata: a };
                        i.push(o);
                      }),
                        R.dispatch(C.SET_VISITOR_ATTRIBUTES, { attributes: i });
                    }
                  }
                } else U.debug("Attribute type", e, "not used by any audiences");
              });
            }
        }
      }
    }
    function v(e, t, n) {
      var i = J.getAttribute(t),
        r = J.getAttributeMetadata(t),
        a = e.profile[t],
        o = e.metadata[t];
      if (D.isEmpty(i)) return { data: a, metadata: o };
      var s = {};
      return (
        D.forOwn(a, function (e, t) {
          var i;
          r && r[t] && (i = r[t].lastModified);
          var a;
          o && o[t] && (a = o[t].lastModified),
            ((n === k.AttributionTypes.FIRST_TOUCH && i >= a) ||
              (n === k.AttributionTypes.LAST_TOUCH && a >= i) ||
              (D.isUndefined(i) && a)) &&
              ((s.data = s.data || {}),
              (s.data[t] = e),
              a &&
                ((s.metadata = s.metadata || {}),
                (s.metadata[t] = s.metadata[t] || {}),
                (s.metadata[t].lastModified = a)));
        }),
        s
      );
    }
    function _(e) {
      var t = e.split("$$")[0];
      return t.indexOf("://") > 0;
    }
    function m() {
      var e = J.getVisitorProfile(),
        t = J.getVisitorProfileMetadata(),
        n = q.getAllPlugins(k.PluginTypes.visitorProfileProviders);
      if (n) {
        var i = D.reduce(
          n,
          function (e, t) {
            return t.provides && (e[t.provides] = t), e;
          },
          {}
        );
        e = D.omitBy(e, function (e, t) {
          var n = i[t];
          return n && n.isTransient;
        });
      }
      return { profile: e, metadata: t };
    }
    function E(e, t) {
      N.initializeStore(e, t);
    }
    function y(e) {
      R.dispatch(C.LOAD_PERSISTED_LAYER_STATES, {
        layerStates: D.filter(e, function (e) {
          return !!e.decision;
        }),
      });
    }
    function I(e) {
      (e = D.extend({ lastSessionTimestamp: 0, sessionId: null }, e)),
        R.dispatch(C.LOAD_SESSION_STATE, e);
    }
    function T(e) {
      var t,
        n = e.name;
      switch (e.type) {
        case k.VisitorIdLocatorType.COOKIE:
          t = x.get(n);
          break;
        case k.VisitorIdLocatorType.JS_VARIABLE:
          t = H.getGlobalByPath(n);
          break;
        case k.VisitorIdLocatorType.LOCALSTORAGE:
          try {
            var i = H.getGlobal("localStorage");
            t = i.getItem(n);
          } catch (e) {
            throw new Error("Unable to read localStorage: " + e.toString());
          }
          break;
        case k.VisitorIdLocatorType.QUERY:
          t = B.getQueryParamValue(n);
      }
      try {
        if (!t)
          throw (
            (U.error(
              "Visitor / Customer provided visitor id cannot be found. Type:",
              e.type,
              " Name:",
              n
            ),
            new Error("Failure to obtain visitor id from " + e.type))
          );
        if (!D.isString(t) && !D.isNumber(t))
          throw (
            (U.error(
              "Visitor / Customer provided visitor id is not a string or number. Type:",
              e.type,
              " Name:",
              n,
              " Id Type:",
              typeof t
            ),
            new Error("Customer provided visitor id is not a string or number"))
          );
      } catch (e) {
        throw (
          (W.getSampleRum() &&
            R.dispatch(C.RECORD_VISITOR_ID_ERROR, { isError: !0 }),
          e)
        );
      }
      return (
        W.getSampleRum() &&
          (R.dispatch(C.RECORD_VISITOR_ID_ERROR, { isError: !1 }),
          R.dispatch(C.RECORD_VISITOR_ID_LOCATOR_USAGE, {
            visitorIdLocatorType: e.type,
            entityId: t,
          })),
        String(t)
      );
    }
    function S() {
      return "oeu" + L.now() + "r" + Math.random();
    }
    function A(e) {
      var t,
        n,
        i = q.getAllPlugins(k.PluginTypes.visitorProfileProviders),
        r = D.filter(i, function (e) {
          return D.isFunction(e.restorer);
        });
      e.profile && e.metadata
        ? ((t = e.profile), (n = e.metadata))
        : ((t = e), (n = {})),
        (t = D.reduce(
          t,
          function (e, t, n) {
            var i = t,
              a = D.find(r, { provides: n });
            return a && (i = a.restorer(t)), (e[n] = i), e;
          },
          {}
        )),
        R.dispatch(C.LOAD_EXISTING_VISITOR_PROFILE, {
          profile: t,
          metadata: n,
        });
    }
    function b(e) {
      try {
        return V.parse(e);
      } catch (t) {
        return U.debug("Failed to parse: ", e, t), null;
      }
    }
    var w,
      D = n(2),
      R = n(9),
      C = n(7),
      N = n(71),
      O = n(72),
      x = n(75),
      L = n(24),
      P = n(16),
      k = n(25),
      V = n(26),
      F = n(19),
      M = n(81).LocalStorage,
      U = n(23),
      G = n(12).Promise,
      B = n(84),
      j = n(25).VisitorStorageKeys,
      H = n(40);
    w = n(85);
    var z = P.get("stores/cookie_options"),
      K = P.get("stores/global"),
      Y = P.get("stores/layer"),
      q = P.get("stores/plugins"),
      W = P.get("stores/rum"),
      X = P.get("stores/session"),
      $ = P.get("stores/visitor_id"),
      Q = P.get("stores/visitor_bucketing"),
      J = P.get("stores/visitor"),
      Z = P.get("stores/provider_status"),
      ee = !1;
    (t.getOrGenerateId = function () {
      return { randomId: t.getCurrentId() || S() };
    }),
      (t.getCurrentId = function () {
        var e = $.getVisitorIdLocator();
        return e
          ? T(e)
          : J.getVisitorIdFromAPI() || x.get(k.COOKIES.VISITOR_ID);
      }),
      (t.hasSomeData = function () {
        return M.keys().length > 0;
      }),
      (t.setId = function (e) {
        var n = $.getBucketingId();
        R.dispatch(C.SET_VISITOR_ID, e),
          $.getBucketingId() !== n &&
            (u(), t.deleteOldLocalData(), w.deleteData(e));
        try {
          $.getVisitorIdLocator() || t.maybePersistVisitorId(e);
        } catch (e) {
          if (
            (U.error(
              "Visitor / Unable to persist visitorId, disabling tracking"
            ),
            R.dispatch(C.LOAD_DIRECTIVE, { trackingDisabled: !0 }),
            e instanceof x.MismatchError)
          )
            throw (
              (U.error("Visitor / Cookie not set to correct value:", e),
              new Error("Cookie mismatch error while persisting visitorId"))
            );
          throw e;
        }
        t.refreshSession();
      }),
      (t.getVariationIdMap = function () {
        return c(j.VARIATION_MAP) || {};
      }),
      (t.updateVariationIdMap = function (e, t, n) {
        R.dispatch(C.UPDATE_VARIATION_ID_MAP, {
          layerId: e,
          experimentId: t,
          variationId: n,
        });
      }),
      (t.persistVariationIdMap = function () {
        var e = Q.getVariationIdMapString();
        p(j.VARIATION_MAP, e, !0);
      }),
      (t.getPreferredLayerMap = i),
      (t.updatePreferredLayerMap = r),
      (t.persistTrackerOptimizelyData = function (e) {
        p(j.TRACKER_OPTIMIZELY, e);
      }),
      (t.refreshSession = function () {
        R.dispatch(C.REFRESH_SESSION);
      }),
      (t.populateEagerVisitorData = function (e, n) {
        var i = D.filter(e, function (e) {
            return !e.isLazy;
          }),
          r = t.populateVisitorData(i, n);
        return r;
      }),
      (t.populateLazyVisitorData = function (e, n) {
        var i = D.filter(e, function (e) {
          return e.isLazy;
        });
        return t.populateVisitorData(i, n);
      }),
      (t.populateVisitorData = function (e, t) {
        t = t || {};
        var n = D.partial(s, t),
          i = D(e).filter({ isAsync: !0 }).map(n).filter().value();
        return (
          D.forEach(
            D.filter(e, function (e) {
              return !e.isAsync;
            }),
            n
          ),
          i.length > 0 ? G.all(i) : G.resolve()
        );
      }),
      (t.persistBehaviorEvents = function (e) {
        p(j.EVENTS, e);
      }),
      (t.persistBehaviorEventQueue = function (e) {
        p(j.EVENT_QUEUE, e);
      }),
      (t.getPersistedBehaviorEventCount = function () {
        var e = c(j.EVENTS) || [],
          t = c(j.EVENT_QUEUE) || [];
        return O.deserialize(e).length + O.deserialize(t).length;
      }),
      (t.persistLayerStates = function () {
        var e = Y.getLayerStates(t.getNamespace());
        (e = D.map(e, function (e) {
          return D.omit(e, "namespace");
        })),
          p(j.LAYER_STATES, e);
      }),
      (t.persistSessionState = function () {
        p(j.SESSION_STATE, X.getState());
      }),
      (t.persistVisitorProfile = function () {
        p(j.VISITOR_PROFILE, m());
      }),
      (t.persistVisitorBucketingStore = function () {
        t.persistVariationIdMap(), a();
      }),
      (t.getUserIdFromKey = function (e, n) {
        var i;
        return (
          D.includes(e, n) &&
            D.includes(e, "_") &&
            D.includes(e, "$$") &&
            D.includes(e.slice(e.indexOf("$$")), t.getNamespace()) &&
            (i = e.slice(e.indexOf("_") + 1, e.indexOf("$$"))),
          i
        );
      }),
      (t.maybePersistVisitorId = function (e) {
        e.randomId &&
          (z.getAutoRefresh() || t.getCurrentId() !== e.randomId
            ? (x.set(k.COOKIES.VISITOR_ID, e.randomId),
              U.log("Persisting visitorId:", e.randomId))
            : U.log(
                "Not persisting visitorId: value is not changed and also auto-refresh is disabled"
              ));
      }),
      (t.getAttribute = function (e) {
        return J.getAttribute(e);
      }),
      (t.getPendingAttributeValue = function (e) {
        return Z.getPendingAttributeValue(e);
      }),
      (t.isForeignKey = _),
      (t.checkKeyForVisitorId = function (e) {
        var n = $.getBucketingId() || t.getCurrentId(),
          i = t.getIdFromKey(e);
        return !i || i === n;
      }),
      (t.getIdFromKey = function (e) {
        var n = e.split("$$")[0],
          i = t.getStorageKeyFromKey(e),
          r = D.includes(k.StorageKeys, i);
        if (r) return null;
        var a = n.indexOf("_"),
          o = a === -1;
        return o ? n : n.substring(a + 1);
      }),
      (t.getStorageKeyFromKey = function (e) {
        var t,
          n = e.split("$$").pop(),
          i = n.indexOf("://") > -1;
        if (i) {
          var r = n.indexOf("_");
          t = n.substring(r + 1);
        } else t = n;
        return D.includes(D.values(k.AllStorageKeys), t) ? t : null;
      }),
      (t.deleteOldLocalData = function () {
        var e = M.keys();
        D.each(e, function (e) {
          t.isForeignKey(e) || t.checkKeyForVisitorId(e) || M.removeItem(e);
        });
      }),
      (t.deleteOldForeignData = function () {
        var e = M.keys();
        D.each(e, function (e) {
          t.isForeignKey(e) && M.removeItem(e);
        });
      }),
      (t.loadForeignData = function () {
        D.each(M.keys(), function (e) {
          var t = M.getItem(e);
          t && g(e, t);
        });
      }),
      (t.getNamespace = function () {
        return K.getNamespace();
      }),
      (t.serializeFieldKey = function (e) {
        return D.isArray(e) ? e.join("$$") : e;
      }),
      (t.removeLegacySessionStateCookies = function () {
        var e = x.getAll();
        D.forEach(D.keys(e), function (e) {
          0 === e.indexOf(k.COOKIES.SESSION_STATE + "$$") && x.remove(e);
        });
      });
  },
  function (e, t, n) {
    function i(e, n) {
      n !== !1 && (n = !0);
      for (
        var i, a, o = e.hostname.split("."), s = [], u = null, l = o.length - 1;
        l >= 0;
        l--
      )
        if ((s.unshift(o[l]), (i = s.join(".")), !r.includes(g, i))) {
          a = { domain: n ? "." + i : i };
          try {
            t.set(v, Math.random().toString(), a),
              t.remove(v, a),
              (u = a.domain);
            break;
          } catch (e) {}
        }
      return d.dispatch(c.SET_COOKIE_DOMAIN, u), u;
    }
    var r = n(2),
      a = n(76).create,
      o = n(24),
      s = n(80),
      u = n(40),
      c = n(7),
      l = n(16),
      d = n(9),
      f = l.get("stores/cookie_options"),
      p = (t.SetError = a("CookieSetError")),
      h = (t.MismatchError = a("CookieMismatchError"));
    (t.getAll = function (e) {
      r.isUndefined(e) && (e = !0);
      var n, i, a, o, u;
      n = s.getCookieString().split(/\s*;\s*/);
      var c = {};
      for (a = 0; a < n.length; a++)
        if (
          ((i = n[a]),
          (o = i.indexOf("=")),
          o > 0 &&
            ((u = t.safeDecodeURIComponent(i.substring(0, o))),
            void 0 === c[u]))
        ) {
          var l = i.substring(o + 1);
          e && (l = t.safeDecodeURIComponent(l)), (c[u] = l);
        }
      return c;
    }),
      (t.safeDecodeURIComponent = function (e) {
        try {
          return decodeURIComponent(e);
        } catch (t) {
          return e;
        }
      }),
      (t.get = function (e, n) {
        var i = t.getAll(n);
        return i[e];
      }),
      (t.set = function (e, n, a, c) {
        (a = r.extend({ encodeValue: !0 }, a)), c !== !1 && (c = !0);
        var l = [];
        if (r.isUndefined(a.domain)) {
          var d = f.getCurrentDomain();
          d || (d = i(u.getLocation(), !0)), (a.domain = d);
        }
        if (
          (a.domain && l.push("domain=" + a.domain),
          r.isUndefined(a.path) && (a.path = "/"),
          a.path && l.push("path=" + a.path),
          r.isUndefined(a.expires))
        ) {
          var g = r.isUndefined(a.maxAge)
            ? f.getDefaultAgeInSeconds()
            : a.maxAge;
          a.expires = new Date(o.now() + 1e3 * g);
        }
        if (
          (r.isUndefined(a.expires) ||
            l.push("expires=" + a.expires.toUTCString()),
          a.secure && l.push("secure"),
          (l = l.join(";")),
          s.setCookie(
            e + "=" + (a.encodeValue ? encodeURIComponent(n) : n) + ";" + l
          ),
          c)
        ) {
          var v = a.encodeValue,
            _ = t.get(e, v);
          if (_ !== n) {
            if (!_) throw new p('Failed to set cookie "' + e + '"');
            throw new h(
              'Expected "' + n + '" for "' + e + '", got "' + _ + '"'
            );
          }
        }
      }),
      (t.remove = function (e, n) {
        for (var i = u.getLocation().hostname.split("."); i.length > 0; )
          t.set(
            e,
            null,
            r.extend({}, n, {
              domain: "." + i.join("."),
              expires: new Date(0),
            }),
            !1
          ),
            i.shift();
      });
    var g = ["optimizely.test"],
      v = "optimizelyDomainTestCookie";
  },
  function (e, t, n) {
    var i = n(77),
      r = i("InternalError");
    (t.BaseError = r),
      (t.create = function (e) {
        return i(e, r);
      });
  },
  function (e, t, n) {
    function i(e, t) {
      function n(t) {
        if (!(this instanceof n)) return new n(t);
        try {
          throw new Error(t);
        } catch (t) {
          (t.name = e), (this.stack = t.stack);
        }
        r && this.stack && (this.stack = a(this.stack, e, t)),
          (this.message = t || ""),
          (this.name = e);
      }
      return (
        (n.prototype = new (t || Error)()),
        (n.prototype.constructor = n),
        (n.prototype.inspect = function () {
          return this.message
            ? "[" + e + ": " + this.message + "]"
            : "[" + e + "]";
        }),
        (n.prototype.name = e),
        n
      );
    }
    var r = n(78)(),
      a = n(79);
    e.exports = i;
  },
  function (e, t) {
    "use strict";
    e.exports = function () {
      var e = new Error("yep");
      return !!e.stack && "Error: yep\n" === e.stack.substr(0, 11);
    };
  },
  function (e, t) {
    "use strict";
    e.exports = function (e, t, n) {
      var i = t;
      return n && (i += ": " + n), (e = i + e.slice(e.indexOf("\n")));
    };
  },
  function (e, t, n) {
    function i() {
      return "loading" === t.getReadyState();
    }
    var r = n(16),
      a = r.get("stores/global");
    (t.getDocumentElement = function () {
      return document.documentElement;
    }),
      (t.getCookieString = function () {
        return document.cookie || "";
      }),
      (t.setCookie = function (e) {
        document.cookie = e;
      }),
      (t.querySelector = function (e) {
        return document.querySelector(e);
      }),
      (t.querySelectorAll = function (e) {
        return document.querySelectorAll(e);
      }),
      (t.parseUri = function (e) {
        var n = t.createElement("a");
        return (n.href = e), n;
      }),
      (t.childrenOf = function (e) {
        return Array.prototype.slice.call(e.querySelectorAll("*"));
      }),
      (t.createElement = function (e) {
        return document.createElement(e);
      }),
      (t.isReady = function () {
        return (
          a.domContentLoadedHasFired() ||
          "interactive" === document.readyState ||
          "complete" === document.readyState
        );
      }),
      (t.isLoaded = function () {
        return "complete" === document.readyState;
      }),
      (t.addReadyHandler = function (e) {
        return (
          document.addEventListener("DOMContentLoaded", e),
          function () {
            t.removeReadyHandler(e);
          }
        );
      }),
      (t.removeReadyHandler = function (e) {
        return function () {
          document.removeEventListener("DOMContentLoaded", e);
        };
      }),
      (t.getReferrer = function () {
        return document.referrer;
      }),
      (t.getReadyState = function () {
        return document.readyState;
      }),
      (t.write = function (e) {
        if (!i())
          throw new Error(
            "Aborting attempt to write to already-loaded document"
          );
        document.write(e);
      }),
      (t.appendToHead = function (e) {
        return t.appendTo(document.head, e);
      }),
      (t.appendTo = function (e, t) {
        e.appendChild(t);
      }),
      (t.addEventListener = function (e, t, n) {
        return (
          document.addEventListener(e, t, n),
          function () {
            document.removeEventListener(e, t, n);
          }
        );
      }),
      (t.getCurrentScript = function () {
        if (document.currentScript) return document.currentScript;
      }),
      (t.parentElement = function (e) {
        for (var t = e.parentNode; t.nodeType !== Node.ELEMENT_NODE; )
          t = t.parentNode;
        return t;
      });
  },
  function (e, t, n) {
    var i,
      r,
      a = "optimizely_data",
      o = n(76).create,
      s = n(82),
      u = n(40),
      c = (t.Error = o("StorageError"));
    try {
      r = u.getGlobal("localStorage");
    } catch (e) {
      throw new c("Unable to read localStorage: " + e.toString());
    }
    if (!r) throw new c("localStorage is undefined");
    (i = s.create(r, a)),
      (t.LocalStorage = i),
      (t.isOptimizelyKey = function (e) {
        return e.slice(0, a.length) === a;
      });
  },
  function (e, t, n) {
    function i(e, t) {
      (this.en = e), (this.tn = t);
    }
    var r = n(2),
      a = n(23),
      o = "$$";
    (i.prototype.nn = function (e) {
      return [this.tn, e].join(o);
    }),
      (i.prototype.rn = function (e) {
        return e.replace(this.tn + o, "");
      }),
      (i.prototype.setItem = function (e, t) {
        try {
          this.en.setItem(this.nn(e), t);
        } catch (t) {
          a.warn("Failed to save", e, "to localStorage:", t);
        }
      }),
      (i.prototype.removeItem = function (e) {
        this.en.removeItem(this.nn(e));
      }),
      (i.prototype.getItem = function (e) {
        var t = null;
        try {
          t = this.en.getItem(this.nn(e));
        } catch (e) {}
        return t;
      }),
      (i.prototype.keys = function () {
        var e = r.keys(this.en);
        return r.map(
          r.filter(
            e,
            r.bind(function (e) {
              return r.includes(e, this.tn);
            }, this)
          ),
          r.bind(this.rn, this)
        );
      }),
      (i.prototype.allKeys = function () {
        return r.keys(this.en);
      }),
      (i.prototype.allValues = function () {
        return r.values(this.en);
      }),
      (e.exports = {
        create: function (e, t) {
          return new i(e, t);
        },
        mockStorage: {
          keys: function () {},
          getItem: function (e) {},
          removeItem: function (e) {},
          setItem: function (e, t) {},
        },
      });
  },
  function (e, t, n) {
    function i() {
      return u.getGlobal("performance");
    }
    var r = n(7),
      a = n(76).create,
      o = n(24),
      s = n(9),
      u = n(40),
      c = n(16),
      l = c.get("stores/rum"),
      d = "optimizely:",
      f = (t.Error = a("PerformanceError"));
    (t.time = function (e) {
      if (l.getSampleRum()) {
        var t = i();
        if (t && t.mark) {
          var n = d + e;
          t.clearMarks(n + "Begin"), t.mark(n + "Begin");
        }
      }
    }),
      (t.timeEnd = function (e) {
        if (l.getSampleRum()) {
          var t = i();
          if (t && t.mark) {
            var n = d + e,
              a = t.getEntriesByName(n + "Begin");
            if (0 === a.length)
              throw new f("Called timeEnd without matching time: " + e);
            t.clearMarks(n + "End"), t.mark(n + "End");
            var o = t.getEntriesByName(n + "End"),
              u = e + "Time",
              c = o[0].startTime - a[0].startTime;
            s.dispatch(r.SET_PERFORMANCE_MARKS_DATA, {
              name: u,
              data: {
                startTime: Math.round(1e3 * a[0].startTime) / 1e3,
                duration: Math.round(1e3 * c) / 1e3,
              },
            });
          }
        }
      }),
      (t.now = function () {
        var e = i();
        return e ? e.now() : o.now();
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(40);
    (t.getQueryParams = function () {
      var e = r.getLocationSearch() || "";
      if ((0 === e.indexOf("?") && (e = e.substring(1)), 0 === e.length))
        return [];
      for (var t = e.split("&"), n = [], i = 0; i < t.length; i++) {
        var a = "",
          o = "",
          s = t[i].split("=");
        s.length > 0 && (a = s[0]), s.length > 1 && (o = s[1]), n.push([a, o]);
      }
      return n;
    }),
      (t.getQueryParamValue = function (e) {
        for (var n = t.getQueryParams(), i = 0; i < n.length; i++)
          if (n[i][0] === e) return n[i][1];
      }),
      (t.queryStringFromMap = function (e) {
        return i
          .map(e, function (e, t) {
            return t + "=" + e;
          })
          .join("&");
      });
  },
  function (e, t, n) {
    function i(e) {
      var t;
      if (!o.find(y.getFrames(), { origin: e.origin }))
        return void E.debug(
          "XDomain",
          "No frame found for origin: " + e.origin
        );
      try {
        t = g.parse(e.data);
      } catch (t) {
        return void E.debug("XDomain", "Ignoring malformed message event:", e);
      }
      if ("ERROR" === t.type)
        l.dispatch(u.XDOMAIN_SET_DISABLED, { disabled: !0 }),
          d.emitInternalError(new I("Xdomain Error: " + t.response));
      else if ("SYNC" === t.type)
        o.each(y.getSubscribers(), function (e) {
          e(t.response.key, t.response.value);
        });
      else {
        var n = y.getMessageById(t.id);
        if (!n) {
          if (
            (E.warn("XDomain", "No stored message found for ID", t.id),
            o.isNumber(t.id))
          ) {
            var i = y.getNextMessageId();
            t.id >= i
              ? d.emitInternalError(
                  new I(
                    "Message ID is greater than expected maximum ID (" +
                      t.id +
                      ">" +
                      i +
                      ")"
                  )
                )
              : t.id < 0
              ? d.emitInternalError(new I("Message ID is < 0: " + t.id))
              : d.emitInternalError(
                  new I("No stored message found for message ID: " + t.id)
                );
          } else
            d.emitInternalError(new I("Message ID is not a number: " + t.id));
          return;
        }
        if (!n.resolver)
          return void E.warn(
            "XDomain",
            "Message already resolved, ignoring:",
            t.id
          );
        n.resolver(t.response),
          l.dispatch(u.XDOMAIN_SET_MESSAGE, {
            messageId: t.id,
            message: {
              data: { id: t.id, type: n.data.type, key: n.data.key },
              startTime: n.startTime,
              endTime: p.now(),
            },
          });
      }
    }
    function r(e, t) {
      return (
        t || (t = y.getDefaultFrame()),
        new s(function (n) {
          var i = {
            data: o.extend({}, e, { id: y.getNextMessageId() }),
            resolver: n,
          };
          t
            ? y.isDisabled() || a(i, t)
            : l.dispatch(u.XDOMAIN_SET_MESSAGE, {
                messageId: i.data.id,
                message: i,
              });
        })
      );
    }
    function a(e, t) {
      var n = e.data;
      l.dispatch(u.XDOMAIN_SET_MESSAGE, {
        messageId: e.data.id,
        message: o.extend({}, e, { startTime: p.now() }),
      }),
        t.target.postMessage(g.stringify(n), t.origin);
    }
    var o = n(2),
      s = n(12).Promise,
      u = n(7),
      c = n(16),
      l = n(9),
      d = n(86),
      f = n(76).create,
      p = n(24),
      h = n(80),
      g = n(26),
      v = n(88),
      _ = n(74),
      m = n(40),
      E = n(23),
      y = c.get("stores/xdomain"),
      I = (t.Error = f("XDomainStorageError"));
    (t.setItem = function (e, t, n) {
      return r({ type: "PUT", key: e, value: t }, n);
    }),
      (t.getItem = function (e, t) {
        return r({ type: "GET", key: e }, t);
      }),
      (t.fetchAll = function (e) {
        return r({ type: "GETALL" }, e);
      }),
      (t.deleteData = function (e, t) {
        return r({ type: "DELETE", visitorId: e }, t);
      }),
      (t.subscribe = function (e) {
        l.dispatch(u.XDOMAIN_ADD_SUBSCRIBER, { subscriber: e });
      }),
      (t.loadIframe = function (e, t) {
        return new s(function (n) {
          var i = h.createElement("iframe");
          (i.src = e + t),
            (i.hidden = !0),
            i.setAttribute("tabindex", "-1"),
            i.setAttribute("title", "Optimizely Internal Frame"),
            (i.style.display = "none"),
            (i.height = 0),
            (i.width = 0),
            (i.onload = function () {
              var r = {
                id: y.getNextFrameId(),
                target: i.contentWindow,
                origin: e,
                path: t,
              };
              l.dispatch(u.XDOMAIN_ADD_FRAME, r), n(r);
            }),
            h.appendTo(h.querySelector("body"), i);
        });
      }),
      (t.getXDomainUserId = function (e, t) {
        var n,
          i = {},
          r = o.keys(e);
        return (
          o.each(t, function (e) {
            (i[e] = []),
              o.each(r, function (t) {
                var r = _.getUserIdFromKey(t, e);
                !n && r && (n = r), r && !o.includes(i[e], r) && i[e].push(r);
              });
          }),
          E.debug("XDomain: Found userIds:", i),
          n
        );
      }),
      (t.load = function (e, n) {
        m.addEventListener("message", i);
        var r = function () {
            return !!h.querySelector("body");
          },
          s = function () {
            return t.loadIframe(e, n);
          };
        return v
          .pollFor(r)
          .then(s)
          .then(function (e) {
            l.dispatch(u.XDOMAIN_SET_DEFAULT_FRAME, e),
              y.isDisabled() ||
                o.each(y.getMessages(), function (t) {
                  t.startTime || a(t, e);
                });
          });
      });
  },
  function (e, t, n) {
    var i = n(87);
    (t.emitError = function (e, t, n) {
      var r = !0;
      i.emit(
        {
          type: "error",
          name: e.name || "Error",
          data: { error: e, metadata: t },
        },
        n || !1,
        r
      );
    }),
      (t.emitInternalError = function (e, n) {
        t.emitError(e, n, !0);
      }),
      (t.emitAnalyticsEvent = function (e, t) {
        var n = { type: "analytics", name: "trackEvent", data: e };
        i.emit(n, t);
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(5),
      a = n(7),
      o = n(86),
      s = n(16),
      u = n(9),
      c = n(23),
      l = s.get("stores/event_emitter");
    (t.on = function (e) {
      return (
        e.token || (e.token = r.generate()),
        u.dispatch(a.ADD_EMITTER_HANDLER, e),
        e.token
      );
    }),
      (t.off = function (e) {
        u.dispatch(a.REMOVE_EMITTER_HANDLER, { token: e });
      }),
      (t.emit = function (e, t, n) {
        var r = l.getHandlers(e, t);
        i.each(r, function (i) {
          try {
            i.handler.call({ $di: s }, e);
          } catch (r) {
            !n && i.emitErrors
              ? (c.error("Error in handler for event:", e, r),
                o.emitError(r, null, t))
              : c.warn("Suppressed error in handler for event:", e, r);
          }
        });
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(12).Promise,
      a = n(40),
      o = 100,
      s = 50;
    t.pollFor = function (e, t, n) {
      var u, c;
      return (
        i.isFunction(n)
          ? (c = n)
          : ((u = n || o),
            (c = function () {
              return u--, u < -1;
            })),
        (t = t || s),
        new r(function (n, i) {
          !(function r() {
            var o;
            if (!c()) {
              try {
                var s = e();
                if (s) return n(s);
              } catch (e) {
                o = e;
              }
              return a.setTimeout(r, t);
            }
            i(o || new Error("Poll timed out"));
          })();
        })
      );
    };
  },
  function (e, t, n) {
    function i(e, n) {
      var i;
      (i = t.isInSameSession(e, n)
        ? e.getValueOrDefault([s.FIELDS.SESSION_ID])
        : n.getValueOrDefault([s.FIELDS.TIME])),
        n.setFieldValue(s.FIELDS.SESSION_ID, i);
    }
    function r(e, n, i) {
      var r,
        a = e.getValueOrDefault([s.FIELDS.SESSION_INDEX]);
      (r = t.isInSameSession(n, e) ? a : i ? a + 1 : a - 1),
        n.setFieldValue(s.FIELDS.SESSION_INDEX, r);
    }
    var a = n(62).Event,
      o = n(24),
      s = n(63),
      u = n(62).EventBase;
    t.CURRENT_SESSION_INDEX = 0;
    var c = 18e5;
    (t.isInSameSession = function (e, t) {
      var n = e.getValueOrDefault([s.FIELDS.TIME], 0),
        i = t.getValueOrDefault([s.FIELDS.TIME], 0);
      return Math.abs(n - i) < c;
    }),
      (t.updateSessionId = function (e, t) {
        if (!e)
          return void t.setFieldValue(
            s.FIELDS.SESSION_ID,
            t.getValueOrDefault([s.FIELDS.TIME])
          );
        var n = e.getValueOrDefault([s.FIELDS.TIME]),
          r = e.getValueOrDefault([s.FIELDS.SESSION_ID]),
          o = t.getValueOrDefault([s.FIELDS.TIME]);
        (n = "number" != typeof n ? o - 36e5 : n),
          (r = "number" != typeof r ? n : r),
          (e = new a(new u("", ""), n, r)),
          i(e, t);
      }),
      (t.updateSessionIndex = function (e, t) {
        if (!e) return void t.setFieldValue(s.FIELDS.SESSION_INDEX, 0);
        var n = e.getValueOrDefault([s.FIELDS.TIME]),
          i = e.getValueOrDefault([s.FIELDS.SESSION_INDEX]),
          o = t.getValueOrDefault([s.FIELDS.TIME]),
          c = e.getValueOrDefault([s.FIELDS.SESSION_ID]);
        (n = "number" != typeof n ? o - 36e5 : n),
          (i = "number" != typeof i ? 0 : i),
          (c = "number" != typeof c ? n : c),
          (e = new a(new u("", ""), n, c, i)),
          r(e, t, !1);
      }),
      (t.sessionize = function (e) {
        var n = e.length;
        if (0 !== n) {
          e[0].setFieldValue(
            s.FIELDS.SESSION_ID,
            e[0].getValueOrDefault([s.FIELDS.TIME])
          );
          for (var a = 1; a < n; a++) i(e[a - 1], e[a]);
          var u = t.CURRENT_SESSION_INDEX,
            l = e[n - 1].getValueOrDefault([s.FIELDS.TIME]),
            d = o.now();
          d - l > c && (u += 1),
            e[n - 1].setFieldValue(s.FIELDS.SESSION_INDEX, u);
          for (var a = n - 1; a > 0; a--) r(e[a], e[a - 1], !0);
        }
      }),
      (t.reindexIfNecessary = function (e, t, n) {
        function i(e) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t].getValueOrDefault([s.FIELDS.SESSION_INDEX]);
            e[t].setFieldValue(s.FIELDS.SESSION_INDEX, n + 1);
          }
        }
        e.getValueOrDefault([s.FIELDS.SESSION_INDEX]) === -1 && (i(t), i(n));
      }),
      (t.sessionSortPredicate = function (e, t) {
        return e[s.FIELDS.TIME] - t[s.FIELDS.TIME];
      }),
      (t.applyMigrations = function (e) {
        return !1;
      });
  },
  function (e, t, n) {
    var i = n(12).Promise,
      r = n(40);
    t.estimateStorage = function () {
      var e = r.getGlobal("navigator");
      try {
        return e.storage.estimate();
      } catch (e) {
        return i.resolve({ usage: null, quota: null });
      }
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(24),
      o = n(9),
      s = n(26),
      u = n(23),
      c = n(12).Promise,
      l = n(92),
      d = 3;
    (t.isCORSSupported = function () {
      var e = l.get("XMLHttpRequest");
      return "withCredentials" in new e();
    }),
      (t.request = function (e) {
        return (
          (e = i.extend(
            {
              method: "GET",
              async: !0,
              contentType: "text/plain;charset=UTF-8",
            },
            e
          )),
          new c(function (n, r) {
            if (!t.isCORSSupported()) return r("CORS is not supported");
            var a = l.get("XMLHttpRequest"),
              o = new a();
            (o.onload = function () {
              e.success && e.success(o), n(o);
            }),
              (o.onerror = function () {
                e.error && e.error(o), r(o);
              }),
              i.isObject(e.data) && (e.data = s.stringify(e.data)),
              o.open(e.method, e.url, e.async),
              e.withCredentials && (o.withCredentials = e.withCredentials),
              o.setRequestHeader("Content-Type", e.contentType),
              o.send(e.data);
          })
        );
      }),
      (t.retryableRequest = function (e, n, s, l) {
        if (!n) return c.reject(new Error("No id specified for request."));
        if (!t.isCORSSupported())
          return c.reject(new Error("CORS is not supported."));
        i.isUndefined(l) && (l = d), i.isUndefined(s) && (s = 0);
        var f = { id: n, timeStamp: a.now(), data: e, retryCount: s };
        return (
          o.dispatch(r.SET_PENDING_EVENT, f),
          u.debug("Sending event ", n),
          t.request(e).then(
            function (e) {
              return o.dispatch(r.REMOVE_PENDING_EVENT, { id: n }), e;
            },
            function (e) {
              throw (
                (f.retryCount >= l
                  ? (o.dispatch(r.REMOVE_PENDING_EVENT, { id: n }),
                    u.warn(
                      "Event ",
                      f,
                      " could not be sent after ",
                      l,
                      " attempts."
                    ))
                  : (f.retryCount++,
                    o.dispatch(r.SET_PENDING_EVENT, f),
                    u.debug(
                      "Event ",
                      f,
                      " failed to send, with error ",
                      e,
                      " It will be retried ",
                      l - s,
                      " times."
                    )),
                e)
              );
            }
          )
        );
      }),
      (t.sendBeacon = t.request);
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(24),
      o = n(16),
      s = n(80),
      u = n(25),
      c = n(9),
      l = n(23),
      d = o.get("stores/sandbox"),
      f = n(40);
    (t.shouldSandbox = function () {
      return !1;
    }),
      (t.get = function (e) {
        if (!e) throw new Error("Name is required");
        if (t.shouldSandbox()) {
          d.isInitialized() || p();
          var n = d.get(e);
          if (n) return n;
        }
        return f.getGlobal(e);
      });
    var p = function () {
      try {
        var e = "optimizely_" + a.now(),
          t = s.createElement("iframe");
        (t.name = e), (t.style.display = "none"), s.appendToHead(t);
        var n = t.contentWindow,
          o = t.contentDocument;
        o.write("<script></script>"), o.close();
        var d = i.mapValues(u.SandboxedFunctions, function (e) {
          return n[e];
        });
        c.dispatch(r.SANDBOXED_FUNCTIONS_ADDED, { sandboxedFunctions: d }),
          t.parentNode.removeChild(t);
      } catch (e) {
        l.warn("Unable to create a sandbox: ", e);
      }
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(23),
      a = n(94),
      o = n(16),
      s = o.get("stores/plugins"),
      u = n(7),
      c = n(25),
      l = n(9),
      d = !1,
      f = [n(107), n(108), n(128)],
      p = [
        "clientMetadata",
        "cookieDomain",
        "disable",
        "load",
        "optOut",
        "rum",
      ];
    (t.push = function (e, t) {
      var n, a, o, s;
      if (!i.isArray(e) && i.isObject(e))
        (s = i.isUndefined(e.version) ? 1 : e.version), (n = e.type), (o = [e]);
      else if (i.isArray(e)) (s = 0), (n = e[0]), (o = e.slice(1));
      else {
        if (!i.isString(e))
          return (
            r.warn("API / Ignoring non-array/object/string argument:", e), !1
          );
        (s = 0), (n = e), (o = []);
      }
      if ((f[s] && (a = f[s][n]), t && p.indexOf(n) === -1))
        return r.debug("API / Ignoring non high priority function:", n, o), !1;
      if (!a)
        return (
          r.warn(
            'API / No function found for "' +
              n +
              '" (v' +
              s +
              ") with arguments:",
            o
          ),
          !1
        );
      r.log('API / Executing: "' + n, '" with arguments:', o);
      try {
        a.apply(null, o),
          l.dispatch(u.RECORD_API_USAGE, {
            methodName: s ? "v" + s + "." + n : n,
          });
      } catch (e) {
        r.error(e);
      }
      return !0;
    }),
      (t.get = function (e) {
        if (d && "state" !== e)
          return void r.warn('Module "' + e + '" not found.');
        r.log('API / Getting module: "' + e + '"');
        var t = a[e];
        return (
          t
            ? i.isArray(t) && (t = o.evaluate(t))
            : (t = s.getPlugin(c.PluginTypes.apiModules, e)),
          t
            ? (l.dispatch(u.RECORD_API_USAGE, { methodName: "get." + e }), t)
            : void r.warn('Module "' + e + '" not found.')
        );
      });
  },
  function (e, t, n) {
    function i(e, t, n, i) {
      var r = e.getLayerState(i),
        a = t.get(i),
        s = n.get();
      if (!r || !a)
        return s
          ? {
              layer: {
                name: s.layerName,
                id: s.layerId,
                policy: s.layerPolicy,
                integrationStringVersion: s.integrationStringVersion,
              },
              experiment: { name: s.experimentName, id: s.experimentId },
              variation: { name: s.variationName, id: s.variationId },
              isLayerHoldback: !1,
            }
          : null;
      if (l.isSingleExperimentPolicy(a.policy) && r.decision.isLayerHoldback)
        return null;
      var u = r.decision.experimentId,
        c = r.decision.variationId;
      if (!u || !c) return null;
      var d, f;
      return (d = o.find(a.experiments, { id: u }))
        ? ((f = o.find(d.variations, { id: c })),
          f
            ? {
                layer: {
                  name: a.name,
                  id: a.id,
                  policy: a.policy,
                  integrationStringVersion: a.integrationStringVersion,
                },
                experiment: { name: d.name, id: d.id },
                variation: { name: f.name, id: f.id },
                isLayerHoldback: r.decision.isLayerHoldback,
              }
            : null)
        : null;
    }
    function r(e, t, n, i, r, s) {
      var u = [],
        c = e.getLayerStates();
      s.onlySingleExperiments &&
        (c = o.filter(c, function (e) {
          var n = t.get(e.layerId);
          return n && l.isSingleExperimentPolicy(n.policy);
        }));
      var f = o.map(c, function (e) {
          var t = !!e.decision.variationId,
            n =
              e.decisionActivationId &&
              e.decisionActivationId === i.getActivationId(),
            r = d.getExperimentAndVariation(),
            a = r ? r.variationId : null,
            s = t && e.decision.variationId === a;
          return o.extend(e, { isActive: (t && n) || s, visitorRedirected: s });
        }),
        p = r ? o.filter(f, r) : f;
      return (
        o.each(p, function (e) {
          var i = a(e, t, n, s.includeOfferConsistency);
          i && u.push(i);
        }),
        u
      );
    }
    function a(e, t, n, i) {
      var r,
        a,
        s = e.layerId,
        u = t.get(s) || {},
        c = o.map(u.experiments, function (e) {
          return o.pick(e, ["id", "name"]);
        });
      if (i || !u.decisionMetadata || !u.decisionMetadata.offerConsistency) {
        var l = {
          id: s,
          campaignName: u.name || null,
          experiment: null,
          allExperiments: c,
          variation: null,
          reason: e.decision.reason,
          isActive: !!e.isActive,
          visitorRedirected: e.visitorRedirected,
          isInCampaignHoldback: e.decision.isLayerHoldback,
        };
        e.decision &&
          e.decision.experimentId &&
          (r = o.find(u.experiments, { id: e.decision.experimentId })),
          r && (l.experiment = o.pick(r, ["id", "name", "campaignName"])),
          r &&
            e.decision.variationId &&
            (a = o.find(r.variations, { id: e.decision.variationId })),
          a && (l.variation = o.pick(a, ["id", "name"]));
        var d = o.map(e.decisionTicket.audienceIds, function (e) {
          return o.pick(n.get(e), ["id", "name"]);
        });
        return (
          (l.audiences = d),
          u.decisionMetadata &&
            u.decisionMetadata.offerConsistency &&
            (l.pageId = e.pageId),
          l
        );
      }
    }
    var o = n(2),
      s = n(95),
      u = n(96),
      c = n(98),
      l = n(44),
      d = n(99);
    (t.data = [
      "stores/audience_data",
      "stores/client_metadata",
      "stores/event_data",
      "stores/layer_data",
      "stores/view_data",
      "stores/group_data",
      "stores/interest_group",
      "stores/tag_group",
      "stores/global",
      function (e, t, n, i, r, a, s, l, d) {
        var f = {},
          p = {},
          h = {},
          g = {
            audiences: e.getAudiencesMap(),
            events: n.getEventsMap(),
            campaigns: f,
            pages: r.getPagesMap(),
            experiments: p,
            variations: h,
            projectId: d.getProjectId(),
            snippetId: d.getSnippetId(),
            accountId: d.getAccountId(),
            dcpServiceId: d.getDCPServiceId(),
            revision: d.getRevision(),
            clientName: t.getClientName(),
            clientVersion: t.getClientVersion(),
          },
          v = c.dereferenceChangeId;
        return (
          o.each(i.getAll(), function (e) {
            u.defineProperty(
              f,
              e.id,
              function () {
                var t = o.extend({}, e);
                return (
                  u.defineProperty(
                    t,
                    "changes",
                    function () {
                      return o.map(e.changes, v);
                    },
                    "campaign"
                  ),
                  u.defineProperty(
                    t,
                    "experiments",
                    function () {
                      return o.map(e.experiments, function (e) {
                        return p[e.id];
                      });
                    },
                    "campaign"
                  ),
                  t
                );
              },
              "campaignMap",
              "byId"
            ),
              o.each(e.experiments, function (e) {
                u.defineProperty(
                  p,
                  e.id,
                  function () {
                    var t = o.extend({}, e);
                    return (
                      u.defineProperty(
                        t,
                        "changes",
                        function () {
                          return o.map(e.changes, v);
                        },
                        "experiment"
                      ),
                      u.defineProperty(
                        t,
                        "variations",
                        function () {
                          return o.map(e.variations, function (e) {
                            return h[e.id];
                          });
                        },
                        "experiment"
                      ),
                      t
                    );
                  },
                  "experimentMap",
                  "byId"
                ),
                  o.each(e.variations, function (e) {
                    u.defineProperty(
                      h,
                      e.id,
                      function () {
                        var t = o.extend({}, e);
                        return (
                          u.defineProperty(
                            t,
                            "actions",
                            function () {
                              return o.map(e.actions, function (e) {
                                return o.extend({}, e, {
                                  changes: o.map(e.changes, v),
                                });
                              });
                            },
                            "variation"
                          ),
                          t
                        );
                      },
                      "variationMap",
                      "byId"
                    );
                  });
              });
          }),
          (g.groups = a.getGroupsMap()),
          g
        );
      },
    ]),
      (t.visitor = [
        "stores/visitor",
        function (e) {
          return o.cloneDeep(e.getVisitorProfile());
        },
      ]),
      (t.visitor_id = [
        "stores/visitor_id",
        function (e) {
          return { randomId: e.getRandomId() };
        },
      ]),
      (t.state = [
        "stores/audience_data",
        "stores/layer_data",
        "stores/layer",
        "stores/view_data",
        "stores/view",
        "stores/global",
        "stores/observed_redirect",
        function (e, t, n, a, u, c, f) {
          return {
            getCampaignStates: function (i) {
              var a = {},
                s = r(n, t, e, c, i, { includeOfferConsistency: !1 });
              return (
                o.each(s, function (e) {
                  a[e.id] = e;
                }),
                a
              );
            },
            getExperimentStates: function (i) {
              var a = r(n, t, e, c, i, {
                  includeOfferConsistency: !1,
                  onlySingleExperiments: !0,
                }),
                s = [
                  "audiences",
                  "variation",
                  "reason",
                  "visitorRedirected",
                  "isActive",
                ],
                u = o.reduce(
                  a,
                  function (e, t) {
                    var n = t.allExperiments[0];
                    return (
                      (e[n.id] = o.extend({}, o.pick(t, s), {
                        id: n.id,
                        experimentName: n.name,
                        isInExperimentHoldback: t.isInCampaignHoldback,
                      })),
                      e
                    );
                  },
                  {}
                );
              return u;
            },
            getCampaignStateLists: function (i) {
              var a = {},
                s = r(n, t, e, c, i, { includeOfferConsistency: !0 });
              return (
                o.each(s, function (e) {
                  var t = e.id;
                  a[t] || (a[t] = []), a[t].push(e);
                }),
                a
              );
            },
            getPageStates: function (e) {
              var t = u.getAll(),
                n = o.reduce(
                  t,
                  function (e, t) {
                    var n = a.get(t.id);
                    return (
                      (e[t.id] = o.extend(
                        {},
                        o.pick(n, [
                          "id",
                          "name",
                          "apiName",
                          "category",
                          "staticConditions",
                          "tags",
                        ]),
                        o.pick(t, ["isActive", "metadata"])
                      )),
                      (e[t.id].isActive = !!e[t.id].isActive),
                      e
                    );
                  },
                  {}
                );
              return e ? o.pickBy(n, e) : n;
            },
            isGlobalHoldback: function () {
              return c.isGlobalHoldback();
            },
            getActivationId: function () {
              return c.getActivationId();
            },
            getVariationMap: function () {
              var e = n.getLayerStates(),
                i = {};
              return (
                o.each(e, function (e) {
                  var n = t.get(e.layerId);
                  if (
                    e.decision &&
                    e.decision.experimentId &&
                    ((i[e.decision.experimentId] = {
                      id: e.decision.variationId,
                      name: null,
                      index: null,
                    }),
                    n)
                  ) {
                    var r = o.find(n.experiments, {
                      id: e.decision.experimentId,
                    });
                    if (r && e.decision.variationId)
                      var a = o.find(r.variations, {
                          id: e.decision.variationId,
                        }),
                        s = o.findIndex(r.variations, {
                          id: e.decision.variationId,
                        });
                    a &&
                      (i[e.decision.experimentId] = {
                        id: e.decision.variationId,
                        name: a.name,
                        index: s,
                      });
                  }
                }),
                i
              );
            },
            getActiveExperimentIds: function () {
              var e = {};
              return (
                o.each(
                  this.getCampaignStateLists({ isActive: !0 }),
                  function (t) {
                    o.each(t, function (t) {
                      e[t.experiment.id] = !0;
                    });
                  }
                ),
                o.keys(e)
              );
            },
            getRedirectInfo: function () {
              var e = d.getExperimentAndVariation();
              return e && (e.referrer = d.getReferrer()), e;
            },
            getDecisionString: function (e) {
              if (!e)
                throw new Error("Must pass a config to getDecisionString");
              e = o.extend({ maxLength: 255, shouldCleanString: !1 }, e);
              var r = i(n, t, f, e.campaignId);
              return r
                ? s.generateAnalyticsString(
                    r.layer,
                    r.experiment,
                    r.variation,
                    r.isLayerHoldback,
                    e.maxLength,
                    e.shouldCleanString
                  )
                : null;
            },
            getDecisionObject: function (e) {
              if (!e)
                throw new Error("Must pass a config to getDecisionObject");
              e = o.extend({ maxLength: 255, shouldCleanString: !1 }, e);
              var r = i(n, t, f, e.campaignId);
              if (!r) return null;
              var a = s.formatNamesAndIdsForAnalytics(
                  r.layer,
                  r.experiment,
                  r.variation,
                  e.shouldCleanString
                ),
                u = o.mapValues(a.names, function (t, n) {
                  return s.combineAndTruncateIdAndName(
                    t,
                    a.idStrings[n],
                    e.maxLength
                  );
                }),
                c = { experiment: u.experiment, variation: u.variation };
              return (
                l.isSingleExperimentPolicy(r.layer.policy) ||
                  o.extend(c, {
                    campaign: u.layer,
                    holdback: r.isLayerHoldback,
                  }),
                c
              );
            },
          };
        },
      ]),
      (t.utils = n(100).create()),
      (t.jquery = [
        "env/jquery",
        function (e) {
          return e;
        },
      ]),
      (t.event_emitter = n(106));
  },
  function (e, t, n) {
    function i(e) {
      return e.replace(/[^a-zA-Z0-9\.\x7e\!\*\(\)\']+/g, "_");
    }
    function r(e) {
      return !u.isEmpty(e) && u.includes(["and", "or", "not"], e[0]);
    }
    function a(e, t) {
      var n = "";
      return (
        u.isEmpty(t)
          ? (n = d)
          : ((n = u.reduce(
              t,
              function (t, n) {
                var r = e.get(n);
                return r ? t + i(r.name ? r.name : r.id) + "," : t;
              },
              ""
            )),
            (n = n.slice(0, -1))),
        n
      );
    }
    function o(e, n, i, r, a, o) {
      if (!v.isSingleExperimentPolicy(e.policy) || !r) {
        var s = !v.isSingleExperimentPolicy(e.policy) && r,
          c = t.formatNamesAndIdsForAnalytics(e, n, i, o),
          d = [c.names.experiment, c.names.variation],
          p = [c.idStrings.experiment, c.idStrings.variation];
        v.isSingleExperimentPolicy(e.policy) ||
          (d.unshift(c.names.layer), p.unshift(c.idStrings.layer));
        var h = u.reduce(
            p,
            function (e, t) {
              return e + t.length;
            },
            0
          ),
          g = d.length - 1 + (s ? 1 : 0),
          _ = g * l.length,
          m = h + _;
        if ((s && (m += f.length), m > a))
          throw new Error(
            "The analytics string size is too low to send the entity IDs."
          );
        for (
          var E = a - m, y = d.length, I = [], T = d.length - 1;
          T >= 0;
          T--
        ) {
          var S = d[T],
            A = Math.min(S.length, Math.floor(E / y));
          (E -= A), y--, I.unshift(S.substring(0, A));
        }
        var b = u.map(I, function (e, t) {
          return e + p[t];
        });
        return s && b.push(f), b.join(l);
      }
    }
    function s(e, n, i, r, a, o) {
      var s = r ? f : p,
        c = 3 * l.length,
        d = t.formatNamesAndIdsForAnalytics(e, n, i, o),
        h = d.names,
        g = d.idStrings,
        _ = u.reduce(
          g,
          function (e, t) {
            return e + t.length;
          },
          0
        );
      if (_ + c + s.length > a)
        throw new Error(
          "The analytics string size is too low to send the campaign, experiment, and variation IDs."
        );
      var m = a - _ - c - s.length,
        E = {};
      (E.variation = Math.min(h.variation.length, Math.floor(m / 3))),
        (m -= E.variation),
        (E.experiment = Math.min(h.experiment.length, Math.floor(m / 2))),
        (m -= E.experiment),
        (E.layer = m);
      var y = {};
      u.each(h, function (e, t) {
        y[t] = e.substring(0, E[t]);
      });
      var I = [];
      return (
        v.isSingleExperimentPolicy(e.policy) || I.push(y.layer + g.layer),
        (I = I.concat([
          y.experiment + g.experiment,
          y.variation + g.variation,
          s,
        ])),
        I.join(l)
      );
    }
    var u = n(2),
      c = n(16),
      l = ":",
      d = "everyone_else",
      f = "holdback",
      p = "treatment",
      h = "",
      g = n(23),
      v = n(44);
    (t.formatNamesAndIdsForAnalytics = function (e, t, n, o) {
      var s = {
        layer: e.name || h,
        experiment: t.name || h,
        variation: n.name || h,
      };
      if (
        (o && (s = u.mapValues(s, i)),
        s.experiment === h &&
          (!e.integrationStringVersion || 1 === e.integrationStringVersion))
      )
        if (r(t.audienceIds)) s.experiment = "Exp";
        else {
          var l = c.get("stores/audience_data");
          s.experiment = a(l, t.audienceIds);
        }
      var d = {
        layer: "(" + i(e.id) + ")",
        experiment: "(" + i(t.id) + ")",
        variation: "(" + i(n.id) + ")",
      };
      return { names: s, idStrings: d };
    }),
      (t.combineAndTruncateIdAndName = function (e, t, n) {
        var i = n - t.length;
        if (
          (i < 0 &&
            (g.warn(
              "maxLength must be at least long enough to fit the entity ID, which is length" +
                t.length +
                ". Defaulting to only use entity ID as name."
            ),
            (e = h)),
          e === h)
        )
          return t;
        if (e.length > i) {
          var r = Math.min(e.length, i);
          return (e = e.substring(0, r)), e + t;
        }
        return e + " " + t;
      }),
      (t.generateAnalyticsString = function (e, t, n, i, r, a) {
        return e.integrationStringVersion && 2 === e.integrationStringVersion
          ? o(e, t, n, i, r, a)
          : s(e, t, n, i, r, a);
      });
  },
  function (e, t, n) {
    var i = n(97),
      r = n(7),
      a = n(9),
      o = n(23);
    t.defineProperty = function (e, t, n, s, u) {
      i(
        e,
        t,
        function () {
          var e = ["prop", s, u || t].join(".");
          return (
            o.debug('Evaluating getter: "' + e + '"'),
            a.dispatch(r.RECORD_API_USAGE, { methodName: e }),
            n()
          );
        },
        !0
      );
    };
  },
  function (e, t) {
    "use strict";
    function n(e, t, n, i) {
      Object.defineProperty(e, t, {
        get: function () {
          var e = n.call(this);
          return (
            Object.defineProperty(this, t, {
              value: e,
              enumerable: !!i,
              writable: !0,
            }),
            e
          );
        },
        set: function (e) {
          return (
            Object.defineProperty(this, t, {
              value: e,
              enumerable: !!i,
              writable: !0,
            }),
            e
          );
        },
        enumerable: !!i,
        configurable: !0,
      });
    }
    e.exports = n;
  },
  function (e, t, n) {
    function i(e) {
      var n = r.cloneDeep(e);
      return (
        n.changes && (n.changes = r.map(n.changes, t.dereferenceChangeId)),
        n.experiments &&
          r.each(n.experiments, function (e) {
            e.changes && (e.changes = r.map(e.changes, t.dereferenceChangeId)),
              e.variations &&
                r.each(e.variations, function (e) {
                  e.actions &&
                    r.each(e.actions, function (e) {
                      e.changes &&
                        (e.changes = r.map(e.changes, t.dereferenceChangeId));
                    });
                });
          }),
        n
      );
    }
    var r = n(2),
      a = n(16),
      o = n(22),
      s = n(96),
      u = a.get("stores/change_data");
    (t.translateDecisionToCampaignDecision = function (e) {
      return c(r.cloneDeep(e), {
        layerId: "campaignId",
        isLayerHoldback: "isCampaignHoldback",
      });
    }),
      (t.translateLayerEventToCampaignEvent = function (e) {
        var t = {};
        return (
          s.defineProperty(
            t,
            "campaign",
            function () {
              var t = i(e.data.layer);
              return t;
            },
            "campaignEvent"
          ),
          (t.decisionTicket = e.data.decisionTicket),
          (t.decision = this.translateDecisionToCampaignDecision(
            e.data.decision
          )),
          (t.audiences = e.data.audiences),
          { type: "lifecycle", name: "campaignDecided", data: t }
        );
      }),
      (t.translateViewActivatedToPageActivated = function (e) {
        return {
          type: "lifecycle",
          name: "pageActivated",
          data: { page: e.data.view },
        };
      }),
      (t.dereferenceChangeId = function (e) {
        var t = u.getChange(e);
        return t ? o.safeReference(t) : e;
      });
    var c = function (e, t) {
      var n = r.omit(e, r.keys(t));
      return (
        r.each(t, function (t, i) {
          n[t] = e[i];
        }),
        n
      );
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(16),
      a = r.get("stores/observed_redirect");
    (t.getReferrer = function () {
      var e = a.get();
      return e ? e.referrer : null;
    }),
      (t.getExperimentAndVariation = function () {
        var e = a.get();
        return e && i.isString(e.variationId)
          ? i.pick(e, ["experimentId", "variationId"])
          : null;
      });
  },
  function (e, t, n) {
    var i = n(12).Promise,
      r = n(101).observeSelector,
      a = n(102).poll,
      o = n(104).waitForElement,
      s = n(105).waitUntil;
    t.create = function () {
      return {
        observeSelector: r,
        poll: a,
        Promise: i,
        waitForElement: o,
        waitUntil: s,
      };
    };
  },
  function (e, t, n) {
    function i() {
      if (f.shouldObserveChangesIndefinitely()) {
        var e = {
            attributes: !0,
            childList: !0,
            subtree: !0,
            characterData: !0,
          },
          t = p.getDocumentElement(),
          n = new MutationObserver(function () {
            this.disconnect(), l.each(l.keys(m), a), this.observe(t, e);
          });
        return function (i) {
          var r = m[i];
          n.observe(t, e),
            (r.cancelObservation = function () {
              delete m[i], l.isEmpty(m) && n.disconnect();
            });
        };
      }
      return function (e) {
        var t = g.poll(l.partial(a, e));
        m[e].cancelObservation = function () {
          t(), delete m[e];
        };
      };
    }
    function r(e) {
      var t = m[e];
      t && t.cancelObservation && t.cancelObservation();
    }
    function a(e) {
      if (m[e]) {
        if (o(m[e]))
          return (
            0 === m[e].matchedCount &&
              l.isFunction(m[e].options.onTimeout) &&
              m[e].options.onTimeout(),
            void r(e)
          );
        var t = document.querySelectorAll(m[e].selector);
        t.length &&
          (l.each(t, function (t) {
            (t.an && t.an[e]) || m[e].callbackQueue.push(t);
          }),
          s(e));
      }
    }
    function o(e) {
      var t = e.options.timeout;
      if (null !== t)
        if ("function" == typeof t)
          try {
            return t();
          } catch (e) {}
        else if (Date.now() - e.startTime > t) return !0;
      return !1;
    }
    function s(e) {
      for (; m[e] && m[e].callbackQueue.length; ) {
        var t = m[e].callbackQueue.shift();
        if (
          (u(t, e),
          (m[e].matchedCount = m[e].matchedCount + 1),
          m[e].callback(t),
          m[e] && m[e].options.once)
        )
          return void r(e);
      }
    }
    function u(e, t) {
      e.an || (e.an = {}), (e.an[t] = !0);
    }
    function c(e) {
      try {
        document.querySelector(e);
      } catch (e) {
        return !1;
      }
      return !0;
    }
    var l = n(2),
      d = (n(7), n(16)),
      f = d.get("stores/directive"),
      p = n(80),
      h = (n(25), n(9), n(5).generate),
      g = n(102),
      v = n(40),
      _ = (d.get("stores/rum"), { once: !1, onTimeout: null, timeout: null }),
      m = {},
      E = function (e) {
        (E = i())(e);
      };
    t.observeSelector = function (e, t, n) {
      if (!c(e))
        throw new Error(
          "observeSelector expects a valid css selector as its first argument"
        );
      if (!l.isFunction(t))
        throw new Error(
          "observeSelector expects a function as its second argument"
        );
      if (n && (!l.isObject(n) || l.isFunction(n)))
        throw new Error(
          "observeSelector expects an object as its third argument"
        );
      var i = h();
      return (
        (n = l.assign({}, _, n || {})),
        (m[i] = {
          callback: t,
          callbackQueue: [],
          matchedCount: 0,
          options: n,
          selector: e,
          startTime: Date.now(),
        }),
        E(i),
        v.setTimeout(l.bind(a, null, i), 0),
        l.partial(r, i)
      );
    };
  },
  function (e, t, n) {
    function i(e) {
      l[e] &&
        a.each(l[e].callbacks, function (e) {
          e.call(null);
        });
    }
    function r(e, t) {
      l[t] &&
        l[t].callbacks[e] &&
        (delete l[t].callbacks[e],
        a.some(l[t].callbacks) || (clearInterval(l[t].id), delete l[t]));
    }
    var a = n(2),
      o = (n(7), n(16)),
      s = (n(25), n(9), n(5).generate),
      u = n(40),
      c = n(103).DEFAULT_INTERVAL,
      l = (o.get("stores/rum"), {});
    (t.poll = function (e, t) {
      a.isNumber(t) || (t = c),
        l[t] ||
          (l[t] = { callbacks: {}, id: u.setInterval(a.partial(i, t), t) });
      var n = s();
      return (l[t].callbacks[n] = e), a.partial(r, n, t);
    }),
      (t.cancelAll = function () {
        a.each(l, function (e, t) {
          clearInterval(e.id), delete l[t];
        });
      });
  },
  function (e, t) {
    e.exports = { DEFAULT_INTERVAL: 20 };
  },
  function (e, t, n) {
    var i = n(12).Promise,
      r = n(101).observeSelector;
    t.waitForElement = function (e) {
      return new i(function (t, n) {
        r(e, t, { once: !0 });
      });
    };
  },
  function (e, t, n) {
    var i = n(12).Promise,
      r = n(102).poll;
    t.waitUntil = function (e) {
      return new i(function (t, n) {
        if (e()) return void t();
        var i = r(function () {
          e() && (i(), t());
        });
      });
    };
  },
  function (e, t, n) {
    var i = n(87);
    (t.on = function (e) {
      return (e.publicOnly = !0), i.on(e);
    }),
      (t.off = i.off),
      (t.emit = function (e) {
        i.emit(e);
      });
  },
  function (e, t, n) {
    function i(e) {
      var t,
        n = {};
      if (e)
        if (r(e)) t = Number(e);
        else {
          if ("object" != typeof e)
            throw new Error("tracker", "Revenue argument", e, "not a number.");
          if (((n = a.extend({}, e)), "revenue" in n)) {
            if (!r(n["revenue"]))
              throw new Error(
                "tracker",
                "Revenue value",
                n["revenue"],
                "not a number."
              );
            (t = Number(n["revenue"])), delete n["revenue"];
          }
        }
      return a.isUndefined(t) || (n.revenue = t), n;
    }
    function r(e) {
      return a.isNumber(e) || (a.isString(e) && Number(e) == e);
    }
    var a = n(2),
      o = n(108);
    (t.activateGeoDelayedExperiments = function (e, t) {
      t || (t = e.lists ? "odds" : "cdn3"),
        o.dataFromSource({ data: e, source: t });
    }),
      (t.activateSiteCatalyst = function (e) {
        e &&
          e.sVariable &&
          o.integrationSettings({
            id: "adobe_analytics",
            settings: { sVariableReference: e.sVariable },
          });
      }),
      (t.bucketUser = t.bucketVisitor = function (e, t) {
        if (e && t) {
          var n = { experimentId: String(e) };
          t > 256
            ? (n.variationId = String(t))
            : (n.variationIndex = String(t)),
            o.bucketVisitor(n);
        }
      }),
      (t.disable = function (e) {
        o.disable({ scope: e });
      }),
      (t.log = function (e) {
        a.isUndefined(e) && (e = !0), o.log({ level: e ? "INFO" : "OFF" });
      }),
      (t.optOut = function (e) {
        a.isUndefined(e) && (e = !0), o.optOut({ isOptOut: e });
      }),
      (t.setCookieDomain = function (e) {
        o.cookieDomain({ cookieDomain: e });
      }),
      (t.setCookieExpiration = function (e) {
        o.cookieExpiration({ cookieExpirationDays: e });
      }),
      (t.setDimensionValue = function (e, t) {
        var n = {};
        (n[e] = t), o.user({ attributes: n });
      }),
      (t.setUserId = function (e) {
        o.user({ userId: e });
      }),
      (t.storeThirdPartyData = function (e, t) {
        o.dataFromSource({ source: e, data: t });
      }),
      (t.trackEvent = function (e, t) {
        o.event({ eventName: e, tags: i(t) });
      });
  },
  function (e, t, n) {
    function i(e) {
      var t;
      return (
        e.eventId && (t = y.create(e.eventId, e.eventName, "custom")),
        R.updateAllViewTags(),
        function () {
          var n = p.trackCustomEvent(e.eventName, e.tags, t);
          n
            ? b.log("API / Tracking custom event:", e.eventName, e.tags)
            : b.log("API / Not tracking custom event:", e.eventName);
        }
      );
    }
    function r(e) {
      var t;
      return (
        e.eventData &&
          (t = y.create(
            e.eventData.id,
            e.eventData.apiName,
            "click",
            e.eventData
          )),
        function () {
          var e = p.trackClickEvent(t);
          e
            ? b.log("API / Tracking click event:", e)
            : b.log("API / Not tracking click event:", e);
        }
      );
    }
    function a(e) {
      var t = e.eventData,
        n = A.createLayerState(
          t.layerId,
          t.experimentId,
          t.variationId,
          t.isLayerHoldback
        ),
        i = A.createSingle(t.layerId, t.experimentId, t.variationId);
      return function () {
        A.recordLayerDecision(n.layerId, n.decisionTicket, n.decision),
          b.log("API / Tracking decision event:", n),
          p.trackDecisionEvent(n.decision, n.decisionTicket, i);
      };
    }
    function o(e) {
      var t = R.create(e.eventData.id, e.eventData.apiName),
        n = R.createState(t.id);
      return function () {
        var e = p.trackViewActivation(t, n);
        e
          ? b.log("API / Tracking pageview event:", e)
          : b.log("API / Not tracking pageview event:", e);
      };
    }
    var s = n(2),
      u = n(7),
      c = n(93),
      l = n(94),
      d = n(109),
      f = n(25),
      p = n(110),
      h = n(117),
      g = n(6),
      v = n(76).create,
      _ = n(24),
      m = n(118),
      E = n(120),
      y = n(121),
      I = n(87),
      T = n(9),
      S = n(26),
      A = n(113),
      b = n(23),
      w = n(122),
      D = n(114),
      R = n(123),
      C = n(74),
      N = n(16),
      O = N.get("stores/dimension_data"),
      x = N.get("stores/view"),
      L = N.get("stores/view_data"),
      P = N.get("stores/visitor_id"),
      k = N.get("stores/layer_data"),
      V = N.get("stores/directive"),
      F = !1,
      M = !1,
      U = F || M,
      G = 86400,
      B = 90,
      j = (t.ApiListenerError = v("ApiListenerError"));
    (t.event = function (e) {
      var t;
      switch (e.eventType) {
        case "click":
          t = r(e);
          break;
        case "decision":
          t = a(e);
          break;
        case "pageview":
          t = o(e);
          break;
        case "custom":
        default:
          t = i(e);
      }
      P.getBucketingId()
        ? t()
        : T.dispatch(u.ADD_CLEANUP_FN, {
            lifecycle: f.Lifecycle.postActivate,
            cleanupFn: t,
          });
    }),
      (t.clientMetadata = function (e) {
        U &&
          (T.dispatch(u.SET_CLIENT_NAME, e.clientName),
          T.dispatch(u.SET_CLIENT_VERSION, e.clientVersion)),
          F &&
            e.forceVariationIds &&
            T.dispatch(u.LOAD_DIRECTIVE, {
              forceVariationIds: e.forceVariationIds,
            });
      }),
      (t.priorRedirectString = function (e) {
        U && D.load(e.value);
      }),
      (t.microsnippetError = function (e) {
        if (U) {
          var t = (e.errorData.metadata && e.errorData.metadata.err) || {};
          t.name = e.errorData.code;
          var n = {
            engine: e.engine,
            msVersion: e.errorData.msVersion,
            requestId: e.errorData.requestId,
            projectId: e.errorData.projectId,
            snippetKey: e.errorData.snippetKey,
            args: e.errorData.args,
          };
          E.handleError(t, n);
        }
      }),
      (t.rum = function (e) {
        T.dispatch(u.SET_RUM_DATA, e.eventData);
      }),
      (t.initialViewStates = function (e) {
        var t = s.map(e.states, function (e, t) {
          return { id: t, isActive: e };
        });
        R.registerViews(t);
      }),
      (t.page = function (e) {
        var t = L.getByApiName(e.pageName);
        if (!t) throw new Error('Unknown page "' + e.pageName + '"');
        var n = !e.hasOwnProperty("isActive") || e.isActive,
          i = function () {
            n
              ? R.activateViaAPI(t, e.tags)
              : (R.deactivate(t),
                b.log("API / Deactivated Page", R.description(t)));
          };
        P.getBucketingId()
          ? i()
          : T.dispatch(u.ADD_CLEANUP_FN, {
              lifecycle: f.Lifecycle.postViewsActivated,
              cleanupFn: i,
            });
      }),
      (t.tags = function (e) {
        R.setGlobalTags(e.tags);
      }),
      (t.user = function (e) {
        U &&
          e.visitorId &&
          (P.getBucketingId()
            ? (b.log("API / Setting visitor Id:", e.visitorId),
              C.setId({ randomId: e.visitorId }))
            : (b.log("API / Setting visitor Id for activation:", e.visitorId),
              T.dispatch(u.SET_VISITOR_ID_VIA_API, e.visitorId))),
          F &&
            s.each(["IP", "location", "queryParams", "url"], function (t) {
              e[t] && (b.log("API / Setting", t, ":", e[t]), H(t, e[t], !1));
            }),
          b.log("API / Setting visitor custom attributes:", e.attributes),
          s.each(e.attributes, function (e, t) {
            var n,
              i,
              r = t,
              a = O.getById(t) || O.getByApiName(t);
            a && ((r = a.id), (n = a.apiName), (i = a.segmentId || a.id));
            var o = { id: i, value: e };
            n && (o.name = n), H(r, o, !0);
          });
      });
    var H = function (e, t, n) {
      var i = [
          {
            key: n ? ["custom", e] : [e],
            value: t,
            metadata: { lastModified: _.now() },
          },
        ],
        r = function () {
          T.dispatch(u.SET_VISITOR_ATTRIBUTES, { attributes: i });
        };
      P.getBucketingId()
        ? r()
        : T.dispatch(u.ADD_CLEANUP_FN, {
            lifecycle: f.Lifecycle.postVisitorProfileLoad,
            cleanupFn: r,
          });
    };
    (t.optOut = function (e) {
      var t = !e.hasOwnProperty("isOptOut") || e.isOptOut;
      m.setOptOut(t);
    }),
      (t.cookieExpiration = function (e) {
        var t = e.cookieExpirationDays;
        t < B &&
          (b.error(
            'Argument "cookieExpirationDays"=',
            t,
            "less than minimum days:",
            B,
            ", setting to minimum."
          ),
          (t = B)),
          b.log("API / Setting cookie age to", t, "days."),
          T.dispatch(u.SET_COOKIE_AGE, t * G);
      }),
      (t.extendCookieLifetime = function (e) {
        (e = s.extend({ isEnabled: !0 }, e)),
          b.log(
            "API / Setting cookie automatic lifetime extension to",
            e.isEnabled
          ),
          T.dispatch(u.SET_COOKIE_AUTO_REFRESH, e.isEnabled);
      }),
      (t.cookieDomain = function (e) {
        b.log("API / Setting cookie domain to", e.cookieDomain),
          T.dispatch(u.SET_COOKIE_DOMAIN, e.cookieDomain);
      }),
      (t.disable = function (e) {
        if (e.scope) {
          if ("tracking" !== e.scope)
            throw new Error('Unknown "scope" for disable: ' + e.scope);
          b.log("API / Disabling tracking"),
            T.dispatch(u.LOAD_DIRECTIVE, { trackingDisabled: !0 });
        } else
          b.log("API / Disabling everything"),
            T.dispatch(u.LOAD_DIRECTIVE, { disabled: !0 });
      }),
      (t.log = function (e) {
        var t = e.level,
          n = e.match;
        s.isUndefined(t) && (t = "INFO"),
          s.isUndefined(n) && (n = ""),
          b.setLogMatcher(n),
          b.setLogLevel(t);
      }),
      (t.registerModule = function (e) {
        var t = "custom/" + e.moduleName;
        if (l[t] || c.get(t))
          throw new Error(
            'Module name "' +
              t +
              '" is reserved. Will not be registered as plugin.'
          );
        w.registerApiModule(t, e.module);
      }),
      (t.dataFromSource = function (e) {
        var t = e.source;
        g.makeAsyncRequest(t), g.resolveRequest(t, e.data);
      }),
      (t.addListener = function (e) {
        if (!s.isFunction(e.handler))
          throw new Error("A handler function must be supplied");
        (e = s.omit(e, "type")), (e.publicOnly = !0), (e.emitErrors = !0);
        var t = e.handler;
        (e.handler = function (e) {
          try {
            return t(e);
          } catch (e) {
            throw new j(e);
          }
        }),
          I.on(e);
      }),
      (t.removeListener = function (e) {
        if (!e.token) throw new Error("Must supply a token to removeListener");
        I.off(e.token);
      }),
      (t.load = function (e) {
        (e.data = s.extend({}, e.data)),
          d.normalizeClientData(e.data),
          T.dispatch(u.DATA_LOADED, { data: e.data });
      }),
      (t.integrationSettings = function (e) {
        if (!e.id) throw new Error("id is required");
        if (!e.settings) throw new Error("settings is required");
        T.dispatch(
          u.SET_INTEGRATION_SETTINGS,
          s.extend({}, e.settings, { id: e.id })
        );
      }),
      (t.bucketVisitor = function (e) {
        if (
          (!e.variationId && s.isUndefined(e.variationIndex)) ||
          (e.variationId && e.variationIndex)
        )
          throw new Error(
            "One of a variationId or a variationIndex is required."
          );
        if (!e.experimentId) throw new Error("An experimentId is required.");
        var t,
          n,
          i = e.campaignId;
        if (i) {
          if (((t = k.get(i)), !t))
            throw new Error("Could not find layer " + i);
        } else if (
          ((t = k.getLayerByExperimentId(e.experimentId)), (i = t.id), !i)
        )
          throw new Error(
            "Could not find layer for experiment " + e.experimentId
          );
        if (((n = s.find(t.experiments, { id: e.experimentId })), !n))
          throw new Error(
            "Could not find experiment " + e.experimentId + " in layer " + i
          );
        var r = e.variationId;
        if (s.isUndefined(e.variationIndex)) {
          if (!s.find(n.variations, { id: r }))
            throw new Error(
              "Cound not find variation " +
                r +
                " in experiment " +
                e.experimentId
            );
        } else if (((r = n.variations[e.variationIndex].id), !r))
          throw new Error(
            "Could not find variation at index " +
              e.variationIndex +
              " in experiment " +
              e.experimentId
          );
        C.updateVariationIdMap(i, e.experimentId, r),
          P.getBucketingId() && C.persistVariationIdMap();
      }),
      (t.waitForOriginSync = function (e) {
        if (!s.isArray(e.canonicalOrigins))
          throw new Error(
            "canonicalOrigins must be an array. Got: " +
              S.stringify(e.canonicalOrigins)
          );
        s.each(e.canonicalOrigins, function (e) {
          if (!s.isString(e))
            throw new Error(
              "Each item in canonicalOrigins must be a string. Found type " +
                typeof e
            );
        }),
          T.dispatch(u.XDOMAIN_SET_CANONICAL_ORIGINS, {
            canonicalOrigins: e.canonicalOrigins,
          });
      }),
      (t.disableCrossOrigin = function () {
        b.log("API / cross origin tracking is DISABLED"),
          T.dispatch(u.XDOMAIN_SET_DISABLED, { disabled: !0 });
      }),
      (t.activate = function () {
        V.shouldActivate() && !F
          ? (s.forEach(x.getActiveViewStates(), function (e) {
              R.deactivate(L.get(e.id));
            }),
            T.dispatch(u.RESET_VIEW_STATES),
            h.emitActivateEvent())
          : b.debug("Not activating.");
      }),
      (t.sendEvents = function () {
        h.emitSendEvents();
      }),
      (t.holdEvents = function () {
        h.emitHoldEvents();
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(25);
    t.normalizeClientData = function (e) {
      !e.listTargetingKeys &&
        e.listTargetingCookies &&
        ((e.listTargetingKeys = i.map(e.listTargetingCookies, function (e) {
          return { type: r.ListTargetingKeyTypes.COOKIE, key: e };
        })),
        delete e.listTargetingCookies);
    };
  },
  function (e, t, n) {
    function i(e, t, n) {
      var i = c({
          activeViewStates: j.getActiveViewStates(),
          visitorProfile: W.getVisitorProfile(),
          layerStates: z.getLayerStatesForAnalytics(),
        }),
        r = n && n.pageId ? d(n) : j.getActiveViewTags(),
        a = _.extend({}, r, t),
        o = n && n.category ? n.category : w.OTHER;
      return _.extend(i, {
        eventEntityId: n && n.id,
        eventApiName: e,
        eventCategory: o,
        eventTags: a,
      });
    }
    function r(e, t) {
      var n = c({
        activeViewStates: j.getActiveViewStates(),
        visitorProfile: W.getVisitorProfile(),
        layerStates: z.getLayerStatesForAnalytics(),
      });
      return _.extend(n, {
        pageId: e.id,
        pageApiName: e.apiName,
        viewCategory: e.category,
        eventTags: t.metadata,
      });
    }
    function a(e) {
      var t = c({
          activeViewStates: j.getActiveViewStates(),
          visitorProfile: W.getVisitorProfile(),
          layerStates: z.getLayerStatesForAnalytics(),
        }),
        n =
          e.config && e.config.selector
            ? e.config.selector
            : e.eventFilter.selector,
        i = e.apiName,
        r = e.category || w.OTHER,
        a = e.id,
        o = d(e);
      return _.extend(t, {
        eventApiName: i,
        eventCategory: r,
        eventEntityId: a,
        eventTags: o,
        pageId: e.pageId,
        selector: n,
      });
    }
    function o() {
      var e = c({
        activeViewStates: [],
        visitorProfile: W.getVisitorProfile(),
        layerStates: z.getLayerStatesForAnalytics(),
      });
      return _.extend(e, { eventTags: {} });
    }
    function s(e, t, n, i) {
      var r = null,
        a = null,
        o = null;
      if (t.experimentId) {
        var s = _.find(i.experiments, { id: t.experimentId });
        if (
          s &&
          ((r = s.name || null), (o = s.integrationSettings), t.variationId)
        ) {
          var u = _.find(s.variations, { id: t.variationId });
          u && (a = u.name || null);
        }
      }
      var c = P.getReferrer() || A.getReferrer(),
        l = {
          sessionId: B.getSessionId(),
          decisionTicketAudienceIds: n.audienceIds,
          visitorId: Q.getRandomId(),
          decisionId: e,
          activationId: G.getActivationId(),
          namespace: G.getNamespace(),
          timestamp: I.now(),
          pageId: n.pageId || null,
          variationId: t.variationId,
          variationName: a,
          experimentId: t.experimentId,
          experimentName: r,
          layerId: t.layerId,
          layerName: i.name,
          layerPolicy: i.policy,
          accountId: G.getAccountId(),
          projectId: G.getProjectId(),
          revision: String(G.getRevision()),
          clientName: U.getClientName(),
          clientVersion: U.getClientVersion(),
          referrer: c,
          integrationStringVersion: i.integrationStringVersion || 1,
          integrationSettings: _.extend({}, i.integrationSettings, o),
        };
      return l;
    }
    function u(e, t) {
      var n = _.extend({}, e, {
        isLayerHoldback: t,
        isGlobalHoldback: !1,
        clientName: _.isNull(e.clientName) ? T.NAME : e.clientName,
        integrationStringVersion: _.isNull(e.integrationStringVersion)
          ? 1
          : e.integrationStringVersion,
        anonymizeIP: _.isNull(G.getAnonymizeIP()) ? void 0 : G.getAnonymizeIP(),
        activationId: G.getActivationId(),
        decisionTicketAudienceIds: [],
        sessionId: B.getSessionId(),
        activeViewStates: [],
        userFeatures: f(W.getVisitorProfile()),
        layerStates: z.getLayerStatesForAnalytics(),
      });
      return n;
    }
    function c(e) {
      var t = P.getReferrer() || A.getReferrer(),
        n = {
          eventId: M.generate(),
          timestamp: I.now(),
          revision: G.getRevision(),
          clientName: U.getClientName(),
          clientVersion: U.getClientVersion(),
          projectId: G.getProjectId(),
          accountId: G.getAccountId(),
          activationId: G.getActivationId(),
          sessionId: B.getSessionId(),
          isGlobalHoldback: G.isGlobalHoldback(),
          namespace: G.getNamespace(),
          referrer: t,
          visitorId: Q.getRandomId(),
          activeViewStates: e.activeViewStates,
          layerStates: e.layerStates,
          userFeatures: f(e.visitorProfile),
        };
      return n;
    }
    function l(e) {
      var t = j.getViewState(e),
        n = t && t.isActive ? t.metadata : {};
      return n;
    }
    function d(e) {
      var t = {};
      return e.pageId ? l(e.pageId) : t;
    }
    function f(e) {
      var t = H.getAllPlugins(b.PluginTypes.visitorProfileProviders),
        n = _.filter(t, { shouldTrack: !0 }),
        i = { id: null, type: null, name: "", value: null, shouldIndex: !0 };
      return _.reduce(
        n,
        function (t, n) {
          try {
            var r = n.provides,
              a = e[r],
              o = [];
            if (!_.isUndefined(a)) {
              _.isObject(a)
                ? (o = _.map(a, function (e, t) {
                    var n = _.isObject(e) ? e : { value: e };
                    return _.extend({}, { type: r, name: t }, n);
                  }))
                : o.push({ type: r, value: a });
              var s = _(o)
                .map(function (e) {
                  return _.pick(_.extend({}, i, e), _.keys(i));
                })
                .filter(function (e) {
                  return !!e.value;
                })
                .value();
              t = t.concat(s);
            }
          } catch (e) {
            x.warn("Error evaluating userFeature against visitorProfile:", e);
          }
          return t;
        },
        []
      );
    }
    function p(e, t, n) {
      var i = h(e, n);
      x.debug(
        "Found " +
          i.length +
          " analytics integrations defining a " +
          e +
          " hook"
      ),
        x.debug("Calling each with data: ", t),
        _.each(i, function (e) {
          try {
            x.debug("Calling plugin: " + e.name),
              e.hookFn(t),
              x.debug("Called plugin: " + e.name);
          } catch (e) {
            x.error(e);
          }
        });
    }
    function h(e, t) {
      var n = [];
      return (
        _.each(
          H.getAllPlugins(b.PluginTypes.analyticsTrackers),
          function (i, r) {
            if (i[e] && (!t || !i[t]))
              try {
                n.push({ name: r, hookFn: S.evaluate(i[e]) });
              } catch (e) {
                x.error(e);
              }
          }
        ),
        n
      );
    }
    function g(e, t, n) {
      var i = v(e, t);
      x.debug(
        "Found " +
          i.length +
          " analytics integrations  defining a trackLayerDecision " +
          e +
          " timing of " +
          t.join("|")
      ),
        x.debug("Calling each with data: ", n),
        _.each(i, function (e) {
          try {
            x.debug("Calling plugin: " + e.name),
              e.hookFn(n),
              x.debug("Called plugin: " + e.name);
          } catch (e) {
            x.error(e);
          }
        });
    }
    function v(e, t) {
      var n = [];
      return (
        _.each(
          H.getAllPlugins(b.PluginTypes.analyticsTrackers),
          function (i, r) {
            _.includes(t, i[e]) &&
              n.push({ name: r, hookFn: i.trackLayerDecision });
          }
        ),
        n
      );
    }
    var _ = n(2),
      m = n(7),
      E = n(86),
      y = n(71),
      I = n(24),
      T = n(32),
      S = n(16),
      A = n(80),
      b = n(25),
      w = n(73),
      D = n(87),
      R = n(111),
      C = n(112),
      N = n(9),
      O = n(113),
      x = n(23),
      L = (n(83), n(12).Promise),
      P = n(99),
      k = n(114),
      V = n(116),
      F = n(115),
      M = n(5),
      U = S.get("stores/client_metadata"),
      G = S.get("stores/global"),
      B = S.get("stores/session"),
      j = S.get("stores/view"),
      H = S.get("stores/plugins"),
      z = S.get("stores/layer"),
      K = S.get("stores/layer_data"),
      Y = S.get("stores/observed_redirect"),
      q = S.get("stores/pending_redirect"),
      W = S.get("stores/visitor"),
      X = S.get("stores/directive"),
      $ = S.get("stores/event_data"),
      Q = S.get("stores/visitor_id"),
      J = "COOKIE",
      Z = !0,
      ee = 1e3;
    (t.trackClientActivation = function () {
      if (X.shouldSendTrackingData()) {
        var e = o();
        return p("onClientActivation", e), e;
      }
    }),
      (t.trackCustomEvent = function (e, t, n) {
        (t = t || {}), n || (n = $.getByApiName(e));
        var r = i(e, t, n),
          a = {
            name: e,
            type: C.CUSTOM,
            category: r.eventCategory,
            tags: _.omit(r.eventTags, "revenue"),
          };
        if (
          (_.isUndefined(t.revenue) || (a.revenue = t.revenue),
          E.emitAnalyticsEvent(
            {
              name: n ? n.name || n.apiName : e,
              apiName: n ? n.apiName : void 0,
              type: C.CUSTOM,
              tags: _.omit(r.eventTags, "revenue"),
              category: r.eventCategory,
              metrics: a.revenue ? { revenue: a.revenue } : {},
            },
            !X.shouldSendTrackingData()
          ),
          X.shouldSendTrackingData())
        )
          return y.addEvent(a), p("onCustomEvent", r), r;
      }),
      (t.trackDecisionEvent = function (e, t, n) {
        n || (n = K.get(e.layerId));
        var i = M.generate();
        N.dispatch(m.RECORD_LAYER_DECISION_EVENT_ID, {
          layerId: e.layerId,
          pageId: t.pageId,
          decisionId: i,
        });
        var r = s(i, e, t, n),
          a = q.isExpectingRedirect(),
          o = q.getLayerId(),
          c = O.description(n);
        if (
          (a &&
            o === n.id &&
            (k.persist(r, J),
            x.log("Relaying decision for redirect Campaign", c)),
          !X.shouldSendTrackingData())
        )
          return void x.log(
            "Analytics / Not tracking decision for Campaign",
            O.description(n)
          );
        var l = u(r, e.isLayerHoldback);
        if (a && o === n.id) {
          var d = F.TrackLayerDecisionTimingFlags.preRedirectPolicy;
          (l.timing = d),
            g(
              d,
              [F.PreRedirectPolicies.PERSIST_BEFORE_AND_TRACK_DURING_REDIRECT],
              l
            ),
            x.log("Called trackLayerDecision for redirect Campaign", c, l);
        } else {
          var d = F.TrackLayerDecisionTimingFlags.nonRedirectPolicy;
          (l.timing = d),
            g(d, [F.NonRedirectPolicies.TRACK_IMMEDIATELY], l),
            x.log("Called trackLayerDecision for non-redirect Campaign", c, l);
        }
      }),
      (t.trackPostRedirectDecisionEvent = function () {
        if (!X.shouldSendTrackingData()) return L.resolve();
        if (Y.hasTracked()) return L.resolve();
        var e = Y.get();
        if (!e) return L.resolve();
        var t = u(e, !1),
          n = F.TrackLayerDecisionTimingFlags.postRedirectPolicy;
        if (
          ((t.timing = n),
          g(n, [F.PostRedirectPolicies.TRACK_IMMEDIATELY], t),
          Z)
        ) {
          var i = new L(function (e) {
              var t = D.on({
                filter: { type: R.TYPES.LIFECYCLE, name: "originsSynced" },
                handler: function () {
                  e(), D.off(t);
                },
              });
            }),
            r = V.makeTimeoutPromise(ee);
          return L.race([i, r])
            .then(
              function () {
                x.log("Calling trackers after successful sync");
              },
              function (e) {
                x.warn("Calling trackers after failed sync:", e);
              }
            )
            .then(function () {
              (t = u(e, !1)),
                (t.timing = F.TrackLayerDecisionTimingFlags.postRedirectPolicy),
                g(
                  F.TrackLayerDecisionTimingFlags.postRedirectPolicy,
                  [F.PostRedirectPolicies.TRACK_AFTER_SYNC],
                  t
                ),
                N.dispatch(m.REGISTER_TRACKED_REDIRECT_DATA);
            })
            ["catch"](function (e) {
              x.error("Error when calling trackers after sync:", e);
            });
        }
        return (
          g(
            F.TrackLayerDecisionTimingFlags.postRedirectPolicy,
            [F.PostRedirectPolicies.TRACK_AFTER_SYNC],
            t
          ),
          N.dispatch(m.REGISTER_TRACKED_REDIRECT_DATA),
          L.resolve()
        );
      }),
      (t.trackClickEvent = function (e) {
        var t = a(e),
          n = {
            name: e.apiName,
            type: e.eventType,
            category: t.eventCategory,
            tags: t.eventTags,
          };
        if (
          (E.emitAnalyticsEvent(
            {
              name: e.name || e.apiName,
              apiName: e ? e.apiName : void 0,
              type: e.eventType,
              category: t.eventCategory,
              tags: t.eventTags,
              metrics: {},
            },
            !X.shouldSendTrackingData()
          ),
          X.shouldSendTrackingData())
        )
          return y.addEvent(n), p("onClickEvent", t), t;
      }),
      (t.trackViewActivation = function (e, t) {
        if ((t || (t = j.getViewState(e.id)), !t.isActive))
          return void x.debug("Inactive view passed to `trackViewActivation`");
        var n = r(e, t);
        return (
          E.emitAnalyticsEvent(
            {
              name: e.name || n.pageApiName,
              apiName: n.pageApiName,
              type: C.PAGEVIEW,
              category: n.viewCategory,
              tags: n.eventTags,
              metrics: {},
            },
            !X.shouldSendTrackingData()
          ),
          X.shouldSendTrackingData()
            ? (y.addEvent({
                name: n.pageApiName,
                type: C.PAGEVIEW,
                category: n.viewCategory,
                tags: n.eventTags,
              }),
              N.dispatch(m.TRACK_VIEW_ACTIVATED_EVENT, {
                pageId: e.id,
                eventData: n,
              }),
              p("onPageActivated", n),
              n)
            : void 0
        );
      });
  },
  function (e, t) {
    t.TYPES = {
      ACTION: "action",
      ANALYTICS: "analytics",
      EDITOR: "editor",
      LIFECYCLE: "lifecycle",
    };
  },
  function (e, t) {
    e.exports = {
      CLICK: "click",
      CUSTOM: "custom",
      ENGAGEMENT: "engagement",
      PAGEVIEW: "pageview",
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(24),
      o = n(16),
      s = n(9),
      u = o.get("stores/global"),
      c = o.get("stores/session"),
      l = 2e3;
    (t.recordLayerDecision = function (e, t, n) {
      return (
        s.dispatch(r.RECORD_LAYER_DECISION, {
          layerId: e,
          decision: n,
          decisionTicket: t,
          sessionId: c.getSessionId(),
          activationId: u.getActivationId(),
          timestamp: a.now(),
          revision: u.getRevision(),
          namespace: u.getNamespace(),
          pageId: t.pageId,
        }),
        n
      );
    }),
      (t.relatedAudienceIds = function (e) {
        var t = {},
          n = ["and", "or", "not"];
        return (
          i.each(e.experiments, function (e) {
            i.each(i.flattenDeep(e.audienceIds), function (e) {
              i.includes(n, e) || (t[e] = !0);
            });
          }),
          i.keys(t)
        );
      }),
      (t.getActivationTimeout = function (e) {
        var t = e.activation;
        return t && null !== t.timeout && void 0 !== t.timeout ? t.timeout : l;
      }),
      (t.description = function (e) {
        return (e.name ? '"' + e.name + '" ' : "") + "(" + e.id + ")";
      }),
      (t.createSingle = function (e, t, n) {
        var i = {
          id: e,
          policy: "single_experiment",
          holdback: 0,
          experiments: [
            { id: t || "", variations: [{ id: n || "", actions: [] }] },
          ],
        };
        return i;
      }),
      (t.createLayerState = function (e, t, n, i) {
        var r = {
          layerId: e,
          decision: {
            layerId: e,
            experimentId: t,
            variationId: n,
            isLayerHoldback: i || !1,
          },
          decisionTicket: { audienceIds: [] },
        };
        return r;
      }),
      (t.getIntegrationTypes = function (e) {
        return i.keys(
          i.reduce(
            i.keys(e.integrationSettings),
            function (e, t) {
              return i.isNaN(Number(t)) || (t = "custom"), (e[t] = 1), e;
            },
            {}
          )
        );
      });
  },
  function (e, t, n) {
    function i(e) {
      try {
        var t = r(e);
      } catch (e) {
        return (
          _.error("Relay / Error computing redirect relay cookie: ", e),
          void p.emitError(e)
        );
      }
      _.debug("Relay / Setting redirect relay cookie:", t);
      try {
        f.set(g.COOKIES.REDIRECT, t, { maxAge: 5, encodeValue: !1 });
      } catch (e) {
        _.error("Relay / Failed to set redirect relay cookie", e),
          p.emitError(e);
      }
    }
    function r(e) {
      var t = [],
        n = l.reduce(
          e,
          function (e, n, i) {
            var r = T[i];
            return r
              ? (r.isMulti
                  ? l.forEach(n, function (t, n) {
                      (t = r.valueToValueString
                        ? r.valueToValueString(t, n)
                        : String(t)),
                        l.isNull(t) ||
                          ((t = (r.encodeValueString || encodeURIComponent)(t)),
                          e.push(
                            encodeURIComponent(r.relayName + y + n) + "=" + t
                          ));
                    })
                  : l.isNull(n) ||
                    ((n = (r.valueToValueString || String)(n)),
                    (n = (r.encodeValueString || encodeURIComponent)(n)),
                    e.push(r.relayName + "=" + n)),
                e)
              : (t.push(i), e);
          },
          []
        );
      if (t.length)
        throw new Error("Relay / Don't know how to relay some fields:", t);
      return n.sort(), n.join("&");
    }
    function a() {
      var e = f.get(g.COOKIES.REDIRECT, !1);
      if (e) return _.log("Relay / Found redirect cookie:", e), e;
    }
    function o(e) {
      var t = {},
        n = e.split("&");
      return (
        l.forEach(n, function (e) {
          var n = e.split("=");
          if (2 !== n.length)
            return void _.warn("Relay / Skipping invalid segment:", e);
          var i = f.safeDecodeURIComponent(n[0]),
            r = S[i];
          if (
            !r &&
            ((r = l.find(I, function (e) {
              return e.isMulti && 0 === i.indexOf(e.relayName + y);
            })),
            !r)
          )
            return void _.warn(
              "Relay / Skipping segment with unknown field identifier:",
              e,
              i
            );
          var a = n[1];
          try {
            if (r.isMulti) {
              t[r.name] = t[r.name] || {};
              var o = i.substring(r.relayName.length + y.length);
              (a = (r.decodeValueString || f.safeDecodeURIComponent)(a)),
                (a = (r.valueFromValueString || l.identity)(a, o)),
                (t[r.name][o] = a);
            } else (a = (r.decodeValueString || f.safeDecodeURIComponent)(a)), (a = (r.valueFromValueString || l.identity)(a)), (t[r.name] = a);
          } catch (t) {
            return (
              _.warn(
                "Relay / Skipping segment due to decode or parse error:",
                e,
                t
              ),
              void p.emitError(t)
            );
          }
        }),
        t
      );
    }
    function s(e, t) {
      var n = null;
      if (e) {
        var i = E.getPlugin(g.PluginTypes.analyticsTrackers, t);
        if (i && l.isFunction(i.serializeSettings))
          try {
            n = i.serializeSettings(e);
          } catch (e) {
            _.warn(
              "Analytics / Failed to persist integrationSettings for plugin:",
              t,
              e
            );
          }
      }
      return n;
    }
    function u(e, t) {
      var n = null,
        i = E.getPlugin(g.PluginTypes.analyticsTrackers, t);
      if (i && l.isFunction(i.deserializeSettings))
        try {
          n = i.deserializeSettings(e);
        } catch (e) {
          _.warn(
            "Analytics / Failed to persist integrationSettings for plugin:",
            t,
            e
          );
        }
      return n;
    }
    function c(e) {
      var t = e.pageId || void 0;
      v.dispatch(d.RECORD_LAYER_DECISION, {
        layerId: e.layerId,
        decision: {
          layerId: e.layerId,
          experimentId: e.experimentId,
          variationId: e.variationId,
          isLayerHoldback: !1,
        },
        decisionTicket: {
          audienceIds: e.decisionTicketAudienceIds,
          bucketingId: e.visitorId,
          globalHoldback: 0,
          preferredVariationMap: void 0,
          pageId: t,
          activationId: e.activationId,
        },
        sessionId: e.sessionId,
        activationId: e.activationId,
        timestamp: e.timestamp,
        revision: e.revision,
        namespace: e.namespace,
        pageId: t,
      }),
        v.dispatch(d.RECORD_LAYER_DECISION_EVENT_ID, {
          layerId: e.layerId,
          pageId: t,
          decisionId: e.decisionId,
        }),
        v.dispatch(d.ACTION_EXECUTED, {
          sessionId: e.sessionId,
          layerId: e.layerId,
          pageId: e.pageId,
          timestamp: e.timestamp,
          activationId: e.activationId,
        });
    }
    var l = n(2),
      d = n(7),
      f = n(75),
      p = n(86),
      h = n(16),
      g = n(25),
      v = n(9),
      _ = n(23),
      m = n(115),
      E = h.get("stores/plugins"),
      y = ".",
      I = [
        { name: "sessionId", relayName: "s" },
        {
          name: "decisionTicketAudienceIds",
          relayName: "as",
          valueToValueString: function (e) {
            return l.map(e, encodeURIComponent).join(",");
          },
          encodeValueString: l.identity,
          decodeValueString: l.identity,
          valueFromValueString: function (e) {
            return l.map(e.split(","), f.safeDecodeURIComponent);
          },
        },
        { name: "decisionId", relayName: "d" },
        { name: "activationId", relayName: "aId" },
        { name: "pageId", relayName: "vId", isNullable: !0 },
        { name: "variationId", relayName: "v", isNullable: !0 },
        { name: "referrer", relayName: "r" },
        { name: "timestamp", relayName: "t", valueFromValueString: Number },
        { name: "visitorId", relayName: "i" },
        { name: "projectId", relayName: "p" },
        { name: "revision", relayName: "n" },
        { name: "clientName", relayName: "cN", isNullable: !0 },
        { name: "clientVersion", relayName: "cV" },
        { name: "namespace", relayName: "ns" },
        { name: "accountId", relayName: "a" },
        { name: "layerId", relayName: "l" },
        { name: "layerName", relayName: "lN", isNullable: !0 },
        { name: "layerPolicy", relayName: "lP" },
        { name: "experimentId", relayName: "x", isNullable: !0 },
        { name: "experimentName", relayName: "xN", isNullable: !0 },
        { name: "variationName", relayName: "vN", isNullable: !0 },
        {
          name: "integrationStringVersion",
          relayName: "isv",
          valueFromValueString: Number,
          isNullable: !0,
        },
        {
          name: "integrationSettings",
          relayName: "iS",
          isMulti: !0,
          valueToValueString: s,
          valueFromValueString: u,
          isNullable: !0,
        },
      ],
      T = {},
      S = {};
    l.forEach(I, function (e) {
      (T[e.name] = e), (S[e.relayName] = e);
    }),
      (t.persist = function (e, t) {
        t === m.RedirectRelayMedia.COOKIE
          ? i(e)
          : _.error("Relay / Unsupported redirect relay medium: " + t);
      }),
      (t.load = function (e) {
        if ((e || (e = a()), e)) {
          var t = o(e);
          if (t) {
            var n = [];
            return (
              l.forEach(I, function (e) {
                (l.isNull(t[e.name]) || l.isUndefined(t[e.name])) &&
                  (e.isNullable
                    ? (t[e.name] = null)
                    : (delete t[e.name], n.push(e.name)));
              }),
              n.length
                ? void _.error(
                    "Relay / Observed redirect data with missing fields:",
                    n
                  )
                : (v.dispatch(d.LOAD_REDIRECT_DATA, t),
                  v.dispatch(d.ADD_CLEANUP_FN, {
                    lifecycle: g.Lifecycle.postVisitorProfileLoad,
                    cleanupFn: function () {
                      c(t);
                    },
                  }),
                  t)
            );
          }
        }
      });
  },
  function (e, t, n) {
    var i = n(8);
    (t.TrackLayerDecisionTimingFlags = i({
      preRedirectPolicy: null,
      postRedirectPolicy: null,
      nonRedirectPolicy: null,
    })),
      (t.PreRedirectPolicies = i({
        PERSIST_BEFORE_AND_TRACK_DURING_REDIRECT: null,
        PERSIST_BEFORE_REDIRECT: null,
      })),
      (t.PostRedirectPolicies = i({
        TRACK_IMMEDIATELY: null,
        TRACK_AFTER_SYNC: null,
      })),
      (t.NonRedirectPolicies = i({ TRACK_IMMEDIATELY: null })),
      (t.RedirectRelayMedia = i({ COOKIE: null }));
  },
  function (e, t, n) {
    var i = n(12).Promise,
      r = n(40);
    t.makeTimeoutPromise = function (e) {
      return new i(function (t, n) {
        r.setTimeout(function () {
          n(new Error("Timed out after " + e + " ms"));
        }, e);
      });
    };
  },
  function (e, t, n) {
    function i(e) {
      var t = ["type", "selector", "attributes", "value"],
        n = r.extend({}, e);
      return (
        (n.changeSet = r.map(e.changeSet, function (e) {
          return r.pick(l.dereferenceChangeId(e), t);
        })),
        n
      );
    }
    var r = n(2),
      a = n(16),
      o = a.get("stores/audience_data"),
      s = n(87),
      u = n(111),
      c = n(96),
      l = n(98);
    (t.emitLayerDecided = function (e) {
      var t = e.decisionTicket ? e.decisionTicket.audienceIds : [],
        n = r.map(t, function (e) {
          return { id: e, name: o.get(e).name };
        }),
        i = {
          type: u.TYPES.LIFECYCLE,
          name: "layerDecided",
          data: r.extend(e, { audiences: n }),
        },
        a = l.translateLayerEventToCampaignEvent(i);
      s.emit(i), s.emit(a);
    }),
      (t.emitViewActivated = function (e) {
        var t = { type: u.TYPES.LIFECYCLE, name: "viewActivated", data: e },
          n = l.translateViewActivatedToPageActivated(t);
        s.emit(t), s.emit(n);
      }),
      (t.emitViewsActivated = function (e) {
        var t = { type: u.TYPES.LIFECYCLE, name: "viewsActivated", data: e };
        s.emit(t);
      }),
      (t.emitPageDeactivated = function (e) {
        var t = { type: u.TYPES.LIFECYCLE, name: "pageDeactivated", data: e };
        s.emit(t);
      }),
      (t.emitActivateEvent = function () {
        s.emit({ type: u.TYPES.LIFECYCLE, name: "activate" }, !0);
      }),
      (t.emitActivatedEvent = function () {
        s.emit({ type: u.TYPES.LIFECYCLE, name: "activated" });
      }),
      (t.emitInitializedEvent = function () {
        var e = { type: u.TYPES.LIFECYCLE, name: "initialized" };
        window.optimizely && (window.optimizely.initialized = !0), s.emit(e);
      }),
      (t.emitOriginsSyncedEvent = function () {
        var e = { type: u.TYPES.LIFECYCLE, name: "originsSynced" };
        s.emit(e);
      }),
      (t.emitActionAppliedEvent = function (e) {
        var t = {
          type: e.type,
          campaignId: e.layerId,
          pageId: e.pageId,
          experimentId: e.experimentId,
          variationId: e.variationId,
        };
        c.defineProperty(
          t,
          "changes",
          function () {
            return i(e).changeSet;
          },
          "actionAppliedEvent"
        );
        var n = { type: u.TYPES.ACTION, name: "applied", data: t };
        s.emit(n);
      }),
      (t.emitActionsForDecisionAppliedEvent = function (e, t) {
        var n = { decision: e };
        c.defineProperty(
          n,
          "actions",
          function () {
            return r.map(t, i);
          },
          "appliedAllForDecisionEvent"
        );
        var a = {
          type: u.TYPES.ACTION,
          name: "appliedAllForDecision",
          data: n,
        };
        s.emit(a);
      }),
      (t.emitSendEvents = function () {
        var e = { type: u.TYPES.ANALYTICS, name: "sendEvents" };
        s.emit(e);
      }),
      (t.emitHoldEvents = function () {
        var e = { type: u.TYPES.ANALYTICS, name: "holdEvents" };
        s.emit(e);
      });
  },
  function (e, t, n) {
    function i() {
      var e = Boolean(E.result(window.optimizely, "initialized"));
      b.dispatch(y.LOAD_DIRECTIVE, { alreadyInitialized: e });
    }
    function r() {
      b.dispatch(y.LOAD_DIRECTIVE, {
        mutationObserverAPISupported: N.isMutationObserverAPISupported(),
      });
    }
    function a() {
      var e = N.getUserAgent() || "";
      if (!E.isString(e))
        return void w.warn("Directive / userAgent not a string");
      e = e.toLowerCase();
      var t = [
          "googlebot",
          "yahoo! slurp",
          "bingbot",
          "bingpreview",
          "msnbot",
          "keynote",
          "ktxn",
          "khte",
          "gomezagent",
          "alertsite",
          "yottaamonitor",
          "pingdom.com_bot",
          "aihitbot",
          "baiduspider",
          "adsbot-google",
          "mediapartners-google",
          "applebot",
          "catchpoint",
          "phantomjs",
          "moatbot",
          "facebookexternalhit",
        ],
        n = function (t) {
          if (E.includes(e, t))
            return w.warn("Directive / Matches bot:", t), !0;
        };
      E.some(t, n) &&
        (w.log("Directive / Disabling tracking"),
        b.dispatch(y.LOAD_DIRECTIVE, { trackingDisabled: !0 }));
    }
    function o() {
      var e = T.get(A.COOKIES.OPT_OUT),
        t = R.getQueryParamValue(O.OPT_OUT),
        n = "You have successfully opted out of Optimizely for this domain.",
        i = "You are NOT opted out of Optimizely for this domain.",
        r = "true" === t || "false" === t;
      if (r) {
        var a = "true" === t;
        b.dispatch(y.LOAD_DIRECTIVE, { shouldOptOut: a }), N.alert(a ? n : i);
      } else e && b.dispatch(y.LOAD_DIRECTIVE, { shouldOptOut: "true" === e });
    }
    function s() {
      var e = !1,
        t = [O.AB_PREVIEW, O.DISABLE];
      t.push(O.EDITOR);
      for (var n = 0; n < t.length; n++)
        if ("true" === R.getQueryParamValue(t[n])) {
          w.warn("Directive / Not activating because " + t[n] + " is set."),
            (e = !0);
          break;
        }
      b.dispatch(y.LOAD_DIRECTIVE, { disabled: e });
    }
    function u() {
      b.dispatch(y.LOAD_DIRECTIVE, { isPreview: !1 });
    }
    function c() {
      var e = R.getQueryParamValue(O.LEGACY_PREVIEW);
      e && w.log("Directive / Is legacy preview mode"),
        b.dispatch(y.LOAD_DIRECTIVE, { isLegacyPreview: !!e });
    }
    function l() {
      b.dispatch(y.LOAD_DIRECTIVE, { isEditor: !1 });
    }
    function d() {
      b.dispatch(y.LOAD_DIRECTIVE, { isSlave: !1 });
    }
    function f() {
      var e = N.getGlobal("optlyDesktop"),
        t = !(!e || E.isUndefined(e["p13nInner"]));
      t && w.log("Directive / Is running in desktop app editor"),
        b.dispatch(y.LOAD_DIRECTIVE, { isRunningInDesktopApp: t });
    }
    function p() {
      var e = "true" === R.getQueryParamValue(O.EDITOR_V2);
      e && w.log("Directive / Is running in editor"),
        b.dispatch(y.LOAD_DIRECTIVE, { isRunningInV2Editor: e });
    }
    function h() {
      var e = T.get(A.COOKIES.TOKEN) || null,
        t = R.getQueryParamValue(O.TOKEN) || e;
      b.dispatch(y.LOAD_DIRECTIVE, { projectToken: t });
    }
    function g() {
      var e = T.get(A.COOKIES.PREVIEW),
        t = [],
        n = R.getQueryParamValue(O.FORCE_AUDIENCES);
      if (n) t = T.safeDecodeURIComponent(n).split(",");
      else if (e)
        try {
          var i = C.parse(e);
          t = i.forceAudienceIds;
        } catch (t) {
          var r = new D(
              "Failed to parse previewCookie in registerForceAudienceIds: " + e
            ),
            a = { originalMessage: t.message, userError: !0 };
          I.emitError(r, a);
        }
      t.length &&
        (w.log("Directive / Force Audience IDs:", t),
        b.dispatch(y.LOAD_DIRECTIVE, { forceAudienceIds: t }));
    }
    function v() {
      var e = T.get(A.COOKIES.PREVIEW),
        t = [],
        n = R.getQueryParamValue(O.FORCE_VARIATIONS);
      if (n) t = T.safeDecodeURIComponent(n).split(",");
      else if (e)
        try {
          var i = C.parse(e);
          t = i.forceVariationIds;
        } catch (t) {
          var r = new D(
              "Failed to parse previewCookie in registerForceVariationIds: " + e
            ),
            a = { originalMessage: t.message, userError: !0 };
          I.emitError(r, a);
        }
      t.length &&
        (w.log("Directive / Force Variation IDs:", t),
        b.dispatch(y.LOAD_DIRECTIVE, { forceVariationIds: t }));
    }
    function _() {
      var e = R.getQueryParamValue(O.FORCE_TRACKING);
      e && b.dispatch(y.LOAD_DIRECTIVE, { forceTracking: e });
    }
    function m() {
      var e = "OFF",
        t = R.getQueryParamValue("optimizely_log");
      if (t) {
        var n = t.split(":");
        "" !== n[0] && (e = String(n[0]).toUpperCase()),
          "undefined" != typeof n[1] && w.setLogMatch(n[1]);
      }
      w.setLogLevel(e);
    }
    var E = n(2),
      y = n(7),
      I = n(86),
      T = n(75),
      S = n(76).create,
      A = n(25),
      b = n(9),
      w = n(23),
      D = (t.JSONParseError = S("JSONParseError")),
      R = n(119),
      C = n(26),
      N = n(40),
      O = {
        AB_PREVIEW: "optimizely_show_preview",
        DISABLE: "optimizely_disable",
        EDITOR: "optimizely_editor",
        EDITOR_V2: "optimizely_p13n",
        FORCE_AUDIENCES: "optimizely_x_audiences",
        FORCE_VARIATIONS: "optimizely_x",
        LEGACY_PREVIEW: "optimizely_show_preview",
        OPT_OUT: "optimizely_opt_out",
        PREVIEW_LAYER_IDS: "optimizely_preview_layer_ids",
        TOKEN: "optimizely_token",
        FORCE_TRACKING: "optimizely_force_tracking",
      };
    t.populateDirectiveData = function () {
      m(),
        a(),
        i(),
        r(),
        o(),
        s(),
        l(),
        u(),
        c(),
        d(),
        f(),
        p(),
        h(),
        g(),
        v(),
        _();
    };
    var x = 31536e3;
    t.setOptOut = function (e) {
      e
        ? (w.warn("Directive / Opting out"),
          T.set(A.COOKIES.OPT_OUT, "true", { maxAge: 10 * x }, !0))
        : T.remove(A.COOKIES.OPT_OUT),
        b.dispatch(y.LOAD_DIRECTIVE, { shouldOptOut: e });
    };
  },
  function (e, t, n) {
    var i = n(84),
      r = n(40);
    (t.getLanguage = function () {
      return r.getNavigatorLanguage();
    }),
      (t.getQueryParams = i.getQueryParams),
      (t.getQueryParamValue = i.getQueryParamValue),
      (t.getUrl = function () {
        return r.getHref();
      });
  },
  function (e, t, n) {
    function i(e) {
      return e && e.engine
        ? e.engine
        : v
        ? "edge-tracking"
        : g
        ? "edge-helper"
        : f.getClientName();
    }
    var r = n(2),
      a = n(76).BaseError,
      o = n(24),
      s = n(16),
      u = n(80),
      c = n(23),
      l = n(40),
      d = n(91),
      f = s.get("stores/client_metadata"),
      p = s.get("stores/global"),
      h = "https://errors.client.optimizely.com",
      g = !1,
      v = !1;
    t.handleError = function (e, t) {
      function n() {
        return d
          .request({
            url: h + "/log",
            method: "POST",
            data: _,
            contentType: "application/json",
          })
          .then(
            function (e) {
              c.log("Error Monitor / Logged error with response: ", e);
            },
            function (e) {
              c.error("Failed to log error, response was: ", e);
            }
          );
      }
      var s = e.name || "Error",
        g = e.message || "",
        v = e.stack || null;
      e instanceof a &&
        (g instanceof Error
          ? ((g = g.message), (v = e.message.stack))
          : (v = null));
      var _ = {
          timestamp: o.now(),
          clientEngine: i(t),
          clientVersion: f.getClientVersion(),
          accountId: p.getAccountId(),
          projectId: p.getProjectId(),
          errorClass: s,
          message: g,
          stacktrace: v,
        },
        m = r.map(p.getExperimental(), function (e, t) {
          return { key: "exp_" + t, value: String(e) };
        });
      t &&
        r.forEach(
          t,
          function (e, t) {
            r.isObject(e) || m.push({ key: t, value: String(e) });
          },
          []
        ),
        r.isEmpty(m) || (_.metadata = m),
        c.error("Logging error", _),
        u.isLoaded() ? n() : l.addEventListener("load", n);
    };
  },
  function (e, t, n) {
    var i = n(2);
    t.create = function (e, t, n, r) {
      var a = i.extend({ category: "other" }, r, {
        id: e,
        apiName: t,
        eventType: n,
      });
      return a;
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(16),
      o = n(25),
      s = n(87),
      u = n(9);
    (t.registerApiModule = function (e, t) {
      i.isArray(t) && (t = a.evaluate(t)),
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.apiModules,
          name: e,
          plugin: t,
        });
    }),
      (t.registerDependency = function (e, t) {
        var n = a.get(e);
        n || a.register(e, t);
      }),
      (t.registerVisitorProfileProvider = function (e) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.visitorProfileProviders,
          name: e.provides,
          plugin: e,
        });
      }),
      (t.registerViewProvider = function (e) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.viewProviders,
          name: e.provides,
          plugin: e,
        });
      }),
      (t.registerAudienceMatcher = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.audienceMatchers,
          name: e,
          plugin: t,
        });
      }),
      (t.registerViewMatcher = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.viewMatchers,
          name: e,
          plugin: t,
        });
      }),
      (t.registerAnalyticsTracker = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.analyticsTrackers,
          name: e,
          plugin: t,
        });
      }),
      (t.registerViewTagLocator = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.viewTagLocators,
          name: e,
          plugin: t,
        });
      }),
      (t.registerAudiencePlugin = function (e) {
        e.dependencies &&
          i.each(e.dependencies, function (e, n) {
            t.registerDependency(n, e);
          });
        var n,
          r = "vendor." + e.vendor;
        (n = i.isString(e.provider)
          ? a.get(e.provider)(e.vendor)
          : i.isFunction(e.provider)
          ? e.provider(e.vendor)
          : i.cloneDeep(e.provider)),
          t.registerVisitorProfileProvider(i.extend(n, { provides: r }));
        var o;
        o = i.isString(e.matcher) ? a.get(e.matcher) : e.matcher;
        var s = {
          fieldsNeeded: [r],
          match: function (e, t) {
            return o(e[r], t);
          },
        };
        t.registerAudienceMatcher(r, s);
      }),
      (t.registerWidget = function (e) {
        i.isArray(e) && (e = a.evaluate(e));
        var t = s.on({
            filter: { type: "showWidget", name: e.widgetId },
            handler: e.showFn,
          }),
          n = s.on({
            filter: { type: "hideWidget", name: e.widgetId },
            handler: e.hideFn,
          });
        return { showToken: t, hideToken: n };
      }),
      (t.registerChangeApplier = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.changeAppliers,
          name: e,
          plugin: t,
        });
      }),
      (t.registerDecider = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.deciders,
          name: e,
          plugin: t,
        });
      }),
      (t.registerEventImplementation = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.eventImplementations,
          name: e,
          plugin: t,
        });
      }),
      (t.registerViewTrigger = function (e, t) {
        u.dispatch(r.REGISTER_PLUGIN, {
          type: o.PluginTypes.viewTriggers,
          name: e,
          plugin: t,
        });
      });
  },
  function (e, t, n) {
    function i(e, t) {
      r.forEach(e, function (e) {
        if (e.eventType !== d.CUSTOM) {
          var n = v.getPlugin(l.PluginTypes.eventImplementations, e.eventType);
          n
            ? t
              ? n.attach(e)
              : n.detach(e)
            : p.warn(
                "No implementation found for event type:",
                e.eventType,
                "needed for event:",
                e
              );
        }
      });
    }
    var r = n(2),
      a = n(7),
      o = n(117),
      s = n(124),
      u = n(24),
      c = n(16),
      l = n(25),
      d = n(112),
      f = n(9),
      p = n(23),
      h = n(125),
      g = c.get("stores/event_data"),
      v = c.get("stores/plugins"),
      _ = c.get("stores/rum"),
      m = c.get("stores/view"),
      E = c.get("stores/view_data");
    (t.parseViewTags = function (e) {
      var n = t.evaluateViewTags(e);
      t.setParsedViewTags(e.id, n);
    }),
      (t.updateAllViewTags = function () {
        var e = m.getActiveViewStates();
        r.each(e, function (e) {
          var n = E.get(e.id);
          t.parseViewTags(n);
        });
      }),
      (t.evaluateViewTags = function (e) {
        if (!e.tags) return {};
        var t = r.reduce(
          e.tags,
          function (e, t) {
            try {
              e[t.apiName] = h.getTagValue(t);
            } catch (e) {
              e instanceof h.Error
                ? p.warn("Page / Ignoring unparseable tag", t, e)
                : p.error(e);
            }
            return e;
          },
          {}
        );
        return t;
      }),
      (t.createViewTicket = function () {
        var e = {};
        return (
          r.each(v.getAllPlugins(l.PluginTypes.viewProviders), function (t) {
            e[t.provides] = c.evaluate(t.getter);
          }),
          e
        );
      }),
      (t.registerViews = function (e) {
        f.dispatch(a.REGISTER_VIEWS, { views: e });
      }),
      (t.activateViaAPI = function (e, n) {
        n && t.setUserSuppliedViewTags(e.id, n), t.activateMultiple([e], n);
      }),
      (t.getViewsAndActivate = function (e) {
        var n = E.getAllViewsForActivationType(e);
        t.activateMultiple(n);
      }),
      (t.activateMultiple = function (e, n) {
        var s = [];
        return (
          r.each(e, function (e) {
            var u,
              c = m.getViewState(e.id),
              d = t.createViewTicket();
            if (c.isActive)
              if (e.deactivationEnabled)
                try {
                  t.hasValidStaticConditions(e, d) || t.deactivate(e);
                } catch (n) {
                  p.error(
                    "Page / Error evaluating whether to deactivate page ",
                    t.description(e),
                    n
                  );
                }
              else
                p.log("Not activating Page, already active ", t.description(e));
            else {
              try {
                if (((u = t.hasValidStaticConditions(e, d)), !u))
                  return (
                    r.isBoolean(c.isActive) || t.setViewActiveState(e, !1),
                    void p.log(
                      "Page / Failed to match page conditions for " +
                        t.description(e),
                      e.staticConditions
                    )
                  );
              } catch (n) {
                return (
                  r.isBoolean(c.isActive) || t.setViewActiveState(e, !1),
                  void p.error(
                    "Page / Error evaluating whether to activate page ",
                    t.description(e),
                    n
                  )
                );
              }
              if (
                (s.push(e),
                t.setViewActiveState(e, !0),
                p.log("Activated Page", t.description(e)),
                o.emitViewActivated({ view: e, metadata: n }),
                _.getSampleRum())
              ) {
                var h = e.activationType || l.ViewActivationTypes.immediate;
                f.dispatch(a.RECORD_ACTIVATION_TYPE_USAGE, {
                  activationType: h,
                  entityId: e.id,
                });
              }
              var v = g.getByPageId(e.id);
              i(v, !0);
            }
          }),
          r.isEmpty(s) || o.emitViewsActivated({ views: s }),
          s
        );
      }),
      (t.deactivate = function (e) {
        var n = m.getViewState(e.id);
        if (!n.isActive)
          return void p.log(
            "Not deactivating Page, already inactive ",
            t.description(e)
          );
        t.setViewActiveState(e, !1),
          p.log("Deactivated Page", t.description(e)),
          o.emitPageDeactivated({ page: e });
        var r = g.getByPageId(e.id);
        i(r, !1);
      }),
      (t.setViewActiveState = function (e, t) {
        f.dispatch(a.SET_VIEW_ACTIVE_STATE, {
          view: e,
          timestamp: u.now(),
          isActive: t,
        });
      }),
      (t.setGlobalTags = function (e) {
        f.dispatch(a.SET_GLOBAL_TAGS, e);
      }),
      (t.setParsedViewTags = function (e, t) {
        f.dispatch(a.UPDATE_PARSED_VIEW_METADATA, { pageId: e, metadata: t });
      }),
      (t.setUserSuppliedViewTags = function (e, t) {
        f.dispatch(a.UPDATE_USER_SUPPLIED_METADATA, { pageId: e, metadata: t });
      }),
      (t.hasValidStaticConditions = function (e, t) {
        var n = {};
        if (r.isEmpty(e.staticConditions)) return !0;
        var i = v.getAllPlugins(l.PluginTypes.viewMatchers);
        p.groupCollapsed(
          "Page / Evaluating staticConditions:",
          e.staticConditions
        ),
          p.debug("Matching to current value:", t);
        var o = s.evaluate(e.staticConditions, function (e) {
          var r = e.type,
            a = i[r];
          if (!a) throw new Error("Page / No matcher found for type=" + r);
          return a && (n[e.type] || (n[e.type] = !0)), a.match(t, e);
        });
        return (
          p.groupEnd(),
          _.getSampleRum() &&
            o &&
            f.dispatch(a.RECORD_VIEW_FEATURE_USAGE, {
              featuresUsed: r.keys(n),
              entityId: e.id,
            }),
          o
        );
      }),
      (t.description = function (e) {
        return '"' + e.name + '" (' + e.id + ")";
      }),
      (t.isActivationTypeImmediate = function (e) {
        return e === l.ViewActivationTypes.immediate || !e;
      }),
      (t.shouldTriggerImmediately = function (e) {
        return (
          e === l.ViewActivationTypes.DOMChanged ||
          e === l.ViewActivationTypes.URLChanged ||
          e === l.ViewActivationTypes.immediate ||
          !e
        );
      }),
      (t.create = function (e, t) {
        var n = { id: e, apiName: t, category: "other" };
        return n;
      }),
      (t.createState = function (e) {
        var t = {
          id: e,
          isActive: !0,
          metadata: {},
          parsedMetadata: {},
          userSuppliedMetadata: {},
        };
        return t;
      });
  },
  function (e, t, n) {
    function i(e, t) {
      for (var n, i, r = 0; r < e.length; r++) {
        if (((n = o(e[r], t)), n === !1)) return !1;
        s.isUndefined(n) && (i = !0);
      }
      if (!i) return !0;
    }
    function r(e, t) {
      for (var n, i = !1, r = 0; r < e.length; r++) {
        if (((n = o(e[r], t)), n === !0)) return !0;
        s.isUndefined(n) && (i = !0);
      }
      if (!i) return !1;
    }
    function a(e, t) {
      if (1 !== e.length) return !1;
      var n = o(e[0], t);
      return s.isUndefined(n) ? void 0 : !n;
    }
    function o(e, t) {
      var n;
      if (s.isArray(e)) {
        var i, r;
        e[0] in d ? ((i = e[0]), (r = e.slice(1))) : ((i = l.OR), (r = e)),
          c.groupCollapsed(
            'Condition / Applying operator "' + i + '" with args',
            u.stringify(r)
          );
        try {
          (n = d[i](r, t)), c.debug("Condition / Result:", n);
        } finally {
          c.groupEnd();
        }
        return n;
      }
      return (
        (n = t(e)), c.debug("Condition / Evaluated:", u.stringify(e), ":", n), n
      );
    }
    var s = n(2),
      u = n(26),
      c = n(23),
      l = { AND: "and", OR: "or", NOT: "not" },
      d = {};
    (d[l.AND] = i),
      (d[l.OR] = r),
      (d[l.NOT] = a),
      (e.exports = { evaluate: o });
  },
  function (e, t, n) {
    var i = n(25).PluginTypes,
      r = n(16),
      a = r.get("stores/plugins");
    (t.getTagValue = function (e) {
      var n = a.getPlugin(i.viewTagLocators, e.locatorType);
      if (!n)
        throw new t.Error(
          "No locator registered for tag locatorType: " + e.locatorType
        );
      return n(e);
    }),
      (t.enums = n(126)),
      (t.Error = n(127).Error);
  },
  function (e, t) {
    (t.locatorType = {
      CSS_SELECTOR: "css_selector",
      JAVASCRIPT: "javascript",
      URL_REGEX: "url_regex",
    }),
      (t.valueType = {
        STRING: "string",
        NUMBER: "number",
        CURRENCY: "currency",
      }),
      (t.nodeNames = { INPUT: "INPUT", SELECT: "SELECT" });
  },
  function (e, t, n) {
    var i = n(76).create;
    t.Error = i("TagError");
  },
  function (e, t) {},
  function (e, t, n) {
    var i = n(16);
    i.register("env/jquery", n(130));
  },
  function (e, t, n) {
    n(40);
    e.exports = n(131);
  },
  function (e, t, n) {
    var i, r;
    /** @license
     * jQuery JavaScript Library v1.11.3 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-offset,-dimensions
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2016-02-23T17:34Z
     */
    !(function (t, n) {
      "object" == typeof e && "object" == typeof e.exports
        ? (e.exports = t.document
            ? n(t, !0)
            : function (e) {
                if (!e.document)
                  throw new Error("jQuery requires a window with a document");
                return n(e);
              })
        : n(t);
    })("undefined" != typeof window ? window : this, function (n, a) {
      function o(e) {
        var t = "length" in e && e.length,
          n = q.type(e);
        return (
          "function" !== n &&
          !q.isWindow(e) &&
          (!(1 !== e.nodeType || !t) ||
            "array" === n ||
            0 === t ||
            ("number" == typeof t && t > 0 && t - 1 in e))
        );
      }
      function s(e, t, n) {
        if (q.isFunction(t))
          return q.grep(e, function (e, i) {
            return !!t.call(e, i, e) !== n;
          });
        if (t.nodeType)
          return q.grep(e, function (e) {
            return (e === t) !== n;
          });
        if ("string" == typeof t) {
          if (te.test(t)) return q.filter(t, e, n);
          t = q.filter(t, e);
        }
        return q.grep(e, function (e) {
          return q.inArray(e, t) >= 0 !== n;
        });
      }
      function u(e, t) {
        do e = e[t];
        while (e && 1 !== e.nodeType);
        return e;
      }
      function c(e) {
        var t = (ce[e] = {});
        return (
          q.each(e.match(ue) || [], function (e, n) {
            t[n] = !0;
          }),
          t
        );
      }
      function l() {
        ie.addEventListener
          ? (ie.removeEventListener("DOMContentLoaded", d, !1),
            n.removeEventListener("load", d, !1))
          : (ie.detachEvent("onreadystatechange", d),
            n.detachEvent("onload", d));
      }
      function d() {
        (ie.addEventListener ||
          "load" === event.type ||
          "complete" === ie.readyState) &&
          (l(), q.ready());
      }
      function f(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
          var i = "data-" + t.replace(he, "-$1").toLowerCase();
          if (((n = e.getAttribute(i)), "string" == typeof n)) {
            try {
              n =
                "true" === n ||
                ("false" !== n &&
                  ("null" === n
                    ? null
                    : +n + "" === n
                    ? +n
                    : pe.test(n)
                    ? q.parseJSON(n)
                    : n));
            } catch (e) {}
            q.data(e, t, n);
          } else n = void 0;
        }
        return n;
      }
      function p(e) {
        var t;
        for (t in e)
          if (("data" !== t || !q.isEmptyObject(e[t])) && "toJSON" !== t)
            return !1;
        return !0;
      }
      function h(e, t, n, i) {
        if (q.acceptData(e)) {
          var r,
            a,
            o = q.expando,
            s = e.nodeType,
            u = s ? q.cache : e,
            c = s ? e[o] : e[o] && o;
          if (
            (c && u[c] && (i || u[c].data)) ||
            void 0 !== n ||
            "string" != typeof t
          )
            return (
              c || (c = s ? (e[o] = F.pop() || q.guid++) : o),
              u[c] || (u[c] = s ? {} : { toJSON: q.noop }),
              ("object" != typeof t && "function" != typeof t) ||
                (i
                  ? (u[c] = q.extend(u[c], t))
                  : (u[c].data = q.extend(u[c].data, t))),
              (a = u[c]),
              i || (a.data || (a.data = {}), (a = a.data)),
              void 0 !== n && (a[q.camelCase(t)] = n),
              "string" == typeof t
                ? ((r = a[t]), null == r && (r = a[q.camelCase(t)]))
                : (r = a),
              r
            );
        }
      }
      function g(e, t, n) {
        if (q.acceptData(e)) {
          var i,
            r,
            a = e.nodeType,
            o = a ? q.cache : e,
            s = a ? e[q.expando] : q.expando;
          if (o[s]) {
            if (t && (i = n ? o[s] : o[s].data)) {
              q.isArray(t)
                ? (t = t.concat(q.map(t, q.camelCase)))
                : t in i
                ? (t = [t])
                : ((t = q.camelCase(t)), (t = t in i ? [t] : t.split(" "))),
                (r = t.length);
              for (; r--; ) delete i[t[r]];
              if (n ? !p(i) : !q.isEmptyObject(i)) return;
            }
            (n || (delete o[s].data, p(o[s]))) &&
              (a
                ? q.cleanData([e], !0)
                : K.deleteExpando || o != o.window
                ? delete o[s]
                : (o[s] = null));
          }
        }
      }
      function v() {
        return !0;
      }
      function _() {
        return !1;
      }
      function m() {
        try {
          return ie.activeElement;
        } catch (e) {}
      }
      function E(e) {
        var t = be.split("|"),
          n = e.createDocumentFragment();
        if (n.createElement) for (; t.length; ) n.createElement(t.pop());
        return n;
      }
      function y(e, t) {
        var n,
          i,
          r = 0,
          a =
            typeof e.getElementsByTagName !== fe
              ? e.getElementsByTagName(t || "*")
              : typeof e.querySelectorAll !== fe
              ? e.querySelectorAll(t || "*")
              : void 0;
        if (!a)
          for (a = [], n = e.childNodes || e; null != (i = n[r]); r++)
            !t || q.nodeName(i, t) ? a.push(i) : q.merge(a, y(i, t));
        return void 0 === t || (t && q.nodeName(e, t)) ? q.merge([e], a) : a;
      }
      function I(e) {
        Ee.test(e.type) && (e.defaultChecked = e.checked);
      }
      function T(e, t) {
        return q.nodeName(e, "table") &&
          q.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr")
          ? e.getElementsByTagName("tbody")[0] ||
              e.appendChild(e.ownerDocument.createElement("tbody"))
          : e;
      }
      function S(e) {
        return (e.type = (null !== q.find.attr(e, "type")) + "/" + e.type), e;
      }
      function A(e) {
        var t = Ve.exec(e.type);
        return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
      }
      function b(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++)
          q._data(n, "globalEval", !t || q._data(t[i], "globalEval"));
      }
      function w(e, t) {
        if (1 === t.nodeType && q.hasData(e)) {
          var n,
            i,
            r,
            a = q._data(e),
            o = q._data(t, a),
            s = a.events;
          if (s) {
            delete o.handle, (o.events = {});
            for (n in s)
              for (i = 0, r = s[n].length; i < r; i++)
                q.event.add(t, n, s[n][i]);
          }
          o.data && (o.data = q.extend({}, o.data));
        }
      }
      function D(e, t) {
        var n, i, r;
        if (1 === t.nodeType) {
          if (
            ((n = t.nodeName.toLowerCase()), !K.noCloneEvent && t[q.expando])
          ) {
            r = q._data(t);
            for (i in r.events) q.removeEvent(t, i, r.handle);
            t.removeAttribute(q.expando);
          }
          "script" === n && t.text !== e.text
            ? ((S(t).text = e.text), A(t))
            : "object" === n
            ? (t.parentNode && (t.outerHTML = e.outerHTML),
              K.html5Clone &&
                e.innerHTML &&
                !q.trim(t.innerHTML) &&
                (t.innerHTML = e.innerHTML))
            : "input" === n && Ee.test(e.type)
            ? ((t.defaultChecked = t.checked = e.checked),
              t.value !== e.value && (t.value = e.value))
            : "option" === n
            ? (t.defaultSelected = t.selected = e.defaultSelected)
            : ("input" !== n && "textarea" !== n) ||
              (t.defaultValue = e.defaultValue);
        }
      }
      function R(e, t) {
        var i,
          r = q(t.createElement(e)).appendTo(t.body),
          a =
            n.getDefaultComputedStyle && (i = n.getDefaultComputedStyle(r[0]))
              ? i.display
              : q.css(r[0], "display");
        return r.detach(), a;
      }
      function C(e) {
        var t = ie,
          n = ze[e];
        return (
          n ||
            ((n = R(e, t)),
            ("none" !== n && n) ||
              ((Be = (
                Be || q("<iframe frameborder='0' width='0' height='0'/>")
              ).appendTo(t.documentElement)),
              (t = (Be[0].contentWindow || Be[0].contentDocument).document),
              t.write(),
              t.close(),
              (n = R(e, t)),
              Be.detach()),
            (ze[e] = n)),
          n
        );
      }
      function N(e, t) {
        return {
          get: function () {
            var n = e();
            if (null != n)
              return n
                ? void delete this.get
                : (this.get = t).apply(this, arguments);
          },
        };
      }
      function O(e, t) {
        if (t in e) return t;
        for (
          var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = tt.length;
          r--;

        )
          if (((t = tt[r] + n), t in e)) return t;
        return i;
      }
      function x(e, t) {
        for (var n, i, r, a = [], o = 0, s = e.length; o < s; o++)
          (i = e[o]),
            i.style &&
              ((a[o] = q._data(i, "olddisplay")),
              (n = i.style.display),
              t
                ? (a[o] || "none" !== n || (i.style.display = ""),
                  "" === i.style.display &&
                    _e(i) &&
                    (a[o] = q._data(i, "olddisplay", C(i.nodeName))))
                : ((r = _e(i)),
                  ((n && "none" !== n) || !r) &&
                    q._data(i, "olddisplay", r ? n : q.css(i, "display"))));
        for (o = 0; o < s; o++)
          (i = e[o]),
            i.style &&
              ((t && "none" !== i.style.display && "" !== i.style.display) ||
                (i.style.display = t ? a[o] || "" : "none"));
        return e;
      }
      function L(e, t, n) {
        var i = Qe.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
      }
      function P(e, t, n, i, r) {
        for (
          var a = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
            o = 0;
          a < 4;
          a += 2
        )
          "margin" === n && (o += q.css(e, n + ve[a], !0, r)),
            i
              ? ("content" === n && (o -= q.css(e, "padding" + ve[a], !0, r)),
                "margin" !== n &&
                  (o -= q.css(e, "border" + ve[a] + "Width", !0, r)))
              : ((o += q.css(e, "padding" + ve[a], !0, r)),
                "padding" !== n &&
                  (o += q.css(e, "border" + ve[a] + "Width", !0, r)));
        return o;
      }
      function k(e, t, n) {
        var i = !0,
          r = "width" === t ? e.offsetWidth : e.offsetHeight,
          a = je(e),
          o = K.boxSizing && "border-box" === q.css(e, "boxSizing", !1, a);
        if (r <= 0 || null == r) {
          if (
            ((r = He(e, t, a)),
            (r < 0 || null == r) && (r = e.style[t]),
            Ye.test(r))
          )
            return r;
          (i = o && (K.boxSizingReliable() || r === e.style[t])),
            (r = parseFloat(r) || 0);
        }
        return r + P(e, t, n || (o ? "border" : "content"), i, a) + "px";
      }
      function V(e, t, n, i) {
        var r;
        if (q.isArray(t))
          q.each(t, function (t, r) {
            n || pt.test(e)
              ? i(e, r)
              : V(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i);
          });
        else if (n || "object" !== q.type(t)) i(e, t);
        else for (r in t) V(e + "[" + r + "]", t[r], n, i);
      }
      var F = [],
        M = F.slice,
        U = F.concat,
        G = F.push,
        B = F.indexOf,
        j = {},
        H = j.toString,
        z = j.hasOwnProperty,
        K = {},
        Y =
          "1.11.3 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-offset,-dimensions",
        q = function (e, t) {
          return new q.fn.init(e, t);
        },
        W = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        X = /^-ms-/,
        $ = /-([\da-z])/gi,
        Q = function (e, t) {
          return t.toUpperCase();
        };
      (q.fn = q.prototype = {
        jquery: Y,
        constructor: q,
        selector: "",
        length: 0,
        toArray: function () {
          return M.call(this);
        },
        get: function (e) {
          return null != e
            ? e < 0
              ? this[e + this.length]
              : this[e]
            : M.call(this);
        },
        pushStack: function (e) {
          var t = q.merge(this.constructor(), e);
          return (t.prevObject = this), (t.context = this.context), t;
        },
        each: function (e, t) {
          return q.each(this, e, t);
        },
        map: function (e) {
          return this.pushStack(
            q.map(this, function (t, n) {
              return e.call(t, n, t);
            })
          );
        },
        slice: function () {
          return this.pushStack(M.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (e) {
          var t = this.length,
            n = +e + (e < 0 ? t : 0);
          return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor(null);
        },
        push: G,
        sort: F.sort,
        splice: F.splice,
      }),
        (q.extend = q.fn.extend = function () {
          var e,
            t,
            n,
            i,
            r,
            a,
            o = arguments[0] || {},
            s = 1,
            u = arguments.length,
            c = !1;
          for (
            "boolean" == typeof o && ((c = o), (o = arguments[s] || {}), s++),
              "object" == typeof o || q.isFunction(o) || (o = {}),
              s === u && ((o = this), s--);
            s < u;
            s++
          )
            if (null != (r = arguments[s]))
              for (i in r)
                (e = o[i]),
                  (n = r[i]),
                  o !== n &&
                    (c && n && (q.isPlainObject(n) || (t = q.isArray(n)))
                      ? (t
                          ? ((t = !1), (a = e && q.isArray(e) ? e : []))
                          : (a = e && q.isPlainObject(e) ? e : {}),
                        (o[i] = q.extend(c, a, n)))
                      : void 0 !== n && (o[i] = n));
          return o;
        }),
        q.extend({
          expando: "jQuery" + (Y + Math.random()).replace(/\D/g, ""),
          isReady: !0,
          error: function (e) {
            throw new Error(e);
          },
          noop: function () {},
          isFunction: function (e) {
            return "function" === q.type(e);
          },
          isArray:
            Array.isArray ||
            function (e) {
              return "array" === q.type(e);
            },
          isWindow: function (e) {
            return null != e && e == e.window;
          },
          isNumeric: function (e) {
            return !q.isArray(e) && e - parseFloat(e) + 1 >= 0;
          },
          isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0;
          },
          isPlainObject: function (e) {
            var t;
            if (!e || "object" !== q.type(e) || e.nodeType || q.isWindow(e))
              return !1;
            try {
              if (
                e.constructor &&
                !z.call(e, "constructor") &&
                !z.call(e.constructor.prototype, "isPrototypeOf")
              )
                return !1;
            } catch (e) {
              return !1;
            }
            if (K.ownLast) for (t in e) return z.call(e, t);
            for (t in e);
            return void 0 === t || z.call(e, t);
          },
          type: function (e) {
            return null == e
              ? e + ""
              : "object" == typeof e || "function" == typeof e
              ? j[H.call(e)] || "object"
              : typeof e;
          },
          globalEval: function (e) {
            e &&
              q.trim(e) &&
              (
                n.execScript ||
                function (e) {
                  n["eval"].call(n, e);
                }
              )(e);
          },
          camelCase: function (e) {
            return e.replace(X, "ms-").replace($, Q);
          },
          nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
          },
          each: function (e, t, n) {
            var i,
              r = 0,
              a = e.length,
              s = o(e);
            if (n) {
              if (s) for (; r < a && ((i = t.apply(e[r], n)), i !== !1); r++);
              else for (r in e) if (((i = t.apply(e[r], n)), i === !1)) break;
            } else if (s)
              for (; r < a && ((i = t.call(e[r], r, e[r])), i !== !1); r++);
            else
              for (r in e) if (((i = t.call(e[r], r, e[r])), i === !1)) break;
            return e;
          },
          trim: function (e) {
            return null == e ? "" : (e + "").replace(W, "");
          },
          makeArray: function (e, t) {
            var n = t || [];
            return (
              null != e &&
                (o(Object(e))
                  ? q.merge(n, "string" == typeof e ? [e] : e)
                  : G.call(n, e)),
              n
            );
          },
          inArray: function (e, t, n) {
            var i;
            if (t) {
              if (B) return B.call(t, e, n);
              for (
                i = t.length, n = n ? (n < 0 ? Math.max(0, i + n) : n) : 0;
                n < i;
                n++
              )
                if (n in t && t[n] === e) return n;
            }
            return -1;
          },
          merge: function (e, t) {
            for (var n = +t.length, i = 0, r = e.length; i < n; )
              e[r++] = t[i++];
            if (n !== n) for (; void 0 !== t[i]; ) e[r++] = t[i++];
            return (e.length = r), e;
          },
          grep: function (e, t, n) {
            for (var i, r = [], a = 0, o = e.length, s = !n; a < o; a++)
              (i = !t(e[a], a)), i !== s && r.push(e[a]);
            return r;
          },
          map: function (e, t, n) {
            var i,
              r = 0,
              a = e.length,
              s = o(e),
              u = [];
            if (s)
              for (; r < a; r++) (i = t(e[r], r, n)), null != i && u.push(i);
            else for (r in e) (i = t(e[r], r, n)), null != i && u.push(i);
            return U.apply([], u);
          },
          guid: 1,
          proxy: function (e, t) {
            var n, i, r;
            if (
              ("string" == typeof t && ((r = e[t]), (t = e), (e = r)),
              q.isFunction(e))
            )
              return (
                (n = M.call(arguments, 2)),
                (i = function () {
                  return e.apply(t || this, n.concat(M.call(arguments)));
                }),
                (i.guid = e.guid = e.guid || q.guid++),
                i
              );
          },
          now: function () {
            return +new Date();
          },
          support: K,
        }),
        q.each(
          "Boolean Number String Function Array Date RegExp Object Error".split(
            " "
          ),
          function (e, t) {
            j["[object " + t + "]"] = t.toLowerCase();
          }
        );
      var J =
        /*!
         * Sizzle CSS Selector Engine v2.2.0-pre
         * http://sizzlejs.com/
         *
         * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-12-16
         */
        (function (e) {
          function t(e, t, n, i) {
            var r, a, o, s, u, c, d, p, h, g;
            if (
              ((t ? t.ownerDocument || t : G) !== x && O(t),
              (t = t || x),
              (n = n || []),
              (s = t.nodeType),
              "string" != typeof e || !e || (1 !== s && 9 !== s && 11 !== s))
            )
              return n;
            if (!i && P) {
              if (11 !== s && (r = me.exec(e)))
                if ((o = r[1])) {
                  if (9 === s) {
                    if (((a = t.getElementById(o)), !a || !a.parentNode))
                      return n;
                    if (a.id === o) return n.push(a), n;
                  } else if (
                    t.ownerDocument &&
                    (a = t.ownerDocument.getElementById(o)) &&
                    M(t, a) &&
                    a.id === o
                  )
                    return n.push(a), n;
                } else {
                  if (r[2]) return J.apply(n, t.getElementsByTagName(e)), n;
                  if ((o = r[3]) && I.getElementsByClassName)
                    return J.apply(n, t.getElementsByClassName(o)), n;
                }
              if (I.qsa && (!k || !k.test(e))) {
                if (
                  ((p = d = U),
                  (h = t),
                  (g = 1 !== s && e),
                  1 === s && "object" !== t.nodeName.toLowerCase())
                ) {
                  for (
                    c = b(e),
                      (d = t.getAttribute("id"))
                        ? (p = d.replace(ye, "\\$&"))
                        : t.setAttribute("id", p),
                      p = "[id='" + p + "'] ",
                      u = c.length;
                    u--;

                  )
                    c[u] = p + f(c[u]);
                  (h = (Ee.test(e) && l(t.parentNode)) || t), (g = c.join(","));
                }
                if (g)
                  try {
                    return J.apply(n, h.querySelectorAll(g)), n;
                  } catch (e) {
                  } finally {
                    d || t.removeAttribute("id");
                  }
              }
            }
            return D(e.replace(ue, "$1"), t, n, i);
          }
          function n() {
            function e(n, i) {
              return (
                t.push(n + " ") > T.cacheLength && delete e[t.shift()],
                (e[n + " "] = i)
              );
            }
            var t = [];
            return e;
          }
          function i(e) {
            return (e[U] = !0), e;
          }
          function r(e) {
            var t = x.createElement("div");
            try {
              return !!e(t);
            } catch (e) {
              return !1;
            } finally {
              t.parentNode && t.parentNode.removeChild(t), (t = null);
            }
          }
          function a(e, t) {
            for (var n = e.split("|"), i = e.length; i--; )
              T.attrHandle[n[i]] = t;
          }
          function o(e, t) {
            var n = t && e,
              i =
                n &&
                1 === e.nodeType &&
                1 === t.nodeType &&
                (~t.sourceIndex || q) - (~e.sourceIndex || q);
            if (i) return i;
            if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
            return e ? 1 : -1;
          }
          function s(e) {
            return function (t) {
              var n = t.nodeName.toLowerCase();
              return "input" === n && t.type === e;
            };
          }
          function u(e) {
            return function (t) {
              var n = t.nodeName.toLowerCase();
              return ("input" === n || "button" === n) && t.type === e;
            };
          }
          function c(e) {
            return i(function (t) {
              return (
                (t = +t),
                i(function (n, i) {
                  for (var r, a = e([], n.length, t), o = a.length; o--; )
                    n[(r = a[o])] && (n[r] = !(i[r] = n[r]));
                })
              );
            });
          }
          function l(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e;
          }
          function d() {}
          function f(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i;
          }
          function p(e, t, n) {
            var i = t.dir,
              r = n && "parentNode" === i,
              a = j++;
            return t.first
              ? function (t, n, a) {
                  for (; (t = t[i]); )
                    if (1 === t.nodeType || r) return e(t, n, a);
                }
              : function (t, n, o) {
                  var s,
                    u,
                    c = [B, a];
                  if (o) {
                    for (; (t = t[i]); )
                      if ((1 === t.nodeType || r) && e(t, n, o)) return !0;
                  } else
                    for (; (t = t[i]); )
                      if (1 === t.nodeType || r) {
                        if (
                          ((u = t[U] || (t[U] = {})),
                          (s = u[i]) && s[0] === B && s[1] === a)
                        )
                          return (c[2] = s[2]);
                        if (((u[i] = c), (c[2] = e(t, n, o)))) return !0;
                      }
                };
          }
          function h(e) {
            return e.length > 1
              ? function (t, n, i) {
                  for (var r = e.length; r--; ) if (!e[r](t, n, i)) return !1;
                  return !0;
                }
              : e[0];
          }
          function g(e, n, i) {
            for (var r = 0, a = n.length; r < a; r++) t(e, n[r], i);
            return i;
          }
          function v(e, t, n, i, r) {
            for (var a, o = [], s = 0, u = e.length, c = null != t; s < u; s++)
              (a = e[s]) && ((n && !n(a, i, r)) || (o.push(a), c && t.push(s)));
            return o;
          }
          function _(e, t, n, r, a, o) {
            return (
              r && !r[U] && (r = _(r)),
              a && !a[U] && (a = _(a, o)),
              i(function (i, o, s, u) {
                var c,
                  l,
                  d,
                  f = [],
                  p = [],
                  h = o.length,
                  _ = i || g(t || "*", s.nodeType ? [s] : s, []),
                  m = !e || (!i && t) ? _ : v(_, f, e, s, u),
                  E = n ? (a || (i ? e : h || r) ? [] : o) : m;
                if ((n && n(m, E, s, u), r))
                  for (c = v(E, p), r(c, [], s, u), l = c.length; l--; )
                    (d = c[l]) && (E[p[l]] = !(m[p[l]] = d));
                if (i) {
                  if (a || e) {
                    if (a) {
                      for (c = [], l = E.length; l--; )
                        (d = E[l]) && c.push((m[l] = d));
                      a(null, (E = []), c, u);
                    }
                    for (l = E.length; l--; )
                      (d = E[l]) &&
                        (c = a ? ee(i, d) : f[l]) > -1 &&
                        (i[c] = !(o[c] = d));
                  }
                } else (E = v(E === o ? E.splice(h, E.length) : E)), a ? a(null, o, E, u) : J.apply(o, E);
              })
            );
          }
          function m(e) {
            for (
              var t,
                n,
                i,
                r = e.length,
                a = T.relative[e[0].type],
                o = a || T.relative[" "],
                s = a ? 1 : 0,
                u = p(
                  function (e) {
                    return e === t;
                  },
                  o,
                  !0
                ),
                c = p(
                  function (e) {
                    return ee(t, e) > -1;
                  },
                  o,
                  !0
                ),
                l = [
                  function (e, n, i) {
                    var r =
                      (!a && (i || n !== R)) ||
                      ((t = n).nodeType ? u(e, n, i) : c(e, n, i));
                    return (t = null), r;
                  },
                ];
              s < r;
              s++
            )
              if ((n = T.relative[e[s].type])) l = [p(h(l), n)];
              else {
                if (
                  ((n = T.filter[e[s].type].apply(null, e[s].matches)), n[U])
                ) {
                  for (i = ++s; i < r && !T.relative[e[i].type]; i++);
                  return _(
                    s > 1 && h(l),
                    s > 1 &&
                      f(
                        e
                          .slice(0, s - 1)
                          .concat({ value: " " === e[s - 2].type ? "*" : "" })
                      ).replace(ue, "$1"),
                    n,
                    s < i && m(e.slice(s, i)),
                    i < r && m((e = e.slice(i))),
                    i < r && f(e)
                  );
                }
                l.push(n);
              }
            return h(l);
          }
          function E(e, n) {
            var r = n.length > 0,
              a = e.length > 0,
              o = function (i, o, s, u, c) {
                var l,
                  d,
                  f,
                  p = 0,
                  h = "0",
                  g = i && [],
                  _ = [],
                  m = R,
                  E = i || (a && T.find["TAG"]("*", c)),
                  y = (B += null == m ? 1 : Math.random() || 0.1),
                  I = E.length;
                for (
                  c && (R = o !== x && o);
                  h !== I && null != (l = E[h]);
                  h++
                ) {
                  if (a && l) {
                    for (d = 0; (f = e[d++]); )
                      if (f(l, o, s)) {
                        u.push(l);
                        break;
                      }
                    c && (B = y);
                  }
                  r && ((l = !f && l) && p--, i && g.push(l));
                }
                if (((p += h), r && h !== p)) {
                  for (d = 0; (f = n[d++]); ) f(g, _, o, s);
                  if (i) {
                    if (p > 0) for (; h--; ) g[h] || _[h] || (_[h] = $.call(u));
                    _ = v(_);
                  }
                  J.apply(u, _),
                    c &&
                      !i &&
                      _.length > 0 &&
                      p + n.length > 1 &&
                      t.uniqueSort(u);
                }
                return c && ((B = y), (R = m)), g;
              };
            return r ? i(o) : o;
          }
          var y,
            I,
            T,
            S,
            A,
            b,
            w,
            D,
            R,
            C,
            N,
            O,
            x,
            L,
            P,
            k,
            V,
            F,
            M,
            U = "sizzle" + 1 * new Date(),
            G = e.document,
            B = 0,
            j = 0,
            H = n(),
            z = n(),
            K = n(),
            Y = function (e, t) {
              return e === t && (N = !0), 0;
            },
            q = 1 << 31,
            W = {}.hasOwnProperty,
            X = [],
            $ = X.pop,
            Q = X.push,
            J = X.push,
            Z = X.slice,
            ee = function (e, t) {
              for (var n = 0, i = e.length; n < i; n++)
                if (e[n] === t) return n;
              return -1;
            },
            te =
              "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            re = ie.replace("w", "w#"),
            ae =
              "\\[" +
              ne +
              "*(" +
              ie +
              ")(?:" +
              ne +
              "*([*^$|!~]?=)" +
              ne +
              "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
              re +
              "))|)" +
              ne +
              "*\\]",
            oe =
              ":(" +
              ie +
              ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
              ae +
              ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            ue = new RegExp(
              "^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$",
              "g"
            ),
            ce = new RegExp("^" + ne + "*," + ne + "*"),
            le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            fe = new RegExp(oe),
            pe = new RegExp("^" + re + "$"),
            he = {
              ID: new RegExp("^#(" + ie + ")"),
              CLASS: new RegExp("^\\.(" + ie + ")"),
              TAG: new RegExp("^(" + ie.replace("w", "w*") + ")"),
              ATTR: new RegExp("^" + ae),
              PSEUDO: new RegExp("^" + oe),
              CHILD: new RegExp(
                "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                  ne +
                  "*(even|odd|(([+-]|)(\\d*)n|)" +
                  ne +
                  "*(?:([+-]|)" +
                  ne +
                  "*(\\d+)|))" +
                  ne +
                  "*\\)|)",
                "i"
              ),
              bool: new RegExp("^(?:" + te + ")$", "i"),
              needsContext: new RegExp(
                "^" +
                  ne +
                  "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                  ne +
                  "*((?:-\\d)?\\d*)" +
                  ne +
                  "*\\)|)(?=[^-]|$)",
                "i"
              ),
            },
            ge = /^(?:input|select|textarea|button)$/i,
            ve = /^h\d$/i,
            _e = /^[^{]+\{\s*\[native \w/,
            me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Ee = /[+~]/,
            ye = /'|\\/g,
            Ie = new RegExp(
              "\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)",
              "ig"
            ),
            Te = function (e, t, n) {
              var i = "0x" + t - 65536;
              return i !== i || n
                ? t
                : i < 0
                ? String.fromCharCode(i + 65536)
                : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
            },
            Se = function () {
              O();
            };
          try {
            J.apply((X = Z.call(G.childNodes)), G.childNodes),
              X[G.childNodes.length].nodeType;
          } catch (e) {
            J = {
              apply: X.length
                ? function (e, t) {
                    Q.apply(e, Z.call(t));
                  }
                : function (e, t) {
                    for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                    e.length = n - 1;
                  },
            };
          }
          (I = t.support = {}),
            (A = t.isXML = function (e) {
              var t = e && (e.ownerDocument || e).documentElement;
              return !!t && "HTML" !== t.nodeName;
            }),
            (O = t.setDocument = function (e) {
              var t,
                n,
                i = e ? e.ownerDocument || e : G;
              return i !== x && 9 === i.nodeType && i.documentElement
                ? ((x = i),
                  (L = i.documentElement),
                  (n = i.defaultView),
                  n &&
                    n !== n.top &&
                    (n.addEventListener
                      ? n.addEventListener("unload", Se, !1)
                      : n.attachEvent && n.attachEvent("onunload", Se)),
                  (P = !A(i)),
                  (I.attributes = r(function (e) {
                    return (e.className = "i"), !e.getAttribute("className");
                  })),
                  (I.getElementsByTagName = r(function (e) {
                    return (
                      e.appendChild(i.createComment("")),
                      !e.getElementsByTagName("*").length
                    );
                  })),
                  (I.getElementsByClassName = _e.test(
                    i.getElementsByClassName
                  )),
                  (I.getById = r(function (e) {
                    return (
                      (L.appendChild(e).id = U),
                      !i.getElementsByName || !i.getElementsByName(U).length
                    );
                  })),
                  I.getById
                    ? ((T.find["ID"] = function (e, t) {
                        if ("undefined" != typeof t.getElementById && P) {
                          var n = t.getElementById(e);
                          return n && n.parentNode ? [n] : [];
                        }
                      }),
                      (T.filter["ID"] = function (e) {
                        var t = e.replace(Ie, Te);
                        return function (e) {
                          return e.getAttribute("id") === t;
                        };
                      }))
                    : (delete T.find["ID"],
                      (T.filter["ID"] = function (e) {
                        var t = e.replace(Ie, Te);
                        return function (e) {
                          var n =
                            "undefined" != typeof e.getAttributeNode &&
                            e.getAttributeNode("id");
                          return n && n.value === t;
                        };
                      })),
                  (T.find["TAG"] = I.getElementsByTagName
                    ? function (e, t) {
                        return "undefined" != typeof t.getElementsByTagName
                          ? t.getElementsByTagName(e)
                          : I.qsa
                          ? t.querySelectorAll(e)
                          : void 0;
                      }
                    : function (e, t) {
                        var n,
                          i = [],
                          r = 0,
                          a = t.getElementsByTagName(e);
                        if ("*" === e) {
                          for (; (n = a[r++]); ) 1 === n.nodeType && i.push(n);
                          return i;
                        }
                        return a;
                      }),
                  (T.find["CLASS"] =
                    I.getElementsByClassName &&
                    function (e, t) {
                      if (P) return t.getElementsByClassName(e);
                    }),
                  (V = []),
                  (k = []),
                  (I.qsa = _e.test(i.querySelectorAll)) &&
                    (r(function (e) {
                      (L.appendChild(e).innerHTML =
                        "<a id='" +
                        U +
                        "'></a><select id='" +
                        U +
                        "-\f]' msallowcapture=''><option selected=''></option></select>"),
                        e.querySelectorAll("[msallowcapture^='']").length &&
                          k.push("[*^$]=" + ne + "*(?:''|\"\")"),
                        e.querySelectorAll("[selected]").length ||
                          k.push("\\[" + ne + "*(?:value|" + te + ")"),
                        e.querySelectorAll("[id~=" + U + "-]").length ||
                          k.push("~="),
                        e.querySelectorAll(":checked").length ||
                          k.push(":checked"),
                        e.querySelectorAll("a#" + U + "+*").length ||
                          k.push(".#.+[+~]");
                    }),
                    r(function (e) {
                      var t = i.createElement("input");
                      t.setAttribute("type", "hidden"),
                        e.appendChild(t).setAttribute("name", "D"),
                        e.querySelectorAll("[name=d]").length &&
                          k.push("name" + ne + "*[*^$|!~]?="),
                        e.querySelectorAll(":enabled").length ||
                          k.push(":enabled", ":disabled"),
                        e.querySelectorAll("*,:x"),
                        k.push(",.*:");
                    })),
                  (I.matchesSelector = _e.test(
                    (F =
                      L.matches ||
                      L.webkitMatchesSelector ||
                      L.mozMatchesSelector ||
                      L.oMatchesSelector ||
                      L.msMatchesSelector)
                  )) &&
                    r(function (e) {
                      (I.disconnectedMatch = F.call(e, "div")),
                        F.call(e, "[s!='']:x"),
                        V.push("!=", oe);
                    }),
                  (k = k.length && new RegExp(k.join("|"))),
                  (V = V.length && new RegExp(V.join("|"))),
                  (t = _e.test(L.compareDocumentPosition)),
                  (M =
                    t || _e.test(L.contains)
                      ? function (e, t) {
                          var n = 9 === e.nodeType ? e.documentElement : e,
                            i = t && t.parentNode;
                          return (
                            e === i ||
                            !(
                              !i ||
                              1 !== i.nodeType ||
                              !(n.contains
                                ? n.contains(i)
                                : e.compareDocumentPosition &&
                                  16 & e.compareDocumentPosition(i))
                            )
                          );
                        }
                      : function (e, t) {
                          if (t)
                            for (; (t = t.parentNode); ) if (t === e) return !0;
                          return !1;
                        }),
                  (Y = t
                    ? function (e, t) {
                        if (e === t) return (N = !0), 0;
                        var n =
                          !e.compareDocumentPosition -
                          !t.compareDocumentPosition;
                        return n
                          ? n
                          : ((n =
                              (e.ownerDocument || e) === (t.ownerDocument || t)
                                ? e.compareDocumentPosition(t)
                                : 1),
                            1 & n ||
                            (!I.sortDetached &&
                              t.compareDocumentPosition(e) === n)
                              ? e === i || (e.ownerDocument === G && M(G, e))
                                ? -1
                                : t === i || (t.ownerDocument === G && M(G, t))
                                ? 1
                                : C
                                ? ee(C, e) - ee(C, t)
                                : 0
                              : 4 & n
                              ? -1
                              : 1);
                      }
                    : function (e, t) {
                        if (e === t) return (N = !0), 0;
                        var n,
                          r = 0,
                          a = e.parentNode,
                          s = t.parentNode,
                          u = [e],
                          c = [t];
                        if (!a || !s)
                          return e === i
                            ? -1
                            : t === i
                            ? 1
                            : a
                            ? -1
                            : s
                            ? 1
                            : C
                            ? ee(C, e) - ee(C, t)
                            : 0;
                        if (a === s) return o(e, t);
                        for (n = e; (n = n.parentNode); ) u.unshift(n);
                        for (n = t; (n = n.parentNode); ) c.unshift(n);
                        for (; u[r] === c[r]; ) r++;
                        return r
                          ? o(u[r], c[r])
                          : u[r] === G
                          ? -1
                          : c[r] === G
                          ? 1
                          : 0;
                      }),
                  i)
                : x;
            }),
            (t.matches = function (e, n) {
              return t(e, null, null, n);
            }),
            (t.matchesSelector = function (e, n) {
              if (
                ((e.ownerDocument || e) !== x && O(e),
                (n = n.replace(de, "='$1']")),
                I.matchesSelector &&
                  P &&
                  (!V || !V.test(n)) &&
                  (!k || !k.test(n)))
              )
                try {
                  var i = F.call(e, n);
                  if (
                    i ||
                    I.disconnectedMatch ||
                    (e.document && 11 !== e.document.nodeType)
                  )
                    return i;
                } catch (e) {}
              return t(n, x, null, [e]).length > 0;
            }),
            (t.contains = function (e, t) {
              return (e.ownerDocument || e) !== x && O(e), M(e, t);
            }),
            (t.attr = function (e, t) {
              (e.ownerDocument || e) !== x && O(e);
              var n = T.attrHandle[t.toLowerCase()],
                i =
                  n && W.call(T.attrHandle, t.toLowerCase())
                    ? n(e, t, !P)
                    : void 0;
              return void 0 !== i
                ? i
                : I.attributes || !P
                ? e.getAttribute(t)
                : (i = e.getAttributeNode(t)) && i.specified
                ? i.value
                : null;
            }),
            (t.error = function (e) {
              throw new Error("Syntax error, unrecognized expression: " + e);
            }),
            (t.uniqueSort = function (e) {
              var t,
                n = [],
                i = 0,
                r = 0;
              if (
                ((N = !I.detectDuplicates),
                (C = !I.sortStable && e.slice(0)),
                e.sort(Y),
                N)
              ) {
                for (; (t = e[r++]); ) t === e[r] && (i = n.push(r));
                for (; i--; ) e.splice(n[i], 1);
              }
              return (C = null), e;
            }),
            (S = t.getText = function (e) {
              var t,
                n = "",
                i = 0,
                r = e.nodeType;
              if (r) {
                if (1 === r || 9 === r || 11 === r) {
                  if ("string" == typeof e.textContent) return e.textContent;
                  for (e = e.firstChild; e; e = e.nextSibling) n += S(e);
                } else if (3 === r || 4 === r) return e.nodeValue;
              } else for (; (t = e[i++]); ) n += S(t);
              return n;
            }),
            (T = t.selectors = {
              cacheLength: 50,
              createPseudo: i,
              match: he,
              attrHandle: {},
              find: {},
              relative: {
                ">": { dir: "parentNode", first: !0 },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: !0 },
                "~": { dir: "previousSibling" },
              },
              preFilter: {
                ATTR: function (e) {
                  return (
                    (e[1] = e[1].replace(Ie, Te)),
                    (e[3] = (e[3] || e[4] || e[5] || "").replace(Ie, Te)),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                  );
                },
                CHILD: function (e) {
                  return (
                    (e[1] = e[1].toLowerCase()),
                    "nth" === e[1].slice(0, 3)
                      ? (e[3] || t.error(e[0]),
                        (e[4] = +(e[4]
                          ? e[5] + (e[6] || 1)
                          : 2 * ("even" === e[3] || "odd" === e[3]))),
                        (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                      : e[3] && t.error(e[0]),
                    e
                  );
                },
                PSEUDO: function (e) {
                  var t,
                    n = !e[6] && e[2];
                  return he["CHILD"].test(e[0])
                    ? null
                    : (e[3]
                        ? (e[2] = e[4] || e[5] || "")
                        : n &&
                          fe.test(n) &&
                          (t = b(n, !0)) &&
                          (t = n.indexOf(")", n.length - t) - n.length) &&
                          ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                      e.slice(0, 3));
                },
              },
              filter: {
                TAG: function (e) {
                  var t = e.replace(Ie, Te).toLowerCase();
                  return "*" === e
                    ? function () {
                        return !0;
                      }
                    : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                      };
                },
                CLASS: function (e) {
                  var t = H[e + " "];
                  return (
                    t ||
                    ((t = new RegExp(
                      "(^|" + ne + ")" + e + "(" + ne + "|$)"
                    )) &&
                      H(e, function (e) {
                        return t.test(
                          ("string" == typeof e.className && e.className) ||
                            ("undefined" != typeof e.getAttribute &&
                              e.getAttribute("class")) ||
                            ""
                        );
                      }))
                  );
                },
                ATTR: function (e, n, i) {
                  return function (r) {
                    var a = t.attr(r, e);
                    return null == a
                      ? "!=" === n
                      : !n ||
                          ((a += ""),
                          "=" === n
                            ? a === i
                            : "!=" === n
                            ? a !== i
                            : "^=" === n
                            ? i && 0 === a.indexOf(i)
                            : "*=" === n
                            ? i && a.indexOf(i) > -1
                            : "$=" === n
                            ? i && a.slice(-i.length) === i
                            : "~=" === n
                            ? (" " + a.replace(se, " ") + " ").indexOf(i) > -1
                            : "|=" === n &&
                              (a === i ||
                                a.slice(0, i.length + 1) === i + "-"));
                  };
                },
                CHILD: function (e, t, n, i, r) {
                  var a = "nth" !== e.slice(0, 3),
                    o = "last" !== e.slice(-4),
                    s = "of-type" === t;
                  return 1 === i && 0 === r
                    ? function (e) {
                        return !!e.parentNode;
                      }
                    : function (t, n, u) {
                        var c,
                          l,
                          d,
                          f,
                          p,
                          h,
                          g = a !== o ? "nextSibling" : "previousSibling",
                          v = t.parentNode,
                          _ = s && t.nodeName.toLowerCase(),
                          m = !u && !s;
                        if (v) {
                          if (a) {
                            for (; g; ) {
                              for (d = t; (d = d[g]); )
                                if (
                                  s
                                    ? d.nodeName.toLowerCase() === _
                                    : 1 === d.nodeType
                                )
                                  return !1;
                              h = g = "only" === e && !h && "nextSibling";
                            }
                            return !0;
                          }
                          if (
                            ((h = [o ? v.firstChild : v.lastChild]), o && m)
                          ) {
                            for (
                              l = v[U] || (v[U] = {}),
                                c = l[e] || [],
                                p = c[0] === B && c[1],
                                f = c[0] === B && c[2],
                                d = p && v.childNodes[p];
                              (d =
                                (++p && d && d[g]) || (f = p = 0) || h.pop());

                            )
                              if (1 === d.nodeType && ++f && d === t) {
                                l[e] = [B, p, f];
                                break;
                              }
                          } else if (
                            m &&
                            (c = (t[U] || (t[U] = {}))[e]) &&
                            c[0] === B
                          )
                            f = c[1];
                          else
                            for (
                              ;
                              (d =
                                (++p && d && d[g]) || (f = p = 0) || h.pop()) &&
                              ((s
                                ? d.nodeName.toLowerCase() !== _
                                : 1 !== d.nodeType) ||
                                !++f ||
                                (m && ((d[U] || (d[U] = {}))[e] = [B, f]),
                                d !== t));

                            );
                          return (
                            (f -= r), f === i || (f % i === 0 && f / i >= 0)
                          );
                        }
                      };
                },
                PSEUDO: function (e, n) {
                  var r,
                    a =
                      T.pseudos[e] ||
                      T.setFilters[e.toLowerCase()] ||
                      t.error("unsupported pseudo: " + e);
                  return a[U]
                    ? a(n)
                    : a.length > 1
                    ? ((r = [e, e, "", n]),
                      T.setFilters.hasOwnProperty(e.toLowerCase())
                        ? i(function (e, t) {
                            for (var i, r = a(e, n), o = r.length; o--; )
                              (i = ee(e, r[o])), (e[i] = !(t[i] = r[o]));
                          })
                        : function (e) {
                            return a(e, 0, r);
                          })
                    : a;
                },
              },
              pseudos: {
                not: i(function (e) {
                  var t = [],
                    n = [],
                    r = w(e.replace(ue, "$1"));
                  return r[U]
                    ? i(function (e, t, n, i) {
                        for (var a, o = r(e, null, i, []), s = e.length; s--; )
                          (a = o[s]) && (e[s] = !(t[s] = a));
                      })
                    : function (e, i, a) {
                        return (
                          (t[0] = e), r(t, null, a, n), (t[0] = null), !n.pop()
                        );
                      };
                }),
                has: i(function (e) {
                  return function (n) {
                    return t(e, n).length > 0;
                  };
                }),
                contains: i(function (e) {
                  return (
                    (e = e.replace(Ie, Te)),
                    function (t) {
                      return (
                        (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                      );
                    }
                  );
                }),
                lang: i(function (e) {
                  return (
                    pe.test(e || "") || t.error("unsupported lang: " + e),
                    (e = e.replace(Ie, Te).toLowerCase()),
                    function (t) {
                      var n;
                      do
                        if (
                          (n = P
                            ? t.lang
                            : t.getAttribute("xml:lang") ||
                              t.getAttribute("lang"))
                        )
                          return (
                            (n = n.toLowerCase()),
                            n === e || 0 === n.indexOf(e + "-")
                          );
                      while ((t = t.parentNode) && 1 === t.nodeType);
                      return !1;
                    }
                  );
                }),
                target: function (t) {
                  var n = e.location && e.location.hash;
                  return n && n.slice(1) === t.id;
                },
                root: function (e) {
                  return e === L;
                },
                focus: function (e) {
                  return (
                    e === x.activeElement &&
                    (!x.hasFocus || x.hasFocus()) &&
                    !!(e.type || e.href || ~e.tabIndex)
                  );
                },
                enabled: function (e) {
                  return e.disabled === !1;
                },
                disabled: function (e) {
                  return e.disabled === !0;
                },
                checked: function (e) {
                  var t = e.nodeName.toLowerCase();
                  return (
                    ("input" === t && !!e.checked) ||
                    ("option" === t && !!e.selected)
                  );
                },
                selected: function (e) {
                  return (
                    e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                  );
                },
                empty: function (e) {
                  for (e = e.firstChild; e; e = e.nextSibling)
                    if (e.nodeType < 6) return !1;
                  return !0;
                },
                parent: function (e) {
                  return !T.pseudos["empty"](e);
                },
                header: function (e) {
                  return ve.test(e.nodeName);
                },
                input: function (e) {
                  return ge.test(e.nodeName);
                },
                button: function (e) {
                  var t = e.nodeName.toLowerCase();
                  return (
                    ("input" === t && "button" === e.type) || "button" === t
                  );
                },
                text: function (e) {
                  var t;
                  return (
                    "input" === e.nodeName.toLowerCase() &&
                    "text" === e.type &&
                    (null == (t = e.getAttribute("type")) ||
                      "text" === t.toLowerCase())
                  );
                },
                first: c(function () {
                  return [0];
                }),
                last: c(function (e, t) {
                  return [t - 1];
                }),
                eq: c(function (e, t, n) {
                  return [n < 0 ? n + t : n];
                }),
                even: c(function (e, t) {
                  for (var n = 0; n < t; n += 2) e.push(n);
                  return e;
                }),
                odd: c(function (e, t) {
                  for (var n = 1; n < t; n += 2) e.push(n);
                  return e;
                }),
                lt: c(function (e, t, n) {
                  for (var i = n < 0 ? n + t : n; --i >= 0; ) e.push(i);
                  return e;
                }),
                gt: c(function (e, t, n) {
                  for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                  return e;
                }),
              },
            }),
            (T.pseudos["nth"] = T.pseudos["eq"]);
          for (y in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0,
          })
            T.pseudos[y] = s(y);
          for (y in { submit: !0, reset: !0 }) T.pseudos[y] = u(y);
          return (
            (d.prototype = T.filters = T.pseudos),
            (T.setFilters = new d()),
            (b = t.tokenize = function (e, n) {
              var i,
                r,
                a,
                o,
                s,
                u,
                c,
                l = z[e + " "];
              if (l) return n ? 0 : l.slice(0);
              for (s = e, u = [], c = T.preFilter; s; ) {
                (i && !(r = ce.exec(s))) ||
                  (r && (s = s.slice(r[0].length) || s), u.push((a = []))),
                  (i = !1),
                  (r = le.exec(s)) &&
                    ((i = r.shift()),
                    a.push({ value: i, type: r[0].replace(ue, " ") }),
                    (s = s.slice(i.length)));
                for (o in T.filter)
                  !(r = he[o].exec(s)) ||
                    (c[o] && !(r = c[o](r))) ||
                    ((i = r.shift()),
                    a.push({ value: i, type: o, matches: r }),
                    (s = s.slice(i.length)));
                if (!i) break;
              }
              return n ? s.length : s ? t.error(e) : z(e, u).slice(0);
            }),
            (w = t.compile = function (e, t) {
              var n,
                i = [],
                r = [],
                a = K[e + " "];
              if (!a) {
                for (t || (t = b(e)), n = t.length; n--; )
                  (a = m(t[n])), a[U] ? i.push(a) : r.push(a);
                (a = K(e, E(r, i))), (a.selector = e);
              }
              return a;
            }),
            (D = t.select = function (e, t, n, i) {
              var r,
                a,
                o,
                s,
                u,
                c = "function" == typeof e && e,
                d = !i && b((e = c.selector || e));
              if (((n = n || []), 1 === d.length)) {
                if (
                  ((a = d[0] = d[0].slice(0)),
                  a.length > 2 &&
                    "ID" === (o = a[0]).type &&
                    I.getById &&
                    9 === t.nodeType &&
                    P &&
                    T.relative[a[1].type])
                ) {
                  if (
                    ((t = (T.find["ID"](o.matches[0].replace(Ie, Te), t) ||
                      [])[0]),
                    !t)
                  )
                    return n;
                  c && (t = t.parentNode),
                    (e = e.slice(a.shift().value.length));
                }
                for (
                  r = he["needsContext"].test(e) ? 0 : a.length;
                  r-- && ((o = a[r]), !T.relative[(s = o.type)]);

                )
                  if (
                    (u = T.find[s]) &&
                    (i = u(
                      o.matches[0].replace(Ie, Te),
                      (Ee.test(a[0].type) && l(t.parentNode)) || t
                    ))
                  ) {
                    if ((a.splice(r, 1), (e = i.length && f(a)), !e))
                      return J.apply(n, i), n;
                    break;
                  }
              }
              return (
                (c || w(e, d))(
                  i,
                  t,
                  !P,
                  n,
                  (Ee.test(e) && l(t.parentNode)) || t
                ),
                n
              );
            }),
            (I.sortStable = U.split("").sort(Y).join("") === U),
            (I.detectDuplicates = !!N),
            O(),
            (I.sortDetached = r(function (e) {
              return 1 & e.compareDocumentPosition(x.createElement("div"));
            })),
            r(function (e) {
              return (
                (e.innerHTML = "<a href='#'></a>"),
                "#" === e.firstChild.getAttribute("href")
              );
            }) ||
              a("type|href|height|width", function (e, t, n) {
                if (!n)
                  return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
              }),
            (I.attributes &&
              r(function (e) {
                return (
                  (e.innerHTML = "<input/>"),
                  e.firstChild.setAttribute("value", ""),
                  "" === e.firstChild.getAttribute("value")
                );
              })) ||
              a("value", function (e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase())
                  return e.defaultValue;
              }),
            r(function (e) {
              return null == e.getAttribute("disabled");
            }) ||
              a(te, function (e, t, n) {
                var i;
                if (!n)
                  return e[t] === !0
                    ? t.toLowerCase()
                    : (i = e.getAttributeNode(t)) && i.specified
                    ? i.value
                    : null;
              }),
            t
          );
        })(n);
      (q.find = J),
        (q.expr = J.selectors),
        (q.expr[":"] = q.expr.pseudos),
        (q.unique = J.uniqueSort),
        (q.text = J.getText),
        (q.isXMLDoc = J.isXML),
        (q.contains = J.contains);
      var Z = q.expr.match.needsContext,
        ee = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        te = /^.[^:#\[\.,]*$/;
      (q.filter = function (e, t, n) {
        var i = t[0];
        return (
          n && (e = ":not(" + e + ")"),
          1 === t.length && 1 === i.nodeType
            ? q.find.matchesSelector(i, e)
              ? [i]
              : []
            : q.find.matches(
                e,
                q.grep(t, function (e) {
                  return 1 === e.nodeType;
                })
              )
        );
      }),
        q.fn.extend({
          find: function (e) {
            var t,
              n = [],
              i = this,
              r = i.length;
            if ("string" != typeof e)
              return this.pushStack(
                q(e).filter(function () {
                  for (t = 0; t < r; t++) if (q.contains(i[t], this)) return !0;
                })
              );
            for (t = 0; t < r; t++) q.find(e, i[t], n);
            return (
              (n = this.pushStack(r > 1 ? q.unique(n) : n)),
              (n.selector = this.selector ? this.selector + " " + e : e),
              n
            );
          },
          filter: function (e) {
            return this.pushStack(s(this, e || [], !1));
          },
          not: function (e) {
            return this.pushStack(s(this, e || [], !0));
          },
          is: function (e) {
            return !!s(
              this,
              "string" == typeof e && Z.test(e) ? q(e) : e || [],
              !1
            ).length;
          },
        });
      var ne,
        ie = n.document,
        re = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ae = (q.fn.init = function (e, t) {
          var n, i;
          if (!e) return this;
          if ("string" == typeof e) {
            if (
              ((n =
                "<" === e.charAt(0) &&
                ">" === e.charAt(e.length - 1) &&
                e.length >= 3
                  ? [null, e, null]
                  : re.exec(e)),
              !n || (!n[1] && t))
            )
              return !t || t.jquery
                ? (t || ne).find(e)
                : this.constructor(t).find(e);
            if (n[1]) {
              if (
                ((t = t instanceof q ? t[0] : t),
                q.merge(
                  this,
                  q.parseHTML(
                    n[1],
                    t && t.nodeType ? t.ownerDocument || t : ie,
                    !0
                  )
                ),
                ee.test(n[1]) && q.isPlainObject(t))
              )
                for (n in t)
                  q.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
              return this;
            }
            if (((i = ie.getElementById(n[2])), i && i.parentNode)) {
              if (i.id !== n[2]) return ne.find(e);
              (this.length = 1), (this[0] = i);
            }
            return (this.context = ie), (this.selector = e), this;
          }
          return e.nodeType
            ? ((this.context = this[0] = e), (this.length = 1), this)
            : q.isFunction(e)
            ? "undefined" != typeof ne.ready
              ? ne.ready(e)
              : e(q)
            : (void 0 !== e.selector &&
                ((this.selector = e.selector), (this.context = e.context)),
              q.makeArray(e, this));
        });
      (ae.prototype = q.fn), (ne = q(ie));
      var oe = /^(?:parents|prev(?:Until|All))/,
        se = { children: !0, contents: !0, next: !0, prev: !0 };
      q.extend({
        dir: function (e, t, n) {
          for (
            var i = [], r = e[t];
            r &&
            9 !== r.nodeType &&
            (void 0 === n || 1 !== r.nodeType || !q(r).is(n));

          )
            1 === r.nodeType && i.push(r), (r = r[t]);
          return i;
        },
        sibling: function (e, t) {
          for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
          return n;
        },
      }),
        q.fn.extend({
          has: function (e) {
            var t,
              n = q(e, this),
              i = n.length;
            return this.filter(function () {
              for (t = 0; t < i; t++) if (q.contains(this, n[t])) return !0;
            });
          },
          closest: function (e, t) {
            for (
              var n,
                i = 0,
                r = this.length,
                a = [],
                o =
                  Z.test(e) || "string" != typeof e
                    ? q(e, t || this.context)
                    : 0;
              i < r;
              i++
            )
              for (n = this[i]; n && n !== t; n = n.parentNode)
                if (
                  n.nodeType < 11 &&
                  (o
                    ? o.index(n) > -1
                    : 1 === n.nodeType && q.find.matchesSelector(n, e))
                ) {
                  a.push(n);
                  break;
                }
            return this.pushStack(a.length > 1 ? q.unique(a) : a);
          },
          index: function (e) {
            return e
              ? "string" == typeof e
                ? q.inArray(this[0], q(e))
                : q.inArray(e.jquery ? e[0] : e, this)
              : this[0] && this[0].parentNode
              ? this.first().prevAll().length
              : -1;
          },
          add: function (e, t) {
            return this.pushStack(q.unique(q.merge(this.get(), q(e, t))));
          },
          addBack: function (e) {
            return this.add(
              null == e ? this.prevObject : this.prevObject.filter(e)
            );
          },
        }),
        q.each(
          {
            parent: function (e) {
              var t = e.parentNode;
              return t && 11 !== t.nodeType ? t : null;
            },
            parents: function (e) {
              return q.dir(e, "parentNode");
            },
            parentsUntil: function (e, t, n) {
              return q.dir(e, "parentNode", n);
            },
            next: function (e) {
              return u(e, "nextSibling");
            },
            prev: function (e) {
              return u(e, "previousSibling");
            },
            nextAll: function (e) {
              return q.dir(e, "nextSibling");
            },
            prevAll: function (e) {
              return q.dir(e, "previousSibling");
            },
            nextUntil: function (e, t, n) {
              return q.dir(e, "nextSibling", n);
            },
            prevUntil: function (e, t, n) {
              return q.dir(e, "previousSibling", n);
            },
            siblings: function (e) {
              return q.sibling((e.parentNode || {}).firstChild, e);
            },
            children: function (e) {
              return q.sibling(e.firstChild);
            },
            contents: function (e) {
              return q.nodeName(e, "iframe")
                ? e.contentDocument || e.contentWindow.document
                : q.merge([], e.childNodes);
            },
          },
          function (e, t) {
            q.fn[e] = function (n, i) {
              var r = q.map(this, t, n);
              return (
                "Until" !== e.slice(-5) && (i = n),
                i && "string" == typeof i && (r = q.filter(i, r)),
                this.length > 1 &&
                  (se[e] || (r = q.unique(r)), oe.test(e) && (r = r.reverse())),
                this.pushStack(r)
              );
            };
          }
        );
      var ue = /\S+/g,
        ce = {};
      (q.Callbacks = function (e) {
        e = "string" == typeof e ? ce[e] || c(e) : q.extend({}, e);
        var t,
          n,
          i,
          r,
          a,
          o,
          s = [],
          u = !e.once && [],
          l = function (c) {
            for (
              n = e.memory && c,
                i = !0,
                a = o || 0,
                o = 0,
                r = s.length,
                t = !0;
              s && a < r;
              a++
            )
              if (s[a].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break;
              }
            (t = !1),
              s && (u ? u.length && l(u.shift()) : n ? (s = []) : d.disable());
          },
          d = {
            add: function () {
              if (s) {
                var i = s.length;
                !(function t(n) {
                  q.each(n, function (n, i) {
                    var r = q.type(i);
                    "function" === r
                      ? (e.unique && d.has(i)) || s.push(i)
                      : i && i.length && "string" !== r && t(i);
                  });
                })(arguments),
                  t ? (r = s.length) : n && ((o = i), l(n));
              }
              return this;
            },
            remove: function () {
              return (
                s &&
                  q.each(arguments, function (e, n) {
                    for (var i; (i = q.inArray(n, s, i)) > -1; )
                      s.splice(i, 1), t && (i <= r && r--, i <= a && a--);
                  }),
                this
              );
            },
            has: function (e) {
              return e ? q.inArray(e, s) > -1 : !(!s || !s.length);
            },
            empty: function () {
              return (s = []), (r = 0), this;
            },
            disable: function () {
              return (s = u = n = void 0), this;
            },
            disabled: function () {
              return !s;
            },
            lock: function () {
              return (u = void 0), n || d.disable(), this;
            },
            locked: function () {
              return !u;
            },
            fireWith: function (e, n) {
              return (
                !s ||
                  (i && !u) ||
                  ((n = n || []),
                  (n = [e, n.slice ? n.slice() : n]),
                  t ? u.push(n) : l(n)),
                this
              );
            },
            fire: function () {
              return d.fireWith(this, arguments), this;
            },
            fired: function () {
              return !!i;
            },
          };
        return d;
      }),
        q.extend({
          Deferred: function (e) {
            var t = [
                ["resolve", "done", q.Callbacks("once memory"), "resolved"],
                ["reject", "fail", q.Callbacks("once memory"), "rejected"],
                ["notify", "progress", q.Callbacks("memory")],
              ],
              n = "pending",
              i = {
                state: function () {
                  return n;
                },
                always: function () {
                  return r.done(arguments).fail(arguments), this;
                },
                then: function () {
                  var e = arguments;
                  return q
                    .Deferred(function (n) {
                      q.each(t, function (t, a) {
                        var o = q.isFunction(e[t]) && e[t];
                        r[a[1]](function () {
                          var e = o && o.apply(this, arguments);
                          e && q.isFunction(e.promise)
                            ? e
                                .promise()
                                .done(n.resolve)
                                .fail(n.reject)
                                .progress(n.notify)
                            : n[a[0] + "With"](
                                this === i ? n.promise() : this,
                                o ? [e] : arguments
                              );
                        });
                      }),
                        (e = null);
                    })
                    .promise();
                },
                promise: function (e) {
                  return null != e ? q.extend(e, i) : i;
                },
              },
              r = {};
            return (
              (i.pipe = i.then),
              q.each(t, function (e, a) {
                var o = a[2],
                  s = a[3];
                (i[a[1]] = o.add),
                  s &&
                    o.add(
                      function () {
                        n = s;
                      },
                      t[1 ^ e][2].disable,
                      t[2][2].lock
                    ),
                  (r[a[0]] = function () {
                    return (
                      r[a[0] + "With"](this === r ? i : this, arguments), this
                    );
                  }),
                  (r[a[0] + "With"] = o.fireWith);
              }),
              i.promise(r),
              e && e.call(r, r),
              r
            );
          },
          when: function (e) {
            var t,
              n,
              i,
              r = 0,
              a = M.call(arguments),
              o = a.length,
              s = 1 !== o || (e && q.isFunction(e.promise)) ? o : 0,
              u = 1 === s ? e : q.Deferred(),
              c = function (e, n, i) {
                return function (r) {
                  (n[e] = this),
                    (i[e] = arguments.length > 1 ? M.call(arguments) : r),
                    i === t ? u.notifyWith(n, i) : --s || u.resolveWith(n, i);
                };
              };
            if (o > 1)
              for (
                t = new Array(o), n = new Array(o), i = new Array(o);
                r < o;
                r++
              )
                a[r] && q.isFunction(a[r].promise)
                  ? a[r]
                      .promise()
                      .done(c(r, i, a))
                      .fail(u.reject)
                      .progress(c(r, n, t))
                  : --s;
            return s || u.resolveWith(i, a), u.promise();
          },
        });
      var le;
      (q.fn.ready = function (e) {
        return q.ready.promise().done(e), this;
      }),
        q.extend({
          isReady: !1,
          readyWait: 1,
          holdReady: function (e) {
            e ? q.readyWait++ : q.ready(!0);
          },
          ready: function (e) {
            if (e === !0 ? !--q.readyWait : !q.isReady) {
              if (!ie.body) return setTimeout(q.ready);
              (q.isReady = !0),
                (e !== !0 && --q.readyWait > 0) ||
                  (le.resolveWith(ie, [q]),
                  q.fn.triggerHandler &&
                    (q(ie).triggerHandler("ready"), q(ie).off("ready")));
            }
          },
        }),
        (q.ready.promise = function (e) {
          if (!le)
            if (((le = q.Deferred()), "complete" === ie.readyState))
              setTimeout(q.ready);
            else if (ie.addEventListener)
              ie.addEventListener("DOMContentLoaded", d, !1),
                n.addEventListener("load", d, !1);
            else {
              ie.attachEvent("onreadystatechange", d),
                n.attachEvent("onload", d);
              var t = !1;
              try {
                t = null == n.frameElement && ie.documentElement;
              } catch (e) {}
              t &&
                t.doScroll &&
                !(function e() {
                  if (!q.isReady) {
                    try {
                      t.doScroll("left");
                    } catch (t) {
                      return setTimeout(e, 50);
                    }
                    l(), q.ready();
                  }
                })();
            }
          return le.promise(e);
        });
      var de,
        fe = "undefined";
      for (de in q(K)) break;
      (K.ownLast = "0" !== de),
        (K.inlineBlockNeedsLayout = !1),
        q(function () {
          var e, t, n, i;
          (n = ie.getElementsByTagName("body")[0]),
            n &&
              n.style &&
              ((t = ie.createElement("div")),
              (i = ie.createElement("div")),
              (i.style.cssText =
                "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
              n.appendChild(i).appendChild(t),
              typeof t.style.zoom !== fe &&
                ((t.style.cssText =
                  "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                (K.inlineBlockNeedsLayout = e = 3 === t.offsetWidth),
                e && (n.style.zoom = 1)),
              n.removeChild(i));
        }),
        (function () {
          var e = ie.createElement("div");
          if (null == K.deleteExpando) {
            K.deleteExpando = !0;
            try {
              delete e.test;
            } catch (e) {
              K.deleteExpando = !1;
            }
          }
          e = null;
        })(),
        (q.acceptData = function (e) {
          var t = q.noData[(e.nodeName + " ").toLowerCase()],
            n = +e.nodeType || 1;
          return (
            (1 === n || 9 === n) &&
            (!t || (t !== !0 && e.getAttribute("classid") === t))
          );
        });
      var pe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        he = /([A-Z])/g;
      q.extend({
        cache: {},
        noData: {
          "applet ": !0,
          "embed ": !0,
          "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        },
        hasData: function (e) {
          return (
            (e = e.nodeType ? q.cache[e[q.expando]] : e[q.expando]),
            !!e && !p(e)
          );
        },
        data: function (e, t, n) {
          return h(e, t, n);
        },
        removeData: function (e, t) {
          return g(e, t);
        },
        _data: function (e, t, n) {
          return h(e, t, n, !0);
        },
        _removeData: function (e, t) {
          return g(e, t, !0);
        },
      }),
        q.fn.extend({
          data: function (e, t) {
            var n,
              i,
              r,
              a = this[0],
              o = a && a.attributes;
            if (void 0 === e) {
              if (
                this.length &&
                ((r = q.data(a)),
                1 === a.nodeType && !q._data(a, "parsedAttrs"))
              ) {
                for (n = o.length; n--; )
                  o[n] &&
                    ((i = o[n].name),
                    0 === i.indexOf("data-") &&
                      ((i = q.camelCase(i.slice(5))), f(a, i, r[i])));
                q._data(a, "parsedAttrs", !0);
              }
              return r;
            }
            return "object" == typeof e
              ? this.each(function () {
                  q.data(this, e);
                })
              : arguments.length > 1
              ? this.each(function () {
                  q.data(this, e, t);
                })
              : a
              ? f(a, e, q.data(a, e))
              : void 0;
          },
          removeData: function (e) {
            return this.each(function () {
              q.removeData(this, e);
            });
          },
        }),
        q.extend({
          queue: function (e, t, n) {
            var i;
            if (e)
              return (
                (t = (t || "fx") + "queue"),
                (i = q._data(e, t)),
                n &&
                  (!i || q.isArray(n)
                    ? (i = q._data(e, t, q.makeArray(n)))
                    : i.push(n)),
                i || []
              );
          },
          dequeue: function (e, t) {
            t = t || "fx";
            var n = q.queue(e, t),
              i = n.length,
              r = n.shift(),
              a = q._queueHooks(e, t),
              o = function () {
                q.dequeue(e, t);
              };
            "inprogress" === r && ((r = n.shift()), i--),
              r &&
                ("fx" === t && n.unshift("inprogress"),
                delete a.stop,
                r.call(e, o, a)),
              !i && a && a.empty.fire();
          },
          _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return (
              q._data(e, n) ||
              q._data(e, n, {
                empty: q.Callbacks("once memory").add(function () {
                  q._removeData(e, t + "queue"), q._removeData(e, n);
                }),
              })
            );
          },
        }),
        q.fn.extend({
          queue: function (e, t) {
            var n = 2;
            return (
              "string" != typeof e && ((t = e), (e = "fx"), n--),
              arguments.length < n
                ? q.queue(this[0], e)
                : void 0 === t
                ? this
                : this.each(function () {
                    var n = q.queue(this, e, t);
                    q._queueHooks(this, e),
                      "fx" === e && "inprogress" !== n[0] && q.dequeue(this, e);
                  })
            );
          },
          dequeue: function (e) {
            return this.each(function () {
              q.dequeue(this, e);
            });
          },
          clearQueue: function (e) {
            return this.queue(e || "fx", []);
          },
          promise: function (e, t) {
            var n,
              i = 1,
              r = q.Deferred(),
              a = this,
              o = this.length,
              s = function () {
                --i || r.resolveWith(a, [a]);
              };
            for (
              "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
              o--;

            )
              (n = q._data(a[o], e + "queueHooks")),
                n && n.empty && (i++, n.empty.add(s));
            return s(), r.promise(t);
          },
        });
      var ge = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ve = ["Top", "Right", "Bottom", "Left"],
        _e = function (e, t) {
          return (
            (e = t || e),
            "none" === q.css(e, "display") || !q.contains(e.ownerDocument, e)
          );
        },
        me = (q.access = function (e, t, n, i, r, a, o) {
          var s = 0,
            u = e.length,
            c = null == n;
          if ("object" === q.type(n)) {
            r = !0;
            for (s in n) q.access(e, t, s, n[s], !0, a, o);
          } else if (
            void 0 !== i &&
            ((r = !0),
            q.isFunction(i) || (o = !0),
            c &&
              (o
                ? (t.call(e, i), (t = null))
                : ((c = t),
                  (t = function (e, t, n) {
                    return c.call(q(e), n);
                  }))),
            t)
          )
            for (; s < u; s++) t(e[s], n, o ? i : i.call(e[s], s, t(e[s], n)));
          return r ? e : c ? t.call(e) : u ? t(e[0], n) : a;
        }),
        Ee = /^(?:checkbox|radio)$/i;
      !(function () {
        var e = ie.createElement("input"),
          t = ie.createElement("div"),
          n = ie.createDocumentFragment();
        if (
          ((t.innerHTML =
            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (K.leadingWhitespace = 3 === t.firstChild.nodeType),
          (K.tbody = !t.getElementsByTagName("tbody").length),
          (K.htmlSerialize = !!t.getElementsByTagName("link").length),
          (K.html5Clone =
            "<:nav></:nav>" !==
            ie.createElement("nav").cloneNode(!0).outerHTML),
          (e.type = "checkbox"),
          (e.checked = !0),
          n.appendChild(e),
          (K.appendChecked = e.checked),
          (t.innerHTML = "<textarea>x</textarea>"),
          (K.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue),
          n.appendChild(t),
          (t.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
          (K.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked),
          (K.noCloneEvent = !0),
          t.attachEvent &&
            (t.attachEvent("onclick", function () {
              K.noCloneEvent = !1;
            }),
            t.cloneNode(!0).click()),
          null == K.deleteExpando)
        ) {
          K.deleteExpando = !0;
          try {
            delete t.test;
          } catch (e) {
            K.deleteExpando = !1;
          }
        }
      })(),
        (function () {
          var e,
            t,
            i = ie.createElement("div");
          for (e in { submit: !0, change: !0, focusin: !0 })
            (t = "on" + e),
              (K[e + "Bubbles"] = t in n) ||
                (i.setAttribute(t, "t"),
                (K[e + "Bubbles"] = i.attributes[t].expando === !1));
          i = null;
        })();
      var ye = /^(?:input|select|textarea)$/i,
        Ie = /^key/,
        Te = /^(?:mouse|pointer|contextmenu)|click/,
        Se = /^(?:focusinfocus|focusoutblur)$/,
        Ae = /^([^.]*)(?:\.(.+)|)$/;
      (q.event = {
        global: {},
        add: function (e, t, n, i, r) {
          var a,
            o,
            s,
            u,
            c,
            l,
            d,
            f,
            p,
            h,
            g,
            v = q._data(e);
          if (v) {
            for (
              n.handler && ((u = n), (n = u.handler), (r = u.selector)),
                n.guid || (n.guid = q.guid++),
                (o = v.events) || (o = v.events = {}),
                (l = v.handle) ||
                  ((l = v.handle = function (e) {
                    return typeof q === fe ||
                      (e && q.event.triggered === e.type)
                      ? void 0
                      : q.event.dispatch.apply(l.elem, arguments);
                  }),
                  (l.elem = e)),
                t = (t || "").match(ue) || [""],
                s = t.length;
              s--;

            )
              (a = Ae.exec(t[s]) || []),
                (p = g = a[1]),
                (h = (a[2] || "").split(".").sort()),
                p &&
                  ((c = q.event.special[p] || {}),
                  (p = (r ? c.delegateType : c.bindType) || p),
                  (c = q.event.special[p] || {}),
                  (d = q.extend(
                    {
                      type: p,
                      origType: g,
                      data: i,
                      handler: n,
                      guid: n.guid,
                      selector: r,
                      needsContext: r && q.expr.match.needsContext.test(r),
                      namespace: h.join("."),
                    },
                    u
                  )),
                  (f = o[p]) ||
                    ((f = o[p] = []),
                    (f.delegateCount = 0),
                    (c.setup && c.setup.call(e, i, h, l) !== !1) ||
                      (e.addEventListener
                        ? e.addEventListener(p, l, !1)
                        : e.attachEvent && e.attachEvent("on" + p, l))),
                  c.add &&
                    (c.add.call(e, d),
                    d.handler.guid || (d.handler.guid = n.guid)),
                  r ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                  (q.event.global[p] = !0));
            e = null;
          }
        },
        remove: function (e, t, n, i, r) {
          var a,
            o,
            s,
            u,
            c,
            l,
            d,
            f,
            p,
            h,
            g,
            v = q.hasData(e) && q._data(e);
          if (v && (l = v.events)) {
            for (t = (t || "").match(ue) || [""], c = t.length; c--; )
              if (
                ((s = Ae.exec(t[c]) || []),
                (p = g = s[1]),
                (h = (s[2] || "").split(".").sort()),
                p)
              ) {
                for (
                  d = q.event.special[p] || {},
                    p = (i ? d.delegateType : d.bindType) || p,
                    f = l[p] || [],
                    s =
                      s[2] &&
                      new RegExp(
                        "(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"
                      ),
                    u = a = f.length;
                  a--;

                )
                  (o = f[a]),
                    (!r && g !== o.origType) ||
                      (n && n.guid !== o.guid) ||
                      (s && !s.test(o.namespace)) ||
                      (i && i !== o.selector && ("**" !== i || !o.selector)) ||
                      (f.splice(a, 1),
                      o.selector && f.delegateCount--,
                      d.remove && d.remove.call(e, o));
                u &&
                  !f.length &&
                  ((d.teardown && d.teardown.call(e, h, v.handle) !== !1) ||
                    q.removeEvent(e, p, v.handle),
                  delete l[p]);
              } else for (p in l) q.event.remove(e, p + t[c], n, i, !0);
            q.isEmptyObject(l) && (delete v.handle, q._removeData(e, "events"));
          }
        },
        trigger: function (e, t, i, r) {
          var a,
            o,
            s,
            u,
            c,
            l,
            d,
            f = [i || ie],
            p = z.call(e, "type") ? e.type : e,
            h = z.call(e, "namespace") ? e.namespace.split(".") : [];
          if (
            ((s = l = i = i || ie),
            3 !== i.nodeType &&
              8 !== i.nodeType &&
              !Se.test(p + q.event.triggered) &&
              (p.indexOf(".") >= 0 &&
                ((h = p.split(".")), (p = h.shift()), h.sort()),
              (o = p.indexOf(":") < 0 && "on" + p),
              (e = e[q.expando]
                ? e
                : new q.Event(p, "object" == typeof e && e)),
              (e.isTrigger = r ? 2 : 3),
              (e.namespace = h.join(".")),
              (e.namespace_re = e.namespace
                ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")
                : null),
              (e.result = void 0),
              e.target || (e.target = i),
              (t = null == t ? [e] : q.makeArray(t, [e])),
              (c = q.event.special[p] || {}),
              r || !c.trigger || c.trigger.apply(i, t) !== !1))
          ) {
            if (!r && !c.noBubble && !q.isWindow(i)) {
              for (
                u = c.delegateType || p, Se.test(u + p) || (s = s.parentNode);
                s;
                s = s.parentNode
              )
                f.push(s), (l = s);
              l === (i.ownerDocument || ie) &&
                f.push(l.defaultView || l.parentWindow || n);
            }
            for (d = 0; (s = f[d++]) && !e.isPropagationStopped(); )
              (e.type = d > 1 ? u : c.bindType || p),
                (a =
                  (q._data(s, "events") || {})[e.type] && q._data(s, "handle")),
                a && a.apply(s, t),
                (a = o && s[o]),
                a &&
                  a.apply &&
                  q.acceptData(s) &&
                  ((e.result = a.apply(s, t)),
                  e.result === !1 && e.preventDefault());
            if (
              ((e.type = p),
              !r &&
                !e.isDefaultPrevented() &&
                (!c._default || c._default.apply(f.pop(), t) === !1) &&
                q.acceptData(i) &&
                o &&
                i[p] &&
                !q.isWindow(i))
            ) {
              (l = i[o]), l && (i[o] = null), (q.event.triggered = p);
              try {
                i[p]();
              } catch (e) {}
              (q.event.triggered = void 0), l && (i[o] = l);
            }
            return e.result;
          }
        },
        dispatch: function (e) {
          e = q.event.fix(e);
          var t,
            n,
            i,
            r,
            a,
            o = [],
            s = M.call(arguments),
            u = (q._data(this, "events") || {})[e.type] || [],
            c = q.event.special[e.type] || {};
          if (
            ((s[0] = e),
            (e.delegateTarget = this),
            !c.preDispatch || c.preDispatch.call(this, e) !== !1)
          ) {
            for (
              o = q.event.handlers.call(this, e, u), t = 0;
              (r = o[t++]) && !e.isPropagationStopped();

            )
              for (
                e.currentTarget = r.elem, a = 0;
                (i = r.handlers[a++]) && !e.isImmediatePropagationStopped();

              )
                (e.namespace_re && !e.namespace_re.test(i.namespace)) ||
                  ((e.handleObj = i),
                  (e.data = i.data),
                  (n = (
                    (q.event.special[i.origType] || {}).handle || i.handler
                  ).apply(r.elem, s)),
                  void 0 !== n &&
                    (e.result = n) === !1 &&
                    (e.preventDefault(), e.stopPropagation()));
            return c.postDispatch && c.postDispatch.call(this, e), e.result;
          }
        },
        handlers: function (e, t) {
          var n,
            i,
            r,
            a,
            o = [],
            s = t.delegateCount,
            u = e.target;
          if (s && u.nodeType && (!e.button || "click" !== e.type))
            for (; u != this; u = u.parentNode || this)
              if (
                1 === u.nodeType &&
                (u.disabled !== !0 || "click" !== e.type)
              ) {
                for (r = [], a = 0; a < s; a++)
                  (i = t[a]),
                    (n = i.selector + " "),
                    void 0 === r[n] &&
                      (r[n] = i.needsContext
                        ? q(n, this).index(u) >= 0
                        : q.find(n, this, null, [u]).length),
                    r[n] && r.push(i);
                r.length && o.push({ elem: u, handlers: r });
              }
          return (
            s < t.length && o.push({ elem: this, handlers: t.slice(s) }), o
          );
        },
        fix: function (e) {
          if (e[q.expando]) return e;
          var t,
            n,
            i,
            r = e.type,
            a = e,
            o = this.fixHooks[r];
          for (
            o ||
              (this.fixHooks[r] = o = Te.test(r)
                ? this.mouseHooks
                : Ie.test(r)
                ? this.keyHooks
                : {}),
              i = o.props ? this.props.concat(o.props) : this.props,
              e = new q.Event(a),
              t = i.length;
            t--;

          )
            (n = i[t]), (e[n] = a[n]);
          return (
            e.target || (e.target = a.srcElement || ie),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            (e.metaKey = !!e.metaKey),
            o.filter ? o.filter(e, a) : e
          );
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
          " "
        ),
        fixHooks: {},
        keyHooks: {
          props: "char charCode key keyCode".split(" "),
          filter: function (e, t) {
            return (
              null == e.which &&
                (e.which = null != t.charCode ? t.charCode : t.keyCode),
              e
            );
          },
        },
        mouseHooks: {
          props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
            " "
          ),
          filter: function (e, t) {
            var n,
              i,
              r,
              a = t.button,
              o = t.fromElement;
            return (
              null == e.pageX &&
                null != t.clientX &&
                ((i = e.target.ownerDocument || ie),
                (r = i.documentElement),
                (n = i.body),
                (e.pageX =
                  t.clientX +
                  ((r && r.scrollLeft) || (n && n.scrollLeft) || 0) -
                  ((r && r.clientLeft) || (n && n.clientLeft) || 0)),
                (e.pageY =
                  t.clientY +
                  ((r && r.scrollTop) || (n && n.scrollTop) || 0) -
                  ((r && r.clientTop) || (n && n.clientTop) || 0))),
              !e.relatedTarget &&
                o &&
                (e.relatedTarget = o === e.target ? t.toElement : o),
              e.which ||
                void 0 === a ||
                (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0),
              e
            );
          },
        },
        special: {
          load: { noBubble: !0 },
          focus: {
            trigger: function () {
              if (this !== m() && this.focus)
                try {
                  return this.focus(), !1;
                } catch (e) {}
            },
            delegateType: "focusin",
          },
          blur: {
            trigger: function () {
              if (this === m() && this.blur) return this.blur(), !1;
            },
            delegateType: "focusout",
          },
          click: {
            trigger: function () {
              if (
                q.nodeName(this, "input") &&
                "checkbox" === this.type &&
                this.click
              )
                return this.click(), !1;
            },
            _default: function (e) {
              return q.nodeName(e.target, "a");
            },
          },
          beforeunload: {
            postDispatch: function (e) {
              void 0 !== e.result &&
                e.originalEvent &&
                (e.originalEvent.returnValue = e.result);
            },
          },
        },
        simulate: function (e, t, n, i) {
          var r = q.extend(new q.Event(), n, {
            type: e,
            isSimulated: !0,
            originalEvent: {},
          });
          i ? q.event.trigger(r, null, t) : q.event.dispatch.call(t, r),
            r.isDefaultPrevented() && n.preventDefault();
        },
      }),
        (q.removeEvent = ie.removeEventListener
          ? function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n, !1);
            }
          : function (e, t, n) {
              var i = "on" + t;
              e.detachEvent &&
                (typeof e[i] === fe && (e[i] = null), e.detachEvent(i, n));
            }),
        (q.Event = function (e, t) {
          return this instanceof q.Event
            ? (e && e.type
                ? ((this.originalEvent = e),
                  (this.type = e.type),
                  (this.isDefaultPrevented =
                    e.defaultPrevented ||
                    (void 0 === e.defaultPrevented && e.returnValue === !1)
                      ? v
                      : _))
                : (this.type = e),
              t && q.extend(this, t),
              (this.timeStamp = (e && e.timeStamp) || q.now()),
              void (this[q.expando] = !0))
            : new q.Event(e, t);
        }),
        (q.Event.prototype = {
          isDefaultPrevented: _,
          isPropagationStopped: _,
          isImmediatePropagationStopped: _,
          preventDefault: function () {
            var e = this.originalEvent;
            (this.isDefaultPrevented = v),
              e &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
          },
          stopPropagation: function () {
            var e = this.originalEvent;
            (this.isPropagationStopped = v),
              e &&
                (e.stopPropagation && e.stopPropagation(),
                (e.cancelBubble = !0));
          },
          stopImmediatePropagation: function () {
            var e = this.originalEvent;
            (this.isImmediatePropagationStopped = v),
              e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
              this.stopPropagation();
          },
        }),
        q.each(
          {
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout",
          },
          function (e, t) {
            q.event.special[e] = {
              delegateType: t,
              bindType: t,
              handle: function (e) {
                var n,
                  i = this,
                  r = e.relatedTarget,
                  a = e.handleObj;
                return (
                  (r && (r === i || q.contains(i, r))) ||
                    ((e.type = a.origType),
                    (n = a.handler.apply(this, arguments)),
                    (e.type = t)),
                  n
                );
              },
            };
          }
        ),
        K.submitBubbles ||
          (q.event.special.submit = {
            setup: function () {
              return (
                !q.nodeName(this, "form") &&
                void q.event.add(
                  this,
                  "click._submit keypress._submit",
                  function (e) {
                    var t = e.target,
                      n =
                        q.nodeName(t, "input") || q.nodeName(t, "button")
                          ? t.form
                          : void 0;
                    n &&
                      !q._data(n, "submitBubbles") &&
                      (q.event.add(n, "submit._submit", function (e) {
                        e._submit_bubble = !0;
                      }),
                      q._data(n, "submitBubbles", !0));
                  }
                )
              );
            },
            postDispatch: function (e) {
              e._submit_bubble &&
                (delete e._submit_bubble,
                this.parentNode &&
                  !e.isTrigger &&
                  q.event.simulate("submit", this.parentNode, e, !0));
            },
            teardown: function () {
              return (
                !q.nodeName(this, "form") &&
                void q.event.remove(this, "._submit")
              );
            },
          }),
        K.changeBubbles ||
          (q.event.special.change = {
            setup: function () {
              return ye.test(this.nodeName)
                ? (("checkbox" !== this.type && "radio" !== this.type) ||
                    (q.event.add(this, "propertychange._change", function (e) {
                      "checked" === e.originalEvent.propertyName &&
                        (this._just_changed = !0);
                    }),
                    q.event.add(this, "click._change", function (e) {
                      this._just_changed &&
                        !e.isTrigger &&
                        (this._just_changed = !1),
                        q.event.simulate("change", this, e, !0);
                    })),
                  !1)
                : void q.event.add(
                    this,
                    "beforeactivate._change",
                    function (e) {
                      var t = e.target;
                      ye.test(t.nodeName) &&
                        !q._data(t, "changeBubbles") &&
                        (q.event.add(t, "change._change", function (e) {
                          !this.parentNode ||
                            e.isSimulated ||
                            e.isTrigger ||
                            q.event.simulate("change", this.parentNode, e, !0);
                        }),
                        q._data(t, "changeBubbles", !0));
                    }
                  );
            },
            handle: function (e) {
              var t = e.target;
              if (
                this !== t ||
                e.isSimulated ||
                e.isTrigger ||
                ("radio" !== t.type && "checkbox" !== t.type)
              )
                return e.handleObj.handler.apply(this, arguments);
            },
            teardown: function () {
              return q.event.remove(this, "._change"), !ye.test(this.nodeName);
            },
          }),
        K.focusinBubbles ||
          q.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
            var n = function (e) {
              q.event.simulate(t, e.target, q.event.fix(e), !0);
            };
            q.event.special[t] = {
              setup: function () {
                var i = this.ownerDocument || this,
                  r = q._data(i, t);
                r || i.addEventListener(e, n, !0), q._data(i, t, (r || 0) + 1);
              },
              teardown: function () {
                var i = this.ownerDocument || this,
                  r = q._data(i, t) - 1;
                r
                  ? q._data(i, t, r)
                  : (i.removeEventListener(e, n, !0), q._removeData(i, t));
              },
            };
          }),
        q.fn.extend({
          on: function (e, t, n, i, r) {
            var a, o;
            if ("object" == typeof e) {
              "string" != typeof t && ((n = n || t), (t = void 0));
              for (a in e) this.on(a, t, n, e[a], r);
              return this;
            }
            if (
              (null == n && null == i
                ? ((i = t), (n = t = void 0))
                : null == i &&
                  ("string" == typeof t
                    ? ((i = n), (n = void 0))
                    : ((i = n), (n = t), (t = void 0))),
              i === !1)
            )
              i = _;
            else if (!i) return this;
            return (
              1 === r &&
                ((o = i),
                (i = function (e) {
                  return q().off(e), o.apply(this, arguments);
                }),
                (i.guid = o.guid || (o.guid = q.guid++))),
              this.each(function () {
                q.event.add(this, e, i, n, t);
              })
            );
          },
          one: function (e, t, n, i) {
            return this.on(e, t, n, i, 1);
          },
          off: function (e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj)
              return (
                (i = e.handleObj),
                q(e.delegateTarget).off(
                  i.namespace ? i.origType + "." + i.namespace : i.origType,
                  i.selector,
                  i.handler
                ),
                this
              );
            if ("object" == typeof e) {
              for (r in e) this.off(r, t, e[r]);
              return this;
            }
            return (
              (t !== !1 && "function" != typeof t) || ((n = t), (t = void 0)),
              n === !1 && (n = _),
              this.each(function () {
                q.event.remove(this, e, n, t);
              })
            );
          },
          trigger: function (e, t) {
            return this.each(function () {
              q.event.trigger(e, t, this);
            });
          },
          triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return q.event.trigger(e, t, n, !0);
          },
        });
      var be =
          "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        we = / jQuery\d+="(?:null|\d+)"/g,
        De = new RegExp("<(?:" + be + ")[\\s/>]", "i"),
        Re = /^\s+/,
        Ce = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ne = /<([\w:]+)/,
        Oe = /<tbody/i,
        xe = /<|&#?\w+;/,
        Le = /<(?:script|style|link)/i,
        Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ke = /^$|\/(?:java|ecma)script/i,
        Ve = /^true\/(.*)/,
        Fe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Me = {
          option: [1, "<select multiple='multiple'>", "</select>"],
          legend: [1, "<fieldset>", "</fieldset>"],
          area: [1, "<map>", "</map>"],
          param: [1, "<object>", "</object>"],
          thead: [1, "<table>", "</table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: K.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
        },
        Ue = E(ie),
        Ge = Ue.appendChild(ie.createElement("div"));
      (Me.optgroup = Me.option),
        (Me.tbody = Me.tfoot = Me.colgroup = Me.caption = Me.thead),
        (Me.th = Me.td),
        q.extend({
          clone: function (e, t, n) {
            var i,
              r,
              a,
              o,
              s,
              u = q.contains(e.ownerDocument, e);
            if (
              (K.html5Clone || q.isXMLDoc(e) || !De.test("<" + e.nodeName + ">")
                ? (a = e.cloneNode(!0))
                : ((Ge.innerHTML = e.outerHTML),
                  Ge.removeChild((a = Ge.firstChild))),
              !(
                (K.noCloneEvent && K.noCloneChecked) ||
                (1 !== e.nodeType && 11 !== e.nodeType) ||
                q.isXMLDoc(e)
              ))
            )
              for (i = y(a), s = y(e), o = 0; null != (r = s[o]); ++o)
                i[o] && D(r, i[o]);
            if (t)
              if (n)
                for (
                  s = s || y(e), i = i || y(a), o = 0;
                  null != (r = s[o]);
                  o++
                )
                  w(r, i[o]);
              else w(e, a);
            return (
              (i = y(a, "script")),
              i.length > 0 && b(i, !u && y(e, "script")),
              (i = s = r = null),
              a
            );
          },
          buildFragment: function (e, t, n, i) {
            for (
              var r, a, o, s, u, c, l, d = e.length, f = E(t), p = [], h = 0;
              h < d;
              h++
            )
              if (((a = e[h]), a || 0 === a))
                if ("object" === q.type(a)) q.merge(p, a.nodeType ? [a] : a);
                else if (xe.test(a)) {
                  for (
                    s = s || f.appendChild(t.createElement("div")),
                      u = (Ne.exec(a) || ["", ""])[1].toLowerCase(),
                      l = Me[u] || Me._default,
                      s.innerHTML = l[1] + a.replace(Ce, "<$1></$2>") + l[2],
                      r = l[0];
                    r--;

                  )
                    s = s.lastChild;
                  if (
                    (!K.leadingWhitespace &&
                      Re.test(a) &&
                      p.push(t.createTextNode(Re.exec(a)[0])),
                    !K.tbody)
                  )
                    for (
                      a =
                        "table" !== u || Oe.test(a)
                          ? "<table>" !== l[1] || Oe.test(a)
                            ? 0
                            : s
                          : s.firstChild,
                        r = a && a.childNodes.length;
                      r--;

                    )
                      q.nodeName((c = a.childNodes[r]), "tbody") &&
                        !c.childNodes.length &&
                        a.removeChild(c);
                  for (
                    q.merge(p, s.childNodes), s.textContent = "";
                    s.firstChild;

                  )
                    s.removeChild(s.firstChild);
                  s = f.lastChild;
                } else p.push(t.createTextNode(a));
            for (
              s && f.removeChild(s),
                K.appendChecked || q.grep(y(p, "input"), I),
                h = 0;
              (a = p[h++]);

            )
              if (
                (!i || q.inArray(a, i) === -1) &&
                ((o = q.contains(a.ownerDocument, a)),
                (s = y(f.appendChild(a), "script")),
                o && b(s),
                n)
              )
                for (r = 0; (a = s[r++]); ) ke.test(a.type || "") && n.push(a);
            return (s = null), f;
          },
          cleanData: function (e, t) {
            for (
              var n,
                i,
                r,
                a,
                o = 0,
                s = q.expando,
                u = q.cache,
                c = K.deleteExpando,
                l = q.event.special;
              null != (n = e[o]);
              o++
            )
              if ((t || q.acceptData(n)) && ((r = n[s]), (a = r && u[r]))) {
                if (a.events)
                  for (i in a.events)
                    l[i] ? q.event.remove(n, i) : q.removeEvent(n, i, a.handle);
                u[r] &&
                  (delete u[r],
                  c
                    ? delete n[s]
                    : typeof n.removeAttribute !== fe
                    ? n.removeAttribute(s)
                    : (n[s] = null),
                  F.push(r));
              }
          },
        }),
        q.fn.extend({
          text: function (e) {
            return me(
              this,
              function (e) {
                return void 0 === e
                  ? q.text(this)
                  : this.empty().append(
                      ((this[0] && this[0].ownerDocument) || ie).createTextNode(
                        e
                      )
                    );
              },
              null,
              e,
              arguments.length
            );
          },
          append: function () {
            return this.domManip(arguments, function (e) {
              if (
                1 === this.nodeType ||
                11 === this.nodeType ||
                9 === this.nodeType
              ) {
                var t = T(this, e);
                t.appendChild(e);
              }
            });
          },
          prepend: function () {
            return this.domManip(arguments, function (e) {
              if (
                1 === this.nodeType ||
                11 === this.nodeType ||
                9 === this.nodeType
              ) {
                var t = T(this, e);
                t.insertBefore(e, t.firstChild);
              }
            });
          },
          before: function () {
            return this.domManip(arguments, function (e) {
              this.parentNode && this.parentNode.insertBefore(e, this);
            });
          },
          after: function () {
            return this.domManip(arguments, function (e) {
              this.parentNode &&
                this.parentNode.insertBefore(e, this.nextSibling);
            });
          },
          remove: function (e, t) {
            for (
              var n, i = e ? q.filter(e, this) : this, r = 0;
              null != (n = i[r]);
              r++
            )
              t || 1 !== n.nodeType || q.cleanData(y(n)),
                n.parentNode &&
                  (t && q.contains(n.ownerDocument, n) && b(y(n, "script")),
                  n.parentNode.removeChild(n));
            return this;
          },
          empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
              for (1 === e.nodeType && q.cleanData(y(e, !1)); e.firstChild; )
                e.removeChild(e.firstChild);
              e.options && q.nodeName(e, "select") && (e.options.length = 0);
            }
            return this;
          },
          clone: function (e, t) {
            return (
              (e = null != e && e),
              (t = null == t ? e : t),
              this.map(function () {
                return q.clone(this, e, t);
              })
            );
          },
          html: function (e) {
            return me(
              this,
              function (e) {
                var t = this[0] || {},
                  n = 0,
                  i = this.length;
                if (void 0 === e)
                  return 1 === t.nodeType
                    ? t.innerHTML.replace(we, "")
                    : void 0;
                if (
                  "string" == typeof e &&
                  !Le.test(e) &&
                  (K.htmlSerialize || !De.test(e)) &&
                  (K.leadingWhitespace || !Re.test(e)) &&
                  !Me[(Ne.exec(e) || ["", ""])[1].toLowerCase()]
                ) {
                  e = e.replace(Ce, "<$1></$2>");
                  try {
                    for (; n < i; n++)
                      (t = this[n] || {}),
                        1 === t.nodeType &&
                          (q.cleanData(y(t, !1)), (t.innerHTML = e));
                    t = 0;
                  } catch (e) {}
                }
                t && this.empty().append(e);
              },
              null,
              e,
              arguments.length
            );
          },
          replaceWith: function () {
            var e = arguments[0];
            return (
              this.domManip(arguments, function (t) {
                (e = this.parentNode),
                  q.cleanData(y(this)),
                  e && e.replaceChild(t, this);
              }),
              e && (e.length || e.nodeType) ? this : this.remove()
            );
          },
          detach: function (e) {
            return this.remove(e, !0);
          },
          domManip: function (e, t) {
            e = U.apply([], e);
            var n,
              i,
              r,
              a,
              o,
              s,
              u = 0,
              c = this.length,
              l = this,
              d = c - 1,
              f = e[0],
              p = q.isFunction(f);
            if (
              p ||
              (c > 1 && "string" == typeof f && !K.checkClone && Pe.test(f))
            )
              return this.each(function (n) {
                var i = l.eq(n);
                p && (e[0] = f.call(this, n, i.html())), i.domManip(e, t);
              });
            if (
              c &&
              ((s = q.buildFragment(e, this[0].ownerDocument, !1, this)),
              (n = s.firstChild),
              1 === s.childNodes.length && (s = n),
              n)
            ) {
              for (a = q.map(y(s, "script"), S), r = a.length; u < c; u++)
                (i = s),
                  u !== d &&
                    ((i = q.clone(i, !0, !0)), r && q.merge(a, y(i, "script"))),
                  t.call(this[u], i, u);
              if (r)
                for (
                  o = a[a.length - 1].ownerDocument, q.map(a, A), u = 0;
                  u < r;
                  u++
                )
                  (i = a[u]),
                    ke.test(i.type || "") &&
                      !q._data(i, "globalEval") &&
                      q.contains(o, i) &&
                      (i.src
                        ? q._evalUrl && q._evalUrl(i.src)
                        : q.globalEval(
                            (
                              i.text ||
                              i.textContent ||
                              i.innerHTML ||
                              ""
                            ).replace(Fe, "")
                          ));
              s = n = null;
            }
            return this;
          },
        }),
        q.each(
          {
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith",
          },
          function (e, t) {
            q.fn[e] = function (e) {
              for (
                var n, i = 0, r = [], a = q(e), o = a.length - 1;
                i <= o;
                i++
              )
                (n = i === o ? this : this.clone(!0)),
                  q(a[i])[t](n),
                  G.apply(r, n.get());
              return this.pushStack(r);
            };
          }
        );
      var Be,
        je,
        He,
        ze = {},
        Ke = /^margin/,
        Ye = new RegExp("^(" + ge + ")(?!px)[a-z%]+$", "i"),
        qe = /^(top|right|bottom|left)$/;
      n.getComputedStyle
        ? ((je = function (e) {
            return e.ownerDocument.defaultView.opener
              ? e.ownerDocument.defaultView.getComputedStyle(e, null)
              : n.getComputedStyle(e, null);
          }),
          (He = function (e, t, n) {
            var i,
              r,
              a,
              o,
              s = e.style;
            return (
              (n = n || je(e)),
              (o = n ? n.getPropertyValue(t) || n[t] : void 0),
              n &&
                ("" !== o ||
                  q.contains(e.ownerDocument, e) ||
                  (o = q.style(e, t)),
                Ye.test(o) &&
                  Ke.test(t) &&
                  ((i = s.width),
                  (r = s.minWidth),
                  (a = s.maxWidth),
                  (s.minWidth = s.maxWidth = s.width = o),
                  (o = n.width),
                  (s.width = i),
                  (s.minWidth = r),
                  (s.maxWidth = a))),
              void 0 === o ? o : o + ""
            );
          }))
        : ie.documentElement.currentStyle &&
          ((je = function (e) {
            return e.currentStyle;
          }),
          (He = function (e, t, n) {
            var i,
              r,
              a,
              o,
              s = e.style;
            return (
              (n = n || je(e)),
              (o = n ? n[t] : void 0),
              null == o && s && s[t] && (o = s[t]),
              Ye.test(o) &&
                !qe.test(t) &&
                ((i = s.left),
                (r = e.runtimeStyle),
                (a = r && r.left),
                a && (r.left = e.currentStyle.left),
                (s.left = "fontSize" === t ? "1em" : o),
                (o = s.pixelLeft + "px"),
                (s.left = i),
                a && (r.left = a)),
              void 0 === o ? o : o + "" || "auto"
            );
          })),
        (function () {
          function e() {
            var e, t, i, r;
            (t = ie.getElementsByTagName("body")[0]),
              t &&
                t.style &&
                ((e = ie.createElement("div")),
                (i = ie.createElement("div")),
                (i.style.cssText =
                  "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                t.appendChild(i).appendChild(e),
                (e.style.cssText =
                  "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
                (a = o = !1),
                (u = !0),
                n.getComputedStyle &&
                  ((a = "1%" !== (n.getComputedStyle(e, null) || {}).top),
                  (o =
                    "4px" ===
                    (n.getComputedStyle(e, null) || { width: "4px" }).width),
                  (r = e.appendChild(ie.createElement("div"))),
                  (r.style.cssText = e.style.cssText =
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                  (r.style.marginRight = r.style.width = "0"),
                  (e.style.width = "1px"),
                  (u = !parseFloat(
                    (n.getComputedStyle(r, null) || {}).marginRight
                  )),
                  e.removeChild(r)),
                (e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                (r = e.getElementsByTagName("td")),
                (r[0].style.cssText =
                  "margin:0;border:0;padding:0;display:none"),
                (s = 0 === r[0].offsetHeight),
                s &&
                  ((r[0].style.display = ""),
                  (r[1].style.display = "none"),
                  (s = 0 === r[0].offsetHeight)),
                t.removeChild(i));
          }
          var t, i, r, a, o, s, u;
          (t = ie.createElement("div")),
            (t.innerHTML =
              "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (r = t.getElementsByTagName("a")[0]),
            (i = r && r.style),
            i &&
              ((i.cssText = "float:left;opacity:.5"),
              (K.opacity = "0.5" === i.opacity),
              (K.cssFloat = !!i.cssFloat),
              (t.style.backgroundClip = "content-box"),
              (t.cloneNode(!0).style.backgroundClip = ""),
              (K.clearCloneStyle = "content-box" === t.style.backgroundClip),
              (K.boxSizing =
                "" === i.boxSizing ||
                "" === i.MozBoxSizing ||
                "" === i.WebkitBoxSizing),
              q.extend(K, {
                reliableHiddenOffsets: function () {
                  return null == s && e(), s;
                },
                boxSizingReliable: function () {
                  return null == o && e(), o;
                },
                pixelPosition: function () {
                  return null == a && e(), a;
                },
                reliableMarginRight: function () {
                  return null == u && e(), u;
                },
              }));
        })(),
        (q.swap = function (e, t, n, i) {
          var r,
            a,
            o = {};
          for (a in t) (o[a] = e.style[a]), (e.style[a] = t[a]);
          r = n.apply(e, i || []);
          for (a in t) e.style[a] = o[a];
          return r;
        });
      var We = /alpha\([^)]*\)/i,
        Xe = /opacity\s*=\s*([^)]*)/,
        $e = /^(none|table(?!-c[ea]).+)/,
        Qe = new RegExp("^(" + ge + ")(.*)$", "i"),
        Je = new RegExp("^([+-])=(" + ge + ")", "i"),
        Ze = { position: "absolute", visibility: "hidden", display: "block" },
        et = { letterSpacing: "0", fontWeight: "400" },
        tt = ["Webkit", "O", "Moz", "ms"];
      q.extend({
        cssHooks: {
          opacity: {
            get: function (e, t) {
              if (t) {
                var n = He(e, "opacity");
                return "" === n ? "1" : n;
              }
            },
          },
        },
        cssNumber: {
          columnCount: !0,
          fillOpacity: !0,
          flexGrow: !0,
          flexShrink: !0,
          fontWeight: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
        },
        cssProps: { float: K.cssFloat ? "cssFloat" : "styleFloat" },
        style: function (e, t, n, i) {
          if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var r,
              a,
              o,
              s = q.camelCase(t),
              u = e.style;
            if (
              ((t = q.cssProps[s] || (q.cssProps[s] = O(u, s))),
              (o = q.cssHooks[t] || q.cssHooks[s]),
              void 0 === n)
            )
              return o && "get" in o && void 0 !== (r = o.get(e, !1, i))
                ? r
                : u[t];
            if (
              ((a = typeof n),
              "string" === a &&
                (r = Je.exec(n)) &&
                ((n = (r[1] + 1) * r[2] + parseFloat(q.css(e, t))),
                (a = "number")),
              null != n &&
                n === n &&
                ("number" !== a || q.cssNumber[s] || (n += "px"),
                K.clearCloneStyle ||
                  "" !== n ||
                  0 !== t.indexOf("background") ||
                  (u[t] = "inherit"),
                !(o && "set" in o && void 0 === (n = o.set(e, n, i)))))
            )
              try {
                u[t] = n;
              } catch (e) {}
          }
        },
        css: function (e, t, n, i) {
          var r,
            a,
            o,
            s = q.camelCase(t);
          return (
            (t = q.cssProps[s] || (q.cssProps[s] = O(e.style, s))),
            (o = q.cssHooks[t] || q.cssHooks[s]),
            o && "get" in o && (a = o.get(e, !0, n)),
            void 0 === a && (a = He(e, t, i)),
            "normal" === a && t in et && (a = et[t]),
            "" === n || n
              ? ((r = parseFloat(a)), n === !0 || q.isNumeric(r) ? r || 0 : a)
              : a
          );
        },
      }),
        q.each(["height", "width"], function (e, t) {
          q.cssHooks[t] = {
            get: function (e, n, i) {
              if (n)
                return $e.test(q.css(e, "display")) && 0 === e.offsetWidth
                  ? q.swap(e, Ze, function () {
                      return k(e, t, i);
                    })
                  : k(e, t, i);
            },
            set: function (e, n, i) {
              var r = i && je(e);
              return L(
                e,
                n,
                i
                  ? P(
                      e,
                      t,
                      i,
                      K.boxSizing &&
                        "border-box" === q.css(e, "boxSizing", !1, r),
                      r
                    )
                  : 0
              );
            },
          };
        }),
        K.opacity ||
          (q.cssHooks.opacity = {
            get: function (e, t) {
              return Xe.test(
                (t && e.currentStyle
                  ? e.currentStyle.filter
                  : e.style.filter) || ""
              )
                ? 0.01 * parseFloat(RegExp.$1) + ""
                : t
                ? "1"
                : "";
            },
            set: function (e, t) {
              var n = e.style,
                i = e.currentStyle,
                r = q.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                a = (i && i.filter) || n.filter || "";
              (n.zoom = 1),
                ((t >= 1 || "" === t) &&
                  "" === q.trim(a.replace(We, "")) &&
                  n.removeAttribute &&
                  (n.removeAttribute("filter"),
                  "" === t || (i && !i.filter))) ||
                  (n.filter = We.test(a) ? a.replace(We, r) : a + " " + r);
            },
          }),
        (q.cssHooks.marginRight = N(K.reliableMarginRight, function (e, t) {
          if (t)
            return q.swap(e, { display: "inline-block" }, He, [
              e,
              "marginRight",
            ]);
        })),
        q.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
          (q.cssHooks[e + t] = {
            expand: function (n) {
              for (
                var i = 0,
                  r = {},
                  a = "string" == typeof n ? n.split(" ") : [n];
                i < 4;
                i++
              )
                r[e + ve[i] + t] = a[i] || a[i - 2] || a[0];
              return r;
            },
          }),
            Ke.test(e) || (q.cssHooks[e + t].set = L);
        }),
        q.fn.extend({
          css: function (e, t) {
            return me(
              this,
              function (e, t, n) {
                var i,
                  r,
                  a = {},
                  o = 0;
                if (q.isArray(t)) {
                  for (i = je(e), r = t.length; o < r; o++)
                    a[t[o]] = q.css(e, t[o], !1, i);
                  return a;
                }
                return void 0 !== n ? q.style(e, t, n) : q.css(e, t);
              },
              e,
              t,
              arguments.length > 1
            );
          },
          show: function () {
            return x(this, !0);
          },
          hide: function () {
            return x(this);
          },
          toggle: function (e) {
            return "boolean" == typeof e
              ? e
                ? this.show()
                : this.hide()
              : this.each(function () {
                  _e(this) ? q(this).show() : q(this).hide();
                });
          },
        }),
        (q.fn.delay = function (e, t) {
          return (
            (e = q.fx ? q.fx.speeds[e] || e : e),
            (t = t || "fx"),
            this.queue(t, function (t, n) {
              var i = setTimeout(t, e);
              n.stop = function () {
                clearTimeout(i);
              };
            })
          );
        }),
        (function () {
          var e, t, n, i, r;
          (t = ie.createElement("div")),
            t.setAttribute("className", "t"),
            (t.innerHTML =
              "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (i = t.getElementsByTagName("a")[0]),
            (n = ie.createElement("select")),
            (r = n.appendChild(ie.createElement("option"))),
            (e = t.getElementsByTagName("input")[0]),
            (i.style.cssText = "top:1px"),
            (K.getSetAttribute = "t" !== t.className),
            (K.style = /top/.test(i.getAttribute("style"))),
            (K.hrefNormalized = "/a" === i.getAttribute("href")),
            (K.checkOn = !!e.value),
            (K.optSelected = r.selected),
            (K.enctype = !!ie.createElement("form").enctype),
            (n.disabled = !0),
            (K.optDisabled = !r.disabled),
            (e = ie.createElement("input")),
            e.setAttribute("value", ""),
            (K.input = "" === e.getAttribute("value")),
            (e.value = "t"),
            e.setAttribute("type", "radio"),
            (K.radioValue = "t" === e.value);
        })();
      var nt = /\r/g;
      q.fn.extend({
        val: function (e) {
          var t,
            n,
            i,
            r = this[0];
          {
            if (arguments.length)
              return (
                (i = q.isFunction(e)),
                this.each(function (n) {
                  var r;
                  1 === this.nodeType &&
                    ((r = i ? e.call(this, n, q(this).val()) : e),
                    null == r
                      ? (r = "")
                      : "number" == typeof r
                      ? (r += "")
                      : q.isArray(r) &&
                        (r = q.map(r, function (e) {
                          return null == e ? "" : e + "";
                        })),
                    (t =
                      q.valHooks[this.type] ||
                      q.valHooks[this.nodeName.toLowerCase()]),
                    (t && "set" in t && void 0 !== t.set(this, r, "value")) ||
                      (this.value = r));
                })
              );
            if (r)
              return (
                (t =
                  q.valHooks[r.type] || q.valHooks[r.nodeName.toLowerCase()]),
                t && "get" in t && void 0 !== (n = t.get(r, "value"))
                  ? n
                  : ((n = r.value),
                    "string" == typeof n
                      ? n.replace(nt, "")
                      : null == n
                      ? ""
                      : n)
              );
          }
        },
      }),
        q.extend({
          valHooks: {
            option: {
              get: function (e) {
                var t = q.find.attr(e, "value");
                return null != t ? t : q.trim(q.text(e));
              },
            },
            select: {
              get: function (e) {
                for (
                  var t,
                    n,
                    i = e.options,
                    r = e.selectedIndex,
                    a = "select-one" === e.type || r < 0,
                    o = a ? null : [],
                    s = a ? r + 1 : i.length,
                    u = r < 0 ? s : a ? r : 0;
                  u < s;
                  u++
                )
                  if (
                    ((n = i[u]),
                    (n.selected || u === r) &&
                      (K.optDisabled
                        ? !n.disabled
                        : null === n.getAttribute("disabled")) &&
                      (!n.parentNode.disabled ||
                        !q.nodeName(n.parentNode, "optgroup")))
                  ) {
                    if (((t = q(n).val()), a)) return t;
                    o.push(t);
                  }
                return o;
              },
              set: function (e, t) {
                for (
                  var n, i, r = e.options, a = q.makeArray(t), o = r.length;
                  o--;

                )
                  if (((i = r[o]), q.inArray(q.valHooks.option.get(i), a) >= 0))
                    try {
                      i.selected = n = !0;
                    } catch (e) {
                      i.scrollHeight;
                    }
                  else i.selected = !1;
                return n || (e.selectedIndex = -1), r;
              },
            },
          },
        }),
        q.each(["radio", "checkbox"], function () {
          (q.valHooks[this] = {
            set: function (e, t) {
              if (q.isArray(t))
                return (e.checked = q.inArray(q(e).val(), t) >= 0);
            },
          }),
            K.checkOn ||
              (q.valHooks[this].get = function (e) {
                return null === e.getAttribute("value") ? "on" : e.value;
              });
        });
      var it,
        rt,
        at = q.expr.attrHandle,
        ot = /^(?:checked|selected)$/i,
        st = K.getSetAttribute,
        ut = K.input;
      q.fn.extend({
        attr: function (e, t) {
          return me(this, q.attr, e, t, arguments.length > 1);
        },
        removeAttr: function (e) {
          return this.each(function () {
            q.removeAttr(this, e);
          });
        },
      }),
        q.extend({
          attr: function (e, t, n) {
            var i,
              r,
              a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a)
              return typeof e.getAttribute === fe
                ? q.prop(e, t, n)
                : ((1 === a && q.isXMLDoc(e)) ||
                    ((t = t.toLowerCase()),
                    (i =
                      q.attrHooks[t] || (q.expr.match.bool.test(t) ? rt : it))),
                  void 0 === n
                    ? i && "get" in i && null !== (r = i.get(e, t))
                      ? r
                      : ((r = q.find.attr(e, t)), null == r ? void 0 : r)
                    : null !== n
                    ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                      ? r
                      : (e.setAttribute(t, n + ""), n)
                    : void q.removeAttr(e, t));
          },
          removeAttr: function (e, t) {
            var n,
              i,
              r = 0,
              a = t && t.match(ue);
            if (a && 1 === e.nodeType)
              for (; (n = a[r++]); )
                (i = q.propFix[n] || n),
                  q.expr.match.bool.test(n)
                    ? (ut && st) || !ot.test(n)
                      ? (e[i] = !1)
                      : (e[q.camelCase("default-" + n)] = e[i] = !1)
                    : q.attr(e, n, ""),
                  e.removeAttribute(st ? n : i);
          },
          attrHooks: {
            type: {
              set: function (e, t) {
                if (!K.radioValue && "radio" === t && q.nodeName(e, "input")) {
                  var n = e.value;
                  return e.setAttribute("type", t), n && (e.value = n), t;
                }
              },
            },
          },
        }),
        (rt = {
          set: function (e, t, n) {
            return (
              t === !1
                ? q.removeAttr(e, n)
                : (ut && st) || !ot.test(n)
                ? e.setAttribute((!st && q.propFix[n]) || n, n)
                : (e[q.camelCase("default-" + n)] = e[n] = !0),
              n
            );
          },
        }),
        q.each(q.expr.match.bool.source.match(/\w+/g), function (e, t) {
          var n = at[t] || q.find.attr;
          at[t] =
            (ut && st) || !ot.test(t)
              ? function (e, t, i) {
                  var r, a;
                  return (
                    i ||
                      ((a = at[t]),
                      (at[t] = r),
                      (r = null != n(e, t, i) ? t.toLowerCase() : null),
                      (at[t] = a)),
                    r
                  );
                }
              : function (e, t, n) {
                  if (!n)
                    return e[q.camelCase("default-" + t)]
                      ? t.toLowerCase()
                      : null;
                };
        }),
        (ut && st) ||
          (q.attrHooks.value = {
            set: function (e, t, n) {
              return q.nodeName(e, "input")
                ? void (e.defaultValue = t)
                : it && it.set(e, t, n);
            },
          }),
        st ||
          ((it = {
            set: function (e, t, n) {
              var i = e.getAttributeNode(n);
              if (
                (i ||
                  e.setAttributeNode((i = e.ownerDocument.createAttribute(n))),
                (i.value = t += ""),
                "value" === n || t === e.getAttribute(n))
              )
                return t;
            },
          }),
          (at.id = at.name = at.coords = function (e, t, n) {
            var i;
            if (!n)
              return (i = e.getAttributeNode(t)) && "" !== i.value
                ? i.value
                : null;
          }),
          (q.valHooks.button = {
            get: function (e, t) {
              var n = e.getAttributeNode(t);
              if (n && n.specified) return n.value;
            },
            set: it.set,
          }),
          (q.attrHooks.contenteditable = {
            set: function (e, t, n) {
              it.set(e, "" !== t && t, n);
            },
          }),
          q.each(["width", "height"], function (e, t) {
            q.attrHooks[t] = {
              set: function (e, n) {
                if ("" === n) return e.setAttribute(t, "auto"), n;
              },
            };
          })),
        K.style ||
          (q.attrHooks.style = {
            get: function (e) {
              return e.style.cssText || void 0;
            },
            set: function (e, t) {
              return (e.style.cssText = t + "");
            },
          });
      var ct = /^(?:input|select|textarea|button|object)$/i,
        lt = /^(?:a|area)$/i;
      q.fn.extend({
        prop: function (e, t) {
          return me(this, q.prop, e, t, arguments.length > 1);
        },
        removeProp: function (e) {
          return (
            (e = q.propFix[e] || e),
            this.each(function () {
              try {
                (this[e] = void 0), delete this[e];
              } catch (e) {}
            })
          );
        },
      }),
        q.extend({
          propFix: { for: "htmlFor", class: "className" },
          prop: function (e, t, n) {
            var i,
              r,
              a,
              o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o)
              return (
                (a = 1 !== o || !q.isXMLDoc(e)),
                a && ((t = q.propFix[t] || t), (r = q.propHooks[t])),
                void 0 !== n
                  ? r && "set" in r && void 0 !== (i = r.set(e, n, t))
                    ? i
                    : (e[t] = n)
                  : r && "get" in r && null !== (i = r.get(e, t))
                  ? i
                  : e[t]
              );
          },
          propHooks: {
            tabIndex: {
              get: function (e) {
                var t = q.find.attr(e, "tabindex");
                return t
                  ? parseInt(t, 10)
                  : ct.test(e.nodeName) || (lt.test(e.nodeName) && e.href)
                  ? 0
                  : -1;
              },
            },
          },
        }),
        K.hrefNormalized ||
          q.each(["href", "src"], function (e, t) {
            q.propHooks[t] = {
              get: function (e) {
                return e.getAttribute(t, 4);
              },
            };
          }),
        K.optSelected ||
          (q.propHooks.selected = {
            get: function (e) {
              var t = e.parentNode;
              return (
                t &&
                  (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
                null
              );
            },
          }),
        q.each(
          [
            "tabIndex",
            "readOnly",
            "maxLength",
            "cellSpacing",
            "cellPadding",
            "rowSpan",
            "colSpan",
            "useMap",
            "frameBorder",
            "contentEditable",
          ],
          function () {
            q.propFix[this.toLowerCase()] = this;
          }
        ),
        K.enctype || (q.propFix.enctype = "encoding");
      var dt = /[\t\r\n\f]/g;
      q.fn.extend({
        addClass: function (e) {
          var t,
            n,
            i,
            r,
            a,
            o,
            s = 0,
            u = this.length,
            c = "string" == typeof e && e;
          if (q.isFunction(e))
            return this.each(function (t) {
              q(this).addClass(e.call(this, t, this.className));
            });
          if (c)
            for (t = (e || "").match(ue) || []; s < u; s++)
              if (
                ((n = this[s]),
                (i =
                  1 === n.nodeType &&
                  (n.className
                    ? (" " + n.className + " ").replace(dt, " ")
                    : " ")))
              ) {
                for (a = 0; (r = t[a++]); )
                  i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                (o = q.trim(i)), n.className !== o && (n.className = o);
              }
          return this;
        },
        removeClass: function (e) {
          var t,
            n,
            i,
            r,
            a,
            o,
            s = 0,
            u = this.length,
            c = 0 === arguments.length || ("string" == typeof e && e);
          if (q.isFunction(e))
            return this.each(function (t) {
              q(this).removeClass(e.call(this, t, this.className));
            });
          if (c)
            for (t = (e || "").match(ue) || []; s < u; s++)
              if (
                ((n = this[s]),
                (i =
                  1 === n.nodeType &&
                  (n.className
                    ? (" " + n.className + " ").replace(dt, " ")
                    : "")))
              ) {
                for (a = 0; (r = t[a++]); )
                  for (; i.indexOf(" " + r + " ") >= 0; )
                    i = i.replace(" " + r + " ", " ");
                (o = e ? q.trim(i) : ""),
                  n.className !== o && (n.className = o);
              }
          return this;
        },
        toggleClass: function (e, t) {
          var n = typeof e;
          return "boolean" == typeof t && "string" === n
            ? t
              ? this.addClass(e)
              : this.removeClass(e)
            : q.isFunction(e)
            ? this.each(function (n) {
                q(this).toggleClass(e.call(this, n, this.className, t), t);
              })
            : this.each(function () {
                if ("string" === n)
                  for (
                    var t, i = 0, r = q(this), a = e.match(ue) || [];
                    (t = a[i++]);

                  )
                    r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else
                  (n !== fe && "boolean" !== n) ||
                    (this.className &&
                      q._data(this, "__className__", this.className),
                    (this.className =
                      this.className || e === !1
                        ? ""
                        : q._data(this, "__className__") || ""));
              });
        },
        hasClass: function (e) {
          for (var t = " " + e + " ", n = 0, i = this.length; n < i; n++)
            if (
              1 === this[n].nodeType &&
              (" " + this[n].className + " ").replace(dt, " ").indexOf(t) >= 0
            )
              return !0;
          return !1;
        },
      }),
        q.each(
          "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
            " "
          ),
          function (e, t) {
            q.fn[t] = function (e, n) {
              return arguments.length > 0
                ? this.on(t, null, e, n)
                : this.trigger(t);
            };
          }
        ),
        q.fn.extend({
          hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e);
          },
          bind: function (e, t, n) {
            return this.on(e, null, t, n);
          },
          unbind: function (e, t) {
            return this.off(e, null, t);
          },
          delegate: function (e, t, n, i) {
            return this.on(t, e, n, i);
          },
          undelegate: function (e, t, n) {
            return 1 === arguments.length
              ? this.off(e, "**")
              : this.off(t, e || "**", n);
          },
        }),
        q.fn.extend({
          wrapAll: function (e) {
            if (q.isFunction(e))
              return this.each(function (t) {
                q(this).wrapAll(e.call(this, t));
              });
            if (this[0]) {
              var t = q(e, this[0].ownerDocument).eq(0).clone(!0);
              this[0].parentNode && t.insertBefore(this[0]),
                t
                  .map(function () {
                    for (
                      var e = this;
                      e.firstChild && 1 === e.firstChild.nodeType;

                    )
                      e = e.firstChild;
                    return e;
                  })
                  .append(this);
            }
            return this;
          },
          wrapInner: function (e) {
            return q.isFunction(e)
              ? this.each(function (t) {
                  q(this).wrapInner(e.call(this, t));
                })
              : this.each(function () {
                  var t = q(this),
                    n = t.contents();
                  n.length ? n.wrapAll(e) : t.append(e);
                });
          },
          wrap: function (e) {
            var t = q.isFunction(e);
            return this.each(function (n) {
              q(this).wrapAll(t ? e.call(this, n) : e);
            });
          },
          unwrap: function () {
            return this.parent()
              .each(function () {
                q.nodeName(this, "body") ||
                  q(this).replaceWith(this.childNodes);
              })
              .end();
          },
        }),
        (q.expr.filters.hidden = function (e) {
          return (
            (e.offsetWidth <= 0 && e.offsetHeight <= 0) ||
            (!K.reliableHiddenOffsets() &&
              "none" === ((e.style && e.style.display) || q.css(e, "display")))
          );
        }),
        (q.expr.filters.visible = function (e) {
          return !q.expr.filters.hidden(e);
        });
      var ft = /%20/g,
        pt = /\[\]$/,
        ht = /\r?\n/g,
        gt = /^(?:submit|button|image|reset|file)$/i,
        vt = /^(?:input|select|textarea|keygen)/i;
      (q.param = function (e, t) {
        var n,
          i = [],
          r = function (e, t) {
            (t = q.isFunction(t) ? t() : null == t ? "" : t),
              (i[i.length] =
                encodeURIComponent(e) + "=" + encodeURIComponent(t));
          };
        if (
          (void 0 === t && (t = q.ajaxSettings && q.ajaxSettings.traditional),
          q.isArray(e) || (e.jquery && !q.isPlainObject(e)))
        )
          q.each(e, function () {
            r(this.name, this.value);
          });
        else for (n in e) V(n, e[n], t, r);
        return i.join("&").replace(ft, "+");
      }),
        q.fn.extend({
          serialize: function () {
            return q.param(this.serializeArray());
          },
          serializeArray: function () {
            return this.map(function () {
              var e = q.prop(this, "elements");
              return e ? q.makeArray(e) : this;
            })
              .filter(function () {
                var e = this.type;
                return (
                  this.name &&
                  !q(this).is(":disabled") &&
                  vt.test(this.nodeName) &&
                  !gt.test(e) &&
                  (this.checked || !Ee.test(e))
                );
              })
              .map(function (e, t) {
                var n = q(this).val();
                return null == n
                  ? null
                  : q.isArray(n)
                  ? q.map(n, function (e) {
                      return { name: t.name, value: e.replace(ht, "\r\n") };
                    })
                  : { name: t.name, value: n.replace(ht, "\r\n") };
              })
              .get();
          },
        }),
        (q.parseHTML = function (e, t, n) {
          if (!e || "string" != typeof e) return null;
          "boolean" == typeof t && ((n = t), (t = !1)), (t = t || ie);
          var i = ee.exec(e),
            r = !n && [];
          return i
            ? [t.createElement(i[1])]
            : ((i = q.buildFragment([e], t, r)),
              r && r.length && q(r).remove(),
              q.merge([], i.childNodes));
        }),
        (i = []),
        (r = function () {
          return q;
        }.apply(t, i)),
        !(void 0 !== r && (e.exports = r));
      var _t = n.jQuery,
        mt = n.$;
      return (
        (q.noConflict = function (e) {
          return (
            n.$ === q && (n.$ = mt), e && n.jQuery === q && (n.jQuery = _t), q
          );
        }),
        typeof a === fe && (n.jQuery = n.$ = q),
        q
      );
    });
  },
  function (e, t, n) {
    var i = n(23),
      r = n(40),
      a = "optimizelyDataApi";
    (t.registerFunction = function (e, t) {
      var n = r.getGlobal(a);
      n || ((n = {}), r.setGlobal(a, n)), n[e] || (n[e] = t);
    }),
      (t.unregisterFunction = function (e) {
        var t = r.getGlobal(a);
        t &&
          t[e] &&
          (t[e] = function () {
            i.log(
              'Ignoring attempt to call "' +
                a +
                "." +
                e +
                '" which has been unregistered.'
            );
          });
      }),
      (t.getFunction = function (e) {
        return r.getGlobal(a)[e];
      });
  },
  function (e, t, n) {
    var i = n(80),
      r = n(23),
      a = n(91);
    (t.addScriptAsync = function (e, t) {
      var n = i.querySelector("head"),
        a = i.createElement("script");
      (a.type = "text/javascript"),
        (a.async = !0),
        (a.src = e),
        t && (a.onload = t),
        n.insertBefore(a, n.firstChild),
        r.debug("Asynchronously requesting " + e);
    }),
      (t.addScriptSync = function (e, n) {
        try {
          var o =
            "optimizely_synchronous_script_" + Math.floor(1e5 * Math.random());
          if (e.indexOf('"') !== -1)
            return void r.error("Blocked attempt to load unsafe script: " + e);
          i.write('<script id="' + o + '" src="' + e + '"></script>');
          var s = i.querySelector("#" + o);
          if (!s) throw new Error("Document.write failed to append script");
          (s.onload = n),
            (s.onerror = function (i) {
              r.warn("Failed to load script (" + e + ") synchronously:", i),
                t.addScriptAsync(e, n);
            });
        } catch (i) {
          r.debug("Document.write failed for " + e + ": " + i.message);
          var u = function (e) {
            var t = new Function(e.responseText);
            t(), n && n();
          };
          return a
            .request({
              url: e,
              async: !1,
              contentType: "text/plain",
              success: u,
            })
            ["catch"](function (i) {
              r.error(
                "Failed to load " + e + " via synchronous XHR: " + i.message
              ),
                t.addScriptAsync(e, n);
            });
        }
      });
  },
  function (e, t, n) {
    function i() {
      var e = null;
      D.isNumber(e) && 0 === _e.getCount()
        ? (Q.log(
            "Activating after delay of",
            e,
            "ms because no Experiments are running"
          ),
          q.dispatch(x.SET_RUM_DATA, { data: { activateDfd: !0 } }),
          ce.setTimeout(P.emitActivateEvent, e))
        : P.emitActivateEvent();
    }
    function r(e) {
      Ce.handleError(e.data.error, e.data.metadata);
    }
    function a() {
      D.isArray(window.optimizely) &&
        (window.optimizely = D.filter(window.optimizely, function (e) {
          var t = !0;
          return !Re.push(e, t);
        }));
    }
    function o() {
      var e = n(85),
        i = !!ue.getCurrentId(),
        r = !!i && ue.hasSomeData();
      i
        ? r
          ? Q.log("xd / Existing visitor; has data on this origin")
          : Q.log("xd / Existing visitor; new to this origin")
        : Q.log("xd / New visitor");
      var a = ge.getAccountId(),
        o = "https://a3732210624.cdn.optimizely.com".replace(
          "__SUBDOMAIN__",
          "a" + a + "."
        ),
        u = "/client_storage/a" + a + ".html";
      e.subscribe(function (e, t) {
        ue.checkKeyForVisitorId(e) && $.setItem(e, t);
      });
      var c = e
        .fetchAll()
        .then(function (t) {
          if (!be.getVisitorIdLocator()) {
            var n = De.getCanonicalOrigins();
            if (n) {
              var i = e.getXDomainUserId(t, n);
              i &&
                (Q.log("Syncing cross-origin visitor randomId:", i),
                ue.maybePersistVisitorId({ randomId: i }));
            }
          }
          return ue.deleteOldForeignData(), t;
        })
        .then(t.persistItemsWithId)
        .then(
          function (e) {
            if ((ue.loadForeignData(), i && !r)) {
              var t = !D.isEmpty(e);
              Q.debug("xd / Loaded foreign data? ", t), s(t);
            }
            Q.log("Loaded visitor data from foreign origins"),
              P.emitOriginsSyncedEvent();
          },
          function (e) {
            throw (
              (i &&
                !r &&
                (Q.debug("xd / Failed to load foreign data:", e), s(!1, e)),
              e)
            );
          }
        );
      return ne.all([
        e.load(o, u)["catch"](function (e) {
          throw (
            (Q.debug("xd / Failed to load iframe:", e), i && !r && s(!1, e), e)
          );
        }),
        c["catch"](function (e) {
          Q.debug(
            "xd / Ignored error syncing foreign data (expected if waitForOriginSync used):",
            e.message
          ),
            Q.debug("xd / Enqueuing sync to happen after visitorId set."),
            q.dispatch(x.ADD_CLEANUP_FN, {
              lifecycle: H.Lifecycle.postVisitorProfileLoad,
              cleanupFn: P.emitOriginsSyncedEvent,
            });
        }),
      ]);
    }
    function s(e, t) {
      q.dispatch(x.SET_RUM_DATA, {
        data: { extras: { xdAttempt: e, xdError: t ? t.toString() : void 0 } },
      });
    }
    function u(e) {
      var t = Te.getVisitorProfile();
      return ue.populateEagerVisitorData(e, t);
    }
    function c(e, t, n) {
      e = e || [];
      var i = ye.getAllPlugins(H.PluginTypes.visitorProfileProviders),
        r = ge.getGlobalHoldbackThreshold(),
        a = Te.getVisitorProfile();
      ue.populateLazyVisitorData(i, a);
      var o = be.getBucketingId();
      if (!o) throw new Error("bucketingId not set");
      var s,
        u = Te.getVisitorProfile();
      if (t && !Le) {
        var c = we.getVariationIdMap();
        s = c[t.id];
      }
      var l = {
        bucketingId: o,
        visitorProfile: u,
        audiences: e,
        globalHoldback: r,
        preferredVariationMap: s,
        layer: t,
      };
      return t && n && U.isPageIdRelevant(t)
        ? D.map(n, function (e) {
            return U.createTicket(D.extend({}, l, { pageId: e }));
          })
        : [U.createTicket(l)];
    }
    function l(e) {
      return {
        bucketingId: be.getBucketingId(),
        preferredLayerId: we.getPreferredLayerMap()[e.id],
      };
    }
    function d(e) {
      var n = _e.getAllByPageIds(e),
        i = he.getForceVariationIds(),
        r = he.getForceAudienceIds(),
        a = !D.isEmpty(i);
      a && Q.log("Force variations are in use. Disabling mutual exclusivity.");
      var o = a
        ? { individual: n }
        : D.reduce(
            n,
            function (e, t) {
              return (
                t.groupId
                  ? e.groups[t.groupId] ||
                    (e.groups[t.groupId] = ve.get(t.groupId))
                  : e.individual.push(t),
                e
              );
            },
            { groups: {}, individual: [] }
          );
      Q.log("Deciding Campaigns/Experiments for Page(s)", e);
      var s = D.map(o.groups, W.description).join(", ");
      Q.log("Groups:", s);
      var u = D.map(o.individual, X.description).join(", ");
      Q.log("Campaigns/Experiments not in Groups (by Campaign id):", u);
      var c = D.map(o.groups, D.partial(f, i, r, e)) || [],
        l = D.map(o.individual, function (n) {
          var a = D.filter(n.pageIds, D.partial(D.includes, e));
          return t.decideAndExecuteLayerASAP(i, r, a, n);
        }),
        d = c.concat(l);
      return ne.all(d).then(function (t) {
        var n = D.filter(t, function (e) {
          return !!e;
        });
        return (
          Q.log(
            "All Campaigns/Experiments for Page(s) (by Campaign id)",
            e,
            "resolved:",
            D.map(n, X.description).join(", ")
          ),
          n
        );
      });
    }
    function f(e, n, i, r) {
      try {
        var a = l(r),
          o = U.decideGroup(r, a);
        if (o.reason)
          return (
            Q.debug(
              "Not activating Group",
              W.description(r),
              "; reason:",
              o.reason
            ),
            Ie.getSampleRum() &&
              q.dispatch(x.RECORD_LAYER_FEATURE_USAGE, {
                feature: "mutex",
                entityId: r.id,
              }),
            ne.resolve()
          );
        var s = _e.get(o.layerId);
        if (!s)
          return (
            Q.debug(
              "Visitor was bucketed into a Campaign (" +
                o.layerId +
                ") which is not in this snippet"
            ),
            ne.resolve()
          );
        var u = D.filter(s.pageIds, D.partial(D.includes, i));
        return D.isEmpty(u)
          ? (Q.debug(
              "Not activating Group",
              W.description(r),
              "; reason: visitor was bucketed into a Campaign/Experiment not related to the currently-activating Page(s)"
            ),
            ne.resolve())
          : (Ie.getSampleRum() &&
              q.dispatch(x.RECORD_LAYER_FEATURE_USAGE, {
                feature: "mutex",
                entityId: r.id,
              }),
            t.decideAndExecuteLayerASAP(e, n, u, s));
      } catch (e) {
        return (
          Q.error(
            "Error getting decision for Group",
            W.description(r),
            "; ",
            e
          ),
          ne.reject(e)
        );
      }
    }
    function p(e, t, n, i) {
      return new ne(function (r, a) {
        try {
          m(i, e, t, n, function (a) {
            D.each(a, function (r) {
              var a = r.pageId ? [r.pageId] : n;
              Q.debug(
                "Deciding layer: ",
                i,
                "with decisionTicket: ",
                r,
                "and actionViewIds: ",
                a
              ),
                h(i, e, t, a, r);
            }),
              r(i);
          });
        } catch (e) {
          Q.error(
            "Error getting decision for Campaign: " + X.description(i),
            e
          ),
            a(e);
        }
      });
    }
    function h(e, n, i, r, a) {
      var o = X.description(e);
      Q.log("Activating Campaign", o, "on Page(s)", r),
        i.length &&
          (Q.log("Applying force audienceIds:", i, "to Campaign", o),
          (a = D.cloneDeep(a)),
          (a.audienceIds = i));
      var s = t.decideLayer(e, a, n),
        u = !(!n.length && !i.length),
        c = t.getActionsForDecision(e, s, u),
        l = w(c.actions, r);
      if (
        (c.maybeExecute && g(l, e, s, r),
        D.forEach(r, function () {
          L.trackDecisionEvent(s, a);
        }),
        P.emitLayerDecided({ layer: e, decisionTicket: a, decision: s }),
        s.error)
      )
        throw s.error;
      if (Ie.getSampleRum()) {
        q.dispatch(x.RECORD_LAYER_POLICY_USAGE, {
          policy: e.policy,
          layerId: e.id,
        });
        var d = _(c.actions);
        q.dispatch(x.RECORD_CHANGE_TYPE_USAGE, {
          changeTypes: D.keys(d),
          layerId: e.id,
        }),
          D.isEmpty(e.integrationSettings) ||
            q.dispatch(x.RECORD_INTEGRATION_USAGE, {
              integrations: X.getIntegrationTypes(e),
              layerId: e.id,
            });
      }
      return U.isInCohort(s)
        ? void (c.maybeExecute && v(l, e, s, r))
        : void Q.log(
            "Not activating Campaign: " +
              X.description(e) +
              "; not in the cohort because:",
            s.reason
          );
    }
    function g(e, t, n, i) {
      var r = X.description(t);
      Q.log("Preparing actions", e, "for Campaign", r, "on Page(s)", i),
        D.forEach(e, O.prepareAction);
    }
    function v(e, t, n, i) {
      var r = X.description(t);
      return (
        Q.log("Executing actions", e, "for Campaign", r, "on Page(s)", i),
        ne
          .all(
            D.map(e, function (e) {
              return O.executePreparedAction(e).then(
                D.partial(P.emitActionAppliedEvent, e)
              );
            })
          )
          .then(function () {
            Q.log("All page actions for", n, "applied:", e),
              P.emitActionsForDecisionAppliedEvent(n, e);
          })
          ["catch"](function (e) {
            Q.warn(
              "Error evaluating page actions for decision",
              n,
              "because:",
              e
            );
          })
      );
    }
    function _(e) {
      var t = {};
      return (
        D.each(e, function (e) {
          D.each(e.changeSet, function (e) {
            t[e.type] || (t[e.type] = !0);
          });
        }),
        t
      );
    }
    function m(e, t, n, i, r) {
      if (t.length || n.length) return void r(c([], void 0, i));
      var a = X.relatedAudienceIds(e),
        o = D.reduce(
          a,
          function (e, t) {
            var n = de.get(t);
            return n && e.push(n), e;
          },
          []
        ),
        s = ye.getAllPlugins(H.PluginTypes.audienceMatchers);
      if (Ie.getSampleRum()) {
        var u = {};
        if (
          (D.each(o, function (e) {
            D.extend(u, E(e.conditions, s));
          }),
          !D.isEmpty(u))
        ) {
          var l = D.keys(u);
          q.dispatch(x.RECORD_AUDIENCE_USAGE, {
            audienceTypes: l,
            layerId: e.id,
          });
        }
      }
      T(o, s, X.getActivationTimeout(e), function () {
        var t = c(o, e, i);
        D.map(t, function (t) {
          y(t, o, e);
        }),
          r(t);
      });
    }
    function E(e, t) {
      var n = {};
      return (
        D.each(e, function (e) {
          D.isArray(e)
            ? D.extend(n, E(e, t))
            : D.isObject(e) && t[e.type] && (n[e.type] = !0);
        }),
        n
      );
    }
    function y(e, t, n) {
      var i = D.map(e.audienceIds, D.bind(de.get, de)),
        r = D.filter(t, function (t) {
          return !D.includes(e.audienceIds, t.id);
        });
      Q.log(
        "When deciding Campaign",
        X.description(n),
        "visitor is in audiences:",
        I(i),
        "and not in audiences:",
        I(r)
      );
    }
    function I(e) {
      var t = [];
      return (
        D.each(e, function (e) {
          t.push(e.name, e);
        }),
        t
      );
    }
    function T(e, t, n, i) {
      var r = D.reduce(
          e,
          function (e, n) {
            return D.extend(
              e,
              k.requiredAudienceFieldsForConditions(n.conditions, t)
            );
          },
          {}
        ),
        a = D.reduce(
          r,
          function (e, t) {
            if (D.isUndefined(ue.getAttribute(t))) {
              var n = ue.getPendingAttributeValue(t);
              D.isUndefined(n) || e.push(n);
            }
            return e;
          },
          []
        );
      if (0 === a.length) return i();
      var o = [].concat(e),
        s = ie.firstToResolve(
          D.map(a, function (e) {
            return ne.resolve(e).then(function () {
              var e = Te.getVisitorProfile();
              if (
                ((o = D.filter(o, function (n) {
                  return D.isUndefined(k.isInAudience(e, n, t));
                })),
                !D.isEmpty(o))
              )
                throw new Error("At least one audience is still pending");
            });
          })
        );
      ne.race([
        s,
        new ne(function (e, t) {
          ce.setTimeout(t, n);
        }),
      ]).then(
        function () {
          Q.log("Activating Campaign after pending Audiences resolved", e), i();
        },
        function () {
          Q.log("Activating Campaign after timeout on Audiences", e), i();
        }
      );
    }
    function S(e, t, n) {
      var i,
        r = X.description(e);
      return (
        (i = n.length ? U.getDummyLayerDecision(e, n) : U.decideLayer(e, t)),
        Q.log("Recording decision for Campaign", r, t, "->", i),
        X.recordLayerDecision(e.id, t, i),
        Le ||
          (i.variationId &&
            i.experimentId &&
            ue.updateVariationIdMap(e.id, i.experimentId, i.variationId),
          e.groupId && ue.updatePreferredLayerMap(e.groupId, e.id)),
        i
      );
    }
    function A(e) {
      var t = pe.getCleanupFns(e);
      if (t.length > 0) {
        for (; t.length > 0; ) t.shift()();
        q.dispatch(x.CLEAR_CLEANUP_FN, { lifecycle: e });
      }
    }
    function b(e, t, n) {
      var i = X.description(e),
        r = "NOT applying changes for Campaign",
        a = { actions: [], maybeExecute: !1 };
      return (
        (a.actions = [].concat(
          fe.getLayerActions(t.layerId) || [],
          fe.getExperimentActions(t.experimentId) || [],
          fe.getExperimentVariationActions(t.experimentId, t.variationId) || []
        )),
        !n && ge.isGlobalHoldback()
          ? (Q.log(r, i, "(visitor is in global holdback)"), a)
          : t.isLayerHoldback
          ? (Q.log(r, i, "(visitor is in layer holdback)"), a)
          : t.experimentId && t.variationId
          ? ((a.maybeExecute = !0),
            Q.log("Got Actions for Campaign:", i, a.actions),
            a)
          : (Q.log(r, i, "(visitor is not eligible for any Experiments)"), a)
      );
    }
    function w(e, t) {
      return D.filter(e, function (e) {
        return D.isUndefined(e.pageId) || D.includes(t, e.pageId);
      });
    }
    var D = n(2),
      R = n(76).create,
      C = (t.ActivationCodeError = R("ActivationCodeError")),
      N = (t.ProjectJSError = R("ProjectJSError")),
      O = n(135),
      x = n(7),
      L = n(110),
      P = n(117),
      k = n(139),
      V = n(86),
      F = n(109),
      M = n(24),
      U = n(140),
      G = n(16),
      B = n(118),
      j = n(80),
      H = n(25),
      z = n(87),
      K = n(111),
      Y = n(145),
      q = n(9),
      W = n(144),
      X = n(113),
      $ = n(81).LocalStorage,
      Q = n(23),
      J = n(146),
      Z = n(83),
      ee = n(122),
      te = n(88),
      ne = n(12).Promise,
      ie = n(147),
      re = n(114),
      ae = n(116),
      oe = n(137),
      se = n(123),
      ue = n(74),
      ce = n(40),
      G = n(16),
      le = G.get("stores/session"),
      de = G.get("stores/audience_data"),
      fe = G.get("stores/action_data"),
      pe = G.get("stores/cleanup"),
      he = G.get("stores/directive"),
      ge = G.get("stores/global"),
      ve = G.get("stores/group_data"),
      _e = G.get("stores/layer_data"),
      me = G.get("stores/layer"),
      Ee = G.get("stores/pending_events"),
      ye = G.get("stores/plugins"),
      Ie = G.get("stores/rum"),
      Te = G.get("stores/visitor"),
      Se = G.get("stores/view_data"),
      Ae = G.get("stores/view"),
      be = G.get("stores/visitor_id"),
      we = G.get("stores/visitor_bucketing"),
      De = G.get("stores/xdomain"),
      Re = n(93),
      Ce = n(120),
      Ne = n(1),
      Oe = 1e3,
      xe = !1,
      Le = !1,
      Pe = !1,
      ke = Le || Pe,
      Ve = 1e3,
      Fe = t;
    (t.initialize = function (e) {
      var n = e.clientData;
      if (
        (F.normalizeClientData(e.clientData),
        z.on({ filter: { type: "error" }, handler: r }),
        q.dispatch(x.DATA_LOADED, { data: n }),
        Q.log("Initialized with DATA:", n),
        a(),
        B.setOptOut(he.shouldOptOut()),
        he.isDisabled() || he.shouldOptOut())
      )
        return void Q.log("Controller / Is disabled");
      if (
        (Ne.queueBeacons(),
        j.isReady()
          ? q.dispatch(x.SET_DOMCONTENTLOADED)
          : j.addReadyHandler(function () {
              q.dispatch(x.SET_DOMCONTENTLOADED);
            }),
        !ke)
      ) {
        Z.time("projectJS");
        var o = ge.getProjectJS();
        if (D.isFunction(o))
          try {
            Y.apply(o);
          } catch (e) {
            Q.error("Error while executing projectJS: ", e),
              V.emitError(new N(e));
          }
        Z.timeEnd("projectJS");
      }
      D.each(e.plugins || [], function (e) {
        try {
          e(ee);
        } catch (e) {
          V.emitInternalError(e);
        }
      }),
        D.each(ge.getPlugins() || [], function (e) {
          try {
            Y.apply(e, [ee]);
          } catch (e) {
            V.emitError(e);
          }
        }),
        re.load();
      var s = z.on({
        filter: { type: "lifecycle", name: "activated" },
        handler: function () {
          Te.observe(ue.persistVisitorProfile),
            me.observe(ue.persistLayerStates),
            le.observe(ue.persistSessionState),
            Ee.observe(J.persistPendingEvents),
            Le || we.observe(ue.persistVisitorBucketingStore),
            z.off(s);
        },
      });
      z.on({
        filter: { type: "lifecycle", name: "viewsActivated" },
        handler: t.onViewsActivated,
      }),
        z.on({
          filter: { type: "lifecycle", name: "pageDeactivated" },
          handler: t.onPageDeactivated,
        }),
        t.initializeApi();
      var u = J.getPendingEvents();
      if (
        (u &&
          (q.dispatch(x.LOAD_PENDING_EVENTS, { events: u }),
          J.retryPendingEvents(u)),
        z.on({
          filter: { type: "lifecycle", name: "activate" },
          handler: t.activate,
        }),
        P.emitInitializedEvent(),
        !he.shouldActivate())
      )
        return ne.resolve();
      var c = [];
      if (De.isDisabled()) i();
      else {
        var l = t.initializeXDomainStorage();
        c.push(l);
        var d = Boolean(De.getCanonicalOrigins());
        if (d) {
          var f = ae.makeTimeoutPromise(Ve);
          ne.race([l, f])
            ["catch"](function (e) {
              Q.error("Failed to initialize xDomain storage: ", e);
            })
            .then(i)
            ["catch"](Ce.handleError);
        } else i();
      }
      return ne.all(c);
    }),
      (t.activate = function () {
        try {
          var e = [];
          Q.log("Activated client"), A(H.Lifecycle.preActivate);
          var t = M.now();
          q.dispatch(x.ACTIVATE, {
            activationId: String(t),
            activationTimestamp: t,
          });
          var n = Se.getAll();
          se.registerViews(n),
            ue.setId(ue.getOrGenerateId()),
            e.push(L.trackPostRedirectDecisionEvent()),
            q.dispatch(x.MERGE_VARIATION_ID_MAP, {
              variationIdMap: ue.getVariationIdMap(),
            }),
            q.dispatch(x.MERGE_PREFERRED_LAYER_MAP, {
              preferredLayerMap: ue.getPreferredLayerMap(),
            }),
            A(H.Lifecycle.postVisitorProfileLoad),
            e.push(
              u(ye.getAllPlugins(H.PluginTypes.visitorProfileProviders)).then(
                function () {
                  Q.log("Populated visitor profile");
                }
              )
            );
          var i = c(),
            r = U.decideGlobal(i);
          Q.log("Made global decision", i, "->", r),
            q.dispatch(x.RECORD_GLOBAL_DECISION, r);
          var a = L.trackClientActivation();
          a
            ? Q.log("Tracked activation event", a)
            : Q.log("Not tracking activation event");
          var o = Fe.setUpViewActivation(n),
            s = [];
          return (
            xe
              ? (s = se.activateMultiple(o))
              : D.each(o, function (e) {
                  s = s.concat(se.activateMultiple([e]));
                }),
            Le &&
              Ie.getSampleRum() &&
              q.dispatch(x.RECORD_VIEWS_INITIALLY_ACTIVATED_COUNT, {
                viewsInitiallyActivatedCount: s.length,
              }),
            A(H.Lifecycle.postViewsActivated),
            A(H.Lifecycle.postActivate),
            P.emitActivatedEvent(),
            ne.all(e).then(function () {
              z.emit({ type: K.TYPES.LIFECYCLE, name: "activateDeferredDone" }),
                Q.log("All immediate effects of activation resolved");
            }, V.emitError)
          );
        } catch (e) {
          return V.emitError(e), ne.reject(e);
        }
      }),
      (Fe.setUpViewActivation = function (e) {
        var t = [];
        return (
          D.each(e, function (e) {
            D.isBoolean(Ae.getViewState(e.id).isActive) &&
            se.isActivationTypeImmediate(e.activationType)
              ? Q.debug(
                  "Skipping page: already evaluated, presumably at the edge",
                  se.description(e)
                )
              : se.shouldTriggerImmediately(e.activationType)
              ? t.push(e)
              : e.activationType === H.ViewActivationTypes.callback
              ? (Q.debug(
                  "Setting up conditional activation for Page",
                  se.description(e)
                ),
                Fe.activateViewOnCallback(e))
              : e.activationType === H.ViewActivationTypes.polling
              ? (Q.debug(
                  "Setting up polling activation for Page",
                  se.description(e)
                ),
                te
                  .pollFor(
                    D.partial(Y.apply, e.activationCode),
                    null,
                    D.partial(oe.isTimedOut, M.now())
                  )
                  .then(function () {
                    se.activateMultiple([e]);
                  })
                  ["catch"](function (t) {
                    Q.warn("Failed to activate view ", e, t);
                  }))
              : e.activationType !== H.ViewActivationTypes.manual &&
                V.emitError(
                  new Error("Unknown view activationType: " + e.activationType)
                );
          }),
          t
        );
      }),
      (Fe.activateViewOnCallback = function (e) {
        var t = function (t) {
            var n = D.extend({}, t, { pageName: e.apiName, type: "page" });
            Re.push(n);
          },
          n = { pageId: e.id };
        Object.defineProperty(n, "isActive", {
          get: function () {
            return Ae.isViewActive(e.id);
          },
        });
        try {
          Y.apply(e.activationCode, [t, n]);
        } catch (t) {
          var i = new C(
            "(" + t.toString() + ") in activationCode for " + se.description(e)
          );
          V.emitError(i, { originalError: t, userError: !0 });
        }
      }),
      (t.onViewsActivated = function (e) {
        var t,
          n = e.data.views,
          i = D.map(n, "id");
        try {
          if (!be.getBucketingId())
            throw new Error("View activated with no visitorId set");
          var r = d(i)["catch"](V.emitError);
          return (
            (t = ne.all(
              D.map(n, function (e) {
                var t = function () {
                  se.parseViewTags(e);
                  var t = L.trackViewActivation(e);
                  t
                    ? Q.log("Tracked activation for Page", se.description(e), t)
                    : Q.log(
                        "Not Tracking activation for Page",
                        se.description(e)
                      );
                };
                return j.isReady()
                  ? ne.resolve(t())
                  : te.pollFor(j.isReady, Oe).then(t);
              })
            )),
            ne.all([r, t])
          );
        } catch (e) {
          V.emitError(e);
        }
      }),
      (t.onPageDeactivated = function (e) {
        var t = e.data.page,
          n = fe.getAllActionIdsByPageId(t.id);
        D.each(n, function (e) {
          var n = fe.getActionState(e);
          n &&
            (D.each(n, function (e, n) {
              if (e.cancel)
                try {
                  e.cancel(),
                    Q.debug(
                      "Controller / Canceled change",
                      n,
                      "observation due to deactivation of page:",
                      t
                    );
                } catch (e) {
                  Q.error(
                    "Controller / Error canceling change",
                    n,
                    "observation upon deactivation of page.",
                    e
                  );
                }
              if (t.undoOnDeactivation && e.undo)
                try {
                  e.undo(),
                    Q.debug(
                      "Controller / Undid change",
                      n,
                      "due to deactivation of page:",
                      t
                    );
                } catch (e) {
                  Q.error(
                    "Controller / Error undoing change upon deactivation of page.",
                    e
                  );
                }
            }),
            q.dispatch(x.REMOVE_ACTION_STATE, { actionId: e }),
            Q.debug(
              "Controller / Undid changes and/or canceled change observation due to deactivation of page:",
              t,
              e
            ));
        });
      }),
      (t.initializeApi = function () {
        var e = { push: Re.push };
        Pe || (e.get = Re.get);
        var t = window.optimizely;
        D.isArray(t) &&
          D.each(t, function (t) {
            e.push(t);
          }),
          (e.data = { note: "Obsolete, use optimizely.get('data') instead" }),
          (e.state = {}),
          (window.optimizely = e);
      }),
      (t.persistItemsWithId = function (e) {
        return (
          D.each(e, function (e, t) {
            ue.checkKeyForVisitorId(t) && $.setItem(t, e);
          }),
          e
        );
      }),
      (t.initializeXDomainStorage = o),
      (t.decideAndExecuteLayerASAP = p),
      (t.decideLayer = S),
      (t.getActionsForDecision = b);
  },
  function (e, t, n) {
    function i(e, t, n) {
      var i = _.getActionState(t.id);
      if (!i)
        return void p.warn(
          "Action / Attempted to prepare change for inactive action: ",
          t
        );
      var r = _.getChangeApplier(e.id, t.id);
      if (!a.isUndefined(r))
        return void p.warn(
          "Action / Attempted to prepare a change which is already being applied: ",
          e
        );
      var s = {
        changeId: e.id,
        actionId: t.id,
        changeApplier: y.create(e, t, n),
      };
      f.dispatch(o.SET_CHANGE_APPLIER, s);
    }
    function r(e, t, n, o) {
      if (a.includes(o, t))
        return void p.error(
          "Change with id " + t + " has circular dependencies: " + o.concat(t)
        );
      if (!e[t]) {
        var c = m.getChange(t);
        if (!c) {
          var d = "Change with id " + t + " is absent";
          return (
            o.length &&
              (d += " but listed as a dependency for " + o[o.length - 1]),
            void p.warn(d)
          );
        }
        e[t] = new h(function (d) {
          var f = a.map(c.dependencies || [], function (i) {
            return r(e, i, n, o.concat([t]));
          });
          if (c.src) {
            var v = "change_" + c.src,
              E = u
                .makeAsyncRequest(v, function () {
                  return g.addScriptAsync(
                    "https://cdn.optimizely.com/public/3732210624/data" + c.src,
                    function () {
                      u.resolveRequest(v);
                    }
                  );
                })
                .then(function () {
                  var e = m.getChange(c.id);
                  e ||
                    s.emitError(
                      new T("Failed to load async change from src: " + c.src)
                    ),
                    i(e, n, l.now());
                });
            f.push(E);
          }
          h.all(f)
            .then(function () {
              var e = l.now(),
                i = _.getChangeApplier(t, n.id);
              return i
                ? (p.debug("Action / Applying change:", c),
                  i.apply().then(function (t) {
                    t
                      ? p.log(t)
                      : p.debug(
                          "Action / Applied change for the first time in " +
                            (l.now() - e) +
                            "ms:",
                          c
                        ),
                      d();
                  }))
                : (p.debug(
                    "Action / Not applying change ",
                    t,
                    " - No changeApplier found."
                  ),
                  void d());
            })
            ["catch"](function (e) {
              p.error("Action / Failed to apply change:", c, e), d();
            });
        });
      }
      return e[t];
    }
    var a = n(2),
      o = n(7),
      s = n(86),
      u = n(6),
      c = n(76).create,
      l = n(24),
      d = n(16),
      f = n(9),
      p = n(23),
      h = n(12).Promise,
      g = n(133),
      v = d.get("stores/global"),
      _ = d.get("stores/action_data"),
      m = d.get("stores/change_data"),
      E = d.get("stores/session"),
      y = n(136),
      I = n(137);
    I.initialize();
    var T = c("ActionError");
    (t.prepareAction = function (e) {
      p.debug("Action / Preparing:", e),
        f.dispatch(o.ACTION_EXECUTED, {
          actionId: e.id,
          sessionId: E.getSessionId(),
          layerId: e.layerId,
          pageId: e.pageId,
          timestamp: l.now(),
          activationId: v.getActivationId(),
        });
      var t = l.now();
      a.forEach(e.changeSet, function (n) {
        var r = a.isObject(n) ? n.id : n,
          s = m.getChange(r);
        s || (f.dispatch(o.ADD_CHANGE, n), (s = m.getChange(n.id))),
          s.src || i(s, e, t);
      });
    }),
      (t.executePreparedAction = function (e) {
        p.debug("Action / Executing:", e);
        var t = {},
          n = a.map(e.changeSet, function (n) {
            var i = a.isObject(n) ? n.id : n;
            return r(t, i, e, []);
          });
        return h.all(n).then(function () {
          p.debug("changes for action id=" + e.id + " applied");
        });
      });
  },
  function (e, t, n) {
    var i = n(13).Promise,
      r = n(24),
      a = n(16),
      o = a.get("stores/plugins"),
      s = n(25),
      u = n(23);
    t.create = function (e, t, n) {
      var a = { identifier: e.id, action: t, startTime: n || r.now() };
      try {
        var c = o.getPlugin(s.PluginTypes.changeAppliers, e.type);
        if (!c) throw new Error("Unrecognized change type " + e.type);
        return new c(e, a);
      } catch (e) {
        u.error("Change applier was never properly constructed:", e);
        var l = {
          apply: function () {
            return i.reject(e);
          },
        };
        return l;
      }
    };
  },
  function (e, t, n) {
    function i() {
      ("interactive" !== document.readyState &&
        "complete" !== document.readyState) ||
        (t.domReadyTime = Date.now());
    }
    var r = n(138),
      a = n(16).get("stores/directive");
    (t.domReadyTime = null),
      (t.initialize = function () {
        i(), document.addEventListener("readystatechange", i, !0);
      }),
      (t.isTimedOut = function (e) {
        var n = Date.now();
        if (!t.domReadyTime || !e) return !1;
        var i = Math.max(e, t.domReadyTime);
        return (
          a.isEditor() && (i = t.domReadyTime),
          !(n - i < r.SELECTOR_POLLING_MAX_TIME)
        );
      });
  },
  function (e, t) {
    e.exports = {
      SELECTOR_POLLING_MAX_TIME: 2e3,
      CHANGE_DATA_KEY: "optimizelyChangeData",
      CHANGE_ID_ATTRIBUTE_PREFIX: "data-optly-",
    };
  },
  function (e, t, n) {
    function i(e, t) {
      return function (n) {
        var i = n.type,
          a = t[i];
        if (!a) throw new Error("Audience / No matcher found for type=" + i);
        if (a.fieldsNeeded)
          for (var s = r(a.fieldsNeeded, n), l = 0; l < s.length; l++) {
            var d = s[l],
              f = u.getFieldValue(e, d);
            if (o.isUndefined(f))
              return void c.debug(
                "Audience / Required field",
                d,
                "for type",
                i,
                "has no value"
              );
          }
        c.debug("Matching condition:", n, "to values:", e);
        var p = a.match(e, n);
        if (!o.isUndefined(p)) return !!p;
      };
    }
    function r(e, t) {
      var n = "function" == typeof e ? e(t) : e;
      return (
        o.isString(n) && (n = [n]),
        o.isArray(n)
          ? n
          : (c.warn("Couldn't determine fieldsNeeded for matcher; assuming []"),
            [])
      );
    }
    function a(e) {
      return e.name ? e.name + " (" + e.id + ")" : e.id;
    }
    var o = n(2),
      s = n(124),
      u = n(19),
      c = n(23),
      l = n(74);
    (t.isInAudience = function (e, t, n) {
      var r = i(e, n);
      c.groupCollapsed("Checking audience", t.name, t.id, t),
        c.debug("Visitor Profile:", e);
      var o;
      try {
        var u = s.evaluate(t.conditions, r);
      } catch (e) {
        (o = e), (u = !1);
      }
      return (
        c.groupEnd(),
        o && c.error("Audience / Error evaluating audience", a(t), ":", o),
        c.log("Is " + (u ? "in" : "NOT in") + " audience:", a(t)),
        u
      );
    }),
      (t.requiredAudienceFieldsForConditions = function e(t, n) {
        var i = {};
        return (
          o.each(t, function (t) {
            if (o.isArray(t)) o.extend(i, e(t, n));
            else if (o.isObject(t)) {
              var a = n[t.type];
              if (a) {
                var s = r(a.fieldsNeeded, t);
                o.each(s, function (e) {
                  i[l.serializeFieldKey(e)] = e;
                });
              }
            }
          }),
          i
        );
      });
  },
  function (e, t, n) {
    function i(e, t) {
      E.debug("Decision / Deciding layer for group: ", _.description(e));
      var n,
        i,
        r = t.preferredLayerId,
        a = !!r;
      try {
        (n = d.chooseWeightedCandidate(
          t.bucketingId,
          e.id,
          e.weightDistributions
        )),
          (n && "None" !== n) ||
            (i =
              'Group traffic allocation. Visitor maps to a "hole" in the bucket space left by an experiment or campaign that\'s since been removed from the group');
      } catch (e) {
        i =
          "Group traffic allocation. Visitor maps to a point in the bucket space which has never been covered by any experiment or campaign.";
      }
      if (
        (a &&
          (E.debug(
            "Decision / Using preferredLayerMap to select layer for group:",
            _.description(e)
          ),
          r !== n &&
            (v.dispatch(u.RECORD_STICKY_BUCKETING_FEATURE, {
              feature: "preferredLayer",
              id: e.id,
            }),
            (n = r))),
        i)
      )
        return { layerId: null, reason: i };
      if (!s.find(e.weightDistributions, { entityId: n })) {
        var o = a ? " sticky-" : " non-sticky ",
          c =
            "Visitor was" +
            o +
            "bucketed into a campaign (" +
            n +
            ") which is not in the group";
        if (!a) throw new p(c);
        return { layerId: null, reason: c };
      }
      return { layerId: n };
    }
    function r(e, t) {
      for (var n = 0; n < e.experiments.length; n++)
        for (var i = 0; i < e.experiments[n].variations.length; i++)
          if (t.indexOf(e.experiments[n].variations[i].id) > -1)
            return {
              experimentId: e.experiments[n].id,
              variationId: e.experiments[n].variations[i].id,
            };
      return null;
    }
    function a(e) {
      var t = I.getPlugin(g.PluginTypes.deciders, e);
      if (s.isEmpty(t)) throw new Error("No deciders found for policy: " + e);
      return t;
    }
    function o(e, t) {
      var n = I.getAllPlugins(g.PluginTypes.audienceMatchers);
      return s.reduce(
        t,
        function (t, i) {
          return l.isInAudience(e, i, n) && t.push(i.id), t;
        },
        []
      );
    }
    var s = n(2),
      u = n(7),
      c = n(86),
      l = n(139),
      d = n(141),
      f = n(142),
      p = n(143).DecisionError,
      h = n(16),
      g = n(25),
      v = n(9),
      _ = n(144),
      m = n(113),
      E = n(23),
      y = n(44),
      I = h.get("stores/plugins"),
      T = h.get("stores/global"),
      S = h.get("stores/layer_data");
    (t.isPageIdRelevant = function (e) {
      if (!e) return !1;
      var t = a(e.policy);
      return s.isFunction(t.includePageIdInDecisionTicket)
        ? t.includePageIdInDecisionTicket(e)
        : t.includePageIdInDecisionTicket === !0;
    }),
      (t.createTicket = function (e) {
        var t = s.pick(e, [
          "bucketingId",
          "globalHoldback",
          "preferredVariationMap",
          "pageId",
        ]);
        return (
          s.extend(t, {
            audienceIds: o(e.visitorProfile, e.audiences),
            activationId: T.getActivationId(),
          }),
          t
        );
      }),
      (t.decideGlobal = function (e) {
        var t = d.isHoldback(e.bucketingId, {
          id: null,
          holdback: e.globalHoldback,
        });
        return { isGlobalHoldback: t };
      }),
      (t.decideGroup = i),
      (t.decideLayer = function (e, t) {
        E.debug("Deciding: ", e, t);
        var n,
          i,
          r = a(e.policy),
          o = {
            layerId: e.id,
            experimentId: null,
            variationId: null,
            isLayerHoldback: d.isHoldback(t.bucketingId, e),
          };
        if (s.isEmpty(e.experiments)) throw new p("No experiments in layer.");
        try {
          if (r.decideLayer) {
            E.debug("Decision / Using decider's custom decideLayer.");
            var u = r.decideLayer(e, t);
            (n = u.experiment), (i = u.variation);
          } else
            E.debug("Decision / Using default decideLayer behavior."),
              (n = r.selectExperiment(e, t.audienceIds, t.bucketingId)),
              (i = f.selectVariation(
                n,
                t.audienceIds,
                t.bucketingId,
                t.activationId,
                t.preferredVariationMap
              ));
        } catch (e) {
          e instanceof p ? (o.reason = e.message) : (o.error = e);
        }
        return (
          (o.experimentId = n ? n.id : null),
          (o.variationId = i ? i.id : null),
          o.error &&
            ((o.error.name = "DecisionEngineError"), c.emitError(o.error)),
          o
        );
      }),
      (t.getDummyLayerDecision = function (e, t) {
        var n,
          i = r(e, t);
        return (
          i
            ? (E.log(
                "Decision / Applying force variation:",
                i.variationId,
                "to Campaign",
                m.description(e)
              ),
              (n = {
                layerId: e.id,
                variationId: i.variationId,
                experimentId: i.experimentId,
                isLayerHoldback: !1,
                reason: "force",
              }))
            : (E.log(
                "No variation matches ids:",
                t,
                "in Campaign",
                m.description(e)
              ),
              (n = {
                layerId: e.id,
                variationId: null,
                experimentId: null,
                isLayerHoldback: !1,
                reason: "force",
              })),
          n
        );
      }),
      (t.isInCohort = function (e) {
        if (!e.experimentId || !e.variationId) return !1;
        var t = S.get(e.layerId);
        return !(y.isSingleExperimentPolicy(t.policy) && e.isLayerHoldback);
      });
  },
  function (e, t, n) {
    var i = n(64),
      r = (t.TOTAL_POINTS = 1e4);
    (t.bucketingNumber = function (e, t, n) {
      var a = i.hashToInt(e + t, n, r);
      return a;
    }),
      (t.isHoldback = function (e, n) {
        return t.bucketingNumber(e, n.id, i.Seed.IGNORING) < (n.holdback || 0);
      }),
      (t.chooseWeightedCandidate = function (e, n, r) {
        for (
          var a = t.bucketingNumber(e, n, i.Seed.BUCKETING), o = 0;
          o < r.length;
          o++
        )
          if (r[o].endOfRange > a) return r[o].entityId;
        throw new Error("Unable to choose candidate");
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(7),
      a = n(141),
      o = n(124),
      s = n(143).DecisionError,
      u = n(9),
      c = n(23),
      l = "impression";
    (t.isValidExperiment = function (e, t) {
      var n,
        r = i.partial(i.includes, e);
      return (
        c.groupCollapsed(
          "Decision / Evaluating audiences for experiment:",
          t,
          e
        ),
        (n = !t.audienceIds || o.evaluate(t.audienceIds, r)),
        c.groupEnd(),
        c.debug("Decision / Experiment", t, "is valid?", n),
        n
      );
    }),
      (t.selectVariation = function (e, t, n, o, d) {
        if (!e.variations || 0 === e.variations.length)
          throw new s('No variations in selected experiment "' + e.id + '"');
        if (!e.weightDistributions && e.variations.length > 1)
          throw new s(
            'On selected experiment "' +
              e.id +
              '", weightDistributions must be defined if # variations > 1'
          );
        var f;
        if (e.bucketingStrategy && e.bucketingStrategy === l)
          if (1 === e.variations.length) f = e.variations[0].id;
          else {
            var p = o;
            f = a.chooseWeightedCandidate(n + p, e.id, e.weightDistributions);
          }
        else if (
          ((f =
            1 === e.variations.length
              ? e.variations[0].id
              : a.chooseWeightedCandidate(n, e.id, e.weightDistributions)),
          d && d[e.id])
        ) {
          c.debug(
            "Decision / Using preferredVariationMap to select variation for experiment:",
            e.id
          );
          var h = d[e.id];
          if (!i.find(e.variations, { id: h }))
            return (
              u.dispatch(r.RECORD_STICKY_BUCKETING_FEATURE, {
                feature: "stoppedVariation",
                id: e.id,
              }),
              c.debug(
                "Decision / Preferred variation:",
                h,
                "not found on experiment:",
                e.id,
                ". Visitor not bucketed."
              ),
              null
            );
          h !== f &&
            (u.dispatch(r.RECORD_STICKY_BUCKETING_FEATURE, {
              feature: "preferredVariation",
              id: e.id,
            }),
            (f = h));
        }
        var g = i.find(e.variations, { id: f });
        if (g) return c.debug("Decision / Selected variation:", g), g;
        throw new s('Unable to find selected variation: "' + f + '".');
      }),
      (t.getExperimentById = function (e, t) {
        var n = i.find(e.experiments, { id: t });
        if (n) return n;
        throw new s("Unable to find selected experiment.");
      }),
      (t.hasVariationActionsOnView = function (e, t) {
        return (
          c.debug(
            "Decision / Checking variation:",
            e,
            "for actions on pageId:",
            t
          ),
          !!i.find(e.actions, function (e) {
            return e.pageId === t && !i.isEmpty(e.changes);
          })
        );
      });
  },
  function (e, t) {
    function n(e) {
      this.message = e;
    }
    (n.prototype = new Error()), (t.DecisionError = n);
  },
  function (e, t, n) {
    function i(e) {
      return r.map(e.weightDistributions, "entityId");
    }
    var r = n(2);
    t.description = function (e) {
      var t = !!e.name,
        n = t ? '"' + e.name + '" ' : "",
        r = i(e).join(", ");
      return n + "(id " + e.id + ", campaigns: " + r + ")";
    };
  },
  function (module, exports, __webpack_require__) {
    var createError = __webpack_require__(77),
      di = __webpack_require__(16),
      Logger = __webpack_require__(23),
      CSP_MODE = !1,
      EXEC_WITH_JQUERY = !0,
      ExecError = (exports.Error = createError("ExecError"));
    (exports.apply = function (e, t) {
      (t = t || []), EXEC_WITH_JQUERY && (t = t.concat(di.get("env/jquery")));
      try {
        return e.apply(void 0, t);
      } catch (n) {
        throw (
          (Logger.warn("Error applying function", e, "with args:", t, n),
          new ExecError(n))
        );
      }
    }),
      (exports.eval = function (str) {
        if (CSP_MODE) throw new ExecError("eval is not supported in CSP mode");
        try {
          return (
            EXEC_WITH_JQUERY &&
              (str = "var $ = optimizely.get('jquery');" + str),
            eval(str)
          );
        } catch (e) {
          throw (Logger.warn("Error executing JS:", str, e), new ExecError(e));
        }
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(86),
      a = n(25),
      o = n(26),
      s = n(81).LocalStorage,
      u = n(23),
      c = n(91),
      l = n(16),
      d = l.get("stores/pending_events"),
      f = a.StorageKeys.PENDING_EVENTS;
    (t.persistPendingEvents = function () {
      try {
        var e = d.getEventsString();
        s.setItem(f, e), n(85).setItem(f, e);
      } catch (e) {
        u.warn(
          "PendingEvents / Unable to set localStorage key, error was: ",
          e
        ),
          r.emitInternalError(e);
      }
    }),
      (t.getPendingEvents = function () {
        try {
          return o.parse(s.getItem(f));
        } catch (e) {
          return null;
        }
      }),
      (t.retryPendingEvents = function (e) {
        i.forOwn(e, function (e, t) {
          c.retryableRequest(e.data, t, e.retryCount);
        }),
          i.isEmpty(e) || u.log("Retried pending events: ", e);
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(12).Promise;
    t.firstToResolve = function (e) {
      return new r(function (t) {
        i.each(e, function (e) {
          r.resolve(e).then(t, function () {});
        });
      });
    };
  },
  function (e, t, n) {
    function i(e) {
      var t = !1;
      if (
        (a.isArray(window.optimizely) &&
          a.each(window.optimizely, function (n) {
            a.isArray(n) &&
              "verifyPreviewProject" === n[0] &&
              String(n[1]) === e &&
              (t = !0);
          }),
        !t)
      )
        throw new Error("Preview projectId: " + e + " does not match expected");
    }
    function r() {
      s.on({
        filter: { type: u.TYPES.ANALYTICS, name: "trackEvent" },
        handler: f,
      }),
        s.on({
          filter: { type: u.TYPES.LIFECYCLE, name: "viewActivated" },
          handler: f,
        }),
        s.on({
          filter: { type: u.TYPES.LIFECYCLE, name: "layerDecided" },
          handler: f,
        }),
        s.on({ filter: { type: "error" }, publicOnly: !0, handler: f });
    }
    var a = n(2),
      o = n(16),
      s = n(87),
      u = n(111),
      c = n(40),
      l = o.get("stores/directive"),
      d = "optimizelyPreview",
      f = function (e) {
        var t = c.getGlobal(d);
        t.push(e);
      };
    (t.initialize = function (e) {
      l.isSlave() && i(e), r();
    }),
      (t.setupPreviewGlobal = function () {
        c.getGlobal(d) || c.setGlobal(d, []);
      }),
      (t.pushToPreviewGlobal = function (e) {
        f(e);
      });
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(150));
    };
  },
  function (e, t) {
    e.exports = {
      provides: "visitorId",
      getter: [
        "stores/visitor_id",
        function (e) {
          return e.getRandomId();
        },
      ],
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(152)),
        e.registerAudienceMatcher("behavior", n(154));
    };
  },
  function (e, t, n) {
    var i = n(153);
    e.exports = {
      provides: "events",
      isTransient: !0,
      getter: [
        function () {
          return i.getEvents();
        },
      ],
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(72),
      a = n(16),
      o = a.get("stores/visitor_events"),
      s = 1e3;
    t.getEvents = function () {
      var e = r.getEvents(),
        t = [].concat.apply([], i.values(o.getForeignEvents())),
        n = [].concat.apply([], i.values(o.getForeignEventQueues())),
        a = r.mergeAllEvents([e, t, n]);
      return a.slice(a.length - s);
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(26),
      a = n(155),
      o = n(156);
    e.exports = {
      fieldsNeeded: ["events"],
      match: function (e, t) {
        var n = [],
          s = r.parse(t.value);
        return (
          (n = i.isUndefined(s.version) ? [s] : a.buildFromSpecV0_1(s)),
          i.every(n, function (t) {
            return o.isSatisfied(t, e.events);
          })
        );
      },
    };
  },
  function (e, t, n) {
    function i(e) {
      return (e = (e || "").toString().trim()), p[e] || e;
    }
    function r(e, t, n) {
      var i = { where: t };
      if (
        (e.count && (i["limit"] = e.count),
        e.modifier === s.FREQUENCY_FILTERS.MOST_FREQUENT)
      ) {
        var r = s.getFieldKeyPathForSource(e.name, n),
          a = s.aggregate("count"),
          o = s.aggregateField("count"),
          l = s.groupField(r);
        return u.extend(i, {
          select: [{ field: l }],
          groupBy: s.groupBy([r]),
          aggregate: [a],
          orderBy: [{ field: o, direction: "DESC" }],
        });
      }
      return u.extend(i, {
        orderBy: [{ field: [c.FIELDS.TIME], direction: "DESC" }],
      });
    }
    function a(e) {
      var t = [];
      if (u.isUndefined(e)) throw new Error("rule is undefined");
      if (!u.isObject(e)) throw new Error("rule is not an Object");
      "0.2" !== e["version"] && t.push('version: not "0.2"'),
        e["filter"] &&
          (u.isArray(e["filter"])
            ? u.each(e["filter"], function (e, n) {
                var i = s.validateFieldKeyPathV0_2(
                  e["field"],
                  s.FieldPurpose.FILTER
                );
                i && t.push("filter[" + n + "]: " + i);
                var r = s.validateComparatorAndValue(
                  e["comparator"],
                  e["value"]
                );
                r && t.push("filter[" + n + "]: " + r);
              })
            : t.push("filter: not an array"));
      var n = [],
        i = [];
      if (
        (e["sort"] &&
          (e["reduce"] &&
            e["reduce"]["aggregator"] &&
            "nth" !== e["reduce"]["aggregator"] &&
            t.push(
              "sort: superfluous because we can apply aggregator " +
                l.stringify(e["reduce"]["aggregator"]) +
                " to unsorted items"
            ),
          u.isArray(e["sort"])
            ? u.each(e["sort"], function (e, r) {
                var a = s.validateFieldKeyPathV0_2(
                  e["field"],
                  s.FieldPurpose.SORT
                );
                a && t.push("sort[" + r + "]: " + a),
                  e["field"] && "frequency" === e["field"][0]
                    ? n.push(e)
                    : i.push(e);
                var u = o(e["direction"]);
                u && t.push("sort[" + r + "]: " + u);
              })
            : t.push("sort: not an array"),
          n.length &&
            i.length &&
            t.push(
              'sort: sorting by non-["frequency"] field is pointless because we are going to sort the picked values by ["frequency"]'
            ),
          n.length &&
            !e["pick"] &&
            t.push(
              'sort: sorting by ["frequency"] is impossible because no values have been picked'
            )),
        e["pick"])
      ) {
        e["reduce"] &&
          "count" === e["reduce"]["aggregator"] &&
          t.push(
            'pick: superfluous because we can apply aggregator "count" to raw events'
          );
        var r = s.validateFieldKeyPathV0_2(e["pick"]["field"]);
        r && t.push("pick: " + r);
      }
      if (e["reduce"]) {
        var a = e["reduce"]["aggregator"],
          c = "aggregator " + (l.stringify(a) || String(a)),
          d = e["reduce"]["n"],
          f = "index " + (l.stringify(d) || String(d));
        u.includes(["sum", "avg", "max", "min", "count", "nth"], a) ||
          t.push("reduce: " + c + " is unknown"),
          u.includes(["sum", "avg", "max", "min"], a) &&
            (e["pick"] ||
              t.push(
                "reduce: " +
                  c +
                  " is impossible to use because no values have been picked"
              )),
          "nth" === a
            ? ((!u.isNumber(d) || isNaN(d) || parseInt(d, 10) !== d || d < 0) &&
                t.push(
                  "reduce: " +
                    f +
                    " is not a non-negative integer (mandated by " +
                    c +
                    ")"
                ),
              e["sort"] ||
                t.push(
                  'reduce: aggregator "nth" is meaningless without a specific sort order'
                ))
            : u.isUndefined(d) ||
              t.push(
                "reduce: " + f + " is defined (not mandated by " + c + ")"
              );
      }
      if (t.length) throw new Error(t.join("\n"));
    }
    function o(e) {
      var t = "direction " + (l.stringify(e) || String(e));
      if (!u.includes(["ascending", "descending"], e))
        return t + ' is not "ascending" or "descending"';
    }
    var s = t,
      u = n(2),
      c = { FIELDS: n(63).FIELDS, FIELDS_V0_2: n(63).FIELDS_V0_2 },
      l = n(26),
      d = n(23),
      f = n(156);
    (s.MILLIS_IN_A_DAY = 864e5),
      (s.aggregateField = function (e, t) {
        return (
          u.isString(t) && (t = [t]),
          (t = t || f.DEFAULT_FIELD),
          [f.generateAlias(e, t)]
        );
      }),
      (s.groupField = function (e) {
        return (
          u.isString(e) && (e = [e]), (e = e || f.DEFAULT_FIELD), [e.join(".")]
        );
      });
    var p = {
      "<": "lt",
      "<=": "lte",
      ">": "gt",
      ">=": "gte",
      "=": "eq",
      "==": "eq",
    };
    (s.fieldComparison = function (e, t, n) {
      return (
        (e = i(e)),
        u.isString(t) && (t = [t]),
        "exists" === e
          ? { op: e, args: [{ field: t }] }
          : { op: e, args: [{ field: t }, { value: n }] }
      );
    }),
      (s.relativeTimeComparison = function (e, t) {
        return {
          op: i(e),
          args: [
            { op: "-", args: [{ eval: "now" }, { field: [c.FIELDS.TIME] }] },
            { value: t * s.MILLIS_IN_A_DAY },
          ],
        };
      }),
      (s.rangeTimeComparison = function (e) {
        return u.isArray(e)
          ? {
              op: "between",
              args: [
                { field: [c.FIELDS.TIME] },
                { value: [e[0] || +new Date(0), e[1] || +new Date()] },
              ],
            }
          : (d.error(
              "Rule builder",
              "rangeTimeComparison passed invalid range",
              e
            ),
            null);
      }),
      (s.groupBy = function (e) {
        for (var t = [], n = 0; n < e.length; n++) t[n] = { field: e[n] };
        return t;
      }),
      (s.aggregate = function (e, t) {
        return (
          u.isString(t) && (t = [t]),
          (t = t || f.DEFAULT_FIELD),
          { op: e, args: [{ field: t }] }
        );
      }),
      (s.SOURCE_TYPES = {
        BEHAVIOR: "events",
        CUSTOM_BEHAVIOR: "custom_behavior",
        DCP: "dcp",
      }),
      (s.FREQUENCY_FILTERS = {
        MOST_FREQUENT: "most_frequent",
        LEAST_FREQUENT: "least_frequent",
      }),
      (s.RECENCY_FILTERS = {
        MOST_RECENT: "most_recent",
        LEAST_RECENT: "least_recent",
      }),
      (s.getFieldKeyPathForSource = function (e, t) {
        t = t || s.SOURCE_TYPES.BEHAVIOR;
        var n = [];
        return (
          u.isString(e)
            ? ((n = [e]),
              t !== s.SOURCE_TYPES.BEHAVIOR ||
                u.includes(u.values(c.FIELDS), e) ||
                (n = [c.FIELDS.OPTIONS, e]))
            : (n = e),
          n
        );
      }),
      (s.buildFromSpecV0_1 = function (e) {
        if (!(e.action || (e.filters && 0 !== e.filters.length)))
          throw new Error(
            'Audience spec must have an "action" field or at least one "filter" ' +
              l.stringify(e)
          );
        var t = s.fieldComparison("gt", c.FIELDS.TIME, 0),
          n = [],
          i = [];
        if (
          (e.action &&
            (i.push(s.fieldComparison("eq", c.FIELDS.NAME, e.action.value)),
            e.action.type &&
              i.push(s.fieldComparison("eq", c.FIELDS.TYPE, e.action.type))),
          e.time)
        )
          if ("last_days" === e.time.type)
            i.push(s.relativeTimeComparison("lte", e.time.days));
          else if ("range" === e.time.type) {
            var a = s.rangeTimeComparison([e.time.start, e.time.stop]);
            a && i.push(a);
          } else
            d.error(
              "Rule builder",
              'Audience spec has bad "time" type',
              e.time.type
            );
        if (
          ((t = { op: "and", args: i }),
          e.count &&
            n.push({
              where: s.fieldComparison(e.count.comparator, "0", e.count.value),
              from: {
                select: [{ field: s.aggregateField("count") }],
                where: t,
                aggregate: [s.aggregate("count")],
              },
            }),
          e.filters &&
            u.each(e.filters, function (r) {
              var a,
                o,
                u = s.getFieldKeyPathForSource(r.name, e.source);
              if (
                (r.modifier === s.FREQUENCY_FILTERS.MOST_FREQUENT
                  ? ((a = s.aggregate("count")),
                    (o = s.aggregateField("count")))
                  : r.modifier === s.RECENCY_FILTERS.MOST_RECENT &&
                    ((a = s.aggregate("max", c.FIELDS.TIME)),
                    (o = s.aggregateField("max", c.FIELDS.TIME))),
                a)
              ) {
                var l = u,
                  d = s.groupField(l);
                n.push({
                  where: s.fieldComparison(r.comparator, "0", r.value),
                  from: {
                    select: [{ field: d }],
                    where: t,
                    groupBy: s.groupBy([l]),
                    aggregate: [a],
                    orderBy: [{ field: o, direction: "DESC" }],
                    limit: 1,
                  },
                });
              } else i.push(s.fieldComparison(r.comparator, u, r.value));
            }),
          e.pick)
        ) {
          if (n.length > 0)
            throw new Error(
              'A "pick" clause must not be specified with "count" or "most_recent", "most_frequent" modifiers' +
                l.stringify(e)
            );
          return [r(e.pick, t, e.source)];
        }
        return n.length > 0 ? n : [{ where: t }];
      }),
      (s.buildFromSpecV0_2 = function (e) {
        a(e);
        var t = {
          where: {
            op: "and",
            args: u.map(e["filter"] || [], function (e) {
              return "age" === e["field"][0]
                ? s.relativeTimeComparison(
                    e["comparator"] || "eq",
                    e["value"] / s.MILLIS_IN_A_DAY
                  )
                : s.fieldComparison(
                    e["comparator"] || "eq",
                    s.convertFieldKeyPathFromSpecV0_2(e["field"]),
                    e["value"]
                  );
            }),
          },
        };
        if (e["reduce"] && "count" === e["reduce"]["aggregator"])
          return u.extend(t, {
            aggregate: [{ op: "count", args: [{ field: ["*"] }] }],
            select: [{ field: ["_count_*"] }],
          });
        var n = [],
          i = [];
        if (
          (e["sort"] &&
            (u.each(e["sort"], function (e) {
              u.includes(["ascending", "descending"], e["direction"]) &&
                (u.includes(["time", "age"], e["field"][0]) && i.push(e),
                "frequency" === e["field"][0] && n.push(e));
            }),
            i.length &&
              !n.length &&
              (t["orderBy"] = u.filter(
                u.map(i, function (e) {
                  return "time" === e["field"][0]
                    ? {
                        field: s.convertFieldKeyPathFromSpecV0_2(["time"]),
                        direction:
                          "ascending" === e["direction"] ? "ASC" : "DESC",
                      }
                    : "age" === e["field"][0]
                    ? {
                        field: s.convertFieldKeyPathFromSpecV0_2(["time"]),
                        direction:
                          "ascending" === e["direction"] ? "DESC" : "ASC",
                      }
                    : void 0;
                })
              ))),
          e["pick"] && e["pick"]["field"])
        ) {
          var r = s.convertFieldKeyPathFromSpecV0_2(e["pick"]["field"]);
          if (
            e["reduce"] &&
            u.includes(["avg", "max", "min", "sum"], e["reduce"]["aggregator"])
          )
            return u.extend(t, {
              aggregate: [
                { op: e["reduce"]["aggregator"], args: [{ field: r }] },
              ],
              select: [
                { field: [f.generateAlias(e["reduce"]["aggregator"], r)] },
              ],
            });
          t = n.length
            ? u.extend(t, {
                groupBy: [{ field: r }],
                aggregate: [{ op: "count", args: [{ field: ["*"] }] }],
                orderBy: [
                  {
                    field: ["_count_*"],
                    direction:
                      "ascending" === n[0]["direction"] ? "ASC" : "DESC",
                  },
                ],
                select: [{ field: [r.join(".")] }],
              })
            : u.extend(t, { select: [{ field: r }] });
        }
        if (e["reduce"] && "nth" === e["reduce"]["aggregator"]) {
          var o = e["reduce"]["n"];
          if (u.isNumber(o) && o >= 0 && Number(o) === Math.floor(Number(o)))
            return u.extend(t, { offset: o, limit: 1 });
        }
        return t;
      }),
      (s.convertFieldKeyPathFromSpecV0_2 = function (e) {
        return "tags" === e[0] && "revenue" === e[1]
          ? ["r"]
          : [c.FIELDS_V0_2[e[0]]].concat(e.slice(1));
      }),
      (s.FieldPurpose = { FILTER: "filter", SORT: "sort", PICK: "pick" }),
      (s.validateFieldKeyPathV0_2 = function (e, t) {
        var n = "field " + (l.stringify(e) || String(e));
        if (!u.isArray(e) || !u.every(e, u.isString))
          return n + " is not an array of strings";
        if (
          ("tags" === e[0] && e.length > 2) ||
          ("tags" !== e[0] && e.length > 1)
        )
          return n + " includes too many strings";
        if ("tags" === e[0] && e.length < 2)
          return n + " does not specify an exact tag";
        if (e.length < 1) return n + " does not specify a top-level field";
        var i = u.keys(c.FIELDS_V0_2),
          r = ["age", "frequency"];
        return (
          t === s.FieldPurpose.FILTER && (i.push("age"), (r = ["frequency"])),
          t === s.FieldPurpose.SORT &&
            ((i = ["time", "age", "frequency"]),
            (r = ["name", "type", "category", "tags"])),
          u.includes(r, e[0])
            ? n + " is not supported here"
            : u.includes(i, e[0])
            ? void 0
            : n + " is unknown"
        );
      }),
      (s.validateComparatorAndValue = function (e, t) {
        var n = "comparator " + (l.stringify(e) || String(e)),
          i = "value " + (l.stringify(t) || String(t));
        if (!u.isString(e) && !u.isUndefined(e)) return n + " is not a string";
        switch (e) {
          case void 0:
          case "eq":
          case "is":
          case "contains":
            break;
          case "lt":
          case "gt":
          case "lte":
          case "gte":
            if (!u.isNumber(t))
              return i + " is not a number (mandated by " + n + ")";
            break;
          case "in":
            if (!u.isArray(t))
              return i + " is not an array (mandated by " + n + ")";
            break;
          case "between":
            if (
              !(
                u.isArray(t) &&
                2 === t.length &&
                u.isNumber(t[0]) &&
                u.isNumber(t[1]) &&
                t[0] <= t[1]
              )
            )
              return (
                i +
                " is not a pair of increasing numbers (mandated by " +
                n +
                ")"
              );
            break;
          case "regex":
            if (
              !(
                u.isString(t) ||
                (u.isArray(t) &&
                  2 === t.length &&
                  u.isString(t[0]) &&
                  u.isString(t[1]))
              )
            )
              return (
                i +
                " is not a pattern string or a [pattern string, flags string] array (mandated by " +
                n +
                ")"
              );
            break;
          case "exists":
            if (!u.isUndefined(t))
              return i + " is not undefined (mandated by " + n + ")";
            break;
          default:
            return n + " is unknown";
        }
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(25),
      a = n(23),
      o = i.bind(a.log, a),
      s = n(24),
      u = n(19).getFieldValue,
      c = n(26),
      l = function (e, t, n) {
        if (e.getValueOrDefault) return e.getValueOrDefault(t, n);
        if (!i.isArray(t)) return n;
        var r = u(e, t);
        return "undefined" == typeof r && (r = n), r;
      },
      d = function (e) {
        return "string" == typeof e ? e.trim().toLowerCase() : e;
      };
    (t.clause = {
      WHERE: "where",
      GROUP_BY: "groupBy",
      AGGREGATE: "aggregate",
      HAVING: "having",
      ORDER_BY: "orderBy",
      SELECT: "select",
      OFFSET: "offset",
      LIMIT: "limit",
      FROM: "from",
    }),
      (t.DEFAULT_FIELD = ["*"]),
      (t.booleanOperators = {
        eq: function (e) {
          var t = i.map(e, d);
          return t[0] == t[1];
        },
        is: function (e) {
          return e[0] === e[1];
        },
        gt: function (e) {
          return e[0] > e[1];
        },
        lt: function (e) {
          return e[0] < e[1];
        },
        gte: function (e) {
          return e[0] >= e[1];
        },
        lte: function (e) {
          return e[0] <= e[1];
        },
        in: function (e) {
          var t = i.map(e[1] || [], d);
          return i.includes(t, d(e[0]));
        },
        between: function (e) {
          return e[1][0] <= e[0] && e[0] <= e[1][1];
        },
        contains: function (e) {
          var t = i.map(e, function (e) {
            return "string" == typeof e ? e.toLowerCase() : e;
          });
          return (t[0] || "").indexOf(t[1]) !== -1;
        },
        regex: function (e) {
          try {
            var t, n;
            return (
              i.isString(e[1])
                ? ((t = e[1]), (n = "i"))
                : ((t = e[1][0] || ""), (n = e[1][1] || "")),
              new RegExp(t, n).test(e[0])
            );
          } catch (e) {
            return (
              a.error(
                "Rules",
                'In operator "regex", error: ' +
                  (e.message || "invalid RegExp /" + [t, n].join("/"))
              ),
              !1
            );
          }
        },
        exists: function (e) {
          return "undefined" != typeof e[0];
        },
        and: function (e) {
          return i.every(e, function (e) {
            return e;
          });
        },
        or: function (e) {
          return i.some(e, function (e) {
            return e;
          });
        },
        not: function (e) {
          return !e[0];
        },
      }),
      (t.arithmeticOperators = {
        "+": function (e) {
          return (e[0] || 0) + (e[1] || 0);
        },
        "-": function (e) {
          return (e[0] || 0) - (e[1] || 0);
        },
        "/": function (e) {
          return (e[0] || 0) / (e[1] || 1);
        },
        "%": function (e) {
          return (e[0] || 0) % (e[1] || 1);
        },
      }),
      (t.aggregateOperators = {
        sum: function (e, n) {
          for (var i = e[0] || t.DEFAULT_FIELD, r = 0, a = 0; a < n.length; a++)
            r += l(n[a], i, 0);
          return r;
        },
        avg: function (e, n) {
          if (0 === n.length) return 0;
          for (var i = e[0] || t.DEFAULT_FIELD, r = 0, a = 0; a < n.length; a++)
            r += l(n[a], i, 0);
          return r / n.length;
        },
        max: function (e, n) {
          for (
            var i = e[0] || t.DEFAULT_FIELD,
              r = Number.NEGATIVE_INFINITY,
              a = 0;
            a < n.length;
            a++
          )
            r = Math.max(r, l(n[a], i, Number.NEGATIVE_INFINITY));
          return r;
        },
        min: function (e, n) {
          for (
            var i = e[0] || t.DEFAULT_FIELD,
              r = Number.POSITIVE_INFINITY,
              a = 0;
            a < n.length;
            a++
          )
            r = Math.min(r, l(n[a], i, Number.POSITIVE_INFINITY));
          return r;
        },
        count: function (e, t) {
          return t.length;
        },
      });
    var f = {
        now: function () {
          return s.now();
        },
      },
      p = function (e) {
        return e in t.booleanOperators
          ? t.booleanOperators[e]
          : e in t.arithmeticOperators
          ? t.arithmeticOperators[e]
          : null;
      },
      h = function (e, t) {
        if (t.hasOwnProperty("value")) return t["value"];
        if (t.hasOwnProperty("field")) return l(e, t["field"]);
        if (t.hasOwnProperty("eval"))
          return t["eval"] in f
            ? f[t["eval"]]()
            : void a.error("Rules", "Unknown function: " + t["eval"]);
        if (!t["op"])
          return void a.error(
            "Rules",
            "No operator specified: " + c.stringify(t)
          );
        var n = p(t["op"]);
        if (!n) return void a.error("Rules", "Unknown operator: " + t["op"]);
        var r = i.partial(h, e),
          o = t["args"] || [],
          s = i.map(o, function (e) {
            return r(e);
          });
        return n(s, e);
      },
      g = function (e, t) {
        var n = {};
        if ("undefined" == typeof e || !i.isArray(e) || 0 === e.length)
          return (n["*"] = { fieldValues: {}, events: t }), n;
        for (
          var r = i.map(e, function (e) {
              return e["field"];
            }),
            a = 0;
          a < t.length;
          a++
        ) {
          for (var o = t[a], s = [], u = {}, d = 0; d < r.length; d++) {
            var f = r[d],
              p = l(o, f),
              h = f.join(".");
            (u[h] = p),
              s.push(
                encodeURIComponent(h) + "=" + encodeURIComponent(c.stringify(p))
              );
          }
          var g = s.join("&");
          n.hasOwnProperty(g) || (n[g] = { fieldValues: u, events: [] }),
            n[g].events.push(o);
        }
        return n;
      };
    t.generateAlias = function (e, t) {
      return "_" + e + "_" + t.join(".");
    };
    var v = function (e, n) {
        var r = {};
        return (
          i.each(n, function (n, i) {
            r[i] = {};
            for (var o = 0; o < e.length; o++) {
              var s = e[o],
                u = s["op"];
              if (u in t.aggregateOperators) {
                var c =
                    ((s["args"] && s["args"][0]) || {})["field"] ||
                    t.DEFAULT_FIELD,
                  l = t.generateAlias(u, c),
                  d = t.aggregateOperators[u]([c], n.events);
                r[i][l] = d;
              } else a.error("Rules", "Unknown aggregate operator " + u);
            }
          }),
          r
        );
      },
      _ = function (e, t) {
        var n = [];
        return (
          i.each(e, function (e, r) {
            var a = i.extend({}, e.fieldValues),
              o = t[r] || {};
            i.extend(a, o), n.push(a);
          }),
          n
        );
      },
      m = function (e, t) {
        return i.isArray(e)
          ? 0 === e.length
            ? t
            : t.sort(function (t, n) {
                for (var i = 0; i < e.length; i++) {
                  var r = e[i],
                    a = r["direction"] || "ASC",
                    o = "ASC" === a ? 1 : -1,
                    s = r["field"],
                    u = l(t, s, 0),
                    c = l(n, s, 0);
                  if (u < c) return -o;
                  if (u > c) return o;
                }
                return 0;
              })
          : (o("Rules", "groupBy rule must be an array"), t);
      };
    t.rewrite = function (e) {
      function n(e, s) {
        if (
          (i.isArray(e) &&
            ("and" !== e[0] &&
              "or" !== e[0] &&
              "not" !== e[0] &&
              a.error(
                "Rules",
                "Unexpected operation " + e[0] + ". Continuing optimistically."
              ),
            (e = { op: e[0], args: e.slice(1) })),
          e.hasOwnProperty("field") ||
            e.hasOwnProperty("value") ||
            e.hasOwnProperty("eval"))
        )
          return e;
        if (s && e["op"] in t.aggregateOperators) {
          var u =
              ((e["args"] && e["args"][0]) || {})["field"] || t.DEFAULT_FIELD,
            c = t.generateAlias(e["op"], u);
          return (
            c in o || (r.push({ op: e["op"], args: e["args"] }), (o[c] = !0)),
            { field: [c] }
          );
        }
        for (var l = [], d = e["args"] || [], f = 0; f < d.length; f++)
          l[f] = n(d[f], s);
        return { op: e["op"], args: l };
      }
      var r = [],
        o = {},
        s = {};
      e.hasOwnProperty(t.clause.WHERE) &&
        (s[t.clause.WHERE] = n(e[t.clause.WHERE], !1)),
        e.hasOwnProperty(t.clause.HAVING) &&
          (s[t.clause.HAVING] = n(e[t.clause.HAVING], !0)),
        (e.hasOwnProperty(t.clause.AGGREGATE) || r.length > 0) &&
          (s[t.clause.AGGREGATE] = (e[t.clause.AGGREGATE] || []).concat(r));
      for (
        var u = [
            t.clause.GROUP_BY,
            t.clause.ORDER_BY,
            t.clause.SELECT,
            t.clause.OFFSET,
            t.clause.LIMIT,
          ],
          c = 0;
        c < u.length;
        c++
      )
        e.hasOwnProperty(u[c]) && (s[u[c]] = e[u[c]]);
      return (
        e.hasOwnProperty(t.clause.FROM) &&
          (s[t.clause.FROM] = t.rewrite(e[t.clause.FROM])),
        s
      );
    };
    var E = function (e, n) {
        n = n || 0;
        var r = [];
        if (
          (e.hasOwnProperty(t.clause.WHERE)
            ? e[t.clause.WHERE]["op"]
              ? e[t.clause.WHERE]["op"] in t.booleanOperators ||
                r.push("Non-boolean WHERE clause operator")
              : r.push("Missing WHERE clause operator")
            : r.push("Missing WHERE clause"),
          e.hasOwnProperty(t.clause.HAVING) &&
            (e[t.clause.HAVING]["op"]
              ? e[t.clause.HAVING]["op"] in t.booleanOperators ||
                r.push("Non-boolean HAVING clause operator")
              : r.push("Missing HAVING clause operator")),
          e.hasOwnProperty(t.clause.GROUP_BY) &&
            !e.hasOwnProperty(t.clause.AGGREGATE) &&
            r.push("No AGGREGATE clause specified with GROUP_BY clause"),
          e.hasOwnProperty(t.clause.SELECT))
        ) {
          var a = e[t.clause.SELECT];
          if (i.isArray(a))
            for (var o = 0; o < a.length; o++)
              a[o]["op"] &&
                a[o]["op"] in t.aggregateOperators &&
                r.push(
                  'In SELECT clause, aggregate operator "' +
                    a[o]["op"] +
                    '" specified in selector at index ' +
                    o
                );
          else r.push("SELECT clause must be an array");
        }
        if (e.hasOwnProperty(t.clause.OFFSET)) {
          var s = e[t.clause.OFFSET];
          (!i.isNumber(s) ||
            Number(s) < 0 ||
            Number(s) !== Math.floor(Number(s))) &&
            r.push("OFFSET must be a non-negative integer");
        }
        if (e.hasOwnProperty(t.clause.LIMIT)) {
          var u = e[t.clause.LIMIT];
          (!i.isNumber(u) ||
            Number(u) < 0 ||
            Number(u) !== Math.floor(Number(u))) &&
            r.push("LIMIT must be a non-negative integer");
        }
        return (
          n > 0 &&
            (r = i.map(r, function (e) {
              return "Sub-rule " + n + ": " + e;
            })),
          e.hasOwnProperty(t.clause.FROM) &&
            (r = r.concat(E(e[t.clause.FROM], n + 1))),
          r
        );
      },
      y = function (e, t) {
        return i.map(t, function (t) {
          return i.map(e, function (e) {
            return h(t, e);
          });
        });
      },
      I = function (e, n) {
        var r = n;
        if (
          (e.hasOwnProperty(t.clause.FROM) &&
            (a.debug("Evaluating FROM clause:", e[t.clause.FROM]),
            (r = I(e[t.clause.FROM], r)),
            a.debug("Results after FROM:", r)),
          a.debug("Evaluating WHERE clause:", e[t.clause.WHERE]),
          (r = i.filter(r, function (n) {
            return h(n, e[t.clause.WHERE]);
          })),
          a.debug("Results after WHERE:", r),
          e.hasOwnProperty(t.clause.AGGREGATE))
        ) {
          a.debug("Evaluating AGGREGATE clause:", e[t.clause.AGGREGATE]);
          var o = g(e[t.clause.GROUP_BY], r),
            s = v(e[t.clause.AGGREGATE], o);
          (r = _(o, s)), a.debug("Results after AGGREGATE:", r);
        }
        e.hasOwnProperty(t.clause.HAVING) &&
          (a.debug("Evaluating HAVING clause:", e[t.clause.HAVING]),
          (r = i.filter(r, function (n) {
            return h(n, e[t.clause.HAVING]);
          })),
          a.debug("Results after HAVING:", r)),
          e.hasOwnProperty(t.clause.ORDER_BY) &&
            (a.debug("Evaluating ORDER_BY clause:", e[t.clause.ORDER_BY]),
            (r = m(e[t.clause.ORDER_BY], r)),
            a.debug("Results after ORDER_BY:", r));
        var u = 0;
        e.hasOwnProperty(t.clause.OFFSET) &&
          (a.debug("Evaluating OFFSET clause:", e[t.clause.OFFSET]),
          (u = Number(e[t.clause.OFFSET])));
        var c;
        return (
          e.hasOwnProperty(t.clause.LIMIT) &&
            (a.debug("Evaluating LIMIT clause:", e[t.clause.LIMIT]),
            (c = u + Number(e[t.clause.LIMIT]))),
          (u > 0 || !i.isUndefined(c)) &&
            ((r = r.slice(u, c)), a.debug("Results after OFFSET/LIMIT:", r)),
          e.hasOwnProperty(t.clause.SELECT) &&
            (a.debug("Evaluating SELECT clause:", e[t.clause.SELECT]),
            (r = y(e[t.clause.SELECT], r)),
            a.debug("Results after SELECT:", r)),
          r
        );
      };
    (t.execute = function (e, n) {
      (e = t.rewrite(e)),
        a.shouldLog(r.LogLevel.DEBUG) &&
          a.groupCollapsed("Evaluating Behavioral Rule"),
        a.debug("Rule:", e, c.stringify(e)),
        a.debug("Events:", n);
      var i = E(e);
      if (i.length > 0)
        throw new Error(
          "Rule " + c.stringify(e) + " has violations: " + i.join("\n")
        );
      var o = I(e, n);
      return (
        a.debug("Rule result:", o),
        a.shouldLog(r.LogLevel.DEBUG) && a.groupEnd(),
        o
      );
    }),
      (t.isSatisfied = function (e, n) {
        try {
          return t.execute(e, n).length > 0;
        } catch (t) {
          return (
            a.error(
              "Rules",
              "Error " +
                t.toString() +
                " while evaluating rule " +
                c.stringify(e)
            ),
            !1
          );
        }
      });
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(158));
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(159),
      a = n(153),
      o = n(26),
      s = n(155);
    e.exports = {
      provides: "customBehavior",
      shouldTrack: !0,
      isLazy: !1,
      getter: [
        "stores/global",
        "stores/visitor_attribute_entity",
        function (e, t) {
          var n = e.getProjectId(),
            u = i.filter(
              i.map(t.getCustomBehavioralAttributes(n), function (e) {
                try {
                  return {
                    id: e.id,
                    granularity: r.GRANULARITY.ALL,
                    rule: s.buildFromSpecV0_2(o.parse(e.rule_json)),
                  };
                } catch (e) {
                  return;
                }
              })
            ),
            c = a.getEvents();
          return r.evaluate(u, c);
        },
      ],
    };
  },
  function (e, t, n) {
    function i(e) {
      if (0 === e.length) return [];
      for (
        var t = e.length - 1, n = o.FIELDS.SESSION_ID, i = e[t][n];
        t > 0 && i === e[t - 1][n];

      )
        t--;
      return e.slice(t);
    }
    function r(e, t) {
      if (0 === e.length || t <= 0) return [];
      var n = +new Date() - t * s.MILLIS_IN_A_DAY;
      n -= n % s.MILLIS_IN_A_DAY;
      for (var i = e.length; i > 0 && n <= e[i - 1][o.FIELDS.TIME]; ) i--;
      return e.slice(i);
    }
    var a = n(23),
      o = { FIELDS: n(63).FIELDS },
      s = n(155),
      u = n(156);
    (t.GRANULARITY = {
      ALL: "all",
      CURRENT_SESSION: "current_session",
      LAST_30_DAYS: "last_30_days",
      LAST_60_DAYS: "last_60_days",
    }),
      (t.evaluate = function (e, n) {
        var o = {};
        if (0 === n.length) {
          for (var s = 0; s < e.length; s++) o[e[s].id] = e[s].defaultValue;
          return o;
        }
        var c = i(n),
          l = r(n, 60);
        for (s = 0; s < e.length; s++) {
          var d = e[s],
            f = n;
          d.granularity === t.GRANULARITY.CURRENT_SESSION
            ? (f = c)
            : d.granularity === t.GRANULARITY.LAST_60_DAYS && (f = l);
          try {
            var p = f;
            d.rule && (p = u.execute(d.rule, f)),
              (o[d.id] = d.defaultValue),
              1 === p.length
                ? (o[d.id] = p[0][0] || d.defaultValue)
                : a.debug(
                    "Behavior / Rule for",
                    d.id,
                    "returned",
                    p.length,
                    "results, expected 1"
                  );
          } catch (e) {
            a.error(
              "Behavior / Rule for",
              d.id,
              "failed with",
              e.message || ""
            );
          }
        }
        return o;
      });
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(161)),
        e.registerAudienceMatcher("first_session", n(162));
    };
  },
  function (e, t, n) {
    var i = n(63),
      r = n(153),
      a = n(19).getFieldValue,
      o = n(89).CURRENT_SESSION_INDEX;
    e.exports = {
      provides: "first_session",
      shouldTrack: !0,
      getter: [
        function () {
          var e = r.getEvents();
          if (e && e.length > 0) {
            var t = e[0],
              n = a(t, [i.FIELDS.SESSION_INDEX]);
            return n === o;
          }
          return !0;
        },
      ],
    };
  },
  function (e, t) {
    e.exports = {
      fieldsNeeded: ["first_session"],
      match: function (e) {
        return !!e.first_session;
      },
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerApiModule("behavior", n(164));
    };
  },
  function (e, t, n) {
    function i(e, t) {
      var n = d.buildFromSpecV0_1(t);
      if (1 !== n.length)
        throw new Error(
          "Invalid query descriptor; verify that no aggregators are specified"
        );
      return f.execute(n[0], e);
    }
    function r(e, t) {
      return c.map(e, function (e) {
        return c.isFunction(e.toObject) ? e.toObject(t) : e;
      });
    }
    function a(e, t) {
      if (!e) return ["Descriptor not defined"];
      var n = [];
      return (
        e.count && n.push('Unexpected "count" clause specified'),
        e.pick &&
          e.pick.modifier &&
          t.indexOf(e.pick.modifier) === -1 &&
          n.push('Invalid "pick" modifier "' + e.pick.modifier + '"'),
        c.each(e.filters, function (e) {
          c.isUndefined(e.modifier) ||
            n.push('Unexpected "filter" modifier "' + e.modifier + '"');
        }),
        n.length > 0 ? n : void 0
      );
    }
    function o(e, t) {
      var n,
        o = { revenueAsTag: !1, timeAsTimestamp: !0 };
      if (c.isUndefined(t)) return (n = l.getEvents(e)), r(n, o);
      if (c.isNumber(t)) {
        if (t <= 0)
          throw new Error("Count must be a positive integer, got " + t);
        return (n = l.getEvents(e)), r(n.slice(-t), o);
      }
      var s = a(t, c.values(d.RECENCY_FILTERS));
      if (s) throw new Error(s.join("\n"));
      return (n = l.getEvents(e)), r(i(n, t), o);
    }
    function s(e, t) {
      if (((t = c.cloneDeep(t) || {}), !t.pick))
        throw new Error('No "pick" clause provided in query descriptor');
      if (!t.pick.name)
        throw new Error('No field name provided in "pick" clause');
      t.pick.modifier = t.pick.modifier || d.FREQUENCY_FILTERS.MOST_FREQUENT;
      var n = a(t, c.values(d.FREQUENCY_FILTERS));
      if (n) throw new Error(n.join("\n"));
      var r = l.getEvents(e);
      return i(r, t);
    }
    function u(e, t) {
      var n = d.buildFromSpecV0_2(t),
        i = l.getEvents(e),
        a = r(f.execute(n, i), { revenueAsTag: !0, timeAsTimestamp: !1 });
      return (
        (t.pick || (t.reduce && "count" === t.reduce.aggregator)) &&
          (a = c.flatten(a)),
        t.reduce && (a = a[0]),
        a
      );
    }
    var c = n(2),
      l = n(153),
      d = n(155),
      f = n(156);
    e.exports = [
      "stores/visitor_events",
      function (e) {
        return {
          getEvents: c.partial(o, e),
          getByFrequency: c.partial(s, e),
          query: c.partial(u, e),
        };
      },
    ];
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerDependency("sources/browser_id", n(166)),
        e.registerVisitorProfileProvider(n(171)),
        e.registerVisitorProfileProvider(n(172)),
        e.registerAudienceMatcher("browser_version", n(173));
    };
  },
  function (e, t, n) {
    var i = n(167);
    (t.getId = function () {
      return i.get().browser.id;
    }),
      (t.getVersion = function () {
        return i.get().browser.version;
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(168),
      a = n(40),
      o = n(7),
      s = n(16),
      u = n(9),
      c = s.get("stores/ua_data");
    t.get = function () {
      var e = c.get();
      return (
        i.isEmpty(e) &&
          ((e = r.parseUA(a.getUserAgent())),
          u.dispatch(o.SET_UA_DATA, { data: e })),
        e
      );
    };
  },
  function (e, t, n) {
    function i(e) {
      if (((e = (e || "").toLowerCase()), e in u)) return e;
      var t = a.keys(u);
      return (
        a.find(t, function (t) {
          var n = u[t];
          return a.includes(n, e);
        }) || "unknown"
      );
    }
    function r(e, t, n) {
      return t
        ? t
        : "unknown" === e
        ? "unknown"
        : n
        ? "mobile"
        : "desktop_laptop";
    }
    var a = n(2),
      o = n(169);
    t.parseUA = function (e) {
      var t = new o(e),
        n = t.getBrowser(),
        a = t.getOS(),
        u = t.getDevice(),
        l = (a.name || "unknown").toLowerCase(),
        d = (n.name || "unknown").toLowerCase(),
        f = s(u.type, d, l);
      return {
        browser: { id: i(n.name), version: n.version },
        platform: { name: l, version: a.version },
        device: {
          model: c[u.model] || "unknown",
          type: r(d, u.type, f),
          isMobile: f,
        },
      };
    };
    var s = function (e, t, n) {
        if (a.includes(["mobile", "tablet"], e)) return !0;
        if (a.includes(["opera mini"], t)) return !0;
        var i = ["android", "blackberry", "ios", "windows phone"];
        return !!a.includes(i, n);
      },
      u = {
        gc: [
          "chrome",
          "chromium",
          "silk",
          "yandex",
          "maxthon",
          "chrome webview",
        ],
        edge: ["edge"],
        ie: ["internet explorer", "iemobile"],
        ff: ["firefox", "iceweasel"],
        opera: ["opera", "opera mini", "opera tablet"],
        safari: ["safari", "mobile safari", "webkit"],
        ucbrowser: ["uc browser"],
      },
      c = { iPhone: "iphone", iPad: "ipad" };
  },
  function (e, t, n) {
    var i;
    !(function (r, a) {
      "use strict";
      var o = "0.7.17",
        s = "",
        u = "?",
        c = "function",
        l = "undefined",
        d = "object",
        f = "string",
        p = "major",
        h = "model",
        g = "name",
        v = "type",
        _ = "vendor",
        m = "version",
        E = "architecture",
        y = "console",
        I = "mobile",
        T = "tablet",
        S = "smarttv",
        A = "wearable",
        b = "embedded",
        w = {
          extend: function (e, t) {
            var n = {};
            for (var i in e)
              t[i] && t[i].length % 2 === 0
                ? (n[i] = t[i].concat(e[i]))
                : (n[i] = e[i]);
            return n;
          },
          has: function (e, t) {
            return (
              "string" == typeof e &&
              t.toLowerCase().indexOf(e.toLowerCase()) !== -1
            );
          },
          lowerize: function (e) {
            return e.toLowerCase();
          },
          major: function (e) {
            return typeof e === f ? e.replace(/[^\d\.]/g, "").split(".")[0] : a;
          },
          trim: function (e) {
            return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          },
        },
        D = {
          rgx: function (e, t) {
            for (var n, i, r, o, s, u, l = 0; l < t.length && !s; ) {
              var f = t[l],
                p = t[l + 1];
              for (n = i = 0; n < f.length && !s; )
                if ((s = f[n++].exec(e)))
                  for (r = 0; r < p.length; r++)
                    (u = s[++i]),
                      (o = p[r]),
                      typeof o === d && o.length > 0
                        ? 2 == o.length
                          ? typeof o[1] == c
                            ? (this[o[0]] = o[1].call(this, u))
                            : (this[o[0]] = o[1])
                          : 3 == o.length
                          ? typeof o[1] !== c || (o[1].exec && o[1].test)
                            ? (this[o[0]] = u ? u.replace(o[1], o[2]) : a)
                            : (this[o[0]] = u ? o[1].call(this, u, o[2]) : a)
                          : 4 == o.length &&
                            (this[o[0]] = u
                              ? o[3].call(this, u.replace(o[1], o[2]))
                              : a)
                        : (this[o] = u ? u : a);
              l += 2;
            }
          },
          str: function (e, t) {
            for (var n in t)
              if (typeof t[n] === d && t[n].length > 0) {
                for (var i = 0; i < t[n].length; i++)
                  if (w.has(t[n][i], e)) return n === u ? a : n;
              } else if (w.has(t[n], e)) return n === u ? a : n;
            return e;
          },
        },
        R = {
          browser: {
            oldsafari: {
              version: {
                "1.0": "/8",
                1.2: "/1",
                1.3: "/3",
                "2.0": "/412",
                "2.0.2": "/416",
                "2.0.3": "/417",
                "2.0.4": "/419",
                "?": "/",
              },
            },
          },
          device: {
            amazon: { model: { "Fire Phone": ["SD", "KF"] } },
            sprint: {
              model: { "Evo Shift 4G": "7373KT" },
              vendor: { HTC: "APA", Sprint: "Sprint" },
            },
          },
          os: {
            windows: {
              version: {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2000: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM",
              },
            },
          },
        },
        C = {
          browser: [
            [
              /(opera\smini)\/([\w\.-]+)/i,
              /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
              /(opera).+version\/([\w\.]+)/i,
              /(opera)[\/\s]+([\w\.]+)/i,
            ],
            [g, m],
            [/(opios)[\/\s]+([\w\.]+)/i],
            [[g, "Opera Mini"], m],
            [/\s(opr)\/([\w\.]+)/i],
            [[g, "Opera"], m],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
              /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
              /(?:ms|\()(ie)\s([\w\.]+)/i,
              /(rekonq)\/([\w\.]+)*/i,
              /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i,
            ],
            [g, m],
            [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
            [[g, "IE"], m],
            [/(edge)\/((\d+)?[\w\.]+)/i],
            [g, m],
            [/(yabrowser)\/([\w\.]+)/i],
            [[g, "Yandex"], m],
            [/(puffin)\/([\w\.]+)/i],
            [[g, "Puffin"], m],
            [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
            [[g, "UCBrowser"], m],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [[g, /_/g, " "], m],
            [/(micromessenger)\/([\w\.]+)/i],
            [[g, "WeChat"], m],
            [/(QQ)\/([\d\.]+)/i],
            [g, m],
            [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
            [g, m],
            [/xiaomi\/miuibrowser\/([\w\.]+)/i],
            [m, [g, "MIUI Browser"]],
            [/;fbav\/([\w\.]+);/i],
            [m, [g, "Facebook"]],
            [/headlesschrome(?:\/([\w\.]+)|\s)/i],
            [m, [g, "Chrome Headless"]],
            [/\swv\).+(chrome)\/([\w\.]+)/i],
            [[g, /(.+)/, "$1 WebView"], m],
            [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
            [[g, /(.+(?:g|us))(.+)/, "$1 $2"], m],
            [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
            [m, [g, "Android Browser"]],
            [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
            [g, m],
            [/(dolfin)\/([\w\.]+)/i],
            [[g, "Dolphin"], m],
            [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
            [[g, "Chrome"], m],
            [/(coast)\/([\w\.]+)/i],
            [[g, "Opera Coast"], m],
            [/fxios\/([\w\.-]+)/i],
            [m, [g, "Firefox"]],
            [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
            [m, [g, "Mobile Safari"]],
            [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
            [m, g],
            [
              /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i,
            ],
            [[g, "GSA"], m],
            [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
            [g, [m, D.str, R.browser.oldsafari.version]],
            [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
            [g, m],
            [/(navigator|netscape)\/([\w\.-]+)/i],
            [[g, "Netscape"], m],
            [
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
              /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
              /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
              /(links)\s\(([\w\.]+)/i,
              /(gobrowser)\/?([\w\.]+)*/i,
              /(ice\s?browser)\/v?([\w\._]+)/i,
              /(mosaic)[\/\s]([\w\.]+)/i,
            ],
            [g, m],
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
            [[E, "amd64"]],
            [/(ia32(?=;))/i],
            [[E, w.lowerize]],
            [/((?:i[346]|x)86)[;\)]/i],
            [[E, "ia32"]],
            [/windows\s(ce|mobile);\sppc;/i],
            [[E, "arm"]],
            [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
            [[E, /ower/, "", w.lowerize]],
            [/(sun4\w)[;\)]/i],
            [[E, "sparc"]],
            [
              /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i,
            ],
            [[E, w.lowerize]],
          ],
          device: [
            [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
            [h, _, [v, T]],
            [/applecoremedia\/[\w\.]+ \((ipad)/],
            [h, [_, "Apple"], [v, T]],
            [/(apple\s{0,1}tv)/i],
            [
              [h, "Apple TV"],
              [_, "Apple"],
            ],
            [
              /(archos)\s(gamepad2?)/i,
              /(hp).+(touchpad)/i,
              /(hp).+(tablet)/i,
              /(kindle)\/([\w\.]+)/i,
              /\s(nook)[\w\s]+build\/(\w+)/i,
              /(dell)\s(strea[kpr\s\d]*[\dko])/i,
            ],
            [_, h, [v, T]],
            [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
            [h, [_, "Amazon"], [v, T]],
            [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
            [
              [h, D.str, R.device.amazon.model],
              [_, "Amazon"],
              [v, I],
            ],
            [/\((ip[honed|\s\w*]+);.+(apple)/i],
            [h, _, [v, I]],
            [/\((ip[honed|\s\w*]+);/i],
            [h, [_, "Apple"], [v, I]],
            [
              /(blackberry)[\s-]?(\w+)/i,
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
              /(hp)\s([\w\s]+\w)/i,
              /(asus)-?(\w+)/i,
            ],
            [_, h, [v, I]],
            [/\(bb10;\s(\w+)/i],
            [h, [_, "BlackBerry"], [v, I]],
            [
              /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i,
            ],
            [h, [_, "Asus"], [v, T]],
            [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
            [
              [_, "Sony"],
              [h, "Xperia Tablet"],
              [v, T],
            ],
            [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],
            [h, [_, "Sony"], [v, I]],
            [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
            [_, h, [v, y]],
            [/android.+;\s(shield)\sbuild/i],
            [h, [_, "Nvidia"], [v, y]],
            [/(playstation\s[34portablevi]+)/i],
            [h, [_, "Sony"], [v, y]],
            [/(sprint\s(\w+))/i],
            [
              [_, D.str, R.device.sprint.vendor],
              [h, D.str, R.device.sprint.model],
              [v, I],
            ],
            [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
            [_, h, [v, T]],
            [
              /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,
              /(zte)-(\w+)*/i,
              /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i,
            ],
            [_, [h, /_/g, " "], [v, I]],
            [/(nexus\s9)/i],
            [h, [_, "HTC"], [v, T]],
            [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
            [h, [_, "Huawei"], [v, I]],
            [/(microsoft);\s(lumia[\s\w]+)/i],
            [_, h, [v, I]],
            [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
            [h, [_, "Microsoft"], [v, y]],
            [/(kin\.[onetw]{3})/i],
            [
              [h, /\./g, " "],
              [_, "Microsoft"],
              [v, I],
            ],
            [
              /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
              /mot[\s-]?(\w+)*/i,
              /(XT\d{3,4}) build\//i,
              /(nexus\s6)/i,
            ],
            [h, [_, "Motorola"], [v, I]],
            [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
            [h, [_, "Motorola"], [v, T]],
            [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
            [
              [_, w.trim],
              [h, w.trim],
              [v, S],
            ],
            [/hbbtv.+maple;(\d+)/i],
            [
              [h, /^/, "SmartTV"],
              [_, "Samsung"],
              [v, S],
            ],
            [/\(dtv[\);].+(aquos)/i],
            [h, [_, "Sharp"], [v, S]],
            [
              /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
              /((SM-T\w+))/i,
            ],
            [[_, "Samsung"], h, [v, T]],
            [/smart-tv.+(samsung)/i],
            [_, [v, S], h],
            [
              /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
              /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
              /sec-((sgh\w+))/i,
            ],
            [[_, "Samsung"], h, [v, I]],
            [/sie-(\w+)*/i],
            [h, [_, "Siemens"], [v, I]],
            [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
            [[_, "Nokia"], h, [v, I]],
            [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
            [h, [_, "Acer"], [v, T]],
            [/android.+([vl]k\-?\d{3})\s+build/i],
            [h, [_, "LG"], [v, T]],
            [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
            [[_, "LG"], h, [v, T]],
            [/(lg) netcast\.tv/i],
            [_, h, [v, S]],
            [
              /(nexus\s[45])/i,
              /lg[e;\s\/-]+(\w+)*/i,
              /android.+lg(\-?[\d\w]+)\s+build/i,
            ],
            [h, [_, "LG"], [v, I]],
            [/android.+(ideatab[a-z0-9\-\s]+)/i],
            [h, [_, "Lenovo"], [v, T]],
            [/linux;.+((jolla));/i],
            [_, h, [v, I]],
            [/((pebble))app\/[\d\.]+\s/i],
            [_, h, [v, A]],
            [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
            [_, h, [v, I]],
            [/crkey/i],
            [
              [h, "Chromecast"],
              [_, "Google"],
            ],
            [/android.+;\s(glass)\s\d/i],
            [h, [_, "Google"], [v, A]],
            [/android.+;\s(pixel c)\s/i],
            [h, [_, "Google"], [v, T]],
            [/android.+;\s(pixel xl|pixel)\s/i],
            [h, [_, "Google"], [v, I]],
            [
              /android.+(\w+)\s+build\/hm\1/i,
              /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
              /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w?)?[\s_]*(?:plus)?)\s+build/i,
              /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+)?)\s+build/i,
            ],
            [
              [h, /_/g, " "],
              [_, "Xiaomi"],
              [v, I],
            ],
            [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+)?)\s+build/i],
            [
              [h, /_/g, " "],
              [_, "Xiaomi"],
              [v, T],
            ],
            [/android.+;\s(m[1-5]\snote)\sbuild/i],
            [h, [_, "Meizu"], [v, T]],
            [
              /android.+a000(1)\s+build/i,
              /android.+oneplus\s(a\d{4})\s+build/i,
            ],
            [h, [_, "OnePlus"], [v, I]],
            [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
            [h, [_, "RCA"], [v, T]],
            [/android.+[;\/]\s*(Venue[\d\s]*)\s+build/i],
            [h, [_, "Dell"], [v, T]],
            [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
            [h, [_, "Verizon"], [v, T]],
            [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
            [[_, "Barnes & Noble"], h, [v, T]],
            [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
            [h, [_, "NuVision"], [v, T]],
            [/android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i],
            [[_, "ZTE"], h, [v, T]],
            [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
            [h, [_, "Swiss"], [v, I]],
            [/android.+[;\/]\s*(zur\d{3})\s+build/i],
            [h, [_, "Swiss"], [v, T]],
            [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
            [h, [_, "Zeki"], [v, T]],
            [
              /(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i,
              /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i,
            ],
            [[_, "Dragon Touch"], h, [v, T]],
            [/android.+[;\/]\s*(NS-?.+)\s+build/i],
            [h, [_, "Insignia"], [v, T]],
            [/android.+[;\/]\s*((NX|Next)-?.+)\s+build/i],
            [h, [_, "NextBook"], [v, T]],
            [
              /android.+[;\/]\s*(Xtreme\_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i,
            ],
            [[_, "Voice"], h, [v, I]],
            [/android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i],
            [[_, "LvTel"], h, [v, I]],
            [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
            [h, [_, "Envizen"], [v, T]],
            [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i],
            [_, h, [v, T]],
            [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
            [h, [_, "MachSpeed"], [v, T]],
            [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
            [_, h, [v, T]],
            [/android.+[;\/]\s*TU_(1491)\s+build/i],
            [h, [_, "Rotor"], [v, T]],
            [/android.+(KS(.+))\s+build/i],
            [h, [_, "Amazon"], [v, T]],
            [/android.+(Gigaset)[\s\-]+(Q.+)\s+build/i],
            [_, h, [v, T]],
            [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
            [[v, w.lowerize], _, h],
            [/(android.+)[;\/].+build/i],
            [h, [_, "Generic"]],
          ],
          engine: [
            [/windows.+\sedge\/([\w\.]+)/i],
            [m, [g, "EdgeHTML"]],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
              /(icab)[\/\s]([23]\.[\d\.]+)/i,
            ],
            [g, m],
            [/rv\:([\w\.]+).*(gecko)/i],
            [m, g],
          ],
          os: [
            [/microsoft\s(windows)\s(vista|xp)/i],
            [g, m],
            [
              /(windows)\snt\s6\.2;\s(arm)/i,
              /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,
              /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
            ],
            [g, [m, D.str, R.os.windows.version]],
            [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
            [
              [g, "Windows"],
              [m, D.str, R.os.windows.version],
            ],
            [/\((bb)(10);/i],
            [[g, "BlackBerry"], m],
            [
              /(blackberry)\w*\/?([\w\.]+)*/i,
              /(tizen)[\/\s]([\w\.]+)/i,
              /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
              /linux;.+(sailfish);/i,
            ],
            [g, m],
            [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
            [[g, "Symbian"], m],
            [/\((series40);/i],
            [g],
            [/mozilla.+\(mobile;.+gecko.+firefox/i],
            [[g, "Firefox OS"], m],
            [
              /(nintendo|playstation)\s([wids34portablevu]+)/i,
              /(mint)[\/\s\(]?(\w+)*/i,
              /(mageia|vectorlinux)[;\s]/i,
              /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
              /(hurd|linux)\s?([\w\.]+)*/i,
              /(gnu)\s?([\w\.]+)*/i,
            ],
            [g, m],
            [/(cros)\s[\w]+\s([\w\.]+\w)/i],
            [[g, "Chromium OS"], m],
            [/(sunos)\s?([\w\.]+\d)*/i],
            [[g, "Solaris"], m],
            [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
            [g, m],
            [/(haiku)\s(\w+)/i],
            [g, m],
            [
              /cfnetwork\/.+darwin/i,
              /ip[honead]+(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
            ],
            [
              [m, /_/g, "."],
              [g, "iOS"],
            ],
            [
              /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
              /(macintosh|mac(?=_powerpc)\s)/i,
            ],
            [
              [g, "Mac OS"],
              [m, /_/g, "."],
            ],
            [
              /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,
              /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,
              /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
              /(unix)\s?([\w\.]+)*/i,
            ],
            [g, m],
          ],
        },
        N = function (e, t) {
          if (
            ("object" == typeof e && ((t = e), (e = a)), !(this instanceof N))
          )
            return new N(e, t).getResult();
          var n =
              e ||
              (r && r.navigator && r.navigator.userAgent
                ? r.navigator.userAgent
                : s),
            i = t ? w.extend(C, t) : C;
          return (
            (this.getBrowser = function () {
              var e = { name: a, version: a };
              return (
                D.rgx.call(e, n, i.browser), (e.major = w.major(e.version)), e
              );
            }),
            (this.getCPU = function () {
              var e = { architecture: a };
              return D.rgx.call(e, n, i.cpu), e;
            }),
            (this.getDevice = function () {
              var e = { vendor: a, model: a, type: a };
              return D.rgx.call(e, n, i.device), e;
            }),
            (this.getEngine = function () {
              var e = { name: a, version: a };
              return D.rgx.call(e, n, i.engine), e;
            }),
            (this.getOS = function () {
              var e = { name: a, version: a };
              return D.rgx.call(e, n, i.os), e;
            }),
            (this.getResult = function () {
              return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU(),
              };
            }),
            (this.getUA = function () {
              return n;
            }),
            (this.setUA = function (e) {
              return (n = e), this;
            }),
            this
          );
        };
      (N.VERSION = o),
        (N.BROWSER = { NAME: g, MAJOR: p, VERSION: m }),
        (N.CPU = { ARCHITECTURE: E }),
        (N.DEVICE = {
          MODEL: h,
          VENDOR: _,
          TYPE: v,
          CONSOLE: y,
          MOBILE: I,
          SMARTTV: S,
          TABLET: T,
          WEARABLE: A,
          EMBEDDED: b,
        }),
        (N.ENGINE = { NAME: g, VERSION: m }),
        (N.OS = { NAME: g, VERSION: m }),
        typeof t !== l
          ? (typeof e !== l && e.exports && (t = e.exports = N),
            (t.UAParser = N))
          : "function" === c && n(170)
          ? ((i = function () {
              return N;
            }.call(t, n, t, e)),
            !(i !== a && (e.exports = i)))
          : r && (r.UAParser = N);
    })("object" == typeof window ? window : this);
  },
  function (e, t) {
    (function (t) {
      e.exports = t;
    }.call(t, {}));
  },
  function (e, t) {
    e.exports = {
      provides: "browserId",
      shouldTrack: !0,
      isSticky: !0,
      getter: [
        "sources/browser_id",
        function (e) {
          return e.getId();
        },
      ],
    };
  },
  function (e, t) {
    e.exports = {
      provides: "browserVersion",
      getter: [
        "sources/browser_id",
        function (e) {
          return e.getVersion();
        },
      ],
    };
  },
  function (e, t, n) {
    var i = n(174).compareVersion;
    e.exports = {
      fieldsNeeded: ["browserVersion", "browserId"],
      match: function (e, t) {
        var n = t.value,
          r = e.browserId,
          a = e.browserVersion;
        if (0 === n.indexOf(r)) {
          var o = n.substr(r.length);
          return 0 === i(a, o);
        }
        return !1;
      },
    };
  },
  function (e, t, n) {
    var i = n(2);
    t.compareVersion = function (e, t) {
      if (!t) return 0;
      for (
        var n = t.toString().split("."), r = e.toString().split("."), a = 0;
        a < n.length;
        a++
      ) {
        if (i.isUndefined(r[a])) return -1;
        if (isNaN(Number(r[a]))) {
          if (r[a] !== n[a]) return -1;
        } else {
          if (Number(r[a]) < Number(n[a])) return -1;
          if (Number(r[a]) > Number(n[a])) return 1;
        }
      }
      return 0;
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(176)),
        e.registerAudienceMatcher("campaign", n(177));
    };
  },
  function (e, t, n) {
    var i = n(119);
    e.exports = {
      provides: "campaign",
      shouldTrack: !0,
      isSticky: !0,
      getter: [
        function () {
          return i.getQueryParamValue("utm_campaign");
        },
      ],
    };
  },
  function (e, t, n) {
    var i = n(20);
    e.exports = {
      fieldsNeeded: ["campaign"],
      match: function (e, t) {
        return i.hasMatch(t.value, t.match, e.campaign);
      },
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(179)),
        e.registerAudienceMatcher("cookies", n(180));
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(75),
      a = n(16),
      o = a.get("stores/audience_data");
    e.exports = {
      provides: "cookies",
      isLazy: !0,
      getter: [
        function () {
          var e = r.getAll(),
            t = o.getFeaturesNeeded("cookies");
          return i.reduce(
            e,
            function (e, n, r) {
              return i.has(t, r) && (e[r] = n), e;
            },
            {}
          );
        },
      ],
    };
  },
  function (e, t, n) {
    var i = n(20);
    e.exports = {
      fieldsNeeded: ["cookies"],
      match: function (e, t) {
        var n = t.name,
          r = t.value,
          a = t.match,
          o = e.cookies[n];
        return i.hasMatch(r, a, o);
      },
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(182));
      var t = n(183);
      e.registerAudienceMatcher("custom_attribute", t),
        e.registerAudienceMatcher("custom_dimension", t);
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(25),
      a = n(23),
      o = n(16),
      s = o.get("stores/dimension_data");
    e.exports = {
      provides: "custom",
      attributionType: r.AttributionTypes.LAST_TOUCH,
      restorer: function (e) {
        return i.reduce(
          e,
          function (e, t, n) {
            var r = n,
              o = s.getByApiName(n),
              u = s.getById(n),
              c = u;
            return i.isObject(t)
              ? (!t.id &&
                  o &&
                  ((c = o),
                  (r = o.id),
                  i.extend(t, { id: c.segmentId || c.id })),
                t.name || (c && c.apiName && (t.name = c.apiName)),
                t.id ||
                  c ||
                  a.warn(
                    "Unable to determine ID for custom attribute:",
                    n,
                    "; segmentation is disabled."
                  ),
                (e[r] = t),
                e)
              : (a.error(
                  'Unable to restore custom attribute "' +
                    n +
                    '" because value is not an object'
                ),
                e);
          },
          {}
        );
      },
      shouldTrack: !0,
    };
  },
  function (e, t, n) {
    var i = n(2),
      r = n(20);
    t.match = function (e, t) {
      var n;
      return (
        e.custom && (n = e.custom[t.name]),
        i.isObject(n) && (n = n.value),
        r.hasMatch(t.value, t.match, n)
      );
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerDependency("sources/device", n(185)),
        e.registerVisitorProfileProvider(n(186)),
        e.registerAudienceMatcher("device", n(187));
    };
  },
  function (e, t, n) {
    var i = n(167);
    t.getDevice = function () {
      var e = i.get().device;
      return "unknown" !== e.model
        ? e.model
        : "tablet" === e.type
        ? "tablet"
        : e.isMobile
        ? "mobile"
        : "desktop";
    };
  },
  function (e, t) {
    e.exports = {
      provides: "device",
      shouldTrack: !0,
      isSticky: !0,
      getter: [
        "sources/device",
        function (e) {
          return e.getDevice();
        },
      ],
    };
  },
  function (e, t) {
    e.exports = {
      fieldsNeeded: ["device"],
      match: function (e, t) {
        return e.device === t.value;
      },
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(189)),
        e.registerAudienceMatcher("device_type", n(190));
    };
  },
  function (e, t, n) {
    var i = n(167);
    e.exports = {
      provides: "device_type",
      shouldTrack: !0,
      isSticky: !0,
      getter: [
        function () {
          var e = i.get().device;
          switch (e.type) {
            case "mobile":
              return "phone";
            case "tablet":
            case "desktop_laptop":
              return e.type;
            default:
              return "other";
          }
        },
      ],
    };
  },
  function (e, t) {
    e.exports = {
      fieldsNeeded: ["device_type"],
      match: function (e, t) {
        return e.device_type === t.value;
      },
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(192)),
        e.registerAudienceMatcher("referrer", n(193));
    };
  },
  function (e, t, n) {
    var i = n(80),
      r = n(99);
    e.exports = {
      provides: "referrer",
      shouldTrack: !0,
      isSticky: !0,
      getter: [
        function () {
          var e = r.getReferrer() || i.getReferrer();
          return "" === e && (e = null), e;
        },
      ],
    };
  },
  function (e, t, n) {
    var i = n(194);
    (t.fieldsNeeded = ["referrer"]),
      (t.match = function (e, t) {
        return null !== e.referrer && i(e.referrer, t);
      });
  },
  function (e, t, n) {
    function i(e) {
      var t = e.indexOf("?");
      return (
        t !== -1 && (e = e.substring(0, t)),
        (t = e.indexOf("#")),
        t !== -1 && (e = e.substring(0, t)),
        e
      );
    }
    function r(e) {
      return a(i(e));
    }
    function a(e, t) {
      (e = e.replace("/?", "?")), (e = e.toLowerCase().replace(/[\/&?]+$/, ""));
      var n = l.slice(0);
      t || (n = n.concat(u));
      for (var i = n.length, r = 0; r < i; r++) {
        var a = n[r],
          o = new RegExp("^" + a);
        e = e.replace(o, "");
      }
      return e;
    }
    function o(e) {
      var t = e.split("?");
      if (t[1]) {
        var n = t[1].split("#"),
          i = n[0],
          r = n[1],
          a = i.split("&"),
          o = [];
        return (
          s.each(a, function (e) {
            0 !== e.indexOf(c) && o.push(e);
          }),
          (t[1] = ""),
          o.length > 0 && (t[1] = "?" + o.join("&")),
          r && (t[1] += "#" + r),
          t.join("")
        );
      }
      return e;
    }
    var s = n(2);
    e.exports = function (e, t) {
      e = o(e);
      var n = t.value;
      switch (t.match) {
        case "exact":
          return (e = a(e)), e === a(n);
        case "regex":
          try {
            return Boolean(e.match(n));
          } catch (e) {}
          return !1;
        case "simple":
          return (e = r(e)), (n = r(n)), e === n;
        case "substring":
          return (e = a(e, !0)), (n = a(n, !0)), e.indexOf(n) !== -1;
        default:
          return !1;
      }
    };
    var u = ["www."],
      c = "optimizely_",
      l = [
        "https?://.*?.?optimizelyedit.(com|test)/",
        "https?://.*.?optimizelypreview.(com|test)/",
        "https?://(edit|preview)(-hrd|-devel)?.optimizely.(com|test)/",
        "https?://.*?.?optimizelyedit(-hrd)?.appspot.com/",
        "https?://",
      ];
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(196)),
        e.registerAudienceMatcher("source_type", n(198));
    };
  },
  function (e, t, n) {
    var i = n(119),
      r = n(80),
      a = n(99),
      o = n(197),
      s = [
        "google\\.\\w{2,3}(\\.\\w{2,3})?/(search|url)",
        "bing\\.\\w{2,3}(\\.\\w{2,3})?/(search|url)",
        "yahoo\\.\\w{2,3}(\\.\\w{2,3})?/search",
        "baidu\\.\\w{2,3}(\\.\\w{2,3})?/",
        "https://(www)?\\.google\\..*?/?$",
        "https://search\\.yahoo\\..*?/?$",
        "https://(www)?\\.bing\\..*?/?$",
      ];
    e.exports = {
      provides: "source_type",
      shouldTrack: !0,
      isSticky: !1,
      getter: [
        function () {
          return function (e, t) {
            var n = function () {
                if (
                  i.getQueryParamValue("utm_source") ||
                  i.getQueryParamValue("gclid") ||
                  i.getQueryParamValue("otm_source")
                )
                  return "campaign";
                for (
                  var e = a.getReferrer() || r.getReferrer(), t = 0;
                  t < s.length;
                  t++
                ) {
                  var n = s[t],
                    u = e.match(n);
                  if (u) return "search";
                }
                return e && o.guessDomain(e) !== o.guessDomain(i.getUrl())
                  ? "referral"
                  : "direct";
              },
              u = function (e, t) {
                return !e || "direct" !== t;
              },
              c = e(),
              l = n();
            u(c, l) && t(l);
          };
        },
      ],
    };
  },
  function (e, t) {
    t.guessDomain = function (e, t) {
      if (!e) return "";
      try {
        return t
          ? e.match(/:\/\/(.[^\/]+)/)[1]
          : e.match(/:\/\/(?:www[0-9]?\.)?(.[^\/:]+)/)[1];
      } catch (e) {
        return "";
      }
    };
  },
  function (e, t, n) {
    var i = n(20);
    (t.fieldsNeeded = ["source_type"]),
      (t.match = function (e, t) {
        return i.hasMatch(t.value, t.match, e.source_type);
      });
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerVisitorProfileProvider(n(200)),
        e.registerVisitorProfileProvider(n(201)),
        e.registerAudienceMatcher("time_and_day", n(202));
    };
  },
  function (e, t, n) {
    var i = n(24);
    e.exports = {
      provides: "currentTimestamp",
      shouldTrack: !0,
      isLazy: !0,
      getter: [
        function () {
          return i.now();
        },
      ],
    };
  },
  function (e, t) {
    e.exports = {
      provides: "offset",
      shouldTrack: !0,
      isLazy: !0,
      getter: [
        function () {
          return new Date().getTimezoneOffset();
        },
      ],
    };
  },
  function (e, t, n) {
    var i = n(203);
    (t.fieldsNeeded = ["currentTimestamp"]),
      (t.match = function (e, t) {
        return i.test(t.value, new Date(e.currentTimestamp));
      });
  },
  function (e, t, n) {
    function i(e) {
      var t = e.split(o);
      if (3 !== t.length) throw new Error("Invalid time and day string " + e);
      var n = t[2].split(s);
      return { start_time: t[0], end_time: t[1], days: n };
    }
    function r(e) {
      var t = e.split(u);
      if (2 !== t.length)
        throw new Error(
          "optly.timeAndDayInterval.timeStringToMinutes: Invalid time string " +
            e
        );
      return 60 * parseInt(t[0], 10) + parseInt(t[1], 10);
    }
    var a = n(2),
      o = "_",
      s = ",",
      u = ":";
    t.test = function (e, t) {
      var n = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ],
        o = i(e),
        s = r(o.start_time),
        u = r(o.end_time),
        c = 60 * t.getHours() + t.getMinutes(),
        l = n[t.getDay()];
      return c >= s && c <= u && a.includes(o.days, l);
    };
  },
  function (e, t, n) {
    function i(e) {
      function t(e, t, n) {
        try {
          u(t), (e[n] = t);
        } catch (e) {
          O.emitError(
            new X("Bad value for eventTags[" + n + "]: " + e.message)
          );
        }
        return e;
      }
      var n = N.keys(ne),
        i = N.omit(e, n),
        r = N.pick(e, n),
        a = N.reduce(i, t, {}),
        o = N.reduce(
          r,
          function (e, n, i) {
            var r = ne[i];
            r.excludeFeature || t(a, n, i);
            try {
              r.validate(n), (e[i] = r.sanitize(n)), (a[i] = e[i]);
            } catch (e) {
              O.emitError(
                new X("Bad value for eventMetrics[" + i + "]: " + e.message)
              );
            }
            return e;
          },
          {}
        );
      return (o.tags = a), o;
    }
    function r(e) {
      var t = N.extend(
        {
          entity_id: e.pageId,
          key: e.pageApiName,
          timestamp: e.timestamp,
          uuid: e.eventId,
          type: J,
        },
        i(e.eventTags)
      );
      return t;
    }
    function a(e) {
      return N.extend(
        {
          entity_id: e.eventEntityId,
          key: e.eventApiName,
          timestamp: e.timestamp,
          uuid: e.eventId,
          type: e.eventCategory,
        },
        i(e.eventTags)
      );
    }
    function o(e) {
      return N.extend(
        {
          entity_id: e.eventEntityId,
          key: e.eventApiName,
          timestamp: e.timestamp,
          uuid: e.eventId,
          type: e.eventCategory,
        },
        i(e.eventTags)
      );
    }
    function s(e) {
      return {
        entity_id: null,
        type: $,
        uuid: e.eventId,
        timestamp: e.timestamp,
      };
    }
    function u(e) {
      if (null == e) throw new Error("Feature value is null");
      if ("object" == typeof e) {
        var t;
        try {
          t = V.stringify(e);
        } catch (e) {}
        throw new Error('Feature value is complex: "' + t || '[object]"');
      }
    }
    function c(e) {
      if (null == e) throw new Error("Metric value is null");
      if (!N.isNumber(e)) throw new Error("Metric value is not numeric");
    }
    function l(e) {
      return N.reduce(
        e,
        function (e, t) {
          try {
            u(t.value),
              e.push({
                entity_id: t.id || null,
                key: t.name,
                type: t.type,
                value: t.value,
              });
          } catch (e) {
            F.warn("Error evaluating user feature", t, e);
          }
          return e;
        },
        []
      );
    }
    function d(e, t, n) {
      Y.dispatch(P.REGISTER_TRACKER_EVENT, { event: e, decisions: n }),
        f(t),
        D();
    }
    function f(e) {
      var t = l(e);
      Y.dispatch(P.UPDATE_TRACKER_VISITOR_ATTRIBUTES, { attributes: t });
    }
    function p(e) {
      var t = l(e.userFeatures),
        n = {
          account_id: e.accountId,
          anonymize_ip: e.anonymizeIP,
          client_name: e.clientName,
          client_version: e.clientVersion,
          project_id: e.projectId,
          visitors: [
            {
              session_id: g(e.sessionId),
              visitor_id: e.visitorId,
              attributes: t,
              snapshots: [
                {
                  decisions: [
                    {
                      campaign_id: e.layerId,
                      experiment_id: e.experimentId,
                      variation_id: e.variationId,
                      is_campaign_holdback: e.isLayerHoldback,
                    },
                  ],
                  events: [
                    {
                      uuid: e.decisionId,
                      entity_id: e.layerId,
                      timestamp: e.timestamp,
                      type: Q,
                    },
                  ],
                },
              ],
            },
          ],
        };
      Y.dispatch(P.REGISTER_PREVIOUS_BATCH, n), D();
    }
    function h(e) {
      var t = N.isNull(q.getAnonymizeIP()) ? void 0 : q.getAnonymizeIP(),
        n = {
          account_id: e.accountId,
          anonymize_ip: t,
          client_name: e.clientName,
          client_version: e.clientVersion,
          project_id: e.projectId,
          visitors: [],
        };
      (n.revision = e.revision), Z && (n.enrich_decisions = !0);
      var i = {
          session_id: g(e.sessionId),
          visitor_id: e.visitorId,
          attributes: [],
          snapshots: [],
        },
        r = R(e.layerStates);
      Y.dispatch(P.REGISTER_TRACKER_VISITOR, {
        data: n,
        visitor: i,
        decisions: r,
      }),
        D();
    }
    function g(e) {
      return oe ? ae : e;
    }
    function v(e) {
      var t = {
        entity_id: e.layerId,
        type: Q,
        uuid: e.decisionId,
        timestamp: e.timestamp,
      };
      Y.dispatch(P.REGISTER_TRACKER_DECISION, {
        decisionEvent: t,
        decisions: R(e.layerStates),
      }),
        f(e.userFeatures),
        D();
    }
    function _() {
      if (!W.canSend()) return void F.debug("Not sending events (holding)");
      var e = W.hasEventsToSend(),
        t = W.hasPreviousBatchesToSend();
      return e || t
        ? (t &&
            (N.each(W.getPreviousBatches(), m),
            Y.dispatch(P.RESET_TRACKER_PREVIOUS_BATCHES)),
          void (
            e &&
            (Y.dispatch(P.FINALIZE_BATCH_SNAPSHOT),
            m(W.getEventBatch()),
            Y.dispatch(P.RESET_TRACKER_EVENTS))
          ))
        : void F.debug(
            "Not sending events because there are no events to send"
          );
    }
    function m(e) {
      F.debug("Sending ticket:", e);
      var t = x.generate();
      B.retryableRequest({ url: L, method: "POST", data: E(e) }, t);
    }
    function E(e) {
      var t = N.extend(
        {},
        N.pick(e, [
          "account_id",
          "anonymize_ip",
          "client_name",
          "client_version",
          "enrich_decisions",
          "project_id",
          "revision",
        ]),
        { visitors: N.map(e.visitors, y) }
      );
      return t;
    }
    function y(e) {
      return {
        visitor_id: e.visitor_id,
        session_id: ae,
        attributes: N.map(e.attributes, I),
        snapshots: N.map(e.snapshots, T),
      };
    }
    function I(e) {
      return w(e, { entity_id: "e", key: "k", type: "t", value: "v" });
    }
    function T(e) {
      var t = e.events;
      return (
        (t = S(t)),
        {
          activationTimestamp: q.getActivationTimestamp(),
          decisions: N.map(e.decisions, A),
          events: N.map(t, b),
        }
      );
    }
    function S(e) {
      var t = N.reduce(
        e,
        function (e, t) {
          var n,
            i =
              t.type === J &&
              N.isEmpty(t.tags) &&
              N.isEmpty(N.pick(t, N.keys(ne)));
          if (((n = i ? t.type : t.uuid), e[n])) {
            var r = e[n].timestamp;
            t.timestamp > r && (r = t.timestamp),
              (e[n] = N.extend({}, e[n], {
                key: e[n].key + "-" + (t.key || ""),
                entity_id: e[n].entity_id + "-" + t.entity_id,
                timestamp: r,
              }));
          } else e[n] = t;
          return e;
        },
        {}
      );
      return N.values(t);
    }
    function A(e) {
      return w(e, {
        campaign_id: "c",
        experiment_id: "x",
        is_campaign_holdback: "h",
        variation_id: "v",
      });
    }
    function b(e) {
      return (
        e.key === Q && ((e.type = Q), delete e.key),
        w(e, {
          entity_id: "e",
          key: "k",
          quantity: "q",
          revenue: "$",
          tags: "a",
          timestamp: "t",
          uuid: "u",
          value: "v",
          type: "y",
        })
      );
    }
    function w(e, t) {
      return N.reduce(
        e,
        function (e, n, i) {
          return i in t && (e[t[i] || i] = n), e;
        },
        {}
      );
    }
    function D() {
      function e() {
        var t = !ie || H.isLoaded();
        t && _(), W.isPolling() && G.setTimeout(e, te);
      }
      return W.shouldBatch()
        ? void (
            W.isPolling() ||
            (G.setTimeout(e, te),
            Y.dispatch(P.SET_TRACKER_POLLING, !0),
            G.setTimeout(function () {
              Y.dispatch(P.SET_TRACKER_BATCHING, !1),
                Y.dispatch(P.SET_TRACKER_POLLING, !1);
            }, ee))
          )
        : void _();
    }
    function R(e) {
      return N.map(e, function (e) {
        return {
          campaign_id: e.layerId,
          experiment_id: e.decision.experimentId,
          variation_id: e.decision.variationId,
          is_campaign_holdback: e.decision.isLayerHoldback,
        };
      });
    }
    function C() {
      var e = W.getPersistableState();
      if (e)
        try {
          F.debug("Persisting pending batch:", e),
            U.persistTrackerOptimizelyData(e),
            Y.dispatch(P.SET_TRACKER_DIRTY, !1);
        } catch (e) {
          F.debug("Failed to persist pending batch:", e);
        }
    }
    var N = n(2),
      O = n(86),
      x = n(5),
      L = "https://logx.optimizely.com/v1/events",
      P = n(7),
      k = n(76).create,
      V = n(26),
      F = n(23),
      M = n(115),
      U = n(74),
      G = n(40),
      B = n(91),
      j = n(16),
      H = n(80),
      z = n(87),
      K = n(111),
      Y = n(9),
      q = j.get("stores/global"),
      W = j.get("stores/tracker_optimizely"),
      X = (t.Error = k("OptimizelyTrackerError")),
      $ = "client_activation",
      Q = "campaign_activated",
      J = "view_activated",
      Z = !0,
      ee = 1e4,
      te = 1e3,
      ne = {
        revenue: { validate: c, sanitize: Math.floor, excludeFeature: !0 },
        quantity: { validate: c, sanitize: Math.floor, excludeFeature: !0 },
        value: { validate: c, sanitize: N.identity },
      },
      ie = !1,
      re = !1,
      ae = "AUTO",
      oe = !0,
      se = function (e) {
        e.timing === M.TrackLayerDecisionTimingFlags.postRedirectPolicy
          ? p(e)
          : v(e);
      },
      ue = [
        function () {
          return function (e) {
            d(r(e), e.userFeatures, R(e.layerStates));
          };
        },
      ],
      ce = [
        function () {
          return function (e) {
            h(e), d(s(e), e.userFeatures, R(e.layerStates));
          };
        },
      ],
      le = [
        function () {
          return function (e) {
            d(o(e), e.userFeatures, R(e.layerStates));
          };
        },
      ],
      de = [
        function () {
          return function (e) {
            d(a(e), e.userFeatures, R(e.layerStates));
          };
        },
      ],
      fe = {
        trackLayerDecision: se,
        postRedirectPolicy: M.PostRedirectPolicies.TRACK_AFTER_SYNC,
        nonRedirectPolicy: M.NonRedirectPolicies.TRACK_IMMEDIATELY,
        onPageActivated: ue,
        onClientActivation: ce,
        onClickEvent: de,
        onCustomEvent: le,
      };
    e.exports = function (e) {
      e.registerAnalyticsTracker("optimizely", fe),
        z.on({
          filter: { type: K.TYPES.ANALYTICS, name: "sendEvents" },
          handler: function () {
            Y.dispatch(P.SET_TRACKER_SEND_EVENTS, !0), W.isPolling() || _();
          },
        }),
        z.on({
          filter: { type: K.TYPES.ANALYTICS, name: "holdEvents" },
          handler: function () {
            Y.dispatch(P.SET_TRACKER_SEND_EVENTS, !1);
          },
        }),
        Y.dispatch(P.SET_TRACKER_SEND_EVENTS, !re);
      var t = z.on({
        filter: { type: "lifecycle", name: "activated" },
        handler: function () {
          W.observe(C), z.off(t);
        },
      });
    };
  },
  function (e, t, n) {
    e.exports = function (e) {
      e.registerViewProvider(n(206)), e.registerViewMatcher("url", n(207));
    };
  },
  function (e, t, n) {
    var i = n(119);
    e.exports = {
      provides: "url",
      getter: [
        function () {
          return i.getUrl();
        },
      ],
    };
  },
  function (e, t, n) {
    var i = n(194);
    e.exports = {
      fieldsNeeded: ["url"],
      match: function (e, t) {
        return i(e.url, t);
      },
    };
  },
  function (e, t, n) {
    var i = "element_present",
      r = {
        match: function (e, t) {
          return !!document.querySelector(t.value);
        },
      };
    e.exports = function (e) {
      e.registerViewMatcher(i, r);
    };
  },
  function (e, t, n) {
    var i = n(80),
      r = n(25),
      a = n(87),
      o = n(210),
      s = n(123),
      u = "DOMChanged",
      c = {
        token: void 0,
        setUpObserver: function () {
          o.createDOMChangedObserver(),
            (this.token = a.on({
              filter: { type: "viewTrigger", name: "DOMChanged" },
              handler: function () {
                s.getViewsAndActivate(r.ViewActivationTypes.DOMChanged);
              },
            }));
        },
        turnOffObserver: function () {
          a.off(this.token);
        },
      };
    e.exports = function (e) {
      i.isReady() ? c.setUpObserver() : i.addReadyHandler(c.setUpObserver),
        e.registerViewTrigger(u, c);
    };
  },
  function (e, t, n) {
    var i = n(80),
      r = n(87),
      a = n(211);
    t.createDOMChangedObserver = function () {
      var e = i.getDocumentElement(),
        t = { type: "viewTrigger", name: "DOMChanged" },
        n = { attributes: !0, childList: !0, subtree: !0, characterData: !0 },
        o = a.create(function () {
          r.emit(t, !0);
        });
      a.observe(o, e, n);
    };
  },
  function (e, t) {
    (t.create = function (e) {
      return new MutationObserver(e);
    }),
      (t.observe = function (e, t, n) {
        e.observe(t, n);
      });
  },
  function (e, t, n) {
    function i() {
      r(),
        a(),
        v.addEventListener("popstate", m, !1),
        v.addEventListener("hashchange", E, !1),
        d.on({
          filter: { type: "viewTrigger", name: "URLChanged" },
          handler: function () {
            g.getViewsAndActivate(l.ViewActivationTypes.URLChanged);
          },
        });
    }
    function r() {
      function e() {
        var e = p.getOriginalPushState().apply(this, arguments);
        return (
          h.resolve().then(function () {
            o("pushState");
          }),
          e
        );
      }
      f.dispatch(u.ENSURE_ORIGINAL_PUSHSTATE),
        (v.getGlobal("history").pushState = e);
    }
    function a() {
      function e() {
        var e = p.getOriginalReplaceState().apply(this, arguments);
        return (
          h.resolve().then(function () {
            o("replaceState");
          }),
          e
        );
      }
      f.dispatch(u.ENSURE_ORIGINAL_REPLACESTATE),
        (v.getGlobal("history").replaceState = e);
    }
    function o(e) {
      d.emit(
        {
          type: "viewTrigger",
          name: "URLChanged",
          data: { source: e, newURL: v.getHref() },
        },
        !0
      );
    }
    var s = n(2),
      u = n(7),
      c = n(16),
      l = n(25),
      d = n(87),
      f = n(9),
      p = c.get("stores/history"),
      h = n(12).Promise,
      g = n(123),
      v = n(40),
      _ = "URLChanged";
    e.exports = function (e) {
      i(), e.registerViewTrigger(_);
    };
    var m = s.partial(o, "popstate"),
      E = s.partial(o, "hashchange");
  },
  function (e, t, n) {
    function i(e) {
      return "apiName: " + e.apiName + ", selector: " + e.eventFilter.selector;
    }
    var r = n(110),
      a = n(214),
      o = n(23),
      s = n(123);
    e.exports = function (e) {
      var t = new a(function (e) {
        s.updateAllViewTags();
        var t = r.trackClickEvent(e);
        t
          ? o.log("Tracking click event:", e)
          : o.log("Not tracking click event:", e);
      });
      e.registerEventImplementation("click", {
        attach: function (e) {
          t.hasEvents() || t.listen(),
            t.addEvent(e),
            o.debug("Started listening for click event (" + i(e) + "):", e);
        },
        detach: function (e) {
          t.removeEvent(e),
            t.hasEvents() || t.unlisten(),
            o.debug("Stopped listening for click event (" + i(e) + "):", e);
        },
      });
    };
  },
  function (e, t, n) {
    function i(e) {
      (this.handler = e),
        (this.events = []),
        (this.unlistenFn = null),
        (this.clickHandler = a.bind(function (e) {
          a.forEach(
            this.events,
            a.bind(function (t) {
              try {
                var n =
                  t.config && t.config.selector
                    ? t.config.selector
                    : t.eventFilter.selector;
                r(e, n, t) && this.handler(t);
              } catch (e) {
                o.emitError(
                  new l(
                    "Unable to handle click for selector" + n + ":" + e.message
                  )
                );
              }
            }, this)
          );
        }, this));
    }
    function r(e, t, n) {
      for (var i = e.target, r = 0; i; ) {
        var s;
        try {
          s = c(i, t);
        } catch (s) {
          var u = {
            typeofElementValue: typeof i,
            nodeName: a.result(i, ["nodeName"], null),
            nodeType: a.result(i, ["nodeType"], null),
            targetName: a.result(e, ["target", "nodeName"], null),
            targetType: a.result(e, ["target", "nodeType"], null),
            numParentsTraversed: r,
            selector: t,
            errorMessage: s.message,
            eventId: n.id,
          };
          return (
            o.emitError(new l("Unable to evaluate match for element"), u), !1
          );
        }
        if (s) return !0;
        (i = i.parentElement), r++;
      }
      return !1;
    }
    var a = n(2),
      o = n(86),
      s = n(76).create,
      u = n(80),
      c = n(215),
      l = (t.Error = s("ClickDelegateError"));
    (i.prototype.listen = function () {
      this.unlistenFn = u.addEventListener("click", this.clickHandler, !0);
    }),
      (i.prototype.unlisten = function () {
        this.unlistenFn && (this.unlistenFn(), (this.unlistenFn = null));
      }),
      (i.prototype.hasEvents = function () {
        return this.events.length > 0;
      }),
      (i.prototype.addEvent = function (e) {
        this.events.push(e);
      }),
      (i.prototype.removeEvent = function (e) {
        this.events = a.filter(this.events, function (t) {
          return t.apiName !== e.apiName;
        });
      }),
      (e.exports = i);
  },
  function (e, t, n) {
    e.exports = n(216);
  },
  function (e, t) {
    "use strict";
    function n(e, t) {
      if (r) return r.call(e, t);
      for (var n = e.parentNode.querySelectorAll(t), i = 0; i < n.length; i++)
        if (n[i] == e) return !0;
      return !1;
    }
    var i = Element.prototype,
      r =
        i.matches ||
        i.matchesSelector ||
        i.webkitMatchesSelector ||
        i.mozMatchesSelector ||
        i.msMatchesSelector ||
        i.oMatchesSelector;
    e.exports = n;
  },
  function (e, t, n) {
    function i(e, t) {
      if (
        ((this.change = e),
        (this.identifier = t.identifier),
        (this.startTime = t.startTime),
        d.shouldObserveChangesIndefinitely())
      ) {
        h.dispatch(a.INITIALIZE_CHANGE_METRICS),
          (this.rateMeter = new v(E.MOVING_WINDOW_MILLISECONDS));
        var n = r.isNull(E.MAX_MACROTASKS_IN_MOVING_WINDOW)
          ? Number.POSITIVE_INFINITY
          : E.MAX_MACROTASKS_IN_MOVING_WINDOW;
        this.rateMeter.addListener(
          n,
          r.bind(function () {
            g.warn(
              "AppendChange",
              this,
              "has overheated and will no longer apply or reapply"
            ),
              this.cancel(),
              h.dispatch(a.RECORD_CHANGE_OVERHEATED),
              o.emitError(
                new y("Change " + this.identifier + " has overheated"),
                {
                  layerId: t.action && t.action.layerId,
                  experimentId: t.action && t.action.experimentId,
                  variationId: t.action && t.action.variationId,
                  changeId: e.id,
                  changeType: e.type,
                  movingWindowMilliseconds: E.MOVING_WINDOW_MILLISECONDS,
                  maxMacroTasksInMovingWindow: n,
                }
              );
          }, this)
        );
        for (var i = Math.min(n, 50), s = 0; s <= i; s++)
          this.rateMeter.addListener(
            s,
            r.partial(function (e) {
              h.dispatch(a.RECORD_CHANGE_MACROTASK_RATE, {
                changeMacrotaskRate: e,
              });
            }, s)
          );
      }
    }
    var r = n(2),
      a = n(7),
      o = n(86),
      s = n(138),
      u = n(76).create,
      c = n(218),
      l = n(219),
      d = n(16).get("stores/directive"),
      f = n(80),
      p = n(220),
      h = n(9),
      g = n(23),
      v = n(221),
      _ = n(137),
      m = n(100).create(),
      E = {
        MOVING_WINDOW_MILLISECONDS: 1e3,
        MAX_MACROTASKS_IN_MOVING_WINDOW: 10,
      },
      y = u("ChangeOverheatError");
    (i.prototype.numberOfRootNodes = function (e) {
      var t = document.createElement("div");
      return (t.innerHTML = e), t.childNodes.length;
    }),
      (i.prototype.getSiblingElements = function (e, t, n) {
        for (var i = e, r = [], a = 0; a < t; a++)
          n
            ? (r.push(i.nextSibling), (i = i.nextSibling))
            : (r.push(i.previousSibling), (i = i.previousSibling));
        return r;
      }),
      (i.prototype.apply = function () {
        this.applyDeferred = l();
        try {
          var e = this.numberOfRootNodes(this.change.value);
          if (!e)
            throw new Error(
              "No DOM elements to be created for this change: " +
                this.change.value
            );
          var t = r.partial(
              this.applyDeferred.reject,
              new Error("Unable to find selector.")
            ),
            n = {};
          d.shouldObserveChangesUntilTimeout()
            ? (n = {
                timeout: r.partial(_.isTimedOut, this.startTime),
                onTimeout: t,
              })
            : d.isEditor() &&
              m.waitUntil(r.partial(_.isTimedOut, this.startTime)).then(t, t),
            (this.unobserveSelector = m.observeSelector(
              this.change.selector,
              r.bind(this.maybeApplyToElement, this),
              n
            ));
          var i = f.querySelectorAll(this.change.selector);
          r.each(i, r.bind(this.maybeApplyToElement, this));
        } catch (e) {
          this.applyDeferred.reject(e);
        }
        return this.applyDeferred;
      }),
      (i.prototype.maybeApplyToElement = function (e) {
        var t = s.CHANGE_ID_ATTRIBUTE_PREFIX + this.change.id;
        if (e.hasAttribute(t))
          return (
            g.debug(
              "Not applying AppendChange to element",
              e,
              "because it was inserted by this change"
            ),
            void this.applyDeferred.resolve()
          );
        this.rateMeter && this.rateMeter.countCurrentTick();
        var n = r.bind(this.applyOrReapplyToElement, this, e, t);
        n(), this.applyDeferred.resolve();
      }),
      (i.prototype.applyOrReapplyToElement = function (e, t) {
        var n;
        switch (this.change.operator) {
          case p.DOMInsertionType.AFTER:
            n = p.insertAdjacentHTMLType.AFTER_END;
            break;
          case p.DOMInsertionType.APPEND:
            n = p.insertAdjacentHTMLType.BEFORE_END;
            break;
          case p.DOMInsertionType.BEFORE:
            n = p.insertAdjacentHTMLType.BEFORE_BEGIN;
            break;
          case p.DOMInsertionType.PREPEND:
            n = p.insertAdjacentHTMLType.AFTER_BEGIN;
            break;
          default:
            n = p.insertAdjacentHTMLType.BEFORE_END;
        }
        e.insertAdjacentHTML(n, this.change.value),
          e.setAttribute(t, ""),
          c.setData(e, this.change.id, this.identifier, []);
        var i,
          a,
          o = this.numberOfRootNodes(this.change.value) - 1;
        n === p.insertAdjacentHTMLType.BEFORE_END
          ? ((i = e.lastChild), (a = this.getSiblingElements(i, o, !1)))
          : n === p.insertAdjacentHTMLType.AFTER_BEGIN
          ? ((i = e.firstChild), (a = this.getSiblingElements(i, o, !0)))
          : n === p.insertAdjacentHTMLType.BEFORE_BEGIN
          ? ((i = e.previousSibling), (a = this.getSiblingElements(i, o, !1)))
          : n === p.insertAdjacentHTMLType.AFTER_END &&
            ((i = e.nextSibling), (a = this.getSiblingElements(i, o, !0))),
          a.unshift(i),
          r.each(
            a,
            r.bind(function (e) {
              var n = e.nodeType === Node.ELEMENT_NODE ? e : f.parentElement(e);
              n.setAttribute(t, "");
              var i = c.getData(n, this.change.id, this.identifier) || [];
              i.push(e),
                c.setData(n, this.change.id, this.identifier, i),
                r.each(f.childrenOf(n), function (e) {
                  e.setAttribute(t, "");
                });
            }, this)
          );
      }),
      (i.prototype.cancel = function () {
        this.unobserveSelector && this.unobserveSelector();
      }),
      (i.prototype.undo = function () {
        var e = s.CHANGE_ID_ATTRIBUTE_PREFIX + this.change.id,
          t = document.querySelectorAll("[" + e + "]");
        return (
          r.each(
            t,
            r.bind(function (t) {
              var n = c.getData(t, this.change.id, this.identifier) || [];
              r.each(n, function (e) {
                e.parentNode.removeChild(e);
              }),
                t.removeAttribute(e),
                c.removeData(t, this.change.id, this.identifier),
                r.each(f.childrenOf(t), function (t) {
                  t.removeAttribute(e);
                });
            }, this)
          ),
          l().resolve(p.changeState.UNAPPLIED)
        );
      }),
      (e.exports = function (e) {
        e.registerChangeApplier(p.changeType.APPEND, i);
      });
  },
  function (e, t, n) {
    function i(e, t) {
      return [e, t].join("_");
    }
    var r = n(2),
      a = n(138).CHANGE_DATA_KEY;
    (t.getData = function (e, t, n) {
      var r = i(t, n);
      return e[a] && e[a][r] ? e[a][r] : null;
    }),
      (t.hasData = function (e) {
        return Boolean(e && e[a] && !r.isEmpty(e[a]));
      }),
      (t.removeData = function (e, t, n) {
        e[a] && delete e[a][i(t, n)];
      }),
      (t.setData = function (e, t, n, r) {
        if ("object" != typeof r) throw new Error("setData expects an object");
        e[a] || (e[a] = {}), (e[a][i(t, n)] = r);
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(12).Promise,
      a = function () {
        var e,
          t,
          n = new r(function (n, i) {
            (e = n), (t = i);
          });
        return (
          (n.resolve = function () {
            return e.apply(null, i.toArray(arguments)), n;
          }),
          (n.reject = function () {
            return t.apply(null, i.toArray(arguments)), n;
          }),
          n
        );
      };
    e.exports = a;
  },
  function (e, t, n) {
    var i = n(8);
    e.exports = {
      changeType: {
        CUSTOM_CODE: "custom_code",
        ATTRIBUTE: "attribute",
        APPEND: "append",
        REARRANGE: "rearrange",
        REDIRECT: "redirect",
        WIDGET: "widget",
      },
      DOMInsertionType: {
        AFTER: "after",
        APPEND: "append",
        BEFORE: "before",
        PREPEND: "prepend",
      },
      insertAdjacentHTMLType: {
        AFTER_BEGIN: "afterbegin",
        AFTER_END: "afterend",
        BEFORE_BEGIN: "beforebegin",
        BEFORE_END: "beforeend",
      },
      selectorChangeType: {
        CLASS: "class",
        HTML: "html",
        HREF: "href",
        SRC: "src",
        STYLE: "style",
        TEXT: "text",
        HIDE: "hide",
        REMOVE: "remove",
      },
      changeApplierState: i({
        APPLIED: null,
        APPLYING: null,
        UNAPPLIED: null,
        UNDOING: null,
      }),
      changeState: i({
        BLOCKED: null,
        UNAPPLIED: null,
        APPLIED: null,
        APPLYING: null,
        UNDOING: null,
        TIMED_OUT: null,
        IGNORED: null,
        ERROR: null,
      }),
    };
  },
  function (e, t, n) {
    function i(e) {
      (this.windowLength = e),
        (this.count = 0),
        (this.listeners = {}),
        (this.isIncrementingTick = !1);
    }
    var r = n(2),
      a = n(23),
      o = n(40);
    (i.prototype.countCurrentTick = function () {
      this.isIncrementingTick ||
        ((this.isIncrementingTick = !0),
        this.increment(),
        o.setTimeout(
          r.bind(function () {
            this.isIncrementingTick = !1;
          }, this),
          0
        ));
    }),
      (i.prototype.increment = function () {
        (this.count += 1),
          r.forEach(this.listeners[String(this.count)], function (e) {
            e();
          }),
          o.setTimeout(r.bind(this.decrement, this), this.windowLength);
      }),
      (i.prototype.decrement = function () {
        (this.count -= 1),
          this.count < 0 &&
            (a.warn("Decremented down to negative count: ", this.count),
            (this.count = 0));
      }),
      (i.prototype.addListener = function (e, t) {
        this.listeners[e] || (this.listeners[e] = []),
          this.listeners[e].push(t);
      }),
      (e.exports = i);
  },
  function (e, t, n) {
    function i(e, t) {
      if (
        ((this.change = r.cloneDeep(e)),
        (this.change = y.transformVisibilityAttributesToCSS(this.change)),
        (this.identifier = t.identifier),
        (this.startTime = t.startTime),
        (this.disconnectObserverQueue = []),
        d.shouldObserveChangesIndefinitely())
      ) {
        h.dispatch(a.INITIALIZE_CHANGE_METRICS),
          (this.rateMeter = new _(S.MOVING_WINDOW_MILLISECONDS));
        var n = r.isNull(S.MAX_MACROTASKS_IN_MOVING_WINDOW)
          ? Number.POSITIVE_INFINITY
          : S.MAX_MACROTASKS_IN_MOVING_WINDOW;
        this.rateMeter.addListener(
          n,
          r.bind(function () {
            g.warn(
              "AttributeChange",
              this,
              "has overheated and will no longer apply or reapply"
            ),
              this.cancel(),
              h.dispatch(a.RECORD_CHANGE_OVERHEATED),
              o.emitError(
                new b("Change " + this.identifier + " has overheated"),
                {
                  layerId: t.action && t.action.layerId,
                  experimentId: t.action && t.action.experimentId,
                  variationId: t.action && t.action.variationId,
                  changeId: e.id,
                  changeType: e.type,
                  movingWindowMilliseconds: S.MOVING_WINDOW_MILLISECONDS,
                  maxMacroTasksInMovingWindow: n,
                }
              );
          }, this)
        );
        for (var i = Math.min(n, 50), s = 0; s <= i; s++)
          this.rateMeter.addListener(
            s,
            r.partial(function (e) {
              h.dispatch(a.RECORD_CHANGE_MACROTASK_RATE, {
                changeMacrotaskRate: e,
              });
            }, s)
          );
      }
      this.cancelled = !1;
    }
    var r = n(2),
      a = (n(12).Promise, n(7)),
      o = n(86),
      s = n(138),
      u = n(76).create,
      c = n(218),
      l = n(219),
      d = n(16).get("stores/directive"),
      f = n(80),
      p = n(220),
      h = n(9),
      g = n(23),
      v = n(211),
      _ = n(221),
      m = n(137),
      E = n(40),
      y = n(223),
      I = n(100).create(),
      T = { attributes: !0, childList: !0, subtree: !0, characterData: !0 },
      S = {
        MOVING_WINDOW_MILLISECONDS: 1e3,
        MAX_MACROTASKS_IN_MOVING_WINDOW: 10,
      },
      A = !0,
      b = u("ChangeOverheatError");
    (i.prototype.apply = function () {
      this.applyDeferred = l();
      try {
        if (r.isEmpty(this.change.attributes) && r.isEmpty(this.change.css))
          return (
            g.debug("Not applying empty AttributeChange"),
            this.applyDeferred.resolve(),
            this.applyDeferred
          );
        var e = r.partial(
            this.applyDeferred.reject,
            new Error("Unable to find selector.")
          ),
          t = {};
        d.shouldObserveChangesUntilTimeout()
          ? (t = {
              timeout: r.partial(m.isTimedOut, this.startTime),
              onTimeout: e,
            })
          : d.isEditor() &&
            I.waitUntil(r.partial(m.isTimedOut, this.startTime)).then(e, e),
          (this.unobserveSelector = I.observeSelector(
            this.change.selector,
            r.bind(this.maybeApplyToElement, this),
            t
          ));
        var n = f.querySelectorAll(this.change.selector);
        r.each(n, r.bind(this.maybeApplyToElement, this));
      } catch (e) {
        this.applyDeferred.reject(e);
      }
      return this.applyDeferred;
    }),
      (i.prototype.maybeApplyToElement = function (e) {
        var t = s.CHANGE_ID_ATTRIBUTE_PREFIX + this.change.id;
        if (e.hasAttribute(t))
          return (
            g.debug(
              "AttributeChange not being applied. Element already changed, or is a child of an element that was changed by this AttributeChange. " +
                e
            ),
            void this.applyDeferred.resolve()
          );
        this.rateMeter && this.rateMeter.countCurrentTick();
        var n = r.bind(this.applyOrReapplyToElement, this, e, t);
        if ((n(), A)) {
          var i = r.bind(function () {
              var t = r.bind(function () {
                this.cancelled || v.observe(a, e, T);
              }, this);
              E.setTimeout(t);
            }, this),
            a = v.create(
              r.bind(function () {
                this.rateMeter && this.rateMeter.countCurrentTick(),
                  a.disconnect(),
                  n(),
                  i();
              }, this)
            );
          i(), this.disconnectObserverQueue.push(r.bind(a.disconnect, a));
        }
        this.applyDeferred.resolve();
      }),
      (i.prototype.applyOrReapplyToElement = function (e, t) {
        var n = {};
        r.forOwn(this.change.attributes, function (i, a) {
          switch (a) {
            case p.selectorChangeType.CLASS:
              r.isUndefined(e.className) ||
                ((n[p.selectorChangeType.CLASS] = e.className),
                (e.className = i));
              break;
            case p.selectorChangeType.HREF:
              r.isUndefined(e.href) ||
                ((n[p.selectorChangeType.HREF] = e.href), (e.href = i));
              break;
            case p.selectorChangeType.HTML:
              r.isUndefined(e.innerHTML) ||
                ((n[p.selectorChangeType.HTML] = e.innerHTML),
                (e.innerHTML = i),
                r.each(f.childrenOf(e), function (e) {
                  e.setAttribute(t, "");
                }));
              break;
            case p.selectorChangeType.SRC:
              r.isUndefined(e.src) ||
                ((n[p.selectorChangeType.SRC] = e.src), (e.src = i));
              break;
            case p.selectorChangeType.STYLE:
              break;
            case p.selectorChangeType.TEXT:
              r.isUndefined(e.textContent) ||
                ((n[p.selectorChangeType.TEXT] = e.textContent),
                (e.textContent = i));
              break;
            default:
              throw new Error("Unrecognized attribute: " + a);
          }
        });
        var i = y.createStylesFromChange(e.style.cssText, this.change);
        r.isString(i) &&
          ((n[p.selectorChangeType.STYLE] = e.style.cssText),
          (e.style.cssText = i)),
          e.setAttribute(t, ""),
          c.setData(e, this.change.id, this.identifier, n);
      }),
      (i.prototype.cancel = function () {
        (this.cancelled = !0),
          this.unobserveSelector && this.unobserveSelector(),
          r.each(this.disconnectObserverQueue, function (e) {
            try {
              e();
            } catch (e) {}
          });
      }),
      (i.prototype.undo = function () {
        var e = document.querySelectorAll(
          "[" + s.CHANGE_ID_ATTRIBUTE_PREFIX + this.change.id + "]"
        );
        return (
          r.each(
            e,
            r.bind(function (e) {
              var t = c.getData(e, this.change.id, this.identifier);
              t &&
                r.forOwn(t, function (t, n) {
                  switch (n) {
                    case p.selectorChangeType.CLASS:
                      e.className = t;
                      break;
                    case p.selectorChangeType.HREF:
                      e.href = t;
                      break;
                    case p.selectorChangeType.HTML:
                      e.innerHTML = t;
                      break;
                    case p.selectorChangeType.SRC:
                      e.src = t;
                      break;
                    case p.selectorChangeType.STYLE:
                      e.style.cssText = t;
                      break;
                    case p.selectorChangeType.TEXT:
                      e.textContent = t;
                      break;
                    case p.selectorChangeType.HIDE:
                      e.style.visibility = t;
                      break;
                    case p.selectorChangeType.REMOVE:
                      e.style.display = t;
                      break;
                    default:
                      throw new Error("Unrecognized attribute: " + n);
                  }
                }),
                e.removeAttribute(
                  s.CHANGE_ID_ATTRIBUTE_PREFIX + this.change.id
                ),
                c.removeData(e, this.change.id, this.identifier);
            }, this)
          ),
          l().resolve(p.changeState.UNAPPLIED)
        );
      }),
      (e.exports = function (e) {
        e.registerChangeApplier(p.changeType.ATTRIBUTE, i);
      });
  },
  function (e, t, n) {
    var i = n(2),
      r = n(220);
    (t.transformVisibilityAttributesToCSS = function (e) {
      if (!e.attributes) return e;
      if (
        e.attributes[r.selectorChangeType.HIDE] ||
        e.attributes[r.selectorChangeType.REMOVE]
      ) {
        var t = i.extend({ css: {} }, i.cloneDeep(e));
        return (
          e.attributes[r.selectorChangeType.HIDE] &&
            ((t.css.visibility = "hidden"),
            delete t.attributes[r.selectorChangeType.HIDE]),
          e.attributes[r.selectorChangeType.REMOVE] &&
            ((t.css.display = "none"),
            delete t.attributes[r.selectorChangeType.REMOVE]),
          t
        );
      }
      return e;
    }),
      (t.createStylesFromChange = function (e, t) {
        if (i.isEmpty(t.css)) return t.attributes.style;
        var n = "",
          r = t.attributes.style || "";
        return (
          i.each(t.css, function (e, t) {
            var i = new RegExp(t + "\\s?:");
            i.test(r) || (n += t + ":" + e + ";");
          }),
          i.isUndefined(t.attributes.style) ? (e || "") + n : n + r
        );
      });
  },
  function (e, t, n) {
    function i(e, t) {
      if (!r.isFunction(e.value))
        throw new Error("Custom code must be a function");
      this.change = e;
    }
    var r = n(2),
      a = n(219),
      o = n(220),
      s = n(145);
    (i.prototype.apply = function () {
      var e = a();
      try {
        s.apply(this.change.value), e.resolve();
      } catch (t) {
        e.reject(t);
      }
      return e;
    }),
      (i.prototype.undo = function () {
        return a().resolve(o.changeState.IGNORED);
      }),
      (e.exports = function (e) {
        e.registerChangeApplier(o.changeType.CUSTOM_CODE, i);
      });
  },
  function (e, t, n) {
    var i = n(142),
      r = n(143).DecisionError,
      a = "single_experiment",
      o = "multivariate",
      s = {
        selectExperiment: function (e, t, n) {
          if (e.experiments.length < 1)
            throw new r("Unable to find experiment to bucket user into");
          var a = e.experiments[0];
          if (!i.isValidExperiment(t, a))
            throw new r(
              'Audience conditions failed for experiment: "' + a.id + '".'
            );
          return a;
        },
      };
    e.exports = function (e) {
      e.registerDecider(a, s), e.registerDecider(o, s);
    };
  },
]);
