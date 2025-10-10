import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FloatingLabelInput from "./FloatingLabelInput";
import { scale } from "../utils/dimen";

// Luhn algorithm to validate card number
export const luhnCheck = (num) => {
  let arr = num
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  let sum = arr.reduce((acc, val, i) => {
    if (i % 2 !== 0) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    return acc + val;
  }, 0);
  return sum % 10 === 0;
};

// Validate MM/YY
export const validateExpiry = (text) => {
  if (!text.includes("/")) return false;
  const [month, year] = text.split("/").map((x) => parseInt(x));
  if (!month || !year) return false;
  if (month < 1 || month > 12) return false;
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth))
    return false;
  return true;
};

// Validate CVV
export const validateCvv = (text) => /^[0-9]{3,4}$/.test(text);

// Reusable Card Form Component
const CardPaymentForm = ({ onCardDataChange, onValidityChange }) => {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvvError, setCvvError] = useState("");

  // Check form validity
  const checkValidity = (
    holder,
    number,
    expiry,
    cvvVal,
    numErr,
    expErr,
    cvvErr
  ) => {
    const isValid =
      holder.trim() !== "" &&
      number.replace(/\s/g, "").length >= 12 &&
      expiry !== "" &&
      (cvvVal.length === 3 || cvvVal.length === 4) &&
      !numErr &&
      !expErr &&
      !cvvErr;

    if (onValidityChange) {
      onValidityChange(isValid);
    }

    if (onCardDataChange) {
      onCardDataChange({
        cardHolderName: holder,
        cardNumber: number,
        expiryDate: expiry,
        cvv: cvvVal,
        isValid,
      });
    }
  };

  const handleCardHolderChange = (text) => {
    setCardHolderName(text);
    checkValidity(
      text,
      cardNumber,
      expiryDate,
      cvv,
      cardNumberError,
      expiryError,
      cvvError
    );
  };

  const handleCardNumberChange = (text) => {
    const digitsOnly = text.replace(/\D/g, "");
    const limitedDigits = digitsOnly.slice(0, 16);
    const formatted = limitedDigits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);

    let error = "";
    if (limitedDigits.length >= 12) {
      error = luhnCheck(limitedDigits) ? "" : "Card number is incorrect";
    } else {
      error = "Card number is incorrect";
    }
    setCardNumberError(error);
    checkValidity(
      cardHolderName,
      formatted,
      expiryDate,
      cvv,
      error,
      expiryError,
      cvvError
    );
  };

  const handleCardNumberBlur = () => {
    const digitsOnly = cardNumber.replace(/\D/g, "").slice(0, 19);
    const error = luhnCheck(digitsOnly) ? "" : "Card number is incorrect";
    setCardNumberError(error);
    checkValidity(
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      error,
      expiryError,
      cvvError
    );
  };

  const handleExpiryChange = (text) => {
    const digits = text.replace(/\D/g, "");
    const formatted =
      digits.length > 2
        ? digits.slice(0, 2) + "/" + digits.slice(2, 4)
        : digits;
    setExpiryDate(formatted);
    const error = validateExpiry(formatted) ? "" : "Invalid expiry date";
    setExpiryError(error);
    checkValidity(
      cardHolderName,
      cardNumber,
      formatted,
      cvv,
      cardNumberError,
      error,
      cvvError
    );
  };

  const handleExpiryBlur = () => {
    const error = validateExpiry(expiryDate) ? "" : "Invalid expiry date";
    setExpiryError(error);
    checkValidity(
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      cardNumberError,
      error,
      cvvError
    );
  };

  const handleCvvChange = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 4);
    setCvv(digits);
    const error = validateCvv(digits) ? "" : "Invalid CVV";
    setCvvError(error);
    checkValidity(
      cardHolderName,
      cardNumber,
      expiryDate,
      digits,
      cardNumberError,
      expiryError,
      error
    );
  };

  const handleCvvBlur = () => {
    const error = validateCvv(cvv) ? "" : "Invalid CVV";
    setCvvError(error);
    checkValidity(
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      cardNumberError,
      expiryError,
      error
    );
  };

  return (
    <View style={styles.formContainer}>
      <FloatingLabelInput
        label="Name of the Card Holder"
        value={cardHolderName}
        onChangeText={handleCardHolderChange}
      />

      <FloatingLabelInput
        label="Card Number"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        onBlur={handleCardNumberBlur}
        borderColor={cardNumberError ? "#FF617E" : "#E6E6E6"}
        labelColor={cardNumberError ? "#FF617E" : "#717171"}
        errorText={cardNumberError}
        keyboardType="numeric"
      />

      <View style={styles.rowInputs}>
        <View style={styles.flex1}>
          <FloatingLabelInput
            label="MM/YY"
            value={expiryDate}
            onChangeText={handleExpiryChange}
            autoCapitalize="none"
            onBlur={handleExpiryBlur}
            borderColor={expiryError ? "#FF617E" : "#E6E6E6"}
            labelColor={expiryError ? "#FF617E" : "#717171"}
            errorText={expiryError}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.flex1}>
          <FloatingLabelInput
            label="CVV"
            value={cvv}
            onChangeText={handleCvvChange}
            onBlur={handleCvvBlur}
            keyboardType="numeric"
            borderColor={cvvError ? "#FF617E" : "#E6E6E6"}
            labelColor={cvvError ? "#FF617E" : "#717171"}
            errorText={cvvError}
          />
        </View>
      </View>
    </View>
  );
};

export default CardPaymentForm;

const styles = StyleSheet.create({
  formContainer: {},
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: scale(10),
  },
  flex1: { flex: 1 },
});
