import { Webhook, WebhookRequiredHeaders } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { IncomingHttpHeaders } from 'http';
import { db } from '@/lib/db';



export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "";

    const headerPayload = headers();
    const heads = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature"),
    };

    if (!heads['svix-id'] || !heads['svix-timestamp'] || !heads['svix-signature']) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
 
    let evt: WebhookEvent;

    try {
        evt = wh.verify(
            body,
            heads as IncomingHttpHeaders & WebhookRequiredHeaders     
        ) as WebhookEvent
    
    } catch (err) {
        console.error('Error verifying webhook:', err);
        
        return new Response('Error occured', {
            status: 400
        })
    }

    const eventType = evt.type;
    
    if(eventType === "user.created" || eventType === "user.updated") {
        const { id, ...attributes } = evt.data;
        console.log(attributes);
        
        let email_address: string = "";

        if(attributes.email_addresses.length > 0) {
            email_address = attributes.email_addresses[0].email_address;
        }
        

        await db.user.upsert({
            where: { externalId: id as string },
            create: {
                externalId: id as string,
                username: attributes.username as string,
                email_address: email_address,
                has_image: attributes.has_image as boolean,
                image_url: attributes.image_url as string,
            },
            update: {
                username: attributes.username as string,
                email_address: email_address,
                has_image: attributes.has_image as boolean,
                image_url: attributes.image_url as string,
            }
        });
    }
    
    return new Response('', { status: 200 })
}