import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import Trash from "../../../assets/svg/Trash";
import { scale } from "../../utils/dimen";

const ProductCard = ({
  item,
  onAdd,
  //   quantity,
  //   onIncrement,
  //   onDecrement,
  handleCardPress,
}: any) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={handleCardPress}>
      <Image source={item.image} style={styles.productImage} />

      {/* {quantity > 0 ? (
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => onDecrement(item.id)}
            activeOpacity={0.7}
          >
            {quantity >= 2 ? (
              <AntDesign name="minus" size={scale(15)} color="#017851" />
            ) : (
              <Trash />
            )}
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => onIncrement(item.id)}
            activeOpacity={0.7}
          >
            <AntDesign name="plus" size={scale(15)} color="#017851" />
          </TouchableOpacity>
        </View>
      ) : ( */}
      <TouchableOpacity
        style={styles.addButton}
        // onPress={() => onAdd(item)}
        activeOpacity={0.7}
      >
        <AntDesign name="plus" size={scale(19)} color="#017851" />
      </TouchableOpacity>
      <View
        style={styles.addButton}
        // onPress={() => onAdd(item)}
        // activeOpacity={0.7}
      >
        <AntDesign name="plus" size={scale(19)} color="#017851" />
      </View>
      {/* )} */}

      <Text style={styles.productName}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price} SR</Text>
        {item.originalPrice && (
          <Text style={styles.originalPrice}>{item.originalPrice} SR</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ProductCard;

const styles = StyleSheet.create({
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(3),
  },
  productCard: {
    width: scale(173),
    marginBottom: scale(10),
  },
  productImage: {
    width: scale(173),
    height: scale(173),
    borderRadius: scale(10),
    marginTop: scale(10),
  },
  quantitySelector: {
    width: scale(124),
    height: scale(40),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    left: scale(25),
    top: scale(135),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  quantityText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  addButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: scale(125),
    top: scale(135),
  },
  productName: {
    marginTop: scale(6),
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#4A4A4A",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  price: {
    marginTop: scale(3),
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(15),
    color: "#017851",
  },
  originalPrice: {
    marginStart: scale(6),
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#717171",
    textDecorationLine: "line-through",
  },
});
