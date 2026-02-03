import { View, TextInput, Button, StyleSheet, Text, } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Book = { id: string, name: string, price: string }

export default function Add() {
    const [bookName, setBookName] = useState("")
    const [bookPrice, setBookPrice] = useState("")
    const [allBook, setAllbook] = useState<Book[]>([])

    useEffect(() => {
        loadBook()
    }, [allBook])

    async function loadBook() {
        const data = await AsyncStorage.getItem("book")
        if (data !== null) {
            setAllbook(JSON.parse(data))
        }
    }

    async function addBook() {
        const Book = {
            id: Date.now().toString(),
            name: bookName,
            price: bookPrice
        }
        console.log(Book)

        const newBook = [...allBook, Book]
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllbook(newBook)

        setBookName("")
        setBookPrice("")
    }

    return (
        <View style = {{gap:15,alignItems:"center",backgroundColor:"lightblue",flex:1,padding:20}}>
            <Text>ชื่อหนังสือ</Text>
            <TextInput value={bookName} onChangeText={setBookName} style={mystyle.input} />
            <Text>ราคาหนังสือ</Text>
            <TextInput value={bookPrice} onChangeText={setBookPrice} style={mystyle.input} />
            <Button title="บันทึก " onPress={() => addBook()} />
        </View>
    )
}

const mystyle = StyleSheet.create({
    input: {
        width: "80%",
        borderWidth: 1,
    }
})