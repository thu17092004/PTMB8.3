import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'; // Thêm StyleSheet
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Bộ icon
import AppIntroSlider from 'react-native-app-intro-slider'; // Slider thư viện

// Lấy kích thước màn hình để đặt hình ảnh full màn hình
const { width, height } = Dimensions.get('window');

// Mảng dữ liệu cho các slide
const slides = [
  {
    key: '1',
    title: 'Chào mừng đến với ứng dụng',
    text: 'Anh1',
    image: require('./assets/anh1.jpg'), 
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Hãy trải nghiệm cùng tôi',
    text: 'Anh2',
    image: require('./assets/anh2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'Kết thúc',
    text: 'Anh3',
    image: require('./assets/anh3.png'),
    backgroundColor: '#22bcb5',
  },
];

// Màn hình slider
function IntroSlider({ navigation }) {
  const [showMainApp, setShowMainApp] = useState(false);

  // Hàm render từng item slide
  const _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image
          source={item.image}
          style={styles.image} // Sử dụng style từ StyleSheet
        />
        <Text style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  // Khi hoàn thành slider
  const _onDone = () => {
    setShowMainApp(true);
  };

  if (showMainApp) {
    navigation.replace('MainApp');
    return null;
  } else {
    return <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />;
  }
}

// Tạo các màn hình Home và Scan
function HomeScreen() {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.screenTitle}>Home Screen</Text>
    </View>
  );
}

function ScanScreen({ navigation }) {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.screenTitle}>Scan Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Quay lại Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tạo cấu trúc BottomTab và Stack Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tạo HomeStack cho phép sử dụng Stack Navigator với các màn hình Home và Scan
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Scan" component={ScanScreen} />
    </Stack.Navigator>
  );
}

// Tạo cấu trúc BottomTab Navigation
function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <Icon name="qr-code-scanner" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Ứng dụng chính, bắt đầu với màn hình IntroSlider
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroSlider} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet để quản lý các kiểu dáng
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width,
    height: height * 0.7,
    resizeMode: 'cover',
    borderRadius: 10, // Bo góc cho hình ảnh
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#fff', // Màu chữ trắng
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#fff', // Màu chữ trắng
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Nền trang chính
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    shadowColor: "#000", // Bóng đổ
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Cho Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
