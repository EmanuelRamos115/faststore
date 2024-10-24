import { Button, Input, Modal, ModalBody, ModalHeader } from '@faststore/ui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Action from '../Action/Action'
import styles from './B2BOrganizationsModal.module.scss'
import B2BOrganizationsTable from './B2BOrganizationsTable'
import useB2BOrganizations from './hooks/useB2BOrganizations'

const SESSION_STORAGE_SHOW_MODAL = 'b2b-organizations-showModal'

const B2BOrganizationsModal = () => {
  const {
    setCurrentOrganization,
    organizationsState,
    organizationsByEmail,
    b2BSettings,
  } = useB2BOrganizations()

  const currentOrganization =
    organizationsState.currentOrganization &&
    organizationsState.currentCostCenter
      ? `${organizationsState.currentOrganization},${organizationsState.currentCostCenter}`
      : ''

  const [loadingState, setLoadingState] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [organization, setOrganization] = useState(currentOrganization)
  const [searchTerm, setSearchTerm] = useState('')
  const { query } = useRouter()

  useEffect(() => {
    if (query['change-organization'] === 'true') {
      setShowModal(true)
    }
  }, [query])

  useEffect(() => {
    const uiSettings = b2BSettings?.uiSettings

    if (!uiSettings?.showModal) {
      return
    }

    const totalCompanies = organizationsByEmail?.length
    const storageShowModal = sessionStorage.getItem(SESSION_STORAGE_SHOW_MODAL)

    if (!!totalCompanies && totalCompanies > 1 && !storageShowModal) {
      setShowModal(true)
      sessionStorage.setItem(SESSION_STORAGE_SHOW_MODAL, 'true')
    }
  }, [b2BSettings, organizationsByEmail])

  const joinOrganization = async () => {
    const [orgId, costId] = organization.split(',')

    setLoadingState(true)

    try {
      await setCurrentOrganization({
        orgId,
        costId,
      })
    } finally {
      setLoadingState(false)
      setShowModal(false)
    }
  }

  return (
    <div>
      <Button
        className={styles.modalOpenButton}
        variant="primary"
        onClick={() => setShowModal((prev) => !prev)}
      >
        Change Organization
      </Button>
      {showModal && (
        <Modal onDismiss={() => setShowModal((prev) => !prev)}>
          <div className={styles.modalContentWrapper}>
            <div className={styles.modalHeaderWrapper}>
              <ModalHeader
                onClose={() => setShowModal((prev) => !prev)}
                title=""
              />
            </div>

            <ModalBody>
              <h1 className={styles.modalContentTitle}>Select Account</h1>
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder={`Search...`}
              />

              {typeof organizationsState?.totalDataList === 'number' && (
                <div data-fs-orgs-counter>
                  {organizationsState?.totalDataList} Organizations Found
                </div>
              )}

              <B2BOrganizationsTable
                organizations={organizationsState?.dataList}
                value={organization}
                onChange={setOrganization}
                filter={searchTerm}
              />

              <Action
                as="button"
                color="#630a22"
                size="large"
                type="button"
                disabled={
                  !organization || !organization.trim().length || loadingState
                }
                onClick={() => {
                  void joinOrganization()
                }}
                data-fs-join-button
              >
                Join
              </Action>
            </ModalBody>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default B2BOrganizationsModal
