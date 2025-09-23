import React, { useState, useRef } from 'react';
import {
View,
Text,
TouchableOpacity,
StyleSheet,
Animated,
Dimensions,
StatusBar,
SafeAreaView,
ScrollView,
TextInput,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Mock Icon Components (replace with react-native-vector-icons or similar)
const Icon = ({ name, size = 24, color = '#666' }) => (
<View style={[styles.iconPlaceholder, { width: size, height: size }]}>
<Text style={[styles.iconText, { color, fontSize: size * 0.6 }]}>
{name.charAt(0).toUpperCase()}
</Text>
</View>
);

const CustomDrawerTopbar = () => {
const [activeItem, setActiveItem] = useState('dashboard');
const drawerAnimation = useRef(new Animated.Value(-width \* 0.8)).current;
const overlayAnimation = useRef(new Animated.Value(0)).current;
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

const menuItems = [
{ id: 'dashboard', label: 'Dashboard', icon: 'home' },
{ id: 'profile', label: 'Profile', icon: 'user' },
{ id: 'messages', label: 'Messages', icon: 'mail' },
{ id: 'notifications', label: 'Notifications', icon: 'bell' },
{ id: 'settings', label: 'Settings', icon: 'settings' },
];

const toggleDrawer = () => {
if (isDrawerOpen) {
// Close drawer
Animated.parallel([
Animated.timing(drawerAnimation, {
toValue: -width * 0.8,
duration: 300,
useNativeDriver: true,
}),
Animated.timing(overlayAnimation, {
toValue: 0,
duration: 300,
useNativeDriver: true,
}),
]).start(() => {
setIsDrawerOpen(false);
});
} else {
// Open drawer
setIsDrawerOpen(true);
Animated.parallel([
Animated.timing(drawerAnimation, {
toValue: 0,
duration: 300,
useNativeDriver: true,
}),
Animated.timing(overlayAnimation, {
toValue: 1,
duration: 300,
useNativeDriver: true,
}),
]).start();
}
};

const handleItemPress = (itemId) => {
setActiveItem(itemId);
toggleDrawer(); // Close drawer after selection
};

const CustomTopbar = () => (
<View style={styles.topbar}>
<StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Left side */}
      <View style={styles.topbarLeft}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.appName}>AppName</Text>
        </View>
      </View>

      {/* Right side */}
      <View style={styles.topbarRight}>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell" size={20} color="#666" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

);

const CustomDrawer = () => (
<>
{/_ Overlay _/}
{isDrawerOpen && (
<Animated.View
style={[
styles.overlay,
{
opacity: overlayAnimation,
},
]} >
<TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={toggleDrawer}
            activeOpacity={1}
          />
</Animated.View>
)}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerAnimation }],
          },
        ]}
      >
        {/* Drawer Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.drawerLogoContainer}>
            <View style={styles.drawerLogo}>
              <Text style={styles.drawerLogoText}>A</Text>
            </View>
            <Text style={styles.drawerAppName}>AppName</Text>
          </View>

          <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Menu */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  isActive && styles.menuItemActive,
                ]}
                onPress={() => handleItemPress(item.id)}
              >
                <Icon
                  name={item.icon}
                  size={22}
                  color={isActive ? '#3B82F6' : '#6B7280'}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    isActive && styles.menuItemTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Drawer Footer */}
        <View style={styles.drawerFooter}>
          <View style={styles.userProfile}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>JD</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john@example.com</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </>

);

const MainContent = () => (
<ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
<Text style={styles.pageTitle}>
{menuItems.find(item => item.id === activeItem)?.label || 'Dashboard'}
</Text>

      {/* Sample Cards */}
      <View style={styles.cardsContainer}>
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <View key={card} style={styles.card}>
            <Text style={styles.cardTitle}>Card {card}</Text>
            <Text style={styles.cardDescription}>
              This is a sample card demonstrating the main content area. The drawer and topbar work together to provide navigation.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Action</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>

);

return (
<SafeAreaView style={styles.container}>
<CustomTopbar />
<View style={styles.body}>
<MainContent />
<CustomDrawer />
</View>
</SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F9FAFB',
},

// Topbar Styles
topbar: {
height: 60,
backgroundColor: '#FFFFFF',
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
paddingHorizontal: 16,
borderBottomWidth: 1,
borderBottomColor: '#E5E7EB',
elevation: 2,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.1,
shadowRadius: 2,
},
topbarLeft: {
flexDirection: 'row',
alignItems: 'center',
flex: 1,
},
topbarRight: {
flexDirection: 'row',
alignItems: 'center',
},
menuButton: {
padding: 8,
marginRight: 16,
},
menuIcon: {
width: 20,
height: 16,
justifyContent: 'space-between',
},
menuLine: {
height: 2,
backgroundColor: '#374151',
borderRadius: 1,
},
logoContainer: {
flexDirection: 'row',
alignItems: 'center',
},
logo: {
width: 32,
height: 32,
borderRadius: 8,
backgroundColor: '#3B82F6',
alignItems: 'center',
justifyContent: 'center',
marginRight: 8,
},
logoText: {
color: '#FFFFFF',
fontSize: 14,
fontWeight: 'bold',
},
appName: {
fontSize: 18,
fontWeight: '600',
color: '#111827',
},
searchButton: {
padding: 8,
marginRight: 8,
},
notificationButton: {
padding: 8,
marginRight: 8,
position: 'relative',
},
notificationBadge: {
position: 'absolute',
top: 6,
right: 6,
width: 8,
height: 8,
borderRadius: 4,
backgroundColor: '#EF4444',
},
profileButton: {
padding: 4,
},
avatar: {
width: 32,
height: 32,
borderRadius: 16,
backgroundColor: '#D1D5DB',
alignItems: 'center',
justifyContent: 'center',
},
avatarText: {
fontSize: 12,
fontWeight: '600',
color: '#374151',
},

// Drawer Styles
body: {
flex: 1,
position: 'relative',
},
overlay: {
position: 'absolute',
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundColor: 'rgba(0, 0, 0, 0.5)',
zIndex: 1,
},
drawer: {
position: 'absolute',
top: 0,
left: 0,
width: width \* 0.8,
height: '100%',
backgroundColor: '#FFFFFF',
zIndex: 2,
elevation: 5,
shadowColor: '#000',
shadowOffset: { width: 2, height: 0 },
shadowOpacity: 0.25,
shadowRadius: 5,
},
drawerHeader: {
height: 60,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
paddingHorizontal: 16,
borderBottomWidth: 1,
borderBottomColor: '#E5E7EB',
},
drawerLogoContainer: {
flexDirection: 'row',
alignItems: 'center',
},
drawerLogo: {
width: 32,
height: 32,
borderRadius: 8,
backgroundColor: '#3B82F6',
alignItems: 'center',
justifyContent: 'center',
marginRight: 8,
},
drawerLogoText: {
color: '#FFFFFF',
fontSize: 14,
fontWeight: 'bold',
},
drawerAppName: {
fontSize: 18,
fontWeight: '600',
color: '#111827',
},
closeButton: {
padding: 8,
},
closeButtonText: {
fontSize: 24,
color: '#6B7280',
fontWeight: '300',
},
menuContainer: {
flex: 1,
paddingTop: 16,
},
menuItem: {
flexDirection: 'row',
alignItems: 'center',
paddingHorizontal: 16,
paddingVertical: 12,
marginHorizontal: 8,
borderRadius: 8,
},
menuItemActive: {
backgroundColor: '#EFF6FF',
borderRightWidth: 2,
borderRightColor: '#3B82F6',
},
menuItemText: {
fontSize: 16,
fontWeight: '500',
color: '#6B7280',
marginLeft: 12,
},
menuItemTextActive: {
color: '#3B82F6',
},
drawerFooter: {
borderTopWidth: 1,
borderTopColor: '#E5E7EB',
padding: 16,
},
userProfile: {
flexDirection: 'row',
alignItems: 'center',
},
userAvatar: {
width: 40,
height: 40,
borderRadius: 20,
backgroundColor: '#D1D5DB',
alignItems: 'center',
justifyContent: 'center',
marginRight: 12,
},
userAvatarText: {
fontSize: 14,
fontWeight: '600',
color: '#374151',
},
userInfo: {
flex: 1,
},
userName: {
fontSize: 14,
fontWeight: '600',
color: '#111827',
},
userEmail: {
fontSize: 12,
color: '#6B7280',
marginTop: 2,
},

// Main Content Styles
mainContent: {
flex: 1,
paddingHorizontal: 16,
},
pageTitle: {
fontSize: 28,
fontWeight: 'bold',
color: '#111827',
marginVertical: 24,
},
cardsContainer: {
paddingBottom: 24,
},
card: {
backgroundColor: '#FFFFFF',
borderRadius: 12,
padding: 20,
marginBottom: 16,
borderWidth: 1,
borderColor: '#E5E7EB',
elevation: 2,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.1,
shadowRadius: 3,
},
cardTitle: {
fontSize: 18,
fontWeight: '600',
color: '#111827',
marginBottom: 8,
},
cardDescription: {
fontSize: 14,
color: '#6B7280',
lineHeight: 20,
marginBottom: 16,
},
cardButton: {
backgroundColor: '#3B82F6',
paddingHorizontal: 16,
paddingVertical: 10,
borderRadius: 8,
alignSelf: 'flex-start',
},
cardButtonText: {
color: '#FFFFFF',
fontSize: 14,
fontWeight: '600',
},

// Icon Placeholder Styles
iconPlaceholder: {
backgroundColor: '#F3F4F6',
borderRadius: 12,
alignItems: 'center',
justifyContent: 'center',
},
iconText: {
fontWeight: 'bold',
},
});

export default CustomDrawerTopbar;
