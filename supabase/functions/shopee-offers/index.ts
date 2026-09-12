import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // A documentação oficial da Shopee exige autenticação usando App ID e App Secret.
    // Você deverá adicionar as chaves SHOPEE_APP_ID e SHOPEE_SECRET nos secrets do seu projeto Supabase.
    const SHOPEE_APP_ID = Deno.env.get('SHOPEE_APP_ID');
    const SHOPEE_SECRET = Deno.env.get('SHOPEE_SECRET');

    const { keyword = '', limit = 20 } = await req.json();

    // TODO: Implementar a geração de assinatura (sign) via HMAC-SHA256
    // e realizar a requisição HTTP (fetch) na Open API da Shopee baseada na URL correta.
    // (Exemplo: https://partner.shopeemobile.com/api/v2/affiliate/offer/list)

    // Dados de exemplo retornados para testar o formato com a estrutura do front-end. 
    // Quando as chaves forem configuradas e a requisição implementada acima, isto será substituído pelos dados reais.
    const offers = [
      {
        external_id: "shopee_1",
        title: "Conexão Shopee Aberta (Aguardando implementação da chamada real)",
        store: "Shopee",
        image_url: "https://cf.shopee.com.br/file/br-11134201-7qukw-ljt3c8a9p7b...", // URL real virá da API
        product_url: "https://shopee.com.br/",
        price: 49.90,
        original_price: 89.90,
        commission: 4.99,
        rating: 4.8,
        sold: 500,
        free_shipping: true,
        tag: "Tendência"
      }
    ];

    return new Response(
      JSON.stringify({ offers }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
