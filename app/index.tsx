// นำเข้า component พื้นฐานจาก react-native สำหรับสร้าง UI
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

// นำเข้า AsyncStorage สำหรับเก็บข้อมูลแบบถาวรในเครื่อง
import AsyncStorage from '@react-native-async-storage/async-storage'

// นำเข้า Hook จาก React
import { useState, useEffect } from "react";

// สร้าง Component หลักชื่อ Home และ export ออกไปใช้งาน
export default function Home() {

    // state สำหรับเก็บค่าที่พิมพ์ใน TextInput
    const [text, setText] = useState("")

    // state สำหรับเก็บค่าผลไม้ที่บันทึกไว้แล้ว
    const [fruit, setFruit] = useState("")

    // useEffect จะทำงานครั้งเดียวตอน component ถูกโหลด (componentDidMount)
    useEffect(() => {
        loadFruit() // โหลดข้อมูลผลไม้จาก AsyncStorage
    }, [])

    // ฟังก์ชันบันทึกผลไม้ลง AsyncStorage
    async function saveFruit(){

        // ถ้าเป็นค่าว่างหรือช่องว่าง ไม่ให้บันทึก
        if(text.trim() === "") return;

        // บันทึกค่า text ลง AsyncStorage โดยใช้ key ชื่อ "fruit"
        await AsyncStorage.setItem("fruit", text)

        // อัปเดต state fruit เพื่อแสดงผลทันที
        setFruit(text)

        // ล้างค่าใน TextInput
        setText("")
    }

    // ฟังก์ชันโหลดผลไม้จาก AsyncStorage
    async function loadFruit(){

        // ดึงข้อมูลจาก AsyncStorage ตาม key "fruit"
        const data = await AsyncStorage.getItem("fruit")

        // ถ้ามีข้อมูล ให้เซ็ตค่าเข้า state fruit
        if(data){
            setFruit(data)
        }
    }

    // ฟังก์ชันลบข้อมูลผลไม้ออกจาก AsyncStorage
    async function removeFruit() {

        // ลบข้อมูลที่ key "fruit"
        await AsyncStorage.removeItem("fruit")

        // ล้างค่าใน state fruit
        setFruit("")
    }
    
    // ส่วนแสดงผล UI
    return(
        // SafeAreaView ป้องกันเนื้อหาชนขอบจอ (เช่น notch)
        <SafeAreaView style={myStyles.container}>

            {/* กล่องหลักแบบการ์ด */}
            <View style={myStyles.card}>

                {/* หัวข้อแอป */}
                <Text style={myStyles.title}>My Fruit Storage</Text>
                
                {/* พื้นที่แสดงผลข้อมูลที่บันทึก */}
                <View style={myStyles.displayArea}>

                    {/* ป้ายกำกับ */}
                    <Text style={myStyles.label}>Saved Fruit:</Text>

                    {/* แสดงผล fruit ถ้าไม่มีให้แสดง "No data found" */}
                    <Text style={myStyles.resultText}>
                        {fruit || "No data found"}
                    </Text>
                </View>

                {/* ช่องรับข้อมูลชื่อผลไม้ */}
                <TextInput 
                    style={myStyles.input} 
                    placeholder="Type fruit name here..."
                    value={text} 
                    onChangeText={setText} 
                />

                {/* กลุ่มปุ่มกด */}
                <View style={myStyles.buttonGroup}>

                    {/* ปุ่มบันทึก */}
                    <TouchableOpacity 
                        style={[myStyles.button, myStyles.saveBtn]} 
                        onPress={saveFruit}
                    >
                        <Text style={myStyles.buttonText}>บันทึก</Text>
                    </TouchableOpacity>

                    {/* ปุ่มลบ */}
                    <TouchableOpacity 
                        style={[myStyles.button, myStyles.removeBtn]} 
                        onPress={removeFruit}
                    >
                        <Text style={myStyles.buttonText}>ลบ</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

// สร้าง object สำหรับเก็บ style ทั้งหมดของแอป
// เปรียบเหมือน CSS ใน React Native
const myStyles = StyleSheet.create({

    // ===== style หลักของหน้าจอ =====
    container: {

        // flex: 1 คือ ขยายพื้นที่ให้เต็มหน้าจอ
        flex: 1,

        // กำหนดสีพื้นหลังของหน้าจอ
        backgroundColor: "#f5f6fa",

        // จัดตำแหน่งลูกให้อยู่กึ่งกลางแนวตั้ง
        justifyContent: "center",

        // จัดตำแหน่งลูกให้อยู่กึ่งกลางแนวนอน
        alignItems: "center",
    },

    // ===== กล่องการ์ดตรงกลาง =====
    card: {

        // ความกว้าง 85% ของหน้าจอ
        width: "85%",

        // สีพื้นหลังของการ์ด
        backgroundColor: "#ffffff",

        // ทำให้มุมโค้ง
        borderRadius: 20,

        // ระยะห่างจากขอบการ์ดเข้าด้านใน
        padding: 25,

        // สีของเงา (iOS)
        shadowColor: "#000",

        // ตำแหน่งเงา (iOS)
        shadowOffset: { width: 0, height: 2 },

        // ความโปร่งใสของเงา (iOS)
        shadowOpacity: 0.1,

        // ความฟุ้งของเงา (iOS)
        shadowRadius: 10,

        // เงาสำหรับ Android
        elevation: 5,
    },

    // ===== หัวข้อแอป =====
    title: {

        // ขนาดตัวอักษร
        fontSize: 22,

        // ตัวหนา
        fontWeight: "bold",

        // สีตัวอักษร
        color: "#2f3640",

        // เว้นระยะด้านล่าง
        marginBottom: 20,

        // จัดข้อความให้อยู่ตรงกลาง
        textAlign: "center",
    },

    // ===== พื้นที่แสดงผลข้อมูล =====
    displayArea: {

        // สีพื้นหลังของกล่องแสดงผล
        backgroundColor: "#f1f2f6",

        // ระยะห่างด้านในกล่อง
        padding: 15,

        // มุมโค้ง
        borderRadius: 12,

        // เว้นระยะด้านล่าง
        marginBottom: 20,

        // จัดข้อความให้อยู่ตรงกลางแนวนอน
        alignItems: "center",
    },

    // ===== ข้อความ label (Saved Fruit:) =====
    label: {

        // ขนาดตัวอักษรเล็ก
        fontSize: 14,

        // สีเทาอ่อน
        color: "#7f8c8d",

        // เว้นระยะด้านล่างเล็กน้อย
        marginBottom: 5,
    },

    // ===== ข้อความผลลัพธ์ (ชื่อผลไม้) =====
    resultText: {

        // ขนาดตัวอักษรใหญ่
        fontSize: 20,

        // ความหนาปานกลาง
        fontWeight: "600",

        // สีเขียว แสดงถึงข้อมูล/ความสำเร็จ
        color: "#2ecc71",
    },

    // ===== ช่องกรอกข้อความ =====
    input: {

        // ความหนาของเส้นขอบ
        borderWidth: 1.5,

        // สีเส้นขอบ
        borderColor: "#dcdde1",

        // มุมโค้งของช่อง input
        borderRadius: 10,

        // ระยะห่างด้านซ้าย-ขวาภายในช่อง
        paddingHorizontal: 15,

        // ระยะห่างด้านบน-ล่างภายในช่อง
        paddingVertical: 10,

        // ขนาดตัวอักษรใน input
        fontSize: 16,

        // เว้นระยะด้านล่าง
        marginBottom: 20,

        // สีตัวอักษร
        color: "#2f3640",
    },

    // ===== กล่องรวมปุ่ม =====
    buttonGroup: {

        // วางปุ่มในแนวนอน
        flexDirection: "row",

        // เว้นช่องว่างระหว่างปุ่ม
        justifyContent: "space-between",
    },

    // ===== style ปุ่มพื้นฐาน (ใช้ร่วมกัน) =====
    button: {

        // ทำให้ปุ่มกว้างเท่ากัน
        flex: 1,

        // ความสูงปุ่ม (จาก padding)
        paddingVertical: 12,

        // มุมโค้งของปุ่ม
        borderRadius: 10,

        // จัดข้อความให้อยู่ตรงกลาง
        alignItems: "center",

        // เว้นระยะซ้าย-ขวาระหว่างปุ่ม
        marginHorizontal: 5,
    },

    // ===== ปุ่มบันทึก =====
    saveBtn: {

        // สีพื้นหลังปุ่มบันทึก (สีฟ้า)
        backgroundColor: "#3498db",
    },

    // ===== ปุ่มลบ =====
    removeBtn: {

        // สีพื้นหลังปุ่มลบ (สีแดง)
        backgroundColor: "#e74c3c",
    },

    // ===== ตัวอักษรบนปุ่ม =====
    buttonText: {

        // สีตัวอักษรขาว
        color: "#fff",

        // ตัวหนา
        fontWeight: "bold",

        // ขนาดตัวอักษร
        fontSize: 16,
    }
})
