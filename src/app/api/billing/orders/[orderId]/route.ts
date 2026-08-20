import { renderToBuffer } from '@react-pdf/renderer'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/requireAuthRoles'
import ReceiptDocument from './ReceiptDocument'

type Props = {
  params: Promise<{
    orderId: string
  }>
}

export async function GET(_request: Request, { params }: Props) {
  const user = await requireUser()

  const { orderId } = await params
  const parsedOrderId = Number(orderId)

  if (!Number.isInteger(parsedOrderId)) {
    return new Response('Order not found', {
      status: 404
    })
  }

  const order = await prisma.order.findFirst({
    where: {
      id: parsedOrderId,
      userId: user.id,
      status: 'PAID'
    },
    select: {
      id: true,
      amountCents: true,
      currency: true,
      createdAt: true
    }
  })

  if (!order) {
    return new Response('Order not found', {
      status: 404
    })
  }

  const pdf = await renderToBuffer(ReceiptDocument({ order }))

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="receipt-${order.id}.pdf"`
    }
  })
}
