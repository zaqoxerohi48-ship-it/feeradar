import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { DocumentProps } from '@react-pdf/renderer'
import type { ReactElement } from 'react'

type Props = {
  order: {
    id: number
    amountCents: number
    currency: string
    createdAt: Date
  }
}

const ACCENT = '#4f46e5'
const MUTED = '#6b7280'
const BORDER = '#e5e7eb'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    color: '#111827',
    fontFamily: 'Helvetica'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
    paddingBottom: 20,
    borderBottom: `1 solid ${BORDER}`
  },
  brand: {
    fontSize: 18,
    fontWeight: 700,
    color: ACCENT
  },
  brandSub: {
    fontSize: 9,
    color: MUTED,
    marginTop: 2
  },
  headerRight: {
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 4
  },
  badge: {
    fontSize: 9,
    color: '#15803d',
    backgroundColor: '#dcfce7',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3
  },

  amountCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 4,
    padding: 20,
    marginBottom: 28,
    alignItems: 'center'
  },
  amountLabel: {
    fontSize: 9,
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 700,
    color: '#111827'
  },

  sectionLabel: {
    fontSize: 9,
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10
  },
  detailsBox: {
    borderTop: `1 solid ${BORDER}`
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottom: `1 solid ${BORDER}`
  },
  rowLabel: {
    color: MUTED
  },
  rowValue: {
    fontFamily: 'Courier'
  },

  footer: {
    marginTop: 36,
    paddingTop: 16,
    borderTop: `1 solid ${BORDER}`,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 10,
    color: '#111827',
    marginBottom: 4
  },
  footerSub: {
    fontSize: 8,
    color: MUTED
  }
})

export default function ReceiptDocument({ order }: Props): ReactElement<DocumentProps> {
  const formattedDate = order.createdAt.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>FeeWatch</Text>
            <Text style={styles.brandSub}>Payment receipt</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.title}>#{order.id}</Text>
            <Text style={styles.badge}>PAID</Text>
          </View>
        </View>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount paid</Text>
          <Text style={styles.amountValue}>
            {(order.amountCents / 100).toFixed(2)} {order.currency.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Details</Text>
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Order number</Text>
            <Text style={styles.rowValue}>{order.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Date issued</Text>
            <Text>{formattedDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Currency</Text>
            <Text>{order.currency.toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Status</Text>
            <Text>Paid</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your purchase.</Text>
          <Text style={styles.footerSub}>This receipt was generated automatically and does not require a signature.</Text>
        </View>
      </Page>
    </Document>
  )
}
