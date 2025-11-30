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
      <DialogContent className="h-full md:h-auto md:max-w-md w-full md:rounded-xl p-0 md:p-6 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 bg-white border-b p-4 flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="text-base">Agregar Nueva Tarjeta</DialogTitle>
            <DialogDescription className="text-sm">
              Agrega una nueva tarjeta de crédito o débito para usar en tu pedido
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Tarjeta</DialogTitle>
            <DialogDescription>
              Agrega una nueva tarjeta de crédito o débito para usar en tu pedido
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-0 md:mt-4 space-y-4">
          <div>
            <Label htmlFor="cardNumber" className="text-sm">Número de Tarjeta</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardFormData.cardNumber}
              onChange={(e) => handleCardNumberChange(e, setCardFormData)}
              maxLength={19}
              className="min-h-[44px] mt-1"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="text-sm">Fecha de Vencimiento</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={cardFormData.expiryDate}
                onChange={(e) => handleExpiryChange(e, setCardFormData)}
                maxLength={5}
                className="min-h-[44px] mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-sm">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardFormData.cvv}
                onChange={(e) => setCardFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                maxLength={4}
                className="min-h-[44px] mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cardHolderName" className="text-sm">Nombre del Titular</Label>
            <Input
              id="cardHolderName"
              placeholder="Nombre como aparece en la tarjeta"
              value={cardFormData.cardHolderName}
              onChange={(e) => setCardFormData(prev => ({ ...prev, cardHolderName: e.target.value }))}
              className="min-h-[44px] mt-1"
            />
          </div>
          <div>
            <Label htmlFor="brand" className="text-sm">Tipo de Tarjeta</Label>
            <Select value={cardFormData.brand} onValueChange={(value) => setCardFormData(prev => ({ ...prev, brand: value as any }))}>
              <SelectTrigger className="min-h-[44px] mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa" className="min-h-[44px]">Visa</SelectItem>
                <SelectItem value="mastercard" className="min-h-[44px]">Mastercard</SelectItem>
                <SelectItem value="amex" className="min-h-[44px]">American Express</SelectItem>
                <SelectItem value="discover" className="min-h-[44px]">Discover</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden sticky bottom-0 bg-white border-t p-4 flex-shrink-0">
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAddCard}
              disabled={isAddingCard}
              className="min-h-[48px] bg-femfuel-rose hover:bg-femfuel-rose/90"
            >
              {isAddingCard ? "Agregando..." : "Agregar Tarjeta"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAddCardModal(false)}
              className="min-h-[44px]"
            >
              Cancelar
            </Button>
          </div>
        </div>

        {/* Desktop Footer */}
        <DialogFooter className="hidden md:flex mt-4">
          <Button
            variant="outline"
            onClick={() => setShowAddCardModal(false)}
            className="min-h-[44px]"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddCard}
            disabled={isAddingCard}
            className="min-h-[44px] bg-femfuel-rose hover:bg-femfuel-rose/90"
          >
            {isAddingCard ? "Agregando..." : "Agregar Tarjeta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}