import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CardFormData, handleCardNumberChange, handleExpiryChange } from "./checkout-utils"

interface AddCardModalProps {
  showAddCardModal: boolean
  setShowAddCardModal: React.Dispatch<React.SetStateAction<boolean>>
  cardFormData: CardFormData
  setCardFormData: React.Dispatch<React.SetStateAction<CardFormData>>
  handleAddCard: () => Promise<void>
  isAddingCard: boolean
}

export function AddCardModal({
  showAddCardModal,
  setShowAddCardModal,
  cardFormData,
  setCardFormData,
  handleAddCard,
  isAddingCard
}: AddCardModalProps) {
  return (
    <Dialog open={showAddCardModal} onOpenChange={setShowAddCardModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Tarjeta</DialogTitle>
          <DialogDescription>
            Agrega una nueva tarjeta de crédito o débito para usar en tu pedido
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número de Tarjeta</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardFormData.cardNumber}
              onChange={(e) => handleCardNumberChange(e, setCardFormData)}
              maxLength={19}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={cardFormData.expiryDate}
                onChange={(e) => handleExpiryChange(e, setCardFormData)}
                maxLength={5}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardFormData.cvv}
                onChange={(e) => setCardFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                maxLength={4}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cardHolderName">Nombre del Titular</Label>
            <Input
              id="cardHolderName"
              placeholder="Nombre como aparece en la tarjeta"
              value={cardFormData.cardHolderName}
              onChange={(e) => setCardFormData(prev => ({ ...prev, cardHolderName: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="brand">Tipo de Tarjeta</Label>
            <Select value={cardFormData.brand} onValueChange={(value) => setCardFormData(prev => ({ ...prev, brand: value as any }))}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">Mastercard</SelectItem>
                <SelectItem value="amex">American Express</SelectItem>
                <SelectItem value="discover">Discover</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddCardModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddCard} disabled={isAddingCard} className="bg-femfuel-rose hover:bg-femfuel-rose/90">
            {isAddingCard ? "Agregando..." : "Agregar Tarjeta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}