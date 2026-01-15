import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"
import { NextResponse } from "next/server";

export async function POST(request) {
    const { userEmail, userName } = await request.json()
    try {
        const docref = doc(db, 'users', userEmail);
        const docSnap = await getDoc(docref);
        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data())
        } else {
            const data = {
                name: userName,
                email: userEmail,
                credits: 5
            }
            await setDoc(docref, data);
            return NextResponse.json(data)
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 })
    }
}