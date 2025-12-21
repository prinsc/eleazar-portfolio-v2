import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const total = (data.qte * data.prix).toFixed(2);

    const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    
    <cbc:ID>${data.numero}</cbc:ID>
    <cbc:IssueDate>${data.date}</cbc:IssueDate>
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>

    <cac:AccountingSupplierParty>
        <cac:Party>
            <cbc:Name>${data.fournisseur_nom}</cbc:Name>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${data.fournisseur_tva}</cbc:CompanyID>
            </cac:PartyTaxScheme>
            <cac:PostalAddress>
                <cbc:StreetName>${data.fournisseur_adresse}</cbc:StreetName>
            </cac:PostalAddress>
        </cac:Party>
    </cac:AccountingSupplierParty>

    <cac:AccountingCustomerParty>
        <cac:Party>
            <cbc:Name>${data.client_nom}</cbc:Name>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${data.client_tva}</cbc:CompanyID>
            </cac:PartyTaxScheme>
            <cac:PostalAddress>
                <cbc:StreetName>${data.client_adresse}</cbc:StreetName>
            </cac:PostalAddress>
        </cac:Party>
    </cac:AccountingCustomerParty>

    <cac:InvoiceLine>
        <cbc:ID>1</cbc:ID>
        <cbc:InvoicedQuantity>${data.qte}</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount currencyID="EUR">${total}</cbc:LineExtensionAmount>

        <cac:Item>
            <cbc:Description>${data.description}</cbc:Description>
        </cac:Item>

        <cac:Price>
            <cbc:PriceAmount currencyID="EUR">${data.prix}</cbc:PriceAmount>
        </cac:Price>
    </cac:InvoiceLine>

    <cac:LegalMonetaryTotal>
        <cbc:PayableAmount currencyID="EUR">${total}</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>

</Invoice>`.trim();

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' }
    });
};
