import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Input from '../input/Input'
import Button from '../button/Button'
import { validatePassword } from 'utils'
import { useTranslation } from 'react-i18next'
import { formatContent } from './extensions'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'

const ModalConfirmPassword = ({ show, content, title, onSuccess, onClose }) => {
  const { apiPost } = useApis()
  const { t } = useTranslation()
  content = formatContent(content)

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPassword, setWrongPassword] = useState({ value: '', text: '' })

  useEffect(() => {
    setPassword('')
  }, [show])

  const handleConfirm = () => {
    setLoading(true)
    apiPost(apiUrls.verifyPassword(), { password }, ({ id, text, status }) => {
      setLoading(false)
      if (status) {
        onClose?.()
        onSuccess?.()
      } else if (id === '10') {
        setWrongPassword({ value: password, text })
      }
    })
  }

  let invalid = validatePassword().test(password) ? '' : t('password_format_is_incorrect')
  if (wrongPassword.value && wrongPassword.value === password) invalid = wrongPassword.text
  const error = password ? invalid : ''

  return (
    <Dialog open={show} fullWidth maxWidth="xs">
      <DialogTitle style={{ textAlign: 'center' }}>{title}</DialogTitle>
      <DialogContent style={{ fontWeight: 500, textAlign: 'center' }}>
        {content}
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
          <input autoComplete="password" />
        </div>

        <Input
          value={password}
          autoComplete="password"
          type="password"
          label="Password"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && password && !invalid) handleConfirm()
          }}
          onChange={(e) => {
            if (e.target.value === '' || !e.target.value.includes(' ')) setPassword(e.target.value)
          }}
          error={error}
          style={{ marginTop: 24 }}
          disabled={loading}
          errorFocused={password === wrongPassword.value}
        />
      </DialogContent>
      <DialogActions className="pt-0 mr-3 mb-3">
        <Button onClick={onClose} disabled={loading} variant="contained">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          loading={loading}
          disabled={!!invalid}
          style={{ width: 64 }}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalConfirmPassword
