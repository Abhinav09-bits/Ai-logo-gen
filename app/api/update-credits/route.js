import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"
import { NextResponse } from "next/server";

export async function POST(request) {
    const { userEmail } = await request.json()
    try {
        const docref = doc(db, 'users', userEmail);
        // First, get current credits
        const docSnap = await getDoc(docref);
        if (docSnap.exists()) {
            const currentCredits = docSnap.data().credits || 0;
            if (currentCredits > 0) {
                await updateDoc(docref, {
                    credits: currentCredits - 1
                });
                return NextResponse.json({ success: true, credits: currentCredits - 1 });
            } else {
                return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to update credits' }), { status: 500 })
    }
}