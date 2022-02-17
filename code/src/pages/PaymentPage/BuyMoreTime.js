import React, { useContext, useState } from "react";
import { StyleSheet, Platform, TouchableOpacity, View, Text } from "react-native";

import { IapContext } from "cleanupfun/src/global-vars/iap";
import { TranslatedText } from "cleanupfun/src/global-vars/translation";

export function BuyMoreTime(){
  const iap = useContext(IapContext);

  return (
    <View>
      {
        iap.productsForSale.length === 0 ? null : (
          <ProductsForSale iap={iap} />
        )
      }
      {iap.pendingPurchases.length === 0 ? null : (
        <PendingPurchases iap={iap} />
      )}
    </View>
  );
}

function ProductsForSale({ iap }){
  const [errors, setErrors] = useState({});
  return (
    <View>
      <TranslatedText tPath="PAYMENT_PAGE_PROD_SALE" />
      <View>
        {
          iap.productsForSale.map((product)=>(
            <TouchableOpacity
              key={product.id}
              onPress={async ()=>{
                try {
                  clearTimeout(errors[product.id]);
                  await iap.buy(product);
                }catch(e){
                  setErrors({
                    ...errors,
                    [product.id]: setTimeout(()=>{
                      delete errors[product.id];
                      setErrors(errors);
                    }, 3 * 1000),
                  });
                }
              }}
            >
              <View styles={styles.productDetails}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                {
                  !(product.id in errors) ? null : (
                    <TranslatedText tPath="PAYMENT_PAGE_REPEAT_BUY_ERROR" />
                  )
                }
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
}

function PendingPurchases({ iap }){

  return (
    <View>
      <TranslatedText tPath="PAYMENT_PAGE_PEND_PURCH" />
      <View>
        {
          iap.pendingPurchases.map((product)=>{
            return (
              <View key={product.id} styles={styles.productDetails}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <ProductStatus product={product} />
              </View>
            );
          })
        }
      </View>
    </View>
  );
}

function ProductStatus({ product }){
  switch(product.purchaseStatus){
    case -1: return (
      <View>
        <TranslatedText tPath="PAYMENT_PAGE_PEND_ERROR" />
        <TranslatedText
          tPath={"PAYMENT_PAGE_PURCH_RES_" + product.purchaseResult}
        />
      </View>
    );
    case 0: return (<TranslatedText tPath="PAYMENT_PAGE_PENDING_STATUS" />);
    case 1: return (
      <View>
        <TranslatedText tPath="PAYMENT_PAGE_PEND_SUCCESS" />
        <TranslatedText
          tPath={"PAYMENT_PAGE_PURCH_RES_" + product.purchaseResult}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: "#111566",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },

  // Loader
  loader: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  // Empty
  empty: {
    textAlign: "center",
    color: "black",
  },

  // Group
  groupTitle: {
    color: "#111566",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  // Product
  product: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: { height: 1, width: 1 },
        shadowColor: "#979797",
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  productPrice: {
    fontSize: 14,
    color: "#818181",
  },
});
