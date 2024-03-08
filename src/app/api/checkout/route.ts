// /app/api/checkout/route.ts

import mercadopago from "mercadopago";
import { NextRequest } from "next/server";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO,
});

const URL = "https://matiassanchezfit.vercel.app";

// En "items" se puede usar directamente el producto, a fines de prueba tambien se puede hardcodear y poner valores
// hasta 5 como minimo.

export async function POST(req: NextRequest) {
  try {
    const preference: any = {
      items: [
        {
          title: "prueba",
          unit_price: 10,
          quantity: 1,
        },
      ],
      auto_return: "approved",
      back_urls: {
        success: `${URL}/thank-you`,
        failure: `${URL}`,
      },
      notification_url: `${URL}/api/notify`,
    };

    const response = await mercadopago.preferences.create(preference);

    const { init_point } = response.body;

    console.log(init_point, "infoo");

    return new Response(JSON.stringify({ url: response.body.init_point }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
